import { PrismaClient, ProductGender } from "@prisma/client";
import products from "../data/products";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const generateStockDataItems = async () => {
  const sizeAndNumberOfItemTuples: [string, number][] = [
    ["L", 30],
    ["M", 90],
    ["S", 49],
  ];
  const orderItems = products.flatMap((product) =>
    sizeAndNumberOfItemTuples.map(([size, availableItems]) => ({
      productId: product.id,
      size,
      availableItems,
    }))
  );

  await prisma.stockDataItem.createMany({
    data: orderItems,
  });
};

async function main() {
  await prisma.user.create({
    data: {
      email: "daniel@spaude.de",
      role: "ADMIN",
    },
  });

  await prisma.product.createMany({
    data: products,
  });

  await generateStockDataItems();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
