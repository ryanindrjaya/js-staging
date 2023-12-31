import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// In this scenario, we will look up for data in inventory details with params exp.date, productId, and LocationId
// if data is already exist, then we should update the stock inventory details with the exp.date
// if they are not, then we create a new inventory details

// It happens with master inventory too. So basicly, we gonna check first. If exist, then UPDATE.

const cookies = nookies.get(null, "token");

async function createInventory(row, user) {
  const data = [];

  notification.info({
    key: "loading",
    message: "Menambahkan produk ke gudang...",
    description: "Mohon tunggu sebentar dan jangan tutup halaman ini",
    icon: <LoadingOutlined className="text-blue-400" />,
  });

  const dataDetails = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/purchasings/${row.id}?populate=*,purchasing_details.product,purchasing_details.location`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.data?.attributes?.purchasing_details?.data)
    .catch((err) => {
      console.log("error", err);
      return [];
    });

  const noLPB = row.attributes.no_purchasing;
  const supplierName = row.attributes.supplier.data.attributes.name;

  dataDetails.forEach((element) => {
    console.log("element purchasing detail", element);

    const unitOrder = element.attributes.unit_order;
    const totalOrder = parseFloat(element.attributes.total_order);
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
      keterangan: `Pembelian dari ${supplierName}`,
      author: user,
    };

    const success = await addToGudang(body);

    return success;
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
      key: "loading",
      message: "Produk berhasil ditambahkan",
      description: "Produk berhasil ditambahkan ke gudang tujuan",
    });
    return true;
  } else {
    notification.error({
      key: "loading",
      message: "Error",
      description: data?.message,
    });
    return false;
  }
}

export default createInventory;
