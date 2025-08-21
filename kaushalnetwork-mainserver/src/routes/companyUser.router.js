const router = require('express').Router();

const {
  getCompanyUser,
  createCompanyUser,
  loginCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
  getAllCompanyUser,
} = require('../controllers/companyUser.controller');
const {
  CreateCompanyUserSchema,
  UpdateCompanyUserSchema,
  CompanyUserLoginSchema,
} = require('../schemas/companyUser.schema');
const {
  authorizeCompanyAdmin,
  authorizeCompanyUser,
} = require('../middlewares/authorization.middleware');

router.get('/me', authorizeCompanyUser, async (req, res) => {
  const result = await getCompanyUser(req.companyUserId);
  return res.status(200).json(result);
});

router.get('/all', authorizeCompanyAdmin, async (req, res) => {
  const result = await getAllCompanyUser(req.companyId);
  return res.status(200).json(result);
});

router.get('/user-view', async (req, res) => {
  const result = await getCompanyUser(Number(req.query.id));
  return res.status(200).json(result);
});

router.post('', authorizeCompanyAdmin, async (req, res) => {
  const data = CreateCompanyUserSchema.parse(req.body);
  await createCompanyUser(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created company user' });
});

router.post('/login', async (req, res) => {
  const data = CompanyUserLoginSchema.parse(req.body);
  const { companyUserData, token } = await loginCompanyUser(data);
  // res.cookie('u_token', `${token}`, {
  //   httpOnly: true,
  //   sameSite: 'lax',
  //   secure: config.NODE_ENV !== 'DEV',
  // });
  res.setHeader('Authorization', `Bearer ${token}`);

  return res.status(200).json({
    token, // ✅ In response body
    user: companyUserData, // ✅ Whatever user data you want to send
  });
});

router.put('', authorizeCompanyAdmin, async (req, res) => {
  const data = UpdateCompanyUserSchema.parse(req.body);
  await updateCompanyUser(data, req.companyId);
  return res.status(200).json({ message: 'successfully updated company user' });
});

router.delete('', authorizeCompanyAdmin, async (req, res) => {
  const id = Number(req.query.id);
  await deleteCompanyUser(Number(id), req.companyId);
  return res.status(200).json({ message: 'successfully deleted company user' });
});

module.exports = router;
