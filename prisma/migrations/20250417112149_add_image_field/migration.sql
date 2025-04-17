/*
  Warnings:

  - The primary key for the `Learning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Learning` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Learning` table. All the data in the column will be lost.
  - You are about to drop the column `revisedAt` on the `Learning` table. All the data in the column will be lost.
  - The `id` column on the `Learning` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Learning" DROP CONSTRAINT "Learning_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "image",
DROP COLUMN "revisedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "isImportant" DROP DEFAULT,
ADD CONSTRAINT "Learning_pkey" PRIMARY KEY ("id");
