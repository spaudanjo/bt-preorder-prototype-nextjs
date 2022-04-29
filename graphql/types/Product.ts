import { objectType, extendType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.string('id')
    t.string('name')
//   gender      ProductGender
//   orderItems  OrderItem[]
  },
})

export const ProductsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('products', {
        type: 'Product',
        resolve(_parent, _args, ctx) {
          return ctx.prisma.product.findMany()
        },
      })
    },
  })
  
