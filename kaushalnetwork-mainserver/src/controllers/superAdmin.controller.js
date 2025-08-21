/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const config = require('../config');

const loginSuperAdmin = async ({ username, password }) => {
  // Use findUnique instead of findUniqueOrThrow to handle cases where the user is not found gracefully.
  const admin = await prisma.superAdmin.findUnique({
    where: { username },
  });

  if (!admin) {
    const error = new Error('Invalid username');
    error.statusCode = 400;
    throw error;
  }

  const { password: hashedPassword, ...adminData } = admin;
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatch) {
    const error = new Error('Invalid password');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ admin_id: admin.id, username: admin.username }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  return { adminData, token };
};

/**
 * Retrieves all ecommerce users for the super admin dashboard.
 * @returns {Array<object>} A list of all ecommerce users.
 */
const getEcommerceRegistrations = async () => {
  return await prisma.ecommerceUser.findMany({
    select: {
      id: true,
      ecommerceName: true,
      fullName: true,
      phoneNumber: true,
      email: true,
      isPaid: true,
      razorpayPaymentId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

module.exports = { 
  loginSuperAdmin,
  getEcommerceRegistrations, // Export the new function
};
