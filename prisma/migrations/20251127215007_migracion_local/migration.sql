-- CreateTable
CREATE TABLE "Universidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Universidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facultades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "directorio" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "universidadId" INTEGER NOT NULL,

    CONSTRAINT "Facultades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facultades" ADD CONSTRAINT "Facultades_universidadId_fkey" FOREIGN KEY ("universidadId") REFERENCES "Universidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
