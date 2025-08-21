const router = require('express').Router();
const {
  getTenderApplication,
  createTenderApplication,
  updateTenderApplication,
  deleteTenderApplication,
  getAllTenderApplication,
  getAllProposedTenderApplication,
} = require('../controllers/tenderApplication.controller');
const {
  CreateTenderApplicationSchema,
  UpdateTenderApplicationSchema,
} = require('../schemas/tenderApplication.schema');
const {
  authorizeCompanyAdmin,
  authorizeCompanyUser,
} = require('../middlewares/authorization.middleware');

router.get('/proposed/all', authorizeCompanyUser, async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  const resData = await getAllProposedTenderApplication(req.companyUserId, limit, offset);
  return res.status(200).json(
    resData.map((data) => {
      return { ...data, proposedPrice: data.proposedPrice.toString() };
    }),
  );
});

router.get('/all', authorizeCompanyUser, async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  const verifiedCompany =
    req.query.verifiedCompany === 'true'
      ? true
      : req.verifiedCompany === 'false'
        ? false
        : undefined;
  const { companyName } = req.query;
  const { companyType } = req.query;
  const { companyEntityType } = req.query;
  const { companyBusinessType } = req.query;
  const { companySector } = req.query;
  const { companyIndustry } = req.query;
  const tenderId = Number(req.query.tenderId);

  const resData = await getAllTenderApplication(
    tenderId,
    limit,
    offset,
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
      return { ...data, proposedPrice: data.proposedPrice.toString() };
    }),
  );
});

router.get('', async (req, res) => {
  const resData = await getTenderApplication(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ ...resData, proposedPrice: resData.proposedPrice.toString() });
});

router.post('', authorizeCompanyAdmin, async (req, res) => {
  const data = CreateTenderApplicationSchema.parse(req.body);
  await createTenderApplication(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created tender application' });
});

router.put('', authorizeCompanyAdmin, async (req, res) => {
  const data = UpdateTenderApplicationSchema.parse(req.body);
  await updateTenderApplication(data, req.companyUserId);
  return res.status(200).json({ message: 'successfully updated tender application' });
});

router.delete('', authorizeCompanyAdmin, async (req, res) => {
  await deleteTenderApplication(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ message: 'successfully deleted tender application' });
});

module.exports = router;
