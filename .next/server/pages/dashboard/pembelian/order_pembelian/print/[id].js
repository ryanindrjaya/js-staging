module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/_next/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("n8t7");


/***/ }),

/***/ "E4Nl":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/lib/icons/PrinterOutlined");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "Z2Lb":
/***/ (function(module, exports) {

module.exports = require("react-to-print");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "n8t7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ant_design_icons_lib_icons_PrinterOutlined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("E4Nl");
/* harmony import */ var _ant_design_icons_lib_icons_PrinterOutlined__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_lib_icons_PrinterOutlined__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Z2Lb");
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_to_print__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);







const Print = ({
  props
}) => {
  const name = "APOTEK JAYA SEHAT";
  const noPO = props.purchases.data.attributes.no_po;
  const date = new Date(props.purchases.data.attributes.order_date).toLocaleDateString("id-ID");
  const supplierName = props.purchases.data.attributes.supplier.data.attributes.name;
  const supplierAddress = props.purchases.data.attributes.supplier.data.attributes.address;
  const destination = props.purchases.data.attributes.location.data.attributes;
  const destionationName = destination.name;
  const destinationStreet = `${destination.street} `;
  const destinationAddress = `${destination.city} ${destination.province} ${destination.postal_code} ${destination.country}`;
  const items = props.purchases.data.attributes.purchase_details.data;
  const deliveryFee = props.purchases.data.attributes.delivery_fee;
  const TotalHarga = props.purchases.data.attributes.delivery_total;
  var index = 0;

  const getHargaSatuan = (unit, index) => {
    var price = 0;
    const product = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.products.data[0];

    for (let index = 1; index < 6; index++) {
      if (product.attributes[`unit_${index}`] === unit) {
        price = product.attributes[`buy_price_${index}`];
      }
    }

    return formatter.format(price);
  };

  const getProductDisc = (unit, index) => {
    var disc1 = 0;
    var disc2 = 0;
    var disc3 = 0;
    const discInput = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.disc;
    const product = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.products.data[0];

    for (let index = 1; index < 6; index++) {
      if (product.attributes[`unit_${index}`] === unit) {
        disc1 = product.attributes[`unit_${index}_dp1`];
        disc2 = product.attributes[`unit_${index}_dp2`];
        disc3 = product.attributes[`unit_${index}_dp3`];
      }
    }

    return `${formatter.format(discInput)}, ${disc1}%, ${disc2}%, ${disc3}%`;
  };

  const getSubTotal = index => {
    var subTotal = props.purchases.data.attributes.purchase_details.data[index - 1].attributes.sub_total;
    return formatter.format(subTotal);
  };

  const getTotalProduct = () => {
    var total = 0;
    props.purchases.data.attributes.purchase_details.data.forEach(element => {
      total = total + element.attributes.sub_total;
    });
    return formatter.format(total);
  };

  const getAdditionalFee = () => {
    var desc1 = props.purchases.data.attributes[`additional_fee_1_desc`];
    var desc2 = props.purchases.data.attributes[`additional_fee_2_desc`];
    var desc3 = props.purchases.data.attributes[`additional_fee_3_desc`];
    var desc4 = props.purchases.data.attributes[`additional_fee_4_desc`];
    var desc5 = props.purchases.data.attributes[`additional_fee_5_desc`];
    var disc1 = formatter.format(props.purchases.data.attributes[`additional_fee_1_sub`]);
    var disc2 = formatter.format(props.purchases.data.attributes[`additional_fee_2_sub`]);
    var disc3 = formatter.format(props.purchases.data.attributes[`additional_fee_3_sub`]);
    var disc4 = formatter.format(props.purchases.data.attributes[`additional_fee_4_sub`]);
    var disc5 = formatter.format(props.purchases.data.attributes[`additional_fee_5_sub`]);
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      className: "text-right",
      children: [disc1 !== "Rp 0" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [desc1, " : ", disc1]
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {}), disc2 !== "Rp 0" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [desc2, " : ", disc2]
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {}), disc3 !== "Rp 0" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [desc3, " : ", disc3]
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {}), disc4 !== "Rp 0" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [desc4, " : ", disc4]
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {}), disc5 !== "Rp 0" ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [desc5, " : ", disc5]
      }) : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {})]
    });
  };

  const print = () => {
    window.print();
    return false;
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  });
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
    className: "m-3",
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "flex justify-end mb-5",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("button", {
        onClick: print,
        class: "print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("span", {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(_ant_design_icons_lib_icons_PrinterOutlined__WEBPACK_IMPORTED_MODULE_0___default.a, {
            className: "mr-1 text-lg"
          })
        }), " ", "Cetak Dokumen"]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      id: "printableArea",
      className: "flex justify-between",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
        className: "font-bold text-lg",
        children: name
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
          className: "",
          children: ["NO : ", noPO]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
          className: "",
          children: ["Tanggal : ", date]
        })]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "font-bold text-lg flex justify-center mb-5",
      children: "ORDER PEMBELIAN"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      className: "flex justify-between mb-5",
      children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
          className: "font-bold text-sm",
          children: "KEPADA"
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
          className: "font-bold text-sm uppercase",
          children: ["Nama Supplier : ", supplierName]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
          children: supplierAddress
        })]
      }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
          className: "font-bold  text-sm uppercase",
          children: ["ALAMAT PENGIRIMAN : ", destionationName]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
          children: destinationStreet
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
          children: destinationAddress
        })]
      })]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "flex justify-between",
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("table", {
        className: "w-full",
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("tr", {
          className: "p-2",
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "NO"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "ITEM"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "HARGA SATUAN"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "TOTAL UNIT"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "DISC"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("th", {
            className: "border-2 p-2",
            children: "TOTAL HARGA"
          })]
        }), items.map(element => {
          index++;
          return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("tr", {
            children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("td", {
              className: "border-2 p-2",
              children: index
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("td", {
              className: "border-2 p-2",
              children: element.attributes.products.data[0].attributes.name
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("td", {
              className: "border-2 p-2",
              children: getHargaSatuan(element.attributes.unit_order, index)
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("td", {
              className: "border-2 p-2",
              children: [element.attributes.total_order, " ", element.attributes.unit_order]
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("td", {
              className: "border-2 p-2",
              children: getProductDisc(element.attributes.unit_order, index)
            }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("td", {
              className: "border-2 p-2",
              children: getSubTotal(index)
            })]
          });
        })]
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      className: "font-bold  text-sm uppercase mt-3 flex justify-end",
      children: ["TOTAL HARGA : ", getTotalProduct()]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      className: "font-bold  text-sm uppercase mt-4 flex justify-end",
      children: ["BIAYA PENGIRIMAN : ", formatter.format(deliveryFee)]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "font-bold  text-sm uppercase mt-4 flex justify-end",
      children: "TAMBAHAN :"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: " text-sm uppercase mt-2 flex justify-end",
      children: getAdditionalFee()
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxs"])("div", {
      className: "font-bold  text-sm uppercase mt-4 flex justify-end",
      children: ["TOTAL PESANAN : ", formatter.format(TotalHarga)]
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "font-bold  text-sm uppercase mt-10 flex justify-end",
      children: "HORMAT KAMI"
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])("div", {
      className: "font-bold  text-sm uppercase mt-10 flex justify-end",
      children: "_____________________________"
    })]
  });
};

Print.getInitialProps = async context => {
  const cookies = nookies__WEBPACK_IMPORTED_MODULE_2___default.a.get(context);
  const id = context.query.id;
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/purchases/" + id + "?populate=deep";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    }
  };
  const res = await fetch(endpoint, options);
  const purchases = await res.json();
  return {
    props: {
      purchases
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Print);

/***/ })

/******/ });