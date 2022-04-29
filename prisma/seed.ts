import { PrismaClient, ProductGender } from "@prisma/client";
import products from "../data/products";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "daniel@spaude.de",
      role: "ADMIN",
    },
  });

  await prisma.product.createMany({
    data: products.map((product) => ({
      ...product,
      id: uuidv4(),
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
