/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const config = require('../config');

/**
 * Handles the login logic for a super admin.
 * @param {object} credentials - The login credentials.
 * @param {string} credentials.username - The username of the super admin.
 * @param {string} credentials.password - The password of the super admin.
 * @returns {Promise<object>} An object containing admin data and a JWT token.
 * @throws {Error} If the username or password is invalid.
 */
const loginSuperAdmin = async ({ username, password }) => {
  // Find the super admin by their username. Using findUnique ensures we handle cases where the user doesn't exist.
  const admin = await prisma.superAdmin.findUnique({
    where: { username },
  });

  // If no admin is found, throw an error.
  if (!admin) {
    const error = new Error('Invalid username');
    error.statusCode = 400;
    throw error;
  }

  // Destructure the password from the admin object so it's not included in the returned data.
  const { password: hashedPassword, ...adminData } = admin;
  
  // Compare the provided password with the hashed password stored in the database.
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  
  // If the passwords don't match, throw an error.
  if (!passwordMatch) {
    const error = new Error('Invalid password');
    error.statusCode = 400;
    throw error;
  }

  // If the passwords match, create a new JWT token.
  const token = jwt.sign({ admin_id: admin.id, username: admin.username }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  // Return the admin data and the new token.
  return { adminData, token };
};

/**
 * Retrieves all ecommerce users from the database for the super admin dashboard.
 * @returns {Promise<Array<object>>} A list of all ecommerce users.
 */
const getEcommerceRegistrations = async () => {
  // Find all ecommerce users with specific fields.
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
  getEcommerceRegistrations,
};
