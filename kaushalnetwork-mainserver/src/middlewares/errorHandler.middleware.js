const { ZodError } = require('zod');
const logger = require('../utils/logger');

/**
 * Global error handling middleware
 *
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let { message } = err;
  let details = err.stack;

  logger.error(`(Error Handler) ${err.name}: ${err.message}`, {
    method: req.method,
    path: req.path,
    statusCode: err.statusCode || 500,
    stack: err.stack,
  });

  if (err instanceof ZodError) {
    statusCode = 500;
    message = 'Validation Error';
    details = err.errors;
  }

  const isPrismaError =
    err.name === 'PrismaClientKnownRequestError' ||
    err.name === 'PrismaClientUnknownRequestError' ||
    err.name === 'PrismaClientRustPanicError' ||
    err.name === 'PrismaClientInitializationError' ||
    err.name === 'PrismaClientValidationError';

  if (isPrismaError) {
    if (err.code === 'P2001' || err.code === 'P2025') {
      statusCode = 404;
      message = 'Resource not found';
    }

    if (err.code === 'P2002') {
      statusCode = 400;
      message = `${err.meta.target[0]} already used`;
    }
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }

  if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  }

  if (err.statusCode === 404) {
    statusCode = 404;
    message = 'Resource not found';
  }

  const errorResponse = {
    message: statusCode < 500 ? message : 'Something went wrong, please try again later',
    details: process.env.NODE_ENV === 'DEV' ? details : undefined,
  };

  return res.status(statusCode).json(errorResponse);
};

module.exports = { errorHandler };
