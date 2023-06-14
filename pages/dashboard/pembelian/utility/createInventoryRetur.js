import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details

// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.

const cookies = nookies.get(null, "token");

// fetch data from returs
const getReturDetails = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/returs/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const data = await response.json();

  console.log("data retur", data);

  return data;
};

async function createInventoryRetur(row) {
  const data = [];

  const retur = await getReturDetails(row.id);
  const returDetails = retur.data.attributes.retur_details.data;
  const noRetur = retur.data.attributes.no_retur;
  const supplier = retur.data.attributes.supplier.data.attributes.name;

  returDetails.forEach((element) => {
    console.log("element purchasing detail (retur)", element);

    const unitOrder = element.attributes.unit;
    const totalOrder = parseInt(element.attributes.qty);
    const product = element.attributes.products.data[0];
    const location = element.attributes.location.data;
    const expDate = element.attributes.expired_date;
    const batch = element.attributes.batch;

    if (unitOrder && totalOrder && product && location) {
      const item = {
        location: location.id,
        product: product.id,
        unit: unitOrder,
        qty: totalOrder,
        exp_date: expDate,
        batch,
      };

      data.push(item);
    }
  });

  if (data.length > 0) {
    const body = {
      data,
      no_referensi: noRetur,
      type: "Retur Pembelian",
      keterangan: `Retur Pembelian ke ${supplier}`,
    };

    await removeToGudang(body);
  }
}

async function removeToGudang(body) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/inventories/subtract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("body", JSON.stringify(body));
  console.log("add to inventory", data);

  if (data?.status === "success") {
    notification.success({
      message: "Produk Keluar",
      description: "Produk keluar dari gudang asal",
    });
  } else {
    notification.error({
      message: "Error",
      description: data?.message,
    });
  }
}

export default createInventoryRetur;
