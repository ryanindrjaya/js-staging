module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/6Z7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



var tempListId = [];
const cookies = nookies__WEBPACK_IMPORTED_MODULE_1___default.a.get(null, "token");

const getUnitPrice = (data, unit) => {
  var unitIndex = 1;

  for (let index = 1; index < 6; index++) {
    if (data.attributes[`unit_${index}`] === unit) {
      unitIndex = index;
    }
  }

  var selectedUnit = data.attributes[`buy_price_${unitIndex}`];
  return selectedUnit;
};

const createDetailOrder = (products, productTotalPrice, productSubTotal, setListId, url) => {
  products.productList.forEach(element => {
    var _products$productInfo, _products$productInfo2, _products$productInfo3, _products$productInfo4, _products$productInfo5, _products$productInfo6, _products$productInfo7, _products$productInfo8, _products$productInfo9, _productSubTotal$id;

    console.log(products);
    console.log(products.productInfo);
    console.log("productTotalPrice", productTotalPrice);
    console.log("productSubTotal", productSubTotal); // default value

    const id = element.id;
    var qty = (_products$productInfo = products === null || products === void 0 ? void 0 : (_products$productInfo2 = products.productInfo) === null || _products$productInfo2 === void 0 ? void 0 : (_products$productInfo3 = _products$productInfo2[id]) === null || _products$productInfo3 === void 0 ? void 0 : _products$productInfo3.qty) !== null && _products$productInfo !== void 0 ? _products$productInfo : 1;
    var disc = (_products$productInfo4 = products === null || products === void 0 ? void 0 : (_products$productInfo5 = products.productInfo) === null || _products$productInfo5 === void 0 ? void 0 : (_products$productInfo6 = _products$productInfo5[id]) === null || _products$productInfo6 === void 0 ? void 0 : _products$productInfo6.disc) !== null && _products$productInfo4 !== void 0 ? _products$productInfo4 : 0;
    var unit = (_products$productInfo7 = (_products$productInfo8 = products.productInfo) === null || _products$productInfo8 === void 0 ? void 0 : (_products$productInfo9 = _products$productInfo8[id]) === null || _products$productInfo9 === void 0 ? void 0 : _products$productInfo9.unit) !== null && _products$productInfo7 !== void 0 ? _products$productInfo7 : element.attributes.unit_1;
    var unitPrice = getUnitPrice(element, unit);
    var unitPriceAfterDisc = (_productSubTotal$id = productSubTotal === null || productSubTotal === void 0 ? void 0 : productSubTotal[id]) !== null && _productSubTotal$id !== void 0 ? _productSubTotal$id : element.attributes.buy_price_1;
    var subTotal = unitPriceAfterDisc * qty;
    console.log(qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal);
    POSTPurchaseDetail(qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal, id, setListId, products, url);
  });
};

const POSTPurchaseDetail = async (qty, disc, unit, unitPrice, unitPriceAfterDisc, subTotal, id, setListId, products, url) => {
  var data = {
    data: {
      total_order: String(qty),
      unit_order: unit,
      unit_price: parseInt(unitPrice),
      unit_price_after_disc: parseInt(unitPriceAfterDisc),
      sub_total: parseInt(subTotal),
      products: {
        id: id
      },
      disc: parseInt(disc)
    }
  };
  const endpoint = "https://strapi-js.keelola.web.id/api" + url;
  const JSONdata = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    },
    body: JSONdata
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();
  console.log(data);
  console.log(res);

  if (req.status === 200) {
    var _res$data;

    tempListId.push((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.id);

    if (tempListId.length === products.productList.length) {
      setListId(tempListId);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (createDetailOrder);

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("/6Z7");


/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ })

/******/ });