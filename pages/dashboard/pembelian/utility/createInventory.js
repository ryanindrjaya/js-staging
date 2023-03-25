import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details

// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.

const cookies = nookies.get(null, "token");

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

  for (let index = productIndex; index < 6; index++) {
    console.log("index", index);
    total = total * product.attributes[`qty_${index}`];

    if (total === 0) {
      total = 1;
    }
  }

  console.log("total", total);

  return { total, productSmallestUnit };
};

function createInventory(data) {
  const purchasingDetails = data.attributes.purchasing_details.data;

  purchasingDetails.forEach((element) => {
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
        products: { id: product.id },
        stock: totalQty,
        smallest_unit: result.productSmallestUnit,
        locations: { id: location.id },
        keterangan: "Pembelian",
      },
    };

    // check existing stock
    checkDetailStock(data, product.id, location.id);
    //
  });
}

const checkDetailStock = async (data, productId, locationId) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/inventory-details?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&filters[expired_date][$eq]=2024-10-01&populate=*`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
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

  const newData = { data: resData.attributes };
  const JSONdata = JSON.stringify(newData);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventory-details/" + resData.id;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    createInventoryAPI(locationId, productId, data.data.stock, data);
  }
};

const createAPI = async (data, productId, locationId) => {
  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventory-details";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (req.status === 200) {
    // check data location
    createInventoryAPI(locationId, productId, data.data.stock, data, res?.data?.id);
  }
};

const createInventoryHistory = async (data) => {
  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventory-histories";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();
};

// ======================= MASTER INVENTORY =======================
const createInventoryAPI = async (locationId, productId, quantity, data, detailData) => {
  const endpoint =
    process.env.NEXT_PUBLIC_URL +
    `/inventories?filters[locations][id][$eq]=${locationId}&filters[products][id][$eq]=${productId}&populate=*`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };
  const req = await fetch(endpoint, options);
  const res = await req.json();

  if (res.data.length > 0) {
    const detailsId =
      res.data[0].attributes?.inventory_details?.data?.map((item) => item?.id) || [];
    if (!detailsId.includes(detailData)) {
      detailsId.push(detailData);
    }

    console.log("detailsId", detailsId);

    // put existing data
    const totalStock = res.data[0].attributes.total_stock + quantity;
    await putExistingData(res.data[0].id, res.data[0].attributes, totalStock, detailsId);
  } else {
    // create new data
    await createNewData(data, locationId, detailData);
  }
};

const putExistingData = async (id, data, totalStock, detailData) => {
  data.total_stock = totalStock;
  data.locations = {
    id: data.locations.data[0].id,
  };
  data.products = {
    id: data.products.data[0].id,
  };
  data.inventory_details = detailData;

  const putData = { data: data };

  const JSONdata = JSON.stringify(putData);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories/" + id;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
};

const createNewData = async (data, locationId, detailData) => {
  data.data.total_stock = data.data.stock;
  data.data.locations = { id: locationId };
  data.data.inventory_details = [detailData];

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/inventories";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  //   const res = await req.json();
};

const getUserLocation = async (cookies) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  return res;
};

export default createInventory;
