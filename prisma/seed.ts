import { PrismaClient, Product, ProductGender } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const generateStockDataItems = async (productIds: string[]) => {
  const sizeAndNumberOfItemTuples: [string, number][] = [
    ["L", 30],
    ["M", 90],
    ["S", 49],
  ];
  const orderItems = productIds.flatMap((productId) =>
    sizeAndNumberOfItemTuples.map(([size, availableItems]) => ({
      productId: productId,
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

  const productCategory1Id = "2ef70c85-ab21-4046-af3d-8a54a90b03bf";
  await prisma.productCategory.create({
    data: {
      id: productCategory1Id,
      name: "Tshirt",
    },
  });

  const products = [
    {
      id: "dc40d1d4-8541-4cc7-bb31-aaa114dd73cc",
      productCategoryId: productCategory1Id,
      name: "Long Skirt",
      gender: ProductGender.FEMALE,
    },
    {
      id: "263741aa-c536-41f9-9f09-22d9a086e1d3",
      productCategoryId: productCategory1Id,
      name: "Jeans",
      gender: ProductGender.MALE,
    },
    {
      id: "2701b890-d9b9-4b6e-8b1f-09a33850f77d",
      productCategoryId: productCategory1Id,
      name: "Beanie",
      gender: ProductGender.KIDS,
    },
  ];
  await prisma.product.createMany({
    data: products,
  });

  await generateStockDataItems(products.map(p => p.id));

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
