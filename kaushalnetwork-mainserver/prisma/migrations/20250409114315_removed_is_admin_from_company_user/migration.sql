/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `CompanyUser` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `CompanyUser` table. All the data in the column will be lost.
  - Added the required column `contactNumber` to the `CompanyUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyUser" DROP COLUMN "isAdmin",
DROP COLUMN "mobileNumber",
ADD COLUMN     "contactNumber" TEXT NOT NULL;
