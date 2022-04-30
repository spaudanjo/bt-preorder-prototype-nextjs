import { objectType, extendType, nonNull } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
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
  
