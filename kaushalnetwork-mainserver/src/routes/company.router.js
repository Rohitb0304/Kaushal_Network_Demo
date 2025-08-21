const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Resume needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'logo') {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Logo needs to be jpeg/png');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'msmeRegistrationDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. MSME Registration Document needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'cinDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. CIN Document needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'panDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. PAN Document needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'gstinDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. GSTIN Document needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'tradeLicenseDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Trade License needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'iecDocument') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. IEC Document needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'aadhar') {
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. AADHAR needs to be pdf');
        error.statusCode = 400;
        cb(error);
      }
    } else if (file.fieldname === 'productAndServiceImage') {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. image is required');
        error.statusCode = 400;
        cb(error);
      }
    }

    cb(null, true);
  },
});

const router = require('express').Router();
const {
  companyRegistrationSchema,
  companyUpdationSchema,
  addProductAndServiceSchema,
} = require('../schemas/company.schema');
const {
  createCompany,
  getCompany,
  updateCompany,
  getAllCompany,
  getCompanyUserView,
  verifyCompany,
  getCompanySuperAdminView,
  addProductAndService,
  deleteProductAndService,
} = require('../controllers/company.controller');
const {
  authorizeCompanyAdmin,
  authorizeSuperAdmin,
  authorizeCompanyUser,
} = require('../middlewares/authorization.middleware');

router.get('/superadmin-view', authorizeSuperAdmin, async (req, res) => {
  const result = await getCompanySuperAdminView(Number(req.query.companyId));
  res.status(200).json(result);
});

router.get('/admin-view', authorizeCompanyAdmin, async (req, res) => {
  const result = await getCompany(req.companyUserId);
  res.status(200).json(result);
});

router.get('/company-user-view', authorizeCompanyUser, async (req, res) => {
  const result = await getCompany(req.companyUserId);
  res.status(200).json(result);
});

router.get('/user-view', async (req, res) => {
  const result = await getCompanyUserView(Number(req.query.id));
  res.status(200).json(result);
});

router.get('/all', async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const keyword = req.query.keyword || '';
  const verified =
    req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined;
  const { companyType } = req.query;
  const { entityType } = req.query;
  const { location } = req.query;
  const { businessType } = req.query;
  const deliverableNames = req.query.deliverableNames && req.query.deliverableNames.split(',');
  const { sector } = req.query;
  const { industry } = req.query;
  const { productOrServiceName } = req.query;

  const result = await getAllCompany(
    offset,
    limit,
    keyword,
    verified,
    companyType,
    entityType,
    location,
    businessType,
    sector,
    industry,
    productOrServiceName,
  );
  res.status(200).json(result);
});

router.post(
  '',
  upload.fields([
    { name: 'logo' },
    { name: 'msmeRegistrationDocument' },
    { name: 'cinDocument' },
    { name: 'panDocument' },
    { name: 'gstinDocument' },
    { name: 'tradeLicenseDocument' },
    { name: 'iecDocument' },
    { name: 'aadhar' },
  ]),
  async (req, res) => {
    try {
      // 🐛 FIX: Provide default values for optional fields
      // This prevents Zod from throwing a 'Required' error if the fields are missing
      // from the request body.
      const dataToValidate = {
        ...req.body,
        cin: req.body.cin || '',
        gstin: req.body.gstin || '',
      };
      const data = companyRegistrationSchema.parse(dataToValidate);

      if (!req.files.msmeRegistrationDocument) {
        const error = new Error('missing MSME Registration Document');
        error.statusCode = 400;
        throw error;
      }
      if (!req.files.panDocument) {
        const error = new Error('missing PAN Document');
        error.statusCode = 400;
        throw error;
      }
      if (!req.files.aadhar) {
        const error = new Error('missing Aadhar Document');
        error.statusCode = 400;
        throw error;
      }

      await createCompany(data, req.files);

      return res.status(201).json({
        message: 'successfully registered company',
      });
    } catch (err) {
      throw err;
    } finally {
      // Clean up uploaded files in a separate block for clarity
      const uploadedFiles = [
        ...(req.files.logo || []),
        ...(req.files.msmeRegistrationDocument || []),
        ...(req.files.cinDocument || []),
        ...(req.files.panDocument || []),
        ...(req.files.gstinDocument || []),
        ...(req.files.tradeLicenseDocument || []),
        ...(req.files.iecDocument || []),
        ...(req.files.aadhar || []),
      ];

      for (const file of uploadedFiles) {
        if (file && file.path) {
          fs.unlink(file.path, () => {});
        }
      }
    }
  },
);

router.put(
  '',
  upload.fields([
    { name: 'logo' },
    { name: 'banner' },
    { name: 'msmeRegistrationDocument' },
    { name: 'cinDocument' },
    { name: 'panDocument' },
    { name: 'gstinDocument' },
    { name: 'tradeLicenseDocument' },
    { name: 'iecDocument' },
    { name: 'aadhar' },
  ]),
  authorizeCompanyAdmin,
  async (req, res) => {
    try {
      const data = companyUpdationSchema.parse(req.body);

      await updateCompany(data, req.files, req.companyUserId);

      return res.status(200).json({
        message: 'Company Updated successfully',
      });
    } catch (err) {
      if (req.files) {
        if (req.files.logo) {
          fs.unlink(req.files.logo[0].path, () => {});
        }
        if (req.files.msmeRegistrationDocument) {
          fs.unlink(req.files.msmeRegistrationDocument[0].path, () => {});
        }
        if (req.files.cinDocument) {
          fs.unlink(req.files.cinDocument[0].path, () => {});
        }
        if (req.files.panDocument) {
          fs.unlink(req.files.panDocument[0].path, () => {});
        }
        if (req.files.gstinDocument) {
          fs.unlink(req.files.gstinDocument[0].path, () => {});
        }
        if (req.files.tradeLicenseDocument) {
          fs.unlink(req.files.tradeLicenseDocument[0].path, () => {});
        }
        if (req.files.iecDocument) {
          fs.unlink(req.files.iecDocument[0].path, () => {});
        }
        if (req.files.aadhar) {
          fs.unlink(req.files.aadhar[0].path, () => {});
        }
      }
      throw err;
    }
  },
);

router.post(
  '/product-and-service',
  upload.fields([{ name: 'productAndServiceImage' }]),
  authorizeCompanyAdmin,
  async (req, res) => {
    try {
      if (!req.files.productAndServiceImage) {
        const error = new Error('missing image');
        error.statusCode = 400;
        throw error;
      }

      req.body.gstApplicable = req.body.gstApplicable == 't';
      const productAndServiceData = addProductAndServiceSchema.parse(req.body);
      req.body.priceExclusiveGST = BigInt(req.body.priceExclusiveGST);

      const data = await addProductAndService(productAndServiceData, req.files, req.companyId);

      return res.status(200).json(data);
    } finally {
      if (req.files.productAndServiceImage) {
        fs.unlink(req.files.productAndServiceImage[0].path, () => {});
      }
    }
  },
);

router.delete('/product-and-service', authorizeCompanyAdmin, async (req, res) => {
  try {
    const productAndServiceId = Number(req.query.id);

    const data = await deleteProductAndService(productAndServiceId, req.companyId);

    return res.status(200).json({ message: 'successfully deleted product and service' });
  } finally {
  }
});

router.put('/verify', authorizeSuperAdmin, async (req, res) => {
  const companyId = Number(req.query.companyId);
  await verifyCompany(companyId);
  return res.status(200).json(null);
});

module.exports = router;