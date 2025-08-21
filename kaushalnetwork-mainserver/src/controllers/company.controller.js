const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const prisma = require('../utils/prisma');
const { hashPassword } = require('../utils/security');
const config = require('../config');
const { supabase } = require('../config/supabase.config');

const createCompany = async (data, files) => {
  const hashedPassword = await hashPassword(data.password);

  // Initialize URL variables with a non-null default value for required fields.
  // The Prisma schema seems to require `logoUrl` to be a string.
  let logoUrl = 'https://placehold.co/600x400/FFF/000?text=No+Logo'; // A safe placeholder URL
  let msmeRegistrationDocumentUrl = null;
  let cinDocumentUrl = null;
  let panUrl = null;
  let gstinDocumentUrl = null;
  let tradeLicenseDocumentUrl = null;
  let iecDocumentUrl = null;
  let aadharDocumentUrl = null;

  const uploadData = {};
  let fileUploadData;
  let error;

  // Check if a logo file exists before attempting to upload
  if (files.logo && files.logo.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.logo[0].filename, fs.readFileSync(files.logo[0].path), {
        contentType: files.logo[0].mimetype,
        upsert: true,
      }));
    if (error) {
      console.log(`error while uploading logo file: ${error}`);
    }
    uploadData.logoPath = fileUploadData?.path;
    if (uploadData.logoPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.logoPath));
      logoUrl = publicUrl;
    }
  }

  // Handle other document uploads as before, checking for file existence
  if (files.msmeRegistrationDocument && files.msmeRegistrationDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.msmeRegistrationDocument[0].filename,
        fs.readFileSync(files.msmeRegistrationDocument[0].path),
        {
          contentType: files.msmeRegistrationDocument[0].mimetype,
        },
      ));
    uploadData.msmeRegistrationDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading msmeRegistrationDocument');
    }
    if (uploadData.msmeRegistrationDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage
        .from('kn')
        .getPublicUrl(uploadData.msmeRegistrationDocumentPath));
      msmeRegistrationDocumentUrl = publicUrl;
    }
  }

  if (files.cinDocument && files.cinDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.cinDocument[0].filename,
        fs.readFileSync(files.cinDocument[0].path),
        {
          contentType: files.cinDocument[0].mimetype,
        },
      ));
    uploadData.cinDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading cinDocument');
    }
    if (uploadData.cinDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.cinDocumentPath));
      cinDocumentUrl = publicUrl;
    }
  }
  
  if (files.panDocument && files.panDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.panDocument[0].filename, fs.readFileSync(files.panDocument[0].path), {
        contentType: files.panDocument[0].mimetype,
      }));
    uploadData.panDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading panDocument');
    }
    if (uploadData.panDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.panDocumentPath));
      panUrl = publicUrl;
    }
  }

  if (files.gstinDocument && files.gstinDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.gstinDocument[0].filename,
        fs.readFileSync(files.gstinDocument[0].path),
        {
          contentType: files.gstinDocument[0].mimetype,
        },
      ));
    uploadData.gstinDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading gstinDocument');
    }
    if (uploadData.gstinDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.gstinDocumentPath));
      gstinDocumentUrl = publicUrl;
    }
  }
  
  if (files.tradeLicenseDocument && files.tradeLicenseDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.tradeLicenseDocument[0].filename,
        fs.readFileSync(files.tradeLicenseDocument[0].path),
        {
          contentType: files.tradeLicenseDocument[0].mimetype,
        },
      ));
    uploadData.tradeLicenseDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading tradeLicenseDocument');
    }
    if (uploadData.tradeLicenseDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage
        .from('kn')
        .getPublicUrl(uploadData.tradeLicenseDocumentPath));
      tradeLicenseDocumentUrl = publicUrl;
    }
  }
  
  if (files.iecDocument && files.iecDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.iecDocument[0].filename,
        fs.readFileSync(files.iecDocument[0].path),
        {
          contentType: files.iecDocument[0].mimetype,
        },
      ));
    uploadData.iecDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading iecDocument');
    }
    if (uploadData.iecDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.iecDocumentPath));
      iecDocumentUrl = publicUrl;
    }
  }
  
  if (files.aadhar && files.aadhar.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.aadhar[0].filename, fs.readFileSync(files.aadhar[0].path), {
        contentType: files.aadhar[0].mimetype,
      }));
    uploadData.aadharDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading aadharDocument');
    }
    if (uploadData.aadharDocumentPath) {
      ({ data: { publicUrl } } = supabase.storage.from('kn').getPublicUrl(uploadData.aadharDocumentPath));
      aadharDocumentUrl = publicUrl;
    }
  }

  await prisma.$transaction(async (prisma) => {
    const company = await prisma.company.create({
      data: {
        companyName: data.companyName,
        companyType: data.companyType,
        email: data.email,
        tradeName: data.tradeName,
        legalName: data.legalName,
        entityType: data.entityType,
        incorporationYear: Number(data.incorporationYear),
        registeredOfficeAddress: data.registeredOfficeAddress,
        businessType: data.businessType,
        websiteUrl: data.websiteUrl,
        sector: data.sector,
        industry: data.industry,
        minEmployeeCount: Number(data.minEmployeeCount),
        maxEmployeeCount: Number(data.maxEmployeeCount),
        msmeRegistrationNumber: data.msmeRegistrationNumber,
        cin: data.cin,
        pan: data.pan,
        gstin: data.gstin,
        tradeLicenseNumber: data.tradeLicenseNumber,
        iecNumber: data.iecNumber,
        aadharNumber: data.aadharNumber,
        logoUrl: logoUrl,
        msmeRegistrationDocumentUrl: msmeRegistrationDocumentUrl,
        cinDocumentUrl: cinDocumentUrl,
        panUrl: panUrl,
        gstinDocumentUrl: gstinDocumentUrl,
        tradeLicenseDocumentUrl: tradeLicenseDocumentUrl,
        iecDocumentUrl: iecDocumentUrl,
        aadharDocumentUrl: aadharDocumentUrl,
        annualTurnover: data.annualTurnover,
        businessActivites: data.businessActivites,
        certifications: data.certifications,
        importExportCode: data.importExportCode,
        majorMarkets: data.majorMarkets,
        operationLocations: data.operationLocations,
        qualityStandards: data.qualityStandards,
      },
    });

    await prisma.companyUser.create({
      data: {
        username: data.username,
        password: hashedPassword,
        name: data.name,
        designation: data.designation,
        email: data.email,
        countryCode: data.countryCode,
        contactNumber: data.contactNumber,
        admin: true,
        companyId: company.id,
      },
    });

    if (data.brandNames) {
      for (const brandName of data.brandNames.split(',')) {
        await prisma.brand.create({
          data: { brandName, companyId: company.id },
        });
      }
    }

    if (data.branchAddress) {
      await prisma.companyBranch.create({
        data: {
          branchAddress: data.branchAddress,
          companyId: company.id,
        },
      });
    }

    return company;
  });
};

const getCompany = async (id) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id, deleted: false } } },
    select: {
      id: true,
      verified: true,
      companyName: true,
      tradeName: true,
      legalName: true,
      companyType: true,
      email: true,
      logoUrl: true,
      bannerUrl: true,
      tagline: true,
      entityType: true,
      incorporationYear: true,
      registeredOfficeAddress: true,
      websiteUrl: true,
      businessType: true,
      sector: true,
      industry: true,
      minEmployeeCount: true,
      maxEmployeeCount: true,
      msmeRegistrationNumber: true,
      msmeRegistrationDocumentUrl: true,
      cin: true,
      cinDocumentUrl: true,
      pan: true,
      panUrl: true,
      gstin: true,
      gstinDocumentUrl: true,
      tradeLicenseNumber: true,
      tradeLicenseDocumentUrl: true,
      iecNumber: true,
      iecDocumentUrl: true,
      aadharNumber: true,
      aadharDocumentUrl: true,
      aboutCompany: true,
      aboutFounderAndTeam: true,
      expertise: true,
      annualTurnover: true,
      businessActivites: true,
      certifications: true,
      importExportCode: true,
      majorMarkets: true,
      operationLocations: true,
      qualityStandards: true,
    },
  });

  const productAndServices = await prisma.productAndService.findMany({
    where: { companyId: company.id },
  });
  const branches = await prisma.companyBranch.findMany({
    where: { companyId: company.id, deleted: false },
    select: { id: true, branchAddress: true },
  });
  const brands = await prisma.brand.findMany({
    where: { companyId: company.id, deleted: false },
    select: { id: true, brandName: true },
  });

  company.productAndServices = productAndServices.map((p) => {
    return { ...p, priceExclusiveGST: p.priceExclusiveGST.toString() };
  });
  company.branches = branches;
  company.brands = brands;
  return company;
};

const getCompanySuperAdminView = async (id) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { id },
  });

  const productAndServices = await prisma.productAndService.findMany({
    where: { companyId: company.id },
  });
  const branches = await prisma.companyBranch.findMany({
    where: { companyId: company.id },
    select: { id: true, branchAddress: true },
  });
  const brands = await prisma.brand.findMany({
    where: { companyId: company.id },
    select: { id: true, brandName: true },
  });

  company.productAndServices = productAndServices.map((p) => {
    return { ...p, priceExclusiveGST: p.priceExclusiveGST.toString() };
  });
  company.branches = branches;
  company.brands = brands;
  return company;
};

const getCompanyUserView = async (id) => {
  const company = await prisma.company.findUniqueOrThrow({
    where: { id, deleted: false },
    select: {
      id: true,
      verified: true,
      companyName: true,
      tradeName: true,
      legalName: true,
      companyType: true,
      email: true,
      logoUrl: true,
      bannerUrl: true,
      tagline: true,
      entityType: true,
      incorporationYear: true,
      registeredOfficeAddress: true,
      websiteUrl: true,
      businessType: true,
      sector: true,
      industry: true,
      minEmployeeCount: true,
      maxEmployeeCount: true,
      msmeRegistrationNumber: true,
      cin: true,
      pan: true,
      gstin: true,
      tradeLicenseNumber: true,
      iecNumber: true,
      aadharNumber: true,
      aboutCompany: true,
      aboutFounderAndTeam: true,
      expertise: true,
      annualTurnover: true,
      businessActivites: true,
      certifications: true,
      importExportCode: true,
      majorMarkets: true,
      operationLocations: true,
      qualityStandards: true,
      CompanyUsers: { where: { admin: true }, select: { id: true, name: true } },
    },
  });

  const productAndServices = await prisma.productAndService.findMany({
    where: { companyId: company.id },
  });
  const branches = await prisma.companyBranch.findMany({
    where: { companyId: company.id, deleted: false },
    select: { id: true, branchAddress: true },
  });
  const brands = await prisma.brand.findMany({
    where: { companyId: company.id, deleted: false },
    select: { id: true, brandName: true },
  });

  company.productAndServices = productAndServices.map((p) => {
    return { ...p, priceExclusiveGST: p.priceExclusiveGST.toString() };
  });
  company.branches = branches;
  company.brands = brands;

  return company;
};

const getAllCompany = async (
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
) => {
  console.log(productOrServiceName);
  const companies = await prisma.company.findMany({
    where: {
      OR: [
        { companyName: { contains: keyword, mode: 'insensitive' } },
        { tradeName: { contains: keyword, mode: 'insensitive' } },
        { legalName: { contains: keyword, mode: 'insensitive' } },
      ],
      AND: [
        { verified },
        { companyType: { contains: companyType, mode: 'insensitive' } },
        { entityType: { contains: entityType, mode: 'insensitive' } },
        { registeredOfficeAddress: { contains: location, mode: 'insensitive' } },
        { businessType: { contains: businessType, mode: 'insensitive' } },
        { sector: { contains: sector, mode: 'insensitive' } },
        { industry: { contains: industry, mode: 'insensitive' } },
        { deleted: false },
        {
          ProductAndServices: productOrServiceName && {
            some: { name: { contains: productOrServiceName.trim(), mode: 'insensitive' } },
          },
        },
      ],
    },
    select: {
      id: true,
      verified: true,
      companyName: true,
      tradeName: true,
      legalName: true,
      companyType: true,
      email: true,
      logoUrl: true,
      bannerUrl: true,
      tagline: true,
      entityType: true,
      incorporationYear: true,
      registeredOfficeAddress: true,
      websiteUrl: true,
      businessType: true,
      sector: true,
      industry: true,
      minEmployeeCount: true,
      maxEmployeeCount: true,
      aboutCompany: true,
      aboutFounderAndTeam: true,
      expertise: true,
      annualTurnover: true,
      businessActivites: true,
      certifications: true,
      importExportCode: true,
      majorMarkets: true,
      operationLocations: true,
      qualityStandards: true,
      ProductAndServices: true,
      // CompanyUsers: { select: { id: true, name: true } },
    },
    skip: offset,
    take: limit,
  });

  return companies.map((company) => {
    return {
      ...company,
      ProductAndServices: company.ProductAndServices.map((p) => {
        return { ...p, priceExclusiveGST: p.priceExclusiveGST.toString() };
      }),
    };
  });
};

const updateCompany = async (data, files, companyUserId) => {
  let hashedPassword;
  if (data.password) {
    hashedPassword = await hashPassword(data.password);
  }

  let company = await prisma.company.findFirst({
    where: { CompanyUsers: { some: { id: companyUserId, admin: true, deleted: false } } },
  });
  let uploadData = {};
  let fileUploadData;

  // Check if a logo file exists before attempting to upload
  if (files.logo && files.logo.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.logo[0].filename, fs.readFileSync(files.logo[0].path), {
        contentType: files.logo[0].mimetype,
      }));
    uploadData.logoPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.logoPath);
    data.logoUrl = urlData?.publicUrl;
  }

  // Add a safety check for the banner file
  if (files.banner && files.banner.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.banner[0].filename, fs.readFileSync(files.banner[0].path), {
        contentType: files.banner[0].mimetype,
      }));
    uploadData.bannerPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.bannerPath);
    data.bannerUrl = urlData?.publicUrl;
  }

  // Add a safety check for msmeRegistrationDocument
  if (files.msmeRegistrationDocument && files.msmeRegistrationDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.msmeRegistrationDocument[0].filename,
        fs.readFileSync(files.msmeRegistrationDocument[0].path),
        {
          contentType: files.msmeRegistrationDocument[0].mimetype,
        },
      ));
    uploadData.msmeRegistrationDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage
      .from('kn')
      .getPublicUrl(uploadData.msmeRegistrationDocumentPath);
    data.msmeRegistrationDocumentUrl = urlData?.publicUrl;
  }

  // Add a safety check for cinDocument
  if (files.cinDocument && files.cinDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.cinDocument[0].filename,
        fs.readFileSync(files.cinDocument[0].path),
        {
          contentType: files.cinDocument[0].mimetype,
        },
      ));
    uploadData.cinDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.cinDocumentPath);
    data.cinDocumentUrl = urlData?.publicUrl;
  }

  // Add a safety check for panDocument
  if (files.panDocument && files.panDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.panDocument[0].filename,
        fs.readFileSync(files.panDocument[0].path),
        {
          contentType: files.panDocument[0].mimetype,
        },
      ));
    uploadData.panDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.panDocumentPath);
    data.panUrl = urlData?.publicUrl;
  }

  // Add a safety check for gstinDocument
  if (files.gstinDocument && files.gstinDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.gstinDocument[0].filename,
        fs.readFileSync(files.gstinDocument[0].path),
        {
          contentType: files.gstinDocument[0].mimetype,
        },
      ));
    uploadData.gstinDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.gstinDocumentPath);
    data.gstinDocumentUrl = urlData?.publicUrl;
  }

  // Add a safety check for tradeLicenseDocument
  if (files.tradeLicenseDocument && files.tradeLicenseDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.tradeLicenseDocument[0].filename,
        fs.readFileSync(files.tradeLicenseDocument[0].path),
        {
          contentType: files.tradeLicenseDocument[0].mimetype,
        },
      ));
    uploadData.tradeLicenseDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage
      .from('kn')
      .getPublicUrl(uploadData.tradeLicenseDocumentPath);
    data.tradeLicenseDocumentUrl = urlData?.publicUrl;
  }

  // Add a safety check for iecDocument
  if (files.iecDocument && files.iecDocument.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(
        uuidv4() + files.iecDocument[0].filename,
        fs.readFileSync(files.iecDocument[0].path),
        {
          contentType: files.iecDocument[0].mimetype,
        },
      ));
    uploadData.iecDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.iecDocumentPath);
    data.iecDocumentUrl = urlData?.publicUrl;
  }

  // Add a safety check for aadhar
  if (files.aadhar && files.aadhar.length > 0) {
    ({ data: fileUploadData, error } = await supabase.storage
      .from('kn')
      .upload(uuidv4() + files.aadhar[0].filename, fs.readFileSync(files.aadhar[0].path), {
        contentType: files.aadhar[0].mimetype,
      }));
    uploadData.aadharDocumentPath = fileUploadData?.path;
    if (error) {
      console.log('error while uploading file');
    }
    let { data: urlData } = supabase.storage.from('kn').getPublicUrl(uploadData.aadharDocumentPath);
    data.aadharDocumentUrl = urlData?.publicUrl;
  }

  return await prisma.$transaction(async (prisma) => {
    company = await prisma.company.update({
      data: {
        companyName: data.companyName,
        companyType: data.companyType,
        email: data.email,
        password: hashedPassword,
        countryCode: data.countryCode,
        contactNumber: data.contactNumber,
        tradeName: data.tradeName,
        legalName: data.legalName,
        entityType: data.entityType,
        incorporationYear: data.incorporationYear ? Number(data.incorporationYear) : undefined,
        registeredOfficeAddress: data.registeredOfficeAddress,
        businessType: data.businessType,
        websiteUrl: data.websiteUrl,
        sector: data.sector,
        industry: data.industry,
        minEmployeeCount: data.minEmployeeCount ? Number(data.minEmployeeCount) : undefined,
        maxEmployeeCount: data.maxEmployeeCount ? Number(data.maxEmployeeCount) : undefined,
        msmeRegistrationNumber: data.msmeRegistrationNumber,
        cin: data.cin,
        pan: data.pan,
        gstin: data.gstin,
        tradeLicenseNumber: data.tradeLicenseNumber,
        iecNumber: data.iecNumber,
        aadharNumber: data.aadharNumber,
        logoUrl: data.logoUrl,
        bannerUrl: data.bannerUrl,
        msmeRegistrationDocumentUrl: data.msmeRegistrationDocumentUrl,
        cinDocumentUrl: data.cinDocumentUrl,
        panUrl: data.panUrl,
        gstinDocumentUrl: data.gstinDocumentUrl,
        tradeLicenseDocumentUrl: data.tradeLicenseDocumentUrl,
        iecDocumentUrl: data.iecDocumentUrl,
        aadharDocumentUrl: data.aadharDocumentUrl,
        annualTurnover: data.annualTurnover,
        businessActivites: data.businessActivites,
        certifications: data.certifications,
        importExportCode: data.importExportCode,
        majorMarkets: data.majorMarkets,
        operationLocations: data.operationLocations,
        qualityStandards: data.qualityStandards,
      },
      where: { id: company.id },
    });

    return company;
  });
};

const addProductAndService = async (data, files, companyId) => {
  // Add safety check for the required file
  if (!files.productAndServiceImage || files.productAndServiceImage.length === 0) {
    console.error('Error: productAndServiceImage file is missing.');
    // You might want to throw an error or return a specific response here
    return null;
  }

  let { data: fileUploadData, error } = await supabase.storage
    .from(config.SUPABASE_BUCKET_NAME)
    .upload(
      uuidv4() + files.productAndServiceImage[0].filename,
      fs.readFileSync(files.productAndServiceImage[0].path),
      {
        contentType: files.productAndServiceImage[0].mimetype,
      },
    );
  if (error) {
    console.log('error while uploading file');
  }
  const imagePath = fileUploadData.path;
  let { data: urlData } = supabase.storage
    .from(config.SUPABASE_BUCKET_NAME)
    .getPublicUrl(imagePath);
  data.imageUrl = urlData.publicUrl;

  const res = await prisma.productAndService.create({ data: { ...data, companyId: companyId } });
  return { ...res, priceExclusiveGST: res.priceExclusiveGST.toString() };
};

const deleteProductAndService = async (id, companyId) => {
  const productAndService = await prisma.productAndService.findUniqueOrThrow({ where: { id } });
  const splitImageUrl = productAndService.imageUrl.split('/');
  let imagePath = splitImageUrl[splitImageUrl.length - 1];
  await supabase.storage.from(config.SUPABASE_BUCKET_NAME).remove([imagePath]);
  await prisma.productAndService.delete({ where: { id, companyId } });
};

const verifyCompany = async (companyId) => {
  await prisma.company.update({ where: { id: companyId }, data: { verified: true } });
};

module.exports = {
  createCompany,
  getCompany,
  getCompanySuperAdminView,
  getCompanyUserView,
  getAllCompany,
  updateCompany,
  addProductAndService,
  deleteProductAndService,
  verifyCompany,
};
