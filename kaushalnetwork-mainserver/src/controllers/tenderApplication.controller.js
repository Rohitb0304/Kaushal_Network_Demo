const prisma = require('../utils/prisma');

const getTenderApplication = async (id, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  const tenderApplicationData = await prisma.tenderApplication.findUniqueOrThrow({
    where: { id, deleted: false, companyId: company.id },
  });
  return tenderApplicationData;
};

const getAllProposedTenderApplication = async (companyUserId, limit, offset) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });

  const tenderApplicationData = await prisma.tenderApplication.findMany({
    where: {
      companyId: company.id,
      deleted: false,
    },
    select: {
      id: true,
      tenderId: true,
      proposedPrice: true,
    },
    take: limit,
    skip: offset,
  });
  return tenderApplicationData;
};

const getAllTenderApplication = async (
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
) => {
  const tenderApplicationData = await prisma.tenderApplication.findMany({
    where: {
      tenderId,
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
      tenderId: true,
      proposedPrice: true,
      Company: {
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
      },
    },
    take: limit,
    skip: offset,
  });
  return tenderApplicationData;
};

const createTenderApplication = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tenderApplication.create({ data: { ...data, companyId: company.id } });
};

const updateTenderApplication = async ({ tenderApplicationId, ...data }, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tenderApplication.update({
    where: { id: tenderApplicationId, companyId: company.id },
    data,
  });
};

const deleteTenderApplication = async (id, companyUserId) => {
  // await prisma.tenderApplication.delete({ where: { id, companyId } });
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.tenderApplication.update({
    where: { id, companyId: company.id },
    data: { deleted: true },
  });
};

module.exports = {
  getTenderApplication,
  getAllProposedTenderApplication,
  getAllTenderApplication,
  createTenderApplication,
  updateTenderApplication,
  deleteTenderApplication,
};
