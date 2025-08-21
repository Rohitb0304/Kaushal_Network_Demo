const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const countries = require('./countries.json');
const states = require('./states.json');
const cities = require('./cities.json');

const main = async () => {
  await prisma.country.createMany({
    data: countries.map((country) => {
      return { name: country.name, iso3: country.iso3, countryCode: country.phonecode };
    }),
    skipDuplicates: true,
  });
  await prisma.state.createMany({ data: states, skipDuplicates: true });
  await prisma.city.createMany({ data: cities, skipDuplicates: true });
};

main().catch((err) => console.log(err));
