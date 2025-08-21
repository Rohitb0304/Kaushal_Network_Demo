-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "typeOfEntity" TEXT NOT NULL,
    "incorporationYear" TEXT NOT NULL,
    "registeredOfficeAddress" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "minEmployeeCount" INTEGER NOT NULL,
    "maxEmployeeCount" INTEGER NOT NULL,
    "msmeRegistrationNumber" TEXT NOT NULL,
    "msmeRegistrationProofDocumentUrl" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "cinDocumentUrl" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "panUrl" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "gstinDocumentUrl" TEXT NOT NULL,
    "tradeLicenseNumber" TEXT NOT NULL,
    "tradeLicenseDocumentUrl" TEXT NOT NULL,
    "iecNumber" TEXT NOT NULL,
    "iecDocumentUrl" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "aadharDocumentUrl" TEXT NOT NULL,
    "aboutCompany" TEXT NOT NULL,
    "aboutFounderAndTeam" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "productsAndServices" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBranch" (
    "id" SERIAL NOT NULL,
    "branchAddress" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" SERIAL NOT NULL,
    "tenderName" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productsAndServicesRequired" TEXT NOT NULL,
    "aboutProductsAndServices" TEXT NOT NULL,
    "nomenclature" TEXT NOT NULL,
    "pricingCategory" TEXT NOT NULL,
    "totalPrice" TEXT NOT NULL,
    "locationOfService" TEXT NOT NULL,
    "deliveryTerms" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "otherConditions" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenderApplication" (
    "id" SERIAL NOT NULL,
    "tenderId" INTEGER NOT NULL,

    CONSTRAINT "TenderApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buzz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "textContent" TEXT NOT NULL,
    "companyUserId" INTEGER NOT NULL,

    CONSTRAINT "Buzz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuzzAssets" (
    "id" SERIAL NOT NULL,
    "assetType" TEXT NOT NULL,
    "assetUrl" TEXT NOT NULL,
    "buzzId" INTEGER NOT NULL,

    CONSTRAINT "BuzzAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "designation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "emailOtp" TEXT NOT NULL,
    "emailOtpExpiry" TIMESTAMP(3) NOT NULL,
    "mobileOtp" TEXT NOT NULL,
    "mobileOtpExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_username_key" ON "SuperAdmin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandName_key" ON "Brand"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "Tender_tenderName_key" ON "Tender"("tenderName");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUser_username_key" ON "CompanyUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUser_email_key" ON "CompanyUser"("email");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBranch" ADD CONSTRAINT "CompanyBranch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderApplication" ADD CONSTRAINT "TenderApplication_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buzz" ADD CONSTRAINT "Buzz_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES "CompanyUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuzzAssets" ADD CONSTRAINT "BuzzAssets_buzzId_fkey" FOREIGN KEY ("buzzId") REFERENCES "Buzz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
