/*
  Warnings:

  - Added the required column `gstApplicable` to the `ProductAndService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelNumber` to the `ProductAndService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceExclusiveGST` to the `ProductAndService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductAndService" ADD COLUMN     "gstApplicable" BOOLEAN NOT NULL,
ADD COLUMN     "modelNumber" TEXT NOT NULL,
ADD COLUMN     "priceExclusiveGST" BIGINT NOT NULL;
