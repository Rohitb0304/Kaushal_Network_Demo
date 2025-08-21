/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `emailOtpExpiry` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `phoneOtpExpiry` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "contactNumber",
DROP COLUMN "countryCode",
DROP COLUMN "emailOtpExpiry",
DROP COLUMN "password",
DROP COLUMN "phoneOtpExpiry";

-- AlterTable
ALTER TABLE "CompanyUser" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SuperAdmin" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "SuperAdmin_id_seq";
