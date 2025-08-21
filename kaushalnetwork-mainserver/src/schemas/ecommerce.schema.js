/* eslint-disable prettier/prettier */
const { z } = require('zod');

// Zod schema for validating the new e-commerce user registration data.
const createEcommerceUserSchema = z.object({
  ecommerceName: z.string().min(3, 'E-commerce name must be at least 3 characters long.').max(50, 'E-commerce name cannot exceed 50 characters.'),
  fullName: z.string().min(3, 'Full name must be at least 3 characters long.').max(100, 'Full name cannot exceed 100 characters.'),
  phoneNumber: z.string().regex(/^[0-9]{10,15}$/, 'Phone number must be a valid number.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.').max(255, 'Password cannot exceed 255 characters.'),
});

// Zod schema for validating the e-commerce user login data.
const ecommerceUserLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password cannot be empty.'),
});

// Zod schema for validating the data to update an e-commerce user.
const updateEcommerceUserSchema = z.object({
  id: z.number().nonnegative(),
  ecommerceName: z.string().min(3, 'E-commerce name must be at least 3 characters long.').max(50, 'E-commerce name cannot exceed 50 characters.').optional(),
  fullName: z.string().min(3, 'Full name must be at least 3 characters long.').max(100, 'Full name cannot exceed 100 characters.').optional(),
  phoneNumber: z.string().regex(/^[0-9]{10,15}$/, 'Phone number must be a valid number.').optional(),
  email: z.string().email('Please enter a valid email address.').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters long.').max(255, 'Password cannot exceed 255 characters.').optional(),
  isPaid: z.boolean().optional(), // Added isPaid field
  razorpayPaymentId: z.string().optional(), // Added razorpayPaymentId field
});

module.exports = {
  createEcommerceUserSchema,
  ecommerceUserLoginSchema,
  updateEcommerceUserSchema,
};