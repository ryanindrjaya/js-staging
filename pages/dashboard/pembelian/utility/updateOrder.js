import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];

const UpdateOrder = async (values, status) => {
  // CLEANING DATA
  if(status == "Selesai") values.attributes.status = "Selesai";
  else values.attributes.status = "Sebagian Diterima";

  values.attributes.location = values.attributes.location.data.id;
  values.attributes.supplier = values.attributes.supplier.data.id;
  if (values.attributes.document.data == null){
  values.attributes.document = null; }

  values.attributes.purchase_details.data.forEach((element) => {
    tempProductListId.push({ id: element.id });
  });

  values.attributes.purchase_details = tempProductListId;

  var data = {
    data: values.attributes,
  };

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + values.id;
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
    openNotificationWithIcon("success");
  } else {
    openNotificationWithIcon("error");
  }
  tempProductListId = [];
};

const openNotificationWithIcon = (type) => {
  if (type === "error") {
    notification[type]({
      message: "Gagal menambahkan data",
      description: "Status order pembelian gagal diupdate. Silahkan cek kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description: "Status order pembelian berhasil diupdate. Silahkan cek pada halaman Order Pembelian",
    });
  }
};

export default UpdateOrder;
