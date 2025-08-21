/*
  Warnings:

  - A unique constraint covering the columns `[modelNumber]` on the table `Tender` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Tender" ADD COLUMN     "modelNumber" INTEGER;

-- AlterTable
ALTER TABLE "public"."TenderApplication" ADD COLUMN     "modelNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tender_modelNumber_key" ON "public"."Tender"("modelNumber");
