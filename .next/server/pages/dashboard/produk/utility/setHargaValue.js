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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lzg3");


/***/ }),

/***/ "lzg3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setHargaValue; });
function setHargaValue(form, changedValues, allValues, fieldName, firstInput) {
  if (fieldName === "qty_2" && firstInput) {
    const hargaPembelian_unit1 = changedValues.buy_price_1 || allValues.buy_price_1 || 0;
    const qty_unit2 = changedValues.qty_2 || changedValues.qty_2 || 0;
    const hargaDiskon_unit1 = changedValues.purchase_discount_1 || allValues.purchase_discount_1 || null;
    const hargaJual_unit1 = changedValues.sold_price_1 || allValues.sold_price_1 || 0;
    const hargaPembelian_unit2 = hargaPembelian_unit1 / qty_unit2;
    const diskonPembelian_unit2 = hargaDiskon_unit1 / qty_unit2;
    const hargaJual_unit2 = hargaJual_unit1 / qty_unit2;
    form.setFieldsValue({
      buy_price_2: changedValues.qty_2 !== null ? Math.round(hargaPembelian_unit2) : null,
      purchase_discount_2: changedValues.qty_2 !== null ? Math.round(diskonPembelian_unit2) : null,
      sold_price_2: changedValues.qty_2 !== null ? Math.round(hargaJual_unit2) : null
    });
  } else if (fieldName === "qty_3" && firstInput) {
    const hargaPembelian_unit2 = changedValues.buy_price_2 || allValues.buy_price_2 || 0;
    const qty_unit3 = changedValues.qty_3 || changedValues.qty_3 || 0;
    const hargaDiskon_unit2 = changedValues.purchase_discount_2 || allValues.purchase_discount_2 || null;
    const hargaJual_unit2 = changedValues.sold_price_2 || allValues.sold_price_2 || 0;
    const hargaPembelian_unit3 = hargaPembelian_unit2 / qty_unit3;
    const diskonPembelian_unit3 = hargaDiskon_unit2 / qty_unit3;
    const hargaJual_unit3 = hargaJual_unit2 / qty_unit3;
    form.setFieldsValue({
      buy_price_3: changedValues.qty_3 !== null ? Math.round(hargaPembelian_unit3) : null,
      purchase_discount_3: changedValues.qty_3 !== null ? Math.round(diskonPembelian_unit3) : null,
      sold_price_3: changedValues.qty_3 !== null ? Math.round(hargaJual_unit3) : null
    });
  } else if (fieldName === "qty_4" && firstInput) {
    const hargaPembelian_unit3 = changedValues.buy_price_3 || allValues.buy_price_3 || 0;
    const qty_unit4 = changedValues.qty_4 || changedValues.qty_4 || 0;
    const hargaDiskon_unit3 = changedValues.purchase_discount_3 || allValues.purchase_discount_3 || null;
    const hargaJual_unit3 = changedValues.sold_price_3 || allValues.sold_price_3 || 0;
    const hargaPembelian_unit4 = hargaPembelian_unit3 / qty_unit4;
    const diskonPembelian_unit4 = hargaDiskon_unit3 / qty_unit4;
    const hargaJual_unit4 = hargaJual_unit3 / qty_unit4;
    form.setFieldsValue({
      buy_price_4: changedValues.qty_4 !== null ? Math.round(hargaPembelian_unit4) : null,
      purchase_discount_4: changedValues.qty_4 !== null ? Math.round(diskonPembelian_unit4) : null,
      sold_price_4: changedValues.qty_4 !== null ? hargaJual_unit4 : null
    });
  } else if (fieldName === "qty_5" && firstInput) {
    const hargaPembelian_unit4 = changedValues.buy_price_4 || allValues.buy_price_4 || 0;
    const qty_unit5 = changedValues.qty_5 || changedValues.qty_5 || 0;
    const hargaDiskon_unit4 = changedValues.purchase_discount_4 || allValues.purchase_discount_4 || null;
    const hargaJual_unit4 = changedValues.sold_price_4 || allValues.sold_price_4 || 0;
    const hargaPembelian_unit5 = hargaPembelian_unit4 / qty_unit5;
    const diskonPembelian_unit5 = hargaDiskon_unit4 / qty_unit5;
    const hargaJual_unit5 = hargaJual_unit4 / qty_unit5;
    form.setFieldsValue({
      buy_price_5: changedValues.qty_5 !== null ? Math.round(hargaPembelian_unit5) : null,
      purchase_discount_5: changedValues.qty_5 !== null ? Math.round(diskonPembelian_unit5) : null,
      sold_price_5: changedValues.qty_5 !== null ? Math.round(hargaJual_unit5) : null
    });
  }
}

/***/ })

/******/ });