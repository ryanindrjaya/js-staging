import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempLocationId = [];
var tempImageId = [];
var tempInventoriesId = [];

const UpdateProduct = async (values) => {
  // CLEANING DATA
  var value = values.attributes.product.data.attributes;
  value.category = value.category.data.id;
  value.group = value.group.data.id;
  value.manufacture = value.manufacture.data.id;
  value.sub_category = value.sub_category.data.id;

  value.image.data.forEach((element) => {
    tempImageId.push({ id: element.id });
  });

  value.inventories.data.forEach((element) => {
    tempInventoriesId.push({ id: element.id });
  });

  value.locations.data.forEach((element) => {
    tempLocationId.push({ id: element.id });
  });

  value.image = tempImageId;
  value.inventories = tempInventoriesId;
  value.locations = tempLocationId;

  if(values.attributes.unit_order == value.unit_1) value.buy_price_1 = values.attributes.unit_price;
  else if(values.attributes.unit_order == value.unit_2) value.buy_price_2 = values.attributes.unit_price;
  else if(values.attributes.unit_order == value.unit_3) value.buy_price_3 = values.attributes.unit_price;
  else if(values.attributes.unit_order == value.unit_4) value.buy_price_4 = values.attributes.unit_price;
  else if(values.attributes.unit_order == value.unit_5) value.buy_price_5 = values.attributes.unit_price;

  //values.attributes.status = "Selesai";
  //values.attributes.location = values.attributes.location.data.id;
  //values.attributes.supplier = values.attributes.supplier.data.id;
  //if (values.attributes.document.data == null){
  //values.attributes.document = null; }

  //values.attributes.purchase_details.data.forEach((element) => {
  //  tempProductListId.push({ id: element.id });
  //});

  //values.attributes.purchase_details = tempProductListId;

  var data = {
    data: values.attributes,
  };

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + values.id;
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
      description: "Harga product gagal diupdate.",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
        description: "Harga product berhasil diupdate. Silahkan cek pada halaman Product",
    });
  }
};

export default UpdateProduct;
