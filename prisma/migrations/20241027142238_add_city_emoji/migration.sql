-- CreateTable
CREATE TABLE "CityEmoji" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CityEmoji_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CityEmoji" ADD CONSTRAINT "CityEmoji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
