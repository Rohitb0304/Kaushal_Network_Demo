/*
  Warnings:

  - Added the required column `companyId` to the `TenderApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TenderApplication" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TenderApplication" ADD CONSTRAINT "TenderApplication_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
