/*
  Warnings:

  - Made the column `image` on table `Learning` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Learning" ALTER COLUMN "image" SET NOT NULL;
