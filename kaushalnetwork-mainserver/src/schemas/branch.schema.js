const { z } = require('zod');

const CreateBranchSchema = z.object({
  branchAddress: z.string(),
});

const UpdateBranchSchema = z.object({
  id: z.number().nonnegative(),
  branchAddress: z.string().optional(),
});

module.exports = { CreateBranchSchema, UpdateBranchSchema };
