/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const { hashPassword } = require('../utils/security');
const config = require('../config');

// NOTE: This service assumes a Prisma schema for an EcommerceUser model
// The model should have fields like: id, username, name, email, password, etc.

/**
 * Creates a new ecommerce user.
 * @param {object} data - User data including username, name, email, and password.
 */
const createEcommerceUser = async (data) => {
  // Hash the user's password before storing it
  const hashedPassword = await hashPassword(data.password);
  await prisma.ecommerceUser.create({
    data: {
      ecommerceName: data.ecommerceName,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword, // Store the hashed password
      isPaid: false, // Initial status is unpaid
    },
  });
};

/**
 * Logs in an ecommerce user and generates a JWT token.
 * @param {object} data - User credentials including email and password.
 * @returns {object} An object containing the user's data and a JWT token.
 */
const loginEcommerceUser = async (data) => {
  // Find the user by their email
  const ecommerceUserData = await prisma.ecommerceUser.findUnique({
    where: { email: data.email, deleted: false },
    select: {
      id: true,
      email: true,
      password: true,
      fullName: true,
      ecommerceName: true,
      phoneNumber: true,
    },
  });

  // Throw an error if the user is not found
  if (!ecommerceUserData) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Compare the provided password with the hashed password in the database
  const validPassword = await bcrypt.compare(data.password, ecommerceUserData.password);

  // Throw an error if the password is not valid
  if (!validPassword) {
    const error = new Error('Invalid email or password');
    error.statusCode = 400;
    throw error;
  }

  // Generate a JWT token for the user session
  const token = jwt.sign({ ecommerceUserId: ecommerceUserData.id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  // Exclude the password from the returned user data
  const { password, ...filteredEcommerceUserData } = ecommerceUserData;

  return { ecommerceUserData: filteredEcommerceUserData, token };
};

/**
 * Retrieves a single ecommerce user's data by their ID.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {object} The user's data.
 */
const getEcommerceUser = async (id) => {
  const ecommerceUser = await prisma.ecommerceUser.findUniqueOrThrow({
    where: { id: Number(id), deleted: false },
    select: {
      id: true,
      ecommerceName: true,
      fullName: true,
      phoneNumber: true,
      email: true,
    },
  });
  return ecommerceUser;
};

/**
 * Updates a user's payment status after a successful Razorpay payment.
 * @param {string} email - The user's email.
 * @param {string} razorpayPaymentId - The payment ID from Razorpay.
 */
const updatePaymentStatus = async (email, razorpayPaymentId) => {
  await prisma.ecommerceUser.update({
    where: { email },
    data: {
      isPaid: true,
      razorpayPaymentId,
    },
  });
};

module.exports = {
  getEcommerceUser,
  createEcommerceUser,
  loginEcommerceUser,
  updatePaymentStatus,
};