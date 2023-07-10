const initState = {
  productList: [],
  productInfo: {},
  preorderData: {},
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.productList.push(action.product);
      let productInfo = state.productInfo;
      const idx = state.productList.length - 1;
      return {
        ...state,
        productList: [...state.productList],
        productInfo: {
          ...productInfo,
          [idx]: {
            priceUnit: action.product.attributes.sold_price_1,
            unit: action.product.attributes.unit_1,
            d1: action.product.attributes?.disc_1_1 ?? 0,
            d2: action.product.attributes?.unit_1_dp2 ?? 0,
            d3: 0,
            disc: 0,
            qty: 1,
            unitIndex: 1,
          },
        },
      };

    case "REMOVE_PRODUCT":
      state.productList.splice(action.index, 1);
      let productInfoCopy = state.productInfo;
      delete productInfoCopy[action.index];
      return {
        ...state,
        productList: [...state.productList],
        productInfo: productInfoCopy,
      };

    case "CHANGE_PRODUCT_UNIT":
      var unit = action.unit;
      var id = action.index;
      var data = action.product.attributes;
      console.log("change product unit redux ", data);
      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            priceUnit: data[`sold_price_${unit}`],
            unit: data[`unit_${unit}`],
            d1: data[`disc_1_${unit}`],
            d2: data[`unit_${unit}_dp2`],
            d3: data[`unit_${unit}_dp3`],
            disc: data[`disc_1_${unit}`],
            unitIndex: unit,
          },
        },
      };

    case "CHANGE_PRODUCT_QTY":
      var qty = action.qty;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            qty: qty,
          },
        },
      };

    case "CHANGE_PRODUCT_D1":
      var d1 = action.d1;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            d1: d1,
          },
        },
      };

    case "CHANGE_PRODUCT_D2":
      var d2 = action.d2;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            d2: d2,
          },
        },
      };

    case "CHANGE_PRODUCT_D3":
      var d3 = action.d3;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            d3: d3,
          },
        },
      };

    case "CHANGE_PRODUCT_DISC":
      var disc = action.disc;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            disc: disc,
          },
        },
      };

    case "CHANGE_PRODUCT_MARGIN":
      var margin = action.margin;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            margin: margin,
          },
        },
      };

    case "CHANGE_PRODUCT_PRICE":
      var unit_price = action.unit_price;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            priceUnit: unit_price,
          },
        },
      };

    case "SET_PRICE_AFTER_DISC":
      var price = action.price;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            priceAfterDisc: price,
          },
        },
      };

    case "SET_SUBTOTAL":
      var subTotal = action.subTotal;
      var id = action.index;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            subTotal: subTotal,
          },
        },
      };

    case "SET_INITIAL_PRODUCT":
      state.productList.push(action.product);
      var id = action.index;

      return {
        ...state,
        productList: [...state.productList],
        productInfo: {
          ...state.productInfo,
          [id]: {
            qty: action.qty,
            unit: action.unit,
            unitIndex: action.unitIndex,
            priceUnit: action.priceUnit,
            disc: action.disc,
            priceAfterDisc: action.priceAfterDisc,
            subTotal: action.subTotal,
            d1: action.d1,
            d2: action.d2,
            d3: action.d3,
            relation_id: action?.relation_id,
            margin: action.margin,
          },
        },
      };

    case "SET_SALE_INITIAL_PRODUCT":
      state.productList.push(action.product);
      var id = action.index;

      return {
        ...state,
        productList: [...state.productList],
        productInfo: {
          ...state.productInfo,
          [id]: {
            qty: action.qty,
            unit: action.unit,
            unitIndex: action.unitIndex,
            priceUnit: action.priceUnit,
            disc: action.disc,
            priceAfterDisc: action.priceAfterDisc,
            subTotal: action.subTotal,
            d1: action.d1,
            d2: action.d2,
            d3: action.d3,
            margin: action.margin,
          },
        },
      };

    case "SET_PREORDER_DATA":
      return {
        ...state,
        preorderData: {
          data: action.data,
        },
      };

    case "CLEAR_DATA":
      state = { productList: [], productInfo: {}, preorderData: {} };
      return state;

    default:
      return state;
  }
}
