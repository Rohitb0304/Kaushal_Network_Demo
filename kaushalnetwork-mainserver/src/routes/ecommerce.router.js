const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma');
const { hashPassword } = require('../utils/security');
const logger = require('../utils/logger');

// Route for initial user registration (before payment)
router.post('/register', async (req, res) => {
  try {
    const { ecommerceName, fullName, phoneNumber, email, password } = req.body;
    
    // Check if a user with the same email already exists
    const existingUser = await prisma.ecommerceUser.findUnique({
      where: { email },
    });
    if (existingUser) {
      // You may want to handle this case differently, e.g., allow them to proceed to payment if they haven't paid yet.
      if (existingUser.isPaid) {
          return res.status(409).json({ message: 'User with this email already exists and has paid.' });
      }
      return res.status(200).json({ message: 'User already exists. Proceed to payment.', user: existingUser });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user with isPaid set to false initially
    const newUser = await prisma.ecommerceUser.create({
      data: {
        ecommerceName,
        fullName,
        phoneNumber,
        email,
        password: hashedPassword,
        isPaid: false, // Default value, will be updated on payment success
      },
    });

    logger.info(`New user registered: ${newUser.email}`);
    res.status(201).json({ message: 'Registration successful. Proceed to payment.', user: newUser });
  } catch (error) {
    logger.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
});

// New route to handle payment success
router.post('/payment-success', async (req, res) => {
  const { email, razorpay_payment_id } = req.body;

  try {
    // Find the user and update their payment status
    const updatedUser = await prisma.ecommerceUser.update({
      where: { email: email },
      data: {
        isPaid: true,
        razorpayPaymentId: razorpay_payment_id,
      },
      // Include the user's data in the response for confirmation
      select: {
        email: true,
        fullName: true,
        ecommerceName: true,
        phoneNumber: true,
        isPaid: true,
        razorpayPaymentId: true,
        createdAt: true,
      }
    });

    logger.info(`Payment successful for user: ${updatedUser.email}`);
    res.status(200).json({ 
      message: 'Payment status updated successfully.',
      user: updatedUser,
    });

  } catch (error) {
    logger.error('Failed to update payment status:', error);
    res.status(500).json({ message: 'Failed to update payment status.' });
  }
});

// New route to get all paid users for the admin dashboard
router.get('/payments', async (req, res) => {
  try {
    const paidUsers = await prisma.ecommerceUser.findMany({
      where: { isPaid: true },
      select: {
        id: true,
        fullName: true,
        ecommerceName: true,
        email: true,
        phoneNumber: true,
        razorpayPaymentId: true,
        isPaid: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    logger.info(`Fetched ${paidUsers.length} paid users.`);
    res.status(200).json({ payments: paidUsers });
  } catch (error) {
    logger.error('Failed to fetch paid users:', error);
    res.status(500).json({ message: 'Failed to fetch payments. Please try again later.' });
  }
});

module.exports = router;