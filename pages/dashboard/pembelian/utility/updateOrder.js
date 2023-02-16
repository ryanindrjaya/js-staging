import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const UpdateOrder = async (values) => {
  // CLEANING DATA
  values.attributes.status = "Selesai";
  values.attributes.location = values.attributes.location.data.id;
  values.attributes.supplier = values.attributes.supplier.data.id;

  values.attributes.purchase_details.data.forEach((element) => {
    tempProductListId.push({ id: element.id });
  });

  values.attributes.purchase_details = tempProductListId;
    console.log("UpdateOrder", values)
  //var data = {
  //  data: values,
  //};

  //const req = await createData(data);
  //const res = await req.json();

  //const JSONdata = JSON.stringify(data);
  //const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + values.id;
  //const options = {
  //  method: "PUT",
  //  headers: {
  //    "Content-Type": "application/json",
  //    Authorization: "Bearer " + cookies.token,
  //  },
  //  body: JSONdata,
  //};

  //if (req.status === 200) {
  //  //await putRelationOrder(res.data.id, res.data.attributes, form, router);
  //} else {
  //  openNotificationWithIcon("error");
  //}
  tempProductListId = [];
};

//const createData = async (data) => {
//  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases";
//  const JSONdata = JSON.stringify(data);

//  const options = {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//    body: JSONdata,
//  };

//  const req = await fetch(endpoint, options);

//  return req;
//};

//const putRelationOrder = async (id, value, form, router) => {
//  const user = await getUserMe();
//  const dataOrder = {
//    data: value,
//  };

//  dataOrder.data.supplier = { id: tempSupplierId };
//  dataOrder.data.purchase_details = tempProductListId;
//  dataOrder.data.added_by = user.name;
//  dataOrder.data.locations = { id: tempLocationId };

//  // clean object
//  for (var key in dataOrder) {
//    if (dataOrder[key] === null || dataOrder[key] === undefined) {
//      delete dataOrder[key];
//    }
//  }

//  const JSONdata = JSON.stringify(dataOrder);
//  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchases/" + id;
//  const options = {
//    method: "PUT",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: "Bearer " + cookies.token,
//    },
//    body: JSONdata,
//  };

//  const req = await fetch(endpoint, options);
//  const res = await req.json();

//  if (req.status === 200) {
//    form.resetFields();
//    router.replace("/dashboard/pembelian/order_pembelian");
//    openNotificationWithIcon("success");
//  } else {
//    openNotificationWithIcon("error");
//  }
//};

const getUserMe = async () => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  return res;
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
