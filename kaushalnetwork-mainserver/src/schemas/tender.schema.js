const { z } = require('zod');

const CreateTenderSchema = z.object({
  tenderName: z.string(),
  objective: z.string(),
  description: z.string(),
  modelNumber: z.number().int().optional(),
  productsAndServicesRequired: z.string(),
  aboutProductsAndServices: z.string(),
  nomenclature: z.string(),
  pricingCategory: z.enum(['PERUNIT', 'MONTHLY']),
  totalPrice: z.string(),
  locationOfService: z.string(),
  deliveryTerms: z.string(),
  paymentTerms: z.string(),
  otherConditions: z.string(),
});

const UpdateTenderSchema = z.object({
  id: z.number().nonnegative(),
  tenderName: z.string().optional(),
  objective: z.string().optional(),
  description: z.string().optional(),
  modelNumber: z.number().int().optional(),
  productsAndServicesRequired: z.string().optional(),
  aboutProductsAndServices: z.string().optional(),
  nomenclature: z.string().optional(),
  pricingCategory: z.enum(['PERUNIT', 'MONTHLY']).optional(),
  totalPrice: z.bigint().optional(),
  locationOfService: z.string().optional(),
  deliveryTerms: z.string().optional(),
  paymentTerms: z.string().optional(),
  otherConditions: z.string().optional(),
});

module.exports = { CreateTenderSchema, UpdateTenderSchema };
