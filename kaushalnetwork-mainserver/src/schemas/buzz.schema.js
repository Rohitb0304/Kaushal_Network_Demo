const { z } = require('zod');

const CreateBuzzSchema = z.object({
  title: z.string(),
  textContent: z.string(),
});
const UpdateBuzzSchema = z.object({
  id: z.number().nonnegative(),
  title: z.string().optional(),
  textContent: z.string().optional(),
});

module.exports = { CreateBuzzSchema, UpdateBuzzSchema };
