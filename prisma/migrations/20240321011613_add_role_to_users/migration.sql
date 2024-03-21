-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MENBER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MENBER';
