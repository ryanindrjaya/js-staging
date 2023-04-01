import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details

// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.

const cookies = nookies.get(null, "token");

async function createInventory(row) {
  const data = [];
  const purchasingDetails = row.attributes.purchasing_details.data;
  const noLPB = row.attributes.no_purchasing;

  purchasingDetails.forEach((element) => {
    console.log("element purchasing detail", element);

    const unitOrder = element.attributes.unit_order;
    const totalOrder = parseInt(element.attributes.total_order);
    const product = element.attributes.product.data;
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
      no_referensi: noLPB,
      type: "Pembelian",
    };

    await addToGudang(body);
  }
}

async function addToGudang(body) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/inventories/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log("add to inventory", data);

  if (data?.status === "success") {
    notification.success({
      message: "Produk berhasil ditambahkan",
      description: "Produk berhasil ditambahkan ke gudang tujuan",
    });
  } else {
    notification.error({
      message: "Error",
      description: data?.message,
    });
  }
}

export default createInventory;
