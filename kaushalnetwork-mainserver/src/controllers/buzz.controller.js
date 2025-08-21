const prisma = require('../utils/prisma');

const getBuzz = async (id) => {
  const buzzData = await prisma.buzz.findUniqueOrThrow({ where: { id, deleted: false } });
  return buzzData;
};

const getAllBuzz = async (companyId, limit, offset) => {
  const buzzes = await prisma.buzz.findMany({
    where: { CompanyUser: { companyId, deleted: false } },
    select: {
      id: true,
      title: true,
      textContent: true,
      CompanyUser: {
        select: { id: true, username: true, name: true, designation: true, email: true },
      },
    },
    skip: offset,
    take: limit,
  });
  return buzzes;
};

const createBuzz = async (data, companyUserId) => {
  await prisma.buzz.create({ data: { ...data, companyUserId } });
};

const updateBuzz = async (data, companyUserId) => {
  await prisma.buzz.update({ where: { id: data.id, companyUserId, deleted: false }, data });
};

const deleteBuzz = async (id, companyUserId) => {
  // await prisma.buzz.delete({ where: { id, companyUserId } });
  await prisma.buzz.update({ where: { id, companyUserId }, data: { deleted: true } });
};

module.exports = { getBuzz, getAllBuzz, createBuzz, updateBuzz, deleteBuzz };
