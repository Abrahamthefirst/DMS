/*
  Warnings:

  - You are about to drop the column `filePath` on the `Document` table. All the data in the column will be lost.
  - Added the required column `publicId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "filePath",
ADD COLUMN     "publicId" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashed_password" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL;
