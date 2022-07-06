import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UserProps = {
  name: string;
  user_name: string;
  password: string;
  token: string;
  position: number;
};

export const UserService = {
  all: async () => {
    const users = await prisma.user.findMany();
    return users;
  },

  create: async (newUser: UserProps) => {
    const user = await prisma.user.create({ data: newUser });
    //   return user;
    return await newUser;
  },
  login: async (user_name: string, password: string) => {
    const user = await prisma.user.findFirst({
      where: {
        user_name,
        password,
      },
    });
    return user;
  },
};
