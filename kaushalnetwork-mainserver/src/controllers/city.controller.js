const prisma = require('../utils/prisma');

const getCities = async (limit, offset, query) => {
  const data = await prisma.city.findMany({
    where: { name: { contains: query, mode: 'insensitive' } },
    take: limit,
    skip: offset,
  });
  return data;
};
module.exports = { getCities };
