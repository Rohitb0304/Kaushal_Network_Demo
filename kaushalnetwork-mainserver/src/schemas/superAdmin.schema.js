const { z } = require('zod');

const SuperAdminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = { SuperAdminLoginSchema };
