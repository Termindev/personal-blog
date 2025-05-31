-- CreateTable
CREATE TABLE "article" (
    "id" UUID NOT NULL,
    "title_ar" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "content_ar" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "desc_ru" TEXT NOT NULL,
    "content_ru" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_ar" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_ar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_en" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_en_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_ru" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_ru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleTagsAr" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ArticleTagsAr_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticleTagsEn" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ArticleTagsEn_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticleTagsRu" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ArticleTagsRu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_ar_name_key" ON "tag_ar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_en_name_key" ON "tag_en"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_ru_name_key" ON "tag_ru"("name");

-- CreateIndex
CREATE INDEX "_ArticleTagsAr_B_index" ON "_ArticleTagsAr"("B");

-- CreateIndex
CREATE INDEX "_ArticleTagsEn_B_index" ON "_ArticleTagsEn"("B");

-- CreateIndex
CREATE INDEX "_ArticleTagsRu_B_index" ON "_ArticleTagsRu"("B");

-- AddForeignKey
ALTER TABLE "_ArticleTagsAr" ADD CONSTRAINT "_ArticleTagsAr_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTagsAr" ADD CONSTRAINT "_ArticleTagsAr_B_fkey" FOREIGN KEY ("B") REFERENCES "tag_ar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTagsEn" ADD CONSTRAINT "_ArticleTagsEn_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTagsEn" ADD CONSTRAINT "_ArticleTagsEn_B_fkey" FOREIGN KEY ("B") REFERENCES "tag_en"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTagsRu" ADD CONSTRAINT "_ArticleTagsRu_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleTagsRu" ADD CONSTRAINT "_ArticleTagsRu_B_fkey" FOREIGN KEY ("B") REFERENCES "tag_ru"("id") ON DELETE CASCADE ON UPDATE CASCADE;
