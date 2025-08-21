const { z } = require('zod');

const CreateCompanyUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  designation: z.string(),
  email: z.string().email(),
  countryCode: z.string(),
  contactNumber: z.string().length(10),
  admin: z.boolean().optional(),
  imageUrl: z.string().url().optional(),
});

const CompanyUserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const UpdateCompanyUserSchema = z.object({
  id: z.number().nonnegative(),
  username: z.string().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  designation: z.string().optional(),
  email: z.string().email().optional(),
  countryCode: z.string().optional(),
  contactNumber: z.string().length(10).optional(),
  imageUrl: z.string().url().optional(),
});

module.exports = { CreateCompanyUserSchema, UpdateCompanyUserSchema, CompanyUserLoginSchema };
