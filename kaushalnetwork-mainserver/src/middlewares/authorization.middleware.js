const jwt = require('jsonwebtoken');
const config = require('../config');
const prisma = require('../utils/prisma');

const authorizeCompanyAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  // if (!req.cookies.u_token) {
  if (!authorizationHeader) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authorizationHeader.split('Bearer ')[1];
  if (!token) {
    const error = new Error('Not Authenticated, Admin access required');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const admin = await prisma.companyUser.findUniqueOrThrow({
    where: { id: decoded.companyUserId, admin: true, deleted: false },
    select: { id: true, companyId: true },
  });

  req.companyId = admin.companyId;
  req.companyUserId = admin.id;

  next();
};

const authorizeCompanyUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  // if (!req.cookies.u_token) {
  if (!authorizationHeader) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }
  const token = authorizationHeader.split('Bearer ')[1];
  if (!token) {
    const error = new Error('Not Authenticated, Admin access required');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  req.companyUserId = decoded.companyUserId;
  next();
};

const authorizeSuperAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  // if (!req.cookies.a_token) {
  if (!authorizationHeader) {
    const error = new Error('Not Authenticated, Admin access required');
    error.statusCode = 401;
    throw error;
  }
  const token = authorizationHeader.split('Bearer ')[1];
  if (!token) {
    const error = new Error('Not Authenticated, Admin access required');
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const admin = await prisma.superAdmin.findUniqueOrThrow({
    where: { id: decoded.admin_id, username: decoded.username },
    select: { id: true, email: true, username: true },
  });

  req.admin = admin;
  next();
};

module.exports = { authorizeCompanyAdmin, authorizeCompanyUser, authorizeSuperAdmin };
