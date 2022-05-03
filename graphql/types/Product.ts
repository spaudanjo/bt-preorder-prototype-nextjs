import { objectType, extendType, nonNull, enumType } from "nexus";

export const ProductCategory = objectType({
  name: "ProductCategory",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.field("category", {
      type: nonNull("ProductCategory"),
      async resolve(parent, _args, ctx) {
        const productCategoryOfProduct = await ctx.prisma.product
          .findFirst({
            where: {
              id: parent.id,
            },
          }).productCategory();

          return productCategoryOfProduct!
      },
    });
    t.nonNull.field("gender", {
      type: nonNull(
        enumType({
          name: "Gender",
          members: ["MALE", "FEMALE", "UNISEX", "KIDS"],
        })
      ),
    });
    //   gender      ProductGender
    //   orderItems  OrderItem[]
  },
});

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("products", {
      type: nonNull("Product"),
      resolve(_parent, _args, ctx) {
        return ctx.prisma.product.findMany();
      },
    });
  },
});
