-- AlterTable
ALTER TABLE "article" ADD COLUMN     "reviewable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
