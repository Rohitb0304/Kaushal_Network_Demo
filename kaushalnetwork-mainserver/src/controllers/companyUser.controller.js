/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const { hashPassword } = require('../utils/security');
const config = require('../config');

const getCompanyUser = async (id) => {
  const companyUser = await prisma.companyUser.findUniqueOrThrow({
    where: { id: Number(id), deleted: false },
    select: {
      id: true,
      username: true,
      name: true,
      designation: true,
      email: true,
      countryCode: true,
      contactNumber: true,
      admin: true,
      imageUrl: true,
    },
  });

  return companyUser;
};

const getAllCompanyUser = async (companyId) => {
  const companyUsers = await prisma.companyUser.findMany({
    where: { companyId, deleted: false },
    select: {
      id: true,
      username: true,
      name: true,
      designation: true,
      email: true,
      countryCode: true,
      contactNumber: true,
      imageUrl: true,
    },
  });
  return companyUsers;
};

const createCompanyUser = async (data, companyUserId) => {
  const hashedPassword = await hashPassword(data.password);
  const company = await prisma.company.findFirstOrThrow({
    where: { CompanyUsers: { some: { id: companyUserId, deleted: false } } },
  });
  await prisma.companyUser.create({
    data: {
      ...data,
      password: hashedPassword,
      companyId: company.id,
      imageUrl: data.imageUrl || null,
    },
  });
};

const loginCompanyUser = async (data) => {
  const companyUserData = await prisma.companyUser.findUnique({
    where: { email: data.email, deleted: false },
    select: {
      id: true,
      username: true,
      name: true,
      designation: true,
      email: true,
      password: true,
      countryCode: true,
      contactNumber: true,
      admin: true,
    },
  });

  if (!companyUserData) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(data.password, companyUserData.password);

  if (!validPassword) {
    const error = new Error('Invalid email or password');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ companyUserId: companyUserData.id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  const { password, ...filteredCompanyUserdata } = companyUserData;

  return { companyUserData: filteredCompanyUserdata, token };
};

const updateCompanyUser = async ({ id, password, ...data }, companyId) => {
  let hashedPassword;
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  await prisma.companyUser.update({
    where: { id, companyId },
    data: {
      ...data,
      password: hashedPassword,
      imageUrl: data.imageUrl || undefined,
    },
  });
};

const deleteCompanyUser = async (id, companyId) => {
  // await prisma.companyUser.delete({ where: { id } });
  await prisma.companyUser.update({ where: { id, companyId }, data: { deleted: true } });
};

module.exports = {
  getCompanyUser,
  getAllCompanyUser,
  createCompanyUser,
  loginCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
};
