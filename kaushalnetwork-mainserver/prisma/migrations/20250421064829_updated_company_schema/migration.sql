/*
  Warnings:

  - You are about to drop the column `msmeRegistrationProofDocumentUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `productsAndServices` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `typeOfEntity` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliverableNames` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `tradeName` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logoUrl` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registeredOfficeAddress` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `businessType` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sector` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minEmployeeCount` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxEmployeeCount` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `msmeRegistrationNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cin` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pan` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gstin` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tradeLicenseNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `iecNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aadharNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Company_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "msmeRegistrationProofDocumentUrl",
DROP COLUMN "name",
DROP COLUMN "productsAndServices",
DROP COLUMN "typeOfEntity",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "deliverableNames" TEXT NOT NULL,
ADD COLUMN     "emailOtpExpiry" TIMESTAMP(3),
ADD COLUMN     "entityType" TEXT NOT NULL,
ADD COLUMN     "msmeRegistrationDocumentUrl" TEXT,
ADD COLUMN     "phoneOtpExpiry" TIMESTAMP(3),
ALTER COLUMN "tradeName" SET NOT NULL,
ALTER COLUMN "countryCode" DROP NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "logoUrl" SET NOT NULL,
ALTER COLUMN "registeredOfficeAddress" SET NOT NULL,
ALTER COLUMN "businessType" SET NOT NULL,
ALTER COLUMN "sector" SET NOT NULL,
ALTER COLUMN "industry" SET NOT NULL,
ALTER COLUMN "minEmployeeCount" SET NOT NULL,
ALTER COLUMN "maxEmployeeCount" SET NOT NULL,
ALTER COLUMN "msmeRegistrationNumber" SET NOT NULL,
ALTER COLUMN "cin" SET NOT NULL,
ALTER COLUMN "pan" SET NOT NULL,
ALTER COLUMN "gstin" SET NOT NULL,
ALTER COLUMN "tradeLicenseNumber" SET NOT NULL,
ALTER COLUMN "iecNumber" SET NOT NULL,
ALTER COLUMN "aadharNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");
