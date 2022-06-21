-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "categories_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "initial_date" VARCHAR NOT NULL,
    "final_date" VARCHAR,

    CONSTRAINT "products_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "service_time" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "items_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "client_name" VARCHAR,
    "date" VARCHAR NOT NULL,
    "id_ticket" INTEGER NOT NULL,
    "adult_qtd" INTEGER DEFAULT 0,
    "kid_qtd" INTEGER DEFAULT 0,
    "status" VARCHAR NOT NULL,

    CONSTRAINT "orders_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR,
    "adult_price" INTEGER,
    "kid_price" INTEGER,
    "initial_date" VARCHAR NOT NULL,
    "final_date" VARCHAR,

    CONSTRAINT "tickets_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "user_name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "token" VARCHAR,
    "position" INTEGER NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testes" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,
    "day_off_date" VARCHAR NOT NULL,

    CONSTRAINT "teste_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_idx" ON "users"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_fk" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_fk_1" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_fk_2" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk" FOREIGN KEY ("id_ticket") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
