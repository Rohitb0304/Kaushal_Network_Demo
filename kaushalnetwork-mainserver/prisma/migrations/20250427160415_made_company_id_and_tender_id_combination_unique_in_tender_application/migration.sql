/*
  Warnings:

  - A unique constraint covering the columns `[tenderId,companyId]` on the table `TenderApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TenderApplication_tenderId_companyId_key" ON "TenderApplication"("tenderId", "companyId");
