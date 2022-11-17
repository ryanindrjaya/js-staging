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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Ua3+");


/***/ }),

/***/ "Gss8":
/***/ (function(module, exports) {

module.exports = require("antd/lib/notification");

/***/ }),

/***/ "Ua3+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Gss8");
/* harmony import */ var antd_lib_notification__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_notification__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);




const cookies = nookies__WEBPACK_IMPORTED_MODULE_2___default.a.get(null, "token");

const CreateOrder = async (products, grandTotal, totalPrice, values, listId, discPrice, form, router) => {
  // CLEANING DATA
  var date = new Date(values.order_date);
  var newDate = moment__WEBPACK_IMPORTED_MODULE_3__["utc"](date).utcOffset(7 * 60).format();
  var orderDate = newDate;
  const supplier = products.preorderData.data.attributes.supplier.data;
  const location = products.preorderData.data.attributes.location.data;
  var tempProductListId = [];
  listId.forEach(element => {
    tempProductListId.push({
      id: element
    });
  });
  var supplierId = {
    id: parseInt(Number.isNaN(parseInt(values.supplier_id)) ? supplier.id : values.supplier_id)
  };
  var locationId = {
    id: parseInt(Number.isNaN(parseInt(values.location)) ? location.id : values.location)
  };
  var purchaseOrderId = {
    id: values.no_po
  }; // only in purchasing

  delete values.delivery_date;
  delete values.order_date;
  delete values.products;
  values.price_after_disc = parseInt(discPrice);
  values.tempo_days = String(values.tempo_days);
  values.purchasing_details = tempProductListId;
  values.purchase = purchaseOrderId;
  values.location = locationId;
  values.supplier_id = supplierId;
  values.date_purchasing = orderDate;
  values.supplier_id = supplierId;
  values.status_pembayaran = "Belum Lunas";
  values.total_purchasing = grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
  var data = {
    data: values
  };
  const req = await createData(data);
  const res = await req.json();

  if (req.status === 200) {
    await putRelationOrder(res.data.id, res.data.attributes, values, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async data => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/purchasings";
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

const putRelationOrder = async (id, value, values, form, router) => {
  const user = await getUserMe();
  const dataOrder = {
    data: value
  };
  dataOrder.data.supplier = {
    id: values.supplier_id.id
  };
  dataOrder.data.purchasing_details = values.purchasing_details;
  dataOrder.data.added_by = user.name;
  dataOrder.data.locations = values.location; // clean object

  for (var key in dataOrder.data) {
    if (dataOrder.data[key] === null || dataOrder.data[key] === undefined) {
      delete dataOrder[key];
    }
  }

  const JSONdata = JSON.stringify(dataOrder);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/purchasings/" + id;
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
    router.replace("/dashboard/pembelian/pembelian_barang");
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