/*
  Warnings:

  - Changed the type of `totalPrice` on the `Tender` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tender" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" BIGINT NOT NULL;
