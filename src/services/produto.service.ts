import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createProp = {
  name: string;
  price: number;
  initial_date: string;
  id_category: number;
};

export const ProductService = {
  all: async () => {
    const data = await prisma.product.findMany();

    return data;
  },

  create: async (newProductData: createProp) => {
    const newProduct = await prisma.product.create({ data: newProductData });
    return newProduct;
  },

  createTest: async (newProductData: createProp) => {
    const { name, price, initial_date, id_category } = newProductData;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        initial_date,
        category: {
          connect: { id: id_category },
        },
      },
    });
    return newProduct;
  },
};

// category: {
//   connect: {
//     id: id_category,
//   },
// },
