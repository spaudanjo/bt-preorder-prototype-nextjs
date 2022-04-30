import { objectType, extendType, nonNull } from 'nexus'

export const StockDataItem = objectType({
  name: 'StockDataItem',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('availableItems')
    t.nonNull.string('size')
    // t.nonNull.field('product', {
    //   type: nonNull(Product),
    //   resolve(parent, _args, ctx) {
    //     return ctx.prisma.product.findFirst({
    //       where: {
    //         id: parent.productId
    //       }
    //     })
    //   }
    // })
//   gender      ProductGender
//   orderItems  OrderItem[]
  },
})

export const StockDataItemsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('stockDataItems', {
        type: nonNull('StockDataItem'),
        resolve(_parent, _args, ctx) {
          return ctx.prisma.stockDataItem.findMany()
        }
      })
    },
  })
  
