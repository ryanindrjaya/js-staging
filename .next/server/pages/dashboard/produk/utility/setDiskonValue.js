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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("RnN9");


/***/ }),

/***/ "RnN9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setDiskonValue; });
function setDiskonValue(form, changedValues, allValues, fieldName, firstInputDiskon) {
  if (fieldName === "unit_2" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const pricelist = changedValues.pricelist_1 || allValues.pricelist_1 || 0;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || 0;
    form.setFieldsValue({
      unit_2_dp1: diskonUnit_1,
      unit_2_dp2: diskonUnit_2,
      unit_2_dp3: diskonUnit_3,
      pricelist_2: pricelist,
      disc_1_2: diskonJualPersen
    });
  } else if (fieldName === "unit_3" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const pricelist = changedValues.pricelist_1 || allValues.pricelist_1 || 0;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || 0;
    form.setFieldsValue({
      unit_3_dp1: diskonUnit_1,
      unit_3_dp2: diskonUnit_2,
      unit_3_dp3: diskonUnit_3,
      pricelist_3: pricelist,
      disc_1_3: diskonJualPersen
    });
  } else if (fieldName === "unit_4" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const pricelist = changedValues.pricelist_1 || allValues.pricelist_1 || 0;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || 0;
    form.setFieldsValue({
      unit_4_dp1: diskonUnit_1,
      unit_4_dp2: diskonUnit_2,
      unit_4_dp3: diskonUnit_3,
      pricelist_4: pricelist,
      disc_1_4: diskonJualPersen
    });
  } else if (fieldName === "unit_5" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const pricelist = changedValues.pricelist_1 || allValues.pricelist_1 || 0;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || 0;
    form.setFieldsValue({
      unit_5_dp1: diskonUnit_1,
      unit_5_dp2: diskonUnit_2,
      unit_5_dp3: diskonUnit_3,
      pricelist_5: pricelist,
      disc_1_5: diskonJualPersen
    });
  }
}

/***/ })

/******/ });