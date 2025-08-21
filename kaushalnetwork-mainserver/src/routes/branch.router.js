const router = require('express').Router();
const {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranch,
} = require('../controllers/branch.controller');
const { CreateBranchSchema, UpdateBranchSchema } = require('../schemas/branch.schema');
const { authorizeCompanyAdmin } = require('../middlewares/authorization.middleware');

router.get('/all', authorizeCompanyAdmin, async (req, res) => {
  const resData = await getAllBranch(req.companyId);
  return res.status(200).json(resData);
});

router.post('', authorizeCompanyAdmin, async (req, res) => {
  const data = CreateBranchSchema.parse(req.body);
  await createBranch(data, req.companyUserId);
  return res.status(201).json({ message: 'successfully created branch' });
});

router.put('', authorizeCompanyAdmin, async (req, res) => {
  const data = UpdateBranchSchema.parse(req.body);
  await updateBranch(data, req.companyUserId);
  return res.status(200).json({ message: 'successfully updated branch' });
});

router.delete('', authorizeCompanyAdmin, async (req, res) => {
  await deleteBranch(Number(req.query.id), req.companyUserId);
  return res.status(200).json({ message: 'successfully deleted branch' });
});

module.exports = router;
