import { PrismaClient } from "@prisma/client";

let client: PrismaClient | null = null;

export const prismaClient = (): PrismaClient => {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
};
