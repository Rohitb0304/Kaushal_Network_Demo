const prisma = require('../utils/prisma');

const getTender = async (id) => {
  const tenderData = await prisma.tender.findUniqueOrThrow({
    where: { id, deleted: false },
  });
  return tenderData;
};

const getAllTender = async (
  companyId,
  limit,
  offset,
  keyword,
  pricingCategory,
  minTotalPrice,
  maxTotalPrice,
  locationOfService,
  includeCompany,
  verifiedCompany,
  companyName,
  companyType,
  companyEntityType,
  companyBusinessType,
  companySector,
  companyIndustry,
) => {
  const tenderData = await prisma.tender.findMany({
    where: {
      companyId,
      tenderName: { contains: keyword, mode: 'insensitive' },
      pricingCategory,
      totalPrice: { gte: minTotalPrice, lte: maxTotalPrice },
      locationOfService: { contains: locationOfService, mode: 'insensitive' },
      Company: {
        verified: verifiedCompany,
        companyName: { contains: companyName, mode: 'insensitive' },
        companyType: { contains: companyType, mode: 'insensitive' },
        entityType: { contains: companyEntityType, mode: 'insensitive' },
        businessType: { contains: companyBusinessType, mode: 'insensitive' },
        sector: { contains: companySector, mode: 'insensitive' },
        industry: { contains: companyIndustry, mode: 'insensitive' },
      },
      deleted: false,
    },
    select: {
      id: true,
      tenderName: true,
      objective: true,
      modelNumber: true,
      description: true,
      productsAndServicesRequired: true,
      aboutProductsAndServices: true,
      nomenclature: true,
      pricingCategory: true,
      totalPrice: true,
      locationOfService: true,
      deliveryTerms: true,
      paymentTerms: true,
      otherConditions: true,
      Company: includeCompany
        ? {
            select: {
              id: true,
              verified: true,
              companyName: true,
              companyType: true,
              logoUrl: true,
              entityType: true,
              businessType: true,
              sector: true,
              industry: true,
            },
          }
        : false,
    },
    take: limit,
    skip: offset,
  });
  return tenderData;
};

const createTender = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tender.create({
    // eslint-disable-next-line no-undef
    data: { ...data, companyId: company.id, totalPrice: BigInt(data.totalPrice) },
  });
};

const updateTender = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tender.update({ where: { id: data.id, companyId: company.id }, data });
};

const deleteTender = async (id, companyUserId) => {
  // await prisma.tender.delete({ where: { id, companyId } });
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tender.update({ where: { id, companyId: company.id }, data: { deleted: true } });
};

module.exports = { getTender, getAllTender, createTender, updateTender, deleteTender };
