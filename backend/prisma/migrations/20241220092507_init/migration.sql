-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
