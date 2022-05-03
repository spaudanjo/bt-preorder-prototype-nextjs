import { objectType, extendType, nonNull, enumType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.field("gender", {
      type: nonNull(
        enumType({
          name: "Gender",
          members: ["MALE", "FEMALE", "UNISEX", "KIDS"]
        })
      ),
    });
//   gender      ProductGender
//   orderItems  OrderItem[]
  },
})

export const ProductsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('products', {
        type: nonNull('Product'),
        resolve(_parent, _args, ctx) {
          return ctx.prisma.product.findMany()
        }
      })
    },
  })
  
