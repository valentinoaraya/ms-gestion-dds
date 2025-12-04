/*
  Warnings:

  - Added the required column `facultadId` to the `Especialidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Especialidades" ADD COLUMN     "facultadId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Especialidades" ADD CONSTRAINT "Especialidades_facultadId_fkey" FOREIGN KEY ("facultadId") REFERENCES "Facultades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
