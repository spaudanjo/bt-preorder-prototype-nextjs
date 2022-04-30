import { objectType, extendType, nonNull } from 'nexus'
import { Product } from './Product'

export const StockDataItem = objectType({
  name: 'StockDataItem',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('availableItems')
    t.nonNull.string('size')
    t.nonNull.field('product', {
      type: nonNull(Product),
      async resolve(parent, _args, ctx) {
        const productOfStockDataItem = await ctx.prisma.stockDataItem.findFirst({
          where: {id: parent.id}
        }).product()
        return productOfStockDataItem!
      }
    })
  },
})

export const StockDataItemsQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('stockDataItems', {
        type: nonNull('StockDataItem'),
        resolve(_parent, _args, ctx) {
          return ctx.prisma.stockDataItem.findMany({
            include: {
              product: true
            }
          })
        }
      })
    },
  })
  
