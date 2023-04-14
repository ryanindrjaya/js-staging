import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details

// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.

const cookies = nookies.get(null, "token");

async function createInventory(row, locations) {
  const data = [];
  const saleDetails = row.attributes.panel_sale_details.data;
  const noSale = row.attributes.no_panel_sale;

  saleDetails.forEach((element) => {

    const unit = element.attributes.unit;
    const qty = parseFloat(element.attributes.qty);
    const product = element.attributes.product.data;
    const location = locations;
    const expDate = element.attributes.expired_date;
    //const batch = element.attributes.batch ?? null;

    //if (unitOrder && totalOrder && product && location) {
    if (unit && qty && product) {
      const item = {
        location: location.id,
        product: product.id,
        unit: unit,
        qty: qty,
        exp_date: expDate,
        //batch,
      };

      data.push(item);
      console.log("element detail", element, item, data);
    }
  });

  if (data.length > 0) {
    const body = {
      data,
      no_referensi: noSale,
      type: "Terjual",
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
  console.log("body", JSON.stringify(body));
  console.log("add to inventory", data);

  if (data?.status === "success") {
    notification.success({
      message: "Inventory Updated!",
      description: "Inventory barang berhasil diperbarui",
    });
  } else {
    notification.error({
      message: "Error",
      description: data?.message,
    });
  }
}

export default createInventory;
