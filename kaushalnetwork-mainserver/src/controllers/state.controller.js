const prisma = require('../utils/prisma');

const getStates = async (limit, offset, query) => {
  const data = await prisma.state.findMany({
    where: { name: { contains: query, mode: 'insensitive' } },
    take: limit,
    skip: offset,
  });
  return data;
};
module.exports = { getStates };
