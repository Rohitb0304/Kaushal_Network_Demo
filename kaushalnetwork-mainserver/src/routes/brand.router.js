const router = require('express').Router();
const { createBrand, updateBrand, deleteBrand } = require('../controllers/brand.controller');
const { CreateBrandSchema, UpdateBrandSchema } = require('../schemas/brand.schema');
const { authorizeCompanyAdmin } = require('../middlewares/authorization.middleware');

router.post('', authorizeCompanyAdmin, async (req, res) => {
  const data = CreateBrandSchema.parse(req.body);
  await createBrand(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created brand' });
});

router.put('', authorizeCompanyAdmin, async (req, res) => {
  const data = UpdateBrandSchema.parse(req.body);
  await updateBrand(data, req.companyUserId);
  return res.status(200).json({ message: 'successfully updated brand' });
});

router.delete('', authorizeCompanyAdmin, async (req, res) => {
  await deleteBrand(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ message: 'successfully deleted brand' });
});

module.exports = router;
