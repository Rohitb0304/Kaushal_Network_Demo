const { z } = require('zod');

const CreateTenderApplicationSchema = z.object({
  tenderId: z.number().nonnegative(),
  proposedPrice: z.string(),
});

const UpdateTenderApplicationSchema = z.object({
  tenderApplicationId: z.number(),
  proposedPrice: z.string().optional(),
});

module.exports = {
  CreateTenderApplicationSchema,
  UpdateTenderApplicationSchema,
};
