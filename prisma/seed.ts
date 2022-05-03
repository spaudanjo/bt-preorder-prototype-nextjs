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

  const orderFormId = "189432";
  await prisma.orderForm.create({
    data: {
      id: orderFormId,
      title: "Order Form 1",
      slug: "order-form-1",
      status: "ACTIVE",
    },
  });

  await prisma.orderFormItem.create({
    data: {
      orderFormId,
      orderFormViewType: "INFO_MESSAGE",
      itemSequence: 1,
      infoMessageFormInfoMessage: "Hello - this is the first info message",
    },
  });

  await prisma.orderFormItem.create({
    data: {
      orderFormId,
      orderFormViewType: "SHOPPING_FORM",
      itemSequence: 2,
      shoppingFormShoppingInfo: "Hello from the first shopping form",
    },
  });

  await prisma.orderFormItem.create({
    data: {
      orderFormId,
      orderFormViewType: "INFO_MESSAGE",
      itemSequence: 3,
      infoMessageFormInfoMessage: "Thank you for your order and message!",
    },
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
