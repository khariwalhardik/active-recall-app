-- CreateEnum
CREATE TYPE "Source" AS ENUM ('Book', 'YouTube', 'Podcast', 'SelfHelp', 'EE', 'ML', 'Blockchain', 'Cloud');

-- CreateEnum
CREATE TYPE "LearningType" AS ENUM ('text', 'link', 'pdf', 'image');

-- CreateTable
CREATE TABLE "Learning" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" "Source" NOT NULL,
    "typek" "LearningType" NOT NULL,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revisedAt" TIMESTAMP(3),

    CONSTRAINT "Learning_pkey" PRIMARY KEY ("id")
);
