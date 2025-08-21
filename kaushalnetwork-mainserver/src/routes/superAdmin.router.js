const router = require('express').Router();
const { loginSuperAdmin, getEcommerceRegistrations } = require('../controllers/superAdmin.controller');
const { authorizeSuperAdmin } = require('../middlewares/authorization.middleware');
const { SuperAdminLoginSchema } = require('../schemas/superAdmin.schema');

router.get('/me', authorizeSuperAdmin, async (req, res) => {
  res.status(200).json(req.admin);
});

router.post('/login', async (req, res, next) => {
  try {
    const data = SuperAdminLoginSchema.parse(req.body);
    const result = await loginSuperAdmin(data);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// New route to get all ecommerce user registrations
router.get('/registrations', authorizeSuperAdmin, async (req, res, next) => {
  try {
    const registrations = await getEcommerceRegistrations();
    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;