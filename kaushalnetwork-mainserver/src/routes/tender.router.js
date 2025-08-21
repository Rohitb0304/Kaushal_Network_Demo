const router = require('express').Router();
const {
  getTender,
  createTender,
  updateTender,
  deleteTender,
  getAllTender,
} = require('../controllers/tender.controller');
const { CreateTenderSchema, UpdateTenderSchema } = require('../schemas/tender.schema');
const { authorizeCompanyAdmin } = require('../middlewares/authorization.middleware');

router.get('/user-view/all', async (req, res) => {
  const companyId = Number(req.query.companyId) || undefined;
  const { keyword } = req.query;
  const { pricingCategory } = req.query;
  const minTotalPrice = req.query.minTotalPrice || undefined;
  const maxTotalPrice = req.query.maxTotalPrice || undefined;
  const { locationOfService } = req.query;
  const verifiedCompany =
    req.query.verifiedCompany === 'true'
      ? true
      : req.query.verifiedCompany === 'false'
        ? false
        : undefined;
  const { companyName } = req.query;
  const { companyType } = req.query;
  const { companyEntityType } = req.query;
  const { companyBusinessType } = req.query;
  const { companySector } = req.query;
  const { companyIndustry } = req.query;

  const resData = await getAllTender(
    companyId,
    Number(req.query.limit) || 10,
    Number(req.query.offset) || 0,
    keyword,
    pricingCategory,
    minTotalPrice,
    maxTotalPrice,
    locationOfService,
    true,
    verifiedCompany,
    companyName,
    companyType,
    companyEntityType,
    companyBusinessType,
    companySector,
    companyIndustry,
  );
  return res.status(200).json(
    resData.map((data) => {
      return { ...data, totalPrice: data.totalPrice.toString() };
    }),
  );
});

router.get('/company-view/all', authorizeCompanyAdmin, async (req, res) => {
  const resData = await getAllTender(
    req.companyId,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
  );
  return res.status(200).json(
    resData.map((data) => {
      return { ...data, totalPrice: data.totalPrice.toString() };
    }),
  );
});

router.get('', async (req, res) => {
  const resData = await getTender(Number(req.query.id));
  return res.status(200).json({ ...resData, totalPrice: resData.totalPrice.toString() });
});

router.post('', authorizeCompanyAdmin, async (req, res) => {
  const data = CreateTenderSchema.parse(req.body);
  await createTender(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created tender' });
});

router.put('', authorizeCompanyAdmin, async (req, res) => {
  const data = UpdateTenderSchema.parse(req.body);
  await updateTender(data, req.companyUserId);
  return res.status(200).json({ message: 'successfully updated tender' });
});

router.delete('', authorizeCompanyAdmin, async (req, res) => {
  await deleteTender(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ message: 'successfully deleted tender' });
});

module.exports = router;
