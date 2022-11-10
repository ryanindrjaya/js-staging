module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+eM2":
/***/ (function(module, exports) {



/***/ }),

/***/ "0bIN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZFMDAwIiBkPSJNNjQ0LjE2MSA1MzAuMDMydi0xYzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM0gyNC44MDdWMjgyLjg3MWg3NTAuMzg3djIzNC4yNThoLTkxLjMyMmMtNi41NjMgMC0xMS45MDMgNS4zNC0xMS45MDMgMTEuOTAzdjFoLTI3LjgwOHoiLz48cGF0aCBmaWxsPSIjRkZFMDAwIiBkPSJNNjgzLjg3MSA1MTYuMTI5aDkwLjMyMlYyODMuODcxSDI1LjgwN3YyMzIuMjU4aDYwNi40NTFjNy4xMjYgMCAxMi45MDMgNS43NzcgMTIuOTAzIDEyLjkwM2gyNS44MDdjMC03LjEyNiA1Ljc3Ny0xMi45MDMgMTIuOTAzLTEyLjkwM3oiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMjQuODA3IDE1My44MzloNzUwLjM4N3YxMDUuMjI2SDI0LjgwN3oiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMjUuODA3IDE1NC44MzloNzQ4LjM4N3YxMDMuMjI2SDI1LjgwN3ptLTEgNDkxLjMyMlY1NDAuOTM2aDYwNy40NTFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi0xaDI3LjgwN3YxYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2g5MS4zMjJ2MTA1LjIyNkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTY4My44NzEgNTQxLjkzNmMtNy4xMjYgMC0xMi45MDMtNS43NzctMTIuOTAzLTEyLjkwM2gtMjUuODA3YzAgNy4xMjYtNS43NzcgMTIuOTAzLTEyLjkwMyAxMi45MDNIMjUuODA3djEwMy4yMjZoNzQ4LjM4N1Y1NDEuOTM2aC05MC4zMjN6Ii8+PHBhdGggZD0iTTc4Ny4wOTcgMTI5LjAzMkgxMi45MDNDNS43NzcgMTI5LjAzMiAwIDEzNC44MSAwIDE0MS45MzZ2NTE2LjEyOWMwIDcuMTI2IDUuNzc3IDEyLjkwMyAxMi45MDMgMTIuOTAzaDc3NC4xOTNjNy4xMjYgMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM1YxNDEuOTM2Yy4wMDEtNy4xMjYtNS43NzYtMTIuOTA0LTEyLjkwMi0xMi45MDR6bS0xMi45MDQgMjUuODA3djEwMy4yMjZIMjUuODA3VjE1NC44MzloNzQ4LjM4NnpNMjUuODA3IDY0NS4xNjFWNTQxLjkzNmg2MDYuNDUxYzcuMTI2IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNzLTUuNzc3LTEyLjkwMy0xMi45MDMtMTIuOTAzSDI1LjgwN1YyODMuODcxaDc0OC4zODd2MjMyLjI1OGgtOTAuMzIyYy03LjEyNiAwLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzczUuNzc3IDEyLjkwMyAxMi45MDMgMTIuOTAzaDkwLjMyMnYxMDMuMjI2SDI1LjgwN3oiLz48L3N2Zz4=");

/***/ }),

/***/ "0bYB":
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "1IPs":
/***/ (function(module, exports) {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: external "antd/lib/config-provider"
var config_provider_ = __webpack_require__("ztzw");
var config_provider_default = /*#__PURE__*/__webpack_require__.n(config_provider_);

// EXTERNAL MODULE: external "react-intl"
var external_react_intl_ = __webpack_require__("k004");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");

// EXTERNAL MODULE: ./config/theme/theme.config.js + 2 modules
var theme_config = __webpack_require__("mEA0");

// EXTERNAL MODULE: external "antd/lib/locale-provider/en_US"
var en_US_ = __webpack_require__("A+dB");
var en_US_default = /*#__PURE__*/__webpack_require__.n(en_US_);

// EXTERNAL MODULE: ./config/translation/locales/en_US.json
var en_US = __webpack_require__("TPgy");

// CONCATENATED MODULE: ./config/translation/entries/en-US.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const EnLang = {
  messages: _objectSpread({}, en_US),
  antd: en_US_default.a,
  locale: 'en-US'
};
/* harmony default export */ var entries_en_US = (EnLang);
// EXTERNAL MODULE: ./config/translation/locales/zh-Hans.json
var zh_Hans = __webpack_require__("3HCa");

// CONCATENATED MODULE: ./config/translation/entries/zh-Hans-CN.js
function zh_Hans_CN_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function zh_Hans_CN_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { zh_Hans_CN_ownKeys(Object(source), true).forEach(function (key) { zh_Hans_CN_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { zh_Hans_CN_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function zh_Hans_CN_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const ZhLan = {
  messages: zh_Hans_CN_objectSpread({}, zh_Hans),
  antd: null,
  locale: 'zh-Hans-CN'
};
/* harmony default export */ var zh_Hans_CN = (ZhLan);
// EXTERNAL MODULE: ./config/translation/locales/ar_SA.json
var ar_SA = __webpack_require__("X2yY");

// CONCATENATED MODULE: ./config/translation/entries/ar_SA.js
function ar_SA_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ar_SA_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ar_SA_ownKeys(Object(source), true).forEach(function (key) { ar_SA_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ar_SA_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ar_SA_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const saLang = {
  messages: ar_SA_objectSpread({}, ar_SA),
  antd: en_US_default.a,
  locale: 'ar'
};
/* harmony default export */ var entries_ar_SA = (saLang);
// EXTERNAL MODULE: external "antd/lib/locale-provider/it_IT"
var it_IT_ = __webpack_require__("QG7G");
var it_IT_default = /*#__PURE__*/__webpack_require__.n(it_IT_);

// EXTERNAL MODULE: ./config/translation/locales/it_IT.json
var it_IT = __webpack_require__("kGN2");

// CONCATENATED MODULE: ./config/translation/entries/it_IT.js
function it_IT_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function it_IT_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { it_IT_ownKeys(Object(source), true).forEach(function (key) { it_IT_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { it_IT_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function it_IT_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const it_IT_saLang = {
  messages: it_IT_objectSpread({}, it_IT),
  antd: it_IT_default.a,
  locale: 'it-IT'
};
/* harmony default export */ var entries_it_IT = (it_IT_saLang);
// EXTERNAL MODULE: external "antd/lib/locale-provider/ca_ES"
var ca_ES_ = __webpack_require__("cSRi");
var ca_ES_default = /*#__PURE__*/__webpack_require__.n(ca_ES_);

// EXTERNAL MODULE: ./config/translation/locales/es_ES.json
var es_ES = __webpack_require__("3Igq");

// CONCATENATED MODULE: ./config/translation/entries/es_ES.js
function es_ES_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function es_ES_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { es_ES_ownKeys(Object(source), true).forEach(function (key) { es_ES_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { es_ES_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function es_ES_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const es_ES_saLang = {
  messages: es_ES_objectSpread({}, es_ES),
  antd: ca_ES_default.a,
  locale: 'es'
};
/* harmony default export */ var entries_es_ES = (es_ES_saLang);
// EXTERNAL MODULE: external "antd/lib/locale-provider/fr_FR"
var fr_FR_ = __webpack_require__("ZtOb");
var fr_FR_default = /*#__PURE__*/__webpack_require__.n(fr_FR_);

// EXTERNAL MODULE: ./config/translation/locales/fr_FR.json
var fr_FR = __webpack_require__("5cg1");

// CONCATENATED MODULE: ./config/translation/entries/fr_FR.js
function fr_FR_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function fr_FR_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { fr_FR_ownKeys(Object(source), true).forEach(function (key) { fr_FR_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { fr_FR_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fr_FR_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const fr_FR_saLang = {
  messages: fr_FR_objectSpread({}, fr_FR),
  antd: fr_FR_default.a,
  locale: 'fr-FR'
};
/* harmony default export */ var entries_fr_FR = (fr_FR_saLang);
// CONCATENATED MODULE: ./config/translation/index.js






const AppLocale = {
  en: entries_en_US,
  zh: zh_Hans_CN,
  sa: entries_ar_SA,
  it: entries_it_IT,
  es: entries_es_ES,
  fr: entries_fr_FR
};
/* harmony default export */ var translation = (AppLocale);
// EXTERNAL MODULE: ./library/hooks/useWindowSize.js
var useWindowSize = __webpack_require__("lwum");

// EXTERNAL MODULE: ./redux/app/actions.js
var actions = __webpack_require__("Rv81");

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// CONCATENATED MODULE: ./containers/ThemeProvider.js










const {
  toggleAll
} = actions["a" /* default */];
function AppProvider({
  children
}) {
  const dispatch = Object(external_react_redux_["useDispatch"])();
  const {
    locale
  } = Object(external_react_redux_["useSelector"])(state => state.LanguageSwitcher.language);
  const {
    themeName
  } = Object(external_react_redux_["useSelector"])(state => state.ThemeSwitcher.changeThemes);
  const currentAppLocale = translation[locale];
  const {
    width,
    height
  } = Object(useWindowSize["a" /* default */])();
  external_react_default.a.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [dispatch]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(config_provider_default.a, {
    locale: currentAppLocale.antd,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_intl_["IntlProvider"], {
      locale: currentAppLocale.locale,
      messages: currentAppLocale.messages,
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_styled_components_["ThemeProvider"], {
        theme: theme_config["a" /* default */][themeName],
        children: children
      })
    })
  });
}
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__("1fKG");
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// CONCATENATED MODULE: ./redux/application/order/reducer.js
function reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { reducer_ownKeys(Object(source), true).forEach(function (key) { reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initState = {
  productList: [],
  productInfo: {},
  preorderData: {}
};
function Reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.productList.push(action.product);
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productList: [...state.productList]
      });

    case "REMOVE_PRODUCT":
      state.productList.splice(action.index, 1);
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productList: [...state.productList]
      });

    case "CHANGE_PRODUCT_UNIT":
      var index = action.index;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            priceUnit: data[`buy_price_${index}`],
            unit: data[`unit_${index}`],
            d1: data[`unit_${index}_dp1`],
            d2: data[`unit_${index}_dp2`],
            d3: data[`unit_${index}_dp3`]
          })
        })
      });

    case "CHANGE_PRODUCT_QTY":
      var qty = action.qty;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            qty: qty
          })
        })
      });

    case "CHANGE_PRODUCT_D1":
      var d1 = action.d1;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            d1: d1
          })
        })
      });

    case "CHANGE_PRODUCT_D2":
      var d2 = action.d2;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            d2: d2
          })
        })
      });

    case "CHANGE_PRODUCT_D3":
      var d3 = action.d3;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            d3: d3
          })
        })
      });

    case "CHANGE_PRODUCT_DISC":
      var disc = action.disc;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            disc: disc
          })
        })
      });

    case "SET_PRICE_AFTER_DISC":
      var price = action.price;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            priceAfterDisc: price
          })
        })
      });

    case "SET_SUBTOTAL":
      var subTotal = action.subTotal;
      var id = action.product.id;
      var data = action.product.attributes;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
          [id]: reducer_objectSpread(reducer_objectSpread({}, state.productInfo[id]), {}, {
            subTotal: subTotal
          })
        })
      });

    case "SET_INITIAL_PRODUCT":
      state.productList.push(action.product);
      var id = action.product.id;
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        productList: [...state.productList],
        productInfo: reducer_objectSpread(reducer_objectSpread({}, state.productInfo), {}, {
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
            d3: action.d3
          }
        })
      });

    case "SET_PREORDER_DATA":
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        preorderData: {
          data: action.data
        }
      });

    case "CLEAR_DATA":
      state = {
        productList: [],
        productInfo: {},
        preorderData: {}
      };
      return state;

    default:
      return state;
  }
}
// EXTERNAL MODULE: ./authentication/actions.js
var authentication_actions = __webpack_require__("w+U0");

// CONCATENATED MODULE: ./authentication/reducer.js
function authentication_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function authentication_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { authentication_reducer_ownKeys(Object(source), true).forEach(function (key) { authentication_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { authentication_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function authentication_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import Router from 'next/router';

const reducer_initState = {
  idToken: null,
  error: null
};
function authReducer(state = reducer_initState, action) {
  switch (action.type) {
    case authentication_actions["a" /* default */].LOGIN_REQUEST_SUCCESS:
      // Router.replace('/dashboard');
      return authentication_reducer_objectSpread(authentication_reducer_objectSpread({}, state), {}, {
        idToken: action.payload
      });

    case authentication_actions["a" /* default */].LOGOUT_REQUEST_FAILURE:
    case authentication_actions["a" /* default */].LOGIN_REQUEST_FAILURE:
      return authentication_reducer_objectSpread(authentication_reducer_objectSpread({}, state), {}, {
        idToken: null,
        error: action.payload
      });

    case authentication_actions["a" /* default */].LOGOUT_REQUEST_SUCCESS:
      // Router.replace('/');
      return reducer_initState;

    default:
      return state;
  }
}
// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__("eW3l");
var external_qs_default = /*#__PURE__*/__webpack_require__.n(external_qs_);

// CONCATENATED MODULE: ./library/helpers/options.js
const options = [{
  key: 'mailbox',
  label: 'sidebar.email',
  leftIcon: 'ion-android-mail'
}, {
  key: 'chat',
  label: 'sidebar.chat',
  leftIcon: 'ion-chatbubbles'
}, {
  key: 'ecommerce',
  label: 'sidebar.ecommerce',
  leftIcon: 'ion-bag',
  children: [{
    key: 'shop',
    label: 'sidebar.shop'
  }, {
    key: 'cart',
    label: 'sidebar.cart'
  }, {
    key: 'checkout',
    label: 'sidebar.checkout'
  }, {
    key: 'card',
    label: 'sidebar.cards'
  }]
}, {
  key: 'maps',
  label: 'sidebar.maps',
  leftIcon: 'ion-map',
  children: [{
    key: 'googlemap',
    label: 'sidebar.googleMap'
  }, {
    key: 'leafletmap',
    label: 'sidebar.leafletMap'
  }]
}, {
  key: 'my-profile',
  label: 'sidebar.profile',
  leftIcon: 'ion-person'
}, {
  key: 'scrum-board',
  label: 'sidebar.scrumboard',
  leftIcon: 'ion-android-checkbox-outline'
}, {
  key: 'invoice',
  label: 'sidebar.invoice',
  leftIcon: 'ion-clipboard'
}, {
  key: 'youtubeSearch',
  label: 'sidebar.youtubeSearch',
  leftIcon: 'ion-social-youtube'
}, {
  key: 'calendar',
  label: 'sidebar.calendar',
  leftIcon: 'ion-calendar'
}, {
  key: 'notes',
  label: 'sidebar.notes',
  leftIcon: 'ion-ios-paper'
}, {
  key: 'todo',
  label: 'sidebar.todos',
  leftIcon: 'ion-android-checkbox-outline'
}, {
  key: 'firestorecrud',
  label: 'sidebar.firestorecrud',
  leftIcon: 'ion-fireball',
  children: [{
    key: 'articles',
    label: 'sidebar.firestorecrudarticle'
  }, {
    key: 'investors',
    label: 'sidebar.firestorecrudinvestor'
  }]
}, {
  key: 'contacts',
  label: 'sidebar.contacts',
  leftIcon: 'ion-android-person-add'
}, {
  key: 'shuffle',
  label: 'sidebar.shuffle',
  leftIcon: 'ion-grid'
}, {
  key: 'charts',
  label: 'sidebar.charts',
  leftIcon: 'ion-arrow-graph-up-right',
  children: [{
    key: 'googleChart',
    label: 'sidebar.googleCharts'
  }, {
    key: 'reecharts',
    label: 'sidebar.recharts'
  }, {
    key: 'reactChart2',
    label: 'sidebar.reactChart2'
  }, {
    key: 'frappeChart',
    label: 'sidebar.frappeChart'
  }]
}, {
  key: 'Forms',
  label: 'sidebar.forms',
  leftIcon: 'ion-android-mail',
  children: [{
    key: 'InputField',
    label: 'sidebar.input'
  }, {
    key: 'editor',
    label: 'sidebar.editor'
  }, {
    key: 'FormsWithValidation',
    label: 'sidebar.formsWithValidation'
  }, {
    key: 'progress',
    label: 'sidebar.progress'
  }, {
    key: 'button',
    label: 'sidebar.button'
  }, {
    key: 'tab',
    label: 'sidebar.tab'
  }, {
    key: 'checkbox',
    label: 'sidebar.checkbox'
  }, {
    key: 'radiobox',
    label: 'sidebar.radiobox'
  }, {
    key: 'selectbox',
    label: 'sidebar.selectbox'
  }, {
    key: 'transfer',
    label: 'sidebar.transfer'
  }, {
    key: 'autocomplete',
    label: 'sidebar.autocomplete'
  }]
}, // {
//   key: 'gridLayout',
//   label: 'sidebar.boxOptions',
//   leftIcon: 'ion-cube'
// },
{
  key: 'uielements',
  label: 'sidebar.uiElements',
  leftIcon: 'ion-leaf',
  children: [{
    key: 'op_badge',
    label: 'sidebar.badge'
  }, {
    key: 'op_card',
    label: 'sidebar.card2'
  }, {
    key: 'op_carousel',
    label: 'sidebar.corusel'
  }, {
    key: 'op_collapse',
    label: 'sidebar.collapse'
  }, {
    key: 'op_popover',
    label: 'sidebar.popover'
  }, {
    key: 'op_tooltip',
    label: 'sidebar.tooltip'
  }, {
    key: 'op_tag',
    label: 'sidebar.tag'
  }, {
    key: 'op_timeline',
    label: 'sidebar.timeline'
  }, {
    key: 'dropdown',
    label: 'sidebar.dropdown'
  }, {
    key: 'pagination',
    label: 'sidebar.pagination'
  }, {
    key: 'rating',
    label: 'sidebar.rating'
  }, {
    key: 'tree',
    label: 'sidebar.tree'
  }, {
    key: 'swiperslider',
    label: 'sidebar.swiperslider'
  }]
}, {
  key: 'advancedUielements',
  label: 'sidebar.advancedElements',
  leftIcon: 'ion-flash',
  children: [{
    key: 'reactDates',
    label: 'sidebar.reactDates'
  }, {
    key: 'codeMirror',
    label: 'sidebar.codeMirror'
  }, {
    key: 'uppy',
    label: 'sidebar.uppy'
  }, {
    key: 'dropzone',
    label: 'sidebar.dropzone'
  }]
}, {
  key: 'feedback',
  label: 'sidebar.feedback',
  leftIcon: 'ion-thumbsup',
  children: [{
    key: 'alert',
    label: 'sidebar.alert'
  }, {
    key: 'modal',
    label: 'sidebar.modal'
  }, {
    key: 'message',
    label: 'sidebar.message'
  }, {
    key: 'notification',
    label: 'sidebar.notification'
  }, {
    key: 'popConfirm',
    label: 'sidebar.popConfirm'
  }, {
    key: 'spin',
    label: 'sidebar.spin'
  }]
}, {
  key: 'table',
  label: 'sidebar.tables',
  leftIcon: 'ion-android-menu',
  children: [{
    key: 'table_ant',
    label: 'sidebar.antTables'
  }]
}, {
  key: 'pages',
  label: 'sidebar.pages',
  leftIcon: 'ion-document-text',
  children: [{
    key: '404',
    label: 'sidebar.404',
    withoutDashboard: true
  }, {
    key: '500',
    label: 'sidebar.500',
    withoutDashboard: true
  }, {
    key: 'signin',
    label: 'sidebar.signIn',
    withoutDashboard: true
  }, {
    key: 'signup',
    label: 'sidebar.signUp',
    withoutDashboard: true
  }, {
    key: 'forgotpassword',
    label: 'sidebar.forgotPw',
    withoutDashboard: true
  }, {
    key: 'resetpassword',
    label: 'sidebar.resetPw',
    withoutDashboard: true
  } // {
  //   key: 'comingSoon',
  //   label: 'sidebar.comingSoon',
  //    withoutDashboard: true
  // }
  ]
}, {
  key: 'githubSearch',
  label: 'sidebar.githubSearch',
  leftIcon: 'ion-social-github'
}, {
  key: 'blank_page',
  label: 'sidebar.blankPage',
  leftIcon: 'ion-document'
}];
/* harmony default export */ var helpers_options = (options);
// CONCATENATED MODULE: ./library/helpers/isServer.js
const isServer = true;
// CONCATENATED MODULE: ./library/helpers/url_sync.js



function getInitData() {
  if (!isServer) {
    const initData = external_qs_default.a.parse(window.location.search.slice(1));
    if (initData.toggle) initData.toggle.free_shipping = initData.toggle.free_shipping === 'true' ? true : undefined;
    return initData;
  }

  return false;
}
function setUrl(searchState) {
  if (!isServer) {
    const search = searchState ? `${window.location.pathname}?${external_qs_default.a.stringify(searchState)}` : '';
    window.history.pushState(searchState, null, search);
  }

  return;
}
function getDefaultPath() {
  const getParent = lastRoute => {
    const parent = [];
    if (!lastRoute) return parent;
    parent.push(lastRoute);
    helpers_options.forEach(option => {
      if (option.children) {
        option.children.forEach(child => {
          if (child.key === lastRoute) {
            parent.push(option.key);
          }
        });
      }
    });
    return parent;
  };

  if (!isServer && window.location.pathname) {
    const routes = window.location.pathname.split('/');

    if (routes.length > 1) {
      const lastRoute = routes[routes.length - 1];
      return getParent(lastRoute);
    }
  }

  return [];
}
// CONCATENATED MODULE: ./redux/app/reducer.js
function app_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function app_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { app_reducer_ownKeys(Object(source), true).forEach(function (key) { app_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { app_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function app_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const preKeys = getDefaultPath();
const app_reducer_initState = {
  collapsed: !isServer && window.innerWidth > 1220 ? false : true,
  view: !isServer && Object(actions["b" /* getView */])(window.innerWidth),
  height: !isServer && window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys
};
function appReducer(state = app_reducer_initState, action) {
  switch (action.type) {
    case actions["a" /* default */].COLLPSE_CHANGE:
      return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
        collapsed: !state.collapsed
      });

    case actions["a" /* default */].COLLPSE_OPEN_DRAWER:
      return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
        openDrawer: !state.openDrawer
      });

    case actions["a" /* default */].TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
          collapsed: action.collapsed,
          view: action.view,
          height
        });
      }

      break;

    case actions["a" /* default */].CHANGE_OPEN_KEYS:
      return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
        openKeys: action.openKeys
      });

    case actions["a" /* default */].CHANGE_CURRENT:
      return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
        current: action.current
      });

    case actions["a" /* default */].CLEAR_MENU:
      return app_reducer_objectSpread(app_reducer_objectSpread({}, state), {}, {
        openKeys: [],
        current: []
      });

    default:
      return state;
  }

  return state;
}
// CONCATENATED MODULE: ./redux/mail/data.js
/* harmony default export */ var mail_data = (JSON.parse(`[{
  "id": 30,
  "key": 30,
  "name": "Friedrich Mitchell",
  "cc": "Devon90@hotmail.com",
  "email": "Giovanny12@hotmail.com",
  "body": "Doloribus voluptas itaque blanditiis repudiandae. Est libero in. Id enim et vero velit enim nostrum cum aut libero. Dignissimos non et. Qui inventore ducimus debitis qui perspiciatis iure. Eligendi omnis eos et iste iusto ipsa iste dolor. Porro consequatur iste. Incidunt rerum mollitia dolore sit. Officia maxime doloremque esse eaque ad. Architecto animi at qui deserunt.",
  "subject": "voluptas excepturi voluptates",
  "date": "2017-06-10T22:16:42.057Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 44,
  "key": 44,
  "name": "Cristopher Bogan",
  "cc": "Axel17@yahoo.com",
  "email": "Belle_Gaylord17@gmail.com",
  "body": "Consectetur sed ut assumenda accusantium reprehenderit nemo adipisci amet. Voluptatibus quae inventore. Et qui dolore et quis. Alias minus autem libero possimus sunt nesciunt quis libero. Autem voluptas aliquam voluptatibus velit. Et distinctio quia earum a illo. Magnam quo ea architecto repellendus hic dolorem non illum doloremque. Id sapiente quo perspiciatis fugiat laboriosam rerum. Praesentium laboriosam ex sunt velit illum quis a ut qui. Sint in in eos.",
  "subject": "soluta mollitia a",
  "date": "2017-06-08T19:48:36.439Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 56,
  "key": 56,
  "name": "Michelle Kunze",
  "cc": "Connor_Cruickshank@hotmail.com",
  "email": "Beryl.Heidenreich82@gmail.com",
  "body": "Debitis necessitatibus distinctio minima. Molestias ab consectetur quos occaecati aut laudantium. Dolor eos dolore exercitationem. Et architecto quae labore est iusto cum. Illum ut commodi eaque aut totam officiis. Eos a provident omnis autem magni vel. Fuga numquam magni. Nihil beatae optio ratione minus et sequi quaerat ut. Earum voluptatem voluptatem suscipit ut consequuntur dolorum asperiores possimus. Maiores unde adipisci aperiam.",
  "subject": "ipsam ut veniam",
  "date": "2017-05-26T11:47:14.575Z",
  "bucket": "Starred",
  "read": false
}, {
  "id": 54,
  "key": 54,
  "name": "Darron Bednar",
  "cc": "Preston.Ullrich76@hotmail.com",
  "email": "Bessie_Gleason4@yahoo.com",
  "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50",
  "tags": "Friend",
  "body": "Aut quasi est perferendis rem ut est quidem et. Dignissimos aperiam qui voluptas praesentium dicta. Consectetur repellat amet voluptates aperiam ut ratione. Est quia nisi ut vel iste debitis. Sint ea aspernatur mollitia cupiditate. Maiores quibusdam ducimus. Voluptates praesentium et sint earum laboriosam placeat. Minima possimus ipsa numquam consequatur molestias quasi. Fuga exercitationem ea deserunt dicta. Sit placeat aut.",
  "subject": "ea aut sint",
  "date": "2017-05-26T04:57:39.922Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 60,
  "key": 60,
  "name": "Marjorie Runolfsdottir",
  "cc": "Dock_Murazik93@yahoo.com",
  "email": "Reynold76@hotmail.com",
  "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50",
  "tags": "Family",
  "body": "Consequatur occaecati id est. Quis et fuga voluptate distinctio sit. Modi dolore inventore quam autem asperiores in placeat. Porro quam perspiciatis eos exercitationem non quisquam cumque esse. Vero molestiae enim possimus tempora est sapiente voluptate officiis. Sed tenetur tempore qui. Quae amet et beatae eum repellendus est et sed. Perspiciatis dolore cupiditate eaque error dolores doloribus. Quos cum iste sit delectus qui dicta quo saepe. Quaerat repudiandae sequi aliquam et maiores sunt saepe qui.",
  "subject": "quae aperiam quia",
  "date": "2017-05-22T02:19:09.262Z",
  "bucket": "Inbox",
  "read": false
}, {
  "id": 75,
  "key": 75,
  "name": "Orville Strosin",
  "cc": "Ressie_Klein@gmail.com",
  "email": "Kaitlyn.Block56@yahoo.com",
  "body": "Qui animi quia vero asperiores ipsam repudiandae consequatur fugit. Temporibus aut facere quia et vel sit culpa. Dolor sapiente perferendis aut. Laborum autem quisquam alias perferendis ad tenetur. Debitis reprehenderit itaque rerum ea officiis odio deserunt molestiae. Accusantium atque praesentium in qui quo autem non. Dolore qui velit assumenda aut. Eos ex eveniet earum sapiente ea delectus. Quam consequatur voluptate non atque maxime et. Aut quia non facilis sed.",
  "subject": "ullam debitis aut",
  "date": "2017-05-20T10:13:38.494Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 87,
  "key": 87,
  "name": "Carlotta Friesen",
  "cc": "Robin.McGlynn21@gmail.com",
  "email": "Isabelle88@hotmail.com",
  "body": "Vitae excepturi expedita fugiat ad vitae illo dolorum dolor. Qui consectetur et quia nemo. Similique non illum. Animi velit ut. Totam eius numquam veritatis quo molestiae dignissimos vero accusamus. Maiores soluta fuga neque magni vitae eaque sint voluptatem. Culpa quas consequatur facilis sit exercitationem reprehenderit doloremque aut. Ex iure alias. Qui odio laborum maxime. Repellendus et qui est quia voluptas.",
  "subject": "autem dolor saepe",
  "date": "2017-05-18T10:33:41.146Z",
  "bucket": "Starred",
  "read": false
}, {
  "id": 15,
  "key": 15,
  "name": "Ava Durgan",
  "cc": "Demario83@hotmail.com",
  "email": "Melany_Lemke@gmail.com",
  "body": "Sint aut explicabo dolorum voluptatem magni nam at molestiae totam. Amet temporibus vel et harum eos minus atque et. Et dolores voluptas unde consequuntur odio quo sed voluptatem. Excepturi velit tempore praesentium vel in nesciunt. Laudantium non quis itaque aliquam ipsum qui aliquam blanditiis maxime. Fuga et quae eos numquam odio architecto impedit sed amet. Neque nemo nostrum dolores ut. Nostrum vitae ad. Aliquam in quaerat delectus cumque. Et consequatur esse sit omnis.",
  "subject": "ut sapiente praesentium",
  "date": "2017-05-18T04:39:53.974Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 86,
  "key": 86,
  "name": "Alverta Gutkowski",
  "cc": "Jonathon11@gmail.com",
  "email": "Lila.Metz1@yahoo.com",
  "tags": "ClassMates",
  "body": "Ut ratione at laudantium et quibusdam provident earum voluptates. Veritatis et qui corporis. Nostrum ab eum magnam quidem est. Quod voluptas animi aperiam dicta autem cupiditate sunt voluptas voluptate. Laudantium expedita eum corporis perferendis. Quia repudiandae omnis in dolorem. Ratione deleniti optio eum illum error assumenda veritatis sit. Est voluptatem perferendis nostrum sint. Dolorem officia cumque maxime magnam est provident ducimus eligendi. Magni iste quibusdam itaque voluptatem quibusdam amet fuga assumenda.",
  "subject": "ut qui et",
  "date": "2017-05-02T01:49:41.982Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 41,
  "key": 41,
  "name": "Hellen Carter",
  "cc": "Domenic85@hotmail.com",
  "email": "Evelyn84@yahoo.com",
  "body": "Incidunt sunt dicta et et ratione officiis quaerat in quas. Ut ut velit aut maxime rerum laboriosam. Ut qui cupiditate. Quidem quidem facilis ab. Suscipit tempore architecto atque nihil aut. Totam porro aut ut aspernatur similique laborum voluptatum ut. Qui maiores delectus deleniti aliquid. Harum autem natus velit doloribus. Deleniti velit enim alias et ratione consequatur eligendi et. Necessitatibus quia quod aspernatur nobis vero id sed.",
  "subject": "consectetur quia quisquam",
  "date": "2017-05-01T13:08:18.089Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 96,
  "key": 96,
  "name": "Alanis Koch",
  "cc": "Alvis.Harber64@gmail.com",
  "email": "Kelli1@yahoo.com",
  "tags": "ClassMates",
  "body": "Ut non quis perferendis non itaque aliquid. Molestiae ut modi ab. Odio molestiae praesentium odit est ad veritatis est ut. Quasi quia sed ut enim. Animi cumque ipsum. Eligendi exercitationem ut et perspiciatis nostrum itaque mollitia facilis debitis. Similique sit velit pariatur distinctio cumque iure vel quia nulla. Ab omnis blanditiis et neque. Aut quis ea quas fugit. Rerum doloribus temporibus provident quis ut provident illo.",
  "subject": "iure nemo sed",
  "date": "2017-05-01T05:43:26.284Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 21,
  "key": 21,
  "name": "Sid Kris",
  "cc": "Ayden59@gmail.com",
  "email": "Marilyne_Schumm@hotmail.com",
  "body": "Aliquid cupiditate est velit consectetur est nihil accusantium. Tempora accusamus aliquam nihil voluptatem rerum. Aut fugiat rerum ad. Suscipit ex recusandae dolorum ullam voluptas tempora. Culpa eos et earum. Quod laborum ipsum. Tempora quos quaerat. Inventore totam architecto id sed. Sunt rerum tempora. Laudantium quia debitis.",
  "subject": "excepturi dolor autem",
  "date": "2017-04-30T12:42:49.275Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 81,
  "key": 81,
  "name": "Ewell Beahan",
  "cc": "Bethany_Towne@yahoo.com",
  "email": "Phyllis_Marvin47@yahoo.com",
  "tags": "Family",
  "body": "Nihil quam ipsum ut beatae. Vitae facere dolor qui fugiat eos ut sit dignissimos. Qui et aut culpa error eveniet ab et. Quasi provident sunt vel voluptatem. Corrupti nesciunt et esse repellat. Animi explicabo ullam debitis a reprehenderit totam harum delectus necessitatibus. Necessitatibus eligendi id pariatur. At aut at aperiam nihil molestiae ea consequatur. Consectetur in dolorem sunt fugit omnis ipsa est quod. Voluptates a velit accusamus.",
  "subject": "aspernatur odit est",
  "date": "2017-04-29T20:17:15.315Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 84,
  "key": 84,
  "name": "Wilton Hand",
  "cc": "Chandler_Robel@gmail.com",
  "email": "Elton8@hotmail.com",
  "body": "Similique ut hic vel velit. Ullam eos perspiciatis nesciunt eaque eaque repellendus rem occaecati quis. Qui sed numquam facere omnis. Soluta quos numquam esse. Nisi voluptatum voluptatem nostrum aut ab error pariatur architecto et. Similique voluptatem possimus deleniti vel. Doloremque magni asperiores nisi dignissimos reiciendis consectetur. Similique repudiandae in quia consequatur perspiciatis. Sed ea labore labore nostrum accusantium. Illo iure illo illum sequi aut omnis vel non quaerat.",
  "subject": "architecto omnis deserunt",
  "date": "2017-04-25T07:16:20.043Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 98,
  "key": 98,
  "name": "Remington Donnelly",
  "cc": "Abdiel90@hotmail.com",
  "email": "Adan20@gmail.com",
  "tags": "Teachers",
  "body": "Deleniti sed suscipit quas ullam sed autem laboriosam qui. Deleniti velit debitis eum et corrupti quae fuga. Sed ea eligendi tenetur quae. Rerum vero dolore omnis sint fuga. Cum tenetur harum occaecati. Non expedita fugit rerum omnis. Et est odio architecto ducimus et modi. Necessitatibus ratione nisi qui unde debitis et hic doloribus. Est sunt suscipit delectus excepturi quo repellendus nisi reiciendis. Quia soluta illum odio libero.",
  "subject": "id et ut",
  "date": "2017-04-24T09:00:09.145Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 94,
  "key": 94,
  "name": "Sarina Frami",
  "cc": "Lucius_Raynor@yahoo.com",
  "email": "Stephanie40@yahoo.com",
  "tags": "Colleague",
  "body": "Et veritatis quis. Quo autem et quae est sequi voluptatem. Molestias dolorem magni voluptates ratione autem. Vero consequatur asperiores voluptatem. Quaerat vel fugit. Expedita autem sit laborum tempora quisquam eos velit. Voluptatem ut vel rerum ipsam ut repellendus optio. Nisi possimus aliquid sed voluptas eligendi qui nesciunt. Dolor fuga autem quo est autem inventore ullam. Quia voluptatem ut cumque.",
  "subject": "qui animi qui",
  "date": "2017-04-22T05:19:12.082Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 43,
  "key": 43,
  "name": "Camila Kilback",
  "cc": "Maribel_Hoeger@hotmail.com",
  "email": "Bridget_Johns@yahoo.com",
  "body": "Magnam ea veritatis consequatur. Voluptatum eaque et vel tempora ullam. A quos rerum laudantium. Est voluptatibus enim fuga in laudantium. Delectus illum veritatis tempore suscipit repellendus velit incidunt. Voluptate voluptatibus veritatis aut cum. Sint ab odit nostrum non aperiam nulla reprehenderit et quo. Voluptatum dolorem explicabo tempora deleniti omnis quia temporibus perspiciatis ut. Et autem totam tempora voluptatem pariatur. Rem omnis non animi.",
  "subject": "dolores vel a",
  "date": "2017-04-13T03:09:40.193Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 35,
  "key": 35,
  "name": "Jana Walter",
  "cc": "Delphia.Gerhold@hotmail.com",
  "email": "Elmira_Lind63@gmail.com",
  "body": "Ut porro harum. Animi eum laudantium laudantium blanditiis illo facere in sed. Doloribus sed minima et eius veritatis. Est eum est. Est non qui et laborum ut ut sit. Rem sed veritatis. Officiis laborum rem soluta dolores voluptatum aut velit quia pariatur. Magnam perspiciatis omnis. Magni assumenda ad tempore. Suscipit maxime cumque.",
  "subject": "eos cupiditate sapiente",
  "date": "2017-04-11T04:10:15.341Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 53,
  "key": 53,
  "name": "Winfield Kihn",
  "cc": "Adan.Mraz@yahoo.com",
  "email": "Beulah_Reilly35@yahoo.com",
  "body": "Illum dolorem tempore omnis. Et delectus harum rerum qui quas reiciendis excepturi in. Velit inventore ut maxime minima expedita et eaque reiciendis architecto. Hic et qui ex. Eligendi quisquam vero iste. Consectetur ea qui magnam consequatur qui blanditiis amet esse tempore. Deserunt accusamus est. Odio maiores sunt pariatur ipsum itaque. Neque nulla enim sunt eum architecto deleniti ad rerum. Eius et sit mollitia.",
  "subject": "atque dolore exercitationem",
  "date": "2017-04-10T22:32:17.681Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 32,
  "key": 32,
  "name": "Jeramy D'Amore",
  "cc": "Tobin26@gmail.com",
  "email": "Jimmie_Bernier@gmail.com",
  "tags": "Students",
  "body": "Sint temporibus totam minus est quis. Omnis ipsum ipsam iure eum est amet porro cumque. Ut doloribus doloribus nihil animi aliquid qui. Omnis ad velit sed et perspiciatis aspernatur deserunt veniam rerum. Molestiae veritatis nam architecto itaque omnis qui incidunt soluta. Qui et reprehenderit. Nemo cum iste accusantium. Consequatur eos aut. Nemo similique blanditiis corporis a. Fugit qui autem sunt sit assumenda perferendis.",
  "subject": "vel illo doloribus",
  "date": "2017-03-31T04:51:14.497Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 99,
  "key": 99,
  "name": "Hassan Nicolas",
  "cc": "Aron_OKeefe@yahoo.com",
  "email": "Laron76@hotmail.com",
  "body": "Nesciunt sequi sed omnis. Ea dicta voluptates rerum quas corrupti odio earum. Reiciendis alias modi. Eum ut corporis. Aut rerum cumque quos magni. Facere sit fugiat laboriosam eos. Enim ut et asperiores perspiciatis at voluptas labore. Voluptatem maiores eos repellendus. Vero voluptate voluptatum sequi molestiae omnis tempora fuga non dicta. Nostrum harum culpa eum consequatur.",
  "subject": "unde veniam vitae",
  "date": "2017-03-29T09:03:20.158Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 93,
  "key": 93,
  "name": "Jeffry Mann",
  "cc": "Talon_Pfannerstill@hotmail.com",
  "email": "Andrew.Olson@yahoo.com",
  "tags": "ClassMates",
  "body": "Sequi maiores asperiores. Sint vitae autem id molestias. Iure fuga deserunt. Atque fugiat aliquam est ipsum expedita magni modi officiis dolores. Quaerat voluptatibus in doloribus aliquid velit inventore eaque. Repellat tempora et nobis numquam. Amet rem porro doloremque minima. Cum sapiente sed velit provident. Perspiciatis dolor ducimus est laborum aut tempora. Nostrum accusamus nihil error quia quo quo optio tenetur.",
  "subject": "perspiciatis ipsa occaecati",
  "date": "2017-03-29T03:16:17.664Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 37,
  "key": 37,
  "name": "Lisandro Kreiger",
  "cc": "Madelynn72@hotmail.com",
  "email": "Cole_Ondricka@gmail.com",
  "img": "https://randomuser.me/api/portraits/men/46.jpg",
  "body": "Laudantium consequatur dolorem porro iure architecto modi corrupti sint et. Voluptatem vero odit laboriosam est iusto illo neque. Explicabo repudiandae veniam. Ab similique eveniet neque id dolores. Praesentium et eum aspernatur quo explicabo fugiat. Iure occaecati aperiam. Aut rem deserunt consequatur minus sed omnis adipisci explicabo. Tempora et velit id omnis. Dignissimos vitae sint et est quo dolore hic ea voluptatem. Aliquid praesentium eum accusamus ut cum quis laboriosam corporis non.",
  "subject": "ea iste quasi",
  "date": "2017-03-27T02:48:41.115Z",
  "bucket": "Inbox",
  "read": false
}, {
  "id": 26,
  "key": 26,
  "name": "Pansy Macejkovic",
  "cc": "Tyler.Koelpin38@yahoo.com",
  "email": "Alysa.Adams@gmail.com",
  "tags": "ClassMates",
  "body": "Soluta voluptate nihil non velit minus nihil culpa. Rerum perferendis est temporibus hic voluptatem in. Delectus tenetur excepturi quasi enim. Consequuntur eius soluta in voluptas architecto incidunt consequatur ea. Harum nobis odio dolor velit neque tempora illo voluptatem dolor. Suscipit omnis dicta necessitatibus. Dolore nihil rerum sit et eos sed quae accusamus. Accusamus quo perspiciatis id doloribus quis eum harum distinctio sunt. Repellat soluta quis dolorem consequuntur fuga beatae ut. Corporis praesentium fugiat eum numquam voluptate facilis.",
  "subject": "expedita quis quisquam",
  "date": "2017-03-24T17:10:20.010Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 69,
  "key": 69,
  "name": "David Dach",
  "cc": "Ara7@yahoo.com",
  "email": "Josie37@gmail.com",
  "tags": "Friend",
  "body": "Incidunt quasi fugiat eum distinctio ut saepe iusto magni. Harum asperiores ut aut velit et consequuntur iure quasi velit. Architecto voluptatibus animi. Rerum necessitatibus quis eligendi deleniti consequatur porro qui. Sint molestiae neque error. Alias voluptate et veniam nihil cum doloribus ex sunt. Possimus placeat vero dolor alias magnam doloremque quo maiores voluptas. Sapiente deserunt voluptatem sunt debitis aut. Rerum corrupti animi in in eaque perferendis nostrum sunt. Nihil est accusamus rem aut expedita distinctio.",
  "subject": "beatae provident qui",
  "date": "2017-03-22T15:55:08.315Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 1,
  "key": 1,
  "name": "Kyleigh Schmeler",
  "cc": "Caterina38@gmail.com",
  "email": "Marco.Runolfsson36@yahoo.com",
  "body": "Velit nulla sunt facere dolorum aut. Maiores et eligendi nostrum. Laborum ut ipsa deleniti non. Aut atque id blanditiis unde et asperiores sit quisquam. Et provident repellendus ut cumque qui animi. Omnis non quo iste perspiciatis molestiae et. Deleniti sed molestiae minus et occaecati ducimus voluptatibus porro. Animi et deserunt et fugit quasi sapiente reiciendis. Consequatur repellendus amet aperiam corporis. Exercitationem itaque rerum molestiae placeat.",
  "subject": "earum excepturi explicabo",
  "date": "2017-03-22T14:01:05.443Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 22,
  "key": 22,
  "name": "Kennedy Bogisich",
  "cc": "Bernita56@yahoo.com",
  "email": "Destiny.Block50@gmail.com",
  "body": "Sunt perferendis vel quos molestiae in et ut provident. Esse illo est sapiente et quod quam odio facilis blanditiis. Et voluptas nulla iusto beatae. Non officia voluptatibus quia veniam laborum. A reprehenderit asperiores quas hic eaque magnam laudantium eos. Repellendus est quis error ipsa sint molestiae. Eaque rerum suscipit est rerum nemo. Totam autem minus voluptate. Esse et corporis expedita vel non alias est est deleniti. Deserunt ullam repellendus omnis omnis iste.",
  "subject": "et mollitia perspiciatis",
  "date": "2017-03-22T08:20:43.359Z",
  "bucket": "Starred",
  "read": false
}, {
  "id": 19,
  "key": 19,
  "name": "Cicero Kilback",
  "cc": "Margarete_Rau61@hotmail.com",
  "email": "Antone.Lind27@yahoo.com",
  "body": "Tenetur ex nihil quia animi eos voluptas itaque neque quis. Similique laborum laudantium dolor. Ea officiis voluptatem. Nobis ullam corporis voluptatibus qui temporibus delectus voluptatibus numquam. Repellendus non doloremque est. Qui dolorem doloremque rerum voluptas et consequatur consequatur dolorem. Illo est et ab. Ipsa quasi qui voluptatem repudiandae laudantium sed. Aut sapiente commodi et consequatur. Ut aliquid veritatis molestias ea dignissimos voluptate.",
  "subject": "assumenda vero nostrum",
  "date": "2017-03-19T09:20:41.526Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 52,
  "key": 52,
  "name": "Kieran Auer",
  "cc": "Ellie.Watsica@hotmail.com",
  "email": "Morris.OKeefe23@yahoo.com",
  "body": "Suscipit tenetur tempore sed assumenda quos quia quidem quidem animi. Praesentium aperiam sequi molestiae voluptatem eveniet in. Sequi tempora amet et ut officia. Rem aperiam aut. Ut veritatis facere quia tempore ea. Doloribus occaecati corrupti corporis culpa vero aut a sint. Fugit placeat beatae labore ratione qui eaque quaerat. Rerum distinctio repellat veritatis iste possimus est. Incidunt eligendi excepturi. Doloribus et fuga et et rerum rerum molestiae ipsum ea.",
  "subject": "inventore et est",
  "date": "2017-03-18T11:51:50.816Z",
  "bucket": "Important",
  "read": false
}, {
  "id": 31,
  "key": 31,
  "name": "Moriah Stamm",
  "cc": "Stanford_Bode75@hotmail.com",
  "email": "Joelle.Brekke@gmail.com",
  "tags": "Colleague",
  "body": "Consequatur non reiciendis earum. Minus quaerat modi qui. Excepturi laudantium quas placeat ut voluptatem. Similique vitae quis officiis. Aut quam nihil voluptatem. Error et itaque rerum nemo. Non aperiam nihil totam non. Tempore ut quidem sit laborum consequatur mollitia mollitia facilis aliquam. Delectus facilis voluptas laudantium iusto est. Nostrum ab dolor et voluptatem illo.",
  "subject": "neque est est",
  "date": "2017-03-17T23:54:01.564Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 0,
  "key": 0,
  "name": "Rupert Gusikowski",
  "cc": "Harmon18@gmail.com",
  "email": "Sidney_Lubowitz27@hotmail.com",
  "img": "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=c3a31eeb7efb4d533647e3cad1de9257",
  "body": "Repellendus quos est earum quasi voluptate. Aut illo rerum. Repudiandae similique velit ipsa. Minus harum ut et numquam repudiandae veritatis. Sequi dolorum assumenda ut qui est. Id inventore aspernatur. Ipsam neque voluptates enim facere et saepe deserunt atque. Nulla iste id totam aliquam veritatis qui. Qui voluptatem voluptas. Ad qui fugiat assumenda voluptatem sit.",
  "subject": "accusamus deleniti omnis",
  "date": "2017-03-13T15:34:50.447Z",
  "bucket": "Inbox",
  "read": false
}, {
  "id": 24,
  "key": 24,
  "name": "Dena Bergstrom",
  "cc": "Keshaun.Yost@hotmail.com",
  "email": "Cicero_Lubowitz83@yahoo.com",
  "tags": "Teachers",
  "body": "Nostrum necessitatibus nostrum est omnis et expedita. Et unde saepe omnis. Nulla et rerum repudiandae nesciunt. Hic aut non ducimus consequuntur modi qui eos sed dolorum. Quisquam ipsa qui voluptatum corporis sunt minus eum. Corporis est inventore illum iusto in quas pariatur. Tempora ab eum. Sit possimus molestiae dignissimos. Molestias nobis quae totam officiis sit voluptatem. Omnis a ea quam et optio iusto est.",
  "subject": "dolores dolore sit",
  "date": "2017-03-13T07:49:52.615Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 97,
  "key": 97,
  "name": "Randall Hodkiewicz",
  "cc": "Jacky.Bednar@hotmail.com",
  "email": "Heidi26@yahoo.com",
  "img": "https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=fe0976a79ece0ee8effca4cab4527ae2",
  "body": "Iste minus et. Non necessitatibus ut est est id amet. Officiis sequi dolorum assumenda ipsam magnam cum possimus. Laudantium nulla amet tempore excepturi id expedita dolorum quisquam deserunt. Odit vel sint dolor eos. Ea blanditiis animi. Quibusdam unde unde. Perspiciatis vel pariatur qui. Deleniti omnis est quae. Laboriosam numquam amet aliquid.",
  "subject": "ratione quidem molestiae",
  "date": "2017-03-08T19:22:50.130Z",
  "bucket": "Inbox",
  "read": false
}, {
  "id": 57,
  "key": 57,
  "name": "Camden Flatley",
  "cc": "Luther_Lakin@gmail.com",
  "email": "Ardith41@yahoo.com",
  "body": "Ipsa reiciendis molestiae repellat est. Accusamus illo quisquam. Et nihil quo minima. Quis labore accusantium doloremque placeat commodi eligendi iusto impedit. Cumque delectus odio quos repudiandae omnis unde atque. Fugiat doloribus officia nesciunt libero sed consequatur tempore neque aspernatur. Aliquid non sit expedita ut magnam sunt. Dolorem quia perferendis sit odio numquam quia sit. Laboriosam sint reprehenderit reiciendis et nobis velit velit. Accusantium non quod temporibus enim ut quia quia doloremque.",
  "subject": "facilis in est",
  "date": "2017-03-03T17:54:02.112Z",
  "bucket": "Starred",
  "read": false
}, {
  "id": 64,
  "key": 64,
  "name": "Deion O'Connell",
  "cc": "Twila.Goyette@gmail.com",
  "email": "Cynthia_Jacobi38@hotmail.com",
  "body": "Et iste eligendi dignissimos officiis illum rerum sunt dolorum ducimus. Earum sunt qui in qui. Ullam nostrum in dolores quibusdam impedit voluptate repellat. Et adipisci distinctio sapiente est ducimus repellendus deleniti. Est impedit nobis enim distinctio. Tenetur rem maxime rerum quos quis deleniti vitae. Molestiae nisi quo natus eum numquam inventore sit enim. Quisquam voluptas animi. Quisquam reprehenderit nostrum. Sapiente tempora est qui facilis corporis voluptatibus.",
  "subject": "architecto quo ut",
  "date": "2017-03-01T04:43:49.049Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 59,
  "key": 59,
  "name": "Ethyl Kemmer",
  "cc": "Darby50@hotmail.com",
  "email": "Carson.Abbott@gmail.com",
  "body": "Aut inventore omnis ad voluptate. Consectetur in id laboriosam recusandae voluptatem. Quidem autem dolores eveniet libero est. Soluta tempora reprehenderit nihil modi eum. Ex facilis est perspiciatis debitis architecto. Quo nihil corrupti distinctio ea qui. Beatae recusandae quis minima. Quis consequatur molestiae deserunt optio qui. Atque quo dolores esse expedita est incidunt nobis laboriosam saepe. Earum quis id suscipit.",
  "subject": "accusamus quia mollitia",
  "date": "2017-03-01T04:30:39.636Z",
  "bucket": "Starred",
  "read": false
}, {
  "id": 79,
  "key": 79,
  "name": "Makayla Runolfsson",
  "cc": "Delilah41@yahoo.com",
  "email": "Carleton_Altenwerth@hotmail.com",
  "body": "A illum sunt. Voluptates aperiam nam incidunt animi dolorem deleniti. Sit beatae aliquid quia sed placeat facere ab cumque delectus. Officiis et et fugit iure et consequatur. Quae est sequi placeat rerum quia. Voluptatem est quod libero animi culpa. Aspernatur omnis culpa. Sequi dolores harum omnis veniam molestiae. Ea quia veniam architecto quas est eos harum iure voluptas. Ab quidem reiciendis consequatur eos.",
  "subject": "a corrupti facilis",
  "date": "2017-02-25T23:09:05.732Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 70,
  "key": 70,
  "name": "Jessy Hahn",
  "cc": "Gustave_Stehr91@yahoo.com",
  "email": "Jocelyn.Zulauf@gmail.com",
  "body": "Voluptate neque corrupti et ut. Ipsam non dolore quia et. Sit dolor voluptates. Velit eos sint asperiores magnam modi praesentium dignissimos quidem. Corporis modi ut voluptas fugiat aperiam ut pariatur. Voluptatum aut provident. Minus rerum quam aut similique ut neque sit. Voluptatum corrupti quia qui. Et similique natus. Explicabo sed eius doloribus maiores rerum odit cum nam enim.",
  "subject": "unde et reiciendis",
  "date": "2017-02-10T06:37:35.336Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 10,
  "key": 10,
  "name": "Domenico Shanahan",
  "cc": "Macie_Grant@gmail.com",
  "email": "Reva.Cormier2@yahoo.com",
  "body": "Atque officiis incidunt voluptatem neque sed placeat ut et. Qui inventore iste vitae est quia. Laborum quis quia. Et qui dolores atque nihil pariatur. Blanditiis dolorem consectetur quia. Nemo asperiores exercitationem eos architecto fugit quo. Et commodi dolor adipisci aut porro alias velit ipsa. Autem error ut doloremque ut explicabo eum assumenda. Magni eveniet quaerat dignissimos ipsam enim. Et nostrum voluptatem minima qui eveniet voluptatem nemo dolore nesciunt.",
  "subject": "neque assumenda distinctio",
  "date": "2017-02-08T20:02:47.644Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 40,
  "key": 40,
  "name": "Einar Prohaska",
  "cc": "Mabel.Kling@yahoo.com",
  "email": "Sarah_Leuschke@yahoo.com",
  "body": "Voluptatum dicta commodi nam odio. Qui omnis laborum deserunt sed iste praesentium atque. Nihil natus vel quibusdam qui distinctio. Amet consequuntur dolor qui ad saepe et cupiditate libero dolores. Rerum voluptatem nulla. Deserunt voluptatum et pariatur eum recusandae praesentium. Inventore placeat inventore excepturi quod velit. In id adipisci sed perferendis odit voluptas et sit. Eum nihil unde assumenda vel modi. Quia nihil placeat beatae quas eius illum.",
  "subject": "nemo unde ut",
  "date": "2017-02-08T01:09:50.428Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 58,
  "key": 58,
  "name": "Hertha Wisozk",
  "cc": "Kiara.Armstrong@gmail.com",
  "email": "Emmie9@gmail.com",
  "body": "Dolorum quisquam eum est explicabo atque. Pariatur atque impedit corporis non. Reiciendis minus sint et. Quis ut ratione consequuntur. Possimus facilis voluptas vel et quibusdam. Fugiat sed enim laudantium. Delectus ut quia rem dolores rerum necessitatibus voluptatem quos aut. Et quae voluptates nesciunt tenetur quia ut aut fuga corrupti. Aut voluptatem facere est officiis. Quasi provident id esse suscipit.",
  "subject": "dolores iure nisi",
  "date": "2017-01-29T19:04:48.094Z",
  "bucket": "Starred",
  "read": true
}, {
  "id": 61,
  "key": 61,
  "name": "Evangeline Robel",
  "cc": "Yasmeen74@hotmail.com",
  "email": "Maxine_Conn@gmail.com",
  "body": "Quo enim atque. Saepe molestiae perferendis qui maiores ut eum suscipit. Optio architecto nihil necessitatibus saepe aut dolorem ex. Ad ipsum aut tempora ab minus ut minus. Natus facere aut. Autem et vero nulla. Commodi aut possimus cumque et officia autem aut. Deserunt totam eum facere voluptatem incidunt provident et saepe est. Aut qui maxime. Iste in quia.",
  "subject": "error qui non",
  "date": "2017-01-24T00:32:23.309Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 68,
  "key": 68,
  "name": "Corbin Bruen",
  "cc": "Buck_Halvorson@gmail.com",
  "email": "Max24@gmail.com",
  "tags": "Family",
  "body": "Quia eligendi quia sit. Alias vel exercitationem molestias sed voluptatibus quo. Accusantium cupiditate facere qui possimus sunt fugiat aut. Pariatur aut deleniti et sed sed voluptatem quas. Sit nihil veritatis tenetur temporibus labore et excepturi quia. Consequatur quae nobis quia alias et commodi architecto. Vel nam consequuntur possimus autem. Laboriosam voluptas eaque omnis expedita optio aut tenetur doloribus repellendus. Aut magni tenetur veniam. Sint consequuntur consequatur amet dolorem officiis perferendis laudantium saepe aut.",
  "subject": "laborum voluptatem delectus",
  "date": "2017-01-12T02:23:00.347Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 95,
  "key": 95,
  "name": "Amara Denesik",
  "cc": "Rickie_Murazik@hotmail.com",
  "email": "Cierra.Sipes23@hotmail.com",
  "img": "https://images.unsplash.com/photo-1505196298139-8cfce5efd3d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=086d0c442db382f3faadb8156eecafa7",
  "tags": "Teachers",
  "body": "Nostrum dignissimos iure eos qui delectus. Vel cupiditate ex. Quam aliquid nesciunt cumque et. Est autem rerum voluptates ea id. Placeat sint eum aut. Illum autem officiis. Et expedita rerum veniam sed praesentium. Placeat aliquam similique dolorem doloribus fuga autem autem. Ipsa earum animi in. Fugit et veritatis quam autem tempora dolor molestias soluta est.",
  "subject": "et consectetur amet",
  "date": "2017-01-10T21:30:05.964Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 55,
  "key": 55,
  "name": "Alayna Abernathy",
  "cc": "Demario.Kilback@yahoo.com",
  "email": "Vinnie_Turcotte19@hotmail.com",
  "tags": "ClassMates",
  "body": "Quo doloremque tenetur consequatur commodi perferendis expedita. Aperiam magni quibusdam fuga culpa sed tempora. Occaecati dolorem inventore veniam est nihil sit. Perspiciatis corrupti veritatis distinctio sint eos. Alias molestias qui sunt est quo a eum non velit. Nesciunt ipsa ipsum ut nihil. Omnis animi praesentium. Placeat qui porro optio rerum eos. Impedit laborum ipsam dolores et atque eaque sint. Tenetur et ipsam est ea quis aut officiis et dolores.",
  "subject": "sunt error fugit",
  "date": "2017-01-04T11:18:33.434Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 25,
  "key": 25,
  "name": "Marcellus Torp",
  "cc": "Lester.Tremblay56@gmail.com",
  "email": "Chaz3@hotmail.com",
  "body": "Id quod ut natus voluptas aut harum voluptatibus sunt. Et nemo corporis sint architecto ex vitae voluptatem soluta sapiente. Explicabo dolores et molestiae numquam non. Ducimus dolor alias temporibus eligendi iusto. Rerum quos est repellendus quae sint sit est voluptas quaerat. Temporibus quasi iusto. Inventore et voluptatibus quisquam temporibus maxime repellendus dicta numquam. Autem voluptatum assumenda sequi ipsum ut. Quasi sequi et temporibus. Rerum consequatur recusandae est.",
  "subject": "id ut est",
  "date": "2017-01-03T10:35:53.688Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 91,
  "key": 91,
  "name": "Eleanora Metz",
  "cc": "Breanne97@hotmail.com",
  "email": "Ashleigh65@yahoo.com",
  "body": "Natus delectus necessitatibus nostrum ratione atque neque inventore fugit. Totam eligendi sed nesciunt ducimus similique. Quae excepturi eos quaerat modi aut eveniet ex. Quasi voluptas quis atque porro quia eveniet. Soluta amet voluptate dolorem est quo numquam. Dolorum iure mollitia voluptas voluptas. Voluptatem vel rerum sed illum vel tempora. Temporibus nesciunt et quis laboriosam minima perspiciatis officia. Adipisci cupiditate mollitia libero adipisci doloribus eos. Adipisci error sunt nisi.",
  "subject": "exercitationem delectus velit",
  "date": "2016-12-31T08:20:35.747Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 82,
  "key": 82,
  "name": "Shanel Cummerata",
  "cc": "Dejuan_Wolf@gmail.com",
  "email": "Madyson.Muller@yahoo.com",
  "tags": "Friend",
  "body": "Fugiat ea qui quasi. Excepturi autem voluptatum nulla odio quia beatae qui neque. Laboriosam eum quia necessitatibus aut rerum placeat dolorum deserunt. Quia dolores aut corporis. Dolor repellendus delectus esse rerum magni reprehenderit voluptatem. Tempora cupiditate facere tempore tempore voluptatem voluptatem odit. Quaerat laborum laborum culpa. Vel sint eveniet. Recusandae expedita voluptatum dolorem alias fuga. Voluptatem dolorem enim aut sequi deleniti voluptas et facilis omnis.",
  "subject": "molestias laudantium vel",
  "date": "2016-12-31T03:44:15.599Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 48,
  "key": 48,
  "name": "Elva Orn",
  "cc": "Della.Wuckert@gmail.com",
  "email": "Elvis_Oberbrunner@gmail.com",
  "body": "Dolorem harum dolor temporibus laboriosam. Ducimus temporibus a. Qui et sed quia qui. Cum voluptatem non atque. Non esse maxime odit. Ab repudiandae reiciendis vel odio nobis magni. Tempore assumenda cum tenetur amet et fugit. Ab ab animi est voluptas consequatur et repudiandae qui sint. Possimus ipsam alias occaecati sint officiis nihil. Eos nihil soluta eos reiciendis dolor sequi.",
  "subject": "quasi voluptas voluptas",
  "date": "2016-12-29T14:27:05.995Z",
  "bucket": "Starred",
  "read": true
}, {
  "id": 17,
  "key": 17,
  "name": "Mateo Stehr",
  "cc": "Emery.Willms54@yahoo.com",
  "email": "Cullen22@gmail.com",
  "tags": "Family",
  "body": "Distinctio voluptatibus nihil. Vero fugiat ut dicta cumque quo. Illum officiis adipisci quaerat sunt dolorum consequatur officia voluptatem minima. Doloremque culpa quae et. Modi deserunt perferendis autem quo aliquid quia. Laudantium aut perspiciatis aperiam provident. Commodi sit et. Esse modi placeat reprehenderit et sit non. Maiores aperiam modi aut aspernatur. Aut non veritatis at iste ut repudiandae provident animi ullam.",
  "subject": "id doloremque omnis",
  "date": "2016-12-18T09:10:57.276Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 46,
  "key": 46,
  "name": "Katherine Nitzsche",
  "cc": "Bernadine91@yahoo.com",
  "email": "Dillan.Boyle89@gmail.com",
  "tags": "Colleague",
  "body": "Eum tenetur consequatur sit voluptas maiores repellat quia. Est cumque doloremque voluptatum. Adipisci totam enim. Est at corrupti rerum voluptatem. Eos velit aut ut ab laborum minima. Quod optio dolores. Voluptas saepe deserunt est deleniti praesentium unde saepe. Magni ex est nostrum assumenda blanditiis quod. Voluptatem ut perspiciatis. Animi perferendis est totam et quos sed nemo illo sint.",
  "subject": "nemo reprehenderit quis",
  "date": "2016-12-18T00:01:59.194Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 13,
  "key": 13,
  "name": "Cecilia Schulist",
  "cc": "Imelda.Dibbert@gmail.com",
  "email": "Anderson.Terry14@gmail.com",
  "body": "Iure rerum quia quia quidem doloribus praesentium tempore aut. Doloribus ad voluptatum harum est. Cum assumenda et. Dolorem est maxime officia aliquid et perferendis occaecati. Eos nesciunt tempora ut alias. Iusto quo blanditiis recusandae. Voluptas omnis sint. Ab debitis aut delectus. Dolorum accusantium repellat. Ut est similique dolor nesciunt deserunt molestias porro sunt.",
  "subject": "eligendi maiores quaerat",
  "date": "2016-12-13T09:08:37.974Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 29,
  "key": 29,
  "name": "Henriette Rohan",
  "cc": "Laurianne26@gmail.com",
  "email": "Vicenta.Pouros34@yahoo.com",
  "body": "Vel consequatur culpa ut voluptatem est omnis enim. Ut eos tempora quibusdam vitae. Dolor mollitia alias occaecati cum officia cumque nesciunt sint. Animi ut id accusantium incidunt beatae. Voluptatum expedita qui repellendus veritatis impedit aliquid et illum. Quia quasi similique sint quidem est non. Blanditiis dignissimos autem quaerat nam ex earum. Et est explicabo eum et. Dolores nisi et officia quibusdam inventore. Rerum non quos rerum ipsa vitae odio.",
  "subject": "quia assumenda at",
  "date": "2016-12-11T23:43:32.239Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 7,
  "key": 7,
  "name": "Earlene Simonis",
  "cc": "Marilie_Moore@hotmail.com",
  "email": "Sydnie.Aufderhar61@yahoo.com",
  "tags": "Students",
  "body": "Et unde repudiandae earum maiores vel. Impedit consectetur dolorem nisi. Nesciunt omnis et veniam et doloremque a non consectetur vero. Veniam aperiam iste voluptas illo tempora. Rerum modi voluptate qui distinctio atque voluptatem at. Sequi voluptas nobis consequatur omnis. Expedita reiciendis aut eum qui qui possimus magnam similique est. Dignissimos odit ducimus perspiciatis. Qui ipsum ad maiores nemo id. Minus quidem rerum omnis est rerum eos dolorem voluptate.",
  "subject": "praesentium nesciunt eveniet",
  "date": "2016-11-28T10:06:56.174Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 23,
  "key": 23,
  "name": "Robbie Kuhic",
  "cc": "Vicente_Brakus79@gmail.com",
  "email": "Carol.Treutel@gmail.com",
  "body": "Aut maxime quae fuga nisi a soluta. Inventore nam sed reiciendis doloremque eum minus dignissimos. Laborum pariatur fugit vel et. Et quia quia. Et numquam voluptas illum nihil dolorem sit nihil. Omnis quibusdam rem esse qui non natus. Aut magnam recusandae ex amet. Cupiditate eos autem ut quae voluptatem animi nihil voluptates itaque. Rerum sint sunt quo culpa ea molestiae modi qui consequatur. Esse et dolor enim ea ipsum aut.",
  "subject": "vero architecto provident",
  "date": "2016-11-24T21:10:31.798Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 71,
  "key": 71,
  "name": "Werner McDermott",
  "cc": "Kareem_Ward@gmail.com",
  "email": "Gaetano77@gmail.com",
  "body": "Ullam necessitatibus sunt alias dolorem minus aut illum impedit. Harum repellat voluptatem. Quia sed ad et. Perspiciatis vel assumenda officia labore nobis voluptas voluptates. Rem quaerat vel rerum adipisci. Dolorum quia error non. In dolorem ex alias. Blanditiis optio libero exercitationem dolore. Dolorem tempora ut dolorem ut. Aut ipsa perspiciatis.",
  "subject": "ullam illo placeat",
  "date": "2016-11-09T18:24:36.480Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 66,
  "key": 66,
  "name": "Steve Dickens",
  "cc": "Floy.Bartoletti@yahoo.com",
  "email": "Frederique_Wunsch@yahoo.com",
  "tags": "Students",
  "body": "Minima debitis id neque architecto. Aliquid quis excepturi sapiente repellat. Sint molestias non omnis numquam dolor veritatis esse aperiam. Sit voluptates doloremque repellat labore est voluptatum. Autem ut quos provident voluptatem. Sed a nemo et ut iure autem. Qui repudiandae qui eos. Consequatur vel sed provident tempore cum hic. Deserunt harum dolores natus rem id et quia eum voluptatum. Et eum sapiente sunt ut sapiente quidem.",
  "subject": "exercitationem vero qui",
  "date": "2016-11-08T17:44:26.340Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 33,
  "key": 33,
  "name": "Odie Gislason",
  "cc": "Tania.Mueller@hotmail.com",
  "email": "Angelina.Tromp7@gmail.com",
  "body": "Molestias vero pariatur possimus repudiandae quo sed. Ut in minus nesciunt dolor quidem recusandae doloremque libero. Veritatis quis nemo repellat. Omnis et occaecati. Inventore natus voluptate quisquam rerum numquam inventore tempora a amet. Fuga iusto ullam. Est aspernatur voluptatem optio quisquam accusantium. Voluptatem eum eum in sed ut nostrum qui voluptate rem. Et et impedit veniam dolores. Voluptas non dolorem.",
  "subject": "rerum voluptas et",
  "date": "2016-11-06T13:20:00.738Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 5,
  "key": 5,
  "name": "Berenice Bradtke",
  "cc": "Clarissa.Ratke@hotmail.com",
  "email": "Enoch_Olson30@gmail.com",
  "body": "Temporibus quidem eligendi at et. Cupiditate in quis iste magni. Laboriosam autem explicabo voluptas quos. Minus tempora perferendis et dolore sed quasi dolorem fugiat blanditiis. Iusto id quia quasi at earum quam tempore. Aut incidunt sapiente dolor iste suscipit. Ut quia ut consequatur exercitationem iusto recusandae assumenda. Et laudantium molestias beatae repellat aut eius. Odit quas consectetur saepe ex quo rerum qui. Dolorem aspernatur est optio dicta non.",
  "subject": "voluptatem sit pariatur",
  "date": "2016-11-01T21:19:38.377Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 92,
  "key": 92,
  "name": "Jarvis Kovacek",
  "cc": "Westley81@hotmail.com",
  "email": "Cleve_Stroman@gmail.com",
  "tags": "Teachers",
  "body": "Sint illum voluptatem autem odit culpa autem reprehenderit veniam. Eos sit cumque voluptatem blanditiis molestiae quia aspernatur. Et dolorem dolorem delectus autem nesciunt quia ut. Consequatur qui quas iure fugit sequi ratione. Quod cumque et eos voluptatem qui est quis necessitatibus. Veritatis voluptas voluptatibus. Atque impedit illum quos eum. Tenetur libero culpa et nisi ea. Suscipit et et nihil quos temporibus. Pariatur aspernatur nisi et reiciendis.",
  "subject": "beatae qui rerum",
  "date": "2016-11-01T11:37:57.980Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 73,
  "key": 73,
  "name": "Hope Schuster",
  "cc": "Colt_Herzog@yahoo.com",
  "email": "Jeffrey_Glover@yahoo.com",
  "tags": "Students",
  "body": "Odio fuga nobis fugit molestias dicta sint et eos officiis. Quisquam dolores id. Earum aspernatur ut laboriosam maxime rerum aut sit voluptas ipsum. Amet deleniti repellendus et atque quia tenetur. Autem cupiditate labore. Autem reiciendis qui unde nostrum eos ducimus quis. Officia odit et sunt voluptatibus et id. Cupiditate est et repellendus. Fugit at qui et aperiam explicabo nobis deleniti fugit. Et amet adipisci et nihil sed non quasi in et.",
  "subject": "est nobis odit",
  "date": "2016-10-28T11:19:23.037Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 36,
  "key": 36,
  "name": "Jared Rath",
  "cc": "Macy_Medhurst@hotmail.com",
  "email": "Delpha_Gutkowski46@yahoo.com",
  "tags": "Colleague",
  "body": "Esse sed est laborum est aperiam optio totam. Sit occaecati sint aut omnis laudantium. Occaecati nulla aspernatur nulla est iure alias consequatur. Molestiae consequuntur sit id ut enim. Ea et voluptatibus assumenda cum animi sed esse aut. Similique ipsam assumenda esse rerum. Et doloribus vel nesciunt hic rerum est enim est commodi. Aperiam fugiat explicabo vel doloribus qui nisi et aut. Pariatur aut dolores numquam beatae repellendus et omnis. Velit voluptates sint in eius voluptates sequi aut ad necessitatibus.",
  "subject": "ad corrupti sequi",
  "date": "2016-10-27T09:22:19.945Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 27,
  "key": 27,
  "name": "Teagan Keebler",
  "cc": "Fritz.Fisher47@gmail.com",
  "email": "Sim_Klocko72@yahoo.com",
  "tags": "Students",
  "body": "Vero dicta quis voluptatem et autem. Ut odit aut qui voluptatem. Et hic tenetur. Numquam recusandae aliquid vel eligendi nisi accusantium. Illum sunt corporis cupiditate vitae eos perferendis rerum incidunt tenetur. Et vero labore illo et numquam. Alias aliquam quibusdam. Nam fugit minus aspernatur ab numquam inventore ex. Reprehenderit veniam doloremque sequi commodi molestias magni. Minima vel delectus eius consequatur sit aut est suscipit voluptatem.",
  "subject": "inventore ut quasi",
  "date": "2016-10-19T01:34:35.691Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 83,
  "key": 83,
  "name": "Kara Kuhic",
  "cc": "Reyna_Schaden97@gmail.com",
  "email": "Freddy.Gibson60@hotmail.com",
  "body": "Laudantium similique nam eum ut nihil. Non qui at beatae. Minima optio dolores quis. Quasi sed odit est quia qui dolore culpa. Consequatur voluptatibus ipsum explicabo et possimus. In harum ullam ut enim incidunt assumenda eveniet. Libero saepe vitae vero. Rem omnis nobis non quis. Sint ut aut est. Consequatur rem consequatur.",
  "subject": "asperiores commodi et",
  "date": "2016-10-17T00:29:28.677Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 76,
  "key": 76,
  "name": "Mariela Rath",
  "cc": "Jannie74@yahoo.com",
  "email": "Raina37@hotmail.com",
  "tags": "Friend",
  "body": "Numquam aliquam vitae a quis doloribus nihil blanditiis. Corporis eius animi. Sapiente beatae accusamus. Minima dolorem voluptas. Repudiandae velit nostrum. Voluptas enim repellendus reprehenderit ea suscipit accusamus consequuntur. Explicabo cum ratione impedit sunt voluptas. Ut placeat sint dolore ipsum. Aut ex error blanditiis et atque sint. Ab culpa ad et.",
  "subject": "ipsum eos esse",
  "date": "2016-10-16T13:44:14.334Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 18,
  "key": 18,
  "name": "Brown Padberg",
  "cc": "Josefa_Greenfelder@hotmail.com",
  "email": "Terence_Considine@yahoo.com",
  "body": "Nesciunt eum eaque. Laudantium voluptatem quis fuga sint. Magni dignissimos vero at dolorem repudiandae aut sunt qui. Beatae soluta tenetur. Porro autem quidem. At omnis aliquam eum. Aut praesentium nulla dolores quod quibusdam perferendis. Dolores ut id repellat similique libero aut quo laudantium. Nulla consequuntur voluptatem cumque beatae eum voluptates. Iusto voluptatum enim repellat ipsam illum.",
  "subject": "alias reiciendis tempora",
  "date": "2016-10-07T02:56:02.571Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 88,
  "key": 88,
  "name": "Luna Labadie",
  "cc": "Bessie.Blanda86@hotmail.com",
  "email": "Fletcher_Schumm@gmail.com",
  "body": "Quia unde sapiente excepturi commodi rerum est consequatur at. Sed at labore labore deleniti hic consequuntur perferendis ipsa. Aut molestiae odio eos molestiae delectus dolores quisquam sunt. Vitae dolor eum similique magni voluptatem. Eveniet sed vitae. Autem omnis corrupti dolorem nesciunt rerum vel odit necessitatibus. A recusandae magni. Voluptatem at eveniet voluptatem qui quia asperiores harum error ea. Omnis rerum est consequatur. Culpa aut vel qui sint et odio.",
  "subject": "deleniti aut aut",
  "date": "2016-10-05T16:02:18.907Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 16,
  "key": 16,
  "name": "Keyon Boyle",
  "cc": "Ellsworth.Goldner48@hotmail.com",
  "email": "Agnes_Casper@gmail.com",
  "body": "Vero consequatur rem. Autem atque consequatur. Labore adipisci qui. Cumque quia labore nisi est molestiae autem voluptatem est. Adipisci velit corrupti similique fugit et. Incidunt vitae quam. Similique animi sint qui eos aut. Quia tempore dolore ducimus iusto non omnis aut. Voluptas maxime iure ratione. Maiores numquam aut fugiat.",
  "subject": "eveniet qui molestiae",
  "date": "2016-10-02T23:13:23.785Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 89,
  "key": 89,
  "name": "Magali Swaniawski",
  "cc": "Anika.Lebsack36@gmail.com",
  "email": "Shannon23@yahoo.com",
  "tags": "Colleague",
  "body": "Fugiat hic esse optio. Rerum beatae quas dolores pariatur in qui sunt. Consectetur sunt facere nemo qui voluptate non numquam. Ut voluptate saepe dolorem ut. Magni quae sequi laborum. Consequatur repellat iusto laboriosam sit laborum labore minus voluptas repellat. Modi aspernatur consequuntur qui at aut laudantium est non. Soluta et et aperiam quisquam quibusdam voluptatem. Ipsam et accusamus aperiam. Nam rerum deleniti ab hic.",
  "subject": "sed vel nihil",
  "date": "2016-09-30T10:25:06.903Z",
  "bucket": "Starred",
  "read": true
}, {
  "id": 39,
  "key": 39,
  "name": "Louvenia Bruen",
  "cc": "Christophe12@gmail.com",
  "email": "Cletus.Schumm@yahoo.com",
  "tags": "Family",
  "body": "Non ut fuga voluptas possimus non ab velit. Praesentium et incidunt consequuntur saepe. Voluptatibus ut velit laboriosam dignissimos. Nihil omnis non voluptatem aut consequatur dolores laboriosam sit. Cum distinctio est. Nobis corrupti libero. Hic velit assumenda unde odit fugit numquam et. Aliquam natus aut harum quaerat exercitationem. Ab cupiditate distinctio culpa impedit. Non et voluptatem impedit repellat neque omnis voluptas.",
  "subject": "qui doloremque omnis",
  "date": "2016-09-09T02:11:57.609Z",
  "bucket": "Starred",
  "read": true
}, {
  "id": 74,
  "key": 74,
  "name": "Samara Pfeffer",
  "cc": "Bridgette_Senger26@yahoo.com",
  "email": "Joey76@gmail.com",
  "body": "Vero officia quasi optio quidem. Cupiditate consequuntur officia asperiores ut vel quisquam nam. Numquam eaque minima est rerum est blanditiis veritatis repudiandae laudantium. Et qui placeat saepe ad quas harum maxime quod. Dolor quae omnis qui. Est odit suscipit aperiam esse laborum modi iste distinctio occaecati. Rerum quia aspernatur quaerat minima eos rerum. Voluptas ad animi non aliquid. Recusandae repellendus consequatur quam. Aliquid unde tenetur.",
  "subject": "consectetur a accusantium",
  "date": "2016-09-08T16:33:08.696Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 42,
  "key": 42,
  "name": "Maximilian Breitenberg",
  "cc": "Lavina.Lubowitz64@yahoo.com",
  "email": "Ignatius_McGlynn@yahoo.com",
  "tags": "Students",
  "body": "Vero non voluptate. Asperiores inventore ut debitis odio culpa et exercitationem et ratione. Quo occaecati corrupti quia nihil dicta explicabo. Sequi consequatur harum odit. Nostrum nulla doloremque recusandae suscipit veritatis sapiente minima corporis. Voluptatem amet fugit blanditiis dolor voluptatem commodi. Atque rerum incidunt perferendis alias accusantium ducimus eveniet fuga nihil. Ut adipisci autem sit ut quia ipsa quia laborum molestiae. Et cum voluptas. Soluta eum perspiciatis iusto officiis.",
  "subject": "harum est neque",
  "date": "2016-09-06T10:16:27.820Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 51,
  "key": 51,
  "name": "Kaylin Koch",
  "cc": "Marjorie80@yahoo.com",
  "email": "Cleveland0@gmail.com",
  "tags": "Friend",
  "body": "Et id magni et minus amet sit veritatis. Voluptatem incidunt ipsa dolores ipsam laboriosam non laudantium et. Sed eaque placeat. Provident perferendis suscipit voluptatem vero enim suscipit totam omnis. Reiciendis delectus in consequatur. Id deserunt voluptatem ea quam dolores quod ipsum aperiam velit. Ratione praesentium rerum fugiat voluptatem maiores vero dolorem eaque fugit. Non quibusdam dolore maiores consequatur. Quia deleniti commodi sed tempore aut. Omnis est corporis qui placeat.",
  "subject": "facilis architecto maxime",
  "date": "2016-09-03T17:13:24.524Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 8,
  "key": 8,
  "name": "Angus Thompson",
  "cc": "Lera.Terry92@hotmail.com",
  "email": "Stella73@hotmail.com",
  "body": "Assumenda saepe maxime quas ut et. Enim dolore quas nihil et est atque sit. Enim tenetur eos iste velit amet quia. Facilis totam praesentium debitis veniam similique consequatur. Asperiores et quia recusandae quis aut. Deserunt et praesentium repudiandae tempora fugit odio. Quaerat error laudantium eligendi facilis veniam. Laudantium unde sapiente nemo. Minima voluptatem nemo qui autem tenetur. Sed accusamus maxime natus sint quibusdam eligendi quae rerum.",
  "subject": "rerum et ut",
  "date": "2016-09-01T20:39:57.285Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 14,
  "key": 14,
  "name": "Kaci Heathcote",
  "cc": "Krista.Sawayn36@gmail.com",
  "email": "Ford_Conn@hotmail.com",
  "body": "Laboriosam doloremque et commodi enim sint. Mollitia omnis omnis et voluptate vitae accusantium architecto. Debitis aut doloremque voluptatem quia molestiae explicabo sunt. Praesentium id accusantium nisi dignissimos nostrum repudiandae amet. Consequatur tempore laborum id a molestiae molestiae atque placeat placeat. Magnam laudantium non. Magnam enim excepturi rerum voluptatem ab et nesciunt eum. Enim ea quis delectus recusandae officiis quia vitae. Quam maiores facilis magni omnis ex quia dolor qui. Fuga architecto vel eos excepturi.",
  "subject": "autem omnis dolorem",
  "date": "2016-08-31T11:31:44.241Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 20,
  "key": 20,
  "name": "Stephon Rowe",
  "cc": "Mohammed_Rippin@gmail.com",
  "email": "Walter.Breitenberg@yahoo.com",
  "tags": "Colleague",
  "body": "Velit fuga ullam qui dolore vel. Expedita distinctio unde a non quia. Explicabo quis et a. Quidem recusandae similique magni ut velit rerum eaque. Voluptatem nulla debitis tenetur rerum maiores. Ipsa in dolores quo reiciendis adipisci voluptas consectetur consequuntur error. Quia ad tempore tempora maxime totam corporis minima vitae dolorum. Delectus sequi velit omnis ut consequatur ullam commodi. Est voluptatem ab adipisci dolores. Sed ullam autem deleniti rerum quos atque veniam et ut.",
  "subject": "ab consequatur qui",
  "date": "2016-08-30T22:01:16.544Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 85,
  "key": 85,
  "name": "Dejon Bartell",
  "cc": "Dusty_Nolan59@gmail.com",
  "email": "Citlalli83@yahoo.com",
  "tags": "Family",
  "body": "Aperiam aliquid in voluptate et consequatur expedita et praesentium consequatur. Molestias non debitis consequatur impedit. Et accusamus quibusdam tenetur veniam enim. Sed ipsum occaecati natus. Autem sunt voluptatem soluta vel. Nostrum quia aut sunt reiciendis voluptas. Necessitatibus nihil eum et optio. Quia quos aut aut voluptatem quo eos quod. Eum cum suscipit distinctio. Laboriosam saepe minima.",
  "subject": "adipisci dolorum voluptatem",
  "date": "2016-08-26T02:04:20.150Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 62,
  "key": 62,
  "name": "Cydney Casper",
  "cc": "Jerome_Okuneva@hotmail.com",
  "email": "Jonas13@gmail.com",
  "body": "Animi unde non nostrum et dolore. Nemo nihil praesentium qui nobis. Earum pariatur et omnis exercitationem corrupti ipsa. Et provident ex aliquam consequatur architecto accusantium. Facilis laboriosam debitis nulla natus modi saepe possimus. Nihil voluptatem ad repellendus non et et similique. Amet possimus velit. Veniam nulla sunt illo eum rerum quaerat. Et iusto molestiae aliquid rerum ratione quas et recusandae. Ullam dolorem laboriosam tempore nesciunt.",
  "subject": "et recusandae beatae",
  "date": "2016-08-11T05:54:46.384Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 47,
  "key": 47,
  "name": "Ashlee Schulist",
  "cc": "Breanna81@hotmail.com",
  "email": "Marie_Ryan@hotmail.com",
  "body": "Dolor libero quos eius. Eveniet deserunt quia neque exercitationem sapiente maxime. Dolorem porro in amet at eligendi. Id vitae incidunt est provident ab quia. Mollitia labore ratione voluptatum non. Dolorum delectus velit veniam doloremque qui ab. Tempore et autem harum. Blanditiis similique vel labore itaque. Quis provident repellendus eos ipsa. Accusamus accusantium sed impedit quo commodi est sunt.",
  "subject": "omnis quas aut",
  "date": "2016-08-10T16:07:33.349Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 63,
  "key": 63,
  "name": "Chelsey Gislason",
  "cc": "Cullen_Shanahan@gmail.com",
  "email": "Estefania98@gmail.com",
  "body": "Voluptas natus cupiditate odio odit sit voluptas et. Qui soluta facere ut impedit et. Id dolores sed ut expedita quibusdam hic facilis quia. Expedita quia aut eum voluptas id. Veritatis labore delectus quae perspiciatis dolorem saepe deserunt ut omnis. Labore voluptas consectetur quis laboriosam nulla enim totam ut molestiae. Qui ipsa est dicta. Qui consequatur eum voluptatem consequatur eos suscipit repellendus voluptates cum. Doloremque vel rerum incidunt recusandae. Quia velit tempora fugiat pariatur eveniet repudiandae quia modi.",
  "subject": "iure est eos",
  "date": "2016-08-10T04:33:34.487Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 72,
  "key": 72,
  "name": "Sigmund Spinka",
  "cc": "Nikita_Rice91@hotmail.com",
  "email": "Margarita.Kohler@yahoo.com",
  "body": "Id et quam dolores non expedita laborum eius. Voluptas quia sunt delectus consectetur reprehenderit ut iusto delectus. Sit quas aliquam ut officiis. Ullam vitae hic est voluptatem voluptatem asperiores molestiae. Fugiat dolorem repudiandae. Omnis quis debitis natus perspiciatis non quo id porro quod. Dolor temporibus commodi nisi in error in. Eos accusantium dignissimos aliquid fuga doloremque ad iure dolorem quisquam. Officiis reiciendis et nam mollitia nulla provident est. Repellendus pariatur consequatur et iste enim.",
  "subject": "id quae autem",
  "date": "2016-08-08T17:11:29.856Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 12,
  "key": 12,
  "name": "Mauricio Beier",
  "cc": "Rosendo74@hotmail.com",
  "email": "Kyler_Gaylord46@yahoo.com",
  "tags": "Family",
  "body": "Qui ex rem officia illo. Et quos dolores eaque autem. At rerum officia ut necessitatibus repellat. Sunt labore ut eos eaque ut quam. Ut doloribus aut optio cum voluptas vitae qui. Aut laborum voluptas cum. Eligendi repudiandae ullam incidunt consequuntur consectetur ut ab quia. Voluptas voluptatem eos cumque quaerat dolor ipsum modi eum. Quis sit ut consequatur nemo voluptatem. Hic ipsam recusandae voluptate sequi molestiae doloremque maxime non voluptatem.",
  "subject": "ut rem sit",
  "date": "2016-08-07T23:07:54.231Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 6,
  "key": 6,
  "name": "Nikko Miller",
  "cc": "Howell.Spinka11@hotmail.com",
  "email": "Kailee_Shields@hotmail.com",
  "tags": "Family",
  "body": "Sit eum sequi corrupti iusto sed magnam. Dolorem sint ducimus aut a. Odit libero perferendis sed. Delectus ad in quam quia architecto. Exercitationem porro expedita porro aliquam. Et facilis quo atque voluptatem molestiae. Sunt ab dolorem hic odit. Velit sit quasi velit quia suscipit voluptate autem. Alias aut aspernatur nihil accusamus ea harum amet. Eum animi magni repellat distinctio libero accusantium.",
  "subject": "enim vel vitae",
  "date": "2016-08-04T03:31:50.216Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 49,
  "key": 49,
  "name": "Jarred Ebert",
  "cc": "Emmitt.Douglas19@yahoo.com",
  "email": "Akeem.Bartell14@yahoo.com",
  "tags": "Students",
  "body": "Velit expedita cum libero eos. Est possimus possimus ducimus commodi perferendis. Aut autem voluptas maxime suscipit maiores quis alias iste. Pariatur ratione eaque. Et voluptatum culpa asperiores perferendis ullam iusto eum ab. Molestias reprehenderit et numquam officia aliquid. Nostrum voluptatum doloribus eum nisi. Tenetur in non ea officia. Dignissimos exercitationem aperiam sit assumenda optio animi asperiores deleniti et. Iusto repellat ea veritatis ut aliquid et.",
  "subject": "suscipit ut est",
  "date": "2016-07-30T22:55:52.144Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 78,
  "key": 78,
  "name": "Elta Daugherty",
  "cc": "Everardo.Sawayn@gmail.com",
  "email": "Jamil75@hotmail.com",
  "body": "Incidunt at nulla rerum non aut voluptas. Libero in rerum. Natus et vitae exercitationem accusamus odio doloremque ullam. Facilis est voluptatem voluptatibus rerum molestiae tempora similique nulla culpa. In incidunt eos vel quisquam aut nihil molestias reprehenderit laborum. Illo et ut aut. Et et voluptas. Enim possimus recusandae aut quisquam eum doloribus. Delectus sed et incidunt eveniet doloremque voluptatem eos nostrum. Voluptates beatae rerum aut molestiae cumque minus et est vero.",
  "subject": "qui id sed",
  "date": "2016-07-26T16:14:01.222Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 34,
  "key": 34,
  "name": "Lolita Mayert",
  "cc": "Shanie.Doyle@yahoo.com",
  "email": "Marquis70@yahoo.com",
  "body": "Doloribus sit et iste laboriosam quis. Veritatis magnam et sit consequatur ipsam. Eum doloribus odio eos doloremque. Omnis unde qui et eum voluptas quae labore quos. Autem amet nisi omnis dolore omnis itaque vitae aut. Accusantium nam consequatur delectus. Reprehenderit est maiores consequuntur alias totam molestias dolor maiores neque. Deserunt odit aperiam a tenetur sint voluptas sit aut. Debitis qui dolorum. Vel iusto aut aut accusantium et aperiam vitae inventore.",
  "subject": "harum minus aut",
  "date": "2016-07-25T06:08:25.714Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 2,
  "key": 2,
  "name": "Tristian Dietrich",
  "cc": "Kiana_Stehr@yahoo.com",
  "email": "Eloise.Olson@yahoo.com",
  "tags": "ClassMates",
  "body": "Veritatis architecto quod possimus necessitatibus illo ab. Distinctio et incidunt dolores repellendus vitae maxime. Numquam id et temporibus reiciendis. Et velit non est et debitis adipisci labore. Pariatur quasi eaque provident quibusdam. Maxime ut aperiam ea eum in et. Hic quia dolor. Nobis sunt et corporis. Perspiciatis quod molestiae. Eius dolor quasi.",
  "subject": "eum id tempore",
  "date": "2016-07-22T10:17:15.497Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 28,
  "key": 28,
  "name": "Cordie Botsford",
  "cc": "Rosalee_Treutel@hotmail.com",
  "email": "Sasha_Lebsack@gmail.com",
  "body": "Voluptates excepturi non eaque alias voluptate voluptatem temporibus. Qui beatae veniam ad. Quibusdam possimus amet est. Maxime non non. Enim officiis nobis dolorum. Voluptatem cum delectus quis animi quibusdam. Tempora at maiores. Est itaque est consequuntur sed architecto praesentium voluptatem. Repellendus consequuntur aut occaecati perferendis culpa mollitia voluptas et velit. Illum quia rem dolor mollitia aliquam voluptas.",
  "subject": "totam quo adipisci",
  "date": "2016-07-18T15:14:47.897Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 90,
  "key": 90,
  "name": "Marlee Schinner",
  "cc": "Blaze_Schaden77@yahoo.com",
  "email": "Darren_Kertzmann@gmail.com",
  "tags": "Teachers",
  "body": "Explicabo consectetur magnam animi ut et voluptatum blanditiis. Blanditiis voluptatem qui quae consequatur. Eligendi voluptate perspiciatis excepturi. Occaecati molestias id repellendus. Est autem rem repudiandae doloribus tempora et repellat ipsum corrupti. Cumque quidem alias atque aliquid. Quibusdam dolorem mollitia ut. Laboriosam impedit nihil consequatur eum atque odio quia beatae. Dolore quidem pariatur est saepe occaecati veritatis. Dolor sunt quo fugiat facere deserunt sit molestiae laboriosam quas.",
  "subject": "magni sed sunt",
  "date": "2016-07-17T16:51:23.443Z",
  "bucket": "spam",
  "read": true
}, {
  "id": 11,
  "key": 11,
  "name": "Kailyn Johnson",
  "cc": "Napoleon89@gmail.com",
  "email": "Lucas_Stiedemann91@yahoo.com",
  "tags": "Family",
  "body": "Excepturi quo laboriosam qui eaque. Accusantium eveniet odit sint ducimus. Qui dolore hic. Eveniet laborum occaecati ullam culpa facilis libero dolores saepe. Qui est molestiae ad hic ut. Repellat natus similique. Dolor consequatur in. Qui tenetur et qui odit expedita molestiae quo harum. Ut sed voluptas ea molestiae et. Quas aut reprehenderit sit accusantium veniam rerum tenetur occaecati.",
  "subject": "illo in beatae",
  "date": "2016-07-15T14:44:12.972Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 4,
  "key": 4,
  "name": "Gunnar Kirlin",
  "cc": "Nolan75@hotmail.com",
  "email": "Tod3@gmail.com",
  "tags": "Students",
  "body": "Deleniti eum et voluptatibus fuga velit et dolores quia quam. Veritatis nostrum adipisci voluptas voluptates. Nihil repellat cumque iure. Perspiciatis dolore fuga voluptas. Labore reiciendis accusantium et mollitia. Totam itaque odit. Sint voluptate praesentium deserunt. Accusamus ea et at dolores consequuntur sunt ut. Animi ipsa provident laboriosam nemo est saepe inventore. Rem in sunt ut esse et omnis dolor quisquam sint.",
  "subject": "ad fugiat eos",
  "date": "2016-07-10T23:51:28.839Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 50,
  "key": 50,
  "name": "Aletha Heaney",
  "cc": "Adelle_Gusikowski67@yahoo.com",
  "email": "Dariana3@gmail.com",
  "tags": "Students",
  "body": "In voluptatem quibusdam saepe voluptates iure ut odit illum. Vel cum quasi et ad voluptatem recusandae libero et. Atque et perspiciatis eaque voluptatem. Accusamus deserunt ut est possimus voluptate ut. Et dignissimos enim consequatur. Molestiae beatae soluta. Eum voluptatibus culpa recusandae rerum quaerat. Omnis accusantium sint molestiae ut accusantium iure ut. Eos aut architecto distinctio eveniet labore ipsa. Aliquid totam aut assumenda.",
  "subject": "consequatur quos voluptates",
  "date": "2016-07-08T06:30:35.201Z",
  "bucket": "Drafts",
  "read": true
}, {
  "id": 45,
  "key": 45,
  "name": "Jess Cummings",
  "cc": "Guy81@hotmail.com",
  "email": "Reggie_Goodwin@yahoo.com",
  "body": "Accusantium ipsum provident distinctio harum illo. Veniam aliquid a numquam soluta illum distinctio voluptates pariatur possimus. Nesciunt consequatur et eius necessitatibus iusto veniam ipsam sit qui. Voluptatem et porro optio et consectetur quia ab. Voluptatem nam sit recusandae tempore molestiae dolorem cum voluptatem. Aut quos doloribus consectetur ad mollitia et molestiae numquam voluptas. Suscipit rerum est rem aut accusamus cumque assumenda et nulla. Qui doloribus sed animi labore et labore unde. Numquam distinctio accusamus illo quia voluptatem quia. Sunt ut iure optio quidem fugit veritatis.",
  "subject": "distinctio a qui",
  "date": "2016-07-06T06:10:44.182Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 67,
  "key": 67,
  "name": "Marion Gusikowski",
  "cc": "Frank31@hotmail.com",
  "email": "Alec_Parisian87@gmail.com",
  "body": "Quia possimus eligendi beatae et iusto ea. Est vitae officiis impedit ipsam consequuntur et. Vero quo pariatur dignissimos rem illum corrupti ut ut. Ipsum consequatur sapiente perspiciatis recusandae iusto similique placeat itaque. Porro asperiores eos ut voluptate quasi. Qui nisi aut quos officia nisi odio. Dolor voluptatem et. Fugiat quia ea omnis. Unde est voluptatibus quae. Quis expedita iusto in ipsum officia atque deleniti.",
  "subject": "quae maxime eos",
  "date": "2016-07-05T19:24:38.679Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 77,
  "key": 77,
  "name": "Darby Johnson",
  "cc": "Aurelie_Howell@gmail.com",
  "email": "Marcel59@yahoo.com",
  "body": "Animi quod vero. Autem ut quod dignissimos consequatur dignissimos et. Eum cum reprehenderit doloremque. Perferendis porro tenetur ad quae ut assumenda quis maiores. Fuga aut et aspernatur in totam ipsam est. Illo et architecto expedita ea error nulla hic. Et aut beatae. Deserunt provident dolor amet molestiae veniam. Minus perferendis itaque molestias dicta quos iusto porro tempore qui. Iste tenetur alias.",
  "subject": "aut alias eum",
  "date": "2016-07-05T17:37:15.933Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 80,
  "key": 80,
  "name": "Beatrice Jerde",
  "cc": "Gerard82@yahoo.com",
  "email": "Destiny95@yahoo.com",
  "body": "Qui maxime exercitationem sint et voluptas. Repellat quo odio occaecati tempore et molestiae et sequi. Iste deleniti aliquam qui quaerat est saepe nemo. Sint quibusdam voluptas cupiditate optio ut recusandae repellendus reprehenderit. Ut optio quo eveniet. Accusantium consequuntur nulla quas et. Omnis eius et iure tempore minus fugiat mollitia qui. Aut deleniti ex est. Ex earum temporibus incidunt corporis saepe dolore. Voluptas aut ut repellat odit qui et dolorem voluptatibus.",
  "subject": "ut tempore nesciunt",
  "date": "2016-07-01T16:01:36.016Z",
  "bucket": "Trash",
  "read": true
}, {
  "id": 9,
  "key": 9,
  "name": "Shanelle Buckridge",
  "cc": "Earline_Bergstrom@gmail.com",
  "email": "Aaliyah.Schumm50@gmail.com",
  "tags": "Teachers",
  "body": "At eveniet cupiditate qui dicta modi et neque sequi. Et magni nesciunt animi. Consequatur assumenda dolores fugiat omnis beatae ex ea quas. Tempore placeat cum dolor. Doloremque mollitia et autem repellat iusto eum suscipit consectetur officiis. Non ipsa ut odio sed reiciendis iure. Ipsum ducimus distinctio. Sit omnis sint ab fuga dignissimos inventore voluptatem. Et nisi et odit sint sunt ut qui est voluptas. Neque quas soluta sunt et distinctio aliquid omnis illo enim.",
  "subject": "quia fugiat placeat",
  "date": "2016-06-23T08:55:46.700Z",
  "bucket": "Important",
  "read": true
}, {
  "id": 65,
  "key": 65,
  "name": "Forest Walsh",
  "cc": "Cecil_Cummerata@yahoo.com",
  "email": "Joey_Monahan95@gmail.com",
  "tags": "Colleague",
  "body": "Incidunt dolor et unde. Quo et sequi sunt architecto necessitatibus quia aliquam. Sunt voluptatem quaerat doloremque. Exercitationem non quod nam et deserunt. Officiis vero ut aut enim libero consectetur nihil. Quia doloremque praesentium iste itaque qui repudiandae culpa qui omnis. Laboriosam dolores eveniet quas perferendis corrupti nulla consequatur illo. Nisi modi rem consequatur vel reiciendis. Consequuntur amet alias autem quia. Quo quaerat nihil mollitia architecto est nulla.",
  "subject": "ut sapiente nobis",
  "date": "2016-06-21T07:45:29.033Z",
  "bucket": "Sent",
  "read": true
}, {
  "id": 38,
  "key": 38,
  "name": "Alison Swift",
  "cc": "Willie.DAmore@hotmail.com",
  "email": "Hadley_Abshire42@gmail.com",
  "body": "Rem quae ut placeat adipisci ut quia veritatis culpa. Eos enim ut iure aliquam. Consequuntur voluptatem inventore doloribus et dicta quam consequatur. Porro nihil soluta. Rerum pariatur non quia. Et quas debitis et et labore velit repudiandae debitis. Id omnis et libero architecto eaque repellat. Veritatis enim quis ut nisi praesentium. Aperiam laudantium consectetur qui et harum cupiditate placeat dolorem labore. Magni commodi explicabo quia.",
  "subject": "adipisci officiis nemo",
  "date": "2016-06-20T15:48:23.880Z",
  "bucket": "Inbox",
  "read": true
}, {
  "id": 3,
  "key": 3,
  "name": "Tanya Wuckert",
  "cc": "Adeline.Hermiston5@hotmail.com",
  "email": "Ubaldo83@yahoo.com",
  "tags": "Students",
  "body": "Odit sed totam praesentium nihil optio omnis sunt quia dolorem. In esse consequuntur hic hic pariatur. Voluptas omnis est cumque et consequuntur illum id. Omnis esse odit cupiditate est aut ad consequatur. Soluta et aliquam repudiandae molestiae voluptatem. Nobis perspiciatis dolorum ullam ipsam quia sint dolorem. Accusantium eum fugit praesentium et similique. Necessitatibus veniam sed sit aliquam laudantium. Sed assumenda est dignissimos at sapiente qui vero. Optio dolorem nam soluta autem atque ad quas in.",
  "subject": "placeat fugiat cum",
  "date": "2016-06-20T07:24:03.907Z",
  "bucket": "Sent",
  "read": true
}]`));
// CONCATENATED MODULE: ./redux/mail/actions.js
const mailActions = {
  FILTER_ATTRIBUTE: 'FILTER_ATTRIBUTE',
  SELECTED_MAIL: 'SELECTED_MAIL',
  COMPOSE_MAIL: 'COMPOSE_MAIL',
  REPLY_MAIL: 'REPLY_MAIL',
  SEARCH_STRING: 'SEARCH_STRING',
  filterAction: newFilterAttr => {
    return (dispatch, getState) => {
      const filterAttr = getState().Mails.filterAttr;

      if (newFilterAttr) {
        if (newFilterAttr.bucket) {
          filterAttr.bucket = newFilterAttr.bucket;
          filterAttr.tag = newFilterAttr.tag;
        } else if (newFilterAttr.tag) {
          filterAttr.tag = newFilterAttr.tag;
        }
      }

      dispatch({
        type: mailActions.FILTER_ATTRIBUTE,
        filterAttr
      });
    };
  },
  selectMail: selectedMail => {
    return (dispatch, getState) => {
      const allMails = getState().Mails.allMails;
      allMails[allMails.findIndex(mail => mail.id === selectedMail)].read = true;
      dispatch({
        type: mailActions.SELECTED_MAIL,
        selectedMail,
        allMails
      });
    };
  },
  changeComposeMail: composeMail => ({
    type: mailActions.COMPOSE_MAIL,
    composeMail
  }),
  changeReplyMail: replyMail => ({
    type: mailActions.REPLY_MAIL,
    replyMail
  }),
  changeSearchString: searchString => ({
    type: mailActions.SEARCH_STRING,
    searchString
  })
};
/* harmony default export */ var mail_actions = (mailActions);
// CONCATENATED MODULE: ./redux/mail/reducer.js
function mail_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function mail_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { mail_reducer_ownKeys(Object(source), true).forEach(function (key) { mail_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { mail_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function mail_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const mail_reducer_initState = {
  allMails: mail_data,
  tag: undefined,
  selectedMail: -1,
  filterAttr: {
    bucket: 'Inbox'
  },
  composeMail: false,
  replyMail: false,
  searchString: ''
};
function mailReducer(state = mail_reducer_initState, action) {
  switch (action.type) {
    case mail_actions.FILTER_ATTRIBUTE:
      return mail_reducer_objectSpread(mail_reducer_objectSpread({}, state), {}, {
        composeMail: false,
        replyMail: false,
        selectedMail: -1,
        filterAttr: mail_reducer_objectSpread({}, action.filterAttr)
      });

    case mail_actions.SELECTED_MAIL:
      return mail_reducer_objectSpread(mail_reducer_objectSpread({}, state), {}, {
        replyMail: false,
        selectedMail: action.selectedMail,
        allMails: action.allMails
      });

    case mail_actions.COMPOSE_MAIL:
      return mail_reducer_objectSpread(mail_reducer_objectSpread({}, state), {}, {
        replyMail: false,
        composeMail: action.composeMail
      });

    case mail_actions.REPLY_MAIL:
      return mail_reducer_objectSpread(mail_reducer_objectSpread({}, state), {}, {
        replyMail: action.replyMail
      });

    case mail_actions.SEARCH_STRING:
      return mail_reducer_objectSpread(mail_reducer_objectSpread({}, state), {}, {
        searchString: action.searchString
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/calendar/actions.js
const calendarActions = {
  CALENDAR_VIEW: 'CALENDAR_VIEW',
  CALENDAR_EVENTS: 'CALENDAR_EVENTS',
  changeView: view => ({
    type: calendarActions.CALENDAR_VIEW,
    view
  }),
  changeEvents: events => ({
    type: calendarActions.CALENDAR_EVENTS,
    events
  })
};
/* harmony default export */ var calendar_actions = (calendarActions);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./redux/calendar/DemoEvents.js

const events = [{
  allDay: false,
  start: '2017-06-13T12:41:31.046Z',
  end: '2017-06-13T12:41:31.046Z'
}, {
  allDay: true,
  start: '2017-06-06T18:22:42.716Z',
  end: '2017-06-06T18:22:42.716Z'
}, {
  allDay: false,
  start: '2017-06-14T18:53:31.353Z',
  end: '2017-06-14T18:53:31.353Z'
}, {
  allDay: true,
  start: '2017-06-06T10:50:35.587Z',
  end: '2017-06-06T10:50:35.587Z'
}, {
  allDay: true,
  start: '2017-06-01T07:26:27.020Z',
  end: '2017-06-01T07:26:27.020Z'
}, {
  allDay: false,
  start: '2017-06-01T04:19:19.302Z',
  end: '2017-06-01T04:19:19.302Z'
}, {
  allDay: true,
  start: '2017-06-05T08:21:30.519Z',
  end: '2017-06-05T08:21:30.519Z'
}, {
  allDay: true,
  start: '2017-06-06T12:33:34.094Z',
  end: '2017-06-06T12:33:34.094Z'
}, {
  allDay: false,
  start: '2017-06-06T19:08:51.789Z',
  end: '2017-06-06T19:08:51.789Z'
}, {
  allDay: false,
  start: '2017-06-04T12:53:06.477Z',
  end: '2017-06-04T12:53:06.477Z'
}, {
  allDay: true,
  start: '2017-05-31T08:13:58.232Z',
  end: '2017-05-31T08:13:58.232Z'
}, {
  allDay: true,
  start: '2017-05-31T20:49:56.502Z',
  end: '2017-05-31T20:49:56.502Z'
}, {
  allDay: false,
  start: '2017-05-25T16:37:46.342Z',
  end: '2017-05-25T16:37:46.342Z'
}, {
  allDay: true,
  start: '2017-05-22T20:55:43.440Z',
  end: '2017-05-22T20:55:43.440Z'
}, {
  allDay: true,
  start: '2017-06-08T01:26:44.401Z',
  end: '2017-06-08T01:26:44.401Z'
}, {
  allDay: false,
  start: '2017-06-13T15:13:00.444Z',
  end: '2017-06-13T15:13:00.444Z'
}, {
  allDay: true,
  start: '2017-06-15T15:07:34.588Z',
  end: '2017-06-15T15:07:34.588Z'
}, {
  allDay: true,
  start: '2017-06-17T05:51:03.042Z',
  end: '2017-06-17T05:51:03.042Z'
}, {
  allDay: false,
  start: '2017-06-04T05:44:43.848Z',
  end: '2017-06-04T05:44:43.848Z'
}, {
  allDay: true,
  start: '2017-05-27T18:52:12.327Z',
  end: '2017-05-27T18:52:12.327Z'
}, {
  allDay: false,
  start: '2017-06-03T10:56:32.981Z',
  end: '2017-06-03T10:56:32.981Z'
}, {
  allDay: true,
  start: '2017-06-04T23:39:50.313Z',
  end: '2017-06-04T23:39:50.313Z'
}, {
  allDay: false,
  start: '2017-06-13T01:47:36.119Z',
  end: '2017-06-13T01:47:36.119Z'
}, {
  allDay: true,
  start: '2017-06-09T10:53:59.669Z',
  end: '2017-06-09T10:53:59.669Z'
}, {
  allDay: false,
  start: '2017-06-06T23:37:30.150Z',
  end: '2017-06-06T23:37:30.150Z'
}, {
  allDay: false,
  start: '2017-05-24T15:47:41.647Z',
  end: '2017-05-24T15:47:41.647Z'
}, {
  allDay: false,
  start: '2017-05-20T09:37:22.294Z',
  end: '2017-05-20T09:37:22.294Z'
}, {
  allDay: true,
  start: '2017-05-22T04:18:23.139Z',
  end: '2017-05-22T04:18:23.139Z'
}, {
  allDay: true,
  start: '2017-05-21T12:52:59.331Z',
  end: '2017-05-21T12:52:59.331Z'
}, {
  allDay: false,
  start: '2017-06-05T19:12:46.218Z',
  end: '2017-06-05T19:12:46.218Z'
}, {
  allDay: false,
  start: '2017-06-18T05:42:32.376Z',
  end: '2017-06-18T05:42:32.376Z'
}, {
  allDay: false,
  start: '2017-06-13T08:25:55.959Z',
  end: '2017-06-13T08:25:55.959Z'
}, {
  allDay: true,
  start: '2017-06-13T06:24:45.567Z',
  end: '2017-06-13T06:24:45.567Z'
}, {
  allDay: false,
  start: '2017-06-10T16:02:57.478Z',
  end: '2017-06-10T16:02:57.478Z'
}, {
  allDay: false,
  start: '2017-06-13T18:05:48.180Z',
  end: '2017-06-13T18:05:48.180Z'
}, {
  allDay: false,
  start: '2017-06-17T11:41:16.372Z',
  end: '2017-06-17T11:41:16.372Z'
}, {
  allDay: true,
  start: '2017-05-25T01:29:20.872Z',
  end: '2017-05-25T01:29:20.872Z'
}, {
  allDay: false,
  start: '2017-06-01T18:23:07.322Z',
  end: '2017-06-01T18:23:07.322Z'
}, {
  allDay: false,
  start: '2017-05-22T04:20:36.858Z',
  end: '2017-05-22T04:20:36.858Z'
}, {
  allDay: false,
  start: '2017-05-26T12:05:32.983Z',
  end: '2017-05-26T12:05:32.983Z'
}, {
  allDay: false,
  start: '2017-06-01T13:57:24.817Z',
  end: '2017-06-01T13:57:24.817Z'
}, {
  allDay: false,
  start: '2017-05-29T17:58:20.674Z',
  end: '2017-05-29T17:58:20.674Z'
}, {
  allDay: false,
  start: '2017-06-11T01:19:28.050Z',
  end: '2017-06-11T01:19:28.050Z'
}, {
  allDay: false,
  start: '2017-05-31T07:10:27.044Z',
  end: '2017-05-31T07:10:27.044Z'
}, {
  allDay: true,
  start: '2017-05-26T09:00:39.158Z',
  end: '2017-05-26T09:00:39.158Z'
}, {
  allDay: true,
  start: '2017-05-31T17:15:18.611Z',
  end: '2017-05-31T17:15:18.611Z'
}, {
  allDay: false,
  start: '2017-06-10T19:42:35.124Z',
  end: '2017-06-10T19:42:35.124Z'
}, {
  allDay: false,
  start: '2017-05-20T18:40:49.210Z',
  end: '2017-05-20T18:40:49.210Z'
}, {
  allDay: false,
  start: '2017-06-04T11:36:22.540Z',
  end: '2017-06-04T11:36:22.540Z'
}, {
  allDay: false,
  start: '2017-06-13T20:53:08.880Z',
  end: '2017-06-13T20:53:08.880Z'
}];
const datediff = new external_moment_default.a(new Date()).diff(new external_moment_default.a('2017-06-01T18:23:07.322Z'), 'days');
events.forEach((event, index) => {
  events[index].id = `${index + 1}`;
  events[index].title = `Demo event ${index + 1}`;
  events[index].desc = `Desc of event ${index + 1}`;
  events[index].start = new external_moment_default.a(event.start).add(datediff, 'days').toDate();
  events[index].end = new external_moment_default.a(event.end).add(datediff, 'days').toDate();
});
/* harmony default export */ var DemoEvents = (events.splice(0, 10));
// CONCATENATED MODULE: ./redux/calendar/reducer.js
function calendar_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function calendar_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { calendar_reducer_ownKeys(Object(source), true).forEach(function (key) { calendar_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { calendar_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function calendar_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const calendar_reducer_initState = {
  events: DemoEvents,
  view: 'month'
};
function calendarReducer(state = calendar_reducer_initState, action) {
  switch (action.type) {
    case calendar_actions.CALENDAR_VIEW:
      return calendar_reducer_objectSpread(calendar_reducer_objectSpread({}, state), {}, {
        view: action.view
      });

    case calendar_actions.CALENDAR_EVENTS:
      return calendar_reducer_objectSpread(calendar_reducer_objectSpread({}, state), {}, {
        events: action.events
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/box/DemoBox.js



const ReactComponenta1 = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])("h2", {
  children: " Hello "
});

const ReactComponenta2 = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {});

const ReactComponenta3 = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
  children: "Add Me"
});

const DemoBox_allBox = [{
  uid: 'a1',
  title: 'Box-1',
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  reactComponent: ReactComponenta1
}, {
  uid: 'a2',
  title: 'Box-2',
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  reactComponent: ReactComponenta2
}, {
  uid: 'a3',
  title: 'Box-3',
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  reactComponent: ReactComponenta3
}, {
  uid: 'a4',
  title: 'Box-4',
  content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  reactComponent: ReactComponenta3
}];
/* harmony default export */ var DemoBox = (DemoBox_allBox);
// CONCATENATED MODULE: ./redux/box/actions.js
const boxActions = {
  DELETE_BOX: 'DELETE_BOX',
  SAVE_BOX: 'SAVE_BOX',
  deleteBox: uid => ({
    type: boxActions.DELETE_BOX,
    uid
  }),
  saveBox: box => ({
    type: boxActions.SAVE_BOX,
    box
  })
};
/* harmony default export */ var box_actions = (boxActions);
// CONCATENATED MODULE: ./redux/box/reducer.js
function box_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function box_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { box_reducer_ownKeys(Object(source), true).forEach(function (key) { box_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { box_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function box_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const generateLayout = () => {
  let y = -2;
  const h = 2;
  const w = 48;
  DemoBox.map((box, index) => {
    let temp = {};
    temp.lg = {
      x: index % 2 === 0 ? 0 : 48,
      y: y + h,
      h,
      w,
      i: box.uid.toString()
    };
    temp.md = {
      x: index % 2 === 0 ? 0 : 48,
      y: y + h,
      h,
      w,
      i: box.uid.toString()
    };
    temp.sm = {
      x: index % 2 === 0 ? 0 : 48,
      y: y + h,
      h,
      w,
      i: box.uid.toString()
    };
    temp.xs = {
      x: index % 2 === 0 ? 0 : 48,
      y: y + h,
      h,
      w,
      i: box.uid.toString()
    };
    temp.xxs = {
      x: index % 2 === 0 ? 0 : 48,
      y: y + h,
      h,
      w,
      i: box.uid.toString()
    };
    DemoBox[index].size = temp;
    return null;
  });
  return DemoBox;
};

const box_reducer_initState = {
  allBox: generateLayout(),
  reload: false
};
function boxReducer(state = box_reducer_initState, action) {
  const {
    allBox
  } = state;

  switch (action.type) {
    case box_actions.DELETE_BOX:
      let tempAllBox = [];
      allBox.map(box => {
        if (box.uid.toString() !== action.uid.toString()) {
          tempAllBox.push(box);
        }

        return null;
      });
      return box_reducer_objectSpread(box_reducer_objectSpread({}, state), {}, {
        allBox: tempAllBox,
        reload: true
      });

    case box_actions.SAVE_BOX:
      return box_reducer_objectSpread(box_reducer_objectSpread({}, state), {}, {
        reload: false,
        allBox: action.box
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/notes/data.js
/* harmony default export */ var notes_data = (JSON.parse(`[{
  "id": 94926,
  "note": "Et quia eum nobis ut hic autem enim. Qui ea a qui accusantium ducimus ut placeat modi. Esse quibusdam earum cupiditate optio et nulla voluptatem. Qui est deserunt doloremque qui eaque in. Rerum voluptatum dolor corrupti. Voluptatem occaecati laudantium ea enim similique.",
  "createTime": "2017-02-10T07:42:44.828Z",
  "color": 0
}, {
  "id": 51842,
  "note": "Possimus exercitationem qui ea quo repudiandae. Corporis magnam non soluta doloremque et sunt dolores sunt. Corrupti reiciendis sunt optio dolorem. Dignissimos quo adipisci veritatis et repellat. Omnis omnis dignissimos ipsum non iusto voluptates.",
  "createTime": "2017-04-08T03:17:31.999Z",
  "color": 0
}, {
  "id": 28180,
  "note": "Tempore est velit non eaque. Exercitationem fugiat rerum magni. Delectus reprehenderit est neque autem amet. Qui consequatur velit et reprehenderit soluta voluptates. Id reprehenderit dolorum omnis ipsa quae dolores.",
  "createTime": "2017-01-21T05:43:16.889Z",
  "color": 3
}, {
  "id": 29619,
  "note": "Officiis suscipit perferendis blanditiis aut aliquid quod et. Eius repellendus natus dicta saepe. In adipisci alias facilis nihil eligendi consequatur odit sequi. Quae quibusdam eos ut qui aut nisi beatae quaerat qui.",
  "createTime": "2017-01-08T23:36:05.692Z",
  "color": 4
}, {
  "id": 19600,
  "note": "Dolor quas est quae. Id temporibus sed. Illum quo amet est fuga laborum facilis. Aut nisi consequatur voluptatum et. Eum et necessitatibus quam corporis expedita quasi reiciendis quia vitae. Earum harum deserunt minus modi consequuntur perspiciatis labore officia quo.",
  "createTime": "2017-05-11T22:30:14.915Z",
  "color": 4
}]`));
// CONCATENATED MODULE: ./redux/notes/actions.js
const notesAction = {
  CHANGE_NOTE: 'CHANGE_NOTE',
  ADD_NOTE: 'ADD_NOTE',
  EDIT_NOTE: 'EDIT_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  CHANGE_COLOR: 'CHANGE_COLOR',
  changeNote: id => {
    return (dispatch, getState) => {
      const notes = getState().Notes.notes;
      const seectedColor = notes[notes.findIndex(note => note.id === id)].color;
      dispatch({
        type: notesAction.CHANGE_NOTE,
        selectedId: id,
        seectedColor
      });
    };
  },
  addNote: () => {
    return (dispatch, getState) => {
      const newNote = {
        id: new Date(),
        note: 'New Note',
        createTime: new Date(),
        color: getState().Notes.seectedColor
      };
      const notes = [newNote, ...getState().Notes.notes];
      dispatch({
        type: notesAction.ADD_NOTE,
        selectedId: newNote.id,
        notes
      });
    };
  },
  editNote: (id, newNote) => {
    return (dispatch, getState) => {
      const oldNotes = getState().Notes.notes;
      const notes = [];
      oldNotes.forEach(note => {
        if (note.id !== id) {
          notes.push(note);
        } else {
          note.note = newNote;
          notes.push(note);
        }
      });
      dispatch({
        type: notesAction.EDIT_NOTE,
        notes
      });
    };
  },
  deleteNote: id => {
    return (dispatch, getState) => {
      const oldNotes = getState().Notes.notes;
      const notes = [];
      oldNotes.forEach(note => {
        if (note.id !== id) {
          notes.push(note);
        }
      });
      let selectedId = getState().Notes.selectedId;

      if (selectedId === id) {
        if (notes.length === 0) {
          selectedId = undefined;
        } else {
          selectedId = notes[0].id;
        }
      }

      dispatch({
        type: notesAction.DELETE_NOTE,
        notes,
        selectedId
      });
    };
  },
  changeColor: seectedColor => {
    return (dispatch, getState) => {
      const oldNotes = getState().Notes.notes;
      const selectedId = getState().Notes.selectedId;
      const notes = [];
      oldNotes.forEach(note => {
        if (note.id !== selectedId) {
          notes.push(note);
        } else {
          note.color = seectedColor;
          notes.push(note);
        }
      });
      dispatch({
        type: notesAction.CHANGE_COLOR,
        notes,
        seectedColor
      });
    };
  }
};
/* harmony default export */ var notes_actions = (notesAction);
// CONCATENATED MODULE: ./redux/notes/reducer.js
function notes_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function notes_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { notes_reducer_ownKeys(Object(source), true).forEach(function (key) { notes_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { notes_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function notes_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const colors = ['#7ED321', '#de1b1b', '#511E78', '#ff9009', '#42a5f5'];
const notes_reducer_initState = {
  notes: notes_data,
  colors,
  selectedId: notes_data[0].id,
  seectedColor: notes_data[0].color
};
function noteReducer(state = notes_reducer_initState, action) {
  switch (action.type) {
    case notes_actions.CHANGE_NOTE:
      return notes_reducer_objectSpread(notes_reducer_objectSpread({}, state), {}, {
        selectedId: action.selectedId,
        seectedColor: action.seectedColor
      });

    case notes_actions.ADD_NOTE:
      return notes_reducer_objectSpread(notes_reducer_objectSpread({}, state), {}, {
        notes: action.notes,
        selectedId: action.selectedId
      });

    case notes_actions.EDIT_NOTE:
      return notes_reducer_objectSpread(notes_reducer_objectSpread({}, state), {}, {
        notes: action.notes
      });

    case notes_actions.DELETE_NOTE:
      return notes_reducer_objectSpread(notes_reducer_objectSpread({}, state), {}, {
        notes: action.notes,
        selectedId: action.selectedId
      });

    case notes_actions.CHANGE_COLOR:
      return notes_reducer_objectSpread(notes_reducer_objectSpread({}, state), {}, {
        notes: action.notes,
        seectedColor: action.seectedColor
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/todos/data.js
const todoData = JSON.parse(`[{
  "id": 6903,
  "todo": "Ut corrupti eum. Magnam culpa et itaque voluptas maiores et sed molestiae ad. Ut earum est tempore enim odio hic architecto et iure. Qui dolore velit illo velit atque reprehenderit sed cupiditate.",
  "createTime": "2016-12-26T15:52:07.773Z",
  "color": 1,
  "completed": true
}, {
  "id": 47977,
  "todo": "Eos quas doloremque iste aut. Harum doloribus atque. Natus quis odio eaque ea. Ut recusandae occaecati. Consequuntur deleniti qui perspiciatis veniam ut.",
  "createTime": "2016-08-15T06:09:48.506Z",
  "color": 3,
  "completed": false
}, {
  "id": 81193,
  "todo": "Est quod in vel. Consequatur consequatur ipsa. Odio ea repellat aut quibusdam autem quibusdam. Ad ea quo in.",
  "createTime": "2016-09-10T03:59:20.370Z",
  "color": 2,
  "completed": true
}, {
  "id": 23485,
  "todo": "Omnis non iste. Delectus omnis quaerat dicta in aut. Id velit est aliquid ut voluptas eligendi numquam.",
  "createTime": "2016-07-04T04:40:50.001Z",
  "color": 3,
  "completed": false
}, {
  "id": 61833,
  "todo": "Exercitationem qui quia. Laborum suscipit qui voluptatum suscipit est accusamus. Placeat illo dolorem placeat totam.",
  "createTime": "2017-06-18T00:51:31.881Z",
  "color": 4,
  "completed": true
}]`);

class data_fakeData {
  constructor(size = 10, colorLength = 4) {
    this.size = size;
    this.datas = [];
    this.colorLength = colorLength;
  }

  dataModel(index) {
    // return {
    //   id: faker.random.number() ,
    //   todo: faker.lorem.paragraph(),
    //   createTime: faker.date.past(),
    //   color: faker.random.number(this.colorLength - 1),
    //   completed: faker.random.boolean(),
    // }
    return todoData[index];
  }

  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }

    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }

    return this.datas[index];
  }

  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }

    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }

}

/* harmony default export */ var todos_data = (data_fakeData);
// CONCATENATED MODULE: ./redux/todos/actions.js
const todoActions = {
  CHANGE_TODO: 'CHANGE_TODO',
  ALL_COMPLETED: 'ALL_COMPLETED',
  DELETE_COMPLETED: 'DELETE_COMPLETED',
  addTodo: todo => {
    return (dispatch, getState) => {
      const newTodo = {
        id: new Date(),
        todo: todo,
        createTime: new Date(),
        color: 0,
        completed: false
      };
      const todos = [newTodo, ...getState().Todos.todos];
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  edittodo: editTodo => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== editTodo.id) {
          todos.push(todo);
        } else {
          todos.push(editTodo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  deleteTodo: id => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== id) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  allCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        todo.completed = true;
        todos.push(todo);
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  },
  deleteCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.todos;
      const todos = [];
      oldTodos.forEach(todo => {
        if (!todo.completed) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos
      });
    };
  }
};
/* harmony default export */ var todos_actions = (todoActions);
// CONCATENATED MODULE: ./redux/todos/reducer.js
function todos_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function todos_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { todos_reducer_ownKeys(Object(source), true).forEach(function (key) { todos_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { todos_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function todos_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const reducer_colors = ['#7ED321', '#de1b1b', '#511E78', '#ff9009', '#42a5f5'];
const reducer_todos = new todos_data(5, reducer_colors.length).getAll();
const todos_reducer_initState = {
  todos: reducer_todos,
  colors: reducer_colors
};
function todoReducer(state = todos_reducer_initState, action) {
  const todos = state.todos;
  const newtodos = [];

  switch (action.type) {
    case todos_actions.CHANGE_TODO:
      return todos_reducer_objectSpread(todos_reducer_objectSpread({}, state), {}, {
        todos: action.todos
      });

    case todos_actions.ALL_COMPLETED:
      todos.forEach(todo => {
        todo.completed = true;
        newtodos.push(todo);
      });
      return todos_reducer_objectSpread(todos_reducer_objectSpread({}, state), {}, {
        todos: newtodos
      });

    case todos_actions.DELETE_COMPLETED:
      todos.forEach(todo => {
        if (todo.completed !== true) {
          newtodos.push(todo);
        }
      });
      return todos_reducer_objectSpread(todos_reducer_objectSpread({}, state), {}, {
        todos: newtodos
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/contacts/data.js
const otherAttributes = [{
  title: 'Mobile',
  value: 'mobile',
  type: 'phoneNumber'
}, {
  title: 'Home',
  value: 'home',
  type: 'phoneNumber'
}, {
  title: 'Company',
  value: 'company',
  type: 'company'
}, {
  title: 'Work',
  value: 'work',
  type: 'phoneNumber'
}, {
  title: 'Notes',
  value: 'note',
  type: 'paragraph'
}];
const contactList = JSON.parse(`[{
  "id": 22143,
  "avatar": "https://randomuser.me/api/portraits/men/46.jpg",
  "firstName": "Benjamin",
  "lastName": "Jacobi",
  "name": "Benjamin Jacobi",
  "mobile": "(023) 302-3161 x60451",
  "home": "(136) 403-0476 x8388",
  "company": "Casper Inc",
  "work": "(399) 506-9438",
  "note": "Quisquam et nisi. Dicta in ut eos consequatur ipsum omnis. Quisquam doloremque error praesentium sapiente et vitae. Omnis facere sint nulla similique vel voluptatem officia deleniti."
}, {
  "id": 17385,
  "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50",
  "firstName": "Clementina",
  "lastName": "Hahn",
  "name": "Clementina Hahn",
  "mobile": "686.292.3548 x7219",
  "home": "447-343-4864 x414",
  "company": "Marquardt Inc",
  "work": "299-721-6828 x856",
  "note": "Distinctio voluptas repellendus rerum temporibus deserunt et corrupti sint. Odit sit labore quia. Perferendis iure eos qui tempore ex saepe consequuntur accusamus ipsa. Eius consectetur nam quas. Laborum aperiam hic dolorum quae autem consequatur."
}, {
  "id": 85838,
  "avatar": "https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=047fade70e80ebb22ac8f09c04872c40",
  "firstName": "Clinton",
  "lastName": "Goyette",
  "name": "Clinton Goyette",
  "mobile": "(913) 127-1563 x082",
  "home": "(843) 501-8804",
  "company": "Feil - Goodwin",
  "work": "732.111.8883",
  "note": "Maiores animi et quidem. Ducimus voluptate est consequatur ut vitae in. Ut fugit sit ab blanditiis ab occaecati soluta quis."
}, {
  "id": 2791,
  "avatar": "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=c3a31eeb7efb4d533647e3cad1de9257",
  "firstName": "Forrest",
  "lastName": "Klein",
  "name": "Forrest Klein",
  "mobile": "174-628-5802 x8324",
  "home": "(047) 141-0247",
  "company": "Wilkinson - Howe",
  "work": "1-624-238-9252",
  "note": "Sit et non debitis. Quis atque facilis et sed. Illum adipisci deserunt corporis modi necessitatibus at numquam neque sint."
}, {
  "id": 67493,
  "avatar": "https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=fe0976a79ece0ee8effca4cab4527ae2",
  "firstName": "General",
  "lastName": "Kub",
  "name": "General Kub",
  "mobile": "779.482.9824",
  "home": "(698) 858-0337 x3273",
  "company": "Moen Group",
  "work": "881.768.7522",
  "note": "Quibusdam dolorem minima ea enim nostrum eos. Corrupti dolore velit molestiae nostrum error qui. Sit qui maxime sed quisquam rem cupiditate. Iste ex quidem. Ipsam et quia omnis facere blanditiis."
}, {
  "id": 75593,
  "avatar": "https://images.unsplash.com/photo-1505196298139-8cfce5efd3d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=086d0c442db382f3faadb8156eecafa7",
  "firstName": "Lon",
  "lastName": "Wunsch",
  "name": "Lon Wunsch",
  "mobile": "(792) 607-6366 x88975",
  "home": "447.683.3799 x38668",
  "company": "Johns, Gibson and Schinner",
  "work": "(735) 859-7674",
  "note": "Velit non voluptas sed sit pariatur earum unde neque. Incidunt nam reprehenderit non mollitia. Incidunt quo illum modi ex eos consequuntur eius nihil itaque. Quis tenetur ratione repudiandae ea et architecto dolorem porro. Rem non consectetur ea iste."
}, {
  "id": 90096,
  "avatar": "https://images.unsplash.com/photo-1503467913725-8484b65b0715?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=cf7f82093012c4789841f570933f88e3",
  "firstName": "Mabelle",
  "lastName": "Kling",
  "name": "Mabelle Kling",
  "mobile": "499-736-0779 x2409",
  "home": "1-910-529-7393 x222",
  "company": "Bins, Murray and Ryan",
  "work": "905.098.6372",
  "note": "Et et rerum placeat beatae doloribus earum et reiciendis. Nisi suscipit ad dolor. Tenetur hic quia nihil deleniti inventore. Blanditiis aliquam ea ea. Omnis consequatur itaque est rerum sed reiciendis laboriosam reiciendis. Consectetur ullam et laudantium at itaque aut qui et molestiae."
}, {
  "id": 15783,
  "avatar": "https://images.unsplash.com/photo-1509380836717-c4320ccf1a6f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=e01c8c45a063daaf6d6e571a32bd6c90",
  "firstName": "Maryse",
  "lastName": "Koss",
  "name": "Maryse Koss",
  "mobile": "668-920-9662 x610",
  "home": "075.864.1819 x8265",
  "company": "Smitham Inc",
  "work": "468.534.0931",
  "note": "Libero perferendis aut repudiandae quas. Omnis aut enim voluptas magnam harum quisquam illo aliquid aliquam. Dolor et et vel nihil quibusdam fugit facere adipisci aut. Repellat quia est beatae animi ipsa. Ad sit eligendi pariatur quia illo atque qui voluptatem excepturi."
}, {
  "id": 42122,
  "avatar": "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  "firstName": "Maude",
  "lastName": "Grant",
  "name": "Maude Grant",
  "mobile": "1-077-505-0657",
  "home": "062.968.4841 x62748",
  "company": "Thiel, Bauch and Mosciski",
  "work": "1-318-593-2619 x206",
  "note": "Ut sit fuga quibusdam. Ullam non necessitatibus voluptatem quidem est dignissimos dolores quaerat. Aspernatur fugiat et."
}, {
  "id": 5869,
  "avatar": "https://images.unsplash.com/photo-1502937406922-305bb2789e95?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=9ccf7504e3c56169185184198f642dcf",
  "firstName": "Orrin",
  "lastName": "Harris",
  "name": "Orrin Harris",
  "mobile": "871.567.4877",
  "home": "(466) 574-3352",
  "company": "Haag Group",
  "work": "1-908-422-4964",
  "note": "Aut sequi quae omnis ut qui quaerat. Dolor et fugit blanditiis laudantium. Libero modi officiis consequatur corrupti reiciendis aut qui nemo doloribus. Consequatur voluptatibus quis vero numquam aspernatur a sit laborum voluptates."
}]`);
class contacts_data_fakeData {
  constructor(size = 10) {
    this.size = size;
    this.datas = [];
  }

  dataModel(index) {
    return contactList[index];
  }

  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }

    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }

    return this.datas[index];
  }

  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }

    return this.datas.slice().sort((contact1, contact2) => `${contact1.firstName}${contact1.LastName}`.toUpperCase() > `${contact2.firstName}${contact2.LastName}`.toUpperCase());
  }

  getSize() {
    return this.size;
  }

}
// CONCATENATED MODULE: ./redux/contacts/actions.js


function ascendingSort(contact1, contact2) {
  const name1 = contact1.name ? contact1.name.toUpperCase() : '~';
  const name2 = contact2.name ? contact2.name.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const contactActions = {
  ADD_CONTACT: 'ADD_CONTACT',
  EDIT_CONTACT: 'EDIT_CONTACT',
  DELETE__CONTACT: 'DELETE__CONTACT',
  CHANGE_CONTACT: 'CHANGE_CONTACT',
  EDIT_VIEW: 'EDIT_VIEW',
  changeContact: id => ({
    type: contactActions.CHANGE_CONTACT,
    id
  }),
  addContact: () => {
    const newContact = {
      id: new Date(),
      firstName: '',
      avatar: contacts[new Date() % 10].avatar,
      LastName: '',
      mobile: '',
      home: '',
      name: '',
      company: '',
      work: '',
      note: ''
    };
    return (dispatch, getState) => {
      dispatch({
        type: contactActions.ADD_CONTACT,
        contacts: [...getState().Contacts.contacts, newContact],
        selectedId: newContact.id
      });
    };
  },
  editContact: newContact => {
    return (dispatch, getState) => {
      const contacts = getState().Contacts.contacts;
      const newContacts = [];
      contacts.forEach(contact => {
        if (contact.id === newContact.id) {
          newContacts.push(newContact);
        } else {
          newContacts.push(contact);
        }
      });
      dispatch({
        type: contactActions.EDIT_CONTACT,
        contacts: newContacts.sort(ascendingSort)
      });
    };
  },
  deleteContact: id => {
    return (dispatch, getState) => {
      const contacts = getState().Contacts.contacts;
      const seectedId = getState().Contacts.seectedId;
      const newContacts = [];
      contacts.forEach(contact => {
        if (contact.id === id) {} else {
          newContacts.push(contact);
        }
      });
      dispatch({
        type: contactActions.DELETE__CONTACT,
        contacts: newContacts,
        seectedId: id === seectedId ? undefined : seectedId
      });
    };
  },
  viewChange: view => ({
    type: contactActions.EDIT_VIEW,
    view
  })
};
/* harmony default export */ var contacts_actions = (contactActions);
// CONCATENATED MODULE: ./redux/contacts/reducer.js
function contacts_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function contacts_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { contacts_reducer_ownKeys(Object(source), true).forEach(function (key) { contacts_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { contacts_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function contacts_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const contacts = new contacts_data_fakeData(10).getAll();
const contacts_reducer_initState = {
  contacts,
  selectedId: contacts[0].id,
  editView: false
};
function contactReducer(state = contacts_reducer_initState, action) {
  switch (action.type) {
    case contacts_actions.CHANGE_CONTACT:
      return contacts_reducer_objectSpread(contacts_reducer_objectSpread({}, state), {}, {
        selectedId: action.id,
        editView: false
      });

    case contacts_actions.ADD_CONTACT:
      return contacts_reducer_objectSpread(contacts_reducer_objectSpread({}, state), {}, {
        contacts: action.contacts,
        selectedId: action.selectedId,
        editView: true
      });

    case contacts_actions.EDIT_CONTACT:
      return contacts_reducer_objectSpread(contacts_reducer_objectSpread({}, state), {}, {
        contacts: action.contacts
      });

    case contacts_actions.DELETE__CONTACT:
      return contacts_reducer_objectSpread(contacts_reducer_objectSpread({}, state), {}, {
        contacts: action.contacts,
        selectedId: action.selectedId
      });

    case contacts_actions.EDIT_VIEW:
      return contacts_reducer_objectSpread(contacts_reducer_objectSpread({}, state), {}, {
        editView: action.view
      });

    default:
      return state;
  }
}

// CONCATENATED MODULE: ./components/Tables/ImageCell.js


const PendingPool = {};
const ReadyPool = {};
function ImageCell({
  src
}) {
  const [srcState, setSrcState] = external_react_default.a.useState(false);
  const onLoadImage = external_react_default.a.useCallback(source => {
    ReadyPool[src] = true;

    if (source === src) {
      setSrcState(source);
    }
  }, [src]);
  const loadImage = external_react_default.a.useCallback(src => {
    if (ReadyPool[src]) {
      setSrcState(src);
      return;
    }

    if (PendingPool[src]) {
      PendingPool[src].push(onLoadImage);
      return;
    }

    PendingPool[src] = [onLoadImage];
    const img = new Image();

    img.onload = () => {
      PendingPool[src].forEach(callback => {
        callback(src);
      });
      delete PendingPool[src];
      img.onload = null;
      src = undefined;
    };

    img.src = srcState;
  }, [srcState, onLoadImage]);
  external_react_default.a.useEffect(() => {
    loadImage(src);
  }, [loadImage, src]);
  const style = src ? {
    backgroundImage: `url(${src})`,
    width: '70px',
    height: '70px',
    backgroundSize: 'cover'
  } : undefined;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: "exampleImage",
    style: style
  });
}
// EXTERNAL MODULE: external "antd/lib/popconfirm"
var popconfirm_ = __webpack_require__("QghY");
var popconfirm_default = /*#__PURE__*/__webpack_require__.n(popconfirm_);

// CONCATENATED MODULE: ./components/Feedback/Popconfirm.js

/* harmony default export */ var Popconfirm = (popconfirm_default.a);
// CONCATENATED MODULE: ./components/Tables/DeleteCell.js



function DeleteCell({
  index,
  onDeleteCell
}) {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(Popconfirm, {
    title: "Sure to delete?",
    okText: "DELETE",
    cancelText: "No",
    onConfirm: () => onDeleteCell(index),
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
      href: "# ",
      children: "Delete"
    })
  });
}
// EXTERNAL MODULE: external "@ant-design/icons/lib/icons/EditOutlined"
var EditOutlined_ = __webpack_require__("x0cy");
var EditOutlined_default = /*#__PURE__*/__webpack_require__.n(EditOutlined_);

// EXTERNAL MODULE: external "@ant-design/icons/lib/icons/CheckOutlined"
var CheckOutlined_ = __webpack_require__("AElg");
var CheckOutlined_default = /*#__PURE__*/__webpack_require__.n(CheckOutlined_);

// EXTERNAL MODULE: ./components/uielements/input.js + 1 modules
var input = __webpack_require__("7I1n");

// CONCATENATED MODULE: ./components/Tables/EditableCell.js



function EditableCell_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function EditableCell_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { EditableCell_ownKeys(Object(source), true).forEach(function (key) { EditableCell_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { EditableCell_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function EditableCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function EditableCell(props) {
  const [state, setState] = external_react_default.a.useState({
    value: props.value,
    editable: false
  });

  const handleChange = event => {
    const value = event.target.value;
    setState(EditableCell_objectSpread(EditableCell_objectSpread({}, state), {}, {
      value
    }));
  };

  const check = () => {
    setState(EditableCell_objectSpread(EditableCell_objectSpread({}, state), {}, {
      editable: false
    }));

    if (props.onChange) {
      props.onChange(state.value, props.columnsKey, props.index);
    }
  };

  const edit = () => {
    setState(EditableCell_objectSpread(EditableCell_objectSpread({}, state), {}, {
      editable: true
    }));
  };

  const {
    value,
    editable
  } = state;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: "isoEditData",
    children: editable ? /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: "isoEditDataWrapper",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(input["c" /* default */], {
        value: value,
        onChange: handleChange,
        onPressEnter: check
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CheckOutlined_default.a, {
        className: "isoEditIcon",
        onClick: check
      })]
    }) : /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
      className: "isoDataWrapper",
      children: [value || ' ', /*#__PURE__*/Object(jsx_runtime_["jsx"])(EditOutlined_default.a, {
        className: "isoEditIcon",
        onClick: edit
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/uielements/button.js + 1 modules
var uielements_button = __webpack_require__("QCuh");

// CONCATENATED MODULE: ./components/Tables/FilterDropdown.js





function FilterDropdown({
  searchText,
  onInputChange,
  onSearch
}) {
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: "isoTableSearchBox",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(input["c" /* default */], {
      id: "tableFilterInput",
      placeholder: "Search name",
      value: searchText,
      onChange: onInputChange,
      onPressEnter: onSearch
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(uielements_button["a" /* default */], {
      type: "primary",
      onClick: onSearch,
      children: "Search"
    })]
  });
}
// CONCATENATED MODULE: ./components/Tables/HelperCells.js







const DateCell = data => /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
  children: data.toLocaleString()
});

const HelperCells_ImageCell = src => /*#__PURE__*/Object(jsx_runtime_["jsx"])(ImageCell, {
  src: src
});

const LinkCell = (link, href) => /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
  href: href ? href : '#',
  children: link
});

const TextCell = text => /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
  children: text
});


// CONCATENATED MODULE: ./redux/card/config.js




function createColumns(editColumn, deleteColumn) {
  return [{
    title: 'Number',
    dataIndex: 'number',
    rowKey: 'number'
  }, {
    title: 'Full Name',
    dataIndex: 'name',
    rowKey: 'name'
  }, {
    title: 'Notes',
    dataIndex: 'notes',
    rowKey: 'notes'
  }, {
    title: '',
    rowKey: 'action',
    render: (text, record) => /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(DeleteCell, {
        onDeleteCell: () => {
          deleteColumn(record);
        }
      })
    })
  }];
}

const fakedata = [{
  id: 3,
  key: 1,
  number: '**** **** **** 4243',
  name: 'John Brown',
  notes: 'Nulla vitae elit libero, a pharetra augue.'
}, {
  id: 2,
  key: 2,
  number: '**** **** **** 4242',
  name: 'Jim Green',
  notes: 'Nullam id dolor id nibh ultricies vehicula ut id elit.'
}, {
  id: 1,
  key: 3,
  number: '**** **** **** 4241',
  name: 'Joe Black',
  notes: 'Nulla vitae elit libero, a pharetra augue.'
}];

// CONCATENATED MODULE: ./redux/card/actions.js

const cardActions = {
  CHANGE_CARDS: 'CHANGE_CARDS',
  addCard: card => {
    return (dispatch, getState) => {
      const cards = [card, ...getState().Cards.cards];
      dispatch({
        type: cardActions.CHANGE_CARDS,
        cards
      });
    };
  },
  editCard: editCard => {
    return (dispatch, getState) => {
      const oldCards = getState().Cards.cards;
      const cards = [];
      oldCards.forEach(card => {
        if (card.id !== editCard.id) {
          cards.push(card);
        } else {
          cards.push(editCard);
        }
      });
      dispatch({
        type: cardActions.CHANGE_CARDS,
        cards
      });
    };
  },
  deleteCard: deletedCard => {
    return (dispatch, getState) => {
      const oldCards = getState().Cards.cards;
      const cards = [];
      oldCards.forEach(card => {
        if (card.id !== deletedCard.id) {
          cards.push(card);
        }
      });
      dispatch({
        type: cardActions.CHANGE_CARDS,
        cards
      });
    };
  },
  restoreCards: () => {
    return {
      type: cardActions.CHANGE_CARDS,
      cards: fakedata
    };
  }
};
/* harmony default export */ var card_actions = (cardActions);
// CONCATENATED MODULE: ./redux/card/reducer.js
function card_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function card_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { card_reducer_ownKeys(Object(source), true).forEach(function (key) { card_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { card_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function card_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const cards = fakedata;
const card_reducer_initState = {
  cards
};
function cardReducer(state = card_reducer_initState, action) {
  switch (action.type) {
    case card_actions.CHANGE_CARDS:
      return card_reducer_objectSpread(card_reducer_objectSpread({}, state), {}, {
        cards: action.cards
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/chat/actions.js
const actions_actions = {
  CHAT_INIT: 'CHAT_INIT',
  CHAT_INIT_SAGA: 'CHAT_INIT_SAGA',
  CHAT_UPDATE_CHATROOM: 'CHAT_UPDATE_CHATROOM',
  CHAT_TOGGLE_COMPOSE: 'CHAT_TOGGLE_COMPOSE',
  CHAT_SET_TOGGLE_VIEW_PROFILE: 'CHAT_SET_TOGGLE_VIEW_PROFILE',
  CHAT_SET_TOGGLE_COMPOSED_ID: 'CHAT_SET_TOGGLE_COMPOSED_ID',
  CHAT_SEND_MESSAGE: 'CHAT_SEND_MESSAGE',
  CHAT_UPDATE_CHATROOM_SAGA: 'CHAT_UPDATE_CHATROOM_SAGA',
  TOGGLE_MOBILE_LIST: 'TOGGLE_MOBILE_LIST',
  TOGGLE_MOBILE_PROFILE: 'TOGGLE_MOBILE_PROFILE',
  RESTORE_DEMO_DATA: 'RESTORE_DEMO_DATA',
  RESTORE_DEMO_DATA_DONE: 'RESTORE_DEMO_DATA_DONE',
  UPDATE_NEW_USER_PROPS: 'UPDATE_NEW_USER_PROPS',
  ADD_NEW_USER: 'ADD_NEW_USER',
  ADD_NEW_USER_SAGA: 'ADD_NEW_USER_SAGA',
  NEW_MESSAGE_SUCCESFULL: 'NEW_MESSAGE_SUCCESFULL',
  chatInit: userId => ({
    type: actions_actions.CHAT_INIT,
    payload: {
      userId
    }
  }),
  toggleCompose: () => ({
    type: actions_actions.CHAT_TOGGLE_COMPOSE
  }),
  toggleViewProfile: viewProfile => ({
    type: actions_actions.CHAT_SET_TOGGLE_VIEW_PROFILE,
    viewProfile
  }),
  setComposedId: id => ({
    type: actions_actions.CHAT_SET_TOGGLE_COMPOSED_ID,
    id
  }),
  setSelectedChatroom: chatRoom => ({
    type: actions_actions.CHAT_UPDATE_CHATROOM_SAGA,
    payload: {
      chatRoom,
      selected: true
    }
  }),
  sendMessage: message => ({
    type: actions_actions.CHAT_SEND_MESSAGE,
    payload: message
  }),
  toggleMobileList: mobileActiveList => ({
    type: actions_actions.TOGGLE_MOBILE_LIST,
    mobileActiveList
  }),
  toggleMobileProfile: mobileActiveProfile => ({
    type: actions_actions.TOGGLE_MOBILE_PROFILE,
    mobileActiveProfile
  }),
  restoreData: demoData => ({
    type: actions_actions.RESTORE_DEMO_DATA,
    demoData
  }),
  updateNewUsersProp: addNewUsersProp => ({
    type: actions_actions.UPDATE_NEW_USER_PROPS,
    addNewUsersProp
  }),
  addNewUser: (user, addNewUsersProp) => ({
    type: actions_actions.ADD_NEW_USER,
    user,
    addNewUsersProp
  })
};
/* harmony default export */ var chat_actions = (actions_actions);
// CONCATENATED MODULE: ./redux/chat/reducers.js
function reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { reducers_ownKeys(Object(source), true).forEach(function (key) { reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const reducers_initState = {
  users: null,
  chatRooms: [],
  messages: [],
  selectedChatRoom: null,
  openCompose: false,
  viewProfile: false,
  composedId: null,
  loading: true,
  error: false,
  mobileActiveList: true,
  mobileActiveProfile: false,
  restoringData: false,
  addNewUsersProp: {
    modalActive: false
  }
};

const sortTimeStamp = (optionA, optionB) => optionA.messageTime - optionB.messageTime;

const sortChatRooms = (optionA, optionB) => optionB.lastMessageTime - optionA.lastMessageTime;

function reducer(state = reducers_initState, action) {
  switch (action.type) {
    case chat_actions.CHAT_INIT_SAGA:
      {
        return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
          userId: action.userId,
          user: action.user,
          users: action.users,
          chatRooms: action.chatRooms,
          messages: action.messages,
          selectedChatRoom: action.chatRooms[0],
          loading: false
        });
      }

    case chat_actions.CHAT_UPDATE_CHATROOM:
      {
        const {
          chatRoom,
          messages,
          selected
        } = action;
        return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
          chatRooms: state.chatRooms.map(chatroom => chatroom.id === chatRoom.id ? reducers_objectSpread(reducers_objectSpread({}, chatroom), {}, {
            lastMessage: chatRoom.lastMessage,
            lastMessageTime: chatRoom.lastMessageTime
          }) : chatroom).sort(sortChatRooms),
          composedId: null,
          openCompose: false,
          selectedChatRoom: selected ? chatRoom : state.selectedChatRoom,
          viewProfile: selected ? false : state.viewProfile,
          messages: messages ? messages.sort(sortTimeStamp) : state.messages
        });
      }

    case chat_actions.CHAT_TOGGLE_COMPOSE:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        openCompose: !state.openCompose,
        viewProfile: false
      });

    case chat_actions.CHAT_SET_TOGGLE_COMPOSED_ID:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        composedId: action.id
      });

    case chat_actions.CHAT_SET_TOGGLE_VIEW_PROFILE:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        viewProfile: action.viewProfile
      });

    case chat_actions.TOGGLE_MOBILE_LIST:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        mobileActiveList: action.mobileActiveList
      });

    case chat_actions.TOGGLE_MOBILE_PROFILE:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        mobileActiveProfile: action.mobileActiveProfile
      });

    case chat_actions.RESTORE_DEMO_DATA:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        restoringData: true
      });

    case chat_actions.RESTORE_DEMO_DATA_DONE:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        restoringData: false
      });

    case chat_actions.UPDATE_NEW_USER_PROPS:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        addNewUsersProp: action.addNewUsersProp
      });

    case chat_actions.NEW_MESSAGE_SUCCESFULL:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        openCompose: false,
        composedId: null
      });

    case chat_actions.ADD_NEW_USER_SAGA:
      return reducers_objectSpread(reducers_objectSpread({}, state), {}, {
        addNewUsersProp: {
          modalActive: false
        },
        users: [action.user, ...state.users],
        chatRooms: [action.chatRoom, ...state.chatRooms]
      });

    default:
      return state;
  }
}
// EXTERNAL MODULE: external "clone"
var external_clone_ = __webpack_require__("sAR6");
var external_clone_default = /*#__PURE__*/__webpack_require__.n(external_clone_);

// CONCATENATED MODULE: ./redux/dynamicEchart/reducer.js
function dynamicEchart_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function dynamicEchart_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dynamicEchart_reducer_ownKeys(Object(source), true).forEach(function (key) { dynamicEchart_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dynamicEchart_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dynamicEchart_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


let count = 0;

function getOption() {
  const option = {
    title: {},
    tooltip: {
      trigger: 'axis'
    },
    Legend: {
      data: ['latest transaction price', 'pre - order queue']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          readOnly: false,
          title: 'View',
          lang: ['data view', 'turn off', 'refresh']
        },
        restore: {
          title: 'Reset'
        },
        saveAsImage: {
          title: 'Download'
        }
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom: 30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1000,
      color: ['#554faf', '#f4f5f6', '#3f2159', '#9d54ad', '#968acf', '#6f68cb', '#d2d1d6', '#d78da8', '#f6fbfd', '#584ba1', '#d7edf8', '#914692', '#c64187', '#98b0c8', '#a3d1e6', '#cad8e3', '#795cae', '#de8e90', '#f09875', '#e0a695', '#e86e7a']
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      data: (() => {
        let now = new Date();
        let res = [];
        let len = 20;

        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }

        return res;
      })()
    }, {
      type: 'category',
      boundaryGap: true,
      data: (() => {
        let res = [];
        let len = 20;

        while (len--) {
          res.push(20 - len + 1);
        }

        return res;
      })()
    }],
    yAxis: [{
      type: 'value',
      scale: true,
      name: 'Value Y',
      max: 20,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }, {
      type: 'value',
      scale: true,
      name: 'Value X',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }],
    series: [{
      name: 'Pre - order queue',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 4
        }
      },
      animationEasing: 'elasticOut',
      animationDelay: idx => {
        return idx * 10;
      },
      animationDelayUpdate: idx => {
        return idx * 10;
      },
      data: (() => {
        let res = [];
        let len = 20;

        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }

        return res;
      })()
    }, {
      name: 'Latest transaction price',
      type: 'line',
      data: (() => {
        let res = [];
        let len = 0;

        while (len < 20) {
          res.push((Math.random() * 10 + 5).toFixed(1) - 0);
          len++;
        }

        return res;
      })()
    }]
  };
  return option;
}

function fetchNewDate(option) {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
  let data0 = option.series[0].data;
  let data1 = option.series[1].data;
  data0.shift();
  data0.push(Math.round(Math.random() * 1000));
  data1.shift();
  data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
  option.xAxis[0].data.shift();
  option.xAxis[0].data.push(axisData);
  option.xAxis[1].data.shift();
  option.xAxis[1].data.push(count++);
  return option;
}

const dynamicEchart_reducer_initState = {
  option: getOption()
};
function calendsrReducer(state = dynamicEchart_reducer_initState, action) {
  switch (action.type) {
    case 'UPDATE_OPTION':
      return dynamicEchart_reducer_objectSpread(dynamicEchart_reducer_objectSpread({}, state), {}, {
        option: external_clone_default()(fetchNewDate(state.get('option')))
      });

    default:
      return state;
  }
}
function updateOption() {
  return {
    type: 'UPDATE_OPTION'
  };
}
// EXTERNAL MODULE: ./redux/ecommerce/actions.js
var ecommerce_actions = __webpack_require__("5ZGk");

// CONCATENATED MODULE: ./redux/ecommerce/reducer.js
function ecommerce_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ecommerce_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ecommerce_reducer_ownKeys(Object(source), true).forEach(function (key) { ecommerce_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ecommerce_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ecommerce_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const ecommerce_reducer_initState = {
  loadingInitData: false,
  view: 'gridView',
  viewTopbarCart: false,
  productQuantity: [],
  products: {}
};
/* harmony default export */ var ecommerce_reducer = ((state = ecommerce_reducer_initState, action) => {
  switch (action.type) {
    case ecommerce_actions["a" /* default */].INIT_DATA:
      return ecommerce_reducer_objectSpread(ecommerce_reducer_objectSpread({}, state), {}, {
        loadingInitData: true,
        productQuantity: action.payload.productQuantity,
        products: action.payload.products
      });

    case ecommerce_actions["a" /* default */].CHANGE_VIEW:
      return ecommerce_reducer_objectSpread(ecommerce_reducer_objectSpread({}, state), {}, {
        view: action.view
      });

    case ecommerce_actions["a" /* default */].VIEW_TOPBAR_CART:
      return ecommerce_reducer_objectSpread(ecommerce_reducer_objectSpread({}, state), {}, {
        viewTopbarCart: action.viewTopbarCart
      });

    case ecommerce_actions["a" /* default */].UPDATE_DATA:
      return ecommerce_reducer_objectSpread(ecommerce_reducer_objectSpread({}, state), {}, {
        products: external_clone_default()(action.products),
        productQuantity: external_clone_default()(action.productQuantity)
      });

    default:
      return state;
  }
});
// EXTERNAL MODULE: ./redux/themeSwitcher/config.js
var config = __webpack_require__("x441");

// EXTERNAL MODULE: ./redux/themeSwitcher/actions.js
var themeSwitcher_actions = __webpack_require__("n+6I");

// CONCATENATED MODULE: ./redux/themeSwitcher/reducer.js
function themeSwitcher_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function themeSwitcher_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { themeSwitcher_reducer_ownKeys(Object(source), true).forEach(function (key) { themeSwitcher_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { themeSwitcher_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function themeSwitcher_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const themeSwitcher_reducer_initState = {
  isActivated: false,
  changeThemes: Object(config["b" /* getCurrentTheme */])('changeThemes', config["a" /* default */].changeThemes.defaultTheme || 'themedefault'),
  topbarTheme: Object(config["b" /* getCurrentTheme */])('topbarTheme', config["a" /* default */].topbarTheme.defaultTheme || 'themedefault'),
  sidebarTheme: Object(config["b" /* getCurrentTheme */])('sidebarTheme', config["a" /* default */].sidebarTheme.defaultTheme || 'themedefault'),
  layoutTheme: Object(config["b" /* getCurrentTheme */])('layoutTheme', config["a" /* default */].layoutTheme.defaultTheme || 'themedefault')
};
function reducer_Reducer(state = themeSwitcher_reducer_initState, action) {
  switch (action.type) {
    case themeSwitcher_actions["a" /* default */].SWITCH_ACTIVATION:
      return themeSwitcher_reducer_objectSpread(themeSwitcher_reducer_objectSpread({}, state), {}, {
        isActivated: !state.isActivated
      });

    case themeSwitcher_actions["a" /* default */].CHANGE_THEME:
      return themeSwitcher_reducer_objectSpread(themeSwitcher_reducer_objectSpread({}, state), {}, {
        [action.attribute]: action.theme
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/invoice/config.js
const localDataName = 'mateInvoice';
const orderStatusOptions = ['Pending', 'Shipped', 'Delivered'];
const config_fakedata = [{
  key: 1,
  id: '1518713981654',
  number: '#1231',
  orderStatus: 'Shipped',
  orderDate: 1518849188360,
  currency: '$',
  billTo: 'REDQ Inc.',
  billToAddress: 'redq@company.com\n\n405 Mulberry Rd, Mc Grady, \nNC, 28649 \n\nFax: +0(863) 228-7064 \nPhone: +(740) 927-9284',
  billFrom: 'Pineapple Inc.',
  billFromAddress: 'pineapple@company.com\n\n86781 547th Ave, Osmond, \nNE, 68765 \n\nPhone: +(402) 748-3970',
  invoiceList: [{
    key: 1,
    itemName: 'A box of happiness',
    costs: 200,
    qty: 14,
    price: 2800
  }, {
    key: 2,
    itemName: 'Unicorn Tears',
    costs: 500,
    qty: 14,
    price: 7000
  }, {
    key: 3,
    itemName: 'Rainbow Machine',
    costs: 700,
    qty: 5,
    price: 3500
  }],
  subTotal: 13300,
  vatRate: 10,
  vatPrice: 1330,
  totalCost: 14630
}, {
  key: 2,
  id: '1518713981655',
  number: '#1232',
  orderStatus: 'Pending',
  orderDate: 1518849188360,
  currency: '$',
  billTo: 'REDQ Inc.',
  billToAddress: 'redq@company.com\n\n405 Mulberry Rd, Mc Grady, \nNC, 28649 \n\nFax: +0(863) 228-7064 \nPhone: +(740) 927-9284',
  billFrom: 'Pineapple Inc.',
  billFromAddress: 'pineapple@company.com\n\n86781 547th Ave, Osmond, \nNE, 68765 \n\nPhone: +(402) 748-3970',
  invoiceList: [{
    key: 1,
    itemName: 'A box of happiness',
    costs: 200,
    qty: 14,
    price: 2800
  }, {
    key: 2,
    itemName: 'Unicorn Tears',
    costs: 500,
    qty: 14,
    price: 7000
  }, {
    key: 3,
    itemName: 'Rainbow Machine',
    costs: 700,
    qty: 5,
    price: 3500
  }],
  subTotal: 13300,
  vatRate: 10,
  vatPrice: 1330,
  totalCost: 14630
}, {
  key: 3,
  id: '1518713981656',
  number: '#1233',
  orderStatus: 'Delivered',
  orderDate: 1518849188360,
  currency: '$',
  billTo: 'REDQ Inc.',
  billToAddress: 'redq@company.com\n\n405 Mulberry Rd, Mc Grady, \nNC, 28649 \n\nFax: +0(863) 228-7064 \nPhone: +(740) 927-9284',
  billFrom: 'Pineapple Inc.',
  billFromAddress: 'pineapple@company.com\n\n86781 547th Ave, Osmond, \nNE, 68765 \n\nPhone: +(402) 748-3970',
  invoiceList: [{
    key: 1,
    itemName: 'A box of happiness',
    costs: 200,
    qty: 14,
    price: 2800
  }, {
    key: 2,
    itemName: 'Unicorn Tears',
    costs: 500,
    qty: 14,
    price: 7000
  }, {
    key: 3,
    itemName: 'Rainbow Machine',
    costs: 700,
    qty: 5,
    price: 3500
  }],
  subTotal: 13300,
  vatRate: 10,
  vatPrice: 1330,
  totalCost: 14630
}];
const newInvoice = {
  orderStatus: 'Pending',
  orderDate: new Date().getTime(),
  currency: '$',
  billTo: '',
  billToAddress: '',
  billFrom: '',
  billFromAddress: '',
  invoiceList: [{
    key: 1,
    itemName: '',
    costs: 0,
    qty: 0,
    price: 0
  }],
  subTotal: 0,
  vatRate: 10,
  vatPrice: 0,
  totalCost: 0
};

const createDemoData = () => {
  const localData = localStorage.getItem(localDataName);

  if (localData) {
    try {
      const invoices = JSON.parse(localData);

      if (invoices && invoices.length > 0) {
        return invoices;
      }
    } catch (e) {}
  }

  return config_fakedata;
};


// CONCATENATED MODULE: ./redux/invoice/actions.js
const invoice_actions_actions = {
  GET_INVOICE: 'GET_INVOICE',
  UPDATE_INVOICE: 'UPDATE_INVOICE',
  UPDATE_INVOICE_SAGA: 'UPDATE_INVOICE_SAGA',
  SELECT_CURRENT_INVOICE: 'SELECT_CURRENT_INVOICE',
  TOGGLE_VIEW: 'INVOICE_TOGGLE_VIEW',
  UPDATE_EDIT_INVOICE: 'INVOICE_UPDATE_EDIT_INVOICE',
  initData: () => ({
    type: invoice_actions_actions.GET_INVOICE
  }),
  deleteInvoice: selected => {
    return (dispatch, getState) => {
      const invoices = getState().Invoices.invoices;
      const newInvoices = [];
      invoices.forEach(invoice => {
        const selectedIndex = selected.indexOf(invoice.key);

        if (selectedIndex === -1) {
          newInvoices.push(invoice);
        }
      });
      dispatch({
        type: invoice_actions_actions.UPDATE_INVOICE_SAGA,
        invoices: newInvoices
      });
    };
  },
  updateInvoice: invoice => {
    return (dispatch, getState) => {
      const invoices = getState().Invoices.invoices;
      const index = invoices.map(inv => inv.id).indexOf(invoice.id);

      if (index === -1) {
        invoices.push(invoice);
      } else {
        invoices[index] = invoice;
      }

      dispatch({
        type: invoice_actions_actions.UPDATE_INVOICE_SAGA,
        invoices,
        invoice
      });
    };
  },
  selectCurrentInvoice: id => ({
    type: invoice_actions_actions.SELECT_CURRENT_INVOICE,
    id
  }),
  toggleView: view => ({
    type: invoice_actions_actions.TOGGLE_VIEW,
    view
  }),
  editInvoice: invoice => ({
    type: invoice_actions_actions.UPDATE_EDIT_INVOICE,
    invoice
  })
};
/* harmony default export */ var invoice_actions = (invoice_actions_actions);
// CONCATENATED MODULE: ./redux/invoice/reducer.js
const _excluded = ["type"];

function invoice_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function invoice_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { invoice_reducer_ownKeys(Object(source), true).forEach(function (key) { invoice_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { invoice_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function invoice_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const invoice_reducer_initState = {
  invoices: [],
  initialInvoices: false,
  currentInvoice: {},
  editableInvoice: {},
  isNewInvoice: false,
  enableEditView: false
};
function reducer_cardReducer(state = invoice_reducer_initState, _ref) {
  let {
    type
  } = _ref,
      action = _objectWithoutProperties(_ref, _excluded);

  switch (type) {
    case invoice_actions.UPDATE_INVOICE:
      {
        const currentInvoice = action.invoice ? action.invoice : state.currentInvoice;
        return invoice_reducer_objectSpread(invoice_reducer_objectSpread({}, state), {}, {
          invoices: action.invoices,
          currentInvoice: external_clone_default()(currentInvoice),
          initialInvoices: true,
          isNewInvoice: false,
          enableEditView: false
        });
      }

    case invoice_actions.SELECT_CURRENT_INVOICE:
      {
        const invoices = state.invoices;
        const index = invoices.map(invoice => invoice.id).indexOf(action.id);
        const isNewInvoice = index === -1;
        const currentInvoice = isNewInvoice ? invoice_reducer_objectSpread({
          id: action.id,
          number: `#${action.id}`,
          key: action.id
        }, newInvoice) : invoices[index];
        const enableEditView = isNewInvoice;
        return invoice_reducer_objectSpread(invoice_reducer_objectSpread({}, state), {}, {
          currentInvoice,
          isNewInvoice,
          enableEditView,
          editableInvoice: external_clone_default()(currentInvoice)
        });
      }

    case invoice_actions.TOGGLE_VIEW:
      return invoice_reducer_objectSpread(invoice_reducer_objectSpread({}, state), {}, {
        enableEditView: action.view,
        editableInvoice: external_clone_default()(state.currentInvoice)
      });

    case invoice_actions.UPDATE_EDIT_INVOICE:
      return invoice_reducer_objectSpread(invoice_reducer_objectSpread({}, state), {}, {
        editableInvoice: external_clone_default()(action.invoice)
      });

    default:
      return state;
  }
}
// EXTERNAL MODULE: ./redux/languageSwitcher/config.js
var languageSwitcher_config = __webpack_require__("5SYD");

// EXTERNAL MODULE: ./redux/languageSwitcher/actions.js
var languageSwitcher_actions = __webpack_require__("V2m7");

// CONCATENATED MODULE: ./redux/languageSwitcher/reducer.js
function languageSwitcher_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function languageSwitcher_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { languageSwitcher_reducer_ownKeys(Object(source), true).forEach(function (key) { languageSwitcher_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { languageSwitcher_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function languageSwitcher_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const languageSwitcher_reducer_initState = {
  isActivated: false,
  language: Object(languageSwitcher_config["b" /* getCurrentLanguage */])(languageSwitcher_config["a" /* default */].defaultLanguage || 'english')
};
function languageSwitcher_reducer_Reducer(state = languageSwitcher_reducer_initState, action) {
  switch (action.type) {
    case languageSwitcher_actions["a" /* default */].ACTIVATE_LANG_MODAL:
      return languageSwitcher_reducer_objectSpread(languageSwitcher_reducer_objectSpread({}, state), {}, {
        isActivated: !state.isActivated
      });

    case languageSwitcher_actions["a" /* default */].CHANGE_LANGUAGE:
      return languageSwitcher_reducer_objectSpread(languageSwitcher_reducer_objectSpread({}, state), {}, {
        language: action.language
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/youtubeSearch/actions.js
const youtubeSearch_actions_actions = {
  YOUTUBE_SEARCH: 'YOUTUBE_SEARCH',
  YOUTUBE_SUCCESS_RESULT: 'YOUTUBE_SUCCESS_RESULT',
  YOUTUBE_ERROR_RESULT: 'YOUTUBE_ERROR_RESULT',
  youtubeSearch: searcText => ({
    type: youtubeSearch_actions_actions.YOUTUBE_SEARCH,
    payload: {
      searcText
    }
  }),
  onPageChange: (searcText, pageToken) => ({
    type: youtubeSearch_actions_actions.YOUTUBE_SEARCH,
    payload: {
      searcText,
      pageToken
    }
  }),
  youtubeSearchSuccess: (result, total_count, nextPageToken, prevPageToken) => ({
    type: youtubeSearch_actions_actions.YOUTUBE_SUCCESS_RESULT,
    result,
    total_count,
    nextPageToken,
    prevPageToken
  }),
  youtubeSearchError: () => ({
    type: youtubeSearch_actions_actions.YOUTUBE_ERROR_RESULT
  })
};
/* harmony default export */ var youtubeSearch_actions = (youtubeSearch_actions_actions);
// CONCATENATED MODULE: ./redux/youtubeSearch/reducers.js
function youtubeSearch_reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function youtubeSearch_reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { youtubeSearch_reducers_ownKeys(Object(source), true).forEach(function (key) { youtubeSearch_reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { youtubeSearch_reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function youtubeSearch_reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const youtubeSearch_reducers_initState = {
  searcText: 'React JS Conf',
  total_count: 0,
  result: [],
  loading: false,
  error: false
};
function reducers_reducer(state = youtubeSearch_reducers_initState, action) {
  switch (action.type) {
    case youtubeSearch_actions.YOUTUBE_SEARCH:
      return youtubeSearch_reducers_objectSpread(youtubeSearch_reducers_objectSpread({}, state), {}, {
        loading: true,
        searcText: action.payload.searcText
      });

    case youtubeSearch_actions.YOUTUBE_SUCCESS_RESULT:
      return youtubeSearch_reducers_objectSpread(youtubeSearch_reducers_objectSpread({}, state), {}, {
        loading: false,
        error: false,
        result: action.result,
        total_count: action.total_count,
        prevPageToken: action.prevPageToken,
        nextPageToken: action.nextPageToken
      });

    case youtubeSearch_actions.YOUTUBE_ERROR_RESULT:
      return youtubeSearch_reducers_objectSpread(youtubeSearch_reducers_objectSpread({}, state), {}, {
        loading: false,
        error: false,
        result: []
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/articles/actions.js
const DOCUMENT = 'ARTICLE_';
const articles_actions_actions = {
  LOAD_FROM_FIRESTORE: DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',
  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',
  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',
  loadFromFireStore: () => {
    return {
      type: articles_actions_actions.LOAD_FROM_FIRESTORE
    };
  },
  loadFromFireStoreSuccess: data => ({
    type: articles_actions_actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: {
      data
    }
  }),
  loadFromFireStoreError: error => ({
    type: articles_actions_actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: {
      error
    }
  }),
  saveIntoFireStore: (data, actionName = 'insert') => ({
    type: articles_actions_actions.SAVE_INTO_FIRESTORE,
    payload: {
      data,
      actionName
    }
  }),
  toggleModal: (data = null) => ({
    type: articles_actions_actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: {
      data
    }
  }),
  update: data => ({
    type: articles_actions_actions.FIRESTORE_UPDATE,
    payload: {
      data
    }
  }),
  saveIntoFireStoreError: error => ({
    type: articles_actions_actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: {
      error
    }
  }),
  resetFireStoreDocuments: () => ({
    type: articles_actions_actions.RESET_FIRESTORE_DOCUMENTS
  }),
  resetFireStoreDocumentsError: error => ({
    type: articles_actions_actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: {
      error
    }
  })
};
/* harmony default export */ var articles_actions = (articles_actions_actions);
// CONCATENATED MODULE: ./redux/articles/reducers.js
function articles_reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function articles_reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { articles_reducers_ownKeys(Object(source), true).forEach(function (key) { articles_reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { articles_reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function articles_reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const articles_reducers_initState = {
  isLoading: false,
  errorMessage: false,
  articles: {},
  modalActive: false,
  article: {
    key: null,
    id: new Date().getTime(),
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft',
    // publish
    description: '',
    created_at: new Date().getTime(),
    deleted_at: null // soft delete

  }
};
function articles_reducers_reducer(state = articles_reducers_initState, {
  type,
  payload,
  newRecord
}) {
  switch (type) {
    case articles_actions.LOAD_FROM_FIRESTORE:
      return articles_reducers_objectSpread(articles_reducers_objectSpread({}, state), {}, {
        isLoading: true,
        errorMessage: false,
        modalActive: false
      });

    case articles_actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return articles_reducers_objectSpread(articles_reducers_objectSpread({}, state), {}, {
        isLoading: false,
        articles: payload.data,
        errorMessage: false
      });

    case articles_actions.LOAD_FROM_FIRESTORE_ERROR:
      return articles_reducers_objectSpread(articles_reducers_objectSpread({}, state), {}, {
        isLoading: false,
        errorMessage: 'There is a loading problem'
      });

    case articles_actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return articles_reducers_objectSpread(articles_reducers_objectSpread({}, state), {}, {
        modalActive: !state.modalActive,
        article: payload.data == null ? articles_reducers_initState.article : payload.data
      });

    case articles_actions.FIRESTORE_UPDATE:
      return articles_reducers_objectSpread(articles_reducers_objectSpread({}, state), {}, {
        article: payload.data
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/investors/actions.js
const actions_DOCUMENT = 'INVESTOR_';
const investors_actions_actions = {
  LOAD_FROM_FIRESTORE: actions_DOCUMENT + 'LOAD_FROM_FIRESTORE',
  LOAD_FROM_FIRESTORE_SUCCESS: actions_DOCUMENT + 'LOAD_FROM_FIRESTORE_SUCCESS',
  LOAD_FROM_FIRESTORE_ERROR: actions_DOCUMENT + 'LOAD_FROM_FIRESTORE_ERROR',
  SAVE_INTO_FIRESTORE: actions_DOCUMENT + 'SAVE_INTO_FIRESTORE',
  SAVE_INTO_FIRESTORE_ERROR: actions_DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',
  RESET_FIRESTORE_DOCUMENTS: actions_DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: actions_DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',
  TOGGLE_FIRESTORE_HANDLE_MODAL: actions_DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: actions_DOCUMENT + 'FIRESTORE_UPDATE',
  loadFromFireStore: () => {
    return {
      type: investors_actions_actions.LOAD_FROM_FIRESTORE
    };
  },
  loadFromFireStoreSuccess: data => ({
    type: investors_actions_actions.LOAD_FROM_FIRESTORE_SUCCESS,
    payload: {
      data
    }
  }),
  loadFromFireStoreError: error => ({
    type: investors_actions_actions.LOAD_FROM_FIRESTORE_ERROR,
    payload: {
      error
    }
  }),
  saveIntoFireStore: (data, actionName = 'insert') => ({
    type: investors_actions_actions.SAVE_INTO_FIRESTORE,
    payload: {
      data,
      actionName
    }
  }),
  toggleModal: (data = null) => ({
    type: investors_actions_actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: {
      data
    }
  }),
  update: data => ({
    type: investors_actions_actions.FIRESTORE_UPDATE,
    payload: {
      data
    }
  }),
  saveIntoFireStoreError: error => ({
    type: investors_actions_actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: {
      error
    }
  }),
  resetFireStoreDocuments: () => ({
    type: investors_actions_actions.RESET_FIRESTORE_DOCUMENTS
  }),
  resetFireStoreDocumentsError: error => ({
    type: investors_actions_actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: {
      error
    }
  })
};
/* harmony default export */ var investors_actions = (investors_actions_actions);
// CONCATENATED MODULE: ./redux/investors/reducers.js
function investors_reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function investors_reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { investors_reducers_ownKeys(Object(source), true).forEach(function (key) { investors_reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { investors_reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function investors_reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const investors_reducers_initState = {
  isLoading: false,
  errorMessage: false,
  investors: {},
  modalActive: false,
  investor: {
    key: null,
    id: new Date().getTime(),
    name: '',
    company_name: '',
    job_title: '',
    investment_count: null,
    exists_count: null,
    location: '',
    deleted_at: null // soft delete

  }
};
function investors_reducers_reducer(state = investors_reducers_initState, {
  type,
  payload
}) {
  switch (type) {
    case investors_actions.LOAD_FROM_FIRESTORE:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        isLoading: true,
        errorMessage: false,
        modalActive: false
      });

    case investors_actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        isLoading: false,
        investors: payload.data,
        errorMessage: false
      });

    case investors_actions.LOAD_FROM_FIRESTORE_ERROR:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        isLoading: false,
        errorMessage: 'There is a loading problem'
      });

    case investors_actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        modalActive: !state.modalActive,
        investor: payload.data == null ? investors_reducers_initState.investor : payload.data
      });

    case investors_actions.FIRESTORE_UPDATE:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        investor: payload.data
      });

    case investors_actions.RESET_FIRESTORE_DOCUMENTS_ERROR:
      return investors_reducers_objectSpread(investors_reducers_objectSpread({}, state), {}, {
        isLoading: false,
        errorMessage: 'There is a loading problem'
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/scrumBoard/actions.js
const scrumBoardActions = {
  //BOARD
  CREATE_OR_UPDATE_BOARD_WATCHER: 'CREATE_OR_UPDATE_BOARD_WATCHER',
  CREATE_OR_UPDATE_BOARD: 'CREATE_OR_UPDATE_BOARD',
  EDIT_BOARD: 'EDIT_BOARD',
  DELETE_BOARD_WATCHER: 'DELETE_BOARD_WATCHER',
  DELETE_BOARD: 'DELETE_BOARD',
  SELECT_BOARD: 'SELECT_BOARD',
  //COLUMN
  CREATE_OR_UPDATE_COLUMN_WATCHER: 'CREATE_OR_UPDATE_COLUMN_WATCHER',
  CREATE_OR_UPDATE_COLUMN: 'CREATE_OR_UPDATE_COLUMN',
  EDIT_COLUMN: 'EDIT_COLUMN',
  CANCEL_EDIT_COLUMN: 'CANCEL_EDIT_COLUMN',
  DELETE_COLUMN_WATCHER: 'DELETE_COLUMN_WATCHER',
  DELETE_COLUMN: 'DELETE_COLUMN',
  RESET_COLUMN: 'RESET_COLUMN',
  MOVE_COLUMN_WATCHER: 'MOVE_COLUMN_WATCHER',
  SET_MOVED_COLUMN: 'SET_MOVED_COLUMN',
  DUBLICATE_COLUMN: 'DUBLICATE_COLUMN',
  //TASK
  CREATE_OR_UPDATE_TASK_WATCHER: 'CREATE_OR_UPDATE_TASK_WATCHER',
  CREATE_OR_UPDATE_TASK: 'CREATE_OR_UPDATE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  CANCEL_EDIT_TASK: 'CANCEL_EDIT_TASK',
  DELETE_TASK_WATCHER: 'DELETE_TASK_WATCHER',
  DELETE_TASK: 'DELETE_TASK',
  RESET_TASK: 'RESET_TASK',
  MOVE_TASK_WATCHER: 'MOVE_TASK_WATCHER',
  SET_MOVED_TASK: 'SET_MOVED_TASK',
  DUBLICATE_TASK: 'DUBLICATE_TASK',
  // SEARCH
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  // LOAD DATA
  LOAD_BOARDS_DATA_SAGA: 'LOAD_BOARDS_DATA_SAGA',
  LOAD_CURRENT_BOARD_DATA_SAGA: 'LOAD_CURRENT_BOARD_DATA_SAGA',
  SET_BOARDS_DATA: 'SET_BOARDS_DATA',
  SET_CURRENT_BOARD_DATA: 'SET_CURRENT_BOARD_DATA',
  // LABELS
  CREATE_OR_UPDATE_LABEL: 'CREATE_OR_UPDATE_LABEL',
  EDIT_LABEL: 'EDIT_LABEL',
  DELETE_LABEL: 'DELETE_LABEL',
  // Load Data Actions
  boardsRenderWatcher: () => ({
    type: scrumBoardActions.LOAD_BOARDS_DATA_SAGA
  }),
  setBoardsData: boards => ({
    type: scrumBoardActions.SET_BOARDS_DATA,
    payload: boards
  }),
  boardRenderWatcher: boardId => ({
    type: scrumBoardActions.LOAD_CURRENT_BOARD_DATA_SAGA,
    payload: boardId
  }),
  setBoardData: boardData => ({
    type: scrumBoardActions.SET_CURRENT_BOARD_DATA,
    payload: boardData
  }),
  // Task Actions
  createOrUpdateTaskWatcher: payload => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_TASK_WATCHER,
      payload
    };
  },
  createOrUpdateTask: payload => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_TASK,
      payload
    };
  },
  editTask: payload => {
    return {
      type: scrumBoardActions.EDIT_TASK,
      payload
    };
  },
  cancelEditTask: payload => {
    return {
      type: scrumBoardActions.CANCEL_EDIT_TASK,
      payload
    };
  },
  deleteTaskWatcher: payload => {
    return {
      type: scrumBoardActions.DELETE_TASK_WATCHER,
      payload
    };
  },
  deleteTask: payload => {
    return {
      type: scrumBoardActions.DELETE_TASK,
      payload
    };
  },
  resetTask: payload => {
    return {
      type: scrumBoardActions.RESET_TASK,
      payload
    };
  },
  setSearchText: payload => {
    return {
      type: scrumBoardActions.SET_SEARCH_TEXT,
      payload
    };
  },
  moveTaskWatcher: payload => {
    return {
      type: scrumBoardActions.MOVE_TASK_WATCHER,
      payload
    };
  },
  setMovedTask: payload => {
    return {
      type: scrumBoardActions.SET_MOVED_TASK,
      payload
    };
  },
  // Column Actions
  createOrUpdateColumnWatcher: payload => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_COLUMN_WATCHER,
      payload
    };
  },
  createOrUpdateColumn: payload => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_COLUMN,
      payload
    };
  },
  editColumn: payload => {
    return {
      type: scrumBoardActions.EDIT_COLUMN,
      payload
    };
  },
  cancelEditColumn: payload => {
    return {
      type: scrumBoardActions.CANCEL_EDIT_COLUMN,
      payload
    };
  },
  deleteColumnWatcher: payload => {
    return {
      type: scrumBoardActions.DELETE_COLUMN_WATCHER,
      payload
    };
  },
  deleteColumn: payload => {
    return {
      type: scrumBoardActions.DELETE_COLUMN,
      payload
    };
  },
  resetColumn: payload => {
    return {
      type: scrumBoardActions.RESET_COLUMN,
      payload
    };
  },
  moveColumnWatcher: payload => {
    return {
      type: scrumBoardActions.MOVE_COLUMN_WATCHER,
      payload
    };
  },
  setMovedColumn: payload => {
    return {
      type: scrumBoardActions.SET_MOVED_COLUMN,
      payload
    };
  },
  // Board Actions
  createOrUpdateBoardWatcher: board => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_BOARD_WATCHER,
      payload: board
    };
  },
  createOrUpdateBoard: board => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_BOARD,
      payload: board
    };
  },
  editBoard: board => {
    return {
      type: scrumBoardActions.EDIT_BOARD,
      payload: board
    };
  },
  deleteBoardWatcher: boardID => {
    return {
      type: scrumBoardActions.DELETE_BOARD_WATCHER,
      payload: boardID
    };
  },
  deleteBoard: boardID => {
    return {
      type: scrumBoardActions.DELETE_BOARD,
      payload: boardID
    };
  },
  // Label Actions
  createOrUpdateLabel: label => {
    return {
      type: scrumBoardActions.CREATE_OR_UPDATE_LABEL,
      payload: label
    };
  },
  editLabel: label => {
    return {
      type: scrumBoardActions.EDIT_LABEL,
      payload: label
    };
  },
  deleteLabel: labelID => {
    return {
      type: scrumBoardActions.DELETE_LABEL,
      payload: labelID
    };
  }
};
/* harmony default export */ var scrumBoard_actions = (scrumBoardActions);
// CONCATENATED MODULE: ./redux/scrumBoard/reducer.js
function scrumBoard_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function scrumBoard_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { scrumBoard_reducer_ownKeys(Object(source), true).forEach(function (key) { scrumBoard_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { scrumBoard_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function scrumBoard_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const reducer_initialState = {
  boards: {},
  columns: {},
  tasks: {},
  searchText: '',
  labels: {}
};
function scrumBoardReducer(state = reducer_initialState, action) {
  switch (action.type) {
    case scrumBoard_actions.SET_BOARDS_DATA:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), action.payload);

    case scrumBoard_actions.SET_CURRENT_BOARD_DATA:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), action.payload);

    case scrumBoard_actions.CREATE_OR_UPDATE_TASK:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        tasks: action.payload.tasks,
        columns: action.payload.columns
      });

    case scrumBoard_actions.EDIT_TASK:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        tasks: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.tasks), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: true
          })
        })
      });

    case scrumBoard_actions.CANCEL_EDIT_TASK:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        tasks: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.tasks), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: false
          })
        })
      });

    case scrumBoard_actions.DELETE_TASK:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        tasks: action.payload.tasks,
        columns: action.payload.columns
      });

    case scrumBoard_actions.SET_SEARCH_TEXT:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        searchText: action.payload
      });

    case scrumBoard_actions.SET_MOVED_TASK:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        columns: action.payload.columns,
        tasks: action.payload.tasks
      });

    case scrumBoard_actions.RESET_TASK:
      {
        return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
          task: reducer_initialState.task
        });
      }
    /// COLUMNS

    case scrumBoard_actions.CREATE_OR_UPDATE_COLUMN:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        columns: action.payload.columns,
        boards: action.payload.boards
      });

    case scrumBoard_actions.EDIT_COLUMN:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        columns: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.columns), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: true
          })
        })
      });

    case scrumBoard_actions.CANCEL_EDIT_COLUMN:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        columns: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.columns), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: false
          })
        })
      });

    case scrumBoard_actions.DELETE_COLUMN:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        columns: action.payload.columns,
        boards: action.payload.boards
      });

    case scrumBoard_actions.SET_MOVED_COLUMN:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        boards: action.payload
      });

    case scrumBoard_actions.CREATE_OR_UPDATE_BOARD:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        boards: action.payload
      });

    case scrumBoard_actions.EDIT_BOARD:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        boards: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.boards), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: true
          })
        })
      });

    case scrumBoard_actions.DELETE_BOARD:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        boards: action.payload
      });

    case scrumBoard_actions.CREATE_OR_UPDATE_LABEL:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        labels: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.labels), {}, {
          [action.payload.id]: action.payload
        })
      });

    case scrumBoard_actions.EDIT_LABEL:
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        labels: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state.labels), {}, {
          [action.payload.id]: scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, action.payload), {}, {
            editing: true
          })
        })
      });

    case scrumBoard_actions.DELETE_LABEL:
      const LABELS = scrumBoard_reducer_objectSpread({}, state.labels);

      delete LABELS[action.payload];
      return scrumBoard_reducer_objectSpread(scrumBoard_reducer_objectSpread({}, state), {}, {
        labels: LABELS
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/drawer/actions.js
const drawerActions = {
  SHOW_DRAWER: 'SHOW_DRAWER',
  HIDE_DRAWER: 'HIDE_DRAWER',
  openDrawer: payload => ({
    type: drawerActions.SHOW_DRAWER,
    payload
  }),
  closeDrawer: () => ({
    type: drawerActions.HIDE_DRAWER
  })
};
/* harmony default export */ var drawer_actions = (drawerActions);
// CONCATENATED MODULE: ./redux/drawer/reducer.js
function drawer_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function drawer_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { drawer_reducer_ownKeys(Object(source), true).forEach(function (key) { drawer_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { drawer_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function drawer_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const drawer_reducer_initialState = {
  drawerVisibility: false,
  drawerType: '',
  drawerProps: {}
};
function drawerReducer(state = drawer_reducer_initialState, action) {
  switch (action.type) {
    case drawer_actions.SHOW_DRAWER:
      return {
        drawerVisibility: true,
        drawerType: action.payload.drawerType,
        drawerProps: action.payload.drawerProps
      };

    case drawer_actions.HIDE_DRAWER:
      return drawer_reducer_objectSpread(drawer_reducer_objectSpread({}, state), {}, {
        drawerVisibility: false
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/modal/actions.js
const modalActions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  openModal: payload => ({
    type: modalActions.SHOW_MODAL,
    payload
  }),
  closeModal: () => ({
    type: modalActions.HIDE_MODAL
  })
};
/* harmony default export */ var modal_actions = (modalActions);
// CONCATENATED MODULE: ./redux/modal/reducer.js

const modal_reducer_initialState = {
  modalVisibility: false,
  modalType: '',
  modalProps: {}
};
function modalReducer(state = modal_reducer_initialState, action) {
  switch (action.type) {
    case modal_actions.SHOW_MODAL:
      return {
        modalVisibility: true,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps
      };

    case modal_actions.HIDE_MODAL:
      return modal_reducer_initialState;

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/quiz/actions.js
const quizActions = {
  START_QUIZ: 'START_QUIZ',
  GET_QUIZ_DATA: 'GET_QUIZ_DATA',
  GET_QUESTION_DATA: 'GET_QUESTION_DATA',
  SET_QUESTION_DATA: 'SET_QUESTION_DATA',
  SET_QUIZ_DATA: 'SET_QUIZ_DATA',
  SET_QUESTION_ANSWER: 'SET_QUESTION_ANSWER',
  NEXT_QUESTION: 'NEXT_QUESTION',
  // Load Data Actions
  startQuiz: () => ({
    type: quizActions.START_QUIZ
  }),
  getQuestionData: () => ({
    type: quizActions.GET_QUESTION_DATA
  }),
  getQuizData: () => ({
    type: quizActions.GET_QUIZ_DATA
  }),
  setQuizData: payload => ({
    type: quizActions.SET_QUIZ_DATA,
    payload
  }),
  setQuestionData: payload => ({
    type: quizActions.SET_QUESTION_DATA,
    payload
  }),
  setQuestionAnswer: payload => ({
    type: quizActions.SET_QUESTION_ANSWER,
    payload
  }),
  nextQuestion: payload => ({
    type: quizActions.NEXT_QUESTION,
    payload
  })
};
/* harmony default export */ var quiz_actions = (quizActions);
// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__("nuGg");

// CONCATENATED MODULE: ./library/helpers/utility.js

function clearToken() {
  localStorage.removeItem('id_token');
}
function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new external_immutable_["Map"]({
      idToken
    });
  } catch (err) {
    clearToken();
    return new external_immutable_["Map"]();
  }
}
function arrayEqual(array1, array2) {
  return array1.sort().toString() == array2.sort().toString();
}
function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();

  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };

  const number = num => num > 9 ? '' + num : '0' + num;

  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);

    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }

    const days = Math.floor((temp %= 31536000) / 86400);

    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }

    const hours = Math.floor((temp %= 86400) / 3600);

    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }

    const minutes = Math.floor((temp %= 3600) / 60);

    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }

    return 'a few seconds ago';
  };

  return getTime();
}
function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }

  return defValue;
}
function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}
// CONCATENATED MODULE: ./redux/quiz/reducer.js
function quiz_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function quiz_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { quiz_reducer_ownKeys(Object(source), true).forEach(function (key) { quiz_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { quiz_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function quiz_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const quiz_reducer_initialState = {
  quizes: {},
  questions: {},
  gettingStarted: false,
  activeQuestion: 0,
  total: 0,
  correct: 0,
  wrong: 0,
  submitted: false,
  answers: false
};
function questionReducer(state = quiz_reducer_initialState, action) {
  switch (action.type) {
    case quiz_actions.START_QUIZ:
      return quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, state), {}, {
        gettingStarted: true
      });

    case quiz_actions.SET_QUIZ_DATA:
      return quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, state), {}, {
        quizes: action.payload,
        gettingStarted: false
      });

    case quiz_actions.SET_QUESTION_DATA:
      return quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, state), {}, {
        questions: action.payload,
        total: action.payload.total
      });

    case quiz_actions.SET_QUESTION_ANSWER:
      const {
        questions,
        activeQuestion,
        correct,
        wrong
      } = state;
      const currentQuizz = questions.data[activeQuestion];
      let rightAnswer = false;

      if (Array.isArray(action.payload)) {
        rightAnswer = arrayEqual(action.payload, currentQuizz['answers']);
      } else {
        rightAnswer = currentQuizz['answers'] === action.payload ? true : false;
      }

      let correctAnswer = rightAnswer ? correct + 1 : correct;
      let wrongAnswer = !rightAnswer ? wrong + 1 : wrong;
      return quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, state), {}, {
        correct: correctAnswer,
        wrong: wrongAnswer,
        submitted: true,
        answers: rightAnswer,
        questions: {
          data: [...questions.data.slice(0, activeQuestion), quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, questions.data[activeQuestion]), {}, {
            showAnswer: true
          }), ...questions.data.slice(activeQuestion + 1)]
        }
      });

    case quiz_actions.NEXT_QUESTION:
      return quiz_reducer_objectSpread(quiz_reducer_objectSpread({}, state), {}, {
        activeQuestion: state.activeQuestion + 1,
        submitted: false,
        answers: false
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/profile/actions.js
const profileActions = {
  FETCH_PROFILE_DATA_START: 'FETCH_PROFILE_DATA_START',
  FETCH_PROFILE_DATA_SUCCESS: 'FETCH_PROFILE_DATA_SUCCESS',
  FETCH_PROFILE_DATA_FAILURE: 'FETCH_PROFILE_DATA_FAILURE',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  fetchProfileDataStart: () => ({
    type: profileActions.FETCH_PROFILE_DATA_START
  }),
  fetchProfileDataSuccess: profile => ({
    type: profileActions.FETCH_PROFILE_DATA_SUCCESS,
    payload: profile
  }),
  fetchProfileDataFailure: error => ({
    type: profileActions.FETCH_PROFILE_DATA_FAILURE,
    payload: error
  })
};
/* harmony default export */ var profile_actions = (profileActions);
// CONCATENATED MODULE: ./redux/profile/reducer.js
function profile_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function profile_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { profile_reducer_ownKeys(Object(source), true).forEach(function (key) { profile_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { profile_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function profile_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const INITIAL_DATA = {
  data: null,
  loading: true,
  error: null
};
function profileReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case profile_actions.FETCH_PROFILE_DATA_SUCCESS:
      return profile_reducer_objectSpread(profile_reducer_objectSpread({}, state), {}, {
        data: action.payload,
        loading: false,
        error: null
      });

    case profile_actions.FETCH_PROFILE_DATA_FAILURE:
      return profile_reducer_objectSpread(profile_reducer_objectSpread({}, state), {}, {
        loading: false,
        error: action.payload
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/githubSearch/actions.js
const githubSearch_actions_actions = {
  GIT_SEARCH: 'GIT_SEARCH',
  GIT_SUCCESS_RESULT: 'GIT_SUCCESS_RESULT',
  GIT_ERROR_RESULT: 'GIT_ERROR_RESULT',
  gitSearch: searcText => ({
    type: githubSearch_actions_actions.GIT_SEARCH,
    payload: {
      searcText,
      page: 1
    }
  }),
  onPageChange: (searcText, page) => ({
    type: githubSearch_actions_actions.GIT_SEARCH,
    payload: {
      searcText,
      page
    }
  }),
  gitSearchSuccess: (result, total_count, page) => ({
    type: githubSearch_actions_actions.GIT_SUCCESS_RESULT,
    result,
    total_count,
    page
  }),
  gitSearchError: () => ({
    type: githubSearch_actions_actions.GIT_ERROR_RESULT
  })
};
/* harmony default export */ var githubSearch_actions = (githubSearch_actions_actions);
// CONCATENATED MODULE: ./redux/githubSearch/reducers.js
function githubSearch_reducers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function githubSearch_reducers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { githubSearch_reducers_ownKeys(Object(source), true).forEach(function (key) { githubSearch_reducers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { githubSearch_reducers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function githubSearch_reducers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const githubSearch_reducers_initState = {
  searcText: 'react',
  total_count: 0,
  page: 1,
  result: [],
  loading: false,
  error: false
};
function githubSearch_reducers_reducer(state = githubSearch_reducers_initState, action) {
  switch (action.type) {
    case githubSearch_actions.GIT_SEARCH:
      return githubSearch_reducers_objectSpread(githubSearch_reducers_objectSpread({}, state), {}, {
        loading: true,
        searcText: action.payload.searcText
      });

    case githubSearch_actions.GIT_SUCCESS_RESULT:
      return githubSearch_reducers_objectSpread(githubSearch_reducers_objectSpread({}, state), {}, {
        loading: false,
        error: false,
        result: action.result,
        total_count: action.total_count,
        page: action.page
      });

    case githubSearch_actions.GIT_ERROR_RESULT:
      return githubSearch_reducers_objectSpread(githubSearch_reducers_objectSpread({}, state), {}, {
        loading: false,
        error: false,
        result: []
      });

    default:
      return state;
  }
}
// CONCATENATED MODULE: ./redux/root-reducer.js


























/* harmony default export */ var root_reducer = (Object(external_redux_["combineReducers"])({
  Order: Reducer,
  Auth: authReducer,
  App: appReducer,
  ThemeSwitcher: reducer_Reducer,
  LanguageSwitcher: languageSwitcher_reducer_Reducer,
  Mails: mailReducer,
  Calendar: calendarReducer,
  Box: boxReducer,
  Notes: noteReducer,
  Todos: todoReducer,
  Contacts: contactReducer,
  Cards: cardReducer,
  Chat: reducer,
  DynamicChartComponent: calendsrReducer,
  Ecommerce: ecommerce_reducer,
  Invoices: reducer_cardReducer,
  YoutubeSearch: reducers_reducer,
  Articles: articles_reducers_reducer,
  Investors: investors_reducers_reducer,
  scrumBoard: scrumBoardReducer,
  modal: modalReducer,
  quiz: questionReducer,
  drawer: drawerReducer,
  profile: profileReducer,
  githubSearch: githubSearch_reducers_reducer
}));
// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__("RmXt");

// EXTERNAL MODULE: external "isomorphic-unfetch"
var external_isomorphic_unfetch_ = __webpack_require__("0bYB");
var external_isomorphic_unfetch_default = /*#__PURE__*/__webpack_require__.n(external_isomorphic_unfetch_);

// EXTERNAL MODULE: ./authentication/auth.utils.js
var auth_utils = __webpack_require__("P/cE");

// EXTERNAL MODULE: ./components/index.js + 4 modules
var components = __webpack_require__("e+cM");

// CONCATENATED MODULE: ./config/jwt.config.js
/* harmony default export */ var jwt_config = ({
  enabled: false,
  fetchUrl: "http://localhost:5000/login",
  secretKey: "secretKey"
});
// EXTERNAL MODULE: external "jwt-decode"
var external_jwt_decode_ = __webpack_require__("tlnx");
var external_jwt_decode_default = /*#__PURE__*/__webpack_require__.n(external_jwt_decode_);

// CONCATENATED MODULE: ./authentication/jwtAuthentication.js
function jwtAuthentication_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class jwtAuthentication_JwtAuth {
  constructor() {
    jwtAuthentication_defineProperty(this, "login", async userInfo => {
      if (!userInfo.username || !userInfo.password) {
        return {
          error: 'please fill in the input'
        };
      }

      return await fetch(jwt_config.fetchUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      }).then(response => response.json()).then(res => {
        const result = {};

        if (res.token) {
          result.profile = external_jwt_decode_default()(res.token);
          result.token = res.token;
          return result;
        } else {
          return res;
        }
      }).catch(error => ({
        error
      }));
    });
  }

}

/* harmony default export */ var jwtAuthentication = (new jwtAuthentication_JwtAuth());
// CONCATENATED MODULE: ./authentication/sagas.js






const ApiUrl = '/api/login';

function* loginRequest({
  payload: {
    user
  }
}) {
  try {
    const response = yield external_isomorphic_unfetch_default()(ApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user
      })
    });

    if (response.status === 200) {
      const {
        token
      } = yield response.json();
      yield Object(effects_["call"])(auth_utils["a" /* login */], {
        token
      });
      yield Object(effects_["put"])(authentication_actions["a" /* default */].loginRequestSuccess(token));
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    yield Object(effects_["put"])(authentication_actions["a" /* default */].loginRequestFailure(error));
  }
}

function* jwtLoginRequest() {// yield takeLatest(actions.JWT_LOGIN_REQUEST, function*({ payload }) {
  //   const result = yield call(JwtAuthentication.login, payload.userInfo);
  //   if (result.error) {
  //     notification('error', result.error);
  //     yield put(actions.loginRequestFailure(error));
  //   } else {
  //     payload.history.push('/dashboard');
  //     yield put({
  //       type: actions.LOGIN_REQUEST_SUCCESS,
  //       token: result.token,
  //       profile: result.profile,
  //     });
  //   }
  // });
}

function* logoutRequest() {
  try {
    yield Object(effects_["call"])(auth_utils["b" /* logout */]);
    yield Object(effects_["put"])(authentication_actions["a" /* default */].logoutRequestSuccess());
  } catch (error) {
    yield Object(effects_["put"])(authentication_actions["a" /* default */].logoutRequestFailure(error));
  }
} // export function* loginSuccess() {
//   yield takeLatest(actions.LOGIN_SUCCESS, function*(payload) {
//     setCookie('login_saga', payload.token);
//     yield setCookie('id_token', payload.token);
//   });
// }
// export function* loginError() {
//   yield takeLatest(actions.LOGIN_ERROR, function*() {});
// }


function* onLogin() {
  yield Object(effects_["takeLatest"])(authentication_actions["a" /* default */].LOGIN_REQUEST_START, loginRequest);
}
function* onLogout() {
  yield Object(effects_["takeLatest"])(authentication_actions["a" /* default */].LOGOUT_REQUEST_START, logoutRequest);
}
function* rootSaga() {
  yield Object(effects_["all"])([Object(effects_["call"])(onLogin), Object(effects_["call"])(jwtLoginRequest), Object(effects_["call"])(onLogout)]);
}
// CONCATENATED MODULE: ./redux/contacts/saga.js


function* addContact() {
  yield Object(effects_["takeEvery"])(contacts_actions.ADD_CONTACT, function* () {});
}
function* editContact() {
  yield Object(effects_["takeEvery"])(contacts_actions.EDIT_CONTACT, function* () {});
}
function* deleteContact() {
  yield Object(effects_["takeEvery"])(contacts_actions.DELETE__CONTACT, function* () {});
}
function* saga_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(addContact), Object(effects_["fork"])(editContact), Object(effects_["fork"])(deleteContact)]);
}
// CONCATENATED MODULE: ./redux/invoice/saga.js



function* getInvoice() {
  yield Object(effects_["put"])({
    type: invoice_actions.UPDATE_INVOICE,
    invoices: createDemoData()
  });
}
function* updateInvoiceSaga({
  invoices,
  invoice
}) {
  yield localStorage.setItem(localDataName, JSON.stringify(invoices));
  yield Object(effects_["put"])({
    type: invoice_actions.UPDATE_INVOICE,
    invoices,
    invoice
  });
}
function* invoice_saga_rootSaga() {
  yield Object(effects_["all"])([yield Object(effects_["takeEvery"])(invoice_actions.GET_INVOICE, getInvoice), yield Object(effects_["takeEvery"])(invoice_actions.UPDATE_INVOICE_SAGA, updateInvoiceSaga)]);
}
// CONCATENATED MODULE: ./redux/mail/saga.js


function* filterAction() {
  yield Object(effects_["takeEvery"])(mail_actions.FILTER_ATTRIBUTE, function* () {});
}
function* mail_saga_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(filterAction)]);
}
// CONCATENATED MODULE: ./redux/notes/saga.js


function* changeColor() {
  yield Object(effects_["takeEvery"])(notes_actions.CHANGE_COLOR, function* () {});
}
function* addNote() {
  yield Object(effects_["takeEvery"])(notes_actions.ADD_NOTE, function* () {});
}
function* editNote() {
  yield Object(effects_["takeEvery"])(notes_actions.EDIT_NOTE, function* () {});
}
function* deleteNote() {
  yield Object(effects_["takeEvery"])(notes_actions.DELETE_NOTE, function* () {});
}
function* notes_saga_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(changeColor), Object(effects_["fork"])(addNote), Object(effects_["fork"])(editNote), Object(effects_["fork"])(deleteNote)]);
}
// CONCATENATED MODULE: ./redux/todos/saga.js


function* changedTodo() {
  yield Object(effects_["takeEvery"])(todos_actions.CHANGE_TODO, function* () {});
}
function* todos_saga_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(changedTodo)]);
}
// CONCATENATED MODULE: ./redux/ecommerce/fake.js
/* harmony default export */ var fake = ({
  productQuantity: [{
    objectID: '5357011',
    quantity: 1
  }, {
    objectID: '5354101',
    quantity: 1
  }, {
    objectID: '4494401',
    quantity: 1
  }, {
    objectID: '4494000',
    quantity: 1
  }],
  products: {
    '4494000': {
      name: 'Amazon - Case for Amazon Fire HD 8 Tablets - Black',
      description: "Take your Amazon Fire HD 8 tablet on the go with this Amazon B00XM5W2WE case, which features a folio cover that guards your device's display and automatically wakes up your device when opened. The built-in stand offers comfortable hands-free viewing.",
      brand: 'Amazon',
      categories: ['Computers & Tablets', 'iPad & Tablet Accessories', 'Cases'],
      hierarchicalCategories: {
        lvl0: 'Computers & Tablets',
        lvl1: 'Computers & Tablets > iPad & Tablet Accessories',
        lvl2: 'Computers & Tablets > iPad & Tablet Accessories > Cases'
      },
      price: 39.99,
      price_range: '1 - 50',
      image: 'https://cdn-demo.algolia.com/bestbuy/4494000_sb.jpg',
      free_shipping: false,
      rating: 6,
      objectID: '4494000',
      _snippetResult: {
        description: {
          value: 'Take your Amazon Fire HD 8 tablet on the go',
          matchLevel: 'none'
        }
      },
      _highlightResult: {
        name: {
          value: 'Amazon - Case for Amazon Fire HD 8 Tablets - Black',
          matchLevel: 'none',
          matchedWords: []
        },
        description: {
          value: "Take your Amazon Fire HD 8 tablet on the go with this Amazon B00XM5W2WE case, which features a folio cover that guards your device's display and automatically wakes up your device when opened. The built-in stand offers comfortable hands-free viewing.",
          matchLevel: 'none',
          matchedWords: []
        }
      }
    },
    '4494401': {
      name: 'Amazon - Case for Amazon Fire 7" Tablets - Black',
      description: 'Protect your Amazon Fire 7" tablet from scratches and bumps on the go with this slim Amazon B00ZGUYN1Q case, which features a full-coverage design with polyurethane and microfiber materials for durability. The built-in stand enables hands-free viewing.',
      brand: 'Amazon',
      categories: ['Computers & Tablets', 'iPad & Tablet Accessories', 'Cases'],
      hierarchicalCategories: {
        lvl0: 'Computers & Tablets',
        lvl1: 'Computers & Tablets > iPad & Tablet Accessories',
        lvl2: 'Computers & Tablets > iPad & Tablet Accessories > Cases'
      },
      price: 24.99,
      price_range: '1 - 50',
      image: 'https://cdn-demo.algolia.com/bestbuy/4494401_sb.jpg',
      free_shipping: false,
      rating: 4,
      objectID: '4494401',
      _snippetResult: {
        description: {
          value: 'Protect your Amazon Fire 7" tablet from scratches and bumps',
          matchLevel: 'none'
        }
      },
      _highlightResult: {
        name: {
          value: 'Amazon - Case for Amazon Fire 7" Tablets - Black',
          matchLevel: 'none',
          matchedWords: []
        },
        description: {
          value: 'Protect your Amazon Fire 7" tablet from scratches and bumps on the go with this slim Amazon B00ZGUYN1Q case, which features a full-coverage design with polyurethane and microfiber materials for durability. The built-in stand enables hands-free viewing.',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    },
    '5354101': {
      name: '3DR - Solo Smart Rechargeable Battery - Black',
      description: '3D Robotics Battery for Solo Drones: Instead of waiting for your lone battery to recharge, get back to flying right away with this rechargeable battery for Solo drones. The battery can power your drone for up to 25 minutes with no camera attached, or 20 minutes carrying a camera.',
      brand: '3DR',
      categories: ['Toys, Games & Drones', 'Drones & Accessories', 'Drone Accessories', 'Drone Batteries'],
      hierarchicalCategories: {
        lvl0: 'Toys, Games & Drones',
        lvl1: 'Toys, Games & Drones > Drones & Accessories',
        lvl2: 'Toys, Games & Drones > Drones & Accessories > Drone Accessories',
        lvl3: 'Toys, Games & Drones > Drones & Accessories > Drone Accessories > Drone Batteries'
      },
      price: 149.95,
      price_range: '100 - 200',
      image: 'https://cdn-demo.algolia.com/bestbuy/5354101_sb.jpg',
      free_shipping: false,
      rating: 4,
      objectID: '5354101',
      _snippetResult: {
        description: {
          value: '3D Robotics Battery for Solo Drones: Instead of waiting for',
          matchLevel: 'none'
        }
      },
      _highlightResult: {
        name: {
          value: '3DR - Solo Smart Rechargeable Battery - Black',
          matchLevel: 'none',
          matchedWords: []
        },
        description: {
          value: '3D Robotics Battery for Solo Drones: Instead of waiting for your lone battery to recharge, get back to flying right away with this rechargeable battery for Solo drones. The battery can power your drone for up to 25 minutes with no camera attached, or 20 minutes carrying a camera.',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    },
    '5357011': {
      name: '3DR - Propellers for 3DR Solo Drones (2-Pack) - Black',
      description: '3D Robotics Propellers for Solo Drones: Buy this set of replacement propellers before you need them so you can get back to flying as soon as you damage or lose a propeller. The 1-piece design of these propellers keeps them secure during flight, self-tightening so you can install them in an instant and return to in-air fun.',
      brand: '3DR',
      categories: ['Toys, Games & Drones', 'Drones & Accessories', 'Drone Accessories', 'Drone Parts'],
      hierarchicalCategories: {
        lvl0: 'Toys, Games & Drones',
        lvl1: 'Toys, Games & Drones > Drones & Accessories',
        lvl2: 'Toys, Games & Drones > Drones & Accessories > Drone Accessories',
        lvl3: 'Toys, Games & Drones > Drones & Accessories > Drone Accessories > Drone Parts'
      },
      price: 14.95,
      price_range: '1 - 50',
      image: 'https://cdn-demo.algolia.com/bestbuy/5357011_rb.jpg',
      free_shipping: false,
      rating: 2,
      objectID: '5357011',
      _snippetResult: {
        description: {
          value: '3D Robotics Propellers for Solo Drones: Buy this set of',
          matchLevel: 'none'
        }
      },
      _highlightResult: {
        name: {
          value: '3DR - Propellers for 3DR Solo Drones (2-Pack) - Black',
          matchLevel: 'none',
          matchedWords: []
        },
        description: {
          value: '3D Robotics Propellers for Solo Drones: Buy this set of replacement propellers before you need them so you can get back to flying as soon as you damage or lose a propeller. The 1-piece design of these propellers keeps them secure during flight, self-tightening so you can install them in an instant and return to in-air fun.',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./redux/ecommerce/config.js
function config_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function config_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { config_ownKeys(Object(source), true).forEach(function (key) { config_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { config_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function config_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const productDatas = [];

function config_getInitData() {
  let productQuantity = [];
  const products = {};

  if (!isServer) {
    const cartProductQuantity = localStorage.getItem('cartProductQuantity');
    let cartProducts = localStorage.getItem('cartProducts');

    if (cartProducts && cartProductQuantity) {
      cartProducts = JSON.parse(cartProducts);
      JSON.parse(cartProductQuantity).forEach(product => {
        const objectID = product.objectID;

        if (!isNaN(product.quantity)) {
          productQuantity.push({
            objectID,
            quantity: parseInt(product.quantity, 10)
          });
          products[objectID] = config_objectSpread(config_objectSpread({}, cartProducts[objectID]), {}, {
            price: parseFloat(cartProducts[objectID].price, 10)
          });
        }
      });
    } else {
      productDatas.forEach(product => {
        productQuantity.push({
          objectID: product.objectID,
          quantity: 1
        });
        products[product.objectID] = product;
      });
    }
  }

  return {
    productQuantity,
    products
  };
}

/* harmony default export */ var ecommerce_config = (config_getInitData());
// CONCATENATED MODULE: ./redux/ecommerce/saga.js




function* changedCard() {
  yield Object(effects_["takeEvery"])(ecommerce_actions["a" /* default */].CHANGE_CARDS, function* () {});
}
function* saga_initData() {
  let fakeData = ecommerce_config;

  if (ecommerce_config.productQuantity.length === 0) {
    fakeData = fake;
  }

  yield Object(effects_["put"])({
    type: ecommerce_actions["a" /* default */].INIT_DATA,
    payload: fakeData
  });
}
function* updateData({
  products,
  productQuantity
}) {
  localStorage.setItem('cartProductQuantity', JSON.stringify(productQuantity));
  localStorage.setItem('cartProducts', JSON.stringify(products));
  yield Object(effects_["put"])({
    type: ecommerce_actions["a" /* default */].UPDATE_DATA,
    products,
    productQuantity
  });
}
function* Saga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(ecommerce_actions["a" /* default */].INIT_DATA_SAGA, saga_initData), Object(effects_["takeEvery"])(ecommerce_actions["a" /* default */].UPDATE_DATA_SAGA, updateData)]);
}
// CONCATENATED MODULE: ./redux/card/saga.js


function* saga_changedCard() {
  yield Object(effects_["takeEvery"])(card_actions.CHANGE_CARDS, function* () {});
}
function* card_saga_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["fork"])(saga_changedCard)]);
}
// EXTERNAL MODULE: ./library/firebase/firebase.js + 1 modules
var firebase = __webpack_require__("XCCS");

// CONCATENATED MODULE: ./library/firebase/firebase.util.js
function firebase_util_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function firebase_util_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { firebase_util_ownKeys(Object(source), true).forEach(function (key) { firebase_util_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { firebase_util_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function firebase_util_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function convertCollectionsSnapshotToMap(snapshots) {
  return snapshots.docs.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection.data();
    return accumulator;
  }, {});
}
async function getNewDocRef(collectionName) {
  return await firebase["b" /* db */].collection(collectionName).doc();
}
async function addDocument(collectionName, documentData) {
  return await firebase["b" /* db */].collection(collectionName).add(documentData).then(docRef => docRef.id);
}
async function setDocument(collectionName, docRef, documentData) {
  return await firebase["b" /* db */].collection(collectionName).doc(docRef).set(documentData);
}
async function getDocuments(collectionName) {
  return await firebase["b" /* db */].collection(collectionName).get().then(querySnapshot => querySnapshot.docs.map(doc => firebase_util_objectSpread({
    id: doc.id
  }, doc.data())));
}
async function getDocumentsByQuery(collectionName, query) {
  console.log(...query, collectionName, 'test');
  return await firebase["b" /* db */].collection(collectionName).where(...query).get().then(querySnapshot => querySnapshot.docs.map(doc => firebase_util_objectSpread({
    id: doc.id
  }, doc.data())));
}
async function deleteDocuments(collectionName) {
  const collectionRef = firebase["b" /* db */].collection(collectionName);
  var batch = firebase["b" /* db */].batch();
  await collectionRef.get().then(querySnapshot => querySnapshot.docs.map(doc => batch.delete(collectionRef.doc(doc.id))));
  return await batch.commit().then(() => {
    console.log('Batch Deletion successfully committed!');
  });
}
const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firebase["b" /* db */].collection(collectionKey);
  const batch = firebase["b" /* db */].batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit().then(() => {
    console.log('Batch Addition successfully committed!');
  });
}; // const { title, items } = doc.data();
//     return {
//       routeName: encodeURI(title.toLowerCase()),
//       id: doc.id,
//       title,
//       items,
//     };
//   });
//   console.log(transformedCollection);
//   return transformedCollection.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// CONCATENATED MODULE: ./redux/chat/sagas.js
function sagas_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function sagas_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { sagas_ownKeys(Object(source), true).forEach(function (key) { sagas_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { sagas_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function sagas_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const getSelectedChatRoom = state => state.Chat.selectedChatRoom;

const reverseString = str => str.split('').reverse().join('');

const sortChatrooms = (optionA, optionB) => optionB.lastMessageTime - optionA.lastMessageTime;

const sortMessages = (optionA, optionB) => optionA.messageTime - optionB.messageTime;

const getCurrentUser = () => {
  return {
    userId: 'wt4TiasxgPrQ3dNwVZ55',
    user: {
      id: 'wt4TiasxgPrQ3dNwVZ55',
      dob: '06-Apr-1993',
      gender: 'Male',
      language: 'Burmese',
      mobileNo: '5726784596',
      name: 'Zondra Kulic',
      profileImageUrl: 'https://s3.amazonaws.com/redqteam.com/mateadmin/support-male-zonra.png'
    }
  };
};

let chatroomsUserCollections;
let chatroomCollectionRef = firebase["b" /* db */].collection('chatRooms');
let messagesCollectionRef = firebase["b" /* db */].collection('messages');

const sendMessageBatch = async ({
  payload,
  selectedChatRoom
}) => {
  const batch = firebase["b" /* db */].batch(); // const { chatRoom, text } = payload;

  console.log(selectedChatRoom, payload, 'send');
  const revId = reverseString(selectedChatRoom.id);
  const messageTime = new Date().getTime();
  const chatRoomModified = {
    lastMessage: payload,
    lastMessageTime: messageTime
  };
  batch.update(chatroomCollectionRef.doc(selectedChatRoom.id), chatRoomModified);
  batch.update(chatroomCollectionRef.doc(revId), chatRoomModified);
  batch.set(messagesCollectionRef.doc(), {
    sender: selectedChatRoom.userId,
    text: payload,
    messageTime,
    chatRoomId: selectedChatRoom.id
  });
  batch.commit(); // yield fork(updateChatrooms);
};

function* initChat(action) {
  // console.log(payload, 'chatinit');
  const payload = getCurrentUser();
  const users = yield Object(effects_["call"])(getDocuments, 'users');
  const chatRooms = yield Object(effects_["call"])(getDocumentsByQuery, 'chatRooms', ['userId', '==', payload.userId]);
  chatRooms.sort(sortChatrooms);
  const messages = yield Object(effects_["call"])(getDocumentsByQuery, 'messages', ['chatRoomId', '==', chatRooms[0].id]);
  console.log(chatRooms, 'chatRooms');
  messages.sort(sortMessages); // fsProps.selectedChatRoom = chatRooms.length > 0 && chatRooms[0];

  chatroomsUserCollections = firebase["b" /* db */].collection('chatRooms').where('userId', '==', payload.userId);
  yield Object(effects_["fork"])(updateChatrooms);
  yield Object(effects_["put"])({
    type: chat_actions.CHAT_INIT_SAGA,
    user: payload.user,
    userId: payload.userId,
    users,
    chatRooms,
    messages
  });
}

function* sendMessage({
  payload
}) {
  // fsProps.selectedChatRoom = payload.chatRoom;
  const selectedChatRoom = yield Object(effects_["select"])(getSelectedChatRoom);
  yield Object(effects_["call"])(sendMessageBatch, {
    payload,
    selectedChatRoom
  });
  yield Object(effects_["put"])({
    type: chat_actions.NEW_MESSAGE_SUCCESFULL
  }); // yield fork(updateChatrooms);
}

function* addNewUser({
  user,
  addNewUsersProp
}) {
  const newUserId = yield Object(effects_["call"])(addDocument, 'users', addNewUsersProp);

  const newUser = sagas_objectSpread({
    id: newUserId
  }, addNewUsersProp);

  const newChatroom = {
    reverse: false,
    userId: user.id,
    otherUserId: newUserId,
    otherUserInfo: newUser,
    lastMessage: '',
    lastMessageTime: 0
  };
  const newChatRoomId = yield Object(effects_["call"])(addDocument, 'chatRooms', newChatroom);
  const chatRoomKeyRev = reverseString(newChatRoomId);
  const newChatroomRev = {
    id: chatRoomKeyRev,
    reverse: true,
    userId: newUserId,
    otherUserId: user.id,
    otherUserInfo: user,
    lastMessage: '',
    lastMessageTime: 0
  };
  yield Object(effects_["call"])(addDocument, 'chatRooms', newChatroomRev);
  yield Object(effects_["put"])({
    type: chat_actions.ADD_NEW_USER_SAGA,
    user: newUser,
    chatRoom: sagas_objectSpread({
      id: newChatRoomId
    }, newChatroom)
  });
}

function* updateChatrooms() {
  const successActionCreator = data => {
    const {
      type,
      newIndex
    } = data.docChanges()[0];
    const dataMoodified = type === 'modified';

    if (!dataMoodified) {
      return {
        type: 'NO_CHANGE'
      };
    }

    const chatRoom = data.docs[newIndex].data();
    return {
      type: chat_actions.CHAT_UPDATE_CHATROOM_SAGA,
      payload: {
        chatRoom
      }
    };
  };

  yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.syncCollection, chatroomsUserCollections, {
    successActionCreator
  });
}

function* updateChatroomSaga({
  payload
}) {
  const {
    chatRoom
  } = payload;
  let {
    selected
  } = payload;
  const selectedChatRoom = yield Object(effects_["select"])(getSelectedChatRoom);
  let messages;

  if (selected || chatRoom.id === selectedChatRoom.id) {
    messages = yield Object(effects_["call"])(getDocumentsByQuery, 'messages', ['chatRoomId', '==', chatRoom.id]);
    selected = true;
  }

  yield Object(effects_["put"])({
    type: chat_actions.CHAT_UPDATE_CHATROOM,
    chatRoom,
    messages,
    selected
  });
}

function* sagas_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(chat_actions.CHAT_INIT, initChat), Object(effects_["takeEvery"])(chat_actions.CHAT_UPDATE_CHATROOM_SAGA, updateChatroomSaga), Object(effects_["takeEvery"])(chat_actions.CHAT_SEND_MESSAGE, sendMessage), Object(effects_["takeEvery"])(chat_actions.ADD_NEW_USER, addNewUser)]);
}
// CONCATENATED MODULE: ./config/youtube_search.config.js
const youtubeSearchApi = "your_youtube_search_api_key";
/* harmony default export */ var youtube_search_config = (youtubeSearchApi);
// CONCATENATED MODULE: ./redux/youtubeSearch/sagas.js



const per_page = 10;
const maxResults = 10;
const youtubeSearchURL = `https://www.googleapis.com/youtube/v3/search?maxResults=${maxResults}&type=video&key=${youtube_search_config}&part=snippet`;

const onSearchReqeust = async (searcText, pageToken) => await fetch(`${youtubeSearchURL}&q=${encodeURIComponent(searcText)}${pageToken}`).then(res => res.json()).then(res => res).catch(error => error);

function* searchRequest({
  payload
}) {
  const {
    searcText,
    pageToken
  } = payload;

  try {
    const searchResult = yield Object(effects_["call"])(onSearchReqeust, searcText, pageToken ? `&pageToken=${pageToken}` : '');

    if (searchResult.items) {
      yield Object(effects_["put"])(youtubeSearch_actions.youtubeSearchSuccess(searchResult.items, searchResult.pageInfo.totalResults, searchResult.nextPageToken, searchResult.prevPageToken));
    } else {
      yield Object(effects_["put"])(youtubeSearch_actions.youtubeSearchSuccess());
    }
  } catch (error) {
    yield Object(effects_["put"])(youtubeSearch_actions.youtubeSearchSuccess());
  }
}

function* youtubeSearch_sagas_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(youtubeSearch_actions.YOUTUBE_SEARCH, searchRequest)]);
}
// CONCATENATED MODULE: ./redux/githubSearch/sagas.js


const sagas_per_page = 10;
const gitSearchApi = `https://api.github.com/search/repositories?per_page=${sagas_per_page}&q=`;

const sagas_onSearchReqeust = async (searcText, page = 1) => await fetch(`${gitSearchApi}${encodeURIComponent(searcText)}&page=${page}`).then(res => res.json()).then(res => res).catch(error => error);

function* sagas_searchRequest({
  payload
}) {
  const {
    searcText,
    page
  } = payload;

  try {
    const searchResult = yield Object(effects_["call"])(sagas_onSearchReqeust, searcText, page);

    if (searchResult.items && searchResult.total_count) {
      yield Object(effects_["put"])(githubSearch_actions.gitSearchSuccess(searchResult.items, searchResult.total_count, page));
    } else {
      yield Object(effects_["put"])(githubSearch_actions.gitSearchSuccess());
    }
  } catch (error) {
    yield Object(effects_["put"])(githubSearch_actions.gitSearchSuccess());
  }
}

function* githubSearch_sagas_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(githubSearch_actions.GIT_SEARCH, sagas_searchRequest)]);
}
// EXTERNAL MODULE: external "lodash/omit"
var omit_ = __webpack_require__("2TDg");
var omit_default = /*#__PURE__*/__webpack_require__.n(omit_);

// CONCATENATED MODULE: ./redux/articles/fakeData.js
let createdAt = new Date().getTime();
const tableData = JSON.parse(`[{
  "id": "1",
  "title": "React is the future",
  "description": "Let’s take a closer look at some of the patterns that are emerging in the React ecosystem.",
  "excerpt": "Let’s take a closer look at some of the patterns that are emerging",
  "deleted_at": null,
  "created_at": ${createdAt},
  "status": "publish",
  "key": null,
  "slug": "future-in-react-116140e5fe8f"
}, {
  "id": "2",
  "title": "Global configuration of webpack, react and CRA",
  "description": "We are very happy to introduce. It’s available on npm effective immediately. To upgrade, run:",
  "excerpt": "Introducing the devtools world",
  "deleted_at": null,
  "created_at": ${createdAt},
  "status": "publish",
  "key": null,
  "slug": "next5-react"
}, {
  "id": "3",
  "title": "Reactive Pro: A user guide",
  "description": "Reactive a modern web based filtering and searching plugin. I have already released two apps in production, Kiven Aa (React) and Pollen Chat (React Native). ",
  "excerpt": "I’ve been working with React and React-Native for the last couple of months.",
  "deleted_at": null,
  "created_at": ${createdAt},
  "status": "publish",
  "key": null,
  "slug": "rock-solid-react-js-foundations-a-beginners-guide-c45c93f5a923"
}, {
  "id": "4",
  "title": "Userplace - a compelete user experience.",
  "description": "There, You can use the traditional if statement or the switch statement. In this article, we’ll explore a few alternatives ",
  "excerpt": "I’ve been the last couple of months.",
  "deleted_at": null,
  "created_at": ${createdAt},
  "status": "publish",
  "key": null,
  "slug": "rock-solid-react-js-foundations-a-beginners-guide-c45c93f5a923"
}, {
  "id": "5",
  "title": "React is rulling the tech ",
  "description": "There, You can use the traditional if statement or the switch statement. In this article, we’ll explore a few alternatives ",
  "excerpt": "I’ve been the last couple of months.",
  "deleted_at": null,
  "created_at": ${createdAt},
  "status": "publish",
  "key": null,
  "slug": "rock-solid-react-js-foundations-a-beginners-guide-c45c93f5a923"
}]`);
const sortOption = {};

class fakeData_fakeData {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
  }

  dataModel(index) {
    return tableData[index];
  }

  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }

    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }

    return this.datas[index];
  }

  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }

    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }

  getSortAsc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'ASC';
    return this.datas.sort(this.sort);
  }

  getSortDesc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'DESC';
    return this.datas.sort(this.sort);
  }

  sort(optionA, optionB) {
    const valueA = optionA[sortOption.sortKey].toUpperCase();
    const valueB = optionB[sortOption.sortKey].toUpperCase();
    let sortVal = 0;

    if (valueA > valueB) {
      sortVal = 1;
    }

    if (valueA < valueB) {
      sortVal = -1;
    }

    if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }

    return sortVal;
  }

}

/* harmony default export */ var articles_fakeData = (fakeData_fakeData);
// CONCATENATED MODULE: ./redux/articles/sagas.js
function articles_sagas_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function articles_sagas_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { articles_sagas_ownKeys(Object(source), true).forEach(function (key) { articles_sagas_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { articles_sagas_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function articles_sagas_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const fakeDataList = new articles_fakeData(5).getAll();
/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = 'articles'; // change your collection

const ORDER_BY = 'id';
const ORDER = 'desc';

function* loadFromFirestore() {
  try {
    const collectionRef = firebase["b" /* db */].collection(COLLECTION_NAME).where('deleted_at', '==', null).orderBy(ORDER_BY, ORDER);
    const snapshots = yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.getCollection, collectionRef);
    let data = yield Object(effects_["call"])(convertCollectionsSnapshotToMap, snapshots);
    yield Object(effects_["put"])(articles_actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield Object(effects_["put"])(articles_actions.loadFromFireStoreError(error));
  }
}

function* storeIntoFirestore({
  payload
}) {
  const {
    data,
    actionName
  } = payload;

  try {
    switch (actionName) {
      case 'delete':
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          deleted_at: new Date().getTime()
        });
        break;

      case 'update':
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.setDocument, `${COLLECTION_NAME}/${data.key}`, articles_sagas_objectSpread({}, omit_default()(data, ['key'])));
        break;

      default:
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.addDocument, COLLECTION_NAME, data);
        break;
    }

    yield Object(effects_["put"])({
      type: articles_actions.LOAD_FROM_FIRESTORE
    });
  } catch (error) {
    console.log(error);
    yield Object(effects_["put"])(articles_actions.saveIntoFireStoreError(error));
  }
}

function* resetFireStoreDocuments() {
  try {
    yield Object(effects_["call"])(deleteDocuments, COLLECTION_NAME);
    yield Object(effects_["call"])(addCollectionAndDocuments, COLLECTION_NAME, fakeDataList);
    yield Object(effects_["put"])({
      type: articles_actions.LOAD_FROM_FIRESTORE
    });
  } catch (error) {
    console.log(error);
  }
}

function* articles_sagas_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(articles_actions.LOAD_FROM_FIRESTORE, loadFromFirestore), Object(effects_["takeEvery"])(articles_actions.SAVE_INTO_FIRESTORE, storeIntoFirestore), Object(effects_["takeEvery"])(articles_actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments)]);
}
// CONCATENATED MODULE: ./redux/investors/fakeData.js
const fakeData_tableData = JSON.parse(`[{
  "id": "1",
  "name": "John Doe",
  "deleted_at": null,
  "exists_count": "70",
  "investment_count": "100",
  "job_title": "Data Scientist",
  "key": "eradf",
  "location": "New York, USA",
  "company_name": "Apple, Inc"
}, {
  "id": "2",
  "name": "Jae Doe",
  "deleted_at": null,
  "exists_count": "80",
  "investment_count": "100",
  "job_title": "Data Minning Engineer",
  "key": "eradf",
  "location": "Sillicon Valley, USA",
  "company_name": "Uber"
}, {
  "id": "3",
  "name": "Robertson Jane",
  "deleted_at": null,
  "exists_count": "50",
  "investment_count": "60",
  "job_title": "Project Architect",
  "key": "eradf",
  "location": "Mountain View, USA",
  "company_name": "TechCrunch"
}, {
  "id": "4",
  "name": "Jake Baw",
  "deleted_at": null,
  "exists_count": "70",
  "investment_count": "100",
  "job_title": "Sr. Software Engineer",
  "key": "eradf",
  "location": "Hangzhou, Zhejiang, China",
  "company_name": "AliExpress"
}, {
  "id": "5",
  "name": "John Doe",
  "deleted_at": null,
  "exists_count": "1",
  "investment_count": "1",
  "job_title": "CTO",
  "key": "eradf",
  "location": "Dupont Highway, Dover, Delaware, USA",
  "company_name": "RedQ, Inc"
}]`);
const fakeData_sortOption = {};

class investors_fakeData_fakeData {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
  }

  dataModel(index) {
    return fakeData_tableData[index];
  }

  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }

    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }

    return this.datas[index];
  }

  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }

    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }

  getSortAsc(sortKey) {
    fakeData_sortOption.sortKey = sortKey;
    fakeData_sortOption.sortDir = 'ASC';
    return this.datas.sort(this.sort);
  }

  getSortDesc(sortKey) {
    fakeData_sortOption.sortKey = sortKey;
    fakeData_sortOption.sortDir = 'DESC';
    return this.datas.sort(this.sort);
  }

  sort(optionA, optionB) {
    const valueA = optionA[fakeData_sortOption.sortKey].toUpperCase();
    const valueB = optionB[fakeData_sortOption.sortKey].toUpperCase();
    let sortVal = 0;

    if (valueA > valueB) {
      sortVal = 1;
    }

    if (valueA < valueB) {
      sortVal = -1;
    }

    if (sortVal !== 0 && fakeData_sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }

    return sortVal;
  }

}

/* harmony default export */ var investors_fakeData = (investors_fakeData_fakeData);
// CONCATENATED MODULE: ./redux/investors/sagas.js
function investors_sagas_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function investors_sagas_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { investors_sagas_ownKeys(Object(source), true).forEach(function (key) { investors_sagas_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { investors_sagas_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function investors_sagas_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const sagas_fakeDataList = new investors_fakeData(5).getAll();
/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const sagas_COLLECTION_NAME = 'investors'; // change your collection

const sagas_ORDER_BY = 'id';
const sagas_ORDER = 'desc';

function* sagas_loadFromFirestore() {
  try {
    const collectionRef = firebase["b" /* db */].collection(sagas_COLLECTION_NAME).where('deleted_at', '==', null).orderBy(sagas_ORDER_BY, sagas_ORDER);
    const snapshots = yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.getCollection, collectionRef);
    let data = yield Object(effects_["call"])(convertCollectionsSnapshotToMap, snapshots);
    yield Object(effects_["put"])(investors_actions.loadFromFireStoreSuccess(data));
  } catch (error) {
    console.log(error);
    yield Object(effects_["put"])(investors_actions.loadFromFireStoreError(error));
  }
}

function* sagas_storeIntoFirestore({
  payload
}) {
  const {
    data,
    actionName
  } = payload;

  try {
    switch (actionName) {
      case 'delete':
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.setDocument, `${sagas_COLLECTION_NAME}/${data.key}`, {
          deleted_at: new Date().getTime()
        });
        break;

      case 'update':
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.setDocument, `${sagas_COLLECTION_NAME}/${data.key}`, investors_sagas_objectSpread({}, omit_default()(data, ['key'])));
        break;

      default:
        yield Object(effects_["call"])(firebase["d" /* rsf */].firestore.addDocument, sagas_COLLECTION_NAME, data);
        break;
    }

    yield Object(effects_["put"])({
      type: investors_actions.LOAD_FROM_FIRESTORE
    });
  } catch (error) {
    console.log(error);
    yield Object(effects_["put"])(investors_actions.saveIntoFireStoreError(error));
  }
}

function* sagas_resetFireStoreDocuments() {
  try {
    yield Object(effects_["call"])(deleteDocuments, sagas_COLLECTION_NAME);
    yield Object(effects_["call"])(addCollectionAndDocuments, sagas_COLLECTION_NAME, sagas_fakeDataList);
    yield Object(effects_["put"])({
      type: investors_actions.LOAD_FROM_FIRESTORE
    });
  } catch (error) {
    console.log(error);
  }
}

function* investors_sagas_rootSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(investors_actions.LOAD_FROM_FIRESTORE, sagas_loadFromFirestore), Object(effects_["takeEvery"])(investors_actions.SAVE_INTO_FIRESTORE, sagas_storeIntoFirestore), Object(effects_["takeEvery"])(investors_actions.RESET_FIRESTORE_DOCUMENTS, sagas_resetFireStoreDocuments)]);
}
// CONCATENATED MODULE: ./redux/scrumBoard/data.js
const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      column_id: 'column-1',
      title: 'Hello There',
      description: 'Take Out the garbage 1',
      labels: ['default', 'processing', 'warning', 'success'],
      due_date: '2020-01-01',
      assignees: ['mark'],
      attachments: [],
      comments: [],
      todos: [],
      editing: false,
      created_at: '2019-01-01',
      updated_at: ''
    },
    'task-2': {
      id: 'task-2',
      column_id: 'column-1',
      title: 'Hello World',
      description: 'Let Fix The Task manager using Redux 2',
      labels: ['warning', 'error'],
      due_date: '2019-01-01',
      assignees: [],
      attachments: [],
      comments: [],
      todos: [],
      editing: false,
      created_at: '2019-01-01',
      updated_at: ''
    },
    'task-3': {
      id: 'task-3',
      column_id: 'column-1',
      title: 'There',
      description: 'Need Some Study Time To Solve The Problem 3',
      labels: ['processing', 'warning', 'success'],
      due_date: '2019-01-01',
      assignees: ['neamat', 'mim'],
      attachments: [],
      comments: [],
      todos: [],
      editing: false,
      created_at: '2019-01-01',
      updated_at: ''
    },
    'task-4': {
      id: 'task-4',
      column_id: 'column-1',
      title: 'Nothing to do',
      description: 'Let Learn Formik 4',
      labels: ['warning', 'success'],
      due_date: '2019-01-01',
      assignees: [],
      attachments: [],
      comments: [],
      todos: [],
      editing: false,
      created_at: '2019-01-01',
      updated_at: ''
    },
    'task-5': {
      id: 'task-5',
      column_id: 'column-3',
      title: 'Lets Fixed',
      description: 'Come on ... 5',
      labels: ['success', 'warning'],
      due_date: '2020-01-01',
      assignees: ['bob'],
      attachments: [],
      comments: [],
      todos: [],
      editing: false,
      created_at: '2019-01-01',
      updated_at: ''
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      board_id: 'board-1',
      task_orders: ['task-1', 'task-2', 'task-3', 'task-4'],
      title: 'To Do',
      editing: false
    },
    'column-2': {
      id: 'column-2',
      board_id: 'board-2',
      task_orders: [],
      title: 'In Progress',
      editing: false
    },
    'column-3': {
      id: 'column-3',
      board_id: 'board-1',
      task_orders: ['task-5'],
      title: 'Done',
      editing: false
    }
  },
  boards: {
    'board-1': {
      id: 'board-1',
      column_orders: ['column-1', 'column-3'],
      title: 'Isomorphic',
      category: 'Software',
      progress: 50,
      thumb: '',
      open_to_members: false,
      open_to_company: false,
      estimated_time: '',
      editing: false,
      created_at: '2019-01-10',
      updated_at: ''
    },
    'board-2': {
      id: 'board-2',
      column_orders: ['column-2'],
      title: 'Headless',
      category: 'OPs',
      progress: 70,
      thumb: '',
      open_to_members: true,
      open_to_company: true,
      estimated_time: '',
      editing: false,
      created_at: '2019-02-01',
      updated_at: ''
    },
    'board-3': {
      id: 'board-3',
      column_orders: [],
      title: 'React Next Landing',
      category: 'Service Desk',
      progress: 30,
      thumb: '',
      open_to_members: false,
      open_to_company: true,
      estimated_time: '',
      editing: false,
      created_at: '2020-12-03',
      updated_at: ''
    }
  },
  labels: {
    'label-1': {
      id: 'label-1',
      title: 'default',
      color: 'red',
      created_at: '',
      updated_at: '',
      editing: false
    },
    'label-2': {
      id: 'label-2',
      title: 'processing',
      color: 'red',
      created_at: '',
      updated_at: '',
      editing: false
    },
    'label-3': {
      id: 'label-3',
      title: 'warning',
      color: 'red',
      created_at: '',
      updated_at: '',
      editing: false
    },
    'label-4': {
      id: 'label-4',
      title: 'success',
      color: 'red',
      created_at: '',
      updated_at: '',
      editing: false
    },
    'label-5': {
      id: 'label-5',
      title: 'error',
      color: 'red',
      created_at: '',
      updated_at: '',
      editing: false
    }
  }
};
/* harmony default export */ var scrumBoard_data = (initialData);
// CONCATENATED MODULE: ./library/helpers/localStorage.js
// localStorage.js
const loadState = key => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch {// ignore write errors
  }
};
// CONCATENATED MODULE: ./redux/scrumBoard/saga.js
function saga_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function saga_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { saga_ownKeys(Object(source), true).forEach(function (key) { saga_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { saga_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function saga_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// saga.js





const getScrumBoards = state => state.scrumBoard;

function* boardsRenderEffectSaga() {
  let boards;
  let columns;
  let tasks;

  if (localStorage.hasOwnProperty('scrum_boards')) {
    const scrum_boards = loadState('scrum_boards');
    boards = scrum_boards.boards;
    columns = scrum_boards.columns;
    tasks = scrum_boards.tasks;
  } else {
    boards = scrumBoard_data.boards;
    columns = scrumBoard_data.columns;
    tasks = scrumBoard_data.tasks;
  }

  saveState('scrum_boards', {
    boards,
    columns,
    tasks
  });
  yield Object(effects_["put"])(scrumBoard_actions.setBoardsData({
    boards,
    columns,
    tasks
  }));
}

function* boardRenderEffectSaga({
  payload
}) {
  let scrum_boards;
  let boards;
  let columns;
  let tasks;

  if (localStorage.hasOwnProperty('scrum_boards')) {
    scrum_boards = loadState('scrum_boards');
    boards = scrum_boards.boards;
    columns = scrum_boards.columns;
    tasks = scrum_boards.tasks;
  } else {
    scrum_boards = scrumBoard_data;
    boards = scrumBoard_data.boards;
    columns = scrumBoard_data.columns;
    tasks = scrumBoard_data.tasks;
  }

  yield Object(effects_["put"])(scrumBoard_actions.setBoardData({
    boards,
    columns,
    tasks
  }));
}

function* createOrUpdateBoardEffectSaga(action) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);

  const boards = saga_objectSpread(saga_objectSpread({}, scrum_boards.boards), {}, {
    [action.payload.id]: action.payload
  });

  scrum_boards = {
    columns: scrum_boards.columns,
    tasks: scrum_boards.tasks,
    boards: boards
  };
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.createOrUpdateBoard(boards));
}

function* deleteBoardEffectSaga(action) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);

  const BOARDS = saga_objectSpread({}, scrum_boards.boards);

  delete BOARDS[action.payload];
  const boards = BOARDS;
  scrum_boards = saga_objectSpread(saga_objectSpread({}, scrum_boards), {}, {
    boards
  });
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.deleteBoard(boards));
}

function* createOrUpdateColumnEffectSaga({
  payload: {
    column,
    board_id
  }
}) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);
  console.log(column, board_id);

  const columns = saga_objectSpread(saga_objectSpread({}, scrum_boards.columns), {}, {
    [column.id]: saga_objectSpread(saga_objectSpread({}, column), {}, {
      editing: false
    })
  });

  let boards = scrum_boards.boards;

  if (!column.editing) {
    boards = saga_objectSpread(saga_objectSpread({}, scrum_boards.boards), {}, {
      [board_id]: saga_objectSpread(saga_objectSpread({}, scrum_boards.boards[board_id]), {}, {
        column_orders: [...scrum_boards.boards[board_id].column_orders, column.id]
      })
    });
  }

  scrum_boards = saga_objectSpread(saga_objectSpread({}, scrum_boards), {}, {
    columns,
    boards
  });
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.createOrUpdateColumn({
    columns,
    boards
  }));
}

function* deleteColumnEffectSaga({
  payload: {
    column_id,
    board_id
  }
}) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);

  const COLUMNS = saga_objectSpread({}, scrum_boards.columns);

  delete COLUMNS[column_id];
  const columns = COLUMNS;

  const boards = saga_objectSpread(saga_objectSpread({}, scrum_boards.boards), {}, {
    [board_id]: saga_objectSpread(saga_objectSpread({}, scrum_boards.boards[board_id]), {}, {
      column_orders: scrum_boards.boards[board_id].column_orders.filter(order => order !== column_id)
    })
  });

  scrum_boards = saga_objectSpread(saga_objectSpread({}, scrum_boards), {}, {
    columns,
    boards
  });
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.deleteColumn({
    columns,
    boards
  }));
}

function* moveColumnEffectSaga({
  payload: {
    board_id,
    column_orders
  }
}) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);

  const boards = saga_objectSpread(saga_objectSpread({}, scrum_boards.boards), {}, {
    [board_id]: saga_objectSpread(saga_objectSpread({}, scrum_boards.boards[board_id]), {}, {
      column_orders: column_orders
    })
  });

  scrum_boards = saga_objectSpread(saga_objectSpread({}, scrum_boards), {}, {
    boards: boards
  });
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.setMovedColumn(boards));
}

function* createOrUpdateTaskEffectSaga(action) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);

  const tasks = saga_objectSpread(saga_objectSpread({}, scrum_boards.tasks), {}, {
    [action.payload.id]: saga_objectSpread(saga_objectSpread({}, action.payload), {}, {
      editing: false
    })
  });

  let columns = scrum_boards.columns;

  if (!action.payload.editing) {
    columns = saga_objectSpread(saga_objectSpread({}, scrum_boards.columns), {}, {
      [action.payload.column_id]: saga_objectSpread(saga_objectSpread({}, scrum_boards.columns[action.payload.column_id]), {}, {
        task_orders: [...scrum_boards.columns[action.payload.column_id].task_orders, action.payload.id]
      })
    });
  }

  scrum_boards = {
    columns: columns,
    tasks: tasks,
    boards: scrum_boards.boards
  };
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.createOrUpdateTask({
    tasks,
    columns
  }));
}

function* deleteTaskEffectSaga({
  payload: {
    task_id,
    column_id
  }
}) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);
  const tasks = Object.keys(scrum_boards.tasks).reduce((object, key) => {
    if (key !== task_id) {
      object[key] = scrum_boards.tasks[key];
    }

    return object;
  }, {});

  const columns = saga_objectSpread(saga_objectSpread({}, scrum_boards.columns), {}, {
    [column_id]: saga_objectSpread(saga_objectSpread({}, scrum_boards.columns[column_id]), {}, {
      task_orders: scrum_boards.columns[column_id].task_orders.filter(order => order !== task_id)
    })
  });

  scrum_boards = {
    columns: columns,
    tasks: tasks,
    boards: scrum_boards.boards
  };
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.deleteTask({
    columns,
    tasks
  }));
}

function* moveTaskEffectSaga({
  payload: {
    tasks,
    columns
  }
}) {
  let scrum_boards = yield Object(effects_["select"])(getScrumBoards);
  scrum_boards = {
    columns: columns,
    tasks: tasks,
    boards: scrum_boards.boards
  };
  saveState('scrum_boards', scrum_boards);
  yield Object(effects_["put"])(scrumBoard_actions.setMovedTask({
    columns,
    tasks
  }));
}

function* scrumBoardSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(scrumBoard_actions.LOAD_BOARDS_DATA_SAGA, boardsRenderEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.LOAD_CURRENT_BOARD_DATA_SAGA, boardRenderEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.CREATE_OR_UPDATE_BOARD_WATCHER, createOrUpdateBoardEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.DELETE_BOARD_WATCHER, deleteBoardEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.CREATE_OR_UPDATE_COLUMN_WATCHER, createOrUpdateColumnEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.DELETE_COLUMN_WATCHER, deleteColumnEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.MOVE_COLUMN_WATCHER, moveColumnEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.CREATE_OR_UPDATE_TASK_WATCHER, createOrUpdateTaskEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.DELETE_TASK_WATCHER, deleteTaskEffectSaga), Object(effects_["takeEvery"])(scrumBoard_actions.MOVE_TASK_WATCHER, moveTaskEffectSaga)]);
}
// CONCATENATED MODULE: ./redux/quiz/fakeQuestion.js
/* harmony default export */ var fakeQuestion = ({
  title: 'Which is not in the following?',
  total: 5,
  time: '30 Minutes',
  data: [{
    id: 1,
    question: 'Which one is not a sports?',
    type: 'single',
    showAnswer: false,
    options: [{
      value: 'football',
      label: 'Football'
    }, {
      value: 'volleyball',
      label: 'Volleyball'
    }, {
      value: 'baseball',
      label: 'Baseball'
    }, {
      value: 'lutuputu',
      label: 'Lutuputu'
    }],
    answers: 'lutuputu'
  }, {
    id: 2,
    type: 'single',
    question: 'Which one is not a programming language?',
    options: [{
      value: 'c#',
      label: 'C#'
    }, {
      value: 'java',
      label: 'Java'
    }, {
      value: 'php',
      label: 'PHP'
    }, {
      value: 'reactjs',
      label: 'React.JS'
    }],
    answers: 'reactjs'
  }, {
    id: 3,
    type: 'single',
    question: 'Which is not a HTML attributes?',
    options: [{
      value: 'title',
      label: 'title'
    }, {
      value: 'style',
      label: 'style'
    }, {
      value: 'onclick',
      label: 'onclick'
    }, {
      value: 'meta',
      label: 'meta'
    }],
    answers: 'meta'
  }, {
    id: 4,
    type: 'multiple',
    question: 'Powerful Javascript framework is?',
    options: [{
      value: 'laravel',
      label: 'Laravel'
    }, {
      value: 'angular',
      label: 'Angular'
    }, {
      value: 'symphony',
      label: 'Symphony'
    }, {
      value: 'react',
      label: 'React'
    }],
    answers: ['angular', 'react']
  }, {
    id: 5,
    type: 'single',
    question: 'Which is not a PHP framework?',
    options: [{
      value: 'symphony',
      label: 'Symphony'
    }, {
      value: 'laravel',
      label: 'Laravel'
    }, {
      value: 'codeigniter',
      label: 'Codeigniter'
    }, {
      value: 'django',
      label: 'django'
    }],
    answers: 'django'
  }]
});
// CONCATENATED MODULE: ./redux/quiz/fakeQuizes.js
/* harmony default export */ var fakeQuizes = ({
  page: 1,
  data: [{
    title: 'Which is not in the following?',
    slug: 'which-is-not-in-the-following',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
    thumbnail: 'https://via.placeholder.com/150'
  }, {
    title: 'Basic HTML test',
    slug: 'basic-html-test',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
    thumbnail: 'https://via.placeholder.com/150'
  }, {
    title: 'Advanced PHP test',
    slug: 'advanced-php-test',
    description: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
    thumbnail: 'https://via.placeholder.com/150'
  }]
});
// CONCATENATED MODULE: ./redux/quiz/saga.js
// saga.js





const getQuizes = state => state.quiz;

function* questionRenderEffectSaga() {
  let questons;
  questons = fakeQuestion;
  yield Object(effects_["put"])(quiz_actions.setQuestionData(questons));
}

function* quizRenderEffectSaga() {
  let quizes;
  quizes = fakeQuizes;
  yield Object(effects_["put"])(quiz_actions.setQuizData(quizes));
}

function* questionSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(quiz_actions.GET_QUESTION_DATA, questionRenderEffectSaga), Object(effects_["takeEvery"])(quiz_actions.GET_QUIZ_DATA, quizRenderEffectSaga)]);
}
// EXTERNAL MODULE: ./assets/images/user1.png
var user1 = __webpack_require__("LPF2");
var user1_default = /*#__PURE__*/__webpack_require__.n(user1);

// EXTERNAL MODULE: ./assets/images/profile-bg.jpg
var profile_bg = __webpack_require__("D52c");
var profile_bg_default = /*#__PURE__*/__webpack_require__.n(profile_bg);

// EXTERNAL MODULE: ./assets/images/posts/1.png
var _1 = __webpack_require__("8209");
var _1_default = /*#__PURE__*/__webpack_require__.n(_1);

// EXTERNAL MODULE: ./assets/images/posts/2.png
var _2 = __webpack_require__("FP+S");
var _2_default = /*#__PURE__*/__webpack_require__.n(_2);

// EXTERNAL MODULE: ./assets/images/posts/3.png
var _3 = __webpack_require__("REkD");
var _3_default = /*#__PURE__*/__webpack_require__.n(_3);

// EXTERNAL MODULE: ./assets/images/posts/4.png
var _4 = __webpack_require__("eV3Q");
var _4_default = /*#__PURE__*/__webpack_require__.n(_4);

// EXTERNAL MODULE: ./assets/images/posts/5.png
var _5 = __webpack_require__("yeFQ");
var _5_default = /*#__PURE__*/__webpack_require__.n(_5);

// EXTERNAL MODULE: ./assets/images/posts/6.png
var _6 = __webpack_require__("9ryz");
var _6_default = /*#__PURE__*/__webpack_require__.n(_6);

// EXTERNAL MODULE: ./assets/images/posts/7.png
var _7 = __webpack_require__("L7v+");
var _7_default = /*#__PURE__*/__webpack_require__.n(_7);

// EXTERNAL MODULE: ./assets/images/posts/8.png
var _8 = __webpack_require__("CEX1");
var _8_default = /*#__PURE__*/__webpack_require__.n(_8);

// EXTERNAL MODULE: ./assets/images/posts/9.png
var _9 = __webpack_require__("SPb+");
var _9_default = /*#__PURE__*/__webpack_require__.n(_9);

// EXTERNAL MODULE: ./assets/images/posts/10.png
var _10 = __webpack_require__("uYSz");
var _10_default = /*#__PURE__*/__webpack_require__.n(_10);

// EXTERNAL MODULE: ./assets/images/posts/11.png
var _11 = __webpack_require__("n5ik");
var _11_default = /*#__PURE__*/__webpack_require__.n(_11);

// CONCATENATED MODULE: ./redux/profile/profile.data.js

 // posts












const profileData = {
  id: 1,
  name: 'Samwell Martina',
  username: '@samwell_martina',
  avatar: user1_default.a,
  profile_bg: profile_bg_default.a,
  post: [{
    id: 1,
    type: 'image',
    thumb_url: _1_default.a,
    numberOflike: '21',
    numberOfcomment: '8',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'Hey. This is so dope',
      time: '133w'
    }]
  }, {
    id: 2,
    type: 'gallery',
    thumb_url: _2_default.a,
    gallery: [_2_default.a, _11_default.a, _6_default.a],
    numberOflike: '34',
    numberOfcomment: '2',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: '💪 😊 👍 🏆',
      time: '133w'
    }, {
      id: 3,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: '@jenny_doe',
      comment: 'wow!! 👌👌😍😍',
      time: '133w'
    }]
  }, {
    id: 3,
    type: 'video',
    thumb_url: _9_default.a,
    video: `<iframe src="https://player.vimeo.com/video/359281775?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
    numberOfView: '134',
    numberOflike: '47',
    numberOfcomment: '48',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!',
      time: '133w'
    }]
  }, {
    id: 4,
    type: 'image',
    thumb_url: _3_default.a,
    numberOflike: '21',
    numberOfcomment: '8',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'Hey. This is so dope',
      time: '133w'
    }]
  }, {
    id: 5,
    type: 'image',
    thumb_url: _4_default.a,
    numberOflike: '34',
    numberOfcomment: '2',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: '💪 😊 👍 🏆',
      time: '133w'
    }, {
      id: 3,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: '@jenny_doe',
      comment: 'wow!! 👌👌😍😍',
      time: '133w'
    }]
  }, {
    id: 6,
    type: 'image',
    thumb_url: _5_default.a,
    numberOflike: '47',
    numberOfcomment: '48',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!',
      time: '133w'
    }]
  }, {
    id: 7,
    type: 'gallery',
    thumb_url: _7_default.a,
    gallery: [_7_default.a, _5_default.a, _9_default.a],
    numberOflike: '34',
    numberOfcomment: '2',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: '💪 😊 👍 🏆',
      time: '133w'
    }, {
      id: 3,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      username: '@jenny_doe',
      comment: 'wow!! 👌👌😍😍',
      time: '133w'
    }]
  }, {
    id: 8,
    type: 'video',
    thumb_url: _8_default.a,
    video: `<iframe src="https://player.vimeo.com/video/35396305?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
    numberOfView: '134',
    numberOflike: '47',
    numberOfcomment: '48',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!',
      time: '133w'
    }]
  }, {
    id: 9,
    type: 'image',
    thumb_url: _10_default.a,
    numberOflike: '21',
    numberOfcomment: '8',
    comments: [{
      id: 1,
      role: 'author',
      avatar: user1_default.a,
      username: '@samwell_martina',
      comment: 'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
      time: '133w'
    }, {
      id: 2,
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      username: '@jon_doe',
      comment: 'Hey. This is so dope',
      time: '133w'
    }]
  }],
  followers: [{
    id: 1,
    avatar: 'https://pbs.twimg.com/profile_images/974603248119222272/N5PLzyan.jpg',
    name: 'Nykyta Korotkevych'
  }, {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Christine Maldonado'
  }, {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Konsta Peura'
  }, {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    name: 'Britney Cooper'
  }, {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    name: 'Eduardo Hernandez'
  }, {
    id: 6,
    avatar: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ@@._V1_UY256_CR5,0,172,256_AL_.jpg',
    name: ' Elizabeth Olsen'
  }, {
    id: 7,
    avatar: 'https://pbs.twimg.com/profile_images/1079706442763067392/wuaeGZnN.jpg',
    name: 'Hrvoje Šimić'
  }, {
    id: 8,
    avatar: 'https://images.pexels.com/photos/247885/pexels-photo-247885.jpeg?h=350&auto=compress&cs=tinysrgb',
    name: 'Monroe Bond'
  }],
  following: [{
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
    name: 'Eduardo Hernandez'
  }, {
    id: 2,
    avatar: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ@@._V1_UY256_CR5,0,172,256_AL_.jpg',
    name: ' Elizabeth Olsen'
  }, {
    id: 3,
    avatar: 'https://pbs.twimg.com/profile_images/1079706442763067392/wuaeGZnN.jpg',
    name: 'Hrvoje Šimić'
  }, {
    id: 4,
    avatar: 'https://images.pexels.com/photos/247885/pexels-photo-247885.jpeg?h=350&auto=compress&cs=tinysrgb',
    name: 'Monroe Bond'
  }, {
    id: 5,
    avatar: 'https://pbs.twimg.com/profile_images/974603248119222272/N5PLzyan.jpg',
    name: 'Nykyta Korotkevych'
  }, {
    id: 6,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Christine Maldonado'
  }, {
    id: 7,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Konsta Peura'
  }, {
    id: 8,
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    name: 'Britney Cooper'
  }, {
    id: 9,
    avatar: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMjA0ODk1OF5BMl5BanBnXkFtZTcwMTA4ODM3OQ@@._V1_UY256_CR5,0,172,256_AL_.jpg',
    name: ' Elizabeth Olsen'
  }, {
    id: 10,
    avatar: 'https://pbs.twimg.com/profile_images/1079706442763067392/wuaeGZnN.jpg',
    name: 'Hrvoje Šimić'
  }, {
    id: 11,
    avatar: 'https://images.pexels.com/photos/247885/pexels-photo-247885.jpeg?h=350&auto=compress&cs=tinysrgb',
    name: 'Monroe Bond'
  }, {
    id: 12,
    avatar: 'https://pbs.twimg.com/profile_images/974603248119222272/N5PLzyan.jpg',
    name: 'Nykyta Korotkevych'
  }, {
    id: 13,
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Christine Maldonado'
  }, {
    id: 14,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Konsta Peura'
  }]
};
/* harmony default export */ var profile_data = (profileData);
// CONCATENATED MODULE: ./redux/profile/saga.js
// saga.js




function* fetchProfileDataEffect() {
  try {
    let profile = profile_data;
    yield Object(effects_["put"])(profile_actions.fetchProfileDataSuccess(profile));
  } catch (error) {
    yield Object(effects_["put"])(profile_actions.fetchProfileDataFailure(error));
  }
}

function* profileSaga() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(profile_actions.FETCH_PROFILE_DATA_START, fetchProfileDataEffect)]);
}
// CONCATENATED MODULE: ./redux/root-saga.js

















function* root_saga_rootSaga(getState) {
  yield Object(effects_["all"])([rootSaga(), saga_rootSaga(), mail_saga_rootSaga(), notes_saga_rootSaga(), todos_saga_rootSaga(), Saga(), card_saga_rootSaga(), invoice_saga_rootSaga(), sagas_rootSaga(), youtubeSearch_sagas_rootSaga(), articles_sagas_rootSaga(), investors_sagas_rootSaga(), scrumBoardSaga(), questionSaga(), profileSaga(), githubSearch_sagas_rootSaga()]);
}
// CONCATENATED MODULE: ./redux/store.js





const sagaMiddleware = external_redux_saga_default()();

const bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function configureStore(initialState = {}) {
  const store = Object(external_redux_["createStore"])(root_reducer, initialState, bindMiddleware([external_redux_thunk_default.a, sagaMiddleware]));

  store.runSaga = () => {
    // Avoid running twice
    if (store.saga) return;
    store.saga = sagaMiddleware.run(root_saga_rootSaga);
  };

  store.stopSaga = async () => {
    // Avoid running twice
    if (!store.saga) return;
    store.dispatch(external_redux_saga_["END"]);
    await store.saga.done;
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    // run saga
    store.runSaga(); // dispatch saga tasks

    tasks(store.dispatch); // Stop running and wait for the tasks to be done

    await store.stopSaga(); // Re-run on client side

    if (!isServer) {
      store.runSaga();
    }
  }; // Initial run


  store.runSaga();
  return store;
}

/* harmony default export */ var redux_store = (configureStore);
// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__("TpwP");

// EXTERNAL MODULE: ./node_modules/@glidejs/glide/dist/css/glide.core.min.css
var glide_core_min = __webpack_require__("TSG6");

// EXTERNAL MODULE: ./node_modules/react-quill/dist/quill.snow.css
var quill_snow = __webpack_require__("91UR");

// EXTERNAL MODULE: ./node_modules/react-quill/dist/quill.core.css
var quill_core = __webpack_require__("cBUL");

// EXTERNAL MODULE: ./style/global.css
var global = __webpack_require__("EFYt");

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__("+eM2");

// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__("jDDT");

// EXTERNAL MODULE: external "react-toastify"
var external_react_toastify_ = __webpack_require__("oAEb");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "nookies"
var external_nookies_ = __webpack_require__("kG9d");
var external_nookies_default = /*#__PURE__*/__webpack_require__.n(external_nookies_);

// CONCATENATED MODULE: ./components/Middleware.js






function Middleware({
  children
}) {
  const cookies = external_nookies_default.a.get(null);
  const token = cookies.token;
  const router = Object(router_["useRouter"])();
  Object(external_react_["useEffect"])(async () => {
    const firstPath = router.pathname.split("/")[1];
    let isValid = await istokenValid(token);

    if (!isValid) {
      router.push("/");
    }

    if (firstPath === "dashboard" && !token) {
      router.push("/");
    } else {
      if (token && firstPath === "") {
        router.push("/dashboard");
      }
    }
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(jsx_runtime_["Fragment"], {
    children: children
  });
}

const istokenValid = async token => {
  const endpoint = "https://js-strapi.keelola.net/api" + `/products`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    return true;
  } else {
    return false;
  }
};

/* harmony default export */ var components_Middleware = (Middleware);
// CONCATENATED MODULE: ./pages/_app.js
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





















class _app_CustomApp extends app_default.a {
  render() {
    const {
      Component,
      pageProps,
      store
    } = this.props;
    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_redux_["Provider"], {
      store: store,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(AppProvider, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Middleware, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _app_objectSpread({}, pageProps))
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_toastify_["ToastContainer"], {
          toastStyle: {
            backgroundColor: "black",
            color: "white"
          }
        })]
      })
    });
  }

}

/* harmony default export */ var _app = __webpack_exports__["default"] = (external_next_redux_wrapper_default()(redux_store)(_app_CustomApp));

/***/ }),

/***/ "1fKG":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "27qp":
/***/ (function(module, exports) {

module.exports = require("antd/lib/popover");

/***/ }),

/***/ "2TDg":
/***/ (function(module, exports) {

module.exports = require("lodash/omit");

/***/ }),

/***/ "3HCa":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.swiperslider\":\"滑塊\",\"sidebar.email\":\"电子邮件\",\"sidebar.chat\":\"聊\",\"sidebar.ecommerce\":\"电子商务\",\"sidebar.shop\":\"店\",\"sidebar.cart\":\"大车\",\"sidebar.checkout\":\"查看\",\"sidebar.cards\":\"牌\",\"sidebar.maps\":\"地图\",\"sidebar.googleMap\":\"谷歌地图\",\"sidebar.leafletMap\":\"传单地图\",\"sidebar.calendar\":\"日历\",\"sidebar.notes\":\"笔记\",\"sidebar.todos\":\"待办事项\",\"sidebar.contacts\":\"往来\",\"sidebar.shuffle\":\"拖曳\",\"sidebar.charts\":\"图表\",\"sidebar.googleCharts\":\"Google购物车\",\"sidebar.recharts\":\"重新图表\",\"sidebar.reactVis\":\"反应可见\",\"sidebar.reactChart2\":\"反应 - 图2\",\"sidebar.reactTrend\":\"反应-趋势\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"形式\",\"sidebar.input\":\"输入\",\"sidebar.editor\":\"编辑\",\"sidebar.formsWithValidation\":\"验证形式\",\"sidebar.progress\":\"进展\",\"sidebar.button\":\"按键\",\"sidebar.tab\":\"标签\",\"sidebar.checkbox\":\"复选框\",\"sidebar.radiobox\":\"收音机盒\",\"sidebar.transfer\":\"转让\",\"sidebar.autocomplete\":\"自动完成\",\"sidebar.boxOptions\":\"框选项\",\"sidebar.uiElements\":\"UI元素\",\"sidebar.badge\":\"徽章\",\"sidebar.card2\":\"卡\",\"sidebar.corusel\":\"狂欢游行\",\"sidebar.collapse\":\"坍方\",\"sidebar.popover\":\"流行\",\"sidebar.tooltip\":\"提示\",\"sidebar.tag\":\"标签\",\"sidebar.timeline\":\"时间线\",\"sidebar.dropdown\":\"落下\",\"sidebar.pagination\":\"分页\",\"sidebar.rating\":\"评分\",\"sidebar.tree\":\"树\",\"sidebar.advancedElements\":\"高级元素\",\"sidebar.reactDates\":\"反应日期\",\"sidebar.codeMirror\":\"代码镜\",\"sidebar.uppy\":\"Uppy上传器\",\"sidebar.dropzone\":\"拖放区\",\"sidebar.feedback\":\"反馈\",\"sidebar.alert\":\"警报\",\"sidebar.modal\":\"语气\",\"sidebar.message\":\"信息\",\"sidebar.notification\":\"通知\",\"sidebar.popConfirm\":\"流行确认\",\"sidebar.spin\":\"纺\",\"sidebar.tables\":\"表\",\"sidebar.antTables\":\"蚂蚁表\",\"sidebar.pages\":\"网页\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"签到\",\"sidebar.signUp\":\"注册\",\"sidebar.forgotPw\":\"忘记密码\",\"sidebar.resetPw\":\"重置密码\",\"sidebar.invoice\":\"发票\",\"sidebar.menuLevels\":\"菜单级别\",\"sidebar.item1\":\"项目1\",\"sidebar.item2\":\"项目2\",\"sidebar.option1\":\"选项1\",\"sidebar.option2\":\"选项2\",\"sidebar.option3\":\"选项3\",\"sidebar.option4\":\"选项4\",\"sidebar.blankPage\":\"空白页\",\"sidebar.githubSearch\":\"Github搜索\",\"sidebar.youtubeSearch\":\"Youtube搜索\",\"languageSwitcher.label\":\"改变语言\",\"themeSwitcher\":\"主题切换器\",\"themeSwitcher.Sidebar\":\"侧边栏\",\"themeSwitcher.Topbar\":\"顶栏\",\"themeSwitcher.Background\":\"背景\",\"feedback.alert.basicTitle\":\"基本标题\",\"feedback.alert.successText\":\"成功文本\",\"feedback.alert.infoText\":\"信息文本\",\"feedback.alert.warningText\":\"警告文字\",\"feedback.alert.errorText\":\"错误文本\",\"feedback.alert.closableAlertType\":\"可关闭警报类型\",\"feedback.alert.iconAlertType\":\"图标警报类型\",\"feedback.alert.iconInfoAlertType\":\"图标信息警报类型\",\"feedback.alert.successTips\":\"成功提示\",\"feedback.alert.successTipsDescription\":\"关于成功写作的详细描述和建议。\",\"feedback.alert.informationTips\":\"信息备注\",\"feedback.alert.informationDescription\":\"关于文案的附加说明和信息。\",\"feedback.alert.warningTips\":\"警告\",\"feedback.alert.warningDescription\":\"这是关于文案的警告通知。\",\"feedback.alert.errorTips\":\"错误\",\"feedback.alert.errorDescription\":\"这是关于文案的错误信息。\",\"feedback.alert.modalTitle\":\"具有自定义页脚的模态\",\"feedback.alert.modalSubTitle\":\"基本模态对话框\",\"feedback.alert.successTitle\":\"成功\",\"feedback.alert.infoTitle\":\"信息\",\"feedback.alert.errorTitle\":\"错误\",\"feedback.alert.warningTitle\":\"警告\",\"feedback.alert.modalBlockTitle\":\"语气\",\"feedback.alert.confirmationModalDialogue\":\"确认模态对话框\",\"feedback.alert.simpleModalDialogue\":\"简单的模态对话框\",\"feedback.alert.message\":\"信息\",\"feedback.alert.normalMessageTitle\":\"正常讯息\",\"feedback.alert.normalMessageSubtitle\":\"正常消息作为反馈。\",\"feedback.alert.displayMessage\":\"显示正常消息\",\"feedback.alert.displayOtherTypeMessageTitle\":\"其他类型的消息\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"消息的成功，错误和警告类型。\",\"feedback.alert.customizeDurationTitle\":\"自定义持续时间\",\"feedback.alert.customizeDurationSubTitle\":\"自定义消息显示持续时间从默认值1.5s到10s。\",\"feedback.alert.customizeDurationButton\":\"定制显示持续时间\",\"feedback.alert.messageLoadingTitle\":\"加载消息\",\"feedback.alert.messageLoadingSubTitle\":\"显示一个全局加载指示器，它自身被异步地关闭。\",\"feedback.alert.displayLoadIndicator\":\"显示装载指示灯\",\"feedback.alert.notification\":\"通知\",\"feedback.alert.notificationBasicTitle\":\"基本\",\"feedback.alert.notificationBasicSubTitle\":\"4.5s后关闭通知框的最简单的用法。\",\"feedback.alert.notificationBasicDescription\":\"打开通知框\",\"feedback.alert.notificationDurationTitle\":\"通知框关闭之后的时间\",\"feedback.alert.notificationDurationSubTitle\":\"持续时间可用于指定通知保持打开的时间。持续时间过后，通知自动关闭。如果未指定，默认值为4.5秒。如果将值设置为0，则通知框将永远不会自动关闭。\",\"feedback.alert.notificationwithIconTitle\":\"通知图标\",\"feedback.alert.notificationwithIconSubTitle\":\"具有左侧图标的通知框。\",\"feedback.alert.notificationwithCustomIconTitle\":\"通知与自定义图标\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"正常消息作为反馈。\",\"feedback.alert.notificationwithCustomButtonTitle\":\"通知使用自定义按钮\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"正常消息作为反馈。\",\"feedback.alert.popConfirm\":\"流行确认\",\"feedback.alert.popConfirm.basicTitle\":\"基本确认\",\"feedback.alert.popConfirm.basicSubTitle\":\"的基本例子。\",\"feedback.alert.popConfirm.delete\":\"删除\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"通知与自定义图标\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"正常消息作为反馈。\",\"feedback.alert.popConfirm.TL\":\"TL\",\"feedback.alert.popConfirm.top\":\"最佳\",\"feedback.alert.popConfirm.TR\":\"TR\",\"feedback.alert.popConfirm.LT\":\"LT\",\"feedback.alert.popConfirm.left\":\"剩下\",\"feedback.alert.popConfirm.LB\":\"磅\",\"feedback.alert.popConfirm.RT\":\"RT\",\"feedback.alert.popConfirm.right\":\"对\",\"feedback.alert.popConfirm.RB\":\"RB\",\"feedback.alert.popConfirm.Bl\":\"BL\",\"feedback.alert.popConfirm.bottom\":\"底部\",\"feedback.alert.popConfirm.BR\":\"BR\",\"feedback.alert.spin\":\"纺\",\"feedback.alert.spin.basicTitle\":\"尺寸旋转\",\"feedback.alert.spin.background\":\"旋转背景\",\"feedback.alert.spin.backgroundDescription\":\"旋转背景描述\",\"feedback.alert.spin.loadingState\":\"装载状态：\",\"feedback.alert.spin.alertTitle\":\"提醒消息标题\",\"feedback.alert.spin.alertDescription\":\"有关此警报的上下文的更多详细信息。\",\"forms.input.header\":\"输入\",\"forms.input.basicTitle\":\"基本用法\",\"forms.input.basicSubTitle\":\"基本使用示例。\",\"forms.input.variationsTitle\":\"三种尺寸的输入\",\"forms.input.variationsSubtitle\":\"输入框有三种尺寸：大（42像素），默认（35像素）和小（30像素）。注意：在表格内部，只使用大尺寸。\",\"forms.input.groupTitle\":\"输入组\",\"forms.input.groupSubTitle\":\"Input.Group示例注意：您不需要Col来控制紧凑模式下的宽度。\",\"forms.input.autoSizingTitle\":\"自动调整高度以适应内容\",\"forms.input.autoSizingSubTitle\":\"对于textarea类型的输入，autosize prop可以根据内容自动调整高度。可以提供一个选项对象来自动调整，以指定textarea将自动调整的最小和最大行数。\",\"forms.input.prePostTabTitle\":\"前  后选项卡\",\"forms.input.prePostTabSubTitle\":\"使用前＆amp;帖子标签示例..\",\"forms.input.textAreaTitle\":\"多行文本\",\"forms.input.textAreaSubTitle\":\"对于多行用户输入案例，可以使用类型prop具有textarea值的输入。\",\"forms.input.searchTitle\":\"搜索\",\"forms.input.searchSubTitle\":\"通过使用搜索按钮对标准输入进行分组来创建搜索框的示例\",\"forms.editor.header\":\"编辑\",\"forms.formsWithValidation.header\":\"定制验证表\",\"forms.formsWithValidation.failLabel\":\"失败\",\"forms.formsWithValidation.failHelp\":\"应该是数字＆amp;字母\",\"forms.formsWithValidation.warningLabel\":\"警告\",\"forms.formsWithValidation.ValidatingLabel\":\"证实\",\"forms.formsWithValidation.ValidatingHelp\":\"信息正在验证...\",\"forms.formsWithValidation.SuccessLabel\":\"成功\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"警告\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"失败\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"应该是数字＆amp;字母\",\"forms.progressBar.header\":\"进度条\",\"forms.progressBar.standardTitle\":\"进度条\",\"forms.progressBar.standardSubTitle\":\"标准进度条。\",\"forms.progressBar.circularTitle\":\"循环进度栏\",\"forms.progressBar.circularSubTitle\":\"一个循环进度条。\",\"forms.progressBar.miniTitle\":\"迷你尺寸进度条\",\"forms.progressBar.miniSubTitle\":\"适合狭窄的地区。\",\"forms.progressBar.miniCircularTitle\":\"一个较小的圆形进度条。\",\"forms.progressBar.dynamicCircularTitle\":\"动态循环进度条\",\"forms.progressBar.dynamicCircularSubTitle\":\"动态进度条更好。\",\"forms.progressBar.customTextTitle\":\"自定义文本格式\",\"forms.progressBar.customTextSubTitle\":\"您可以通过设置格式自定义文本格式。\",\"forms.progressBar.dashboardTitle\":\"仪表板\",\"forms.progressBar.dashboardSubTitle\":\"仪表板风格的进步。\",\"forms.button.header\":\"纽扣\",\"forms.button.simpleButton\":\"按钮类型\",\"forms.button.iconButton\":\"按钮图标\",\"forms.button.simpleButtonPrimaryText\":\"主\",\"forms.button.simpleButtonDefaultText\":\"默认\",\"forms.button.simpleButtonDashedText\":\"虚线\",\"forms.button.simpleButtonDangerText\":\"危险\",\"forms.button.iconPrimaryButton\":\"搜索\",\"forms.button.iconSimpleButton\":\"搜索\",\"forms.button.iconCirculerButton\":\"搜索\",\"forms.button.iconDashedButton\":\"搜索\",\"forms.button.SizedButton\":\"按钮大小\",\"forms.button.DisabledButton\":\"按钮禁用\",\"forms.button.LoadingButton\":\"按钮加载\",\"forms.button.MultipleButton\":\"多重按钮\",\"forms.button.groupButton\":\"按钮组\",\"forms.Tabs.header\":\"标签\",\"forms.Tabs.simpleTabTitle\":\"搜索\",\"forms.Tabs.simpleTabSubTitle\":\"禁用标签\",\"forms.Tabs.iconTabTitle\":\"图标标签\",\"forms.Tabs.miniTabTitle\":\"迷你标签\",\"forms.Tabs.extraTabTitle\":\"额外动作标签\",\"forms.Tabs.TabpositionTitle\":\"位置\",\"forms.Tabs.TabpositionSubTitle\":\"标签的位置：左，右，上或下\",\"forms.Tabs.cardTitle\":\"卡类型选项卡\",\"forms.Tabs.editableTitle\":\"添加和关闭选项卡\",\"forms.Tabs.verticalTitle\":\"垂直类型标签\",\"forms.Tabs.basicTitle\":\"基本标签\",\"forms.checkbox.header\":\"复选框\",\"forms.checkbox.basicTitle\":\"基本复选框\",\"forms.checkbox.basicSubTitle\":\"复选框的基本用法\",\"forms.checkbox.groupTitle\":\"复选框组\",\"forms.checkbox.groupSubTitle\":\"从数组生成一组复选框。禁用此功能可禁用复选框。\",\"forms.checkbox.groupCheckTitle\":\"复选框组\",\"forms.checkbox.groupCheckSubTitle\":\"从数组生成一组复选框。禁用此功能可禁用复选框。\",\"forms.radio.header\":\"无线电\",\"forms.radio.simpleTitle\":\"基本电台\",\"forms.radio.simpleSubTitle\":\"最简单的用法禁用禁用广播。\",\"forms.radio.groupTitle\":\"垂直无线电组\",\"forms.radio.groupSubTitle\":\"垂直无线电组，更多收音机。\",\"forms.radio.groupSecondTitle\":\"RadioGroup中\",\"forms.radio.groupSecondSubTitle\":\"一组无线电组件。\",\"forms.radio.groupThirdTitle\":\"RadioGroup中\",\"forms.radio.groupThirdSubTitle\":\"一组无线电组件。\",\"forms.transfer.header\":\"转让\",\"forms.transfer.SubTitle\":\"使用搜索框转移。\",\"forms.transfer.Title\":\"搜索\",\"forms.autocomplete.header\":\"自动完成\",\"forms.autocomplete.simpleTitle\":\"定制\",\"forms.autocomplete.simpleSubTitle\":\"您可以将AutoComplete.Option作为AutoComplete的子代码，而不是使用dataSource\",\"forms.autocomplete.customizeTitle\":\"自定义输入组件\",\"forms.autocomplete.customizeSubTitle\":\"自定义输入组件\",\"uiElements.badge.badge\":\"徽章\",\"uiElements.badge.basicExample\":\"基本例子\",\"uiElements.badge.basicExampleSubTitle\":\"最简单的用法当count为0时，徽章将被隐藏，但是我们可以使用showZero来显示。\",\"uiElements.badge.overflowCount\":\"溢出计数\",\"uiElements.badge.overflowCountSubTitle\":\"当count大于overflowCount时，会显示OverflowCount。 overflowCount的默认值为99。\",\"uiElements.badge.status\":\"状态\",\"uiElements.badge.statusSubTitle\":\"独立徽章与状态。\",\"uiElements.badge.success\":\"成功\",\"uiElements.badge.error\":\"错误\",\"uiElements.badge.default\":\"默认\",\"uiElements.badge.processing\":\"处理\",\"uiElements.badge.warning\":\"警告\",\"uiElements.badge.redBadge\":\"红色徽章\",\"uiElements.badge.redBadgeSubTitle\":\"这只会显示一个红色的徽章，没有特定的数字。\",\"uiElements.badge.linkSomething\":\"链接一些东西\",\"uiElements.cards.cards\":\"牌\",\"uiElements.cards.basicCard\":\"基本卡\",\"uiElements.cards.basicCardSubTitle\":\"包含标题，内容和额外角落内容的基本卡。\",\"uiElements.cards.more\":\"更多\",\"uiElements.cards.cardTitle\":\"卡标题\",\"uiElements.cards.cardContent\":\"卡内容\",\"uiElements.cards.lorem\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor incididunt ut labore et dolore magna aliqua。 Ut enim ad minim veniam，quis nostrud exerciseitation ullamco laboris nisi ut aliquip ex ea commodo因此。\",\"uiElements.cards.noBorder\":\"没有边界\",\"uiElements.cards.noBorderSubTitle\":\"在灰色背景上的无边界的卡。\",\"uiElements.cards.gridCard\":\"网格卡\",\"uiElements.cards.gridCardSubTitle\":\"卡通常在概览页面中与网格布局配合使用。\",\"uiElements.cards.loadingCard\":\"装卡\",\"uiElements.cards.loadingCardSubTitle\":\"显示加载指示符，同时正在取出卡的内容。\",\"uiElements.cards.whateverContent\":\"无论内容\",\"uiElements.cards.customizedContentTitle\":\"定制内容\",\"uiElements.cards.customizedContent\":\"显示加载指示符，同时正在取出卡的内容。\",\"uiElements.cards.europeStreetBeat\":\"欧洲街拍\",\"uiElements.cards.instagram\":\"www.instagram.com\",\"uiElements.carousel.carousel\":\"狂欢游行\",\"uiElements.carousel.verticalCarousel\":\"垂直旋转木马\",\"uiElements.carousel.verticalCarouselSubTitle\":\"垂直分页。使用  vertical =true\",\"uiElements.carousel.basicCarousel\":\"基本转盘\",\"uiElements.carousel.basicCarouselSubTitle\":\"基本用法\",\"uiElements.carousel.fadeInTransition\":\"淡入淡出\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"幻灯片使用淡入淡出。   效果= 淡入\",\"uiElements.carousel.scrollAutomatically\":\"自动滚动\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"滚动到下一张卡  图片的时间。自动播放\",\"uiElements.collapse.collapse\":\"坍方\",\"uiElements.collapse.collapseSubTitle\":\"一次可以扩展多个面板，在这种情况下，第一个面板被初始化为活动状态。使用  defaultActiveKey =   [keyNum]\",\"uiElements.collapse.text\":\"狗是一种驯养动物。以其忠诚和忠诚而闻名，可以作为世界各地许多家庭的欢迎客人。\",\"uiElements.collapse.headerOne\":\"这是面板标题1\",\"uiElements.collapse.headerTwo\":\"这是面板标题2\",\"uiElements.collapse.headerThree\":\"这是面板标题3\",\"uiElements.collapse.headerNested\":\"这是面板嵌套面板\",\"uiElements.collapse.nestedExample\":\"嵌套示例\",\"uiElements.collapse.nestedExampleSubTitle\":\"折叠嵌套在折叠中。\",\"uiElements.collapse.borderlessExample\":\"无边界的例子\",\"uiElements.collapse.borderlessExampleSubTitle\":\"无边界风格的折叠。使用  bordered =   false\",\"uiElements.collapse.accordion\":\"手风琴\",\"uiElements.collapse.accordionSubTitle\":\"手风琴模式，一次只能扩展一个面板。默认情况下，第一个面板将被扩展。使用手风琴\",\"uiElements.popover.popover\":\"酥料饼\",\"uiElements.popover.basicExample\":\"基本例子\",\"uiElements.popover.basicExampleSubTitle\":\"最基本的例子。浮动层的大小取决于内容区域。\",\"uiElements.popover.hoverMe\":\"悬停我\",\"uiElements.popover.title\":\"标题\",\"uiElements.popover.titleTrigger\":\"三种触发方式\",\"uiElements.popover.titleTriggerSubTitle\":\"鼠标点击，对焦和移动。\",\"uiElements.popover.focusMe\":\"聚焦我\",\"uiElements.popover.clickMe\":\"点击我\",\"uiElements.popover.placement\":\"放置\",\"uiElements.popover.placementSubTitle\":\"有12个放置选项可用。\",\"uiElements.popover.top\":\"最佳\",\"uiElements.popover.topLeft\":\"左上角\",\"uiElements.popover.topRight\":\"右上\",\"uiElements.popover.leftTop\":\"左上\",\"uiElements.popover.left\":\"剩下\",\"uiElements.popover.leftBottom\":\"左下\",\"uiElements.popover.rightTop\":\"右上\",\"uiElements.popover.right\":\"对\",\"uiElements.popover.bottom\":\"底部\",\"uiElements.popover.bottomLeft\":\"左下方\",\"uiElements.popover.bottomRight\":\"右下\",\"uiElements.popover.boxTitle\":\"控制对话框的关闭\",\"uiElements.popover.boxSubTitle\":\"使用可见支柱来控制显卡的显示。\",\"uiElements.popover.TR\":\"TR\",\"uiElements.popover.TL\":\"TL\",\"uiElements.popover.LT\":\"LT\",\"uiElements.popover.LB\":\"磅\",\"uiElements.popover.RT\":\"RT\",\"uiElements.popover.RB\":\"RB\",\"uiElements.popover.BL\":\"BL\",\"uiElements.popover.BR\":\"BR\",\"uiElements.popover.close\":\"关\",\"uiElements.tooltip.tooltip\":\"提示\",\"uiElements.tooltip.tooltipContent\":\"工具提示内容\",\"uiElements.tooltip.basicExample\":\"基本例子\",\"uiElements.tooltip.basicExampleSubTitle\":\"最简单的用法\",\"uiElements.tooltip.placementTitle\":\"放置\",\"uiElements.tooltip.placementSubTitle\":\"工具提示有12个布局选择。\",\"uiElements.tooltip.TL\":\"TL\",\"uiElements.tooltip.TR\":\"TR\",\"uiElements.tooltip.LT\":\"LT\",\"uiElements.tooltip.LB\":\"磅\",\"uiElements.tooltip.RT\":\"RT\",\"uiElements.tooltip.RB\":\"RB\",\"uiElements.tooltip.BL\":\"BL\",\"uiElements.tooltip.BR\":\"BR\",\"uiElements.tooltip.bottom\":\"底部\",\"uiElements.tooltip.right\":\"对\",\"uiElements.tooltip.left\":\"剩下\",\"uiElements.tooltip.top\":\"最佳\",\"uiElements.tooltip.tooltipContentSpan\":\"鼠标进入时会显示工具提示。\",\"uiElements.tooltip.contentSpan\":\"工具提示内容\",\"uiElements.tags.tags\":\"标签\",\"uiElements.tags.basicExample\":\"基本例子\",\"uiElements.tags.basicExampleSubTitle\":\"使用基本标签，它可以通过set closable属性来关闭。关闭标签支持onClose afterClose事件。\",\"uiElements.tags.tagOne\":\"标签1\",\"uiElements.tags.tagTwo\":\"标签2\",\"uiElements.tags.link\":\"链接\",\"uiElements.tags.preventDefault\":\"防止默认\",\"uiElements.tags.colorfulTag\":\"多彩标签\",\"uiElements.tags.hotTags\":\"热门标签\",\"uiElements.tags.hotTagsSubTitle\":\"选择您最喜欢的主题。\",\"uiElements.tags.hots\":\"热门活动：\",\"uiElements.tags.addRemoveDynamically\":\"动态添加和删除\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"通过数组生成一组标签，可以动态添加和删除。它基于afterClose事件，这将在关闭动画结束时触发。\",\"uiElements.tags.newTag\":\"+新标签\",\"uiElements.timeline.timeline\":\"时间线\",\"uiElements.timeline.basicExample\":\"基本例子\",\"uiElements.timeline.basicTimeline\":\"基本时间表\",\"uiElements.timeline.lastNode\":\"上一个节点\",\"uiElements.timeline.lastNodeContent\":\"当时间轴不完整和持续时，最后放一个鬼节点。 set   pending =   true    或  pending =   a React Element\",\"uiElements.timeline.seeMore\":\"查看更多\",\"uiElements.timeline.custom\":\"习惯\",\"uiElements.timeline.customContent\":\"将节点设置为图标或其他自定义元素。\",\"uiElements.timeline.colorExample\":\"颜色示例\",\"uiElements.timeline.colorExampleContent\":\"设置圈子的颜色。绿色表示完成或成功状态，红色表示警告或错误，蓝色表示正在进行或其他默认状态。\",\"uiElements.timeline.createServiceSite\":\"创建服务网站2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"解决初始网络问题2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"网络问题正在解决2015-09-01\",\"uiElements.timeline.technicalTesting\":\"技术测试2015-09-01\",\"uiElements.dropdown.dropdown\":\"落下\",\"uiElements.dropdown.hoverDropdown\":\"悬停下拉\",\"uiElements.dropdown.hoverMe\":\"悬停我\",\"uiElements.dropdown.hoverPlacement\":\"悬停放置下拉\",\"uiElements.dropdown.hoverDisableLink\":\"悬停下拉与禁用链接\",\"uiElements.dropdown.clickedDropdown\":\"点击下拉\",\"uiElements.dropdown.buttonDropdown\":\"按钮与下拉菜单\",\"uiElements.pagination.pagination\":\"分页\",\"uiElements.pagination.basic\":\"基本\",\"uiElements.pagination.more\":\"更多\",\"uiElements.pagination.changer\":\"换\",\"uiElements.pagination.jumper\":\"跨接器\",\"uiElements.pagination.miniSize\":\"迷你尺寸\",\"uiElements.pagination.simpleMode\":\"简单模式\",\"uiElements.pagination.controlled\":\"受控\",\"uiElements.pagination.totalNumber\":\"总数\",\"uiElements.rating.rating\":\"评分\",\"uiElements.rating.basicExample\":\"基本例子\",\"uiElements.rating.basicExampleSubTitle\":\"最简单的用法\",\"uiElements.rating.halfStar\":\"半星\",\"uiElements.rating.halfStarSubTitle\":\"支持选择半星。\",\"uiElements.rating.showCopywriting\":\"显示文案\",\"uiElements.rating.showCopywritingSubTitle\":\"以速率组件添加文案。\",\"uiElements.rating.readOnly\":\"只读\",\"uiElements.rating.readOnlySubTitle\":\"只读，不能使用鼠标进行交互。\",\"uiElements.rating.otherCharacter\":\"其他性格\",\"uiElements.rating.otherCharacterSubTitle\":\"将默认明星替换为其他字符，如字母，数字，iconfont甚至中文字。\",\"uiElements.tree.tree\":\"树\",\"uiElements.tree.basicExample\":\"基本例子\",\"uiElements.tree.basicExampleSubTitle\":\"最基本的用法，告诉你如何使用可检查，可选择，禁用，defaultExpandKeys等。\",\"uiElements.tree.basicControlledExample\":\"基本控制示例\",\"uiElements.tree.basicControlledExampleSubTitle\":\"基本控制示例\",\"uiElements.tree.draggableExample\":\"可拖曳的例子\",\"uiElements.tree.draggableExampleSubTitle\":\"拖动treeNode插入另一个treeNode或插入到另一个父TreeNode中。\",\"uiElements.tree.loadAsync\":\"异步加载数据\",\"uiElements.tree.loadAsyncSubTitle\":\"单击以展开treeNode时异步加载数据。\",\"uiElements.tree.searchableExample\":\"可搜索的例子\",\"uiElements.tree.searchableExampleSubTitle\":\"可搜索的树\",\"uiElements.tree.treeWithLine\":\"树与线\",\"shuffle.descriptionOne\":\"Netscape 2.0发布，引入Javascript\",\"shuffle.descriptionTwo\":\"Jesse James Garrett发布了AJAX规范\",\"shuffle.descriptionThree\":\"jQuery 1.0发布\",\"shuffle.descriptionFour\":\"首先下划线\",\"shuffle.descriptionFive\":\"Backbone.js成为一件事情\",\"shuffle.descriptionSix\":\"角度1.0发布\",\"shuffle.descriptionSeven\":\"反应是开源的开发商高兴\",\"toggle.list\":\"名单\",\"toggle.grid\":\"格\",\"toggle.ascending\":\"上升\",\"toggle.descending\":\"降序\",\"toggle.shuffle\":\"拖曳\",\"toggle.rotate\":\"旋转\",\"toggle.addItem\":\"新增项目\",\"toggle.removeItem\":\"除去项目\",\"contactlist.searchContacts\":\"搜索联系人\",\"contactlist.addNewContact\":\"添加新联系人\",\"notes.ChoseColor\":\"为您的笔记选择一种颜色\",\"notes.addNote\":\"添加新注\",\"page404.title\":\"404\",\"page404.subTitle\":\"看起来你已经迷路了\",\"page404.description\":\"您正在寻找的页面不存在或已被移动。\",\"page404.backButton\":\"回家\",\"page500.title\":\"500\",\"page500.subTitle\":\"内部服务器错误\",\"page500.description\":\"出了些问题。请再试一次信。\",\"page500.backButton\":\"回家\",\"page.forgetPassTitle\":\"同构\",\"page.forgetPassSubTitle\":\"忘记密码？\",\"page.forgetPassDescription\":\"输入您的电子邮件，我们向您发送重置链接。\",\"page.sendRequest\":\"发送请求\",\"page.resetPassTitle\":\"同构\",\"page.resetPassSubTitle\":\"重设密码\",\"page.resetPassDescription\":\"输入新密码并进行确认。\",\"page.resetPassSave\":\"保存\",\"page.signInTitle\":\"同构\",\"page.signInRememberMe\":\"记住我\",\"page.signInButton\":\"签到\",\"page.signInPreview\":\"用户名：demo，密码：demodemo，或者点击任意按钮。\",\"page.signInFacebook\":\"用Facebook登录\",\"page.signInGooglePlus\":\"使用Google Plus登录\",\"page.signInAuth0\":\"用Auth0登录\",\"page.signInForgotPass\":\"忘记密码\",\"page.signInCreateAccount\":\"创建一个异构帐户\",\"page.signUpTitle\":\"同构\",\"page.signUpTermsConditions\":\"我同意条款和条件\",\"page.signUpButton\":\"注册\",\"page.signUpFacebook\":\"用Facebook注册\",\"page.signUpGooglePlus\":\"用Google Plus注册\",\"page.signUpAuth0\":\"注册Auth0\",\"page.signUpAlreadyAccount\":\"已经有账户？签到。\",\"widget.reportswidget.label\":\"收入\",\"widget.reportswidget.details\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor\",\"widget.singleprogresswidget1.label\":\"营销\",\"widget.singleprogresswidget2.label\":\"Addvertisement\",\"widget.singleprogresswidget3.label\":\"咨询\",\"widget.singleprogresswidget4.label\":\"发展\",\"widget.stickerwidget1.number\":\"210\",\"widget.stickerwidget1.text\":\"未读电子邮件\",\"widget.stickerwidget2.number\":\"1749\",\"widget.stickerwidget2.text\":\"图片上传\",\"widget.stickerwidget3.number\":\"3024\",\"widget.stickerwidget3.text\":\"总信息\",\"widget.stickerwidget4.number\":\"54\",\"widget.stickerwidget4.text\":\"订单发布\",\"widget.salewidget1.label\":\"收入\",\"widget.salewidget1.price\":\"$ 15000\",\"widget.salewidget1.details\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor\",\"widget.salewidget2.label\":\"收入\",\"widget.salewidget2.price\":\"$ 15000\",\"widget.salewidget2.details\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor\",\"widget.salewidget3.label\":\"收入\",\"widget.salewidget3.price\":\"$ 15000\",\"widget.salewidget3.details\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor\",\"widget.salewidget4.label\":\"收入\",\"widget.salewidget4.price\":\"$ 15000\",\"widget.salewidget4.details\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor\",\"widget.cardwidget1.number\":\"110\",\"widget.cardwidget1.text\":\"新消息\",\"widget.cardwidget2.number\":\"100％\",\"widget.cardwidget2.text\":\"卷\",\"widget.cardwidget3.number\":\"137\",\"widget.cardwidget3.text\":\"成就\",\"widget.progresswidget1.label\":\"下载\",\"widget.progresswidget1.details\":\"50％完成\",\"widget.progresswidget2.label\":\"支持\",\"widget.progresswidget2.details\":\"80％满意客户\",\"widget.progresswidget3.label\":\"上传\",\"widget.progresswidget3.details\":\"65％完成\",\"widget.vcardwidget.name\":\"Jhon Doe\",\"widget.vcardwidget.title\":\"高级iOS开发人员\",\"widget.vcardwidget.description\":\"Lorem ipsum dolor sit amet，consectetur adipisicing elit，sed do eiusmod tempor ammet dolar consectetur adipisicing elit\",\"checkout.billingform.firstname\":\"名字\",\"checkout.billingform.lastname\":\"姓\",\"checkout.billingform.company\":\"公司名\",\"checkout.billingform.email\":\"电子邮件地址\",\"checkout.billingform.mobile\":\"手机号码\",\"checkout.billingform.country\":\"国家\",\"checkout.billingform.city\":\"市\",\"checkout.billingform.address\":\"地址\",\"checkout.billingform.addressoptional\":\"公寓，套房，单位等（可选）\",\"checkout.billingform.checkbox\":\"创建一个帐户？\",\"antTable.title.image\":\"图片\",\"antTable.title.firstName\":\"名字\",\"antTable.title.lastName\":\"姓\",\"antTable.title.city\":\"市\",\"antTable.title.street\":\"街\",\"antTable.title.email\":\"电子邮件\",\"antTable.title.dob\":\"DOB\",\"Map.leaflet.basicTitle\":\"基本地图\",\"Map.leaflet.basicMarkerTitle\":\"基本地图（带默认标记）\",\"Map.leaflet.leafletCustomMarkerTitle\":\"基本地图（使用自定义图标标记）\",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"基本地图（使用自定义Html标记）\",\"Map.leaflet.leafletMarkerClusterTitle\":\"基本地图（带标记群集）\",\"Map.leaflet.leafletRoutingTitle\":\"基本地图路由\",\"Component.contacts.noOption\":\"找不到联系\",\"email.send\":\"发送\",\"email.cancel\":\"取消\",\"email.compose\":\"撰写\",\"email.noMessage\":\"请选择一个邮件阅读\",\"themeSwitcher.purchase\":\"现在买\",\"themeSwitcher.settings\":\"设置\",\"sidebar.selectbox\":\"选择\",\"sidebar.frappeChart\":\"图表\",\"topbar.myprofile\":\"我的简历\",\"topbar.help\":\"帮帮我\",\"topbar.logout\":\"登出\",\"topbar.viewAll\":\"查看全部\",\"topbar.viewCart\":\"查看购物车\",\"topbar.totalPrice\":\"总价格\",\"sidebar.scrumboard\":\"Scrum板\",\"sidebar.firestorecrud\":\"Firestore CRUD\",\"sidebar.firestorecrudarticle\":\"用品\",\"sidebar.firestorecrudinvestor\":\"投资者\"}");

/***/ }),

/***/ "3Igq":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.swiperslider\":\"Control deslizante\",\"sidebar.email\":\"Email\",\"sidebar.chat\":\"Charla\",\"sidebar.ecommerce\":\"Ecommerce\",\"sidebar.shop\":\"tienda\",\"sidebar.cart\":\"Carro\",\"sidebar.checkout\":\"revisa\",\"sidebar.cards\":\"Divertido Tarjetas\",\"sidebar.maps\":\"Mapas\",\"sidebar.firestorecrud\":\"Crud de Firestore\",\"sidebar.firestorecrudarticle\":\"Artículos\",\"sidebar.firestorecrudinvestor\":\"Inversores\",\"sidebar.googleMap\":\"Mapa de Google\",\"sidebar.leafletMap\":\"Mapa del folleto\",\"sidebar.calendar\":\"Calendario\",\"sidebar.notes\":\"Notas\",\"sidebar.todos\":\"Todos\",\"sidebar.contacts\":\"Contactos\",\"sidebar.shuffle\":\"Barajar\",\"sidebar.charts\":\"Gráficos\",\"sidebar.googleCharts\":\"Google Carts\",\"sidebar.recharts\":\"Recharts\",\"sidebar.reactVis\":\"Reaccionar Vis\",\"sidebar.reactChart2\":\"React-Chart-2\",\"sidebar.reactTrend\":\"Reaccionar\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"Formularios\",\"sidebar.input\":\"Entrada\",\"sidebar.editor\":\"Editor\",\"sidebar.formsWithValidation\":\"Formularios con validación\",\"sidebar.progress\":\"Progreso\",\"sidebar.button\":\"Botón\",\"sidebar.tab\":\"Lengüeta\",\"sidebar.checkbox\":\"Caja\",\"sidebar.radiobox\":\"Radiobox\",\"sidebar.selectbox\":\"Seleccionar\",\"sidebar.transfer\":\"Transferir\",\"sidebar.autocomplete\":\"Autocompletar\",\"sidebar.boxOptions\":\"Opciones de Caja\",\"sidebar.uiElements\":\"Elementos de la interfaz de usuario\",\"sidebar.badge\":\"Distintivo\",\"sidebar.card2\":\"Tarjeta\",\"sidebar.corusel\":\"Parranda\",\"sidebar.collapse\":\"Colapso\",\"sidebar.popover\":\"Acercarse\",\"sidebar.tooltip\":\"Tooltip\",\"sidebar.tag\":\"Etiqueta\",\"sidebar.timeline\":\"Cronograma\",\"sidebar.dropdown\":\"Desplegable\",\"sidebar.pagination\":\"Paginación\",\"sidebar.rating\":\"Clasificación\",\"sidebar.tree\":\"Árbol\",\"sidebar.advancedElements\":\"Elementos avanzados\",\"sidebar.reactDates\":\"Reaccionar fechas\",\"sidebar.codeMirror\":\"Código Espejo\",\"sidebar.uppy\":\"Uppy Uploader\",\"sidebar.dropzone\":\"Zona de descenso\",\"sidebar.feedback\":\"Realimentación\",\"sidebar.alert\":\"Alerta\",\"sidebar.modal\":\"Modal\",\"sidebar.message\":\"Mensaje\",\"sidebar.notification\":\"Notificación\",\"sidebar.popConfirm\":\"Pop confirmar\",\"sidebar.spin\":\"Girar\",\"sidebar.tables\":\"Mesas\",\"sidebar.antTables\":\"Tablas de hormigas\",\"sidebar.pages\":\"Páginas\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"Registrarse\",\"sidebar.signUp\":\"Regístrate\",\"sidebar.forgotPw\":\"Olvidé contraseñas\",\"sidebar.resetPw\":\"Restablecer contraseñas\",\"sidebar.invoice\":\"Factura\",\"sidebar.menuLevels\":\"Niveles de menú\",\"sidebar.item1\":\"Artículo 1\",\"sidebar.item2\":\"Artículo 2\",\"sidebar.option1\":\"Opción 1\",\"sidebar.option2\":\"opcion 2\",\"sidebar.option3\":\"Opción 3\",\"sidebar.option4\":\"Opción 4\",\"sidebar.quiz\":\"Quiz\",\"sidebar.blankPage\":\"Página en blanco\",\"sidebar.githubSearch\":\"Github Buscar\",\"sidebar.youtubeSearch\":\"Búsqueda de Youtube\",\"languageSwitcher.label\":\"Cambiar idioma\",\"themeSwitcher\":\"Selector de temas\",\"themeSwitcher.Sidebar\":\"Barra lateral\",\"themeSwitcher.Topbar\":\"Barra superior\",\"themeSwitcher.Background\":\"Fondo\",\"feedback.alert.basicTitle\":\"Título Básico\",\"feedback.alert.successText\":\"Texto de éxito\",\"feedback.alert.infoText\":\"Texto de la información\",\"feedback.alert.warningText\":\"Texto de advertencia\",\"feedback.alert.errorText\":\"Texto de error\",\"feedback.alert.closableAlertType\":\"Tipo de Alerta Closable\",\"feedback.alert.iconAlertType\":\"Tipo de alerta de icono\",\"feedback.alert.iconInfoAlertType\":\"Tipo de Alerta\",\"feedback.alert.successTips\":\"consejos de éxito\",\"feedback.alert.successTipsDescription\":\"Descripción detallada y consejos sobre copywriting exitoso.\",\"feedback.alert.informationTips\":\"Notas informativas\",\"feedback.alert.informationDescription\":\"Descripción adicional e informaciones sobre copywriting.\",\"feedback.alert.warningTips\":\"Advertencia\",\"feedback.alert.warningDescription\":\"Este es un aviso de advertencia sobre copywriting.\",\"feedback.alert.errorTips\":\"Error\",\"feedback.alert.errorDescription\":\"Este es un mensaje de error acerca de copywriting.\",\"feedback.alert.modalTitle\":\"Modal uno con personalizar Footer\",\"feedback.alert.modalSubTitle\":\"Diálogo modal básico.\",\"feedback.alert.successTitle\":\"Éxito\",\"feedback.alert.infoTitle\":\"Información\",\"feedback.alert.errorTitle\":\"Error\",\"feedback.alert.warningTitle\":\"Advertencia\",\"feedback.alert.modalBlockTitle\":\"Modal\",\"feedback.alert.confirmationModalDialogue\":\"Cuadro de diálogo modal de confirmación\",\"feedback.alert.simpleModalDialogue\":\"Diálogo modal simple\",\"feedback.alert.message\":\"Mensaje\",\"feedback.alert.normalMessageTitle\":\"Mensaje normal\",\"feedback.alert.normalMessageSubtitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.displayMessage\":\"Mostrar mensaje normal\",\"feedback.alert.displayOtherTypeMessageTitle\":\"Otros tipos de mensaje\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"Mensajes de éxito   error y tipos de advertencia.\",\"feedback.alert.customizeDurationTitle\":\"Personalizar duración\",\"feedback.alert.customizeDurationSubTitle\":\"ustomize la duración de la exhibición del mensaje de 1.5s a 10s por defecto.\",\"feedback.alert.customizeDurationButton\":\"Duración de la pantalla personalizada\",\"feedback.alert.messageLoadingTitle\":\"Mensaje de carga\",\"feedback.alert.messageLoadingSubTitle\":\"Mostrar un indicador de carga global   que se descarta por sí mismo de forma asíncrona.\",\"feedback.alert.displayLoadIndicator\":\"Mostrar un indicador de carga\",\"feedback.alert.notification\":\"Notificación\",\"feedback.alert.notificationBasicTitle\":\"BASIC\",\"feedback.alert.notificationBasicSubTitle\":\"El uso más simple que cierre la caja de notificación después de 4.5s.\",\"feedback.alert.notificationBasicDescription\":\"Abrir el cuadro de notificación\",\"feedback.alert.notificationDurationTitle\":\"Duración después de la cual se cierra el cuadro de notificación\",\"feedback.alert.notificationDurationSubTitle\":\"La duración se puede utilizar para especificar cuánto tiempo permanece abierta la notificación. Una vez transcurrido el tiempo de duración   la notificación se cierra automáticamente. Si no se especifica   el valor predeterminado es 4  5 segundos. Si establece el valor en 0   el cuadro de notificación nunca se cerrará automáticamente.\",\"feedback.alert.notificationwithIconTitle\":\"Notificación con icono\",\"feedback.alert.notificationwithIconSubTitle\":\"Un cuadro de notificación con un icono en el lado izquierdo.\",\"feedback.alert.notificationwithCustomIconTitle\":\"Notificación con icono personalizado\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.notificationwithCustomButtonTitle\":\"Notificación con botón personalizado\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.popConfirm\":\"Pop confirmar\",\"feedback.alert.popConfirm.basicTitle\":\"Confirmación básica\",\"feedback.alert.popConfirm.basicSubTitle\":\"El ejemplo básico.\",\"feedback.alert.popConfirm.delete\":\"Borrar\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"Notificación con icono personalizado\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.popConfirm.TL\":\"TL\",\"feedback.alert.popConfirm.top\":\"Parte superior\",\"feedback.alert.popConfirm.TR\":\"TR\",\"feedback.alert.popConfirm.LT\":\"LT\",\"feedback.alert.popConfirm.left\":\"Izquierda\",\"feedback.alert.popConfirm.LB\":\"LB\",\"feedback.alert.popConfirm.RT\":\"RT\",\"feedback.alert.popConfirm.right\":\"Derecha\",\"feedback.alert.popConfirm.RB\":\"RB\",\"feedback.alert.popConfirm.Bl\":\"licenciado en Derecho\",\"feedback.alert.popConfirm.bottom\":\"Fondo\",\"feedback.alert.popConfirm.BR\":\"BR\",\"feedback.alert.spin\":\"Girar\",\"feedback.alert.spin.basicTitle\":\"Girar el tamaño\",\"feedback.alert.spin.background\":\"Girar con fondo\",\"feedback.alert.spin.backgroundDescription\":\"Descripción de Spin With Background\",\"feedback.alert.spin.loadingState\":\"Estado de carga \",\"feedback.alert.spin.alertTitle\":\"Título del mensaje de alerta\",\"feedback.alert.spin.alertDescription\":\"Más detalles sobre el contexto de esta alerta.\",\"forms.input.header\":\"Entrada\",\"forms.input.basicTitle\":\"Uso básico\",\"forms.input.basicSubTitle\":\"Ejemplo de uso básico.\",\"forms.input.variationsTitle\":\"Tres tamaños de entrada\",\"forms.input.variationsSubtitle\":\"Hay tres tamaños de un cuadro de entrada  grande (42px     predeterminado (35px   y pequeño (30px  . Nota  Dentro de los formularios   sólo se utiliza el tamaño grande.\",\"forms.input.groupTitle\":\"Grupo de entrada\",\"forms.input.groupSubTitle\":\"Ejemplo de Input.Group Nota  No necesita Col para controlar el ancho en el modo compacto.\",\"forms.input.autoSizingTitle\":\"Autosizing la altura para ajustar el contenido\",\"forms.input.autoSizingSubTitle\":\"prop de autosize para un tipo de entrada textarea hace que la altura se ajuste automáticamente en función del contenido. Se puede proporcionar un objeto de opciones al tamaño automático para especificar el número mínimo y máximo de líneas que la zona de texto ajustará automáticamente.\",\"forms.input.prePostTabTitle\":\"Pestaña Pre    Post\",\"forms.input.prePostTabSubTitle\":\"El uso de pre & amp; post tabs ejemplo ..\",\"forms.input.textAreaTitle\":\"Área de texto\",\"forms.input.textAreaSubTitle\":\"Para casos de entrada de usuario multi-línea   se puede utilizar una entrada cuyo tipo prop tiene el valor de textarea.\",\"forms.input.searchTitle\":\"Buscar\",\"forms.input.searchSubTitle\":\"Ejemplo de creación de un cuadro de búsqueda agrupando una entrada estándar con un botón de búsqueda\",\"forms.editor.header\":\"Editor\",\"forms.formsWithValidation.header\":\"Formulario de validación personalizado\",\"forms.formsWithValidation.failLabel\":\"Fallar\",\"forms.formsWithValidation.failHelp\":\"Debe ser la combinación de números & amp; alfabetos\",\"forms.formsWithValidation.warningLabel\":\"Advertencia\",\"forms.formsWithValidation.ValidatingLabel\":\"Validando\",\"forms.formsWithValidation.ValidatingHelp\":\"La información está siendo validada ...\",\"forms.formsWithValidation.SuccessLabel\":\"Éxito\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"Advertencia\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"Fallar\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"Debe ser la combinación de números & amp; alfabetos\",\"forms.progressBar.header\":\"Barra de progreso\",\"forms.progressBar.standardTitle\":\"Barra de progreso\",\"forms.progressBar.standardSubTitle\":\"Una barra de progreso estándar.\",\"forms.progressBar.circularTitle\":\"Barra de progreso circular\",\"forms.progressBar.circularSubTitle\":\"Una barra de progreso circular.\",\"forms.progressBar.miniTitle\":\"Barra de progreso de tamaño mini\",\"forms.progressBar.miniSubTitle\":\"Adecuado para un área estrecha.\",\"forms.progressBar.miniCircularTitle\":\"Una barra de progreso circular más pequeña.\",\"forms.progressBar.dynamicCircularTitle\":\"Barra de progreso circular dinámica\",\"forms.progressBar.dynamicCircularSubTitle\":\"Una barra de progreso dinámica es mejor.\",\"forms.progressBar.customTextTitle\":\"Formato de texto personalizado\",\"forms.progressBar.customTextSubTitle\":\"Puede personalizar el formato de texto configurando el formato.\",\"forms.progressBar.dashboardTitle\":\"Tablero\",\"forms.progressBar.dashboardSubTitle\":\"Un estilo de progreso en el tablero de instrumentos.\",\"forms.button.header\":\"Botones\",\"forms.button.simpleButton\":\"Tipo de botón\",\"forms.button.iconButton\":\"Icono de botón\",\"forms.button.simpleButtonPrimaryText\":\"Primario\",\"forms.button.simpleButtonDefaultText\":\"Defecto\",\"forms.button.simpleButtonDashedText\":\"Dañado\",\"forms.button.simpleButtonDangerText\":\"Peligro\",\"forms.button.iconPrimaryButton\":\"buscar\",\"forms.button.iconSimpleButton\":\"buscar\",\"forms.button.iconCirculerButton\":\"buscar\",\"forms.button.iconDashedButton\":\"buscar\",\"forms.button.SizedButton\":\"Tamaño del botón\",\"forms.button.DisabledButton\":\"Botón desactivado\",\"forms.button.LoadingButton\":\"Botón de carga\",\"forms.button.MultipleButton\":\"Botón múltiple\",\"forms.button.groupButton\":\"Grupo de botones\",\"forms.Tabs.header\":\"Pestañas\",\"forms.Tabs.simpleTabTitle\":\"buscar\",\"forms.Tabs.simpleTabSubTitle\":\"Pestañas inhabilitadas\",\"forms.Tabs.iconTabTitle\":\"Icono de las pestañas\",\"forms.Tabs.miniTabTitle\":\"Mini pestañas\",\"forms.Tabs.extraTabTitle\":\"Pestañas de acción adicionales\",\"forms.Tabs.TabpositionTitle\":\"Posición\",\"forms.Tabs.TabpositionSubTitle\":\"Posición de las pestañas  izquierda   derecha   arriba o abajo\",\"forms.Tabs.cardTitle\":\"Fichas de tipo de tarjeta\",\"forms.Tabs.editableTitle\":\"Agregar y cerrar pestañas\",\"forms.Tabs.verticalTitle\":\"Fichas de tipo vertical\",\"forms.Tabs.basicTitle\":\"Pestañas básicas\",\"forms.checkbox.header\":\"Caja\",\"forms.checkbox.basicTitle\":\"Casilla de verificación básica\",\"forms.checkbox.basicSubTitle\":\"Uso básico de la casilla de verificación.\",\"forms.checkbox.groupTitle\":\"Grupo de casillas de verificación\",\"forms.checkbox.groupSubTitle\":\"Genera un grupo de casillas de verificación de una matriz. Utilizar desactivado para deshabilitar una casilla de verificación.\",\"forms.checkbox.groupCheckTitle\":\"Grupo de casillas de verificación\",\"forms.checkbox.groupCheckSubTitle\":\"Genera un grupo de casillas de verificación de una matriz. Utilizar desactivado para deshabilitar una casilla de verificación.\",\"forms.radio.header\":\"Radio\",\"forms.radio.simpleTitle\":\"Radio básica\",\"forms.radio.simpleSubTitle\":\"El uso más simple. Utilizar desactivado para desactivar una radio.\",\"forms.radio.groupTitle\":\"Grupo de radio vertical\",\"forms.radio.groupSubTitle\":\"Vertical RadioGroup   con más radios.\",\"forms.radio.groupSecondTitle\":\"Grupo de radio\",\"forms.radio.groupSecondSubTitle\":\"Un grupo de componentes de radio.\",\"forms.radio.groupThirdTitle\":\"Grupo de radio\",\"forms.radio.groupThirdSubTitle\":\"Un grupo de componentes de radio.\",\"forms.transfer.header\":\"Transferir\",\"forms.transfer.SubTitle\":\"Transferir con un cuadro de búsqueda.\",\"forms.transfer.Title\":\"Buscar\",\"forms.autocomplete.header\":\"Autocompletar\",\"forms.autocomplete.simpleTitle\":\"Personalizado\",\"forms.autocomplete.simpleSubTitle\":\"Puede pasar AutoComplete.Option como hijos de Autocompletar   en lugar de utilizar dataSource\",\"forms.autocomplete.customizeTitle\":\"Personalizar el componente de entrada\",\"forms.autocomplete.customizeSubTitle\":\"Personalizar el componente de entrada\",\"uiElements.badge.badge\":\"Distintivo\",\"uiElements.badge.basicExample\":\"Ejemplo Básico\",\"uiElements.badge.basicExampleSubTitle\":\"Uso más simple. La insignia se ocultará cuando count sea 0   pero podemos usar showZero para mostrarlo.\",\"uiElements.badge.overflowCount\":\"Cuenta de desbordamiento\",\"uiElements.badge.overflowCountSubTitle\":\"OverflowCount se muestra cuando count es mayor que overflowCount. El valor predeterminado de overflowCount es 99.\",\"uiElements.badge.status\":\"Estado\",\"uiElements.badge.statusSubTitle\":\"Insignia autónoma con estado.\",\"uiElements.badge.success\":\"Éxito\",\"uiElements.badge.error\":\"Error\",\"uiElements.badge.default\":\"Defecto\",\"uiElements.badge.processing\":\"Tratamiento\",\"uiElements.badge.warning\":\"Advertencia\",\"uiElements.badge.redBadge\":\"Insignia roja\",\"uiElements.badge.redBadgeSubTitle\":\"Esto simplemente mostrará una insignia roja   sin un conteo específico.\",\"uiElements.badge.linkSomething\":\"Enlace algo\",\"uiElements.cards.cards\":\"Divertido Tarjetas\",\"uiElements.cards.basicCard\":\"Tarjeta básica\",\"uiElements.cards.basicCardSubTitle\":\"Una tarjeta básica que contiene un título   contenido y un contenido de esquina adicional.\",\"uiElements.cards.more\":\"Más\",\"uiElements.cards.cardTitle\":\"Título de la tarjeta\",\"uiElements.cards.cardContent\":\"Contenido de la tarjeta\",\"uiElements.cards.lorem\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor incididunt ut labore y dolore magna aliqua. Ut enim ad minim veniam   quis nostrud ejercicio ullamco laboris nisi ut aliquip ex y commodo consequat.\",\"uiElements.cards.noBorder\":\"Sin bordes\",\"uiElements.cards.noBorderSubTitle\":\"Una tarjeta sin fronteras sobre un fondo gris.\",\"uiElements.cards.gridCard\":\"Tarjeta de red\",\"uiElements.cards.gridCardSubTitle\":\"Las tarjetas suelen cooperar con el diseño de la cuadrícula en la página de vista general.\",\"uiElements.cards.loadingCard\":\"Carga de la tarjeta\",\"uiElements.cards.loadingCardSubTitle\":\"Muestra un indicador de carga mientras se está recuperando el contenido de la tarjeta.\",\"uiElements.cards.whateverContent\":\"Cualquier contenido\",\"uiElements.cards.customizedContentTitle\":\"Contenido personalizado\",\"uiElements.cards.customizedContent\":\"Muestra un indicador de carga mientras se está recuperando el contenido de la tarjeta.\",\"uiElements.cards.europeStreetBeat\":\"Europa Street beat\",\"uiElements.cards.instagram\":\"www.instagram.com\",\"uiElements.carousel.carousel\":\"Parranda\",\"uiElements.carousel.verticalCarousel\":\"Carrusel vertical\",\"uiElements.carousel.verticalCarouselSubTitle\":\"Paginación vertical. use   vertical = true  \",\"uiElements.carousel.basicCarousel\":\"Carrusel básico\",\"uiElements.carousel.basicCarouselSubTitle\":\"Uso básico\",\"uiElements.carousel.fadeInTransition\":\"Fade In Transition\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"Las diapositivas utilizan el fundido para la transición.   effect = fade  \",\"uiElements.carousel.scrollAutomatically\":\"Desplazarse automáticamente\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"Tiempo de desplazamiento a la siguiente tarjeta    imagen. auto reproducción\",\"uiElements.collapse.collapse\":\"Colapso\",\"uiElements.collapse.collapseSubTitle\":\"Se puede ampliar más de un panel a la vez   el primer panel se inicializa para estar activo en este caso. use   defaultActiveKey =   [keyNum]    \",\"uiElements.collapse.text\":\"Un perro es un tipo de animal domesticado. Conocido por su lealtad y fidelidad   se puede encontrar como un invitado de bienvenida en muchos hogares de todo el mundo.\",\"uiElements.collapse.headerOne\":\"Este es el encabezado del panel 1\",\"uiElements.collapse.headerTwo\":\"Se trata de la cabecera del panel 2\",\"uiElements.collapse.headerThree\":\"Este es el encabezado del panel 3\",\"uiElements.collapse.headerNested\":\"Éste es panel del nido del panel\",\"uiElements.collapse.nestedExample\":\"Ejemplo anidado\",\"uiElements.collapse.nestedExampleSubTitle\":\"Collapse está anidado dentro del Collapse.\",\"uiElements.collapse.borderlessExample\":\"Ejemplo sin márgenes\",\"uiElements.collapse.borderlessExampleSubTitle\":\"Un estilo sin fronteras de Collapse. use   bordered =   false    \",\"uiElements.collapse.accordion\":\"Acordeón\",\"uiElements.collapse.accordionSubTitle\":\"Acordeón   sólo se puede ampliar un panel cada vez. El primer panel se ampliará de forma predeterminada. utilizar acordeón\",\"uiElements.popover.popover\":\"Popover\",\"uiElements.popover.basicExample\":\"Ejemplo Básico\",\"uiElements.popover.basicExampleSubTitle\":\"El ejemplo más básico. El tamaño de la capa flotante depende de la región del contenido.\",\"uiElements.popover.hoverMe\":\"Mírame\",\"uiElements.popover.title\":\"Título\",\"uiElements.popover.titleTrigger\":\"Tres maneras de activar\",\"uiElements.popover.titleTriggerSubTitle\":\"El ratón para hacer clic   enfocar y moverse.\",\"uiElements.popover.focusMe\":\"Enfócame\",\"uiElements.popover.clickMe\":\"Haz click en mi\",\"uiElements.popover.placement\":\"Colocación\",\"uiElements.popover.placementSubTitle\":\"Hay 12 opciones de colocación disponibles.\",\"uiElements.popover.top\":\"Parte superior\",\"uiElements.popover.topLeft\":\"Arriba a la izquierda\",\"uiElements.popover.topRight\":\"Parte superior derecha\",\"uiElements.popover.leftTop\":\"Parte superior izquierda\",\"uiElements.popover.left\":\"Izquierda\",\"uiElements.popover.leftBottom\":\"Abajo a la izquierda\",\"uiElements.popover.rightTop\":\"Justo arriba\",\"uiElements.popover.right\":\"Derecha\",\"uiElements.popover.bottom\":\"Fondo\",\"uiElements.popover.bottomLeft\":\"Abajo Izquierda\",\"uiElements.popover.bottomRight\":\"Abajo a la derecha\",\"uiElements.popover.boxTitle\":\"Control del cierre del diálogo\",\"uiElements.popover.boxSubTitle\":\"Utilice el apoyo visible para controlar la visualización de la tarjeta.\",\"uiElements.popover.TR\":\"TR\",\"uiElements.popover.TL\":\"TL\",\"uiElements.popover.LT\":\"LT\",\"uiElements.popover.LB\":\"LB\",\"uiElements.popover.RT\":\"RT\",\"uiElements.popover.RB\":\"RB\",\"uiElements.popover.BL\":\"licenciado en Derecho\",\"uiElements.popover.BR\":\"BR\",\"uiElements.popover.close\":\"Cerca\",\"uiElements.tooltip.tooltip\":\"Tooltip\",\"uiElements.tooltip.tooltipContent\":\"Contenido de información sobre herramientas\",\"uiElements.tooltip.basicExample\":\"Ejemplo Básico\",\"uiElements.tooltip.basicExampleSubTitle\":\"El uso más simple.\",\"uiElements.tooltip.placementTitle\":\"Colocación\",\"uiElements.tooltip.placementSubTitle\":\"La herramienta tiene 12 opciones de ubicación.\",\"uiElements.tooltip.TL\":\"TL\",\"uiElements.tooltip.TR\":\"TR\",\"uiElements.tooltip.LT\":\"LT\",\"uiElements.tooltip.LB\":\"LB\",\"uiElements.tooltip.RT\":\"RT\",\"uiElements.tooltip.RB\":\"RB\",\"uiElements.tooltip.BL\":\"licenciado en Derecho\",\"uiElements.tooltip.BR\":\"BR\",\"uiElements.tooltip.bottom\":\"Fondo\",\"uiElements.tooltip.right\":\"Derecha\",\"uiElements.tooltip.left\":\"Izquierda\",\"uiElements.tooltip.top\":\"Parte superior\",\"uiElements.tooltip.tooltipContentSpan\":\"La información sobre herramientas se mostrará cuando se introduzca el ratón.\",\"uiElements.tooltip.contentSpan\":\"Contenido de información sobre herramientas\",\"uiElements.tags.tags\":\"Etiquetas\",\"uiElements.tags.basicExample\":\"Ejemplo Básico\",\"uiElements.tags.basicExampleSubTitle\":\"Uso de la etiqueta básica   y podría ser cerrable por la propiedad cerrable del sistema. La etiqueta Closable soporta eventos onClose afterClose.\",\"uiElements.tags.tagOne\":\"Etiqueta 1\",\"uiElements.tags.tagTwo\":\"Etiqueta 2\",\"uiElements.tags.link\":\"Enlazar\",\"uiElements.tags.preventDefault\":\"Prevenga el Incumplimiento\",\"uiElements.tags.colorfulTag\":\"Etiqueta colorida\",\"uiElements.tags.hotTags\":\"Etiquetas populares\",\"uiElements.tags.hotTagsSubTitle\":\"Seleccione sus temas favoritos.\",\"uiElements.tags.hots\":\"Hots \",\"uiElements.tags.addRemoveDynamically\":\"Agregar y eliminar dinámicamente\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"Generando un conjunto de etiquetas por matriz   puede agregar y quitar dinámicamente. Se basa en el evento afterClose   que se activará mientras finaliza la animación de cierre.\",\"uiElements.tags.newTag\":\"+ Nueva etiqueta\",\"uiElements.timeline.timeline\":\"Cronograma\",\"uiElements.timeline.basicExample\":\"Ejemplo Básico\",\"uiElements.timeline.basicTimeline\":\"Línea de tiempo básica\",\"uiElements.timeline.lastNode\":\"Ultimo nodo\",\"uiElements.timeline.lastNodeContent\":\"Cuando la línea de tiempo está incompleta y en curso   poner un nodo fantasma por fin. set   pending =   true     o   pending =   un elemento React    \",\"uiElements.timeline.seeMore\":\"Ver más\",\"uiElements.timeline.custom\":\"Personalizado\",\"uiElements.timeline.customContent\":\"Establezca un nodo como un icono u otro elemento personalizado.\",\"uiElements.timeline.colorExample\":\"Ejemplo de color\",\"uiElements.timeline.colorExampleContent\":\"Establecer el color de los círculos. verde significa estado completado o de éxito   rojo significa advertencia o error y azul significa estado en curso u otro estado predeterminado.\",\"uiElements.timeline.createServiceSite\":\"Crear un sitio de servicios 2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"Resolver problemas de red iniciales 2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"Problemas de red resueltos 2015-09-01\",\"uiElements.timeline.technicalTesting\":\"Pruebas técnicas 2015-09-01\",\"uiElements.dropdown.dropdown\":\"Desplegable\",\"uiElements.dropdown.hoverDropdown\":\"Desplácese\",\"uiElements.dropdown.hoverMe\":\"Mírame\",\"uiElements.dropdown.hoverPlacement\":\"Despliegue de colocación de cola\",\"uiElements.dropdown.hoverDisableLink\":\"Desplazamiento con desplegable\",\"uiElements.dropdown.clickedDropdown\":\"Desplegable pulsado\",\"uiElements.dropdown.buttonDropdown\":\"Botón con menú desplegable\",\"uiElements.pagination.pagination\":\"Paginación\",\"uiElements.pagination.basic\":\"BASIC\",\"uiElements.pagination.more\":\"Más\",\"uiElements.pagination.changer\":\"Cambiador\",\"uiElements.pagination.jumper\":\"Saltador\",\"uiElements.pagination.miniSize\":\"Tamaño mini\",\"uiElements.pagination.simpleMode\":\"Modo simple\",\"uiElements.pagination.controlled\":\"Revisado\",\"uiElements.pagination.totalNumber\":\"Numero total\",\"uiElements.rating.rating\":\"Clasificación\",\"uiElements.rating.basicExample\":\"Ejemplo Básico\",\"uiElements.rating.basicExampleSubTitle\":\"El uso más simple.\",\"uiElements.rating.halfStar\":\"Media estrella\",\"uiElements.rating.halfStarSubTitle\":\"Soporte de media estrella.\",\"uiElements.rating.showCopywriting\":\"Mostrar copywriting\",\"uiElements.rating.showCopywritingSubTitle\":\"Añadir copywriting en los componentes de la tarifa.\",\"uiElements.rating.readOnly\":\"Solo lectura\",\"uiElements.rating.readOnlySubTitle\":\"Sólo lectura   no puede utilizar el ratón para interactuar.\",\"uiElements.rating.otherCharacter\":\"Otro Personaje\",\"uiElements.rating.otherCharacterSubTitle\":\"Reemplace la estrella predeterminada por otro carácter como alfabeto   dígito   iconfonte o incluso palabra china.\",\"uiElements.tree.tree\":\"Árbol\",\"uiElements.tree.basicExample\":\"Ejemplo básico\",\"uiElements.tree.basicExampleSubTitle\":\"El uso más básico   te dirá cómo usar checkable   seleccionable   disabled   defaultExpandKeys   y etc.\",\"uiElements.tree.basicControlledExample\":\"Ejemplo controlado básico\",\"uiElements.tree.basicControlledExampleSubTitle\":\"ejemplo controlado básico\",\"uiElements.tree.draggableExample\":\"Ejemplo arrastrable\",\"uiElements.tree.draggableExampleSubTitle\":\"Arrastre treeNode para insertar después del otro treeNode o inserte en el otro TreeNode padre.\",\"uiElements.tree.loadAsync\":\"Cargar datos asincrónicamente\",\"uiElements.tree.loadAsyncSubTitle\":\"Para cargar datos asincrónicamente cuando haga clic para expandir un treeNode.\",\"uiElements.tree.searchableExample\":\"Ejemplo de búsqueda\",\"uiElements.tree.searchableExampleSubTitle\":\"Árbol de búsqueda\",\"uiElements.tree.treeWithLine\":\"Árbol con línea\",\"shuffle.descriptionOne\":\"Netscape 2.0 se expande   introduciendo Javascript\",\"shuffle.descriptionTwo\":\"Jesse James Garrett lanza la especificación AJAX\",\"shuffle.descriptionThree\":\"jQuery 1.0 publicado\",\"shuffle.descriptionFour\":\"Primero underscore.js commit\",\"shuffle.descriptionFive\":\"Backbone.js se convierte en una cosa\",\"shuffle.descriptionSix\":\"Angular 1.0 liberado\",\"shuffle.descriptionSeven\":\"Reaccionar es de código abierto; los desarrolladores se regocijan\",\"toggle.list\":\"Lista\",\"toggle.grid\":\"Cuadrícula\",\"toggle.ascending\":\"Ascendente\",\"toggle.descending\":\"Descendente\",\"toggle.shuffle\":\"Barajar\",\"toggle.rotate\":\"Girar\",\"toggle.addItem\":\"Añadir artículo\",\"toggle.removeItem\":\"Remover el artículo\",\"contactlist.searchContacts\":\"Buscar contactos\",\"contactlist.addNewContact\":\"Añadir nuevo contacto\",\"notes.ChoseColor\":\"Elige un color para tu nota\",\"notes.addNote\":\"Añadir nueva nota\",\"page404.title\":\"404\",\"page404.subTitle\":\"Parece que te has perdido\",\"page404.description\":\"La página que estás buscando no existe o se ha movido.\",\"page404.backButton\":\"VOLVER A LA CASA\",\"page500.title\":\"500\",\"page500.subTitle\":\"error de servidor interno\",\"page500.description\":\"Algo salió mal. Por favor   inténtelo de nuevo.\",\"page500.backButton\":\"VOLVER A LA CASA\",\"page.forgetPassTitle\":\"Isomórfico\",\"page.forgetPassSubTitle\":\"¿Se te olvidó tu contraseña?\",\"page.forgetPassDescription\":\"Introduzca su correo electrónico y le enviaremos un enlace de restablecimiento.\",\"page.sendRequest\":\"Enviar petición\",\"page.resetPassTitle\":\"Isomórfico\",\"page.resetPassSubTitle\":\"Restablecer la contraseña\",\"page.resetPassDescription\":\"Introduzca una nueva contraseña y confirme.\",\"page.resetPassSave\":\"Salvar\",\"page.signInTitle\":\"Isomórfico\",\"page.signInRememberMe\":\"Recuérdame\",\"page.signInButton\":\"Registrarse\",\"page.signInPreview\":\"nombre de usuario  demo   contraseña  demodemo   o simplemente haga clic en cualquier botón.\",\"page.signInFacebook\":\"Iniciar sesión usando Facebook\",\"page.signInGooglePlus\":\"Acceder con Google Plus\",\"page.signInAuth0\":\"Iniciar sesión con Auth0\",\"page.signInForgotPass\":\"Se te olvidó tu contraseña\",\"page.signInCreateAccount\":\"Crear una cuenta Isomorphoic\",\"page.signUpTitle\":\"Isomórfico\",\"page.signUpTermsConditions\":\"Estoy de acuerdo con los términos y condiciones\",\"page.signUpButton\":\"Regístrate\",\"page.signUpFacebook\":\"Registrate con Facebook\",\"page.signUpGooglePlus\":\"Regístrese con Google Plus\",\"page.signUpAuth0\":\"Regístrese con Auth0\",\"page.signUpAlreadyAccount\":\"¿Ya tienes una cuenta? Registrarse.\",\"widget.reportswidget.label\":\"Ingresos\",\"widget.reportswidget.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.singleprogresswidget1.label\":\"Márketing\",\"widget.singleprogresswidget2.label\":\"Addvertisement\",\"widget.singleprogresswidget3.label\":\"Consultante\",\"widget.singleprogresswidget4.label\":\"Desarrollo\",\"widget.stickerwidget1.number\":\"210\",\"widget.stickerwidget1.text\":\"Correo electrónico no leído\",\"widget.stickerwidget2.number\":\"1749\",\"widget.stickerwidget2.text\":\"Subida de imagen\",\"widget.stickerwidget3.number\":\"3024\",\"widget.stickerwidget3.text\":\"Total de mensajes\",\"widget.stickerwidget4.number\":\"54\",\"widget.stickerwidget4.text\":\"Pedidos\",\"widget.salewidget1.label\":\"Ingresos\",\"widget.salewidget1.price\":\"15000 $\",\"widget.salewidget1.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget2.label\":\"Ingresos\",\"widget.salewidget2.price\":\"15000 $\",\"widget.salewidget2.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget3.label\":\"Ingresos\",\"widget.salewidget3.price\":\"15000 $\",\"widget.salewidget3.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget4.label\":\"Ingresos\",\"widget.salewidget4.price\":\"15000 $\",\"widget.salewidget4.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.cardwidget1.number\":\"110\",\"widget.cardwidget1.text\":\"Nuevos mensajes\",\"widget.cardwidget2.number\":\"100%\",\"widget.cardwidget2.text\":\"Volumen\",\"widget.cardwidget3.number\":\"137\",\"widget.cardwidget3.text\":\"Logro\",\"widget.progresswidget1.label\":\"Descargar\",\"widget.progresswidget1.details\":\"50% Completo\",\"widget.progresswidget2.label\":\"Apoyo\",\"widget.progresswidget2.details\":\"80% de clientes satisfechos\",\"widget.progresswidget3.label\":\"Subir\",\"widget.progresswidget3.details\":\"65% Completo\",\"widget.vcardwidget.name\":\"Jhon Doe\",\"widget.vcardwidget.title\":\"Sr. Desarrollador iOS\",\"widget.vcardwidget.description\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed eiusmod tempor ammet dolar consectetur adipisicing elit\",\"checkout.billingform.firstname\":\"Nombre de pila\",\"checkout.billingform.lastname\":\"Apellido\",\"checkout.billingform.company\":\"nombre de empresa\",\"checkout.billingform.email\":\"Dirección de correo electrónico\",\"checkout.billingform.mobile\":\"No móviles\",\"checkout.billingform.country\":\"País\",\"checkout.billingform.city\":\"Ciudad\",\"checkout.billingform.address\":\"Dirección\",\"checkout.billingform.addressoptional\":\"Apartamento   suite   unidad   etc. (opcional  \",\"checkout.billingform.checkbox\":\"¿Crea una cuenta?\",\"antTable.title.image\":\"Imagen\",\"antTable.title.firstName\":\"Nombre de pila\",\"antTable.title.lastName\":\"Apellido\",\"antTable.title.city\":\"Ciudad\",\"antTable.title.street\":\"Calle\",\"antTable.title.email\":\"Email\",\"antTable.title.dob\":\"DOB\",\"Map.leaflet.basicTitle\":\"Mapa básico\",\"Map.leaflet.basicMarkerTitle\":\"Mapa básico (con marcador predeterminado  \",\"Map.leaflet.leafletCustomMarkerTitle\":\"Mapa básico (con marcador de icono personalizado  \",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"Mapa básico (con marcador HTML personalizado  \",\"Map.leaflet.leafletMarkerClusterTitle\":\"Mapa básico (con grupo de marcadores  \",\"Map.leaflet.leafletRoutingTitle\":\"Enrutamiento básico del mapa\",\"Component.contacts.noOption\":\"No se ha encontrado ningún contacto\",\"email.send\":\"ENVIAR\",\"email.cancel\":\"CANCELAR\",\"email.compose\":\"COMPONER\",\"email.noMessage\":\"Por favor seleccione un correo para leer\",\"themeSwitcher.purchase\":\"Compra ahora\",\"themeSwitcher.settings\":\"AJUSTES\",\"sidebar.frappeChart\":\"Frappe Charts\",\"topbar.myprofile\":\"Mi perfil\",\"topbar.help\":\"Ayuda\",\"topbar.logout\":\"Cerrar sesión\",\"topbar.viewAll\":\"Ver todo\",\"topbar.viewCart\":\"Ver carro\",\"topbar.totalPrice\":\"Precio total\",\"sidebar.scrumboard\":\"tablero de scrum\"}");

/***/ }),

/***/ "3i/4":
/***/ (function(module, exports) {

module.exports = require("next-cookies");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "5SYD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentLanguage; });
/* harmony import */ var _iso_config_language_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9tsR");
/* harmony import */ var _iso_assets_images_flag_uk_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KV8h");
/* harmony import */ var _iso_assets_images_flag_china_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("UP2L");
/* harmony import */ var _iso_assets_images_flag_spain_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("0bIN");
/* harmony import */ var _iso_assets_images_flag_france_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("xfH5");
/* harmony import */ var _iso_assets_images_flag_italy_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ICFD");






const config = {
  defaultLanguage: _iso_config_language_config__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  options: [{
    languageId: 'english',
    locale: 'en',
    text: 'English',
    icon: _iso_assets_images_flag_uk_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
  }, {
    languageId: 'chinese',
    locale: 'zh',
    text: 'Chinese',
    icon: _iso_assets_images_flag_china_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
  }, {
    languageId: 'spanish',
    locale: 'es',
    text: 'Spanish',
    icon: _iso_assets_images_flag_spain_svg__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
  }, {
    languageId: 'french',
    locale: 'fr',
    text: 'French',
    icon: _iso_assets_images_flag_france_svg__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]
  }, {
    languageId: 'italian',
    locale: 'it',
    text: 'Italian',
    icon: _iso_assets_images_flag_italy_svg__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]
  }]
};
function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ "5ZGk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const actions = {
  INIT_DATA: 'ECOMMERCE_INIT_DATA',
  INIT_DATA_SAGA: 'ECOMMERCE_INIT_DATA_SAGA',
  UPDATE_DATA: 'ECOMMERCE_UPDATE_DATA',
  UPDATE_DATA_SAGA: 'ECOMMERCE_UPDATE_DATA_SAGA',
  CHANGE_VIEW: 'ECOMMERCE_CHANGE_VIEW',
  VIEW_TOPBAR_CART: 'ECOMMERCE_VIEW_TOPBAR_CART',
  initData: () => ({
    type: actions.INIT_DATA_SAGA
  }),
  changeView: view => ({
    type: actions.CHANGE_VIEW,
    view
  }),
  changeViewTopbarCart: viewTopbarCart => {
    return {
      type: actions.VIEW_TOPBAR_CART,
      viewTopbarCart
    };
  },
  changeProductQuantity: productQuantity => {
    return (dispatch, getState) => {
      const {
        products
      } = getState().Ecommerce;
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity
      });
    };
  },
  addToCart: product => {
    return (dispatch, getState) => {
      const {
        products,
        productQuantity
      } = getState().Ecommerce;
      const objectID = product.objectID;
      productQuantity.push({
        objectID,
        quantity: 1
      });
      products[objectID] = product;
      dispatch({
        type: actions.UPDATE_DATA_SAGA,
        products,
        productQuantity
      });
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "5cg1":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.swiperslider\":\"Curseur\",\"sidebar.email\":\"Email\",\"sidebar.chat\":\"Bavarder\",\"sidebar.ecommerce\":\"Commerce électronique\",\"sidebar.shop\":\"tienda\",\"sidebar.cart\":\"Carro\",\"sidebar.checkout\":\"revisa\",\"sidebar.cards\":\"Divertido Tarjetas\",\"sidebar.maps\":\"Mapas\",\"sidebar.googleMap\":\"Mapa de Google\",\"sidebar.leafletMap\":\"Mapa del folleto\",\"sidebar.firestorecrud\":\"Firestore CRUD\",\"sidebar.firestorecrudarticle\":\"Des articles\",\"sidebar.firestorecrudinvestor\":\"Investisseurs\",\"sidebar.calendar\":\"Calendario\",\"sidebar.notes\":\"Notas\",\"sidebar.todos\":\"Todos\",\"sidebar.contacts\":\"Contactos\",\"sidebar.shuffle\":\"Barajar\",\"sidebar.charts\":\"Gráficos\",\"sidebar.googleCharts\":\"Google Carts\",\"sidebar.recharts\":\"Recharts\",\"sidebar.reactVis\":\"Reaccionar Vis\",\"sidebar.reactChart2\":\"React-Chart-2\",\"sidebar.reactTrend\":\"Reaccionar\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"Formularios\",\"sidebar.input\":\"Entrada\",\"sidebar.editor\":\"Editor\",\"sidebar.formsWithValidation\":\"Formularios con validación\",\"sidebar.progress\":\"Progreso\",\"sidebar.button\":\"Botón\",\"sidebar.tab\":\"Lengüeta\",\"sidebar.checkbox\":\"Caja\",\"sidebar.radiobox\":\"Radiobox\",\"sidebar.transfer\":\"Transferir\",\"sidebar.autocomplete\":\"Autocompletar\",\"sidebar.boxOptions\":\"Opciones de Caja\",\"sidebar.uiElements\":\"Elementos de la interfaz de usuario\",\"sidebar.badge\":\"Distintivo\",\"sidebar.card2\":\"Tarjeta\",\"sidebar.corusel\":\"Parranda\",\"sidebar.collapse\":\"Colapso\",\"sidebar.popover\":\"Acercarse\",\"sidebar.tooltip\":\"Tooltip\",\"sidebar.tag\":\"Etiqueta\",\"sidebar.timeline\":\"Cronograma\",\"sidebar.dropdown\":\"Desplegable\",\"sidebar.pagination\":\"Paginación\",\"sidebar.rating\":\"Clasificación\",\"sidebar.tree\":\"Árbol\",\"sidebar.advancedElements\":\"Elementos avanzados\",\"sidebar.reactDates\":\"Reaccionar fechas\",\"sidebar.codeMirror\":\"Código Espejo\",\"sidebar.uppy\":\"Uppy Uploader\",\"sidebar.dropzone\":\"Zona de descenso\",\"sidebar.feedback\":\"Realimentación\",\"sidebar.alert\":\"Alerta\",\"sidebar.modal\":\"Modal\",\"sidebar.message\":\"Mensaje\",\"sidebar.notification\":\"Notificación\",\"sidebar.popConfirm\":\"Pop confirmar\",\"sidebar.spin\":\"Girar\",\"sidebar.tables\":\"Mesas\",\"sidebar.antTables\":\"Tablas de hormigas\",\"sidebar.pages\":\"Páginas\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"Registrarse\",\"sidebar.signUp\":\"Regístrate\",\"sidebar.forgotPw\":\"Olvidé contraseñas\",\"sidebar.resetPw\":\"Restablecer contraseñas\",\"sidebar.invoice\":\"Factura\",\"sidebar.menuLevels\":\"Niveles de menú\",\"sidebar.item1\":\"Artículo 1\",\"sidebar.item2\":\"Artículo 2\",\"sidebar.option1\":\"Opción 1\",\"sidebar.option2\":\"opcion 2\",\"sidebar.option3\":\"Opción 3\",\"sidebar.option4\":\"Opción 4\",\"sidebar.blankPage\":\"Página en blanco\",\"sidebar.githubSearch\":\"Github Buscar\",\"sidebar.youtubeSearch\":\"Búsqueda de Youtube\",\"languageSwitcher.label\":\"Cambiar idioma\",\"themeSwitcher\":\"Selector de temas\",\"themeSwitcher.Sidebar\":\"Barra lateral\",\"themeSwitcher.Topbar\":\"Barra superior\",\"themeSwitcher.Background\":\"Fondo\",\"feedback.alert.basicTitle\":\"Título Básico\",\"feedback.alert.successText\":\"Texto de éxito\",\"feedback.alert.infoText\":\"Texto de la información\",\"feedback.alert.warningText\":\"Texto de advertencia\",\"feedback.alert.errorText\":\"Texto de error\",\"feedback.alert.closableAlertType\":\"Tipo de Alerta Closable\",\"feedback.alert.iconAlertType\":\"Tipo de alerta de icono\",\"feedback.alert.iconInfoAlertType\":\"Tipo de Alerta\",\"feedback.alert.successTips\":\"consejos de éxito\",\"feedback.alert.successTipsDescription\":\"Descripción detallada y consejos sobre copywriting exitoso.\",\"feedback.alert.informationTips\":\"Notas informativas\",\"feedback.alert.informationDescription\":\"Descripción adicional e informaciones sobre copywriting.\",\"feedback.alert.warningTips\":\"Advertencia\",\"feedback.alert.warningDescription\":\"Este es un aviso de advertencia sobre copywriting.\",\"feedback.alert.errorTips\":\"Error\",\"feedback.alert.errorDescription\":\"Este es un mensaje de error acerca de copywriting.\",\"feedback.alert.modalTitle\":\"Modal uno con personalizar Footer\",\"feedback.alert.modalSubTitle\":\"Diálogo modal básico.\",\"feedback.alert.successTitle\":\"Éxito\",\"feedback.alert.infoTitle\":\"Información\",\"feedback.alert.errorTitle\":\"Error\",\"feedback.alert.warningTitle\":\"Advertencia\",\"feedback.alert.modalBlockTitle\":\"Modal\",\"feedback.alert.confirmationModalDialogue\":\"Cuadro de diálogo modal de confirmación\",\"feedback.alert.simpleModalDialogue\":\"Diálogo modal simple\",\"feedback.alert.message\":\"Mensaje\",\"feedback.alert.normalMessageTitle\":\"Mensaje normal\",\"feedback.alert.normalMessageSubtitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.displayMessage\":\"Mostrar mensaje normal\",\"feedback.alert.displayOtherTypeMessageTitle\":\"Otros tipos de mensaje\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"Mensajes de éxito   error y tipos de advertencia.\",\"feedback.alert.customizeDurationTitle\":\"Personalizar duración\",\"feedback.alert.customizeDurationSubTitle\":\"ustomize la duración de la exhibición del mensaje de 1.5s a 10s por defecto.\",\"feedback.alert.customizeDurationButton\":\"Duración de la pantalla personalizada\",\"feedback.alert.messageLoadingTitle\":\"Mensaje de carga\",\"feedback.alert.messageLoadingSubTitle\":\"Mostrar un indicador de carga global   que se descarta por sí mismo de forma asíncrona.\",\"feedback.alert.displayLoadIndicator\":\"Mostrar un indicador de carga\",\"feedback.alert.notification\":\"Notificación\",\"feedback.alert.notificationBasicTitle\":\"BASIC\",\"feedback.alert.notificationBasicSubTitle\":\"El uso más simple que cierre la caja de notificación después de 4.5s.\",\"feedback.alert.notificationBasicDescription\":\"Abrir el cuadro de notificación\",\"feedback.alert.notificationDurationTitle\":\"Duración después de la cual se cierra el cuadro de notificación\",\"feedback.alert.notificationDurationSubTitle\":\"La duración se puede utilizar para especificar cuánto tiempo permanece abierta la notificación. Una vez transcurrido el tiempo de duración   la notificación se cierra automáticamente. Si no se especifica   el valor predeterminado es 4  5 segundos. Si establece el valor en 0   el cuadro de notificación nunca se cerrará automáticamente.\",\"feedback.alert.notificationwithIconTitle\":\"Notificación con icono\",\"feedback.alert.notificationwithIconSubTitle\":\"Un cuadro de notificación con un icono en el lado izquierdo.\",\"feedback.alert.notificationwithCustomIconTitle\":\"Notificación con icono personalizado\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.notificationwithCustomButtonTitle\":\"Notificación con botón personalizado\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.popConfirm\":\"Pop confirmar\",\"feedback.alert.popConfirm.basicTitle\":\"Confirmación básica\",\"feedback.alert.popConfirm.basicSubTitle\":\"El ejemplo básico.\",\"feedback.alert.popConfirm.delete\":\"Borrar\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"Notificación con icono personalizado\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"Mensajes normales como retroalimentación.\",\"feedback.alert.popConfirm.TL\":\"TL\",\"feedback.alert.popConfirm.top\":\"Parte superior\",\"feedback.alert.popConfirm.TR\":\"TR\",\"feedback.alert.popConfirm.LT\":\"LT\",\"feedback.alert.popConfirm.left\":\"Izquierda\",\"feedback.alert.popConfirm.LB\":\"LB\",\"feedback.alert.popConfirm.RT\":\"RT\",\"feedback.alert.popConfirm.right\":\"Derecha\",\"feedback.alert.popConfirm.RB\":\"RB\",\"feedback.alert.popConfirm.Bl\":\"licenciado en Derecho\",\"feedback.alert.popConfirm.bottom\":\"Fondo\",\"feedback.alert.popConfirm.BR\":\"BR\",\"feedback.alert.spin\":\"Girar\",\"feedback.alert.spin.basicTitle\":\"Girar el tamaño\",\"feedback.alert.spin.background\":\"Girar con fondo\",\"feedback.alert.spin.backgroundDescription\":\"Descripción de Spin With Background\",\"feedback.alert.spin.loadingState\":\"Estado de carga\",\"feedback.alert.spin.alertTitle\":\"Título del mensaje de alerta\",\"feedback.alert.spin.alertDescription\":\"Más detalles sobre el contexto de esta alerta.\",\"forms.input.header\":\"Entrada\",\"forms.input.basicTitle\":\"Uso básico\",\"forms.input.basicSubTitle\":\"Ejemplo de uso básico.\",\"forms.input.variationsTitle\":\"Tres tamaños de entrada\",\"forms.input.variationsSubtitle\":\"Hay tres tamaños de un cuadro de entrada  grande (42px     predeterminado (35px   y pequeño (30px  . Nota  Dentro de los formularios   sólo se utiliza el tamaño grande.\",\"forms.input.groupTitle\":\"Grupo de entrada\",\"forms.input.groupSubTitle\":\"Ejemplo de Input.Group Nota  No necesita Col para controlar el ancho en el modo compacto.\",\"forms.input.autoSizingTitle\":\"Autosizing la altura para ajustar el contenido\",\"forms.input.autoSizingSubTitle\":\"prop de autosize para un tipo de entrada textarea hace que la altura se ajuste automáticamente en función del contenido. Se puede proporcionar un objeto de opciones al tamaño automático para especificar el número mínimo y máximo de líneas que la zona de texto ajustará automáticamente.\",\"forms.input.prePostTabTitle\":\"Pestaña Pre    Post\",\"forms.input.prePostTabSubTitle\":\"El uso de pre & amp; post tabs ejemplo ..\",\"forms.input.textAreaTitle\":\"Área de texto\",\"forms.input.textAreaSubTitle\":\"Para casos de entrada de usuario multi-línea   se puede utilizar una entrada cuyo tipo prop tiene el valor de textarea.\",\"forms.input.searchTitle\":\"Buscar\",\"forms.input.searchSubTitle\":\"Ejemplo de creación de un cuadro de búsqueda agrupando una entrada estándar con un botón de búsqueda\",\"forms.editor.header\":\"Editor\",\"forms.formsWithValidation.header\":\"Formulario de validación personalizado\",\"forms.formsWithValidation.failLabel\":\"Fallar\",\"forms.formsWithValidation.failHelp\":\"Debe ser la combinación de números & amp; alfabetos\",\"forms.formsWithValidation.warningLabel\":\"Advertencia\",\"forms.formsWithValidation.ValidatingLabel\":\"Validando\",\"forms.formsWithValidation.ValidatingHelp\":\"La información está siendo validada ...\",\"forms.formsWithValidation.SuccessLabel\":\"Éxito\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"Advertencia\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"Fallar\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"Debe ser la combinación de números & amp; alfabetos\",\"forms.progressBar.header\":\"Barra de progreso\",\"forms.progressBar.standardTitle\":\"Barra de progreso\",\"forms.progressBar.standardSubTitle\":\"Una barra de progreso estándar.\",\"forms.progressBar.circularTitle\":\"Barra de progreso circular\",\"forms.progressBar.circularSubTitle\":\"Una barra de progreso circular.\",\"forms.progressBar.miniTitle\":\"Barra de progreso de tamaño mini\",\"forms.progressBar.miniSubTitle\":\"Adecuado para un área estrecha.\",\"forms.progressBar.miniCircularTitle\":\"Una barra de progreso circular más pequeña.\",\"forms.progressBar.dynamicCircularTitle\":\"Barra de progreso circular dinámica\",\"forms.progressBar.dynamicCircularSubTitle\":\"Una barra de progreso dinámica es mejor.\",\"forms.progressBar.customTextTitle\":\"Formato de texto personalizado\",\"forms.progressBar.customTextSubTitle\":\"Puede personalizar el formato de texto configurando el formato.\",\"forms.progressBar.dashboardTitle\":\"Tablero\",\"forms.progressBar.dashboardSubTitle\":\"Un estilo de progreso en el tablero de instrumentos.\",\"forms.button.header\":\"Botones\",\"forms.button.simpleButton\":\"Tipo de botón\",\"forms.button.iconButton\":\"Icono de botón\",\"forms.button.simpleButtonPrimaryText\":\"Primario\",\"forms.button.simpleButtonDefaultText\":\"Defecto\",\"forms.button.simpleButtonDashedText\":\"Dañado\",\"forms.button.simpleButtonDangerText\":\"Peligro\",\"forms.button.iconPrimaryButton\":\"buscar\",\"forms.button.iconSimpleButton\":\"buscar\",\"forms.button.iconCirculerButton\":\"buscar\",\"forms.button.iconDashedButton\":\"buscar\",\"forms.button.SizedButton\":\"Tamaño del botón\",\"forms.button.DisabledButton\":\"Botón desactivado\",\"forms.button.LoadingButton\":\"Botón de carga\",\"forms.button.MultipleButton\":\"Botón múltiple\",\"forms.button.groupButton\":\"Grupo de botones\",\"forms.Tabs.header\":\"Pestañas\",\"forms.Tabs.simpleTabTitle\":\"buscar\",\"forms.Tabs.simpleTabSubTitle\":\"Pestañas inhabilitadas\",\"forms.Tabs.iconTabTitle\":\"Icono de las pestañas\",\"forms.Tabs.miniTabTitle\":\"Mini pestañas\",\"forms.Tabs.extraTabTitle\":\"Pestañas de acción adicionales\",\"forms.Tabs.TabpositionTitle\":\"Posición\",\"forms.Tabs.TabpositionSubTitle\":\"Posición de las pestañas  izquierda   derecha   arriba o abajo\",\"forms.Tabs.cardTitle\":\"Fichas de tipo de tarjeta\",\"forms.Tabs.editableTitle\":\"Agregar y cerrar pestañas\",\"forms.Tabs.verticalTitle\":\"Fichas de tipo vertical\",\"forms.Tabs.basicTitle\":\"Pestañas básicas\",\"forms.checkbox.header\":\"Caja\",\"forms.checkbox.basicTitle\":\"Casilla de verificación básica\",\"forms.checkbox.basicSubTitle\":\"Uso básico de la casilla de verificación.\",\"forms.checkbox.groupTitle\":\"Grupo de casillas de verificación\",\"forms.checkbox.groupSubTitle\":\"Genera un grupo de casillas de verificación de una matriz. Utilizar desactivado para deshabilitar una casilla de verificación.\",\"forms.checkbox.groupCheckTitle\":\"Grupo de casillas de verificación\",\"forms.checkbox.groupCheckSubTitle\":\"Genera un grupo de casillas de verificación de una matriz. Utilizar desactivado para deshabilitar una casilla de verificación.\",\"forms.radio.header\":\"Radio\",\"forms.radio.simpleTitle\":\"Radio básica\",\"forms.radio.simpleSubTitle\":\"El uso más simple. Utilizar desactivado para desactivar una radio.\",\"forms.radio.groupTitle\":\"Grupo de radio vertical\",\"forms.radio.groupSubTitle\":\"Vertical RadioGroup   con más radios.\",\"forms.radio.groupSecondTitle\":\"Grupo de radio\",\"forms.radio.groupSecondSubTitle\":\"Un grupo de componentes de radio.\",\"forms.radio.groupThirdTitle\":\"Grupo de radio\",\"forms.radio.groupThirdSubTitle\":\"Un grupo de componentes de radio.\",\"forms.transfer.header\":\"Transferir\",\"forms.transfer.SubTitle\":\"Transferir con un cuadro de búsqueda.\",\"forms.transfer.Title\":\"Buscar\",\"forms.autocomplete.header\":\"Autocompletar\",\"forms.autocomplete.simpleTitle\":\"Personalizado\",\"forms.autocomplete.simpleSubTitle\":\"Puede pasar AutoComplete.Option como hijos de Autocompletar   en lugar de utilizar dataSource\",\"forms.autocomplete.customizeTitle\":\"Personalizar el componente de entrada\",\"forms.autocomplete.customizeSubTitle\":\"Personalizar el componente de entrada\",\"uiElements.badge.badge\":\"Distintivo\",\"uiElements.badge.basicExample\":\"Ejemplo Básico\",\"uiElements.badge.basicExampleSubTitle\":\"Uso más simple. La insignia se ocultará cuando count sea 0   pero podemos usar showZero para mostrarlo.\",\"uiElements.badge.overflowCount\":\"Cuenta de desbordamiento\",\"uiElements.badge.overflowCountSubTitle\":\"OverflowCount se muestra cuando count es mayor que overflowCount. El valor predeterminado de overflowCount es 99.\",\"uiElements.badge.status\":\"Estado\",\"uiElements.badge.statusSubTitle\":\"Insignia autónoma con estado.\",\"uiElements.badge.success\":\"Éxito\",\"uiElements.badge.error\":\"Error\",\"uiElements.badge.default\":\"Defecto\",\"uiElements.badge.processing\":\"Tratamiento\",\"uiElements.badge.warning\":\"Advertencia\",\"uiElements.badge.redBadge\":\"Insignia roja\",\"uiElements.badge.redBadgeSubTitle\":\"Esto simplemente mostrará una insignia roja   sin un conteo específico.\",\"uiElements.badge.linkSomething\":\"Enlace algo\",\"uiElements.cards.cards\":\"Divertido Tarjetas\",\"uiElements.cards.basicCard\":\"Tarjeta básica\",\"uiElements.cards.basicCardSubTitle\":\"Una tarjeta básica que contiene un título   contenido y un contenido de esquina adicional.\",\"uiElements.cards.more\":\"Más\",\"uiElements.cards.cardTitle\":\"Título de la tarjeta\",\"uiElements.cards.cardContent\":\"Contenido de la tarjeta\",\"uiElements.cards.lorem\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor incididunt ut labore y dolore magna aliqua. Ut enim ad minim veniam   quis nostrud ejercicio ullamco laboris nisi ut aliquip ex y commodo consequat.\",\"uiElements.cards.noBorder\":\"Sin bordes\",\"uiElements.cards.noBorderSubTitle\":\"Una tarjeta sin fronteras sobre un fondo gris.\",\"uiElements.cards.gridCard\":\"Tarjeta de red\",\"uiElements.cards.gridCardSubTitle\":\"Las tarjetas suelen cooperar con el diseño de la cuadrícula en la página de vista general.\",\"uiElements.cards.loadingCard\":\"Carga de la tarjeta\",\"uiElements.cards.loadingCardSubTitle\":\"Muestra un indicador de carga mientras se está recuperando el contenido de la tarjeta.\",\"uiElements.cards.whateverContent\":\"Cualquier contenido\",\"uiElements.cards.customizedContentTitle\":\"Contenido personalizado\",\"uiElements.cards.customizedContent\":\"Muestra un indicador de carga mientras se está recuperando el contenido de la tarjeta.\",\"uiElements.cards.europeStreetBeat\":\"Europa Street beat\",\"uiElements.cards.instagram\":\"www.instagram.com\",\"uiElements.carousel.carousel\":\"Parranda\",\"uiElements.carousel.verticalCarousel\":\"Carrusel vertical\",\"uiElements.carousel.verticalCarouselSubTitle\":\"Paginación vertical. use   vertical = true\",\"uiElements.carousel.basicCarousel\":\"Carrusel básico\",\"uiElements.carousel.basicCarouselSubTitle\":\"Uso básico\",\"uiElements.carousel.fadeInTransition\":\"Fade In Transition\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"Las diapositivas utilizan el fundido para la transición.   effect = fade\",\"uiElements.carousel.scrollAutomatically\":\"Desplazarse automáticamente\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"Tiempo de desplazamiento a la siguiente tarjeta    imagen. auto reproducción\",\"uiElements.collapse.collapse\":\"Colapso\",\"uiElements.collapse.collapseSubTitle\":\"Se puede ampliar más de un panel a la vez   el primer panel se inicializa para estar activo en este caso. use   defaultActiveKey =   [keyNum]\",\"uiElements.collapse.text\":\"Un perro es un tipo de animal domesticado. Conocido por su lealtad y fidelidad   se puede encontrar como un invitado de bienvenida en muchos hogares de todo el mundo.\",\"uiElements.collapse.headerOne\":\"Este es el encabezado del panel 1\",\"uiElements.collapse.headerTwo\":\"Se trata de la cabecera del panel 2\",\"uiElements.collapse.headerThree\":\"Este es el encabezado del panel 3\",\"uiElements.collapse.headerNested\":\"Éste es panel del nido del panel\",\"uiElements.collapse.nestedExample\":\"Ejemplo anidado\",\"uiElements.collapse.nestedExampleSubTitle\":\"Collapse está anidado dentro del Collapse.\",\"uiElements.collapse.borderlessExample\":\"Ejemplo sin márgenes\",\"uiElements.collapse.borderlessExampleSubTitle\":\"Un estilo sin fronteras de Collapse. use   bordered =   false\",\"uiElements.collapse.accordion\":\"Acordeón\",\"uiElements.collapse.accordionSubTitle\":\"Acordeón   sólo se puede ampliar un panel cada vez. El primer panel se ampliará de forma predeterminada. utilizar acordeón\",\"uiElements.popover.popover\":\"Popover\",\"uiElements.popover.basicExample\":\"Ejemplo Básico\",\"uiElements.popover.basicExampleSubTitle\":\"El ejemplo más básico. El tamaño de la capa flotante depende de la región del contenido.\",\"uiElements.popover.hoverMe\":\"Mírame\",\"uiElements.popover.title\":\"Título\",\"uiElements.popover.titleTrigger\":\"Tres maneras de activar\",\"uiElements.popover.titleTriggerSubTitle\":\"El ratón para hacer clic   enfocar y moverse.\",\"uiElements.popover.focusMe\":\"Enfócame\",\"uiElements.popover.clickMe\":\"Haz click en mi\",\"uiElements.popover.placement\":\"Colocación\",\"uiElements.popover.placementSubTitle\":\"Hay 12 opciones de colocación disponibles.\",\"uiElements.popover.top\":\"Parte superior\",\"uiElements.popover.topLeft\":\"Arriba a la izquierda\",\"uiElements.popover.topRight\":\"Parte superior derecha\",\"uiElements.popover.leftTop\":\"Parte superior izquierda\",\"uiElements.popover.left\":\"Izquierda\",\"uiElements.popover.leftBottom\":\"Abajo a la izquierda\",\"uiElements.popover.rightTop\":\"Justo arriba\",\"uiElements.popover.right\":\"Derecha\",\"uiElements.popover.bottom\":\"Fondo\",\"uiElements.popover.bottomLeft\":\"Abajo Izquierda\",\"uiElements.popover.bottomRight\":\"Abajo a la derecha\",\"uiElements.popover.boxTitle\":\"Control del cierre del diálogo\",\"uiElements.popover.boxSubTitle\":\"Utilice el apoyo visible para controlar la visualización de la tarjeta.\",\"uiElements.popover.TR\":\"TR\",\"uiElements.popover.TL\":\"TL\",\"uiElements.popover.LT\":\"LT\",\"uiElements.popover.LB\":\"LB\",\"uiElements.popover.RT\":\"RT\",\"uiElements.popover.RB\":\"RB\",\"uiElements.popover.BL\":\"licenciado en Derecho\",\"uiElements.popover.BR\":\"BR\",\"uiElements.popover.close\":\"Cerca\",\"uiElements.tooltip.tooltip\":\"Tooltip\",\"uiElements.tooltip.tooltipContent\":\"Contenido de información sobre herramientas\",\"uiElements.tooltip.basicExample\":\"Ejemplo Básico\",\"uiElements.tooltip.basicExampleSubTitle\":\"El uso más simple.\",\"uiElements.tooltip.placementTitle\":\"Colocación\",\"uiElements.tooltip.placementSubTitle\":\"La herramienta tiene 12 opciones de ubicación.\",\"uiElements.tooltip.TL\":\"TL\",\"uiElements.tooltip.TR\":\"TR\",\"uiElements.tooltip.LT\":\"LT\",\"uiElements.tooltip.LB\":\"LB\",\"uiElements.tooltip.RT\":\"RT\",\"uiElements.tooltip.RB\":\"RB\",\"uiElements.tooltip.BL\":\"licenciado en Derecho\",\"uiElements.tooltip.BR\":\"BR\",\"uiElements.tooltip.bottom\":\"Fondo\",\"uiElements.tooltip.right\":\"Derecha\",\"uiElements.tooltip.left\":\"Izquierda\",\"uiElements.tooltip.top\":\"Parte superior\",\"uiElements.tooltip.tooltipContentSpan\":\"La información sobre herramientas se mostrará cuando se introduzca el ratón.\",\"uiElements.tooltip.contentSpan\":\"Contenido de información sobre herramientas\",\"uiElements.tags.tags\":\"Etiquetas\",\"uiElements.tags.basicExample\":\"Ejemplo Básico\",\"uiElements.tags.basicExampleSubTitle\":\"Uso de la etiqueta básica   y podría ser cerrable por la propiedad cerrable del sistema. La etiqueta Closable soporta eventos onClose afterClose.\",\"uiElements.tags.tagOne\":\"Etiqueta 1\",\"uiElements.tags.tagTwo\":\"Etiqueta 2\",\"uiElements.tags.link\":\"Enlazar\",\"uiElements.tags.preventDefault\":\"Prevenga el Incumplimiento\",\"uiElements.tags.colorfulTag\":\"Etiqueta colorida\",\"uiElements.tags.hotTags\":\"Etiquetas populares\",\"uiElements.tags.hotTagsSubTitle\":\"Seleccione sus temas favoritos.\",\"uiElements.tags.hots\":\"Hots\",\"uiElements.tags.addRemoveDynamically\":\"Agregar y eliminar dinámicamente\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"Generando un conjunto de etiquetas por matriz   puede agregar y quitar dinámicamente. Se basa en el evento afterClose   que se activará mientras finaliza la animación de cierre.\",\"uiElements.tags.newTag\":\"+ Nueva etiqueta\",\"uiElements.timeline.timeline\":\"Cronograma\",\"uiElements.timeline.basicExample\":\"Ejemplo Básico\",\"uiElements.timeline.basicTimeline\":\"Línea de tiempo básica\",\"uiElements.timeline.lastNode\":\"Ultimo nodo\",\"uiElements.timeline.lastNodeContent\":\"Cuando la línea de tiempo está incompleta y en curso   poner un nodo fantasma por fin. set   pending =   true     o   pending =   un elemento React\",\"uiElements.timeline.seeMore\":\"Ver más\",\"uiElements.timeline.custom\":\"Personalizado\",\"uiElements.timeline.customContent\":\"Establezca un nodo como un icono u otro elemento personalizado.\",\"uiElements.timeline.colorExample\":\"Ejemplo de color\",\"uiElements.timeline.colorExampleContent\":\"Establecer el color de los círculos. verde significa estado completado o de éxito   rojo significa advertencia o error y azul significa estado en curso u otro estado predeterminado.\",\"uiElements.timeline.createServiceSite\":\"Crear un sitio de servicios 2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"Resolver problemas de red iniciales 2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"Problemas de red resueltos 2015-09-01\",\"uiElements.timeline.technicalTesting\":\"Pruebas técnicas 2015-09-01\",\"uiElements.dropdown.dropdown\":\"Desplegable\",\"uiElements.dropdown.hoverDropdown\":\"Desplácese\",\"uiElements.dropdown.hoverMe\":\"Mírame\",\"uiElements.dropdown.hoverPlacement\":\"Despliegue de colocación de cola\",\"uiElements.dropdown.hoverDisableLink\":\"Desplazamiento con desplegable\",\"uiElements.dropdown.clickedDropdown\":\"Desplegable pulsado\",\"uiElements.dropdown.buttonDropdown\":\"Botón con menú desplegable\",\"uiElements.pagination.pagination\":\"Paginación\",\"uiElements.pagination.basic\":\"BASIC\",\"uiElements.pagination.more\":\"Más\",\"uiElements.pagination.changer\":\"Cambiador\",\"uiElements.pagination.jumper\":\"Saltador\",\"uiElements.pagination.miniSize\":\"Tamaño mini\",\"uiElements.pagination.simpleMode\":\"Modo simple\",\"uiElements.pagination.controlled\":\"Revisado\",\"uiElements.pagination.totalNumber\":\"Numero total\",\"uiElements.rating.rating\":\"Clasificación\",\"uiElements.rating.basicExample\":\"Ejemplo Básico\",\"uiElements.rating.basicExampleSubTitle\":\"El uso más simple.\",\"uiElements.rating.halfStar\":\"Media estrella\",\"uiElements.rating.halfStarSubTitle\":\"Soporte de media estrella.\",\"uiElements.rating.showCopywriting\":\"Mostrar copywriting\",\"uiElements.rating.showCopywritingSubTitle\":\"Añadir copywriting en los componentes de la tarifa.\",\"uiElements.rating.readOnly\":\"Solo lectura\",\"uiElements.rating.readOnlySubTitle\":\"Sólo lectura   no puede utilizar el ratón para interactuar.\",\"uiElements.rating.otherCharacter\":\"Otro Personaje\",\"uiElements.rating.otherCharacterSubTitle\":\"Reemplace la estrella predeterminada por otro carácter como alfabeto   dígito   iconfonte o incluso palabra china.\",\"uiElements.tree.tree\":\"Árbol\",\"uiElements.tree.basicExample\":\"Ejemplo básico\",\"uiElements.tree.basicExampleSubTitle\":\"El uso más básico   te dirá cómo usar checkable   seleccionable   disabled   defaultExpandKeys   y etc.\",\"uiElements.tree.basicControlledExample\":\"Ejemplo controlado básico\",\"uiElements.tree.basicControlledExampleSubTitle\":\"ejemplo controlado básico\",\"uiElements.tree.draggableExample\":\"Ejemplo arrastrable\",\"uiElements.tree.draggableExampleSubTitle\":\"Arrastre treeNode para insertar después del otro treeNode o inserte en el otro TreeNode padre.\",\"uiElements.tree.loadAsync\":\"Cargar datos asincrónicamente\",\"uiElements.tree.loadAsyncSubTitle\":\"Para cargar datos asincrónicamente cuando haga clic para expandir un treeNode.\",\"uiElements.tree.searchableExample\":\"Ejemplo de búsqueda\",\"uiElements.tree.searchableExampleSubTitle\":\"Árbol de búsqueda\",\"uiElements.tree.treeWithLine\":\"Árbol con línea\",\"shuffle.descriptionOne\":\"Netscape 2.0 se expande   introduciendo Javascript\",\"shuffle.descriptionTwo\":\"Jesse James Garrett lanza la especificación AJAX\",\"shuffle.descriptionThree\":\"jQuery 1.0 publicado\",\"shuffle.descriptionFour\":\"Primero underscore.js commit\",\"shuffle.descriptionFive\":\"Backbone.js se convierte en una cosa\",\"shuffle.descriptionSix\":\"Angular 1.0 liberado\",\"shuffle.descriptionSeven\":\"Reaccionar es de código abierto; los desarrolladores se regocijan\",\"toggle.list\":\"Lista\",\"toggle.grid\":\"Cuadrícula\",\"toggle.ascending\":\"Ascendente\",\"toggle.descending\":\"Descendente\",\"toggle.shuffle\":\"Barajar\",\"toggle.rotate\":\"Girar\",\"toggle.addItem\":\"Añadir artículo\",\"toggle.removeItem\":\"Remover el artículo\",\"contactlist.searchContacts\":\"Buscar contactos\",\"contactlist.addNewContact\":\"Añadir nuevo contacto\",\"notes.ChoseColor\":\"Elige un color para tu nota\",\"notes.addNote\":\"Añadir nueva nota\",\"page404.title\":\"404\",\"page404.subTitle\":\"Parece que te has perdido\",\"page404.description\":\"La página que estás buscando no existe o se ha movido.\",\"page404.backButton\":\"VOLVER A LA CASA\",\"page500.title\":\"500\",\"page500.subTitle\":\"error de servidor interno\",\"page500.description\":\"Algo salió mal. Por favor   inténtelo de nuevo.\",\"page500.backButton\":\"VOLVER A LA CASA\",\"page.forgetPassTitle\":\"Isomórfico\",\"page.forgetPassSubTitle\":\"¿Se te olvidó tu contraseña?\",\"page.forgetPassDescription\":\"Introduzca su correo electrónico y le enviaremos un enlace de restablecimiento.\",\"page.sendRequest\":\"Enviar petición\",\"page.resetPassTitle\":\"Isomórfico\",\"page.resetPassSubTitle\":\"Restablecer la contraseña\",\"page.resetPassDescription\":\"Introduzca una nueva contraseña y confirme.\",\"page.resetPassSave\":\"Salvar\",\"page.signInTitle\":\"Isomórfico\",\"page.signInRememberMe\":\"Recuérdame\",\"page.signInButton\":\"Registrarse\",\"page.signInPreview\":\"nombre de usuario  demo   contraseña  demodemo   o simplemente haga clic en cualquier botón.\",\"page.signInFacebook\":\"Iniciar sesión usando Facebook\",\"page.signInGooglePlus\":\"Acceder con Google Plus\",\"page.signInAuth0\":\"Iniciar sesión con Auth0\",\"page.signInForgotPass\":\"Se te olvidó tu contraseña\",\"page.signInCreateAccount\":\"Crear una cuenta Isomorphoic\",\"page.signUpTitle\":\"Isomórfico\",\"page.signUpTermsConditions\":\"Estoy de acuerdo con los términos y condiciones\",\"page.signUpButton\":\"Regístrate\",\"page.signUpFacebook\":\"Registrate con Facebook\",\"page.signUpGooglePlus\":\"Regístrese con Google Plus\",\"page.signUpAuth0\":\"Regístrese con Auth0\",\"page.signUpAlreadyAccount\":\"¿Ya tienes una cuenta? Registrarse.\",\"widget.reportswidget.label\":\"Ingresos\",\"widget.reportswidget.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.singleprogresswidget1.label\":\"Márketing\",\"widget.singleprogresswidget2.label\":\"Addvertisement\",\"widget.singleprogresswidget3.label\":\"Consultante\",\"widget.singleprogresswidget4.label\":\"Desarrollo\",\"widget.stickerwidget1.number\":\"210\",\"widget.stickerwidget1.text\":\"Correo electrónico no leído\",\"widget.stickerwidget2.number\":\"1749\",\"widget.stickerwidget2.text\":\"Subida de imagen\",\"widget.stickerwidget3.number\":\"3024\",\"widget.stickerwidget3.text\":\"Total de mensajes\",\"widget.stickerwidget4.number\":\"54\",\"widget.stickerwidget4.text\":\"Pedidos\",\"widget.salewidget1.label\":\"Ingresos\",\"widget.salewidget1.price\":\"15000 $\",\"widget.salewidget1.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget2.label\":\"Ingresos\",\"widget.salewidget2.price\":\"15000 $\",\"widget.salewidget2.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget3.label\":\"Ingresos\",\"widget.salewidget3.price\":\"15000 $\",\"widget.salewidget3.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.salewidget4.label\":\"Ingresos\",\"widget.salewidget4.price\":\"15000 $\",\"widget.salewidget4.details\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed hacer eiusmod tempor\",\"widget.cardwidget1.number\":\"110\",\"widget.cardwidget1.text\":\"Nuevos mensajes\",\"widget.cardwidget2.number\":\"100%\",\"widget.cardwidget2.text\":\"Volumen\",\"widget.cardwidget3.number\":\"137\",\"widget.cardwidget3.text\":\"Logro\",\"widget.progresswidget1.label\":\"Descargar\",\"widget.progresswidget1.details\":\"50% Completo\",\"widget.progresswidget2.label\":\"Apoyo\",\"widget.progresswidget2.details\":\"80% de clientes satisfechos\",\"widget.progresswidget3.label\":\"Subir\",\"widget.progresswidget3.details\":\"65% Completo\",\"widget.vcardwidget.name\":\"Jhon Doe\",\"widget.vcardwidget.title\":\"Sr. Desarrollador iOS\",\"widget.vcardwidget.description\":\"Lorem ipsum dolor sentarse amet   consectetur adipisicing elit   sed eiusmod tempor ammet dolar consectetur adipisicing elit\",\"checkout.billingform.firstname\":\"Nombre de pila\",\"checkout.billingform.lastname\":\"Apellido\",\"checkout.billingform.company\":\"nombre de empresa\",\"checkout.billingform.email\":\"Dirección de correo electrónico\",\"checkout.billingform.mobile\":\"No móviles\",\"checkout.billingform.country\":\"País\",\"checkout.billingform.city\":\"Ciudad\",\"checkout.billingform.address\":\"Dirección\",\"checkout.billingform.addressoptional\":\"Apartamento   suite   unidad   etc. (opcional\",\"checkout.billingform.checkbox\":\"¿Crea una cuenta?\",\"antTable.title.image\":\"Imagen\",\"antTable.title.firstName\":\"Nombre de pila\",\"antTable.title.lastName\":\"Apellido\",\"antTable.title.city\":\"Ciudad\",\"antTable.title.street\":\"Calle\",\"antTable.title.email\":\"Email\",\"antTable.title.dob\":\"DOB\",\"Map.leaflet.basicTitle\":\"Mapa básico\",\"Map.leaflet.basicMarkerTitle\":\"Mapa básico (con marcador predeterminado\",\"Map.leaflet.leafletCustomMarkerTitle\":\"Mapa básico (con marcador de icono personalizado\",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"Mapa básico (con marcador HTML personalizado\",\"Map.leaflet.leafletMarkerClusterTitle\":\"Mapa básico (con grupo de marcadores\",\"Map.leaflet.leafletRoutingTitle\":\"Enrutamiento básico del mapa\",\"Component.contacts.noOption\":\"No se ha encontrado ningún contacto\",\"email.send\":\"ENVIAR\",\"email.cancel\":\"CANCELAR\",\"email.compose\":\"COMPONER\",\"email.noMessage\":\"Por favor seleccione un correo para leer\",\"themeSwitcher.purchase\":\"ACHETER MAINTENANT\",\"themeSwitcher.settings\":\"AJUSTES\",\"sidebar.selectbox\":\"Seleccionar\",\"sidebar.frappeChart\":\"Frappe Charts\",\"topbar.myprofile\":\"Mon profil\",\"topbar.help\":\"Aidez-moi\",\"topbar.logout\":\"Connectez - Out\",\"topbar.viewAll\":\"Connectez - Out\",\"topbar.viewCart\":\"Voir le panier\",\"topbar.totalPrice\":\"Prix ​​total\",\"sidebar.scrumboard\":\"Scrum Board\"}");

/***/ }),

/***/ "7I1n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ InputSearch; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ Textarea; });

// UNUSED EXPORTS: InputGroup

// EXTERNAL MODULE: external "antd/lib/input"
var input_ = __webpack_require__("Uqqx");
var input_default = /*#__PURE__*/__webpack_require__.n(input_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "styled-theme"
var external_styled_theme_ = __webpack_require__("BnVt");

// EXTERNAL MODULE: ./library/helpers/style_utils.js
var style_utils = __webpack_require__("9OqM");

// CONCATENATED MODULE: ./components/uielements/styles/input.style.js




const InputWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputWrapper",
  componentId: "sc-lmpumv-0"
})(["&.ant-input{padding:4px 10px;width:100%;height:35px;cursor:text;text-align:", ";font-size:13px;line-height:1.5;color:", ";background-color:#fff;background-image:none;border:1px solid ", ";", ";", ";&:focus{border-color:", ";}&.ant-input-lg{height:42px;padding:6px 10px;}&.ant-input-sm{padding:1px 10px;height:30px;}&::-webkit-input-placeholder{text-align:", ";color:", ";}&:-moz-placeholder{text-align:", ";color:", ";}&::-moz-placeholder{text-align:", ";color:", ";}&:-ms-input-placeholder{text-align:", ";color:", ";}}"], props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0), props => props['data-rtl'] === 'rtl' ? 'right' : 'left', Object(external_styled_theme_["palette"])('grayscale', 0));

const InputGroupWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputGroupWrapper",
  componentId: "sc-lmpumv-1"
})(["&.ant-input-group{margin-bottom:10px;.ant-select{.ant-select-selector{height:35px;}}.ant-input{height:35px;}.ant-select-auto-complete{margin-right:", ";}.ant-input{border:1px solid ", ";&:first-child{border-radius:", ";}}.ant-input-group-addon:not(:first-child):not(:last-child),.ant-input-group-wrap:not(:first-child):not(:last-child),> .ant-input:not(:first-child):not(:last-child){padding:0 7px;border-left-width:", ";margin-right:", ";}.ant-input-group-addon{padding:4px 7px;font-size:12px;color:", ";text-align:center;background-color:", ";border:1px solid ", ";", ";&:first-child{border-right-width:", ";border-left-width:", ";border-radius:", ";}&:last-child{border-right-width:", ";border-left-width:", ";border-radius:", ";}.ant-select{.ant-select-selector{height:35px;background-color:inherit;margin:-1px;border:1px solid transparent;", ";}}}.ant-input-group-addon:not(:first-child):not(:last-child),.ant-input-group-wrap:not(:first-child):not(:last-child){border-left:0;border-right:0;}& > .ant-input:not(:first-child):not(:last-child){", ";}.ant-input:first-child:last-child{border-radius:4px;}&.ant-input-group-compact > *{border-right-width:", ";}&.ant-input-group-compact > .ant-select > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker .ant-input,&.ant-input-group-compact > .ant-select-auto-complete .ant-input,&.ant-input-group-compact > .ant-cascader-picker .ant-input,&.ant-input-group-compact > .ant-mention-wrapper .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker .ant-time-picker-input{border-right-width:", ";}&.ant-input-group-compact > *:first-child,&.ant-input-group-compact > .ant-select:first-child > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker:first-child .ant-input,&.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input,&.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input,&.ant-input-group-compact > .ant-mention-wrapper:first-child .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker:first-child .ant-time-picker-input{border-radius:", ";border-left-width:1px ", ";}&.ant-input-group-compact > *:last-child,&.ant-input-group-compact > .ant-select:last-child > .ant-select-selection,&.ant-input-group-compact > .ant-calendar-picker:last-child .ant-input,&.ant-input-group-compact > .ant-select-auto-complete:last-child .ant-input,&.ant-input-group-compact > .ant-cascader-picker:last-child .ant-input,&.ant-input-group-compact > .ant-mention-wrapper:last-child .ant-mention-editor,&.ant-input-group-compact > .ant-time-picker:last-child .ant-time-picker-input{border-radius:", ";border-right-width:", ";}.ant-calendar-picker-clear,.ant-calendar-picker-icon{right:", ";left:", ";}}&.ant-input-group-lg{.ant-input,> .ant-input-group-addon{padding:6px 10px;height:35px;}}"], props => props['data-rtl'] === 'rtl' ? '-1px' : '0', Object(external_styled_theme_["palette"])('border', 0), props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '-1px' : '0', Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('grayscale', 4), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["c" /* transition */])(), props => props['data-rtl'] === 'rtl' ? '1px' : '0', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', props => props['data-rtl'] === 'rtl' ? '0' : '1px', props => props['data-rtl'] === 'rtl' ? '1px' : '0', props => props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0', Object(style_utils["b" /* boxShadow */])(), ''
/* border-left: 0; */
, props => props['data-rtl'] === 'rtl' ? '1px ' : '0', props => props['data-rtl'] === 'rtl' ? '1px ' : '0', props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', ''
/* border-right-width: ${props =>
props['data-rtl'] === 'rtl' ? '1px' : '0'}; */
, props => props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0', props => props['data-rtl'] === 'rtl' ? '0 ' : '1px', props => props['data-rtl'] === 'rtl' ? 'inherit' : '8px', props => props['data-rtl'] === 'rtl' ? '8px' : 'inherit');

const TextAreaWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__TextAreaWrapper",
  componentId: "sc-lmpumv-2"
})(["&.ant-input{padding:4px 10px;width:100%;height:auto;cursor:text;font-size:13px;line-height:1.5;color:", ";background-color:#fff;background-image:none;border:1px solid ", ";", ";", ";&:focus{border-color:", ";}&::-webkit-input-placeholder{color:", ";}&:-moz-placeholder{color:", ";}&::-moz-placeholder{color:", ";}&:-ms-input-placeholder{color:", ";}}"], Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0));

const InputSearchWrapper = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "inputstyle__InputSearchWrapper",
  componentId: "sc-lmpumv-3"
})(["&.ant-input-affix-wrapper{background-color:#fff;background-image:none;border:1px solid ", ";padding:4px 10px;width:100%;height:35px;max-height:35px;", ";", ";.ant-input{height:auto}&:focus,&.ant-input-affix-wrapper-focused{border-color:", ";}&.ant-input-affix-wrapper-lg{height:42px;padding:6px 10px;}&.ant-input-affix-wrapper-sm{padding:1px 10px;height:30px;}&.ant-input-search:not(.ant-input-search-enter-button){padding-right:0;}.ant-input{cursor:text;font-size:13px;line-height:1.5;color:", ";&::-webkit-input-placeholder{color:", ";}&:-moz-placeholder{color:", ";}&::-moz-placeholder{color:", ";}&:-ms-input-placeholder{color:", ";}}.ant-input-search-icon{color:", ";&:hover{color:", ";}}}"], Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["a" /* borderRadius */])('4px'), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('grayscale', 0), Object(external_styled_theme_["palette"])('primary', 0));


// EXTERNAL MODULE: ./library/helpers/rtl.js
var rtl = __webpack_require__("evxR");

// CONCATENATED MODULE: ./components/uielements/input.js



const {
  Search,
  TextArea,
  Group
} = input_default.a;
const WDStyledInput = InputWrapper(input_default.a);
const StyledInput = Object(rtl["a" /* default */])(WDStyledInput);
const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = Object(rtl["a" /* default */])(WDInputGroup);
const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = Object(rtl["a" /* default */])(WDInputSearch);
const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = Object(rtl["a" /* default */])(WDTextarea);
/* harmony default export */ var input = __webpack_exports__["c"] = (StyledInput);


/***/ }),

/***/ "8209":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/1-f812b73300d908dbbff041662071e163.png";

/***/ }),

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


/***/ }),

/***/ "91UR":
/***/ (function(module, exports) {



/***/ }),

/***/ "9OqM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return borderRadius; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return boxShadow; });
// Transition
function transition(timing = 0.3) {
  return `
      -webkit-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -moz-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -ms-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      -o-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
      transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
  `;
} // Border Radius

function borderRadius(radius = 0) {
  return `
      -webkit-border-radius: ${radius};
      -moz-border-radius: ${radius};
      -ms-transition: ${radius};
      -o-border-radius: ${radius};
      border-radius: ${radius};
  `;
} // Box Shadow

function boxShadow(shadow = 'none') {
  return `
      -webkit-box-shadow: ${shadow};
      -moz-box-shadow: ${shadow};
      box-shadow: ${shadow};
  `;
}

/***/ }),

/***/ "9ryz":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/6-e02c5ab6dbacb7cbe3a50eff81451264.png";

/***/ }),

/***/ "9tsR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export langDir */
const language = 'english';
const langDir = 'ltr';
/* harmony default export */ __webpack_exports__["a"] = (language);

/***/ }),

/***/ "A+dB":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/en_US");

/***/ }),

/***/ "AElg":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/lib/icons/CheckOutlined");

/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AppInitialProps", {
  enumerable: true,
  get: function () {
    return _utils.AppInitialProps;
  }
});
Object.defineProperty(exports, "NextWebVitalsMetric", {
  enumerable: true,
  get: function () {
    return _utils.NextWebVitalsMetric;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _utils = __webpack_require__("1IPs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _appGetInitialProps() {
  _appGetInitialProps =
  /**
  * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
  * This allows for keeping state between navigation, custom error handling, injecting additional data.
  */
  _asyncToGenerator(function* ({
    Component,
    ctx
  }) {
    const pageProps = yield (0, _utils).loadGetInitialProps(Component, ctx);
    return {
      pageProps
    };
  });
  return _appGetInitialProps.apply(this, arguments);
}

function appGetInitialProps(_) {
  return _appGetInitialProps.apply(this, arguments);
}

class App extends _react.default.Component {
  render() {
    const {
      Component,
      pageProps
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps));
  }

}

App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
exports.default = App;

/***/ }),

/***/ "BnVt":
/***/ (function(module, exports) {

module.exports = require("styled-theme");

/***/ }),

/***/ "CEX1":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/8-ea1f3948459bd66e2c4e1ca92c0de2dd.png";

/***/ }),

/***/ "D52c":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/profile-bg-f96ea6b3bd5e2b78a7cc51be78b4874a.jpg";

/***/ }),

/***/ "Dtiu":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "EFYt":
/***/ (function(module, exports) {



/***/ }),

/***/ "EuFW":
/***/ (function(module, exports) {

module.exports = require("firebase/auth");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "FP+S":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/2-9e675418fd781f55734b4cbca5a2720d.png";

/***/ }),

/***/ "Gss8":
/***/ (function(module, exports) {

module.exports = require("antd/lib/notification");

/***/ }),

/***/ "ICFD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNTE2LjEyOSAyNDUuMTYxdi05MC4zMjJIMjgzLjg3MXY0OTAuMzIyaDIzMi4yNThWMjk2Ljc3NGMwLTcuMTI2IDUuNzc3LTEyLjkwMyAxMi45MDMtMTIuOTAzdi0yNS44MDdjLTcuMTI2IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDN6Ii8+PHBhdGggZmlsbD0iIzI1OTI0NSIgZD0iTTI0LjgwNyAxNTMuODM5aDIzNC4yNTh2NDkyLjMyMkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iIzI1OTI0NSIgZD0iTTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MC45MzYgNjQ2LjE2MVYyOTYuNzc0YzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM2gtMXYtMjcuODA3aDFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi05MS4zMjJoMjM0LjI1OHY0OTIuMzIySDU0MC45MzZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MS45MzYgMjQ1LjE2MWMwIDcuMTI2LTUuNzc3IDEyLjkwMy0xMi45MDMgMTIuOTAzdjI1LjgwN2M3LjEyNiAwIDEyLjkwMyA1Ljc3NyAxMi45MDMgMTIuOTAzdjM0OC4zODdoMjMyLjI1OFYxNTQuODM5SDU0MS45MzZ2OTAuMzIyeiIvPjxwYXRoIGQ9Ik03ODcuMDk3IDEyOS4wMzJIMTIuOTAzQzUuNzc3IDEyOS4wMzIgMCAxMzQuODEgMCAxNDEuOTM2djUxNi4xMjljMCA3LjEyNiA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI2IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNWMTQxLjkzNmMuMDAxLTcuMTI2LTUuNzc2LTEyLjkwNC0xMi45MDItMTIuOTA0em0tMTIuOTA0IDUxNi4xMjlINTQxLjkzNlYyOTYuNzc0YzAtNy4xMjYtNS43NzctMTIuOTAzLTEyLjkwMy0xMi45MDNzLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzdjM0OC4zODdIMjgzLjg3MVYxNTQuODM5aDIzMi4yNTh2OTAuMzIyYzAgNy4xMjYgNS43NzcgMTIuOTAzIDEyLjkwMyAxMi45MDNzMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDN2LTkwLjMyMmgyMzIuMjU4djQ5MC4zMjJ6TTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDdWMTU0LjgzOXoiLz48L3N2Zz4=");

/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "KV8h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMjQuODA3IDMzMS4zMjN2LTk4LjkxMmwxNDguMzY4IDk4LjkxMnoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMjUuODA3IDIzNC4yNzl2OTYuMDQ0aDE0NC4wNjV6bTEyOC43Ni04MC40NGgxNzYuNzU1djExNy44MzZ6Ii8+PHBhdGggZmlsbD0iIzEwM0I5QiIgZD0iTTMzMC4zMjIgMTU0LjgzOUgxNTcuODdsMTcyLjQ1MiAxMTQuOTY4ek0yNC44MDcgNDY4LjY3OGgxNDguMzY4TDI0LjgwNyA1NjcuNTg5eiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik0yNS44MDcgNDY5LjY3OHY5Ni4wNDNsMTQ0LjA2NS05Ni4wNDN6bTQ0Mi44NzEtMzE1LjgzOWgxNzYuNzU1TDQ2OC42NzggMjcxLjY3NXoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNNjQyLjEzIDE1NC44MzlINDY5LjY3OHYxMTQuOTY4em0tMTUuMzA1IDE3Ni40ODRsMTQ4LjM2OC05OC45MTJ2OTguOTEyeiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik03NzQuMTkzIDMzMC4zMjN2LTk2LjA0NGwtMTQ0LjA2NSA5Ni4wNDR6TTE1NC41NjcgNjQ2LjE2MWwxNzYuNzU1LTExNy44Mzh2MTE3LjgzOHoiLz48cGF0aCBmaWxsPSIjMTAzQjlCIiBkPSJNMTU3Ljg3IDY0NS4xNjFoMTcyLjQ1MnYtMTE0Ljk3em00NjguOTU1LTE3Ni40ODNoMTQ4LjM2OHY5OC45MTF6Ii8+PHBhdGggZmlsbD0iIzEwM0I5QiIgZD0iTTc3NC4xOTMgNTY1LjcyMXYtOTYuMDQzSDYzMC4xMjh6bS0zMDUuNTE1IDgwLjQ0VjUyOC4zMjNsMTc2Ljc1NSAxMTcuODM4eiIvPjxwYXRoIGZpbGw9IiMxMDNCOUIiIGQ9Ik00NjkuNjc4IDY0NS4xNjFINjQyLjEzbC0xNzIuNDUyLTExNC45N3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNjQyLjEzIDE1NC44MzlMNDY5LjY3OCAyNjkuODA3VjE1NC44MzloLTE5LjM1NnYxOTQuODM4aDMyMy44NzF2LTE5LjM1NEg2MzAuMTI4bDE0NC4wNjUtOTYuMDQ0di02OC4yMzRMNTI3Ljc3OCAzMzAuMzIzaC01OC4xdi00OC4wOTVsMTkxLjA2NS0xMjcuMzg5ek0xNTcuODcgNjQ1LjE2MWwxNzIuNDUyLTExNC45N3YxMTQuOTdoMTkuMzU2VjQ1MC4zMjJIMjUuODA3djE5LjM1NmgxNDQuMDY1TDI1LjgwNyA1NjUuNzIxdjY4LjIzM2wyNDYuNDE1LTE2NC4yNzZoNTguMXY0OC4xMDhsLTE5MS4wNiAxMjcuMzc1eiIvPjxwYXRoIGZpbGw9IiNFRDFGMzQiIGQ9Ik01Mi4yMTcgNjQ2LjE2MWwyNjYuMjI2LTE3Ny40ODNoMTIuODc5djE4LjYyN0w5My4wNDEgNjQ2LjE2MXoiLz48cGF0aCBmaWxsPSIjRUQxRjM0IiBkPSJNMzE4Ljc0NiA0NjkuNjc4TDU1LjUyIDY0NS4xNjFoMzcuMjE4TDMzMC4zMjIgNDg2Ljc3di0xNy4wOTJ6bS04NC42Mi0xMzguMzU1TDI0LjgwNyAxOTEuNDR2LTI3LjI2M2wyNTAuNzE4IDE2Ny4xNDZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTI1LjgwNyAxNjYuMDQ1djI0Ljg2MWwyMDguNjIyIDEzOS40MTdoMzcuNzkzem00OTguNjY5IDMwMi42MzNoMzkuNTVsMjExLjE2NyAxNDEuMTF2MjYuMDM0eiIvPjxwYXRoIGZpbGw9IiNFRDFGMzQiIGQ9Ik03NzQuMTkzIDYzMy45NTR2LTIzLjYzMmwtMjEwLjQ3LTE0MC42NDRoLTM1Ljk0NXpNNDY4LjY3OCAzMzEuMzIzdi0xOC42MTVsMjM4LjI4MS0xNTguODY5aDQwLjgyNEw0ODEuNTU3IDMzMS4zMjN6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTQ4MS4yNTQgMzMwLjMyM0w3NDQuNDggMTU0LjgzOWgtMzcuMjE4TDQ2OS42NzggMzEzLjI0NHYxNy4wNzl6Ii8+PHBhdGggZD0iTTgwMCA2NTcuOTc5VjE0MS45MzZjMC0uMDc2LS4wMTEtLjE1LS4wMTItLjIyNi0uMDA2LS4zNDgtLjAyLS42OTMtLjA1NC0xLjA0MS0uMDE0LS4xNDgtLjA0MS0uMjkxLS4wNjEtLjQzNi0uMDM2LS4yNzItLjA3LS41NDUtLjEyNS0uODE1LS4wMzgtLjE4OS0uMDktLjM3NC0uMTM2LS41NjEtLjA1NC0uMjItLjEwNC0uNDQtLjE2OS0uNjU5LS4wNjktLjIyNy0uMTUzLS40NDYtLjIzMi0uNjY2LS4wNjMtLjE3Mi0uMTE4LS4zNDYtLjE4OS0uNTE2YTEyLjMzIDEyLjMzIDAgMDAtLjM2OC0uNzljLS4wNTktLjExOS0uMTA4LS4yMzctLjE3LS4zNTQtLjE3OC0uMzMtLjM3LS42NS0uNTczLS45NjMtLjAyNy0uMDQzLS4wNS0uMDg4LS4wNzctLjEzMWExMy4yOTEgMTMuMjkxIDAgMDAtLjc4MS0xLjA1MmMtLjEyNS0uMTUzLS4yNjUtLjI4OS0uMzk2LS40MzUtLjE0Ni0uMTYyLS4yODctLjMzMS0uNDQyLS40ODVhMTIuMzA2IDEyLjMwNiAwIDAwLS42NzgtLjYxNmMtLjA4NC0uMDcyLS4xNjItLjE1My0uMjQ5LS4yMjQtLjIyMS0uMTgxLS40NTEtLjM0NC0uNjgyLS41MDktLjExLS4wOC0uMjE3LS4xNjctLjMzLS4yNDMtLjItLjEzNC0uNDA4LS4yNTEtLjYxNC0uMzc0LS4xNTgtLjA5NC0uMzEzLS4xOTQtLjQ3NS0uMjgtLjE2NC0uMDg4LS4zMzQtLjE2Mi0uNTAzLS4yNDMtLjIxNS0uMTAzLS40MjctLjIxLS42NDYtLjMwMy0uMTI2LS4wNTItLjI1NS0uMDkzLS4zODItLjE0LS4yNjctLjEtLjUzMi0uMjAxLS44MDYtLjI4NS0uMS0uMDMxLS4yMDEtLjA1LS4zMDMtLjA3OC0uMzAxLS4wODMtLjYwMi0uMTY3LS45MS0uMjI3LS4xMzgtLjAyNy0uMjc2LS4wNC0uNDE0LS4wNjMtLjI5OC0uMDUtLjU5Ni0uMS0uOS0uMTI3LS4zOTgtLjAzOC0uOC0uMDYtMS4yMDItLjA2LS4wMDktLjAwMi0uMDE4LS4wMDItLjAyNC0uMDAySDEyLjg4MmMtLjQwMy4wMDItLjgwNS4wMjItMS4yMDYuMDYtLjM1MS4wMzMtLjY5NS4wODgtMS4wMzguMTQ4LS4wOTEuMDE2LS4xODMuMDI0LS4yNzIuMDQyLS4zMzcuMDY3LS42NjYuMTU1LS45OTMuMjQ4LS4wNzIuMDIxLS4xNDYuMDM1LS4yMTguMDU3LS4yOTYuMDg5LS41ODMuMTk4LS44NzEuMzA4LS4xMDUuMDQtLjIxMy4wNzItLjMxNi4xMTctLjI0MS4xLS40NzMuMjE1LS43MDYuMzMtLjE0Ni4wNzItLjI5OC4xMzYtLjQ0Mi4yMTMtLjE4NC4wOTgtLjM1OS4yMS0uNTM4LjMxOC0uMTg0LjExLS4zNzIuMjE1LS41NTIuMzM1LS4xMzYuMDkxLS4yNjIuMTkzLS4zOTQuMjg4LS4yMDguMTUxLS40Mi4yOTktLjYyMS40NjQtLjEwOC4wODgtLjIwNy4xODgtLjMxMi4yNzktLjIwOC4xODItLjQyLjM2My0uNjE4LjU2MS0uMTg5LjE4OC0uMzYxLjM5MS0uNTM5LjU5LS4xLjExNC0uMjA3LjIxNy0uMzAzLjMzMy0uMjc1LjMzNC0uNTMyLjY4Mi0uNzcyIDEuMDQxbC0uMDEuMDE0Yy0uMDMzLjA1LS4wNTkuMTA0LS4wOTEuMTUzLS4xOTguMzA2LS4zODkuNjE4LS41NjEuOTM5LS4wNjUuMTItLjExNy4yNDYtLjE3Ny4zNjgtLjEyNi4yNTYtLjI1My41MTEtLjM2MS43NzYtLjA3Mi4xNzQtLjEyOS4zNTEtLjE5My41MjYtLjA3OS4yMTgtLjE2Mi40MzQtLjIzLjY1Ny0uMDY3LjIyLS4xMTUuNDQtLjE3LjY2My0uMDQ2LjE4Ni0uMDk4LjM2OC0uMTM0LjU1Ny0uMDUzLjI3Mi0uMDg5LjU0NS0uMTI1LjgxOS0uMDE5LjE0NS0uMDQ2LjI4OC0uMDYuNDM0LS4wMzUuMzQ4LS4wNDYuNjk1LS4wNTMgMS4wNDEuMDA0LjA3NS0uMDA2LjE0OS0uMDA2LjIyNXY1MTYuMTI3YzAgLjA3Ni4wMS4xNS4wMTIuMjI2LjAwNS4zNDguMDE5LjY5My4wNTMgMS4wNDEuMDE0LjE0Ni4wNDEuMjg5LjA2LjQzNi4wMzYuMjczLjA3MS41NDUuMTI1LjgxNy4wMzguMTg4LjA5LjM3My4xMzYuNTYxLjA1My4yMi4xMDMuNDQuMTY4LjY1OS4wNjkuMjI1LjE1MS40NDEuMjMyLjY2Mi4wNjMuMTc0LjExOS4zNS4xOTEuNTIxLjExLjI2OC4yMzkuNTI2LjM2Ni43ODQuMDU5LjExOS4xMDguMjM5LjE3Mi4zNTcuMTc3LjMzMS4zNy42NS41NzMuOTY0LjAyNy4wNDMuMDUuMDg4LjA3OC4xMzFsLjAwNy4wMWMuMjc4LjQxNy41ODUuODExLjkwOCAxLjE5MS4xLjExOC4yMDcuMjI3LjMxLjM0MmExMy4zNTkgMTMuMzU5IDAgMDAxLjEwNSAxLjA3N2MuMjU2LjIyLjUyMy40MjcuNzk3LjYyOC4xMTUuMDg0LjIyNC4xNzYuMzQuMjU1LjM4OS4yNjUuNzkyLjUwNyAxLjIwOS43My4xLjA1NC4yMDMuMDk3LjMwNS4xNDYuMzM1LjE2Ny42NzYuMzIyIDEuMDI3LjQ2MWExMy43MTkgMTMuNzE5IDAgMDAxLjQwOS40NTljLjEzNi4wMzYuMjcyLjA3My40MS4xMDQuMzU0LjA4MS43MTQuMTQ1IDEuMDc5LjE5Ni4xMjUuMDE4LjI1LjA0My4zNzUuMDU3LjQ1OS4wNTIuOTI2LjA4MyAxLjM5OS4wODQuMDIyIDAgLjA0NC4wMDQuMDY4LjAwNGg3NzQuMTUybC4wMTguMDAyYy4wMjIgMCAuMDQ1LS4wMDQuMDY3LS4wMDQuNDczLS4wMDIuOTM4LS4wMzIgMS4zOTgtLjA4NC4xMjQtLjAxNC4yNDYtLjA0LjM2OS0uMDU3LjM2Ny0uMDUyLjczLS4xMTUgMS4wODYtLjE5OGE5LjExIDkuMTEgMCAwMC40MDItLjEwNCAxMy4xNyAxMy4xNyAwIDAwMS4wMjItLjMxNmMuMTMxLS4wNDYuMjYtLjA5MS4zODktLjE0My4zNTYtLjE0LjcwMi0uMjk4IDEuMDQxLS40NjYuMDk3LS4wNDkuMTk2LS4wOS4yOTItLjE0Mi40Mi0uMjI0LjgyNC0uNDY4IDEuMjE1LS43MzIuMTEzLS4wNzguMjIxLS4xNjcuMzMtLjI0OGExMS43NzMgMTEuNzczIDAgMDAxLjIwOC0xYy4yNDQtLjIyOS40NzctLjQ2Ni43MDQtLjcxMi4xMDMtLjExMy4yMDgtLjIyMi4zMDgtLjMzOS4zMjMtLjM4LjYzLS43NzUuOTA4LTEuMTlsLjAwNy0uMDExYy4wMjktLjA0My4wNS0uMDg3LjA3OC0uMTMuMjAzLS4zMTMuMzk2LS42MzIuNTcyLS45NjQuMDYzLS4xMTcuMTEyLS4yMzcuMTcxLS4zNTQuMTI5LS4yNi4yNTYtLjUyLjM2OC0uNzkuMDctLjE3LjEyNS0uMzQ0LjE4OC0uNTE2LjA4MS0uMjIxLjE2NC0uNDQuMjMyLS42NjYuMDY1LS4yMTkuMTE1LS40MzguMTY5LS42NTcuMDQ3LS4xODguMDk4LS4zNzEuMTM2LS41NjMuMDU0LS4yNy4wOS0uNTQ0LjEyNC0uODE1LjAxOS0uMTQ2LjA0Ny0uMjg5LjA2Mi0uNDM3LjAzNS0uMzQ2LjA0Ny0uNjkzLjA1NC0xLjAzOS4wMDItLjA3Ni4wMTItLjE1LjAxMi0uMjI2di0uMDQ1YS4xNDYuMTQ2IDAgMDAuMDA0LS4wNDF6TTQ2OS42NzggMzEzLjI0NGwyMzcuNTg0LTE1OC40MDVoMzcuMjE5TDQ4MS4yNTQgMzMwLjMyM2g0Ni41MjRsMjQ2LjQxNS0xNjQuMjc3djE4My42MzFINDUwLjMyMlYxNTQuODM5aDIxMC40MjFMNDY5LjY3OCAyODIuMjI4djMxLjAxNnptLTEyMCAzNi40MzNIMjUuODA3VjIyMS45NDVsMTYyLjE3NiAxMDguMzc4aDQ2LjQ0NkwyNS44MDcgMTkwLjkwNnYtMjQuODZsMjQ2LjQxNiAxNjQuMjc3aDQ2LjUyNEw1NS41MiAxNTQuODM5aDI5NC4xNTd2MTk0LjgzOHpNMzMwLjMyMiA0ODYuNzdMOTIuNzM4IDY0NS4xNjFINTUuNTJsMjYzLjIyNi0xNzUuNDgzaC00Ni41MjRMMjUuODA3IDYzMy45NTRWNDUwLjMyM2gzMjMuODcxdjE5NC44MzlIMTM5LjI2MmwxOTEuMDYxLTEyNy4zNzVWNDg2Ljc3em0xMjAtMzYuNDQ4aDIzMy41NDljNy4xMjggMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM3MtNS43NzUtMTIuOTAyLTEyLjkwMy0xMi45MDJINDM3LjQxOWMtNy4xMjcgMC0xMi45MDMgNS43NzYtMTIuOTAzIDEyLjkwMnYyMDcuNzQyaC00OS4wMzFWNDM3LjQxOWMwLTcuMTI2LTUuNzc2LTEyLjkwMi0xMi45MDMtMTIuOTAySDI1LjgwN3YtNDkuMDMzaDMzNi43NzRjNy4xMjcgMCAxMi45MDMtNS43NzcgMTIuOTAzLTEyLjkwM1YxNTQuODM5aDQ5LjAzMXYyMDcuNzQyYzAgNy4xMjYgNS43NzYgMTIuOTAzIDEyLjkwMyAxMi45MDNoMzM2Ljc3NHY0OS4wMzNoLTM4LjcwOWMtNy4xMjggMC0xMi45MDMgNS43NzYtMTIuOTAzIDEyLjkwMiAwIDcuMTI2IDUuNzc1IDEyLjkwMyAxMi45MDMgMTIuOTAzaDM4LjcwOXYxMjguOTYzTDYxMC4xNzEgNDY5LjY3OGgtNDYuNDQ4bDIxMC40NzEgMTQwLjY0NXYyMy42MzFMNTI3Ljc3OCA0NjkuNjc4aC00Ni41MjRMNzQ0LjQ4IDY0NS4xNjFINDUwLjMyM1Y0NTAuMzIyeiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMzAuMzIyIDI2OS44MDdMMTU3Ljg3IDE1NC44MzlINTUuNTJsMjYzLjIyNiAxNzUuNDg0SDE4Ny45ODNMMjUuODA3IDIyMS45NDR2MTIuMzM1bDE0NC4wNjUgOTYuMDQ0SDI1LjgwN3YxOS4zNTRoMzIzLjg3MVYxNTQuODM5aC0xOS4zNTZ6bTEzOS4zNTYgMjYwLjM4NGwxNzIuNDUyIDExNC45N2gxMDIuMzVMNDgxLjI1NCA0NjkuNjc4aDEyOC45MThsMTY0LjAyMSAxMDkuNjA4di0xMy41NjVsLTE0NC4wNjUtOTYuMDQzaDE0NC4wNjV2LTE5LjM1NWgtMzguNzA5Yy03LjEyOCAwLTEyLjkwMy01Ljc3Ny0xMi45MDMtMTIuOTAzaC0yNS44MDdjMCA3LjEyNi01Ljc3NSAxMi45MDMtMTIuOTAzIDEyLjkwM0g0NTAuMzIydjE5NC44MzloMTkuMzU1VjUzMC4xOTF6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTM3NC40ODQgNjQ2LjE2MVY0MzcuNDE5YzAtNi41NjMtNS4zNC0xMS45MDItMTEuOTAzLTExLjkwMkgyNC44MDd2LTUxLjAzM2gzMzcuNzc0YzYuNTYzIDAgMTEuOTAzLTUuMzQgMTEuOTAzLTExLjkwM1YxNTMuODM5aDUxLjAzMXYyMDguNzQyYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2gzMzcuNzc0djUxLjAzM2gtMzkuNzA5Yy02LjU2MyAwLTExLjkwMyA1LjMzOS0xMS45MDMgMTEuOTAydjFoLTI3LjgwN3YtMWMwLTYuNTYzLTUuMzQtMTEuOTAyLTExLjkwMy0xMS45MDJINDM3LjQxOWMtNi41NjMgMC0xMS45MDMgNS4zMzktMTEuOTAzIDExLjkwMnYyMDguNzQyaC01MS4wMzJ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTcyMi41ODEgNDM3LjQxOWMwLTcuMTI2IDUuNzc1LTEyLjkwMiAxMi45MDMtMTIuOTAyaDM4LjcwOXYtNDkuMDMzSDQzNy40MTljLTcuMTI3IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDNWMTU0LjgzOWgtNDkuMDMxdjIwNy43NDJjMCA3LjEyNi01Ljc3NiAxMi45MDMtMTIuOTAzIDEyLjkwM0gyNS44MDd2NDkuMDMzaDMzNi43NzRjNy4xMjcgMCAxMi45MDMgNS43NzYgMTIuOTAzIDEyLjkwMnYyMDcuNzQyaDQ5LjAzMVY0MzcuNDE5YzAtNy4xMjYgNS43NzYtMTIuOTAyIDEyLjkwMy0xMi45MDJINjgzLjg3YzcuMTI4IDAgMTIuOTAzIDUuNzc2IDEyLjkwMyAxMi45MDJoMjUuODA4eiIvPjwvc3ZnPg==");

/***/ }),

/***/ "L7v+":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/7-352f351b82c8eab01b315b5289f4c135.png";

/***/ }),

/***/ "LPF2":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/user1-7815e9dffe9535f28e31594ca859a4fd.png";

/***/ }),

/***/ "P/cE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setCookie; });
/* unused harmony export removeCookie */
/* unused harmony export getCookie */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* unused harmony export auth */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return logout; });
/* unused harmony export withAuthSync */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("3i/4");
/* harmony import */ var next_cookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_cookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const setCookie = (key, value) => {
  if (false) {}
};
const removeCookie = key => {
  if (false) {}
};
const getCookie = (key, req) => {
  return false ? undefined : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return js_cookie__WEBPACK_IMPORTED_MODULE_3___default.a.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split('=')[1];
};

const login = ({
  token
}) => {
  js_cookie__WEBPACK_IMPORTED_MODULE_3___default.a.set('token', token, {
    expires: 1
  });
  next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/dashboard');
};
const auth = ctx => {
  const {
    token
  } = next_cookies__WEBPACK_IMPORTED_MODULE_2___default()(ctx);
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */

  if (ctx.req && !token) {
    ctx.res.writeHead(302, {
      Location: '/signin'
    });
    ctx.res.end();
  } // We already checked for server. This should only happen on client.


  if (!token) {
    next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/signin');
  }

  return token;
};
const logout = () => {
  js_cookie__WEBPACK_IMPORTED_MODULE_3___default.a.remove('token'); // to support logging out from all windows

  window.localStorage.setItem('logout', Date.now());
  next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/signin');
};
const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push('/signin');
      }
    };

    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      window.addEventListener('storage', syncLogout);
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [null]);
    return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__["jsx"])(WrappedComponent, _objectSpread({}, props));
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return _objectSpread(_objectSpread({}, componentProps), {}, {
      token
    });
  };

  return Wrapper;
};

/***/ }),

/***/ "Q94N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("27qp");
/* harmony import */ var antd_lib_popover__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_popover__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["a"] = (antd_lib_popover__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "QCuh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: ButtonGroup

// EXTERNAL MODULE: external "antd/lib/button"
var button_ = __webpack_require__("eGmO");
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "styled-theme"
var external_styled_theme_ = __webpack_require__("BnVt");

// EXTERNAL MODULE: ./library/helpers/style_utils.js
var style_utils = __webpack_require__("9OqM");

// CONCATENATED MODULE: ./components/uielements/styles/button.style.js




const Buttons = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "buttonstyle__Buttons",
  componentId: "sc-15097sb-0"
})(["&.ant-btn{display:inline-block;margin-bottom:0;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;line-height:1.5;padding:0 25px;font-size:14px;border-radius:4px;height:36px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;color:", ";border-color:", ";", ";&:hover{border-color:", ";color:", ";}> .anticon + span,> span + .anticon{margin:", ";}.anticon-right{transform:", ";}.anticon-left{transform:", ";}&.ant-btn-primary{background-color:", ";border-color:", ";&:hover{background-color:", ";border-color:", ";color:#fff;}}&.ant-btn-sm{padding:0 15px;height:28px;font-size:12px;&.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline){padding:", ";.anticon{margin:", ";}}}&.ant-btn-lg{padding:0 35px;font-size:14px;height:42px;}&.ant-btn-primary{color:#ffffff;}&.ant-btn-dashed{border-style:dashed;border-color:", ";&:hover{color:", ";border-color:", ";}}&.ant-btn-danger{background-color:", ";border-color:", ";color:#ffffff;&:hover{background-color:", ";border-color:", ";}&.ant-btn-background-ghost{color:", ";background-color:transparent;border-color:", ";&:hover{color:", ";border-color:", ";}}}&.ant-btn-circle,&.ant-btn-circle-outline{width:35px;padding:0;font-size:14px;border-radius:50%;height:35px;&.ant-btn-sm{padding:0;height:28px;width:28px;font-size:12px;}&.ant-btn-lg{padding:0;font-size:14px;height:42px;width:42px;}}&.ant-btn.disabled,&.ant-btn[disabled],&.ant-btn.disabled:hover,&.ant-btn[disabled]:hover,&.ant-btn.disabled:focus,&.ant-btn[disabled]:focus,&.ant-btn.disabled:active,&.ant-btn[disabled]:active,&.ant-btn.disabled.active,&.ant-btn[disabled].active{color:", ";background-color:#f7f7f7;border-color:", ";cursor:not-allowed;}&.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) .anticon{margin:", ";}&.isoButton{display:inline-block;margin-bottom:0;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:0;white-space:nowrap;line-height:1.5;padding:0 25px;font-size:13px;border-radius:4px;height:35px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;color:#ffffff;background-color:", ";", ";&:hover{background-color:", ";}&.isoBtnSm{padding:0 15px;height:28px;font-size:12px;}&.isoBtnLg{padding:0 35px;font-size:14px;height:42px;}}}+ .ant-btn-group{margin-left:", " !important;margin-right:", " !important;}"], Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), props => props['data-rtl'] === 'rtl' ? '0 0.5em 0 0' : '0 0 0 0.5em', props => props['data-rtl'] === 'rtl' ? 'rotate(180deg)' : 'rotate(0)', props => props['data-rtl'] === 'rtl' ? 'rotate(180deg)' : 'rotate(0)', Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 10), Object(external_styled_theme_["palette"])('primary', 10), props => props['data-rtl'] === 'rtl' ? '0 24px 0 15px' : '0 15px 0 24px', props => props['data-rtl'] === 'rtl' ? '0 -17px 0 0' : '0 0 0 -17px', Object(external_styled_theme_["palette"])('border', 1), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('error', 0), Object(external_styled_theme_["palette"])('error', 0), Object(external_styled_theme_["palette"])('error', 2), Object(external_styled_theme_["palette"])('error', 2), Object(external_styled_theme_["palette"])('error', 0), Object(external_styled_theme_["palette"])('error', 0), Object(external_styled_theme_["palette"])('error', 2), Object(external_styled_theme_["palette"])('error', 2), Object(external_styled_theme_["palette"])('grayscale', 2), Object(external_styled_theme_["palette"])('border', 0), props => props['data-rtl'] === 'rtl' ? '0 -14px 0 0' : '0 0 0 -14px', Object(external_styled_theme_["palette"])('primary', 0), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 2), props => props['data-rtl'] === 'rtl' ? '0' : '-1px', props => props['data-rtl'] === 'rtl' ? '-1px' : '0');

const RadioButtons = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "buttonstyle__RadioButtons",
  componentId: "sc-15097sb-1"
})([".ant-radio-button-wrapper{height:35px;line-height:33px;color:", ";border:1px solid ", ";border-left:0;background:#fff;padding:0 20px;&:hover,&.ant-radio-button-wrapper-focused{color:", ";}&.ant-radio-button-wrapper-checked{background:#fff;border-color:", ";color:", ";box-shadow:-1px 0 0 0 ", ";}}"], Object(external_styled_theme_["palette"])('text', 1), Object(external_styled_theme_["palette"])('border', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0));

const ButtonsGroup = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "buttonstyle__ButtonsGroup",
  componentId: "sc-15097sb-2"
})(["&.ant-btn-group{.ant-btn{margin:0;margin-right:0;display:inline-block;margin-bottom:0;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;border-color:", ";white-space:nowrap;line-height:1.5;padding:0 8px;font-size:14px;border-radius:0;height:36px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;", ";&:hover{border-color:", ";}&.ant-btn-dashed{border-style:dashed;&:hover{border-color:", ";}}&.ant-btn-primary{border-color:", ";&:hover{border-color:", ";}}}> .ant-btn:first-child:not(:last-child){border-radius:", ";}> .ant-btn:last-child:not(:first-child){border-radius:", ";}.ant-btn-primary:last-child:not(:first-child),.ant-btn-primary + .ant-btn-primary{border-left-color:", ";border-right-color:", ";}.ant-btn-primary:first-child:not(:last-child){border-left-color:", ";border-right-color:", ";}.ant-btn + .ant-btn,+ .ant-btn{margin-left:", " !important;margin-right:", " !important;}&.ant-btn-group-lg{> .ant-btn{padding:0 35px;font-size:14px;height:42px;}}&.ant-btn-group-sm{> .ant-btn{padding:0 15px;height:28px;font-size:12px;}}}&.ant-btn-group + &.ant-btn-group{margin-left:", " !important;margin-right:", " !important;}"], Object(external_styled_theme_["palette"])('border', 1), Object(style_utils["c" /* transition */])(), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 10), props => props['data-rtl'] === 'rtl' ? '0 4px 4px 0' : '4px 0 0 4px', props => props['data-rtl'] === 'rtl' ? '4px 0 0 4px' : '0 4px 4px 0', props => props['data-rtl'] === 'rtl' ? Object(external_styled_theme_["palette"])('primary', 0) : Object(external_styled_theme_["palette"])('primary', 2), props => props['data-rtl'] === 'rtl' ? Object(external_styled_theme_["palette"])('primary', 2) : Object(external_styled_theme_["palette"])('primary', 0), props => props['data-rtl'] === 'rtl' ? Object(external_styled_theme_["palette"])('primary', 2) : Object(external_styled_theme_["palette"])('primary', 0), props => props['data-rtl'] === 'rtl' ? Object(external_styled_theme_["palette"])('primary', 0) : Object(external_styled_theme_["palette"])('primary', 2), props => props['data-rtl'] === 'rtl' ? '0' : '-1px', props => props['data-rtl'] === 'rtl' ? '-1px' : '0', props => props['data-rtl'] === 'rtl' ? '0' : '-1px', props => props['data-rtl'] === 'rtl' ? '-1px' : '0');

const GhostButtons = ComponentName => external_styled_components_default()(ComponentName).withConfig({
  displayName: "buttonstyle__GhostButtons",
  componentId: "sc-15097sb-3"
})([".ant-btn-background-ghost{background:transparent !important;border-color:#fff;color:#fff;&.ant-btn-primary{color:", ";background-color:transparent;border-color:", ";}}"], Object(external_styled_theme_["palette"])('primary', 0), Object(external_styled_theme_["palette"])('primary', 0));


// EXTERNAL MODULE: ./library/helpers/rtl.js
var rtl = __webpack_require__("evxR");

// CONCATENATED MODULE: ./components/uielements/button.js



const AntButton = Buttons(button_default.a);
const isoButton = Object(rtl["a" /* default */])(AntButton);
const AntButtonGroup = ButtonsGroup(button_default.a.Group);
const ButtonGroup = Object(rtl["a" /* default */])(AntButtonGroup);
/* harmony default export */ var uielements_button = __webpack_exports__["a"] = (isoButton);


/***/ }),

/***/ "QG7G":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/it_IT");

/***/ }),

/***/ "QghY":
/***/ (function(module, exports) {

module.exports = require("antd/lib/popconfirm");

/***/ }),

/***/ "REkD":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/3-e100e074855b75b5e33ae8baca7d379c.png";

/***/ }),

/***/ "RmXt":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "Rv81":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getView; });
function getView(width) {
  let newView = 'MobileView';

  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }

  return newView;
}
const actions = {
  COLLPSE_CHANGE: 'COLLPSE_CHANGE',
  COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  CLEAR_MENU: 'CLEAR_MENU',
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE
  }),
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== 'DesktopView';
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height
    };
  },
  toggleOpenDrawer: () => ({
    type: actions.COLLPSE_OPEN_DRAWER
  }),
  changeOpenKeys: openKeys => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys
  }),
  changeCurrent: current => ({
    type: actions.CHANGE_CURRENT,
    current
  }),
  clearMenu: () => ({
    type: actions.CLEAR_MENU
  })
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "SPb+":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/9-ac29f02d365c936fe7c761337e09d702.png";

/***/ }),

/***/ "TPgy":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.supplier\":\"Supplier\",\"sidebar.location\":\"Lokasi\",\"sidebar.pengguna\":\"Kelola Pengguna\",\"sidebar.hewan\":\"Hewan\",\"sidebar.pemilik\":\"Pemilik Hewan\",\"sidebar.dashboard\":\"Dashboard\",\"sidebar.klien\":\"Klien\",\"title.klienbaru\":\"Klien Baru\",\"title.addowner\":\"Pemilik Hewan\",\"sidebar.email\":\"Email\",\"sidebar.chat\":\"Chat\",\"sidebar.ecommerce\":\"Ecommerce\",\"sidebar.shop\":\"Shop\",\"sidebar.cart\":\"Cart\",\"sidebar.checkout\":\"Checkout\",\"sidebar.cards\":\"Cards\",\"sidebar.maps\":\"Maps\",\"sidebar.firestorecrud\":\"Firestore CRUD\",\"sidebar.firestorecrudarticle\":\"Articles\",\"sidebar.firestorecrudinvestor\":\"Investors\",\"sidebar.googleMap\":\"Google Map\",\"sidebar.leafletMap\":\"Leaflet Map\",\"sidebar.calendar\":\"Calendar\",\"sidebar.notes\":\"Notes\",\"sidebar.todos\":\"Todos\",\"sidebar.contacts\":\"Contacts\",\"sidebar.shuffle\":\"Shuffle\",\"sidebar.charts\":\"Charts\",\"sidebar.googleCharts\":\"Google Carts\",\"sidebar.recharts\":\"Recharts\",\"sidebar.reactVis\":\"React Vis\",\"sidebar.reactChart2\":\"React-Chart-2\",\"sidebar.reactTrend\":\"React-Trend\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"Forms\",\"sidebar.input\":\"Input\",\"sidebar.editor\":\"Editor\",\"sidebar.formsWithValidation\":\"Forms With Validation\",\"sidebar.progress\":\"Progress\",\"sidebar.button\":\"Button\",\"sidebar.tab\":\"Tab\",\"sidebar.checkbox\":\"Checkbox\",\"sidebar.radiobox\":\"Radiobox\",\"sidebar.transfer\":\"Transfer\",\"sidebar.autocomplete\":\"AutoComplete\",\"sidebar.boxOptions\":\"Box Options\",\"sidebar.uiElements\":\"UI Elements\",\"sidebar.badge\":\"Badge\",\"sidebar.card2\":\"Card\",\"sidebar.corusel\":\"Carousal\",\"sidebar.collapse\":\"Collapse\",\"sidebar.popover\":\"Pop Over\",\"sidebar.tooltip\":\"Tooltip\",\"sidebar.tag\":\"Tag\",\"sidebar.timeline\":\"Timeline\",\"sidebar.dropdown\":\"Dropdown\",\"sidebar.pagination\":\"Pagination\",\"sidebar.rating\":\"Rating\",\"sidebar.tree\":\"Tree\",\"sidebar.advancedElements\":\"Advanced Elements\",\"sidebar.reactDates\":\"React Dates\",\"sidebar.swiperslider\":\"Swiper Slider\",\"sidebar.codeMirror\":\"Code Mirror\",\"sidebar.uppy\":\"Uppy Uploader\",\"sidebar.dropzone\":\"Drop Zone\",\"sidebar.feedback\":\"Feedback\",\"sidebar.alert\":\"Alert\",\"sidebar.modal\":\"Modal\",\"sidebar.message\":\"Message\",\"sidebar.notification\":\"Notification\",\"sidebar.popConfirm\":\"Pop Confirm\",\"sidebar.spin\":\"Spin\",\"sidebar.tables\":\"Tables\",\"sidebar.antTables\":\"Ant Tables\",\"sidebar.pages\":\"Pages\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"Sign In\",\"sidebar.signUp\":\"Sign Up\",\"sidebar.forgotPw\":\"Forgot Passwords\",\"sidebar.resetPw\":\"Reset Passwords\",\"sidebar.invoice\":\"Invoice\",\"sidebar.menuLevels\":\"Menu Levels\",\"sidebar.item1\":\"Item 1\",\"sidebar.item2\":\"Item 2\",\"sidebar.option1\":\"Option 1\",\"sidebar.option2\":\"Option 2\",\"sidebar.option3\":\"Option 3\",\"sidebar.option4\":\"Option 4\",\"sidebar.blankPage\":\"Blank Page\",\"sidebar.githubSearch\":\"Github Search\",\"sidebar.youtubeSearch\":\"Youtube Search\",\"sidebar.scrumboard\":\"Scrum Board\",\"sidebar.profile\":\"Profile\",\"sidebar.quiz\":\"Quiz\",\"sidebar.authCheck\":\"Check Auth Status\",\"sidebar.swiperSlider\":\"Swiper Slider\",\"languageSwitcher.label\":\"Change Language\",\"themeSwitcher\":\"Theme Switcher\",\"themeSwitcher.Sidebar\":\"Sidebar\",\"themeSwitcher.Topbar\":\"Topbar\",\"themeSwitcher.Background\":\"Background\",\"feedback.alert.basicTitle\":\"Basic Title\",\"feedback.alert.successText\":\"Success text\",\"feedback.alert.infoText\":\"Info Text\",\"feedback.alert.warningText\":\"Warning Text\",\"feedback.alert.errorText\":\"Error Text\",\"feedback.alert.closableAlertType\":\"Closable Alert Type\",\"feedback.alert.iconAlertType\":\"Icon Alert Type\",\"feedback.alert.iconInfoAlertType\":\"Icon Info Alert Type\",\"feedback.alert.successTips\":\"success tips\",\"feedback.alert.successTipsDescription\":\"Detailed description and advices about successful copywriting.\",\"feedback.alert.informationTips\":\"Informational Notes\",\"feedback.alert.informationDescription\":\"Additional description and informations about copywriting.\",\"feedback.alert.warningTips\":\"Warning\",\"feedback.alert.warningDescription\":\"This is a warning notice about copywriting.\",\"feedback.alert.errorTips\":\"Error\",\"feedback.alert.errorDescription\":\"This is an error message about copywriting.\",\"feedback.alert.modalTitle\":\"Modal one with customize Footer\",\"feedback.alert.modalSubTitle\":\"Basic modal dialog.\",\"feedback.alert.successTitle\":\"Success\",\"feedback.alert.infoTitle\":\"Info\",\"feedback.alert.errorTitle\":\"Error\",\"feedback.alert.warningTitle\":\"Warning\",\"feedback.alert.modalBlockTitle\":\"Modal\",\"feedback.alert.confirmationModalDialogue\":\"Confirmation modal dialog\",\"feedback.alert.simpleModalDialogue\":\"Simple modal dialog\",\"feedback.alert.message\":\"Message\",\"feedback.alert.normalMessageTitle\":\"Normal Message\",\"feedback.alert.normalMessageSubtitle\":\"Normal messages as feedbacks.\",\"feedback.alert.displayMessage\":\"Display normal message\",\"feedback.alert.displayOtherTypeMessageTitle\":\"Other Types of Message\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"Messages of success   error and warning types.\",\"feedback.alert.customizeDurationTitle\":\"Customize duration\",\"feedback.alert.customizeDurationSubTitle\":\"ustomize message display duration from default 1.5s to 10s.\",\"feedback.alert.customizeDurationButton\":\"Customized display duration\",\"feedback.alert.messageLoadingTitle\":\"Message of loading\",\"feedback.alert.messageLoadingSubTitle\":\"Display a global loading indicator   which is dismissed by itself asynchronously.\",\"feedback.alert.displayLoadIndicator\":\"Display a loading indicator\",\"feedback.alert.notification\":\"Notification\",\"feedback.alert.notificationBasicTitle\":\"Basic\",\"feedback.alert.notificationBasicSubTitle\":\"The simplest usage that close the notification box after 4.5s.\",\"feedback.alert.notificationBasicDescription\":\"Open the notification box\",\"feedback.alert.notificationDurationTitle\":\"Duration after which the notification box is closed\",\"feedback.alert.notificationDurationSubTitle\":\"Duration can be used to specify how long the notification stays open. After the duration time elapses   the notification closes automatically. If not specified   default value is 4.5 seconds. If you set the value to 0   the notification box will never close automatically.\",\"feedback.alert.notificationwithIconTitle\":\"Notification with icon\",\"feedback.alert.notificationwithIconSubTitle\":\"A notification box with a icon at the left side.\",\"feedback.alert.notificationwithCustomIconTitle\":\"Notification with custom icon\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"Normal messages as feedbacks.\",\"feedback.alert.notificationwithCustomButtonTitle\":\"Notification with custom button\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"Normal messages as feedbacks.\",\"feedback.alert.popConfirm\":\"Pop Confirm\",\"feedback.alert.popConfirm.basicTitle\":\"Basic Confirm\",\"feedback.alert.popConfirm.basicSubTitle\":\"The basic example.\",\"feedback.alert.popConfirm.delete\":\"Delete\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"Notification with custom icon\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"Normal messages as feedbacks.\",\"feedback.alert.popConfirm.TL\":\"TL\",\"feedback.alert.popConfirm.top\":\"Top\",\"feedback.alert.popConfirm.TR\":\"TR\",\"feedback.alert.popConfirm.LT\":\"LT\",\"feedback.alert.popConfirm.left\":\"Left\",\"feedback.alert.popConfirm.LB\":\"LB\",\"feedback.alert.popConfirm.RT\":\"RT\",\"feedback.alert.popConfirm.right\":\"Right\",\"feedback.alert.popConfirm.RB\":\"RB\",\"feedback.alert.popConfirm.Bl\":\"BL\",\"feedback.alert.popConfirm.bottom\":\"Bottom\",\"feedback.alert.popConfirm.BR\":\"BR\",\"feedback.alert.spin\":\"Spin\",\"feedback.alert.spin.basicTitle\":\"Size Spin\",\"feedback.alert.spin.background\":\"Spin With Background\",\"feedback.alert.spin.backgroundDescription\":\"Spin With Background description\",\"feedback.alert.spin.loadingState\":\"Loading State\",\"feedback.alert.spin.alertTitle\":\"Alert message title\",\"feedback.alert.spin.alertDescription\":\"Further details about the context of this alert.\",\"forms.input.header\":\"Input\",\"forms.input.basicTitle\":\"Basic usage\",\"forms.input.basicSubTitle\":\"Basic usage example.\",\"forms.input.variationsTitle\":\"Three sizes of Input\",\"forms.input.variationsSubtitle\":\"There are three sizes of an Input box  large (42px  、default (35px   and small (30px  . Note  Inside of forms   only the large size is used.\",\"forms.input.groupTitle\":\"Input Group\",\"forms.input.groupSubTitle\":\"Input.Group example Note  You dont need Col to control the width in the compact mode.\",\"forms.input.autoSizingTitle\":\"Autosizing the height to fit the content\",\"forms.input.autoSizingSubTitle\":\"autosize prop for a textarea type of Input makes the height to automatically adjust based on the content. An options object can be provided to autosize to specify the minimum and maximum number of lines the textarea will automatically adjust.\",\"forms.input.prePostTabTitle\":\"Pre    Post tab\",\"forms.input.prePostTabSubTitle\":\"Using pre &amp; post tabs example..\",\"forms.input.textAreaTitle\":\"Textarea\",\"forms.input.textAreaSubTitle\":\"For multi-line user input cases   an input whose type prop has the value of textarea can be used.\",\"forms.input.searchTitle\":\"Search\",\"forms.input.searchSubTitle\":\"Example of creating a search box by grouping a standard input with a search button\",\"forms.editor.header\":\"Editor\",\"forms.formsWithValidation.header\":\"Customized Validation Form\",\"forms.formsWithValidation.failLabel\":\"Fail\",\"forms.formsWithValidation.failHelp\":\"Should be combination of numbers & alphabets\",\"forms.formsWithValidation.warningLabel\":\"Warning\",\"forms.formsWithValidation.ValidatingLabel\":\"Validating\",\"forms.formsWithValidation.ValidatingHelp\":\"The information is being validated...\",\"forms.formsWithValidation.SuccessLabel\":\"Success\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"Warning\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"Fail\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"Should be combination of numbers & alphabets\",\"forms.progressBar.header\":\"Progress Bar\",\"forms.progressBar.standardTitle\":\"Progress bar\",\"forms.progressBar.standardSubTitle\":\"A standard progress bar.\",\"forms.progressBar.circularTitle\":\"Circular Progress bar\",\"forms.progressBar.circularSubTitle\":\"A circular progress bar.\",\"forms.progressBar.miniTitle\":\"Mini size progress bar\",\"forms.progressBar.miniSubTitle\":\"Appropriate for a narrow area.\",\"forms.progressBar.miniCircularTitle\":\"A smaller circular progress bar.\",\"forms.progressBar.dynamicCircularTitle\":\"Dynamic circular progress bar\",\"forms.progressBar.dynamicCircularSubTitle\":\"A dynamic progress bar is better.\",\"forms.progressBar.customTextTitle\":\"Custom text format\",\"forms.progressBar.customTextSubTitle\":\"You can custom text format by setting format.\",\"forms.progressBar.dashboardTitle\":\"Dashboard\",\"forms.progressBar.dashboardSubTitle\":\"A dashboard style of progress.\",\"forms.button.header\":\"Buttons\",\"forms.button.simpleButton\":\"Button Type\",\"forms.button.iconButton\":\"Button Icon\",\"forms.button.simpleButtonPrimaryText\":\"Primary\",\"forms.button.simpleButtonDefaultText\":\"Default\",\"forms.button.simpleButtonDashedText\":\"Dashed\",\"forms.button.simpleButtonDangerText\":\"Danger\",\"forms.button.iconPrimaryButton\":\"search\",\"forms.button.iconSimpleButton\":\"search\",\"forms.button.iconCirculerButton\":\"search\",\"forms.button.iconDashedButton\":\"search\",\"forms.button.SizedButton\":\"Button Size\",\"forms.button.DisabledButton\":\"Button Disabled\",\"forms.button.LoadingButton\":\"Button Loading\",\"forms.button.MultipleButton\":\"Multiple Button\",\"forms.button.groupButton\":\"Button Group\",\"forms.Tabs.header\":\"Tabs\",\"forms.Tabs.simpleTabTitle\":\"search\",\"forms.Tabs.simpleTabSubTitle\":\"Disabled Tabs\",\"forms.Tabs.iconTabTitle\":\"Icon Tabs\",\"forms.Tabs.miniTabTitle\":\"Mini Tabs\",\"forms.Tabs.extraTabTitle\":\"Extra Action Tabs\",\"forms.Tabs.TabpositionTitle\":\"Position\",\"forms.Tabs.TabpositionSubTitle\":\"Tabss position  left   right   top or bottom\",\"forms.Tabs.cardTitle\":\"Card Type Tabs\",\"forms.Tabs.editableTitle\":\"Add and Close Tabs\",\"forms.Tabs.verticalTitle\":\"Vertical Type Tabs\",\"forms.Tabs.basicTitle\":\"Basic Tabs\",\"forms.checkbox.header\":\"Checkbox\",\"forms.checkbox.basicTitle\":\"Basic Checkbox\",\"forms.checkbox.basicSubTitle\":\"Basic usage of checkbox.\",\"forms.checkbox.groupTitle\":\"Checkbox Group\",\"forms.checkbox.groupSubTitle\":\"Generate a group of checkboxes from an array. Use disabled to disable a checkbox.\",\"forms.checkbox.groupCheckTitle\":\"Checkbox Group\",\"forms.checkbox.groupCheckSubTitle\":\"Generate a group of checkboxes from an array. Use disabled to disable a checkbox.\",\"forms.radio.header\":\"Radio\",\"forms.radio.simpleTitle\":\"Basic Radio\",\"forms.radio.simpleSubTitle\":\"The simplest use. Use disabled to disable a radio.\",\"forms.radio.groupTitle\":\"Vertical RadioGroup\",\"forms.radio.groupSubTitle\":\"Vertical RadioGroup   with more radios.\",\"forms.radio.groupSecondTitle\":\"RadioGroup\",\"forms.radio.groupSecondSubTitle\":\"A group of radio components.\",\"forms.radio.groupThirdTitle\":\"RadioGroup\",\"forms.radio.groupThirdSubTitle\":\"A group of radio components.\",\"forms.transfer.header\":\"Transfer\",\"forms.transfer.SubTitle\":\"Transfer with a search box.\",\"forms.transfer.Title\":\"Search\",\"forms.autocomplete.header\":\"Autocomplete\",\"forms.autocomplete.simpleTitle\":\"Customized\",\"forms.autocomplete.simpleSubTitle\":\"You could pass AutoComplete.Option as children of AutoComplete   instead of using dataSource\",\"forms.autocomplete.customizeTitle\":\"Customize Input Component\",\"forms.autocomplete.customizeSubTitle\":\"Customize Input Component\",\"uiElements.badge.badge\":\"Badge\",\"uiElements.badge.basicExample\":\"Basic Example\",\"uiElements.badge.basicExampleSubTitle\":\"Simplest Usage. Badge will be hidden when count is 0   but we can use showZero to show it.\",\"uiElements.badge.overflowCount\":\"Overflow Count\",\"uiElements.badge.overflowCountSubTitle\":\"OverflowCount is displayed when count is larger than overflowCount. The default value of overflowCount is 99.\",\"uiElements.badge.status\":\"Status\",\"uiElements.badge.statusSubTitle\":\"Standalone badge with status.\",\"uiElements.badge.success\":\"Success\",\"uiElements.badge.error\":\"Error\",\"uiElements.badge.default\":\"Default\",\"uiElements.badge.processing\":\"Processing\",\"uiElements.badge.warning\":\"Warning\",\"uiElements.badge.redBadge\":\"Red badge\",\"uiElements.badge.redBadgeSubTitle\":\"This will simply display a red badge   without a specific count.\",\"uiElements.badge.linkSomething\":\"Link something\",\"uiElements.cards.cards\":\"Cards\",\"uiElements.cards.basicCard\":\"Basic card\",\"uiElements.cards.basicCardSubTitle\":\"A basic card containing a title   content and an extra corner content.\",\"uiElements.cards.more\":\"More\",\"uiElements.cards.cardTitle\":\"Card Title\",\"uiElements.cards.cardContent\":\"Card content\",\"uiElements.cards.lorem\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\",\"uiElements.cards.noBorder\":\"No Border\",\"uiElements.cards.noBorderSubTitle\":\"A borderless card on a gray background.\",\"uiElements.cards.gridCard\":\"Grid card\",\"uiElements.cards.gridCardSubTitle\":\"Cards usually cooperate with grid layout in overview page.\",\"uiElements.cards.loadingCard\":\"Loading card\",\"uiElements.cards.loadingCardSubTitle\":\"Shows a loading indicator while the contents of the card is being fetched.\",\"uiElements.cards.whateverContent\":\"Whatever content\",\"uiElements.cards.customizedContentTitle\":\"Customized Content\",\"uiElements.cards.customizedContent\":\"Shows a loading indicator while the contents of the card is being fetched.\",\"uiElements.cards.europeStreetBeat\":\"Europe Street beat\",\"uiElements.cards.instagram\":\"www.instagram.com\",\"uiElements.carousel.carousel\":\"Carousal\",\"uiElements.carousel.verticalCarousel\":\"Vertical Carousel\",\"uiElements.carousel.verticalCarouselSubTitle\":\"Vertical pagination. use   vertical=true\",\"uiElements.carousel.basicCarousel\":\"Basic Carousel\",\"uiElements.carousel.basicCarouselSubTitle\":\"Basic usage\",\"uiElements.carousel.fadeInTransition\":\"Fade In Transition\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"Slides use fade for transition.   effect=fade\",\"uiElements.carousel.scrollAutomatically\":\"Scroll Automatically\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"Timing of scrolling to the next card  picture. autoplay\",\"uiElements.collapse.collapse\":\"Collapse\",\"uiElements.collapse.collapseSubTitle\":\"More than one panel can be expanded at a time   the first panel is initialized to be active in this case. use   defaultActiveKey=  [keyNum]\",\"uiElements.collapse.text\":\"A dog is a type of domesticated animal. Known for its loyalty and faithfulness   it can be found as a welcome guest in many households across the world.\",\"uiElements.collapse.headerOne\":\"This is panel header 1\",\"uiElements.collapse.headerTwo\":\"This is panel header 2\",\"uiElements.collapse.headerThree\":\"This is panel header 3\",\"uiElements.collapse.headerNested\":\"This is panel nest panel\",\"uiElements.collapse.nestedExample\":\"Nested Example\",\"uiElements.collapse.nestedExampleSubTitle\":\"Collapse is nested inside the Collapse.\",\"uiElements.collapse.borderlessExample\":\"Borderless Example\",\"uiElements.collapse.borderlessExampleSubTitle\":\"A borderless style of Collapse. use   bordered=  false\",\"uiElements.collapse.accordion\":\"Accordion\",\"uiElements.collapse.accordionSubTitle\":\"Accordion mode   only one panel can be expanded at a time. The first panel will be expanded by default. use accordion\",\"uiElements.popover.popover\":\"Popover\",\"uiElements.popover.basicExample\":\"Basic Example\",\"uiElements.popover.basicExampleSubTitle\":\"The most basic example. The size of the floating layer depends on the contents region.\",\"uiElements.popover.hoverMe\":\"Hover me\",\"uiElements.popover.title\":\"Title\",\"uiElements.popover.titleTrigger\":\"Three ways to trigger\",\"uiElements.popover.titleTriggerSubTitle\":\"Mouse to click   focus and move in.\",\"uiElements.popover.focusMe\":\"Focus me\",\"uiElements.popover.clickMe\":\"Click me\",\"uiElements.popover.placement\":\"Placement\",\"uiElements.popover.placementSubTitle\":\"There are 12 placement options available.\",\"uiElements.popover.top\":\"Top\",\"uiElements.popover.topLeft\":\"Top Left\",\"uiElements.popover.topRight\":\"Top Right\",\"uiElements.popover.leftTop\":\"Left Top\",\"uiElements.popover.left\":\"Left\",\"uiElements.popover.leftBottom\":\"Left Bottom\",\"uiElements.popover.rightTop\":\"Right Top\",\"uiElements.popover.right\":\"Right\",\"uiElements.popover.bottom\":\"Bottom\",\"uiElements.popover.bottomLeft\":\"Bottom Left\",\"uiElements.popover.bottomRight\":\"Bottom Right\",\"uiElements.popover.boxTitle\":\"Controlling the close of the dialog\",\"uiElements.popover.boxSubTitle\":\"Use visible prop to control the display of the card.\",\"uiElements.popover.TR\":\"TR\",\"uiElements.popover.TL\":\"TL\",\"uiElements.popover.LT\":\"LT\",\"uiElements.popover.LB\":\"LB\",\"uiElements.popover.RT\":\"RT\",\"uiElements.popover.RB\":\"RB\",\"uiElements.popover.BL\":\"BL\",\"uiElements.popover.BR\":\"BR\",\"uiElements.popover.close\":\"Close\",\"uiElements.tooltip.tooltip\":\"Tooltip\",\"uiElements.tooltip.tooltipContent\":\"Tooltip Content\",\"uiElements.tooltip.basicExample\":\"Basic Example\",\"uiElements.tooltip.basicExampleSubTitle\":\"The simplest usage.\",\"uiElements.tooltip.placementTitle\":\"Placement\",\"uiElements.tooltip.placementSubTitle\":\"The ToolTip has 12 placements choice.\",\"uiElements.tooltip.TL\":\"TL\",\"uiElements.tooltip.TR\":\"TR\",\"uiElements.tooltip.LT\":\"LT\",\"uiElements.tooltip.LB\":\"LB\",\"uiElements.tooltip.RT\":\"RT\",\"uiElements.tooltip.RB\":\"RB\",\"uiElements.tooltip.BL\":\"BL\",\"uiElements.tooltip.BR\":\"BR\",\"uiElements.tooltip.bottom\":\"Bottom\",\"uiElements.tooltip.right\":\"Right\",\"uiElements.tooltip.left\":\"Left\",\"uiElements.tooltip.top\":\"Top\",\"uiElements.tooltip.tooltipContentSpan\":\"Tooltip will show when mouse enter.\",\"uiElements.tooltip.contentSpan\":\"Tooltip Content\",\"uiElements.tags.tags\":\"Tags\",\"uiElements.tags.basicExample\":\"Basic Example\",\"uiElements.tags.basicExampleSubTitle\":\"Usage of basic Tag   and it could be closable by set closable property. Closable Tag supports onClose afterClose events.\",\"uiElements.tags.tagOne\":\"Tag 1\",\"uiElements.tags.tagTwo\":\"Tag 2\",\"uiElements.tags.link\":\"Link\",\"uiElements.tags.preventDefault\":\"Prevent Default\",\"uiElements.tags.colorfulTag\":\"Colorful Tag\",\"uiElements.tags.hotTags\":\"Hot Tags\",\"uiElements.tags.hotTagsSubTitle\":\"Select your favourite topics.\",\"uiElements.tags.hots\":\"Hots\",\"uiElements.tags.addRemoveDynamically\":\"Add & Remove Dynamically\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"Generating a set of Tags by array   you can add and remove dynamically. Its based on afterClose event   which will be triggered while the close animation end.\",\"uiElements.tags.newTag\":\"+ New Tag\",\"uiElements.timeline.timeline\":\"Timeline\",\"uiElements.timeline.basicExample\":\"Basic Example\",\"uiElements.timeline.basicTimeline\":\"Basic timeline\",\"uiElements.timeline.lastNode\":\"Last Node\",\"uiElements.timeline.lastNodeContent\":\"When the timeline is incomplete and ongoing   put a ghost node at last. set   pending=  true     or   pending=  a React Element\",\"uiElements.timeline.seeMore\":\"See more\",\"uiElements.timeline.custom\":\"Custom\",\"uiElements.timeline.customContent\":\"Set a node as an icon or other custom element.\",\"uiElements.timeline.colorExample\":\"Color Example\",\"uiElements.timeline.colorExampleContent\":\"Set the color of circles. green means completed or success status   red means warning or error   and blue means ongoing or other default status.\",\"uiElements.timeline.createServiceSite\":\"Create a services site 2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"Solve initial network problems 2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"Network problems being solved 2015-09-01\",\"uiElements.timeline.technicalTesting\":\"Technical testing 2015-09-01\",\"uiElements.dropdown.dropdown\":\"Dropdown\",\"uiElements.dropdown.hoverDropdown\":\"Hover Drop Down\",\"uiElements.dropdown.hoverMe\":\"Hover me\",\"uiElements.dropdown.hoverPlacement\":\"Hover Placement Drop Down\",\"uiElements.dropdown.hoverDisableLink\":\"Hover Drop Down with Disable link\",\"uiElements.dropdown.clickedDropdown\":\"Clicked Drop Down\",\"uiElements.dropdown.buttonDropdown\":\"Button with dropdown menu\",\"uiElements.pagination.pagination\":\"Pagination\",\"uiElements.pagination.basic\":\"Basic\",\"uiElements.pagination.more\":\"More\",\"uiElements.pagination.changer\":\"Changer\",\"uiElements.pagination.jumper\":\"Jumper\",\"uiElements.pagination.miniSize\":\"Mini Size\",\"uiElements.pagination.simpleMode\":\"Simple Mode\",\"uiElements.pagination.controlled\":\"Controlled\",\"uiElements.pagination.totalNumber\":\"Total Number\",\"uiElements.rating.rating\":\"Rating\",\"uiElements.rating.basicExample\":\"Basic Example\",\"uiElements.rating.basicExampleSubTitle\":\"The simplest usage.\",\"uiElements.rating.halfStar\":\"Half star\",\"uiElements.rating.halfStarSubTitle\":\"Support select half star.\",\"uiElements.rating.showCopywriting\":\"Show copywriting\",\"uiElements.rating.showCopywritingSubTitle\":\"Add copywriting in rate components.\",\"uiElements.rating.readOnly\":\"Read only\",\"uiElements.rating.readOnlySubTitle\":\"Read only   cant use mouse to interact.\",\"uiElements.rating.otherCharacter\":\"Other Character\",\"uiElements.rating.otherCharacterSubTitle\":\"Replace the default star to other character like alphabet   digit   iconfont or even Chinese word.\",\"uiElements.tree.tree\":\"Tree\",\"uiElements.tree.basicExample\":\"Basic example\",\"uiElements.tree.basicExampleSubTitle\":\"The most basic usage   tell you how to use checkable   selectable   disabled   defaultExpandKeys   and etc.\",\"uiElements.tree.basicControlledExample\":\"Basic controlled example\",\"uiElements.tree.basicControlledExampleSubTitle\":\"basic controlled example\",\"uiElements.tree.draggableExample\":\"Draggable example\",\"uiElements.tree.draggableExampleSubTitle\":\"Drag treeNode to insert after the other treeNode or insert into the other parent TreeNode.\",\"uiElements.tree.loadAsync\":\"Load data asynchronously\",\"uiElements.tree.loadAsyncSubTitle\":\"To load data asynchronously when click to expand a treeNode.\",\"uiElements.tree.searchableExample\":\"Searchable example\",\"uiElements.tree.searchableExampleSubTitle\":\"Searchable Tree\",\"uiElements.tree.treeWithLine\":\"Tree With Line\",\"shuffle.descriptionOne\":\"Netscape 2.0 ships   introducing Javascript\",\"shuffle.descriptionTwo\":\"Jesse James Garrett releases AJAX spec\",\"shuffle.descriptionThree\":\"jQuery 1.0 released\",\"shuffle.descriptionFour\":\"First underscore.js commit\",\"shuffle.descriptionFive\":\"Backbone.js becomes a thing\",\"shuffle.descriptionSix\":\"Angular 1.0 released\",\"shuffle.descriptionSeven\":\"React is open-sourced; developers rejoice\",\"toggle.list\":\"List\",\"toggle.grid\":\"Grid\",\"toggle.ascending\":\"Ascending\",\"toggle.descending\":\"Descending\",\"toggle.shuffle\":\"Shuffle\",\"toggle.rotate\":\"Rotate\",\"toggle.addItem\":\"Add Item\",\"toggle.removeItem\":\"Remove Item\",\"contactlist.searchContacts\":\"Search Contacts\",\"contactlist.addNewContact\":\"Add New Contact\",\"notes.ChoseColor\":\"Choose a color for your note\",\"notes.addNote\":\"Add New Note\",\"page404.title\":\"404\",\"page404.subTitle\":\"Looks like you got lost\",\"page404.description\":\"The page youre looking for doesnt exist or has been moved.\",\"page404.backButton\":\"BACK HOME\",\"page500.title\":\"500\",\"page500.subTitle\":\"Internal Server Error\",\"page500.description\":\"Something went wrong. Please try again later.\",\"page500.backButton\":\"BACK HOME\",\"page.forgetPassTitle\":\"Isomorphic\",\"page.forgetPassSubTitle\":\"Forgot Password?\",\"page.forgetPassDescription\":\"Enter your email and we send you a reset link.\",\"page.sendRequest\":\"Send request\",\"page.resetPassTitle\":\"Isomorphic\",\"page.resetPassSubTitle\":\"Reset Password\",\"page.resetPassDescription\":\"Enter new password and confirm it.\",\"page.resetPassSave\":\"Save\",\"page.signInTitle\":\"Isomorphic\",\"page.signInRememberMe\":\"Remember me\",\"page.signInButton\":\"Sign in\",\"page.signInPreview\":\"username: demo   password: demodemo   or just click on any button.\",\"page.signInFacebook\":\"Sign in with Facebook\",\"page.signInGooglePlus\":\"Sign in with Google Plus\",\"page.signInAuth0\":\"Sign in with Auth0\",\"page.signInMobile\":\"Sign in with Phone\",\"page.signUpMobile\":\"Sign up with Phone\",\"page.signInForgotPass\":\"Forgot password\",\"page.signInCreateAccount\":\"Create an Isomorphoic account\",\"page.signUpTitle\":\"Isomorphic\",\"page.signUpTermsConditions\":\"I agree with terms and condtions\",\"page.signUpButton\":\"Sign Up\",\"page.signUpFacebook\":\"Sign up with Facebook\",\"page.signUpGooglePlus\":\"Sign up with Google Plus\",\"page.signUpAuth0\":\"Sign Up with Auth0\",\"page.signUpAlreadyAccount\":\"Already have an account? Sign in.\",\"widget.reportswidget.label\":\"Income\",\"widget.reportswidget.details\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor\",\"widget.singleprogresswidget1.label\":\"Marketing\",\"widget.singleprogresswidget2.label\":\"Addvertisement\",\"widget.singleprogresswidget3.label\":\"Consulting\",\"widget.singleprogresswidget4.label\":\"Development\",\"widget.stickerwidget1.number\":\"210\",\"widget.stickerwidget1.text\":\"Unread Email\",\"widget.stickerwidget2.number\":\"1749\",\"widget.stickerwidget2.text\":\"Image Upload\",\"widget.stickerwidget3.number\":\"3024\",\"widget.stickerwidget3.text\":\"Total Message\",\"widget.stickerwidget4.number\":\"54\",\"widget.stickerwidget4.text\":\"Orders Post\",\"widget.salewidget1.label\":\"Income\",\"widget.salewidget1.price\":\"$15000\",\"widget.salewidget1.details\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor\",\"widget.salewidget2.label\":\"Income\",\"widget.salewidget2.price\":\"$15000\",\"widget.salewidget2.details\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor\",\"widget.salewidget3.label\":\"Income\",\"widget.salewidget3.price\":\"$15000\",\"widget.salewidget3.details\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor\",\"widget.salewidget4.label\":\"Income\",\"widget.salewidget4.price\":\"$15000\",\"widget.salewidget4.details\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor\",\"widget.cardwidget1.number\":\"110\",\"widget.cardwidget1.text\":\"New Messages\",\"widget.cardwidget2.number\":\"100%\",\"widget.cardwidget2.text\":\"Volume\",\"widget.cardwidget3.number\":\"137\",\"widget.cardwidget3.text\":\"Achievement\",\"widget.progresswidget1.label\":\"Download\",\"widget.progresswidget1.details\":\"50% Complete\",\"widget.progresswidget2.label\":\"Support\",\"widget.progresswidget2.details\":\"80% Satisfied Customer\",\"widget.progresswidget3.label\":\"Upload\",\"widget.progresswidget3.details\":\"65% Complete\",\"widget.vcardwidget.name\":\"Jhon Doe\",\"widget.vcardwidget.title\":\"Sr. iOS Developer\",\"widget.vcardwidget.description\":\"Lorem ipsum dolor sit amet   consectetur adipisicing elit   sed do eiusmod tempor ammet dolar consectetur adipisicing elit\",\"checkout.billingform.firstname\":\"First Name\",\"checkout.billingform.lastname\":\"Last Name\",\"checkout.billingform.company\":\"Company Name\",\"checkout.billingform.email\":\"Email Address\",\"checkout.billingform.mobile\":\"Mobile No\",\"checkout.billingform.country\":\"Country\",\"checkout.billingform.city\":\"City\",\"checkout.billingform.address\":\"Address\",\"checkout.billingform.addressoptional\":\"Apartment   suite   unit etc. (optional\",\"checkout.billingform.checkbox\":\"Create an account?\",\"antTable.title.image\":\"Image\",\"antTable.title.firstName\":\"First Name\",\"antTable.title.lastName\":\"Last Name\",\"antTable.title.city\":\"City\",\"antTable.title.street\":\"Street\",\"antTable.title.email\":\"Email\",\"antTable.title.dob\":\"DOB\",\"Map.leaflet.basicTitle\":\"Basic Map\",\"Map.leaflet.basicMarkerTitle\":\"Basic Map(With Default Marker\",\"Map.leaflet.leafletCustomMarkerTitle\":\"Basic Map(With Custom Icon Marker)\",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"Basic Map(With Custom Html Marker\",\"Map.leaflet.leafletMarkerClusterTitle\":\"Basic Map(With Marker Cluster\",\"Map.leaflet.leafletRoutingTitle\":\"Basic Map Routing\",\"Component.contacts.noOption\":\"No contact found\",\"email.send\":\"SEND\",\"email.cancel\":\"CANCEL\",\"email.compose\":\"COMPOSE\",\"email.noMessage\":\"Please select a mail to read\",\"themeSwitcher.purchase\":\"PURCHASE NOW\",\"themeSwitcher.settings\":\"Settings\",\"sidebar.selectbox\":\"Select\",\"sidebar.frappeChart\":\"Frappe Charts\",\"topbar.myprofile\":\"My Profile\",\"topbar.help\":\"Help\",\"topbar.logout\":\"Logout\",\"topbar.viewAll\":\"View All\",\"topbar.viewCart\":\"View Cart\",\"topbar.totalPrice\":\"Total Price\",\"Swiper.basic.basicTitle\":\"Basic Slider\",\"Swiper.bullet.bulletTitle\":\"Bullet Pagination\",\"Swiper.progress.progressTitle\":\"Progress Pagination\",\"Swiper.fraction.fractionTitle\":\"Fraction Pagination\",\"Swiper.numbered.numberedTitle\":\"Numbered Pagination\",\"Swiper.scroll.scrollTitle\":\"Scrollbar\",\"Swiper.verticle.verticleTitle\":\"Verticle Slider\",\"Swiper.multiple.multipleGridTitle\":\"Multiple Grid Slider\",\"Swiper.free.freeTitle\":\"Swiper Free Mode\",\"Swiper.multirow.multirowTitle\":\"Multiple row On View\",\"Swiper.cursor.cursorTitle\":\"Slider with Cursor\",\"Swiper.loop.infiniteTitle\":\"Slider with Infinite Loop\",\"Swiper.wheel.wheelTitle\":\"Slider with Mouse Wheel\",\"Swiper.auto.autoPlayTitle\":\"Slider with Autoplay\",\"Swiper.lazy.lazyTitle\":\"Slider with Lazyload\",\"Swiper.custom.customScrollTitle\":\"Custom view with all Naviation\",\"Swiper.custom.basicNavTitle\":\"Basic Naviation\",\"Swiper.custom.buttonNavTitle\":\"Custom Naviation\"}");

/***/ }),

/***/ "TSG6":
/***/ (function(module, exports) {



/***/ }),

/***/ "TpwP":
/***/ (function(module, exports) {



/***/ }),

/***/ "UP2L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgODAwIj48cGF0aCBkPSJNMjQuODA3IDY0Ni4xNlYxNTMuODM4aDc1MC4zODd2NDAxYzAgNi41NjMgNS4zNCAxMS45MDMgMTEuOTAzIDExLjkwM2gxdjI3LjgwN2gtMWMtNi41NjMgMC0xMS45MDMgNS4zNC0xMS45MDMgMTEuOTAydjM5LjcxSDI0LjgwN3ptMjQ4LjYyOC0yMTAuOThjLTQuNDkzIDAtOC43MTcgMS43NS0xMS44OTQgNC45MjhhMTYuNzA0IDE2LjcwNCAwIDAwLTQuOTI2IDExLjg5MyAxNi43MiAxNi43MiAwIDAwNC45MjYgMTEuODk1IDE2LjcxIDE2LjcxIDAgMDAxMS44OTQgNC45MjcgMTYuNzEgMTYuNzEgMCAwMDExLjg5My00LjkyNyAxNi43MTUgMTYuNzE1IDAgMDA0LjkyNy0xMS44OTVjMC00LjQ5My0xLjc1LTguNzE3LTQuOTI3LTExLjg5M2ExNi43MDcgMTYuNzA3IDAgMDAtMTEuODkzLTQuOTI4em0tNzMuMDE1LTIzLjU0NmExMS44NjYgMTEuODY2IDAgMDA2LjQ4OSAxLjkyNmMyLjUyOSAwIDQuOTQ5LS43ODcgNi45OTgtMi4yNzUgMy45NjItMi44NzcgNS43NzEtNy45ODggNC41LTEyLjcxOWwtMTEuOTgxLTQ0LjU4NSAzNS44OTgtMjkuMDI3YzMuODA4LTMuMDc4IDUuMzQ5LTguMjc2IDMuODM2LTEyLjkzNXMtNS44MTYtNy45NTgtMTAuNzA3LTguMjFsLTQ2LjEwNS0yLjM4MS0xNi41MTEtNDMuMTExYy0xLjc1MS00LjU3My02LjIxOS03LjY0NS0xMS4xMTYtNy42NDVzLTkuMzY0IDMuMDcyLTExLjExNiA3LjY0NWwtMTYuNTExIDQzLjExMS00Ni4xMDQgMi4zODFjLTQuODkxLjI1Mi05LjE5MyAzLjU1Mi0xMC43MDcgOC4yMS0xLjUxMyA0LjY1OC4wMjkgOS44NTUgMy44MzYgMTIuOTMzbDM1Ljg5OSAyOS4wMjctMTEuOTgxIDQ0LjU4NWMtMS4yNzEgNC43My41MzggOS44NDEgNC41IDEyLjcxOWExMS44MzMgMTEuODMzIDAgMDA2Ljk5OCAyLjI3M2MyLjMxIDAgNC41NTQtLjY2NSA2LjQ4OS0xLjkyNWwzOC42OTktMjUuMTczIDM4LjY5NyAyNS4xNzZ6bTExMy44OTMtNDcuMjhjLTcuNTg5IDAtMTQuMjYzIDUuMTI3LTE2LjIzIDEyLjQ2OGExNi43MDYgMTYuNzA2IDAgMDAxLjY3OCAxMi43NiAxNi43MTMgMTYuNzEzIDAgMDAxMC4yMTIgNy44MzVjMS40My4zODMgMi44OTkuNTc4IDQuMzY1LjU3OCA3LjU4OSAwIDE0LjI2NC01LjEyNyAxNi4yMzEtMTIuNDY4IDIuMzk5LTguOTU2LTIuOTM1LTE4LjE5NS0xMS44OTEtMjAuNTk2YTE2LjkzNyAxNi45MzcgMCAwMC00LjM2NS0uNTc3em0uMDIxLTgxLjc4Yy0xLjQ2NiAwLTIuOTM0LjE5NC00LjM2NC41NzgtOC45NTYgMi40MDEtMTQuMjkgMTEuNjQtMTEuODkgMjAuNTk2IDEuOTY3IDcuMzQgOC42NDIgMTIuNDY3IDE2LjIzMyAxMi40NjcgMS40NjUgMCAyLjkzMy0uMTk0IDQuMzYzLS41NzcgNC4zMzktMS4xNjIgNy45NjUtMy45NDQgMTAuMjExLTcuODM0czIuODQyLTguNDIyIDEuNjc5LTEyLjc2MmMtMS45NjctNy4zNDEtOC42NDItMTIuNDY4LTE2LjIzMi0xMi40Njh6bS00MC44OTktNzAuODIyYy00LjQ5MyAwLTguNzE3IDEuNzUtMTEuODk0IDQuOTI4LTMuMTc3IDMuMTc2LTQuOTI2IDcuMzk5LTQuOTI2IDExLjg5MnMxLjc1IDguNzE3IDQuOTI2IDExLjg5NSA3LjQwMSA0LjkyNyAxMS44OTQgNC45MjdhMTYuNzEgMTYuNzEgMCAwMDExLjg5My00LjkyN2MzLjE3Ny0zLjE3OCA0LjkyNy03LjQwMiA0LjkyNy0xMS44OTVzLTEuNzUtOC43MTYtNC45MjctMTEuODkyYTE2LjcwNyAxNi43MDcgMCAwMC0xMS44OTMtNC45Mjh6IiBmaWxsPSIjZWQxZjM0Ii8+PHBhdGggZD0iTTc3NC4xOTMgNTU0LjgzOHYtNDAwSDI1LjgwN1Y2NDUuMTZoNzQ4LjM4N3YtMzguNzFjMC03LjEyNyA1Ljc3NS0xMi45MDIgMTIuOTAzLTEyLjkwMnYtMjUuODA3Yy03LjEyOCAwLTEyLjkwNC01Ljc3NS0xMi45MDQtMTIuOTAzek0yNDIuOTUyIDMyNS43MzFsLTM1LjM5MiAyOC42MTggMTEuODEzIDQzLjk1N2ExMi45MDQgMTIuOTA0IDAgMDEtMTkuNDk3IDE0LjE2NmwtMzguMTU0LTI0LjgyLTM4LjE1NCAyNC44MThhMTIuOTA0IDEyLjkwNCAwIDAxLTE5LjQ5Ny0xNC4xNjZsMTEuODEzLTQzLjk1Ny0zNS4zOTUtMjguNjE4YTEyLjkwMiAxMi45MDIgMCAwMTcuNDQ3LTIyLjkybDQ1LjQ1NS0yLjM0OCAxNi4yNzktNDIuNTAzYTEyLjkwNSAxMi45MDUgMCAwMTI0LjEgMGwxNi4yNzggNDIuNTAzIDQ1LjQ1NiAyLjM0OGExMi45MDMgMTIuOTAzIDAgMDExMS42MDYgOC45IDEyLjkwMiAxMi45MDIgMCAwMS00LjE1OCAxNC4wMjJ6bTQzLjA4MyAxMzguODcxYy02Ljk1OSA2Ljk1OS0xOC4yNDIgNi45NTktMjUuMjAxIDAtNi45NTktNi45NjEtNi45NTktMTguMjQ0IDAtMjUuMjAxIDYuOTU5LTYuOTYxIDE4LjI0Mi02Ljk2MSAyNS4yMDEgMCA2Ljk2IDYuOTU2IDYuOTYgMTguMjQgMCAyNS4yMDF6bTAtMjIzLjQyOGMtNi45NTkgNi45NTktMTguMjQyIDYuOTU5LTI1LjIwMSAwLTYuOTU5LTYuOTYtNi45NTktMTguMjQzIDAtMjUuMjAxIDYuOTU5LTYuOTYxIDE4LjI0Mi02Ljk2MSAyNS4yMDEgMCA2Ljk2IDYuOTU4IDYuOTYgMTguMjQgMCAyNS4yMDF6bTQ1LjQ5OSAxNDQuNjEzYy0yLjU0NyA5LjUwMy0xMi4zMTUgMTUuMTQ1LTIxLjgyIDEyLjU5Ny05LjUwNi0yLjU0OC0xNS4xNDYtMTIuMzE1LTEyLjU5Ny0yMS44MiAyLjU0Ny05LjUwNSAxMi4zMTUtMTUuMTQ1IDIxLjgyLTEyLjU5NyA5LjUwNSAyLjU0NyAxNS4xNDMgMTIuMzE2IDEyLjU5NyAyMS44MnptLTEyLjU5OC02OS4xODRjLTkuNTA0IDIuNTQ2LTE5LjI3NC0zLjA5My0yMS44MjEtMTIuNTk3czMuMDkzLTE5LjI3MiAxMi41OTctMjEuODIgMTkuMjczIDMuMDk1IDIxLjgyIDEyLjU5N2MyLjU0OCA5LjUwNS0zLjA5MiAxOS4yNzYtMTIuNTk2IDIxLjgyeiIgZmlsbD0iI2VkMWYzNCIvPjxwYXRoIGQ9Ik03NzQuMTkzIDYwNi40NXYzOC43MUgyNS44MDdWMTU0LjgzOGg3NDguMzg3djQwMGMwIDcuMTI4IDUuNzc1IDEyLjkwMyAxMi45MDMgMTIuOTAzUzgwMCA1NjEuOTY2IDgwMCA1NTQuODM4VjE0MS45MzVjMC03LjEyOC01Ljc3NS0xMi45MDMtMTIuOTAzLTEyLjkwM0gxMi45MDNDNS43NzcgMTI5LjAzMSAwIDEzNC44MDcgMCAxNDEuOTM1djUxNi4xMjljMCA3LjEyOCA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI4IDAgMTIuOTAzLTUuNzc1IDEyLjkwMy0xMi45MDN2LTUxLjYxM2MwLTcuMTI3LTUuNzc1LTEyLjkwMi0xMi45MDMtMTIuOTAycy0xMi45MDMgNS43NzQtMTIuOTAzIDEyLjkwMXoiLz48cGF0aCBkPSJNMTY4LjIwOCAzNjIuMjgzYy0xLjkzNS0xLjI2LTQuMTc4LTEuOTI1LTYuNDg5LTEuOTI1cy00LjU1NS42NjYtNi40ODkgMS45MjVsLTE5LjEzOCAxMi40NDggNS45MjQtMjIuMDQ4YTExLjkxMiAxMS45MTIgMCAwMC00LjAxMS0xMi4zNDVsLTE3Ljc1NS0xNC4zNTYgMjIuODAyLTEuMTc3YTExLjkxNSAxMS45MTUgMCAwMDEwLjUwMi03LjYzMWw4LjE2Ny0yMS4zMTkgOC4xNjcgMjEuMzE3YTExLjkxNiAxMS45MTYgMCAwMDEwLjQ5OSA3LjYzM2wyMi44MDIgMS4xNzctMTcuNzU1IDE0LjM1NmExMS45MSAxMS45MSAwIDAwLTQuMDEgMTIuMzQ0bDUuOTI0IDIyLjA0OC0xOS4xNC0xMi40NDd6IiBmaWxsPSIjZmZlMDAwIi8+PHBhdGggZD0iTTE2OC45NTMgMzE3LjUzbC03LjIzMy0xOC44OC03LjIzMiAxOC44ODFhMTIuOTA2IDEyLjkwNiAwIDAxLTExLjM4NCA4LjI3MmwtMjAuMTk0IDEuMDQyIDE1LjcyNSAxMi43MTRhMTIuOTA0IDEyLjkwNCAwIDAxNC4zNDggMTMuMzgxbC01LjI0NyAxOS41MjcgMTYuOTUtMTEuMDI0YzIuMTM4LTEuMzkyIDQuNTg2LTIuMDg3IDcuMDM1LTIuMDg3czQuODk2LjY5NSA3LjAzNSAyLjA4N2wxNi45NSAxMS4wMjQtNS4yNDctMTkuNTI3YTEyLjkwMiAxMi45MDIgMCAwMTQuMzQ3LTEzLjM4MWwxNS43MjUtMTIuNzE0LTIwLjE5NC0xLjA0MmExMi45MDUgMTIuOTA1IDAgMDEtMTEuMzg0LTguMjczeiIgZmlsbD0iI2ZmZTAwMCIvPjxwYXRoIGQ9Ik0yMzUuNTA0IDMwMi44MTJsLTQ1LjQ1Ni0yLjM0OS0xNi4yNzgtNDIuNTAzYTEyLjkwNiAxMi45MDYgMCAwMC0yNC4xIDBsLTE2LjI3OSA0Mi41MDMtNDUuNDU1IDIuMzQ5YTEyLjkwMiAxMi45MDIgMCAwMC0xMS42MDYgOC45IDEyLjkgMTIuOSAwIDAwNC4xNTggMTQuMDJsMzUuMzkzIDI4LjYxOC0xMS44MTMgNDMuOTU3YTEyLjkwNCAxMi45MDQgMCAwMDE5LjQ5NyAxNC4xNjZsMzguMTU0LTI0LjgyIDM4LjE1NCAyNC44MThhMTIuODcyIDEyLjg3MiAwIDAwNy4wMzUgMi4wODggMTIuOTA0IDEyLjkwNCAwIDAwMTIuNDYyLTE2LjI1NGwtMTEuODEzLTQzLjk1NyAzNS4zOTMtMjguNjE4YTEyLjkgMTIuOSAwIDAwNC4xNTgtMTQuMDIgMTIuODk4IDEyLjg5OCAwIDAwLTExLjYwNC04Ljg5OHptLTUwLjY5OSAzNi43NDdhMTIuOTA0IDEyLjkwNCAwIDAwLTQuMzQ4IDEzLjM4MWw1LjI0OCAxOS41MjctMTYuOTUtMTEuMDI0Yy0yLjEzOS0xLjM5Mi00LjU4Ny0yLjA4Ny03LjAzNS0yLjA4N3MtNC44OTYuNjk1LTcuMDM1IDIuMDg3bC0xNi45NSAxMS4wMjQgNS4yNDgtMTkuNTI3YTEyLjkgMTIuOSAwIDAwLTQuMzQ4LTEzLjM4MWwtMTUuNzI1LTEyLjcxNCAyMC4xOTQtMS4wNDJhMTIuOTAzIDEyLjkwMyAwIDAwMTEuMzg0LTguMjcybDcuMjMxLTE4Ljg4IDcuMjMzIDE4Ljg4MWExMi45MDYgMTIuOTA2IDAgMDAxMS4zODQgOC4yNzJsMjAuMTk0IDEuMDQyLTE1LjcyNSAxMi43MTN6Ii8+PGNpcmNsZSBjeD0iMzE0LjMyNCIgY3k9IjI5OS4zOTUiIHI9IjE3LjgxNSIgZmlsbD0iI2ZmZTAwMCIvPjxjaXJjbGUgY3g9IjI3My40MzUiIGN5PSIyMjguNTcyIiByPSIxNy44MiIgZmlsbD0iI2ZmZTAwMCIvPjxjaXJjbGUgY3g9IjMxNC4zMjQiIGN5PSIzODEuMTc2IiByPSIxNy44MTUiIGZpbGw9IiNmZmUwMDAiLz48Y2lyY2xlIGN4PSIyNzMuNDM1IiBjeT0iNDUyLjAwMSIgcj0iMTcuODIiIGZpbGw9IiNmZmUwMDAiLz48L3N2Zz4=");

/***/ }),

/***/ "Uqqx":
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

/***/ }),

/***/ "V2m7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5SYD");

const actions = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  ACTIVATE_LANG_MODAL: 'ACTIVATE_LANG_MODAL',
  switchActivation: () => ({
    type: actions.ACTIVATE_LANG_MODAL
  }),
  changeLanguage: language => {
    return {
      type: actions.CHANGE_LANGUAGE,
      language: Object(_config__WEBPACK_IMPORTED_MODULE_0__[/* getCurrentLanguage */ "b"])(language)
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "X2yY":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.swiperslider\":\"المتزلج\",\"sidebar.email\":\"البريد الإلكتروني\",\"sidebar.chat\":\"دردشة\",\"sidebar.ecommerce\":\"التجارة الإلكترونية\",\"sidebar.shop\":\"متجر\",\"sidebar.cart\":\"عربة التسوق\",\"sidebar.checkout\":\"الدفع\",\"sidebar.cards\":\"بطاقات\",\"sidebar.maps\":\"خرائط\",\"sidebar.googleMap\":\"خرائط جوجل\",\"sidebar.leafletMap\":\"خريطة النشرة\",\"sidebar.calendar\":\"التقويم\",\"sidebar.notes\":\"ملاحظات\",\"sidebar.todos\":\"تودوس\",\"sidebar.contacts\":\"جهات الاتصال\",\"sidebar.shuffle\":\"خلط\",\"sidebar.charts\":\"الرسوم البيانية\",\"sidebar.googleCharts\":\"عربات غوغل\",\"sidebar.recharts\":\"Recharts\",\"sidebar.reactVis\":\"رد فيس\",\"sidebar.reactChart2\":\"الرد-مخطط-2\",\"sidebar.reactTrend\":\"الرد-تريند\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"إستمارات\",\"sidebar.input\":\"إدخال\",\"sidebar.editor\":\"محرر\",\"sidebar.formsWithValidation\":\"نماذج مع التحقق من الصحة\",\"sidebar.progress\":\"تقدم\",\"sidebar.button\":\"زر\",\"sidebar.tab\":\"التبويب\",\"sidebar.checkbox\":\"مربع\",\"sidebar.radiobox\":\"مربع الراديو\",\"sidebar.transfer\":\"تحويل\",\"sidebar.autocomplete\":\"الإكمال التلقائي\",\"sidebar.boxOptions\":\"خيارات مربع\",\"sidebar.uiElements\":\"عناصر واجهة المستخدم\",\"sidebar.badge\":\"شارة\",\"sidebar.card2\":\"بطاقة\",\"sidebar.corusel\":\"إحتفال صاخب مخمور\",\"sidebar.collapse\":\"انهدام\",\"sidebar.popover\":\"البوب\",\"sidebar.tooltip\":\"تلميح\",\"sidebar.tag\":\"بطاقة\",\"sidebar.timeline\":\"الجدول الزمني\",\"sidebar.dropdown\":\"اسقاط\",\"sidebar.pagination\":\"ترقيم الصفحات\",\"sidebar.rating\":\"تقييم\",\"sidebar.tree\":\"شجرة\",\"sidebar.advancedElements\":\"العناصر المتقدمة\",\"sidebar.reactDates\":\"تواريخ الاستجابة\",\"sidebar.codeMirror\":\"كود مرآة\",\"sidebar.uppy\":\"وبي رافع\",\"sidebar.dropzone\":\"إسقاط المنطقة\",\"sidebar.feedback\":\"ردود الفعل\",\"sidebar.alert\":\"محزر\",\"sidebar.modal\":\"شكلي\",\"sidebar.message\":\"رسالة\",\"sidebar.notification\":\"إعلام\",\"sidebar.popConfirm\":\"تأكيد البوب\",\"sidebar.spin\":\"غزل\",\"sidebar.tables\":\"الجداول\",\"sidebar.antTables\":\"جداول النمل\",\"sidebar.pages\":\"صفحات\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"تسجيل الدخول\",\"sidebar.signUp\":\"سجل\",\"sidebar.forgotPw\":\"نسيت كلمات المرور\",\"sidebar.resetPw\":\"إعادة تعيين كلمات المرور\",\"sidebar.invoice\":\"فاتورة\",\"sidebar.menuLevels\":\"مستويات القائمة\",\"sidebar.item1\":\"البند 1\",\"sidebar.item2\":\"البند 2\",\"sidebar.option1\":\"الخيار 1\",\"sidebar.option2\":\"الخيار 2\",\"sidebar.option3\":\"الخيار 3\",\"sidebar.option4\":\"الخيار 4\",\"sidebar.blankPage\":\"صفحة فارغة\",\"sidebar.githubSearch\":\"جيثب البحث\",\"sidebar.youtubeSearch\":\"بحث يوتيوب\",\"languageSwitcher.label\":\"غير اللغة\",\"themeSwitcher\":\"موضوع الجلاد\",\"themeSwitcher.Sidebar\":\"الشريط الجانبي\",\"themeSwitcher.Topbar\":\"الشريط العلوى\",\"themeSwitcher.Background\":\"خلفية\",\"feedback.alert.basicTitle\":\"العنوان الأساسي\",\"feedback.alert.successText\":\"نص النجاح\",\"feedback.alert.infoText\":\"نص المعلومات\",\"feedback.alert.warningText\":\"نص التحذير\",\"feedback.alert.errorText\":\"نص خطأ\",\"feedback.alert.closableAlertType\":\"نوع التنبيه القابل للإغلاق\",\"feedback.alert.iconAlertType\":\"رمز نوع التنبيه\",\"feedback.alert.iconInfoAlertType\":\"رمز معلومات نوع التنبيه\",\"feedback.alert.successTips\":\"نصائح النجاح\",\"feedback.alert.successTipsDescription\":\"وصف مفصل ونصائح حول الكتابة الناجحة.\",\"feedback.alert.informationTips\":\"ملاحظات إعلامية\",\"feedback.alert.informationDescription\":\"وصف إضافي ومعلومات حول كتابة النصوص.\",\"feedback.alert.warningTips\":\"تحذير\",\"feedback.alert.warningDescription\":\"هذا إشعار تحذير حول كتابة النصوص.\",\"feedback.alert.errorTips\":\"خطأ\",\"feedback.alert.errorDescription\":\"هذه رسالة خطأ حول كتابة النصوص.\",\"feedback.alert.modalTitle\":\"مشروط واحد مع تخصيص تذييل الصفحة\",\"feedback.alert.modalSubTitle\":\"مربع حوار أساسي مشروط.\",\"feedback.alert.successTitle\":\"نجاح\",\"feedback.alert.infoTitle\":\"معلومات\",\"feedback.alert.errorTitle\":\"خطأ\",\"feedback.alert.warningTitle\":\"تحذير\",\"feedback.alert.modalBlockTitle\":\"شكلي\",\"feedback.alert.confirmationModalDialogue\":\"حوار مشروط التأكيد\",\"feedback.alert.simpleModalDialogue\":\"حوار مشروط بسيط\",\"feedback.alert.message\":\"رسالة\",\"feedback.alert.normalMessageTitle\":\"رسالة عادية\",\"feedback.alert.normalMessageSubtitle\":\"الرسائل العادية كتعليقات.\",\"feedback.alert.displayMessage\":\"عرض الرسالة العادية\",\"feedback.alert.displayOtherTypeMessageTitle\":\"أنواع أخرى من الرسائل\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"رسائل النجاح وأنواع الأخطاء والإنذارات.\",\"feedback.alert.customizeDurationTitle\":\"تخصيص المدة\",\"feedback.alert.customizeDurationSubTitle\":\"أوستميز مدة عرض الرسالة من الافتراضي 1.5s إلى 10s.\",\"feedback.alert.customizeDurationButton\":\"تخصيص مدة العرض\",\"feedback.alert.messageLoadingTitle\":\"رسالة التحميل\",\"feedback.alert.messageLoadingSubTitle\":\"عرض مؤشر تحميل عالمي، يتم رفضه في حد ذاته بشكل غير متزامن.\",\"feedback.alert.displayLoadIndicator\":\"عرض مؤشر التحميل\",\"feedback.alert.notification\":\"إعلام\",\"feedback.alert.notificationBasicTitle\":\"الأساسية\",\"feedback.alert.notificationBasicSubTitle\":\"أبسط الاستخدام الذي يغلق مربع الإعلام بعد 4.5S.\",\"feedback.alert.notificationBasicDescription\":\"افتح مربع الإشعارات\",\"feedback.alert.notificationDurationTitle\":\"المدة التي يتم بعدها إغلاق مربع الإشعارات\",\"feedback.alert.notificationDurationSubTitle\":\"يمكن استخدام المدة لتحديد المدة التي يبقى فيها الإشعار مفتوحا. بعد انقضاء المدة الزمنية، يتم إغلاق الإشعار تلقائيا. إذا لم يتم تحديد القيمة الافتراضية هي 4.5 ثانية. إذا قمت بتعيين القيمة إلى 0، لن يتم إغلاق مربع الإشعار تلقائيا تلقائيا.\",\"feedback.alert.notificationwithIconTitle\":\"إعلام مع رمز\",\"feedback.alert.notificationwithIconSubTitle\":\"مربع إعلام مع رمز على الجانب الأيسر.\",\"feedback.alert.notificationwithCustomIconTitle\":\"إعلام مع رمز مخصص\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"الرسائل العادية كتعليقات.\",\"feedback.alert.notificationwithCustomButtonTitle\":\"إعلام مع زر مخصص\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"الرسائل العادية كتعليقات.\",\"feedback.alert.popConfirm\":\"تأكيد البوب\",\"feedback.alert.popConfirm.basicTitle\":\"تأكيد أساسي\",\"feedback.alert.popConfirm.basicSubTitle\":\"المثال الأساسي.\",\"feedback.alert.popConfirm.delete\":\"حذف\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"إعلام مع رمز مخصص\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"الرسائل العادية كتعليقات.\",\"feedback.alert.popConfirm.TL\":\"TL\",\"feedback.alert.popConfirm.top\":\"أعلى\",\"feedback.alert.popConfirm.TR\":\"TR\",\"feedback.alert.popConfirm.LT\":\"LT\",\"feedback.alert.popConfirm.left\":\"اليسار\",\"feedback.alert.popConfirm.LB\":\"رطل\",\"feedback.alert.popConfirm.RT\":\"RT\",\"feedback.alert.popConfirm.right\":\"حق\",\"feedback.alert.popConfirm.RB\":\"RB\",\"feedback.alert.popConfirm.Bl\":\"BL\",\"feedback.alert.popConfirm.bottom\":\"الأسفل\",\"feedback.alert.popConfirm.BR\":\"BR\",\"feedback.alert.spin\":\"غزل\",\"feedback.alert.spin.basicTitle\":\"حجم تدور\",\"feedback.alert.spin.background\":\"تدور مع الخلفية\",\"feedback.alert.spin.backgroundDescription\":\"تدور مع وصف الخلفية\",\"feedback.alert.spin.loadingState\":\"تحميل الدولة\",\"feedback.alert.spin.alertTitle\":\"عنوان رسالة التنبيه\",\"feedback.alert.spin.alertDescription\":\"مزيد من التفاصيل حول سياق هذا التنبيه.\",\"forms.input.header\":\"إدخال\",\"forms.input.basicTitle\":\"الاستخدام الأساسي\",\"forms.input.basicSubTitle\":\"مثال الاستخدام الأساسي.\",\"forms.input.variationsTitle\":\"ثلاثة أحجام من الإدخال\",\"forms.input.variationsSubtitle\":\"هناك ثلاثة أحجام من مربع الإدخال  كبير (42px  ، الافتراضي (35px   والصغيرة (30px  . ملاحظة  داخل النماذج، يتم استخدام الحجم الكبير فقط.\",\"forms.input.groupTitle\":\"مجموعة الإدخال\",\"forms.input.groupSubTitle\":\"الإدخال. مثال المجموعة ملاحظة  أنت لا تحتاج كول للتحكم في العرض في الوضع المضغوط.\",\"forms.input.autoSizingTitle\":\"يمكنك ضبط مستوى الارتفاع لتتناسب مع المحتوى\",\"forms.input.autoSizingSubTitle\":\"أوتوسيزي دعامة لنوع تكستاريا من المدخلات يجعل ارتفاع لضبط تلقائيا استنادا إلى المحتوى. يمكن توفير كائن خيارات ل أوتوسيزي لتحديد الحد الأدنى والحد الأقصى لعدد الخطوط التي سوف تكستاريا ضبط تلقائيا.\",\"forms.input.prePostTabTitle\":\"علامة التبويب ما قبل    المشاركة\",\"forms.input.prePostTabSubTitle\":\"استخدام بري & أمب؛ نموذج علامات تبويب المشاركات ..\",\"forms.input.textAreaTitle\":\"ناحية النص\",\"forms.input.textAreaSubTitle\":\"بالنسبة لحالات إدخال المستخدم متعدد الخطوط، يمكن استخدام المدخلات التي لها قيمة دعامة قيمة تكستاريا.\",\"forms.input.searchTitle\":\"بحث\",\"forms.input.searchSubTitle\":\"مثال لإنشاء مربع بحث عن طريق تجميع إدخال قياسي باستخدام زر بحث\",\"forms.editor.header\":\"محرر\",\"forms.formsWithValidation.header\":\"نموذج التحقق المخصص\",\"forms.formsWithValidation.failLabel\":\"فشل\",\"forms.formsWithValidation.failHelp\":\"يجب أن يكون مزيج من الأرقام & أمب؛ الحروف الهجائية\",\"forms.formsWithValidation.warningLabel\":\"تحذير\",\"forms.formsWithValidation.ValidatingLabel\":\"التحقق من صحة\",\"forms.formsWithValidation.ValidatingHelp\":\"جار التحقق من صحة المعلومات ...\",\"forms.formsWithValidation.SuccessLabel\":\"نجاح\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"تحذير\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"فشل\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"يجب أن يكون مزيج من الأرقام & أمب؛ الحروف الهجائية\",\"forms.progressBar.header\":\"شريط التقدم\",\"forms.progressBar.standardTitle\":\"شريط التقدم\",\"forms.progressBar.standardSubTitle\":\"شريط تقدم قياسي.\",\"forms.progressBar.circularTitle\":\"شريط التقدم الدائري\",\"forms.progressBar.circularSubTitle\":\"شريط تقدم دائري.\",\"forms.progressBar.miniTitle\":\"ميني حجم شريط التقدم\",\"forms.progressBar.miniSubTitle\":\"مناسبة لمنطقة ضيقة.\",\"forms.progressBar.miniCircularTitle\":\"شريط تقدم دائري أصغر.\",\"forms.progressBar.dynamicCircularTitle\":\"ديناميكية شريط التقدم دائرية\",\"forms.progressBar.dynamicCircularSubTitle\":\"شريط التقدم الديناميكي هو أفضل.\",\"forms.progressBar.customTextTitle\":\"تنسيق نص مخصص\",\"forms.progressBar.customTextSubTitle\":\"يمكنك تنسيق النص المخصص عن طريق وضع التنسيق.\",\"forms.progressBar.dashboardTitle\":\"لوحة القيادة\",\"forms.progressBar.dashboardSubTitle\":\"نمط لوحة القيادة للتقدم.\",\"forms.button.header\":\"وصفت\",\"forms.button.simpleButton\":\"نوع الزر\",\"forms.button.iconButton\":\"رمز الزر\",\"forms.button.simpleButtonPrimaryText\":\"ابتدائي\",\"forms.button.simpleButtonDefaultText\":\"افتراضي\",\"forms.button.simpleButtonDashedText\":\"متقطع\",\"forms.button.simpleButtonDangerText\":\"خطر\",\"forms.button.iconPrimaryButton\":\"بحث\",\"forms.button.iconSimpleButton\":\"بحث\",\"forms.button.iconCirculerButton\":\"بحث\",\"forms.button.iconDashedButton\":\"بحث\",\"forms.button.SizedButton\":\"حجم الزر\",\"forms.button.DisabledButton\":\"تم تعطيل الزر\",\"forms.button.LoadingButton\":\"زر التحميل\",\"forms.button.MultipleButton\":\"زر متعددة\",\"forms.button.groupButton\":\"زر المجموعة\",\"forms.Tabs.header\":\"علامات التبويب\",\"forms.Tabs.simpleTabTitle\":\"بحث\",\"forms.Tabs.simpleTabSubTitle\":\"تم تعطيل علامات التبويب\",\"forms.Tabs.iconTabTitle\":\"أيقونة علامات التبويب\",\"forms.Tabs.miniTabTitle\":\"ميني علامات التبويب\",\"forms.Tabs.extraTabTitle\":\"علامات تبويب إضافية للعمل\",\"forms.Tabs.TabpositionTitle\":\"موضع\",\"forms.Tabs.TabpositionSubTitle\":\"موضع علامات التبويب  يسار أو يمين أو أعلى أو أسفل\",\"forms.Tabs.cardTitle\":\"نوع بطاقة علامات التبويب\",\"forms.Tabs.editableTitle\":\"إضافة علامات التبويب وإغلاقها\",\"forms.Tabs.verticalTitle\":\"عمودي نوع علامات التبويب\",\"forms.Tabs.basicTitle\":\"علامات التبويب الأساسية\",\"forms.checkbox.header\":\"مربع\",\"forms.checkbox.basicTitle\":\"مربع الاختيار الأساسي\",\"forms.checkbox.basicSubTitle\":\"الاستخدام الأساسي لخانة الاختيار.\",\"forms.checkbox.groupTitle\":\"مربع الاختيار\",\"forms.checkbox.groupSubTitle\":\"إنشاء مجموعة من مربعات الاختيار من صفيف. استخدم تعطيل لتعطيل مربع اختيار.\",\"forms.checkbox.groupCheckTitle\":\"مربع الاختيار\",\"forms.checkbox.groupCheckSubTitle\":\"إنشاء مجموعة من مربعات الاختيار من صفيف. استخدم تعطيل لتعطيل مربع اختيار.\",\"forms.radio.header\":\"راديو\",\"forms.radio.simpleTitle\":\"الراديو الأساسي\",\"forms.radio.simpleSubTitle\":\"أبسط استخدام. استخدام تعطيل لتعطيل الراديو.\",\"forms.radio.groupTitle\":\"عمودي راديوغروب\",\"forms.radio.groupSubTitle\":\"عمودي راديوغروب، مع المزيد من أجهزة الراديو.\",\"forms.radio.groupSecondTitle\":\"RadioGroup\",\"forms.radio.groupSecondSubTitle\":\"مجموعة من مكونات الراديو.\",\"forms.radio.groupThirdTitle\":\"RadioGroup\",\"forms.radio.groupThirdSubTitle\":\"مجموعة من مكونات الراديو.\",\"forms.transfer.header\":\"تحويل\",\"forms.transfer.SubTitle\":\"نقل مع مربع البحث.\",\"forms.transfer.Title\":\"بحث\",\"forms.autocomplete.header\":\"الإكمال التلقائي\",\"forms.autocomplete.simpleTitle\":\"حسب الطلب\",\"forms.autocomplete.simpleSubTitle\":\"هل يمكن أن تمر AutoComplete.Option كأطفال الإكمال التلقائي، بدلا من استخدام داتسورس\",\"forms.autocomplete.customizeTitle\":\"تخصيص مكون الإدخال\",\"forms.autocomplete.customizeSubTitle\":\"تخصيص مكون الإدخال\",\"uiElements.badge.badge\":\"شارة\",\"uiElements.badge.basicExample\":\"مثال أساسي\",\"uiElements.badge.basicExampleSubTitle\":\"أبسط الاستخدام. سيتم إخفاء شارة عندما العد هو 0، ولكن يمكننا استخدام شوزيرو لإظهار ذلك.\",\"uiElements.badge.overflowCount\":\"تجاوز عدد\",\"uiElements.badge.overflowCountSubTitle\":\"يتم عرض أوفيرفلوكونت عندما يكون عدد أكبر من أوفيرفلوكونت. القيمة الافتراضية ل أوفيرفلوكونت هي 99.\",\"uiElements.badge.status\":\"الحالة\",\"uiElements.badge.statusSubTitle\":\"شارة مستقلة مع الوضع.\",\"uiElements.badge.success\":\"نجاح\",\"uiElements.badge.error\":\"خطأ\",\"uiElements.badge.default\":\"افتراضي\",\"uiElements.badge.processing\":\"معالجة\",\"uiElements.badge.warning\":\"تحذير\",\"uiElements.badge.redBadge\":\"شارة حمراء\",\"uiElements.badge.redBadgeSubTitle\":\"وهذا ببساطة عرض شارة حمراء، دون عدد معين.\",\"uiElements.badge.linkSomething\":\"ربط شيء\",\"uiElements.cards.cards\":\"بطاقات\",\"uiElements.cards.basicCard\":\"بطاقة أساسية\",\"uiElements.cards.basicCardSubTitle\":\"بطاقة أساسية تحتوي على عنوان ومحتوى ومحتوى زاوية إضافي.\",\"uiElements.cards.more\":\"أكثر من\",\"uiElements.cards.cardTitle\":\"عنوان البطاقة\",\"uiElements.cards.cardContent\":\"محتوى البطاقة\",\"uiElements.cards.lorem\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور إنسيدونت أوت لابور إت دولور ماغنا أليكوا. أوت إنيم أد مينيم فينيام، كويس نوسترود إكسيرسيساتيون أولامكو لابوريس نيسي أوت أليكيب إكس إي كومودو ثوسكات.\",\"uiElements.cards.noBorder\":\"ليس لها حدود\",\"uiElements.cards.noBorderSubTitle\":\"بطاقة بلا حدود على خلفية رمادية.\",\"uiElements.cards.gridCard\":\"بطاقة الشبكة\",\"uiElements.cards.gridCardSubTitle\":\"بطاقات عادة ما تتعاون مع تخطيط الشبكة في صفحة نظرة عامة.\",\"uiElements.cards.loadingCard\":\"تحميل البطاقة\",\"uiElements.cards.loadingCardSubTitle\":\"لعرض مؤشر التحميل أثناء جلب محتويات البطاقة.\",\"uiElements.cards.whateverContent\":\"أيا كان المحتوى\",\"uiElements.cards.customizedContentTitle\":\"محتوى مخصص\",\"uiElements.cards.customizedContent\":\"لعرض مؤشر التحميل أثناء جلب محتويات البطاقة.\",\"uiElements.cards.europeStreetBeat\":\"فاز شارع أوروبا\",\"uiElements.cards.instagram\":\"www.instagram.com\",\"uiElements.carousel.carousel\":\"إحتفال صاخب مخمور\",\"uiElements.carousel.verticalCarousel\":\"دائري عمودي\",\"uiElements.carousel.verticalCarouselSubTitle\":\"ترقيم الصفحات الرأسي. استخدم   فرتيكال = ترو\",\"uiElements.carousel.basicCarousel\":\"دائري الأساسي\",\"uiElements.carousel.basicCarouselSubTitle\":\"الاستخدام الأساسي\",\"uiElements.carousel.fadeInTransition\":\"تتلاشى في الانتقال\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"الشرائح استخدام تتلاشى للانتقال.   تأثير = تتلاشى\",\"uiElements.carousel.scrollAutomatically\":\"مرر تلقائيا\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"توقيت التمرير إلى بطاقة المقبل    الصورة. تشغيل تلقائي\",\"uiElements.collapse.collapse\":\"انهدام\",\"uiElements.collapse.collapseSubTitle\":\"يمكن توسيع أكثر من لوحة واحدة في وقت واحد، يتم تهيئة اللوحة الأولى لتكون نشطة في هذه الحالة. وس   ديفولتاكتيفيكي =   [كينوم]\",\"uiElements.collapse.text\":\"الكلب هو نوع من الحيوانات المستأنسة. المعروفة عن ولائها والإخلاص، ويمكن العثور عليها كضيف ترحيب في العديد من الأسر في جميع أنحاء العالم.\",\"uiElements.collapse.headerOne\":\"هذا هو رأس اللوحة 1\",\"uiElements.collapse.headerTwo\":\"هذا هو رأس اللوحة 2\",\"uiElements.collapse.headerThree\":\"هذا هو رأس اللوحة 3\",\"uiElements.collapse.headerNested\":\"هذا هو لوحة لوحة العش\",\"uiElements.collapse.nestedExample\":\"مثال متداخل\",\"uiElements.collapse.nestedExampleSubTitle\":\"يتم دمج كولابس داخل كولابس.\",\"uiElements.collapse.borderlessExample\":\"مثال بلا حدود\",\"uiElements.collapse.borderlessExampleSubTitle\":\"نمط بلا حدود من كولابس. استخدم   بوردرد =   فالس\",\"uiElements.collapse.accordion\":\"أكورديون\",\"uiElements.collapse.accordionSubTitle\":\"وضع الأكورديون، لوحة واحدة فقط يمكن توسيعها في وقت واحد. سيتم توسيع اللوحة الأولى بشكل افتراضي. استخدام الأكورديون\",\"uiElements.popover.popover\":\"البوب\",\"uiElements.popover.basicExample\":\"مثال أساسي\",\"uiElements.popover.basicExampleSubTitle\":\"أبسط مثال. حجم طبقة عائمة يعتمد على محتويات المنطقة.\",\"uiElements.popover.hoverMe\":\"مرر لي\",\"uiElements.popover.title\":\"عنوان\",\"uiElements.popover.titleTrigger\":\"ثلاث طرق لتحريك\",\"uiElements.popover.titleTriggerSubTitle\":\"الماوس فوق، والتركيز والتحرك في.\",\"uiElements.popover.focusMe\":\"ركزني\",\"uiElements.popover.clickMe\":\"انقر فوق لي\",\"uiElements.popover.placement\":\"تحديد مستوى\",\"uiElements.popover.placementSubTitle\":\"تتوفر 12 خيارا للمواضع.\",\"uiElements.popover.top\":\"أعلى\",\"uiElements.popover.topLeft\":\"أعلى اليسار\",\"uiElements.popover.topRight\":\"اعلى اليمين\",\"uiElements.popover.leftTop\":\"أعلى اليسار\",\"uiElements.popover.left\":\"اليسار\",\"uiElements.popover.leftBottom\":\"أسفل اليسار\",\"uiElements.popover.rightTop\":\"أعلى اليمين\",\"uiElements.popover.right\":\"حق\",\"uiElements.popover.bottom\":\"الأسفل\",\"uiElements.popover.bottomLeft\":\"أسفل اليسار\",\"uiElements.popover.bottomRight\":\"أسفل يمين\",\"uiElements.popover.boxTitle\":\"التحكم في إغلاق مربع الحوار\",\"uiElements.popover.boxSubTitle\":\"استخدم دعامة مرئية للتحكم في عرض البطاقة.\",\"uiElements.popover.TR\":\"TR\",\"uiElements.popover.TL\":\"TL\",\"uiElements.popover.LT\":\"LT\",\"uiElements.popover.LB\":\"رطل\",\"uiElements.popover.RT\":\"RT\",\"uiElements.popover.RB\":\"RB\",\"uiElements.popover.BL\":\"BL\",\"uiElements.popover.BR\":\"BR\",\"uiElements.popover.close\":\"قريب\",\"uiElements.tooltip.tooltip\":\"تلميح\",\"uiElements.tooltip.tooltipContent\":\"تلميح المحتوى\",\"uiElements.tooltip.basicExample\":\"مثال أساسي\",\"uiElements.tooltip.basicExampleSubTitle\":\"أبسط الاستخدام.\",\"uiElements.tooltip.placementTitle\":\"تحديد مستوى\",\"uiElements.tooltip.placementSubTitle\":\"يحتوي تولتيب على 12 اختيار للمواضع.\",\"uiElements.tooltip.TL\":\"TL\",\"uiElements.tooltip.TR\":\"TR\",\"uiElements.tooltip.LT\":\"LT\",\"uiElements.tooltip.LB\":\"رطل\",\"uiElements.tooltip.RT\":\"RT\",\"uiElements.tooltip.RB\":\"RB\",\"uiElements.tooltip.BL\":\"BL\",\"uiElements.tooltip.BR\":\"BR\",\"uiElements.tooltip.bottom\":\"الأسفل\",\"uiElements.tooltip.right\":\"حق\",\"uiElements.tooltip.left\":\"اليسار\",\"uiElements.tooltip.top\":\"أعلى\",\"uiElements.tooltip.tooltipContentSpan\":\"سيتم عرض تلميح عندما يدخل الماوس.\",\"uiElements.tooltip.contentSpan\":\"تلميح المحتوى\",\"uiElements.tags.tags\":\"الكلمات\",\"uiElements.tags.basicExample\":\"مثال أساسي\",\"uiElements.tags.basicExampleSubTitle\":\"استخدام العلامة الأساسية، ويمكن أن يكون قابلا للإغلاق عن طريق مجموعة الممتلكات القابلة للإغلاق. كلوسابل تدعم العلامة إغلوس بعد أحداث كلوس.\",\"uiElements.tags.tagOne\":\"علامة 1\",\"uiElements.tags.tagTwo\":\"علامة 2\",\"uiElements.tags.link\":\"حلقة الوصل\",\"uiElements.tags.preventDefault\":\"منع افتراضي\",\"uiElements.tags.colorfulTag\":\"علامة ملونة\",\"uiElements.tags.hotTags\":\"العلامات الساخنة\",\"uiElements.tags.hotTagsSubTitle\":\"حدد الموضوعات المفضلة لديك.\",\"uiElements.tags.hots\":\"السواخن\",\"uiElements.tags.addRemoveDynamically\":\"إضافة & إزالة ديناميكيا\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"إنشاء مجموعة من العلامات من قبل مجموعة، يمكنك إضافة وإزالة حيوي. على أساس الحدث بعد كلوس، والتي سيتم تشغيلها في حين نهاية الرسوم المتحركة وثيق.\",\"uiElements.tags.newTag\":\"+ علامة جديدة\",\"uiElements.timeline.timeline\":\"الجدول الزمني\",\"uiElements.timeline.basicExample\":\"مثال أساسي\",\"uiElements.timeline.basicTimeline\":\"الجدول الزمني الأساسي\",\"uiElements.timeline.lastNode\":\"العقدة الأخيرة\",\"uiElements.timeline.lastNodeContent\":\"عندما يكون الجدول الزمني غير مكتمل ومستمر، ضع عقدة شبح في الماضي. سيت   بندينغ =   ترو     أور   بندينغ =   a رياكت إليمنت\",\"uiElements.timeline.seeMore\":\"شاهد المزيد\",\"uiElements.timeline.custom\":\"العادة\",\"uiElements.timeline.customContent\":\"تعيين عقدة كرمز أو عنصر مخصص آخر.\",\"uiElements.timeline.colorExample\":\"مثال على الألوان\",\"uiElements.timeline.colorExampleContent\":\"تعيين لون الدوائر. الأخضر يعني الانتهاء أو حالة النجاح، أحمر يعني التحذير أو الخطأ، والأزرق يعني استمرار أو حالة افتراضية أخرى.\",\"uiElements.timeline.createServiceSite\":\"إنشاء موقع خدمات 2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"حل مشاكل الشبكة الأولية 2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"مشاكل الشبكة التي يتم حلها 2015-09-01\",\"uiElements.timeline.technicalTesting\":\"الاختبارات الفنية 2015-09-01\",\"uiElements.dropdown.dropdown\":\"اسقاط\",\"uiElements.dropdown.hoverDropdown\":\"مرر لأسفل\",\"uiElements.dropdown.hoverMe\":\"مرر لي\",\"uiElements.dropdown.hoverPlacement\":\"تحوم التنسيب المنسدلة\",\"uiElements.dropdown.hoverDisableLink\":\"مرر مؤشر الماوس لأسفل مع تعطيل الرابط\",\"uiElements.dropdown.clickedDropdown\":\"النقر المنسدلة\",\"uiElements.dropdown.buttonDropdown\":\"زر مع القائمة المنسدلة\",\"uiElements.pagination.pagination\":\"ترقيم الصفحات\",\"uiElements.pagination.basic\":\"الأساسية\",\"uiElements.pagination.more\":\"أكثر من\",\"uiElements.pagination.changer\":\"المغير\",\"uiElements.pagination.jumper\":\"سترة او قفاز او لاعب قفز\",\"uiElements.pagination.miniSize\":\"حجم صغير\",\"uiElements.pagination.simpleMode\":\"الوضع البسيط\",\"uiElements.pagination.controlled\":\"خاضع للسيطرة\",\"uiElements.pagination.totalNumber\":\"الرقم الإجمالي\",\"uiElements.rating.rating\":\"تقييم\",\"uiElements.rating.basicExample\":\"مثال أساسي\",\"uiElements.rating.basicExampleSubTitle\":\"أبسط الاستخدام.\",\"uiElements.rating.halfStar\":\"نصف نجوم\",\"uiElements.rating.halfStarSubTitle\":\"دعم حدد نصف النجم.\",\"uiElements.rating.showCopywriting\":\"عرض كتابة النصوص\",\"uiElements.rating.showCopywritingSubTitle\":\"إضافة مكونات الكتابة في معدل.\",\"uiElements.rating.readOnly\":\"يقرأ فقط\",\"uiElements.rating.readOnlySubTitle\":\"للقراءة فقط، لا يمكن استخدام الماوس للتفاعل.\",\"uiElements.rating.otherCharacter\":\"شخصية أخرى\",\"uiElements.rating.otherCharacterSubTitle\":\"استبدال النجمة الافتراضية إلى حرف آخر مثل الأبجدية، أرقام، إيكونفونت أو حتى كلمة الصينية.\",\"uiElements.tree.tree\":\"شجرة\",\"uiElements.tree.basicExample\":\"مثال أساسي\",\"uiElements.tree.basicExampleSubTitle\":\"الاستخدام الأساسي، أخبرك عن كيفية استخدام قابل للتحديد، قابل للتحديد، تعطيل، ديفولتكسانديكيس، وما إلى ذلك.\",\"uiElements.tree.basicControlledExample\":\"مثال تحكم أساسي\",\"uiElements.tree.basicControlledExampleSubTitle\":\"مثال أساسي للتحكم\",\"uiElements.tree.draggableExample\":\"مثال قابل للسحب\",\"uiElements.tree.draggableExampleSubTitle\":\"اسحب ترينود لإدراج بعد ترينود أخرى أو إدراج في ترينود الأصل الآخر.\",\"uiElements.tree.loadAsync\":\"تحميل البيانات بشكل غير متزامن\",\"uiElements.tree.loadAsyncSubTitle\":\"لتحميل البيانات بشكل غير متزامن عند النقر لتوسيع ترينود.\",\"uiElements.tree.searchableExample\":\"مثال قابل للبحث\",\"uiElements.tree.searchableExampleSubTitle\":\"شجرة قابلة للبحث\",\"uiElements.tree.treeWithLine\":\"شجرة مع خط\",\"shuffle.descriptionOne\":\"نيتسكيب 2.0 السفن، وتقديم جافا سكريبت\",\"shuffle.descriptionTwo\":\"جيسي جيمس غاريت يطلق مواصفات أجاكس\",\"shuffle.descriptionThree\":\"جكري 1.0 صدر\",\"shuffle.descriptionFour\":\"تلتزم suberscore.js الأولى\",\"shuffle.descriptionFive\":\"Backbone.js يصبح شيئا\",\"shuffle.descriptionSix\":\"الزاوي 1.0 صدر\",\"shuffle.descriptionSeven\":\"رد فعل مفتوح المصدر؛ المطورين نفرح\",\"toggle.list\":\"قائمة\",\"toggle.grid\":\"شبكة\",\"toggle.ascending\":\"تصاعدي\",\"toggle.descending\":\"تنازلي\",\"toggle.shuffle\":\"خلط\",\"toggle.rotate\":\"استدارة\",\"toggle.addItem\":\"اضافة عنصر\",\"toggle.removeItem\":\"إزالة بند\",\"contactlist.searchContacts\":\"اتصالات بحث\",\"contactlist.addNewContact\":\"إضافة جهة اتصال جديدة\",\"notes.ChoseColor\":\"اختر لونا لملاحظتك\",\"notes.addNote\":\"إضافة ملاحظة جديدة\",\"page404.title\":\"404\",\"page404.subTitle\":\"يبدو أنك قد فقدت\",\"page404.description\":\"الصفحة التي تبحث عنها غير موجودة أو تم نقلها.\",\"page404.backButton\":\"عودة المنزل\",\"page500.title\":\"500\",\"page500.subTitle\":\"خطأ في الخادم الداخلي\",\"page500.description\":\"هناك خطأ ما. الرجاء إعادة المحاولة.\",\"page500.backButton\":\"عودة المنزل\",\"page.forgetPassTitle\":\"متماثل\",\"page.forgetPassSubTitle\":\"هل نسيت كلمة المرور؟\",\"page.forgetPassDescription\":\"أدخل بريدك الإلكتروني ونرسل إليك رابط إعادة تعيين.\",\"page.sendRequest\":\"ارسل طلب\",\"page.resetPassTitle\":\"متماثل\",\"page.resetPassSubTitle\":\"إعادة تعيين كلمة المرور\",\"page.resetPassDescription\":\"أدخل كلمة مرور جديدة وقم بتأكيدها.\",\"page.resetPassSave\":\"حفظ\",\"page.signInTitle\":\"متماثل\",\"page.signInRememberMe\":\"تذكرنى\",\"page.signInButton\":\"تسجيل الدخول\",\"page.signInPreview\":\"اسم المستخدم  تجريبي، كلمة السر  ديموديمو، أو فقط اضغط على أي زر.\",\"page.signInFacebook\":\"قم بتسجيل الدخول باستخدام الفيسبوك\",\"page.signInGooglePlus\":\"سجل الدخول باستخدام غوغل بلوس\",\"page.signInAuth0\":\"سجل الدخول باستخدام أوث0\",\"page.signInForgotPass\":\"هل نسيت كلمة المرور\",\"page.signInCreateAccount\":\"إنشاء حساب إسومورفويك\",\"page.signUpTitle\":\"متماثل\",\"page.signUpTermsConditions\":\"أوافق على الشروط والأحكام\",\"page.signUpButton\":\"سجل\",\"page.signUpFacebook\":\"اشترك عبر حساب فايسبوك\",\"page.signUpGooglePlus\":\"اشترك مع غوغل بلوس\",\"page.signUpAuth0\":\"اشترك باستخدام أوث0\",\"page.signUpAlreadyAccount\":\"هل لديك حساب بالفعل؟ تسجيل الدخول.\",\"widget.reportswidget.label\":\"الإيرادات\",\"widget.reportswidget.details\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور\",\"widget.singleprogresswidget1.label\":\"تسويق\",\"widget.singleprogresswidget2.label\":\"Addvertisement\",\"widget.singleprogresswidget3.label\":\"الاستشارات\",\"widget.singleprogresswidget4.label\":\"تطوير\",\"widget.stickerwidget1.number\":\"210\",\"widget.stickerwidget1.text\":\"بريد إلكتروني غير مقروء\",\"widget.stickerwidget2.number\":\"1749\",\"widget.stickerwidget2.text\":\"تحميل الصور\",\"widget.stickerwidget3.number\":\"3024\",\"widget.stickerwidget3.text\":\"إجمالي الرسالة\",\"widget.stickerwidget4.number\":\"54\",\"widget.stickerwidget4.text\":\"أوامر المشاركة\",\"widget.salewidget1.label\":\"الإيرادات\",\"widget.salewidget1.price\":\"$ 15000\",\"widget.salewidget1.details\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور\",\"widget.salewidget2.label\":\"الإيرادات\",\"widget.salewidget2.price\":\"$ 15000\",\"widget.salewidget2.details\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور\",\"widget.salewidget3.label\":\"الإيرادات\",\"widget.salewidget3.price\":\"$ 15000\",\"widget.salewidget3.details\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور\",\"widget.salewidget4.label\":\"الإيرادات\",\"widget.salewidget4.price\":\"$ 15000\",\"widget.salewidget4.details\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور\",\"widget.cardwidget1.number\":\"110\",\"widget.cardwidget1.text\":\"رسائل جديدة\",\"widget.cardwidget2.number\":\"100٪\",\"widget.cardwidget2.text\":\"الصوت\",\"widget.cardwidget3.number\":\"137\",\"widget.cardwidget3.text\":\"موهلات\",\"widget.progresswidget1.label\":\"تحميل\",\"widget.progresswidget1.details\":\"50٪ كاملة\",\"widget.progresswidget2.label\":\"الدعم\",\"widget.progresswidget2.details\":\"80٪ العملاء راض\",\"widget.progresswidget3.label\":\"تحميل\",\"widget.progresswidget3.details\":\"65٪ كاملة\",\"widget.vcardwidget.name\":\"جون دو\",\"widget.vcardwidget.title\":\"مطور يوس\",\"widget.vcardwidget.description\":\"لوريم إيبسوم دولور سيت أميت، كونسكتيتور أديبيسيسينغ إليت، سيد دو إيسمود تيمبور أمت رولر كونسكتيتور أديبيسيسينغ إليت\",\"checkout.billingform.firstname\":\"الاسم الاول\",\"checkout.billingform.lastname\":\"الكنية\",\"checkout.billingform.company\":\"اسم الشركة\",\"checkout.billingform.email\":\"عنوان البريد الإلكتروني\",\"checkout.billingform.mobile\":\"رقم المحمول\",\"checkout.billingform.country\":\"بلد\",\"checkout.billingform.city\":\"مدينة\",\"checkout.billingform.address\":\"عنوان\",\"checkout.billingform.addressoptional\":\"شقة، جناح، وحدة الخ (اختياري\",\"checkout.billingform.checkbox\":\"انشئ حساب؟\",\"antTable.title.image\":\"صورة\",\"antTable.title.firstName\":\"الاسم الاول\",\"antTable.title.lastName\":\"الكنية\",\"antTable.title.city\":\"مدينة\",\"antTable.title.street\":\"شارع\",\"antTable.title.email\":\"البريد الإلكتروني\",\"antTable.title.dob\":\"تاريخ الميلاد\",\"Map.leaflet.basicTitle\":\"الخريطة الأساسية\",\"Map.leaflet.basicMarkerTitle\":\"خريطة أساسية (مع علامة افتراضية\",\"Map.leaflet.leafletCustomMarkerTitle\":\"خريطة أساسية (مع علامة رمز مخصص\",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"خريطة أساسية (مع علامة هتمل مخصصة\",\"Map.leaflet.leafletMarkerClusterTitle\":\"الخريطة الأساسية (مع مجموعة العلامات\",\"Map.leaflet.leafletRoutingTitle\":\"خريطة أساسية التوجيه\",\"Component.contacts.noOption\":\"لم يتم العثور على جهة اتصال\",\"email.send\":\"إرسال\",\"email.cancel\":\"إلغاء\",\"email.compose\":\"مؤلف موسيقى\",\"email.noMessage\":\"الرجاء تحديد بريد للقراءة\",\"themeSwitcher.purchase\":\"شراء الآن\",\"themeSwitcher.settings\":\"إعدادات\",\"sidebar.selectbox\":\"تحديد\",\"topbar.myprofile\":\"ملفي\"}");

/***/ }),

/***/ "XCCS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ auth; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ db; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ rsf; });

// UNUSED EXPORTS: firebaseApp

// EXTERNAL MODULE: external "firebase/app"
var app_ = __webpack_require__("wVQA");
var app_default = /*#__PURE__*/__webpack_require__.n(app_);

// EXTERNAL MODULE: external "firebase/firestore"
var firestore_ = __webpack_require__("bnmT");

// EXTERNAL MODULE: external "firebase/auth"
var auth_ = __webpack_require__("EuFW");

// EXTERNAL MODULE: external "redux-saga-firebase"
var external_redux_saga_firebase_ = __webpack_require__("yq4T");
var external_redux_saga_firebase_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_firebase_);

// CONCATENATED MODULE: ./config/firebase.config.js
/* harmony default export */ var firebase_config = ({
  apiKey: "your_firebase_api_key",
  authDomain: "your_firebase_auth_domain",
  databaseURL: "your_firebase_database_url",
  projectId: "your_firebase_project_id",
  storageBucket: "your_firebase_storage_bucket",
  messagingSenderId: "your_firebase_messaging_sender_id"
});
// CONCATENATED MODULE: ./library/firebase/firebase.js




 // Example if anyone want to use different config for production and development using .env
// const prodConfig = {
//   apiKey: process.env.REACT_APP_PROD_API_KEY,
//   authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };
// const devConfig = {
//   apiKey: process.env.REACT_APP_DEV_API_KEY,
//   authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//   projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
// };
// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
// !firebase.apps.length ? firebase.initializeApp(isoConfig) : firebase.app();

const firebaseApp = !app_default.a.apps.length ? app_default.a.initializeApp(firebase_config) : app_default.a.app();
const auth = app_default.a.auth();
const db = app_default.a.firestore();
const rsf = new external_redux_saga_firebase_default.a(firebaseApp);
/* harmony default export */ var firebase = __webpack_exports__["c"] = (app_default.a);

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "ZtOb":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/fr_FR");

/***/ }),

/***/ "bnmT":
/***/ (function(module, exports) {

module.exports = require("firebase/firestore");

/***/ }),

/***/ "cBUL":
/***/ (function(module, exports) {



/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cSRi":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/ca_ES");

/***/ }),

/***/ "e+cM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ Notification; });

// UNUSED EXPORTS: ColorChoser, EditableComponent

// EXTERNAL MODULE: external "antd/lib/notification"
var notification_ = __webpack_require__("Gss8");
var notification_default = /*#__PURE__*/__webpack_require__.n(notification_);

// CONCATENATED MODULE: ./components/Notification.js


const createNotification = (type, message, description) => {
  notification_default.a[type]({
    message,
    description
  });
};

/* harmony default export */ var Notification = (createNotification);
// EXTERNAL MODULE: external "antd/lib/button"
var button_ = __webpack_require__("eGmO");
var button_default = /*#__PURE__*/__webpack_require__.n(button_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./components/uielements/popover.js
var popover = __webpack_require__("Q94N");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./library/helpers/style_utils.js
var style_utils = __webpack_require__("9OqM");

// EXTERNAL MODULE: ./library/helpers/rtl.js
var rtl = __webpack_require__("evxR");

// CONCATENATED MODULE: ./components/ColorChooser.style.js



const ColorChooserDropdown = external_styled_components_default.a.div.withConfig({
  displayName: "ColorChooserstyle__ColorChooserDropdown",
  componentId: "sc-yqgxfr-0"
})(["display:flex;flex-flow:row wrap;max-width:160px;.ant-btn{width:20px;height:20px;border:0;outline:0;padding:0;margin:", ";", ";&:empty{visibility:visible;}&:last-child{margin:0;}&:nth-child(n + 6){margin-top:15px;}&:nth-child(5n){margin-right:0;margin-left:0;}}"], props => props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0', Object(style_utils["a" /* borderRadius */])('3px'));
/* harmony default export */ var ColorChooser_style = (Object(rtl["a" /* default */])(ColorChooserDropdown));
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// CONCATENATED MODULE: ./components/ColorChoser.js





function ColorChoser({
  colors,
  seectedColor,
  changeColor
}) {
  const [visible, setVisibility] = external_react_default.a.useState(false);

  function hide() {
    setVisibility(false);
  }

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])(ColorChooser_style, {
    className: "isoColorOptions",
    children: colors.map((color, index) => {
      const onClick = () => {
        hide();
        changeColor(index);
      };

      const style = {
        background: color
      };
      return /*#__PURE__*/Object(jsx_runtime_["jsx"])(button_default.a, {
        onClick: onClick,
        style: style
      }, index);
    })
  });

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(popover["a" /* default */], {
    content: content(),
    trigger: "click",
    visible: visible,
    onVisibleChange: handleVisibleChange,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(button_default.a, {
      style: {
        backgroundColor: colors[seectedColor]
      },
      className: "isoColorChooser"
    })
  });
}
// EXTERNAL MODULE: external "@ant-design/icons/lib/icons/EditOutlined"
var EditOutlined_ = __webpack_require__("x0cy");
var EditOutlined_default = /*#__PURE__*/__webpack_require__.n(EditOutlined_);

// EXTERNAL MODULE: external "@ant-design/icons/lib/icons/CheckOutlined"
var CheckOutlined_ = __webpack_require__("AElg");
var CheckOutlined_default = /*#__PURE__*/__webpack_require__.n(CheckOutlined_);

// EXTERNAL MODULE: ./components/uielements/input.js + 1 modules
var input = __webpack_require__("7I1n");

// CONCATENATED MODULE: ./components/EditableComponent.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function EditableComponent(props) {
  const [state, setState] = external_react_default.a.useState({
    value: props.value,
    editable: false
  });

  function handleChange(event) {
    const value = event.target.value;
    setState(_objectSpread(_objectSpread({}, state), {}, {
      value
    }));
  }

  function check() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      editable: false
    }));

    if (props.onChange) {
      props.onChange(props.itemKey, state.value);
    }
  }

  function edit() {
    setState(_objectSpread(_objectSpread({}, state), {}, {
      editable: true
    }));
  }

  const {
    value,
    editable
  } = state;
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: "isoNoteContent",
    children: editable ? /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: "isoNoteEditWrapper",
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(input["b" /* Textarea */], {
        rows: 3,
        value: value,
        onChange: handleChange,
        onPressEnter: check
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CheckOutlined_default.a, {
        className: "isoNoteEditIcon",
        onClick: check
      })]
    }) : /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
      className: "isoNoteTextWrapper",
      onClick: edit,
      children: [value || ' ', /*#__PURE__*/Object(jsx_runtime_["jsx"])(EditOutlined_default.a, {
        className: "isoNoteEditIcon"
      })]
    })
  });
}
// CONCATENATED MODULE: ./components/index.js





/***/ }),

/***/ "eGmO":
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),

/***/ "eV3Q":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/4-bd3f7c7cb0994bacffef1cf894db443a.png";

/***/ }),

/***/ "eW3l":
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "evxR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export direction */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



let direction = 'ltr';

if (false) {}

const withDirection = Component => props => {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__["jsx"])(Component, _objectSpread(_objectSpread({}, props), {}, {
    "data-rtl": direction
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (withDirection);


/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "jDDT":
/***/ (function(module, exports) {



/***/ }),

/***/ "k004":
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "kGN2":
/***/ (function(module) {

module.exports = JSON.parse("{\"sidebar.swiperslider\":\"Slider\",\"sidebar.email\":\"E-mail\",\"sidebar.chat\":\"Chiacchierare\",\"sidebar.ecommerce\":\"ecommerce\",\"sidebar.shop\":\"Negozio\",\"sidebar.cart\":\"Carrello\",\"sidebar.checkout\":\"check-out\",\"sidebar.cards\":\"Carte\",\"sidebar.maps\":\"Mappe\",\"sidebar.googleMap\":\"Google Map\",\"sidebar.leafletMap\":\"Mappa del foglio\",\"sidebar.calendar\":\"Calendario\",\"sidebar.firestorecrud\":\"Firestore CRUD\",\"sidebar.firestorecrudarticle\":\"articoli\",\"sidebar.firestorecrudinvestor\":\"Investitori\",\"sidebar.notes\":\"Gli appunti\",\"sidebar.todos\":\"Todos\",\"sidebar.contacts\":\"Contatti\",\"sidebar.shuffle\":\"rimescolare\",\"sidebar.charts\":\"Grafici\",\"sidebar.googleCharts\":\"Google Carts\",\"sidebar.recharts\":\"Recharts\",\"sidebar.reactVis\":\"React Vis\",\"sidebar.reactChart2\":\"React-Chart-2\",\"sidebar.reactTrend\":\"React-Trend\",\"sidebar.eChart\":\"Echart\",\"sidebar.forms\":\"Forme\",\"sidebar.input\":\"Ingresso\",\"sidebar.editor\":\"editore\",\"sidebar.formsWithValidation\":\"Forme con validazione\",\"sidebar.progress\":\"Progresso\",\"sidebar.button\":\"Pulsante\",\"sidebar.tab\":\"linguetta\",\"sidebar.checkbox\":\"casella di controllo\",\"sidebar.radiobox\":\"radiobox\",\"sidebar.transfer\":\"Trasferimento\",\"sidebar.autocomplete\":\"Completamento automatico\",\"sidebar.boxOptions\":\"Opzioni casella\",\"sidebar.uiElements\":\"Elementi UI\",\"sidebar.badge\":\"Distintivo\",\"sidebar.card2\":\"Carta\",\"sidebar.corusel\":\"gozzoviglia\",\"sidebar.collapse\":\"Crollo\",\"sidebar.popover\":\"Pop Over\",\"sidebar.tooltip\":\"tooltip\",\"sidebar.tag\":\"Etichetta\",\"sidebar.timeline\":\"Sequenza temporale\",\"sidebar.dropdown\":\"Cadere in picchiata\",\"sidebar.pagination\":\"paginatura\",\"sidebar.rating\":\"Valutazione\",\"sidebar.tree\":\"Albero\",\"sidebar.advancedElements\":\"Elementi avanzati\",\"sidebar.reactDates\":\"Date di reazione\",\"sidebar.codeMirror\":\"Specchio di codice\",\"sidebar.uppy\":\"Uploader Uppy\",\"sidebar.dropzone\":\"Zona di rilascio\",\"sidebar.feedback\":\"Risposta\",\"sidebar.alert\":\"Mettere in guardia\",\"sidebar.modal\":\"Modale\",\"sidebar.message\":\"Messaggio\",\"sidebar.notification\":\"Notifica\",\"sidebar.popConfirm\":\"Pop Conferma\",\"sidebar.spin\":\"Roteare\",\"sidebar.tables\":\"tabelle\",\"sidebar.antTables\":\"Ant Table\",\"sidebar.pages\":\"pagine\",\"sidebar.500\":\"500\",\"sidebar.404\":\"404\",\"sidebar.signIn\":\"Registrati\",\"sidebar.signUp\":\"Registrazione\",\"sidebar.forgotPw\":\"Hai dimenticato le password\",\"sidebar.resetPw\":\"Azzerare le password\",\"sidebar.invoice\":\"Fattura\",\"sidebar.menuLevels\":\"Livelli del menu\",\"sidebar.item1\":\"Voce 1\",\"sidebar.item2\":\"Articolo 2\",\"sidebar.option1\":\"opzione 1\",\"sidebar.option2\":\"Opzione 2\",\"sidebar.option3\":\"Opzione 3\",\"sidebar.option4\":\"Opzione 4\",\"sidebar.blankPage\":\"Pagina vuota\",\"sidebar.githubSearch\":\"Ricerca Github\",\"sidebar.youtubeSearch\":\"Cambia lingua\",\"languageSwitcher.label\":\"Switcher di temi\",\"themeSwitcher\":\"Sidebar\",\"themeSwitcher.Sidebar\":\"topbar\",\"themeSwitcher.Topbar\":\"sfondo\",\"themeSwitcher.Background\":\"Titolo di base\",\"feedback.alert.basicTitle\":\"Testo di successo\",\"feedback.alert.successText\":\"Info Testo\",\"feedback.alert.infoText\":\"Testo di avviso\",\"feedback.alert.warningText\":\"Testo di errore\",\"feedback.alert.errorText\":\"Tipo avvisi chiudibili\",\"feedback.alert.closableAlertType\":\"Tipo di avviso di icone\",\"feedback.alert.iconAlertType\":\"Tipo di avviso di informazioni sullicona\",\"feedback.alert.iconInfoAlertType\":\"suggerimenti di successo\",\"feedback.alert.successTips\":\"Descrizione dettagliata e consigli su copywriting di successo.\",\"feedback.alert.successTipsDescription\":\"Note informative\",\"feedback.alert.informationTips\":\"Descrizione e informazioni aggiuntive su copywriting.\",\"feedback.alert.informationDescription\":\"avvertimento\",\"feedback.alert.warningTips\":\"Questo è un avviso di avviso di copywriting.\",\"feedback.alert.warningDescription\":\"Errore\",\"feedback.alert.errorTips\":\"Si tratta di un messaggio di errore relativo a copywriting.\",\"feedback.alert.errorDescription\":\"Modale con personalizzazione di piè di pagina\",\"feedback.alert.modalTitle\":\"Dialogo modale di base.\",\"feedback.alert.modalSubTitle\":\"Successo\",\"feedback.alert.successTitle\":\"Informazioni\",\"feedback.alert.infoTitle\":\"Errore\",\"feedback.alert.errorTitle\":\"avvertimento\",\"feedback.alert.warningTitle\":\"Modale\",\"feedback.alert.modalBlockTitle\":\"Finestra di dialogo Modalità di conferma\",\"feedback.alert.confirmationModalDialogue\":\"Semplice dialogo modale\",\"feedback.alert.simpleModalDialogue\":\"Messaggio\",\"feedback.alert.message\":\"Messaggio normale\",\"feedback.alert.normalMessageTitle\":\"Messaggi normali come feedback.\",\"feedback.alert.normalMessageSubtitle\":\"Visualizza il messaggio normale\",\"feedback.alert.displayMessage\":\"Altri tipi di messaggio\",\"feedback.alert.displayOtherTypeMessageTitle\":\"Messaggi di tipo di successo   di errore e di avviso.\",\"feedback.alert.displayOtherTypeMessageSubTitle\":\"Personalizza durata\",\"feedback.alert.customizeDurationTitle\":\"personalizzare la durata della visualizzazione dei messaggi da default da 1.5s a 10s.\",\"feedback.alert.customizeDurationSubTitle\":\"Durata del display personalizzata\",\"feedback.alert.customizeDurationButton\":\"Messaggio di caricamento\",\"feedback.alert.messageLoadingTitle\":\"Visualizzare un indicatore globale di caricamento   che viene eliminato in modo sincrono.\",\"feedback.alert.messageLoadingSubTitle\":\"Visualizzare un indicatore di caricamento\",\"feedback.alert.displayLoadIndicator\":\"Notifica\",\"feedback.alert.notification\":\"Di base\",\"feedback.alert.notificationBasicTitle\":\"Lutilizzo più semplice che chiude la casella di notifica dopo 4.5s.\",\"feedback.alert.notificationBasicSubTitle\":\"Aprire la casella di notifica\",\"feedback.alert.notificationBasicDescription\":\"Durata dopo la chiusura della casella di notifica\",\"feedback.alert.notificationDurationTitle\":\"La durata può essere utilizzata per specificare la durata della notifica rimanere aperta. Dopo la scadenza della durata   la notifica si chiude automaticamente. Se non è specificato   il valore predefinito è di 4  5 secondi. Se si imposta il valore su 0   la casella di notifica non si chiude automaticamente.\",\"feedback.alert.notificationDurationSubTitle\":\"Notifica con icona\",\"feedback.alert.notificationwithIconTitle\":\"Una casella di notifica con unicona sul lato sinistro.\",\"feedback.alert.notificationwithIconSubTitle\":\"Notifica con icona personalizzata\",\"feedback.alert.notificationwithCustomIconTitle\":\"Messaggi normali come feedback.\",\"feedback.alert.notificationwithCustomIconSubTitle\":\"Notifica con il pulsante personalizzato\",\"feedback.alert.notificationwithCustomButtonTitle\":\"Messaggi normali come feedback.\",\"feedback.alert.notificationwithCustomButtonSubTitle\":\"Pop Conferma\",\"feedback.alert.popConfirm\":\"Conferma fondamentale\",\"feedback.alert.popConfirm.basicTitle\":\"Lesempio di base.\",\"feedback.alert.popConfirm.basicSubTitle\":\"Elimina\",\"feedback.alert.popConfirm.delete\":\"Notifica con icona personalizzata\",\"feedback.alert.popConfirm.notiWithIconTitle\":\"Messaggi normali come feedback.\",\"feedback.alert.popConfirm.notiWithIconSubTitle\":\"TL\",\"feedback.alert.popConfirm.TL\":\"Superiore\",\"feedback.alert.popConfirm.top\":\"TR\",\"feedback.alert.popConfirm.TR\":\"LT\",\"feedback.alert.popConfirm.LT\":\"Sinistra\",\"feedback.alert.popConfirm.left\":\"LIBBRE\",\"feedback.alert.popConfirm.LB\":\"RT\",\"feedback.alert.popConfirm.RT\":\"Destra\",\"feedback.alert.popConfirm.right\":\"RB\",\"feedback.alert.popConfirm.RB\":\"BL\",\"feedback.alert.popConfirm.Bl\":\"Parte inferiore\",\"feedback.alert.popConfirm.bottom\":\"BR\",\"feedback.alert.popConfirm.BR\":\"Roteare\",\"feedback.alert.spin\":\"Dimensioni Spin\",\"feedback.alert.spin.basicTitle\":\"Spin con lo sfondo\",\"feedback.alert.spin.background\":\"Spin con descrizione di sfondo\",\"feedback.alert.spin.backgroundDescription\":\"Stato di caricamento\",\"feedback.alert.spin.loadingState\":\"Titolo del messaggio di avviso\",\"feedback.alert.spin.alertTitle\":\"Ulteriori dettagli sul contesto di questo avviso.\",\"feedback.alert.spin.alertDescription\":\"Ingresso\",\"forms.input.header\":\"Utilizzo di base\",\"forms.input.basicTitle\":\"Esempio di utilizzo di base.\",\"forms.input.basicSubTitle\":\"Tre formati di ingresso\",\"forms.input.variationsTitle\":\"Sono disponibili tre dimensioni di una casella Input  grande (42px     predefinito (35px   e piccolo (30px  . Nota  Allinterno delle forme viene utilizzata solo la grande dimensione.\",\"forms.input.variationsSubtitle\":\"Gruppo di input\",\"forms.input.groupTitle\":\"Esempio di input.Group Nota  Non è necessario Col per controllare la larghezza nella modalità compatta.\",\"forms.input.groupSubTitle\":\"Autosizing laltezza per adattarsi al contenuto\",\"forms.input.autoSizingTitle\":\"autosize prop per un tipo di textarea dellinput rende laltezza regolabile automaticamente in base al contenuto. Può essere fornito un oggetto opzioni per autosizzare per specificare il numero minimo e massimo di righe che larea textarea regolerà automaticamente.\",\"forms.input.autoSizingSubTitle\":\"Scheda Pre    Post\",\"forms.input.prePostTabTitle\":\"Utilizzo di pre & amp; esempi di tabulazioni post ..\",\"forms.input.prePostTabSubTitle\":\"Textarea\",\"forms.input.textAreaTitle\":\"Per i casi di input utente multi-line   è possibile utilizzare un input il cui tipo prop ha il valore di textarea.\",\"forms.input.textAreaSubTitle\":\"Ricerca\",\"forms.input.searchTitle\":\"Esempio di creazione di una casella di ricerca raggruppando un input standard con un pulsante di ricerca\",\"forms.input.searchSubTitle\":\"editore\",\"forms.editor.header\":\"Modulo di convalida personalizzata\",\"forms.formsWithValidation.header\":\"Fallire\",\"forms.formsWithValidation.failLabel\":\"Dovrebbe essere combinazione di numeri & amp; alfabeti\",\"forms.formsWithValidation.failHelp\":\"avvertimento\",\"forms.formsWithValidation.warningLabel\":\"Convalida\",\"forms.formsWithValidation.ValidatingLabel\":\"Le informazioni vengono convalidate ...\",\"forms.formsWithValidation.ValidatingHelp\":\"Successo\",\"forms.formsWithValidation.SuccessLabel\":\"avvertimento\",\"forms.formsWithValidation.WarninghasFeedbackLabel\":\"Fallire\",\"forms.formsWithValidation.FailhasFeedbackLabel\":\"Dovrebbe essere combinazione di numeri & amp; alfabeti\",\"forms.formsWithValidation.FailhasFeedbackHelp\":\"Barra di avanzamento\",\"forms.progressBar.header\":\"Barra di avanzamento\",\"forms.progressBar.standardTitle\":\"Una barra di avanzamento standard.\",\"forms.progressBar.standardSubTitle\":\"Barra di progressione circolare\",\"forms.progressBar.circularTitle\":\"Una barra di avanzamento circolare.\",\"forms.progressBar.circularSubTitle\":\"Barra di avanzamento di taglia minima\",\"forms.progressBar.miniTitle\":\"Adatto per una zona stretta.\",\"forms.progressBar.miniSubTitle\":\"Una barra di avanzamento circolare più piccola.\",\"forms.progressBar.miniCircularTitle\":\"Barra di avanzamento circolare dinamica\",\"forms.progressBar.dynamicCircularTitle\":\"Una barra dinamica di avanzamento è migliore.\",\"forms.progressBar.dynamicCircularSubTitle\":\"Formato di testo personalizzato\",\"forms.progressBar.customTextTitle\":\"È possibile formattare il testo personalizzato impostando il formato.\",\"forms.progressBar.customTextSubTitle\":\"Cruscotto\",\"forms.progressBar.dashboardTitle\":\"Uno stile del cruscotto del progresso.\",\"forms.progressBar.dashboardSubTitle\":\"pulsanti\",\"forms.button.header\":\"Tipo di pulsante\",\"forms.button.simpleButton\":\"Icona pulsante\",\"forms.button.iconButton\":\"Primario\",\"forms.button.simpleButtonPrimaryText\":\"Predefinito\",\"forms.button.simpleButtonDefaultText\":\"tratteggiata\",\"forms.button.simpleButtonDashedText\":\"Pericolo\",\"forms.button.simpleButtonDangerText\":\"ricerca\",\"forms.button.iconPrimaryButton\":\"ricerca\",\"forms.button.iconSimpleButton\":\"ricerca\",\"forms.button.iconCirculerButton\":\"ricerca\",\"forms.button.iconDashedButton\":\"Dimensioni del pulsante\",\"forms.button.SizedButton\":\"Pulsante disabilitato\",\"forms.button.DisabledButton\":\"Caricamento del tasto\",\"forms.button.LoadingButton\":\"Pulsante multiplo\",\"forms.button.MultipleButton\":\"Gruppo di pulsanti\",\"forms.button.groupButton\":\"Tabs\",\"forms.Tabs.header\":\"ricerca\",\"forms.Tabs.simpleTabTitle\":\"Schede disattivate\",\"forms.Tabs.simpleTabSubTitle\":\"Tabulazioni delle icone\",\"forms.Tabs.iconTabTitle\":\"Mini schede\",\"forms.Tabs.miniTabTitle\":\"Schede Azione Extra\",\"forms.Tabs.extraTabTitle\":\"Posizione\",\"forms.Tabs.TabpositionTitle\":\"Posizione delle schede  sinistra   destra   superiore o inferiore\",\"forms.Tabs.TabpositionSubTitle\":\"Schede del tipo di scheda\",\"forms.Tabs.cardTitle\":\"Aggiungi e chiudi le schede\",\"forms.Tabs.editableTitle\":\"Schede di tipo verticale\",\"forms.Tabs.verticalTitle\":\"Schede di base\",\"forms.Tabs.basicTitle\":\"casella di controllo\",\"forms.checkbox.header\":\"Casella di controllo di base\",\"forms.checkbox.basicTitle\":\"Utilizzo di base della casella di controllo.\",\"forms.checkbox.basicSubTitle\":\"Gruppo di casella di controllo\",\"forms.checkbox.groupTitle\":\"Generare un gruppo di caselle di controllo da un array. Utilizza disabilitato per disattivare una casella di controllo.\",\"forms.checkbox.groupSubTitle\":\"Gruppo di casella di controllo\",\"forms.checkbox.groupCheckTitle\":\"Generare un gruppo di caselle di controllo da un array. Utilizza disabilitato per disattivare una casella di controllo.\",\"forms.checkbox.groupCheckSubTitle\":\"Radio\",\"forms.radio.header\":\"Radio di base\",\"forms.radio.simpleTitle\":\"Luso più semplice. Usare disabilitato per disattivare una radio.\",\"forms.radio.simpleSubTitle\":\"RadioGroup verticale\",\"forms.radio.groupTitle\":\"RadioGroup verticale   con più radio.\",\"forms.radio.groupSubTitle\":\"RadioGroup\",\"forms.radio.groupSecondTitle\":\"Un gruppo di componenti radio.\",\"forms.radio.groupSecondSubTitle\":\"RadioGroup\",\"forms.radio.groupThirdTitle\":\"Un gruppo di componenti radio.\",\"forms.radio.groupThirdSubTitle\":\"Trasferimento\",\"forms.transfer.header\":\"Trasferisci con una casella di ricerca.\",\"forms.transfer.SubTitle\":\"Ricerca\",\"forms.transfer.Title\":\"Completamento automatico\",\"forms.autocomplete.header\":\"su misura\",\"forms.autocomplete.simpleTitle\":\"Potresti passare AutoComplete.Option come bambini di AutoComplete   invece di utilizzare dataSource\",\"forms.autocomplete.simpleSubTitle\":\"Personalizza componente di input\",\"forms.autocomplete.customizeTitle\":\"Personalizza componente di input\",\"forms.autocomplete.customizeSubTitle\":\"Distintivo\",\"uiElements.badge.badge\":\"Esempio di base\",\"uiElements.badge.basicExample\":\"Uso più semplice. Il distintivo sarà nascosto quando il conteggio è 0   ma possiamo usare showZero per mostrarlo.\",\"uiElements.badge.basicExampleSubTitle\":\"Numero di overflow\",\"uiElements.badge.overflowCount\":\"OverflowCount viene visualizzato quando il conteggio è maggiore di overflowCount. Il valore predefinito di overflowCount è 99.\",\"uiElements.badge.overflowCountSubTitle\":\"Stato\",\"uiElements.badge.status\":\"Distintivo autonomo con stato.\",\"uiElements.badge.statusSubTitle\":\"Successo\",\"uiElements.badge.success\":\"Errore\",\"uiElements.badge.error\":\"Predefinito\",\"uiElements.badge.default\":\"lavorazione\",\"uiElements.badge.processing\":\"avvertimento\",\"uiElements.badge.warning\":\"Distintivo rosso\",\"uiElements.badge.redBadge\":\"Questo mostrerà semplicemente un distintivo rosso   senza un conteggio specifico.\",\"uiElements.badge.redBadgeSubTitle\":\"Collegare qualcosa\",\"uiElements.badge.linkSomething\":\"Carte\",\"uiElements.cards.cards\":\"Scheda di base\",\"uiElements.cards.basicCard\":\"Una scheda di base contenente un titolo   un contenuto e un contenuto aggiuntivo dangolo.\",\"uiElements.cards.basicCardSubTitle\":\"Di Più\",\"uiElements.cards.more\":\"Titolo della carta\",\"uiElements.cards.cardTitle\":\"Contenuto della scheda\",\"uiElements.cards.cardContent\":\"Il peso del peso è ridotto   lelit di adipisizione del consectetur   che rende meno efficace il lavoro e la dolce magna aliqua. Lut enim ad minim veniam   quis nostrud esercizio ullamco laboris nisi ut aliquip ex ea commodo consequat.\",\"uiElements.cards.lorem\":\"Nessun bordo\",\"uiElements.cards.noBorder\":\"Una carta senza bordi su uno sfondo grigio.\",\"uiElements.cards.noBorderSubTitle\":\"Scheda di griglia\",\"uiElements.cards.gridCard\":\"Carte di solito cooperano con il layout della griglia nella pagina di panoramica.\",\"uiElements.cards.gridCardSubTitle\":\"Caricamento della carta\",\"uiElements.cards.loadingCard\":\"Mostra un indicatore di caricamento durante il recupero del contenuto della scheda.\",\"uiElements.cards.loadingCardSubTitle\":\"Qualunque contenuto\",\"uiElements.cards.whateverContent\":\"Contenuto personalizzato\",\"uiElements.cards.customizedContentTitle\":\"Mostra un indicatore di caricamento durante il recupero del contenuto della scheda.\",\"uiElements.cards.customizedContent\":\"Europa Street beat\",\"uiElements.cards.europeStreetBeat\":\"www.instagram.com\",\"uiElements.cards.instagram\":\"gozzoviglia\",\"uiElements.carousel.carousel\":\"Carosello verticale\",\"uiElements.carousel.verticalCarousel\":\"Pagination verticale. utilizzare   vertical = true\",\"uiElements.carousel.verticalCarouselSubTitle\":\"Carosello di base\",\"uiElements.carousel.basicCarousel\":\"Utilizzo di base\",\"uiElements.carousel.basicCarouselSubTitle\":\"Fade in transizione\",\"uiElements.carousel.fadeInTransition\":\"Le diapositive utilizzano dissolvenza per la transizione.   Effetto = dissolvenza\",\"uiElements.carousel.fadeInTransitionSubTitle\":\"Scorri automaticamente\",\"uiElements.carousel.scrollAutomatically\":\"Timing di scorrimento alla scheda    immagine successiva. riproduzione automatica\",\"uiElements.carousel.scrollAutomaticallySubTitle\":\"Crollo\",\"uiElements.collapse.collapse\":\"Più di un pannello può essere espanso alla volta   il primo pannello viene inizializzato per essere attivo in questo caso. utilizzare   defaultActiveKey =   [keyNum]\",\"uiElements.collapse.collapseSubTitle\":\"Un cane è un tipo di animale domestico. Conosciuto per la sua fedeltà e fedeltà   si può trovare come un ospite benvenuto in molte famiglie in tutto il mondo.\",\"uiElements.collapse.text\":\"Questa è lintestazione del pannello 1\",\"uiElements.collapse.headerOne\":\"Questa è lintestazione del pannello 2\",\"uiElements.collapse.headerTwo\":\"Questa è lintestazione del pannello 3\",\"uiElements.collapse.headerThree\":\"Questo è il pannello nido del pannello\",\"uiElements.collapse.headerNested\":\"Esempio nidificato\",\"uiElements.collapse.nestedExample\":\"Il crollo è nidificato allinterno del Collapse.\",\"uiElements.collapse.nestedExampleSubTitle\":\"Esempio senza bordi\",\"uiElements.collapse.borderlessExample\":\"Uno stile senza bordo di Collapse. utilizzare   bordered =   false\",\"uiElements.collapse.borderlessExampleSubTitle\":\"Fisarmonica\",\"uiElements.collapse.accordion\":\"Modalità fisarmonica   è possibile espandere un solo pannello alla volta. Il primo pannello verrà espanso per impostazione predefinita. utilizzare la fisarmonica\",\"uiElements.collapse.accordionSubTitle\":\"popover\",\"uiElements.popover.popover\":\"Esempio di base\",\"uiElements.popover.basicExample\":\"Lesempio più semplice. La dimensione dello strato galleggiante dipende dalla regione dei contenuti.\",\"uiElements.popover.basicExampleSubTitle\":\"Allontanami\",\"uiElements.popover.hoverMe\":\"Titolo\",\"uiElements.popover.title\":\"Tre modi per attivare\",\"uiElements.popover.titleTrigger\":\"Mouse per fare clic   concentrarsi e muoversi.\",\"uiElements.popover.titleTriggerSubTitle\":\"Mi concentri\",\"uiElements.popover.focusMe\":\"Cliccami\",\"uiElements.popover.clickMe\":\"Posizionamento\",\"uiElements.popover.placement\":\"Sono disponibili 12 opzioni di posizionamento.\",\"uiElements.popover.placementSubTitle\":\"Superiore\",\"uiElements.popover.top\":\"A sinistra in alto\",\"uiElements.popover.topLeft\":\"In alto a destra\",\"uiElements.popover.topRight\":\"In alto a sinistra\",\"uiElements.popover.leftTop\":\"Sinistra\",\"uiElements.popover.left\":\"Sinistra inferiore\",\"uiElements.popover.leftBottom\":\"Destra destra\",\"uiElements.popover.rightTop\":\"Destra\",\"uiElements.popover.right\":\"Parte inferiore\",\"uiElements.popover.bottom\":\"In basso a sinistra\",\"uiElements.popover.bottomLeft\":\"In basso a destra\",\"uiElements.popover.bottomRight\":\"Controllare la chiusura della finestra di dialogo\",\"uiElements.popover.boxTitle\":\"Utilizzare un supporto visibile per controllare la visualizzazione della scheda.\",\"uiElements.popover.boxSubTitle\":\"TR\",\"uiElements.popover.TR\":\"TL\",\"uiElements.popover.TL\":\"LT\",\"uiElements.popover.LT\":\"LIBBRE\",\"uiElements.popover.LB\":\"RT\",\"uiElements.popover.RT\":\"RB\",\"uiElements.popover.RB\":\"BL\",\"uiElements.popover.BL\":\"BR\",\"uiElements.popover.BR\":\"Vicino\",\"uiElements.popover.close\":\"tooltip\",\"uiElements.tooltip.tooltip\":\"Contenuto del Tooltip\",\"uiElements.tooltip.tooltipContent\":\"Esempio di base\",\"uiElements.tooltip.basicExample\":\"Luso più semplice.\",\"uiElements.tooltip.basicExampleSubTitle\":\"Posizionamento\",\"uiElements.tooltip.placementTitle\":\"La ToolTip ha 12 scelta dei posizionamenti.\",\"uiElements.tooltip.placementSubTitle\":\"TL\",\"uiElements.tooltip.TL\":\"TR\",\"uiElements.tooltip.TR\":\"LT\",\"uiElements.tooltip.LT\":\"LIBBRE\",\"uiElements.tooltip.LB\":\"RT\",\"uiElements.tooltip.RT\":\"RB\",\"uiElements.tooltip.RB\":\"BL\",\"uiElements.tooltip.BL\":\"BR\",\"uiElements.tooltip.BR\":\"Parte inferiore\",\"uiElements.tooltip.bottom\":\"Destra\",\"uiElements.tooltip.right\":\"Sinistra\",\"uiElements.tooltip.left\":\"Superiore\",\"uiElements.tooltip.top\":\"Tooltip verrà mostrato quando il mouse entra.\",\"uiElements.tooltip.tooltipContentSpan\":\"Contenuto del Tooltip\",\"uiElements.tooltip.contentSpan\":\"tag\",\"uiElements.tags.tags\":\"Esempio di base\",\"uiElements.tags.basicExample\":\"Utilizzo di Tag di base e potrebbe essere chiuso da una proprietà chiusa configurabile. Tag Closable supporta onClose afterClose eventi.\",\"uiElements.tags.basicExampleSubTitle\":\"Tag 1\",\"uiElements.tags.tagOne\":\"Tag 2\",\"uiElements.tags.tagTwo\":\"collegamento\",\"uiElements.tags.link\":\"Impedire il default\",\"uiElements.tags.preventDefault\":\"Tag colorato\",\"uiElements.tags.colorfulTag\":\"Tag Hot\",\"uiElements.tags.hotTags\":\"Seleziona i tuoi argomenti preferiti.\",\"uiElements.tags.hotTagsSubTitle\":\"Hots\",\"uiElements.tags.hots\":\"Aggiungi e rimuove in modo dinamico\",\"uiElements.tags.addRemoveDynamically\":\"La generazione di un insieme di tag per array consente di aggiungere e rimuovere in modo dinamico. Il suo è basato sullevento afterClose   che verrà attivato mentre la fine animazione fine.\",\"uiElements.tags.addRemoveDynamicallySubTitle\":\"+ Nuovo tag\",\"uiElements.tags.newTag\":\"Sequenza temporale\",\"uiElements.timeline.timeline\":\"Esempio di base\",\"uiElements.timeline.basicExample\":\"Timeline di base\",\"uiElements.timeline.basicTimeline\":\"Ultimo nodo\",\"uiElements.timeline.lastNode\":\"Quando la timeline è incompleta e in corso   infine   metti un nodo fantasma. impostare   in attesa =   true     o   in attesa =   a React Element\",\"uiElements.timeline.lastNodeContent\":\"Vedi altro\",\"uiElements.timeline.seeMore\":\"costume\",\"uiElements.timeline.custom\":\"Imposta un nodo come unicona o un altro elemento personalizzato.\",\"uiElements.timeline.customContent\":\"Esempio di colore\",\"uiElements.timeline.colorExample\":\"Imposta il colore dei cerchi. verde significa stato completato o successo   rosso significa avvertimento o errore   e blu significa stato continuo o altro.\",\"uiElements.timeline.colorExampleContent\":\"Creare un sito di servizi per il 2015-09-01\",\"uiElements.timeline.createServiceSite\":\"Risolvere i problemi di rete iniziali dal 2015-09-01\",\"uiElements.timeline.solveInitialNetwork\":\"Problemi di rete risolti 2015-09-01\",\"uiElements.timeline.networkProblemSolved\":\"Test tecnici del 2015-09-01\",\"uiElements.timeline.technicalTesting\":\"Cadere in picchiata\",\"uiElements.dropdown.dropdown\":\"Disattiva a discesa\",\"uiElements.dropdown.hoverDropdown\":\"Allontanami\",\"uiElements.dropdown.hoverMe\":\"Posizionamento di posizionamento a discesa\",\"uiElements.dropdown.hoverPlacement\":\"Sospendi con il disattivato link\",\"uiElements.dropdown.hoverDisableLink\":\"Clicca su Drop Down\",\"uiElements.dropdown.clickedDropdown\":\"Pulsante con menu a discesa\",\"uiElements.dropdown.buttonDropdown\":\"paginatura\",\"uiElements.pagination.pagination\":\"Di base\",\"uiElements.pagination.basic\":\"Di Più\",\"uiElements.pagination.more\":\"Changer\",\"uiElements.pagination.changer\":\"Saltatore\",\"uiElements.pagination.jumper\":\"Mini formato\",\"uiElements.pagination.miniSize\":\"Modalità semplice\",\"uiElements.pagination.simpleMode\":\"Controlled\",\"uiElements.pagination.controlled\":\"Numero totale\",\"uiElements.pagination.totalNumber\":\"Valutazione\",\"uiElements.rating.rating\":\"Esempio di base\",\"uiElements.rating.basicExample\":\"Luso più semplice.\",\"uiElements.rating.basicExampleSubTitle\":\"Metà stella\",\"uiElements.rating.halfStar\":\"Sostenere selezionare la metà della stella.\",\"uiElements.rating.halfStarSubTitle\":\"Mostra copywriting\",\"uiElements.rating.showCopywriting\":\"Aggiungi copywriting in componenti di velocità.\",\"uiElements.rating.showCopywritingSubTitle\":\"Sola lettura\",\"uiElements.rating.readOnly\":\"Leggi solo   non può utilizzare il mouse per interagire.\",\"uiElements.rating.readOnlySubTitle\":\"Altro carattere\",\"uiElements.rating.otherCharacter\":\"Sostituire la stella predefinita in altri caratteri come lalfabeto   la cifra   licona o anche la parola cinese.\",\"uiElements.rating.otherCharacterSubTitle\":\"Albero\",\"uiElements.tree.tree\":\"Esempio di base\",\"uiElements.tree.basicExample\":\"Lutilizzo più semplice   ti dice come utilizzare controllibili   selezionabili   disattivati   defaultExpandKeys e così via.\",\"uiElements.tree.basicExampleSubTitle\":\"Esempio controllato di base\",\"uiElements.tree.basicControlledExample\":\"esempio controllato di base\",\"uiElements.tree.basicControlledExampleSubTitle\":\"Esempio Draggable\",\"uiElements.tree.draggableExample\":\"Trascinare alberoNode da inserire dopo laltro alberoNodo o inserire nellaltro albero TreeNode.\",\"uiElements.tree.draggableExampleSubTitle\":\"Caricare i dati in modo asincrono\",\"uiElements.tree.loadAsync\":\"Per caricare i dati in modo asincrono quando si fa clic per espandere un alberoNodo.\",\"uiElements.tree.loadAsyncSubTitle\":\"Esempio esplorabile\",\"uiElements.tree.searchableExample\":\"Albero ricercabile\",\"uiElements.tree.searchableExampleSubTitle\":\"Albero Con Linea\",\"uiElements.tree.treeWithLine\":\"Netscape 2.0 viene fornito   introducendo Javascript\",\"shuffle.descriptionOne\":\"Jesse James Garrett rilascia AJAX spec\",\"shuffle.descriptionTwo\":\"jQuery 1.0 è stato rilasciato\",\"shuffle.descriptionThree\":\"Prima sottolineare. Commit\",\"shuffle.descriptionFour\":\"Backbone.js diventa una cosa\",\"shuffle.descriptionFive\":\"Angular 1.0 è stato rilasciato\",\"shuffle.descriptionSix\":\"React è aperto; gli sviluppatori si rallegrano\",\"shuffle.descriptionSeven\":\"Elenco\",\"toggle.list\":\"Griglia\",\"toggle.grid\":\"Ascendente\",\"toggle.ascending\":\"Discendente\",\"toggle.descending\":\"rimescolare\",\"toggle.shuffle\":\"Ruotare\",\"toggle.rotate\":\"Aggiungi articolo\",\"toggle.addItem\":\"Rimuovi oggetto\",\"toggle.removeItem\":\"Cerca i contatti\",\"contactlist.searchContacts\":\"Aggiungi nuovo contatto\",\"contactlist.addNewContact\":\"Scegli un colore per la tua nota\",\"notes.ChoseColor\":\"Aggiungi nuova nota\",\"notes.addNote\":\"404\",\"page404.title\":\"Sembra che ti sei perso\",\"page404.subTitle\":\"La pagina che stai cercando non esiste o è stata spostata.\",\"page404.description\":\"RITORNO A CASA\",\"page404.backButton\":\"500\",\"page500.title\":\"Errore interno del server\",\"page500.subTitle\":\"Qualcosa è andato storto. Riprova la lettera.\",\"page500.description\":\"RITORNO A CASA\",\"page500.backButton\":\"isomorfo\",\"page.forgetPassTitle\":\"Ha dimenticato la password?\",\"page.forgetPassSubTitle\":\"Inserisci la tua email e ti inviamo un collegamento di ripristino.\",\"page.forgetPassDescription\":\"Invia richiesta\",\"page.sendRequest\":\"isomorfo\",\"page.resetPassTitle\":\"Resetta la password\",\"page.resetPassSubTitle\":\"Inserire una nuova password e confermarla.\",\"page.resetPassDescription\":\"Salvare\",\"page.resetPassSave\":\"isomorfo\",\"page.signInTitle\":\"Ricordati di me\",\"page.signInRememberMe\":\"registrati\",\"page.signInButton\":\"username  demo   password  demodemo   o basta cliccare su qualsiasi pulsante.\",\"page.signInPreview\":\"Accedi con Facebook\",\"page.signInFacebook\":\"Accedi con Google Plus\",\"page.signInGooglePlus\":\"Accedi con Auth0\",\"page.signInAuth0\":\"Ha dimenticato la password\",\"page.signInForgotPass\":\"Crea un account Isomorphoic\",\"page.signInCreateAccount\":\"isomorfo\",\"page.signUpTitle\":\"Sono daccordo con i termini e le condivisioni\",\"page.signUpTermsConditions\":\"Registrazione\",\"page.signUpButton\":\"Registrati con Facebook\",\"page.signUpFacebook\":\"Registrati con Google Plus\",\"page.signUpGooglePlus\":\"Registrati con Auth0\",\"page.signUpAuth0\":\"Hai già un account? Registrati.\",\"page.signUpAlreadyAccount\":\"Reddito\",\"widget.reportswidget.label\":\"Il suo peso è ridotto   è aumentato   è aumentato\",\"widget.reportswidget.details\":\"Marketing\",\"widget.singleprogresswidget1.label\":\"Addvertisement\",\"widget.singleprogresswidget2.label\":\"Consulenza\",\"widget.singleprogresswidget3.label\":\"Sviluppo\",\"widget.singleprogresswidget4.label\":\"210\",\"widget.stickerwidget1.number\":\"Email non letti\",\"widget.stickerwidget1.text\":\"1749\",\"widget.stickerwidget2.number\":\"Upload di immagini\",\"widget.stickerwidget2.text\":\"3024\",\"widget.stickerwidget3.number\":\"Messaggio totale\",\"widget.stickerwidget3.text\":\"54\",\"widget.stickerwidget4.number\":\"Ordini Post\",\"widget.stickerwidget4.text\":\"Reddito\",\"widget.salewidget1.label\":\"$ 15000\",\"widget.salewidget1.price\":\"Il suo peso è ridotto   è aumentato   è aumentato\",\"widget.salewidget1.details\":\"Reddito\",\"widget.salewidget2.label\":\"$ 15000\",\"widget.salewidget2.price\":\"Il suo peso è ridotto   è aumentato   è aumentato\",\"widget.salewidget2.details\":\"Reddito\",\"widget.salewidget3.label\":\"$ 15000\",\"widget.salewidget3.price\":\"Il suo peso è ridotto   è aumentato   è aumentato\",\"widget.salewidget3.details\":\"Reddito\",\"widget.salewidget4.label\":\"$ 15000\",\"widget.salewidget4.price\":\"Il suo peso è ridotto   è aumentato   è aumentato\",\"widget.salewidget4.details\":\"110\",\"widget.cardwidget1.number\":\"Nuovi messaggi\",\"widget.cardwidget1.text\":\"100%\",\"widget.cardwidget2.number\":\"Volume\",\"widget.cardwidget2.text\":\"137\",\"widget.cardwidget3.number\":\"realizzazione\",\"widget.cardwidget3.text\":\"Scaricare\",\"widget.progresswidget1.label\":\"50% completato\",\"widget.progresswidget1.details\":\"Supporto\",\"widget.progresswidget2.label\":\"80% Cliente soddisfatto\",\"widget.progresswidget2.details\":\"Caricare\",\"widget.progresswidget3.label\":\"65% completato\",\"widget.progresswidget3.details\":\"Jhon Doe\",\"widget.vcardwidget.name\":\"Sr. iOS Developer\",\"widget.vcardwidget.title\":\"Il peso è ridotto   il prezzo è basso   il prezzo è basso   il prezzo è basso\",\"widget.vcardwidget.description\":\"Nome di battesimo\",\"checkout.billingform.firstname\":\"Cognome\",\"checkout.billingform.lastname\":\"Nome della ditta\",\"checkout.billingform.company\":\"Indirizzo email\",\"checkout.billingform.email\":\"Mobile no\",\"checkout.billingform.mobile\":\"Nazione\",\"checkout.billingform.country\":\"Città\",\"checkout.billingform.city\":\"Indirizzo\",\"checkout.billingform.address\":\"Appartamento   suite   unità ecc. (Opzionale\",\"checkout.billingform.addressoptional\":\"Crea un account?\",\"checkout.billingform.checkbox\":\"Immagine\",\"antTable.title.image\":\"Nome di battesimo\",\"antTable.title.firstName\":\"Cognome\",\"antTable.title.lastName\":\"Città\",\"antTable.title.city\":\"strada\",\"antTable.title.street\":\"E-mail\",\"antTable.title.email\":\"DOB\",\"antTable.title.dob\":\"Mappa di base\",\"Map.leaflet.basicTitle\":\"Mappa di base (con il marcatore di default\",\"Map.leaflet.basicMarkerTitle\":\"Mappa di base (con il simbolo personalizzato dellicona\",\"Map.leaflet.leafletCustomMarkerTitle\":\"Mappa di base (con il personalizzatore Html Marker\",\"Map.leaflet.leafletCustomHtmlMarkerTitle\":\"Mappa di base (con cluster di marcatori\",\"Map.leaflet.leafletMarkerClusterTitle\":\"Routing della mappa di base\",\"Map.leaflet.leafletRoutingTitle\":\"Nessun contatto trovato\",\"Component.contacts.noOption\":\"INVIARE\",\"email.send\":\"ANNULLA\",\"email.cancel\":\"COMPORRE\",\"email.compose\":\"Seleziona una mail per leggere\",\"email.noMessage\":\"PAGARE ORA\",\"themeSwitcher.purchase\":\"ACQUISTA ADESSO\",\"themeSwitcher.settings\":\"Selezionare\",\"sidebar.selectbox\":\"Selezionare\",\"sidebar.frappeChart\":\"Frappe Charts\",\"topbar.myprofile\":\"Il mio profilo\",\"topbar.help\":\"Aiuto\",\"topbar.logout\":\"Disconnettersi\",\"topbar.viewAll\":\"Guarda tutto\",\"topbar.viewCart\":\"Visualizza carrello\",\"topbar.totalPrice\":\"Prezzo totale\",\"sidebar.scrumboard\":\"Scrum Board\"}");

/***/ }),

/***/ "lwum":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const useWindowSize = () => {
  const isClient = false;
  const getSize = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(() => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  }), [isClient]);
  const [size, setSize] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(getSize);
  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(() => {
    if (!isClient) {
      return false;
    }

    const onHandleResize = () => {
      setSize(getSize);
    };

    window.addEventListener('resize', onHandleResize);
    return () => window.removeEventListener('resize', onHandleResize);
  }, [getSize, isClient]);
  return size;
};

/* harmony default export */ __webpack_exports__["a"] = (useWindowSize);

/***/ }),

/***/ "mEA0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ themeConfig; });

// CONCATENATED MODULE: ./config/theme/default.js
const theme = {};
theme.palette = {
  primary: ['#4482FF', // 0: Default
  '#3A78F5', // 1: Darken 4%
  '#3775F2', // 2: Darken 5%
  'rgba(68, 130, 255, 0.2)', // 3: Fade 20%
  '#4C8AFF', // 4: Lighten 3%
  'rgba(68, 130, 255, 0.75)', // 5: Fade 75%
  '#6AA8FF', // 6: Lighten 15%
  '#63A1FF', // 7: Lighten 12%
  '#3F7DFA', // 8: Darken 2%
  '#3369e7', // 9: Algolia color
  '#5896FF', // 10: Lighten 8%
  '#2b69e6', // 11:
  '#236cfe', // 12: darken 10%
  '#4d88ff' // 13: Lighten 5%
  ],
  secondary: ['#2d3446', // 0: DarkBlue
  '#f1f3f6', // 1: LightBluish
  '#788195', // 2: LightBlue
  '#E4E6E9', // 3: LightBluish Darken 5%
  '#364d79', // 4:
  '#202739', // 5: DarkBlue Darken 5%
  '#f5f6f8', // 6: LighterBluish
  '#e9ebf1', // 7: DarkBluish
  '#F6F8FB', // 8: LighterBluish Lighten 2%
  '#E9EBEE', // 9: LighterBluish Darken 3%
  '#1a1a1a' // 10: Sidebar submenu select
  ],
  color: ['#FEAC01', // 0: Orange
  '#42299a', // 1: Purple
  '#F75D81', // 2: Pink
  '#7ED321', // 3: LimeGreen
  '#39435f', // 4: BlueShade
  '#FFCA28', // 5: Yellow
  '#F2BD1B', // 6: Yellow Darken 5%
  '#3b5998', // 7: Facebook
  '#344e86', // 8: Facebook Darken 5%
  '#dd4b39', // 9: Google Plus
  '#d73925', // 10: Google Plus Darken 5%
  '#e14615', // 11: Auth0
  '#ca3f13', // 12: Auth0
  '#e0364c' // 13: themeColor--AlizarinCrimson
  ],
  warning: ['#ffbf00' // 0: Warning
  ],
  success: ['#00b16a' // 0: Success
  ],
  error: ['#f64744', // 0: Error
  '#EC3D3A', // 1: Darken 4%
  '#FF5B58' // 2: Lighten 8%
  ],
  grayscale: ['#bababa', // 0: GreyShade
  '#c1c1c1', // 1: GreyDark
  '#D8D8D8', // 2: Grey
  '#f1f1f1', // 3: GreyAlt
  '#F3F3F3', // 4: GreyLight
  '#fafafa', // 5: DarkWhite
  '#F9F9F9', // 6: DarkerWhite
  '#fcfcfc', // 7: #fff Darken 1%
  '#eeeeee', // 8:
  '#fbfbfb', // 9:
  '#f5f5f5', // 10:
  '#f7f8f9' // 11: today-highlight-bg
  ],
  text: ['#323332', // 0: Heading
  '#595959', // 1: HeadingLight
  '#979797', // 2: Text
  '#797979', // 3: TextDark
  '#6a6c6a' // 4: Heading Lighten 22%
  ],
  border: ['#e9e9e9', // 0: Border
  '#d8d8d8', // 1: BorderDark
  '#ebebeb', // 2: BorderLight
  '#d3d3d3', // 3:
  'rgba(228, 228, 228, 0.65)' // 4:
  ],
  calendar: ['#905', // 0:
  '#690', // 1:
  '#a67f59', // 2:
  '#07a', // 3:
  '#dd4a68', // 4:
  '#e90' // 5:
  ]
};
theme.fonts = {
  primary: 'Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace'
};
/* harmony default export */ var theme_default = (theme);
// CONCATENATED MODULE: ./config/theme/custom.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var custom = (_objectSpread(_objectSpread({}, theme_default), {}, {
  palette: {
    primary: ['#f00'],
    secondary: ['#0f0']
  }
}));
// CONCATENATED MODULE: ./config/theme/theme.config.js


const themes = {
  defaultTheme: theme_default,
  customTheme: custom
};
const themeConfig = {
  topbar: 'defaultTheme',
  sidebar: 'defaultTheme',
  layout: 'defaultTheme',
  theme: 'defaultTheme'
};
/* harmony default export */ var theme_config = __webpack_exports__["a"] = (themes);

/***/ }),

/***/ "n+6I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("x441");

const actions = {
  CHANGE_THEME: 'CHANGE_THEME',
  SWITCH_ACTIVATION: 'SWITCH_ACTIVATION',
  switchActivation: () => ({
    type: actions.SWITCH_ACTIVATION
  }),
  changeTheme: (attribute, themeName) => {
    const theme = Object(_config__WEBPACK_IMPORTED_MODULE_0__[/* getCurrentTheme */ "b"])(attribute, themeName);

    if (attribute === 'layoutTheme') {
      document.getElementsByClassName('isomorphicContent')[0].style.backgroundColor = theme.backgroundColor;
    }

    return {
      type: actions.CHANGE_THEME,
      attribute,
      theme
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "n5ik":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/11-62742201b2404ace61cd1ba94c337309.png";

/***/ }),

/***/ "nuGg":
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),

/***/ "oAEb":
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "sAR6":
/***/ (function(module, exports) {

module.exports = require("clone");

/***/ }),

/***/ "tlnx":
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "uYSz":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/10-93f709cbd5900c33e2c1244301936b48.png";

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "w+U0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const actions = {
  LOGIN_REQUEST_START: 'LOGIN_REQUEST_START',
  JWT_LOGIN_REQUEST_START: 'JWT_LOGIN_REQUEST_START',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAILURE: 'LOGIN_REQUEST_FAILURE',
  LOGOUT_REQUEST_START: 'LOGOUT_REQUEST_START',
  LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS',
  LOGOUT_REQUEST_FAILURE: 'LOGOUT_REQUEST_FAILURE',
  login: credentials => ({
    type: actions.LOGIN_REQUEST_START,
    payload: credentials
  }),
  jwtLogin: (history, userInfo) => ({
    type: actions.JWT_LOGIN_REQUEST_START,
    payload: {
      history,
      userInfo
    }
  }),
  loginRequestSuccess: credentials => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload: credentials
  }),
  loginRequestFailure: error => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload: error
  }),
  logout: () => ({
    type: actions.LOGOUT_REQUEST_START
  }),
  logoutRequestSuccess: () => ({
    type: actions.LOGOUT_REQUEST_SUCCESS
  }),
  logoutRequestFailure: error => ({
    type: actions.LOGOUT_REQUEST_FAILURE,
    payload: error
  })
};
/* harmony default export */ __webpack_exports__["a"] = (actions);

/***/ }),

/***/ "wVQA":
/***/ (function(module, exports) {

module.exports = require("firebase/app");

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "x0cy":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons/lib/icons/EditOutlined");

/***/ }),

/***/ "x441":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentTheme; });
/* harmony import */ var _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mEA0");

const changeThemes = {
  id: 'changeThemes',
  label: 'themeSwitcher',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].theme,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'customTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }]
};
const topbarTheme = {
  id: 'topbarTheme',
  label: 'themeSwitcher.Topbar',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].topbar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    textColor: '#323332'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const sidebarTheme = {
  id: 'sidebarTheme',
  label: 'themeSwitcher.Sidebar',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].sidebar,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#323332',
    backgroundColor: undefined,
    textColor: '#788195'
  }, {
    themeName: 'theme1',
    buttonColor: '#e0364c',
    backgroundColor: '#e0364c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme2',
    buttonColor: '#6534ff',
    backgroundColor: '#6534ff',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#4482FF',
    backgroundColor: '#4482FF',
    textColor: '#ffffff'
  }, {
    themeName: 'theme4',
    buttonColor: '#422e62',
    backgroundColor: '#422e62',
    textColor: '#ffffff'
  }, {
    themeName: 'theme5',
    buttonColor: '#22144c',
    backgroundColor: '#22144c',
    textColor: '#ffffff'
  }, {
    themeName: 'theme6',
    buttonColor: '#4670a2',
    backgroundColor: '#4670a2',
    textColor: '#ffffff'
  }, {
    themeName: 'theme7',
    buttonColor: '#494982',
    backgroundColor: '#494982',
    textColor: '#ffffff'
  }]
};
const layoutTheme = {
  id: 'layoutTheme',
  label: 'themeSwitcher.Background',
  defaultTheme: _iso_config_theme_theme_config__WEBPACK_IMPORTED_MODULE_0__[/* themeConfig */ "b"].layout,
  options: [{
    themeName: 'defaultTheme',
    buttonColor: '#ffffff',
    backgroundColor: '#F1F3F6',
    textColor: undefined
  }, {
    themeName: 'theme1',
    buttonColor: '#ffffff',
    backgroundColor: '#ffffff',
    textColor: '#323232'
  }, {
    themeName: 'theme2',
    buttonColor: '#F9F9F9',
    backgroundColor: '#F9F9F9',
    textColor: '#ffffff'
  }, {
    themeName: 'theme3',
    buttonColor: '#ebebeb',
    backgroundColor: '#ebebeb',
    textColor: '#ffffff'
  }]
};
const customizedThemes = {
  changeThemes,
  topbarTheme,
  sidebarTheme,
  layoutTheme
};
function getCurrentTheme(attribute, selectedThemename) {
  let selecetedTheme = {};
  customizedThemes[attribute].options.forEach(theme => {
    if (theme.themeName === selectedThemename) {
      selecetedTheme = theme;
    }
  });
  return selecetedTheme;
}
/* harmony default export */ __webpack_exports__["a"] = (customizedThemes);

/***/ }),

/***/ "xfH5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNTE2LjEyOSAyNDUuMTYxdi05MC4zMjJIMjgzLjg3MXY0OTAuMzIyaDIzMi4yNThWMjk2Ljc3NGMwLTcuMTI2IDUuNzc1LTEyLjkwMyAxMi45MDMtMTIuOTAzdi0yNS44MDdjLTcuMTI4IDAtMTIuOTAzLTUuNzc3LTEyLjkwMy0xMi45MDN6Ii8+PHBhdGggZmlsbD0iIzE2NEZDRSIgZD0iTTI0LjgwNyAxNTMuODM5aDIzNC4yNTh2NDkyLjMyMkgyNC44MDd6Ii8+PHBhdGggZmlsbD0iIzE2NEZDRSIgZD0iTTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDd6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MC45MzYgNjQ2LjE2MVYyOTYuNzc0YzAtNi41NjMtNS4zNC0xMS45MDMtMTEuOTAzLTExLjkwM2gtMXYtMjcuODA3aDFjNi41NjMgMCAxMS45MDMtNS4zNCAxMS45MDMtMTEuOTAzdi05MS4zMjJoMjM0LjI1OHY0OTIuMzIySDU0MC45MzZ6Ii8+PHBhdGggZmlsbD0iI0VEMUYzNCIgZD0iTTU0MS45MzYgMjQ1LjE2MWMwIDcuMTI2LTUuNzc1IDEyLjkwMy0xMi45MDMgMTIuOTAzdjI1LjgwN2M3LjEyOCAwIDEyLjkwMyA1Ljc3NyAxMi45MDMgMTIuOTAzdjM0OC4zODdoMjMyLjI1OFYxNTQuODM5SDU0MS45MzZ2OTAuMzIyeiIvPjxwYXRoIGQ9Ik03ODcuMDk3IDEyOS4wMzJIMTIuOTAzQzUuNzc3IDEyOS4wMzIgMCAxMzQuODEgMCAxNDEuOTM2djUxNi4xMjljMCA3LjEyNiA1Ljc3NyAxMi45MDMgMTIuOTAzIDEyLjkwM2g3NzQuMTkzYzcuMTI4IDAgMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDNWMTQxLjkzNmMuMDAxLTcuMTI2LTUuNzc0LTEyLjkwNC0xMi45MDItMTIuOTA0em0tMTIuOTA0IDUxNi4xMjlINTQxLjkzNlYyOTYuNzc0YzAtNy4xMjYtNS43NzUtMTIuOTAzLTEyLjkwMy0xMi45MDNzLTEyLjkwMyA1Ljc3Ny0xMi45MDMgMTIuOTAzdjM0OC4zODdIMjgzLjg3MVYxNTQuODM5aDIzMi4yNTh2OTAuMzIyYzAgNy4xMjYgNS43NzUgMTIuOTAzIDEyLjkwMyAxMi45MDNzMTIuOTAzLTUuNzc3IDEyLjkwMy0xMi45MDN2LTkwLjMyMmgyMzIuMjU4djQ5MC4zMjJ6TTI1LjgwNyAxNTQuODM5aDIzMi4yNTh2NDkwLjMyMkgyNS44MDdWMTU0LjgzOXoiLz48L3N2Zz4=");

/***/ }),

/***/ "yeFQ":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/5-ab2fcb95678e86e3304f52bbbd04b960.png";

/***/ }),

/***/ "yq4T":
/***/ (function(module, exports) {

module.exports = require("redux-saga-firebase");

/***/ }),

/***/ "ztzw":
/***/ (function(module, exports) {

module.exports = require("antd/lib/config-provider");

/***/ })

/******/ });