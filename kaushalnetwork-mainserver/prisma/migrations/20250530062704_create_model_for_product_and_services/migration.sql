/*
  Warnings:

  - You are about to drop the column `deliverableNames` on the `Company` table. All the data in the column will be lost.
  - Added the required column `assetType` to the `BuzzAsset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuzzAsset" ADD COLUMN     "assetType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "deliverableNames";

-- CreateTable
CREATE TABLE "ProductAndService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "ProductAndService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductAndService" ADD CONSTRAINT "ProductAndService_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
