const initState = {
  productList: [],
  productInfo: {},
  preorderData: {},
};

export default function Reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.productList.push(action.product);
      return {
        ...state,
        productList: [...state.productList],
      };

    case "REMOVE_PRODUCT":
      state.productList.splice(action.index, 1);
      return {
        ...state,
        productList: [...state.productList],
      };

    case "CHANGE_PRODUCT_UNIT":
      var index = action.index;
      var id = action.product.id;
      var data = action.product.attributes;

      return {
        ...state,
        productInfo: {
          ...state.productInfo,
          [id]: {
            ...state.productInfo[id],
            priceUnit: data[`buy_price_${index}`],
            unit: data[`unit_${index}`],
            d1: data[`unit_${index}_dp1`],
            d2: data[`unit_${index}_dp2`],
            d3: data[`unit_${index}_dp3`],
          },
        },
      };

    case "CHANGE_PRODUCT_QTY":
      var qty = action.qty;
      var id = action.product.id;
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
      var id = action.product.id;
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
      var id = action.product.id;
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
      var id = action.product.id;
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
      var id = action.product.id;
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

    case "SET_PRICE_AFTER_DISC":
      var price = action.price;
      var id = action.product.id;
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
      var id = action.product.id;
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
      var id = action.product.id;

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
