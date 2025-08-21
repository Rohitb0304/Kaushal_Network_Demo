const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const { errorHandler } = require('./middlewares/errorHandler.middleware');
const logger = require('./utils/logger');
const prisma = require('./utils/prisma');
const { hashPassword } = require('./utils/security');

const config = require('./config');

const app = express();

app.use(helmet());
app.use('/uploads', express.static('uploads'));
app.use(
  cors({
    origin: config.ORIGIN.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const initializeSuperAdmin = async () => {
  const args = process.argv.slice(2);
  const superAdmin = await prisma.superAdmin.findUnique({ where: { id: 1 } });
  if (superAdmin) {
    prisma.$disconnect();
    return;
  }
  if (args.length < 3) {
    logger.info(
      'Super Admin not intialized rerun with node <filename> <email> <username> <password>',
    );
    process.exit(1);
  }
  const hashedPassword = await hashPassword(args[2]);
  await prisma.superAdmin.create({
    data: { email: args[0], username: args[1], password: hashedPassword },
  });
  prisma.$disconnect();
};

initializeSuperAdmin();

// Routers
const apiversion = '/api/v0';

const companyUserRouter = require('./routes/companyUser.router');

app.use('/api/v0/company-user', companyUserRouter);

const companyRouter = require('./routes/company.router');

app.use(`${apiversion}/company`, companyRouter);

const branchRouter = require('./routes/branch.router');

app.use('/api/v0/branch', branchRouter);

const brandRouter = require('./routes/brand.router');

app.use('/api/v0/brand', brandRouter);

const buzzRouter = require('./routes/buzz.router');

app.use('/api/v0/buzz', buzzRouter);

const tenderRouter = require('./routes/tender.router');

app.use('/api/v0/tender', tenderRouter);

const tenderApplicationRouter = require('./routes/tenderApplication.router');

app.use('/api/v0/tender-application', tenderApplicationRouter);

const countryRouter = require('./routes/country.router');

app.use('/api/v0/country', countryRouter);

const stateRouter = require('./routes/state.router');

app.use('/api/v0/state', stateRouter);

const cityRouter = require('./routes/city.router');

app.use('/api/v0/city', cityRouter);

const superAdminRouter = require('./routes/superAdmin.router');

// Corrected line here 👇
app.use('/api/v0/superadmin', superAdminRouter);

// New E-commerce Router
const ecommerceRouter = require('./routes/ecommerce.router');

app.use('/api/v0/ecommerce', ecommerceRouter);

app.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`);
});

process.on('SIGINT', () => {
  prisma
    .$disconnect()
    .then(() => {
      logger.warn('Disconnected from Prisma');
      process.exit(0);
    })
    .catch((err) => {
      logger.error('Error during Prisma disconnect', err);
      process.exit(1);
    });
});

app.use(errorHandler);

module.exports = app;