/*
  Warnings:

  - You are about to drop the column `server_id` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `channels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guild_id]` on the table `channels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guild_id` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "channels" DROP CONSTRAINT "channels_user_id_fkey";

-- DropIndex
DROP INDEX "channels_server_id_key";

-- DropIndex
DROP INDEX "channels_user_id_key";

-- AlterTable
ALTER TABLE "channels" DROP COLUMN "server_id",
DROP COLUMN "user_id",
ADD COLUMN     "guild_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_id_key" ON "guilds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guild_id_key" ON "guilds"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "channels_guild_id_key" ON "channels"("guild_id");

-- AddForeignKey
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
