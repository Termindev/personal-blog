-- CreateTable
CREATE TABLE "goals" (
    "id" UUID NOT NULL,
    "title_ar" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "desc_ru" TEXT NOT NULL,
    "achieved" BOOLEAN NOT NULL DEFAULT false,
    "achieved_at" TIMESTAMP(3),
    "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);
