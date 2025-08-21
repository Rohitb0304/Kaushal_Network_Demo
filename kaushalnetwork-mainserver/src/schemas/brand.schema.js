const { z } = require('zod');

const CreateBrandSchema = z.object({
  brandName: z.string(),
});
const UpdateBrandSchema = z.object({
  id: z.number().nonnegative(),
  brandName: z.string().optional(),
});

module.exports = { CreateBrandSchema, UpdateBrandSchema };
