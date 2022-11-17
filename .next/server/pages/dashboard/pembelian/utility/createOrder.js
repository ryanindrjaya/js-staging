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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lFzN");


/***/ }),

/***/ "Gss8":
/***/ (function(module, exports) {

module.exports = require("antd/lib/notification");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "lFzN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Gss8");
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_notification__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);



const cookies = nookies__WEBPACK_IMPORTED_MODULE_2___default.a.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const CreateOrder = async (grandTotal, totalPrice, values, listId, form, router) => {
  // CLEANING DATA
  var orderDate = new Date(values.order_date);
  var deliveryDate = new Date(values.delivery_date);
  var supplierId = {
    id: parseInt(values.supplier_id)
  };
  tempSupplierId = parseInt(values.supplier_id);
  tempLocationId = parseInt(values.location);
  listId.forEach(element => {
    tempProductListId.push({
      id: element
    });
  });
  values.order_date = orderDate;
  values.delivery_date = deliveryDate;
  values.supplier_id = supplierId;
  values.status = "Dipesan";
  values.delivery_total = grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
  values.purchase_details = null;
  values.supplier_id = null;
  var data = {
    data: values
  };
  const req = await createData(data);
  const res = await req.json();

  if (req.status === 200) {
    await putRelationOrder(res.data.id, res.data.attributes, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async data => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/purchases";
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
  return req;
};

const putRelationOrder = async (id, value, form, router) => {
  const user = await getUserMe();
  const dataOrder = {
    data: value
  };
  dataOrder.data.supplier = {
    id: tempSupplierId
  };
  dataOrder.data.purchase_details = tempProductListId;
  dataOrder.data.added_by = user.name;
  dataOrder.data.locations = {
    id: tempLocationId
  }; // clean object

  for (var key in dataOrder) {
    if (dataOrder[key] === null || dataOrder[key] === undefined) {
      delete dataOrder[key];
    }
  }

  const JSONdata = JSON.stringify(dataOrder);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/purchases/" + id;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    },
    body: JSONdata
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    form.resetFields();
    router.replace("/dashboard/pembelian/order_pembelian");
    openNotificationWithIcon("success");
  } else {
    openNotificationWithIcon("error");
  }
};

const getUserMe = async () => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/users/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    }
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();
  return res;
};

const openNotificationWithIcon = type => {
  if (type === "error") {
    antd_lib_notification__WEBPACK_IMPORTED_MODULE_0___default.a[type]({
      message: "Gagal menambahkan data",
      description: "Produk gagal ditambahkan. Silahkan cek NO PO atau kelengkapan data lainnya"
    });
  } else if (type === "success") {
    antd_lib_notification__WEBPACK_IMPORTED_MODULE_0___default.a[type]({
      message: "Berhasil menambahkan data",
      description: "Produk berhasil ditambahkan. Silahkan cek pada halaman Pembelian Barang"
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (CreateOrder);

/***/ })

/******/ });