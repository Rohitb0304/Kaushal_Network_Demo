/*
  Warnings:

  - You are about to drop the `BuzzAssets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Buzz" DROP CONSTRAINT "Buzz_companyUserId_fkey";

-- DropForeignKey
ALTER TABLE "BuzzAssets" DROP CONSTRAINT "BuzzAssets_buzzId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyBranch" DROP CONSTRAINT "CompanyBranch_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyUser" DROP CONSTRAINT "CompanyUser_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Tender" DROP CONSTRAINT "Tender_companyId_fkey";

-- DropForeignKey
ALTER TABLE "TenderApplication" DROP CONSTRAINT "TenderApplication_tenderId_fkey";

-- DropTable
DROP TABLE "BuzzAssets";

-- CreateTable
CREATE TABLE "BuzzAsset" (
    "id" SERIAL NOT NULL,
    "assetType" TEXT NOT NULL,
    "assetUrl" TEXT NOT NULL,
    "buzzId" INTEGER NOT NULL,

    CONSTRAINT "BuzzAsset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBranch" ADD CONSTRAINT "CompanyBranch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenderApplication" ADD CONSTRAINT "TenderApplication_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buzz" ADD CONSTRAINT "Buzz_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES "CompanyUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuzzAsset" ADD CONSTRAINT "BuzzAsset_buzzId_fkey" FOREIGN KEY ("buzzId") REFERENCES "Buzz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
