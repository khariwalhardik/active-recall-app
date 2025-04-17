/*
  Warnings:

  - Added the required column `type` to the `Learning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Learning" ADD COLUMN     "type" "LearningType" NOT NULL;
