const prisma = require('../utils/prisma');

const getCountries = async (limit, offset, query) => {
  const data = await prisma.country.findMany({
    where: { name: { contains: query, mode: 'insensitive' } },
    take: limit,
    skip: offset,
  });
  return data;
};
module.exports = { getCountries };
