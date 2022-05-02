import {
  objectType,
  extendType,
  nonNull,
  enumType,
  interfaceType,
  list,
  stringArg,
} from "nexus";
import { Product } from "./Product";
import { StockDataItem } from "./StockData";

export const OrderFormItem = interfaceType({
  name: "OrderFormItem",
  resolveType(source) {
    // TODO: resolve type based on source.orderFormViewType
    return source.orderFormViewType === "INFO_MESSAGE"
      ? "InfoMessageForm"
      : "ShoppingForm";
  },
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.field("orderFormViewType", {
      type: nonNull(
        enumType({
          name: "OrderFormViewType",
          members: ["INFO_MESSAGE", "SHOPPING_FORM", "ORDER_CONFIRMATION"],
        })
      ),
    });
    t.nonNull.int("itemSequence");
  },
});

export const ShoppingForm = objectType({
  name: "ShoppingForm",
  definition(t) {
    t.implements(OrderFormItem);
    t.string("shoppingInfo");
    t.nonNull.list.field("stockData", {
      type: nonNull(StockDataItem),
      async resolve(parent, _args, ctx) {
        return ctx.prisma.stockDataItem.findMany({
          include: {
            product: true,
          },
        });
      },
    });
  },
});

export const InfoMessageForm = objectType({
  name: "InfoMessageForm",
  definition(t) {
    t.implements(OrderFormItem);
    t.nonNull.string("infoMessage");
  },
});

export const OrderForm = objectType({
  name: "OrderForm",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("slug");
    t.nonNull.field("status", {
      type: nonNull(
        enumType({
          name: "OrderFormStatus",
          members: ["ACTIVE", "INACTIVE", "DRAFT"],
        })
      ),
    }),
      t.nonNull.list.field("orderFormItems", {
        type: nonNull(OrderFormItem),
        async resolve(parent, _args, ctx) {
          const orderFormItems = await ctx.prisma.orderForm
            .findFirst({ where: { id: parent.id } })
            .orderFormItems();
          return orderFormItems.map((orderFormItem) => {
            switch (orderFormItem.orderFormViewType) {
              case "INFO_MESSAGE":
                return {
                  ...orderFormItem,
                  infoMessage: orderFormItem.infoMessageFormInfoMessage,
                };
              case "SHOPPING_FORM":
                return {
                  ...orderFormItem,
                  shoppingInfo: orderFormItem.shoppingFormShoppingInfo,
                };
              default:
                return orderFormItem;
            }
          });
        },
      });
  },
});

export const OrderFormQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("orderForms", {
      type: nonNull(OrderForm),
      resolve(_parent, _args, ctx) {
        return ctx.prisma.orderForm.findMany({});
      },
    });
    t.field("orderForm", {
      type: OrderForm,
      args: {
        id: stringArg({
          description: "The form id.",
        }),
      },
      resolve(_parent, args, ctx) {
        if (args.id == null) {
          return null;
        }
        return ctx.prisma.orderForm.findFirst({
          where: { id: args.id },
        });
      },
    });
  },
});
