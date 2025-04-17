/*
  Warnings:

  - The primary key for the `Learning` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Learning" DROP CONSTRAINT "Learning_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Learning_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Learning_id_seq";
