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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("85bS");


/***/ }),

/***/ "85bS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details
// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.
const cookies = nookies__WEBPACK_IMPORTED_MODULE_1___default.a.get(null, "token");

const calculateTotalUnit = (unit, product) => {
  var total = 1;
  var productIndex = 0;
  var productSmallestUnit = "";

  for (let index = 1; index < 6; index++) {
    if (product.attributes[`unit_${index}`] === unit) {
      productIndex = index;
    }

    if (product.attributes[`unit_${index}`]) {
      productSmallestUnit = product.attributes[`unit_${index}`];
    }
  }

  for (let index = productIndex + 1; index < 6; index++) {
    total = total * product.attributes[`qty_${index}`];

    if (total === 0) {
      total = 1;
    }
  }

  return {
    total,
    productSmallestUnit
  };
};

function createInventory(data) {
  const purchasingDetails = data.attributes.purchasing_details.data;
  purchasingDetails.forEach(element => {
    const expiredDate = new Date(element.attributes.expired_date);
    const batch = element.attributes.batch;
    const unitOrder = element.attributes.unit_order;
    const totalOrder = parseInt(element.attributes.total_order);
    const product = element.attributes.product.data;
    const result = calculateTotalUnit(unitOrder, product);
    const totalQty = result.total * totalOrder;
    const location = element.attributes.location.data;
    const data = {
      data: {
        expired_date: expiredDate,
        batch: batch,
        products: {
          id: product.id
        },
        stock: totalQty,
        smallest_unit: result.productSmallestUnit,
        locations: {
          id: location.id
        },
        keterangan: "Pembelian"
      }
    }; // check existing stock

    checkDetailStock(data, product.id, location.id); //
  });
}

const checkDetailStock = async (data, productId, locationId) => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + `/inventory-details?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&filters[expired_date][$eq]=2024-10-01&populate=*`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    }
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (res.data.length > 0) {
    updateAPI(res.data[0], data, productId, locationId);
  } else {
    createAPI(data, productId, locationId);
  }

  createInventoryHistory(data);
};

const updateAPI = async (resData, data, productId, locationId) => {
  var currentStock = resData.attributes.stock;
  var finalStock = currentStock + data.data.stock;
  resData.attributes.stock = finalStock;
  resData.attributes.locations = data.data.locations;
  resData.attributes.products = data.data.products;
  const newData = {
    data: resData.attributes
  };
  const JSONdata = JSON.stringify(newData);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/inventory-details/" + resData.id;
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
    createInventoryAPI(locationId, productId, data.data.stock, data);
  }
};

const createAPI = async (data, productId, locationId) => {
  const JSONdata = JSON.stringify(data);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/inventory-details";
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

  if (req.status === 200) {
    // check data location
    createInventoryAPI(locationId, productId, data.data.stock, data);
  }
};

const createInventoryHistory = async data => {
  const JSONdata = JSON.stringify(data);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/inventory-histories";
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
}; // ======================= MASTER INVENTORY =======================


const createInventoryAPI = async (locationId, productId, quantity, data) => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + `/inventories?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&populate=locations`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    }
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (res.data.length > 0) {
    // put existing data
    const totalStock = res.data[0].attributes.total_stock + quantity;
    await putExistingData(res.data[0].id, res.data[0].attributes, totalStock);
  } else {
    // create new data
    await createNewData(data, locationId);
  }
};

const putExistingData = async (id, data, totalStock) => {
  data.total_stock = totalStock;
  data.locations = {
    id: data.locations.data[0].id
  };
  const putData = {
    data: data
  };
  const JSONdata = JSON.stringify(putData);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/inventories/" + id;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    },
    body: JSONdata
  };
  const req = await fetch(endpoint, options);
};

const createNewData = async (data, locationId) => {
  data.data.total_stock = data.data.stock;
  data.data.locations = {
    id: locationId
  };
  const JSONdata = JSON.stringify(data);
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/inventories";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    },
    body: JSONdata
  };
  const req = await fetch(endpoint, options); //   const res = await req.json();
};

const getUserLocation = async cookies => {
  const endpoint = "https://strapi-js.keelola.web.id/api" + "/users/me?populate=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token
    },
    body: JSONdata
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();
  return res;
};

/* harmony default export */ __webpack_exports__["default"] = (createInventory);

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