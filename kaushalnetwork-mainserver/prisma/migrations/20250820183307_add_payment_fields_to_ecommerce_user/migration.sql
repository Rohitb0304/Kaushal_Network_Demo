/*
  Warnings:

  - A unique constraint covering the columns `[razorpayPaymentId]` on the table `EcommerceUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."EcommerceUser" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "razorpayPaymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EcommerceUser_razorpayPaymentId_key" ON "public"."EcommerceUser"("razorpayPaymentId");
