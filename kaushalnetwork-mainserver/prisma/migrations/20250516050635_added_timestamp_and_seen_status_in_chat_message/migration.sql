/*
  Warnings:

  - Added the required column `createdAt` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seen` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "seen" BOOLEAN NOT NULL;
