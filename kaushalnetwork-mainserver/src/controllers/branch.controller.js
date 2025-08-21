const prisma = require('../utils/prisma');

const getAllBranch = async (companyId) => {
  const branches = await prisma.companyBranch.findMany({
    where: { companyId, deleted: false },
    select: { id: true, branchAddress: true },
  });
  return branches;
};

const createBranch = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.companyBranch.create({ data: { ...data, companyId: company.id } });
};

const updateBranch = async (data, companyUserId) => {
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.companyBranch.update({
    where: { id: data.id, companyId: company.id, deleted: false },
    data,
  });
};

const deleteBranch = async (id, companyId) => {
  // await prisma.companyBranch.delete({ where: { id, companyId: companyId } });
  await prisma.companyBranch.update({
    where: { id, companyId },
    data: { deleted: true },
  });
};

module.exports = { getAllBranch, createBranch, updateBranch, deleteBranch };
