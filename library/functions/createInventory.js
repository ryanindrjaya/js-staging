import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

const cookies = nookies.get(null, "token");

const getStoreSale = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/store-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getStoreRetur = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/retur-store-sales/${id}?populate=deep`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export async function createInventoryFromPenjualan(row) {
  const data = [];

  //   console.log("row", row);
  const storeSale = await getStoreSale(row.id);
  const store_sale_details = storeSale.data.attributes.store_sale_details.data;
  const storeLocation = storeSale.data.attributes.location.data;
  const no_store_sale = storeSale.data.attributes.no_store_sale;

  store_sale_details.forEach((element) => {
    console.log("element store detail (penjualan)", element);
    const unitOrder = element.attributes.unit;
    const totalOrder = parseFloat(element.attributes.qty);
    const product = element.attributes.product.data;
    const expDate = element.attributes.expired_date;
    const batch = element.attributes?.batch ?? "";

    if (unitOrder && totalOrder && product && location) {
      const item = {
        location: storeLocation.id,
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
      no_referensi: no_store_sale,
      type: "Terjual",
    };

    await addToGudang(body);
  }
}

export async function createInventoryFromReturPenjualan(row) {
  const data = [];

  const returStoreSale = await getStoreRetur(row.id);
  console.log("returStoreSale", returStoreSale);
  const retur_store_sale_details = returStoreSale.data.attributes.retur_store_sale_details.data;
  const no_retur_store_sale = returStoreSale.data.attributes.no_retur_store_sale;


  retur_store_sale_details.forEach((element) => {
    console.log("element store detail (penjualan)", element);
    const unitOrder = element.attributes.unit;
    const totalOrder = parseInt(element.attributes.qty);
    const location = element.attributes.location.data;
    const product = element.attributes.product.data;
    const expDate = element.attributes.expired_date;
    const batch = element.attributes?.batch ?? "";

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
      no_referensi: no_retur_store_sale,
      type: "Retur Penjualan",
    };

    await addToGudang(body);
  }
}

async function addToGudang(body) {
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

// export default createInventoryRetur;
