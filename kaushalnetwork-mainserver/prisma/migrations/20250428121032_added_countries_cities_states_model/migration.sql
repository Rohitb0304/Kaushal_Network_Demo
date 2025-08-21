-- CreateTable
CREATE TABLE "Country" (
    "name" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "State" (
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "City" (
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("name")
);
