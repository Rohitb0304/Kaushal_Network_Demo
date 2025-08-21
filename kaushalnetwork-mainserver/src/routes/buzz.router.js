const router = require('express').Router();
const {
  getBuzz,
  createBuzz,
  updateBuzz,
  deleteBuzz,
  getAllBuzz,
} = require('../controllers/buzz.controller');
const { CreateBuzzSchema, UpdateBuzzSchema } = require('../schemas/buzz.schema');
const { authorizeCompanyUser } = require('../middlewares/authorization.middleware');

router.get('/all', async (req, res) => {
  const resData = await getAllBuzz(
    Number(req.query.companyId) || undefined,
    Number(req.query.limit || 10),
    Number(req.query.offset || 0),
  );
  return res.status(200).json(resData);
});

router.get('/company-admin-view/all', authorizeCompanyUser, async (req, res) => {
  const resData = await getAllBuzz(req.companyId);
  return res.status(200).json(resData);
});

router.get('', async (req, res) => {
  const resData = await getBuzz(Number(req.query.id));
  return res.status(200).json(resData);
});

router.post('', authorizeCompanyUser, async (req, res) => {
  const data = CreateBuzzSchema.parse(req.body);
  await createBuzz(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created buzz' });
});

router.put('', authorizeCompanyUser, async (req, res) => {
  const data = UpdateBuzzSchema.parse(req.body);
  await updateBuzz(data, req.companyUserId);
  return res.status(200).json({ message: 'successfully updated buzz' });
});

router.delete('', authorizeCompanyUser, async (req, res) => {
  await deleteBuzz(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ message: 'successfully deleted buzz' });
});

module.exports = router;
