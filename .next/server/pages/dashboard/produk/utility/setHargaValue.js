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
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ({

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lzg3");


/***/ }),

/***/ "lzg3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setHargaValue; });
function setHargaValue(form, changedValues, allValues, unit, firstInput) {
  if (unit == "1") {
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || null;
    const qty_unit2 = changedValues.qty_2 || allValues.qty_2 || null;
    const qty_unit3 = changedValues.qty_3 || allValues.qty_3 || null;
    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;
    const hargaPembelian_unit2 = hargaPembelian_unit1 / qty_unit2;
    const diskonPembelian_unit2 = hargaDiskon_unit1 / qty_unit2;
    const hargaJual_unit2 = hargaJual_unit1 / qty_unit2;
    const hargaPricelist_unit2 = hargaPricelist_unit1 / qty_unit2;
    const hargaPembelian_unit3 = hargaPembelian_unit1 / qty_unit3;
    const diskonPembelian_unit3 = hargaDiskon_unit1 / qty_unit3;
    const hargaJual_unit3 = hargaJual_unit1 / qty_unit3;
    const hargaPricelist_unit3 = hargaPricelist_unit1 / qty_unit3;
    const hargaPembelian_unit4 = hargaPembelian_unit1 / qty_unit4;
    const diskonPembelian_unit4 = hargaDiskon_unit1 / qty_unit4;
    const hargaJual_unit4 = hargaJual_unit1 / qty_unit4;
    const hargaPricelist_unit4 = hargaPricelist_unit3 / qty_unit4;
    const hargaPembelian_unit5 = hargaPembelian_unit1 / qty_unit5;
    const diskonPembelian_unit5 = hargaDiskon_unit1 / qty_unit5;
    const hargaJual_unit5 = hargaJual_unit1 / qty_unit5;
    const hargaPricelist_unit5 = hargaPricelist_unit1 / qty_unit5;
    form.setFieldsValue({
      buy_price_1: changedValues.qty_1 !== null ? hargaPembelian_unit1 : null,
      purchase_discount_1: changedValues.qty_1 !== null ? hargaDiskon_unit1 : null,
      sold_price_1: changedValues.qty_1 !== null ? hargaJual_unit1 : null,
      pricelist_1: changedValues.qty_1 !== null ? hargaPricelist_unit1 : null
    });

    if (qty_unit2) {
      form.setFieldsValue({
        buy_price_2: hargaPembelian_unit2,
        purchase_discount_2: diskonPembelian_unit2,
        sold_price_2: hargaJual_unit2,
        pricelist_2: hargaPricelist_unit2
      });
    }

    if (qty_unit3) {
      form.setFieldsValue({
        buy_price_3: hargaPembelian_unit3,
        purchase_discount_3: diskonPembelian_unit3,
        sold_price_3: hargaJual_unit3,
        pricelist_3: hargaPricelist_unit3
      });
    }

    if (qty_unit4) {
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4
      });
    }

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5
      });
    }
  }

  if (unit == "2") {
    const qty_unit2 = changedValues.qty_2 || allValues.qty_2 || null;
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || null;
    const hargaPembelian_unit2 = hargaPembelian_unit1 / qty_unit2;
    const diskonPembelian_unit2 = hargaDiskon_unit1 / qty_unit2;
    const hargaJual_unit2 = hargaJual_unit1 / qty_unit2;
    const hargaPricelist_unit2 = hargaPricelist_unit1 / qty_unit2;

    if (qty_unit2) {
      form.setFieldsValue({
        buy_price_2: hargaPembelian_unit2,
        purchase_discount_2: diskonPembelian_unit2,
        sold_price_2: hargaJual_unit2,
        pricelist_2: hargaPricelist_unit2
      });
    }
  } else if (unit === "3" && firstInput) {
    const qty_unit3 = changedValues.qty_3 || allValues.qty_3 || null;
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || null;
    const hargaPembelian_unit3 = hargaPembelian_unit1 / qty_unit3;
    const diskonPembelian_unit3 = hargaDiskon_unit1 / qty_unit3;
    const hargaJual_unit3 = hargaJual_unit1 / qty_unit3;
    const hargaPricelist_unit3 = hargaPricelist_unit1 / qty_unit3;

    if (qty_unit3) {
      form.setFieldsValue({
        buy_price_3: hargaPembelian_unit3,
        purchase_discount_3: diskonPembelian_unit3,
        sold_price_3: hargaJual_unit3,
        pricelist_3: hargaPricelist_unit3
      });
    }
  } else if (unit === "4" && firstInput) {
    const qty_unit4 = changedValues.qty_4 || allValues.qty_4 || null;
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || null;
    const hargaPembelian_unit4 = hargaPembelian_unit1 / qty_unit4;
    const diskonPembelian_unit4 = hargaDiskon_unit1 / qty_unit4;
    const hargaJual_unit4 = hargaJual_unit1 / qty_unit4;
    const hargaPricelist_unit4 = hargaPricelist_unit1 / qty_unit4;

    if (qty_unit4) {
      form.setFieldsValue({
        buy_price_4: hargaPembelian_unit4,
        purchase_discount_4: diskonPembelian_unit4,
        sold_price_4: hargaJual_unit4,
        pricelist_4: hargaPricelist_unit4
      });
    }
  } else if (unit === "5" && firstInput) {
    const qty_unit5 = changedValues.qty_5 || allValues.qty_5 || null;
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || null;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || null;
    const hargaPricelist_unit1 = changedValues.pricelist_1 || allValues.pricelist_1 || null;
    const hargaPembelian_unit5 = hargaPembelian_unit1 / qty_unit5;
    const diskonPembelian_unit5 = hargaDiskon_unit1 / qty_unit5;
    const hargaJual_unit5 = hargaJual_unit1 / qty_unit5;
    const hargaPricelist_unit5 = hargaPricelist_unit1 / qty_unit5;

    if (qty_unit5) {
      form.setFieldsValue({
        buy_price_5: hargaPembelian_unit5,
        purchase_discount_5: diskonPembelian_unit5,
        sold_price_5: hargaJual_unit5,
        pricelist_5: hargaPricelist_unit5
      });
    }
  }
}

/***/ })

/******/ });