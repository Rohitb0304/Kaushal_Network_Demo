const prisma = require('../utils/prisma');

const createBrand = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.brand.create({ data: { ...data, companyId: company.id } });
};

const updateBrand = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.brand.update({
    where: { id: data.id, companyId: company.id, deleted: false },
    data,
  });
};

const deleteBrand = async (id, companyUserId) => {
  // await prisma.brand.delete({ where: { id, companyId: companyId } });
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.brand.update({ where: { id, companyId: company.id }, data: { deleted: true } });
};

module.exports = { createBrand, updateBrand, deleteBrand };
