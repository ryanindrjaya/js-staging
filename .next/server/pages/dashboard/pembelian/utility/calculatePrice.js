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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("OrCr");


/***/ }),

/***/ "OrCr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calculatePrice; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function calculatePrice(row, products, productTotalPrice, productSubTotal, setTotalPrice) {
  var _row$attributes, _row$attributes2, _row$attributes3, _products$productInfo, _products$productInfo3, _products$productInfo4, _products$productInfo5, _products$productInfo7, _products$productInfo8, _products$productInfo9, _products$productInfo11, _products$productInfo12, _products$productInfo13, _products$productInfo15, _products$productInfo18;

  var priceUnit = row.attributes[`buy_price_1`];
  var qty = 1;
  var disc = 0;
  var Dp1 = (_row$attributes = row.attributes) === null || _row$attributes === void 0 ? void 0 : _row$attributes.unit_1_dp1;
  var Dp2 = (_row$attributes2 = row.attributes) === null || _row$attributes2 === void 0 ? void 0 : _row$attributes2.unit_1_dp2;
  var Dp3 = (_row$attributes3 = row.attributes) === null || _row$attributes3 === void 0 ? void 0 : _row$attributes3.unit_1_dp3; // check if Dp1, Dp2, Dp3 changed

  if ((_products$productInfo = products.productInfo[row.id]) !== null && _products$productInfo !== void 0 && _products$productInfo.d1) {
    var _products$productInfo2;

    Dp1 = (_products$productInfo2 = products.productInfo[row.id].d1) !== null && _products$productInfo2 !== void 0 ? _products$productInfo2 : 1;
  } else if (((_products$productInfo3 = products.productInfo[row.id]) === null || _products$productInfo3 === void 0 ? void 0 : _products$productInfo3.d1) === 0 || ((_products$productInfo4 = products.productInfo[row.id]) === null || _products$productInfo4 === void 0 ? void 0 : _products$productInfo4.d1) === null) {
    Dp1 = 0;
  }

  if ((_products$productInfo5 = products.productInfo[row.id]) !== null && _products$productInfo5 !== void 0 && _products$productInfo5.d2) {
    var _products$productInfo6;

    Dp2 = (_products$productInfo6 = products.productInfo[row.id].d2) !== null && _products$productInfo6 !== void 0 ? _products$productInfo6 : 1;
  } else if (((_products$productInfo7 = products.productInfo[row.id]) === null || _products$productInfo7 === void 0 ? void 0 : _products$productInfo7.d2) === 0 || ((_products$productInfo8 = products.productInfo[row.id]) === null || _products$productInfo8 === void 0 ? void 0 : _products$productInfo8.d2) === null) {
    Dp2 = 0;
  }

  if ((_products$productInfo9 = products.productInfo[row.id]) !== null && _products$productInfo9 !== void 0 && _products$productInfo9.d3) {
    var _products$productInfo10;

    Dp3 = (_products$productInfo10 = products.productInfo[row.id].d3) !== null && _products$productInfo10 !== void 0 ? _products$productInfo10 : 1;
  } else if (((_products$productInfo11 = products.productInfo[row.id]) === null || _products$productInfo11 === void 0 ? void 0 : _products$productInfo11.d3) === 0 || ((_products$productInfo12 = products.productInfo[row.id]) === null || _products$productInfo12 === void 0 ? void 0 : _products$productInfo12.d3) === null) {
    Dp3 = 0;
  } // check if price changed


  if ((_products$productInfo13 = products.productInfo[row.id]) !== null && _products$productInfo13 !== void 0 && _products$productInfo13.priceUnit) {
    var _products$productInfo14;

    priceUnit = (_products$productInfo14 = products.productInfo[row.id].priceUnit) !== null && _products$productInfo14 !== void 0 ? _products$productInfo14 : row.attributes[`buy_price_1`];
  } // check if qty changed


  if ((_products$productInfo15 = products.productInfo[row.id]) !== null && _products$productInfo15 !== void 0 && _products$productInfo15.qty) {
    var _products$productInfo16, _products$productInfo17;

    qty = (_products$productInfo16 = (_products$productInfo17 = products.productInfo[row.id]) === null || _products$productInfo17 === void 0 ? void 0 : _products$productInfo17.qty) !== null && _products$productInfo16 !== void 0 ? _products$productInfo16 : 1;
  } // check if disc changed


  if ((_products$productInfo18 = products.productInfo[row.id]) !== null && _products$productInfo18 !== void 0 && _products$productInfo18.disc) {
    var _products$productInfo19, _products$productInfo20;

    disc = (_products$productInfo19 = (_products$productInfo20 = products.productInfo[row.id]) === null || _products$productInfo20 === void 0 ? void 0 : _products$productInfo20.disc) !== null && _products$productInfo19 !== void 0 ? _products$productInfo19 : 0;
  }

  priceUnit = priceUnit - disc;
  var price1 = calculatePercentage(priceUnit, Dp1);
  var price2 = calculatePercentage(price1, Dp2);
  var price3 = calculatePercentage(price2, Dp3); // set product price after disc & sub total

  productTotalPrice[row.id] = price3;
  productSubTotal[row.id] = price3 * qty; // set all product total

  var total = 0;

  for (var key in productSubTotal) {
    total = total + productSubTotal[key];
  }

  setTotalPrice(total);
  return productTotalPrice[row.id];
}

const calculatePercentage = (value, percent) => {
  var newValue = value - value * percent / 100;
  return newValue;
};

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });