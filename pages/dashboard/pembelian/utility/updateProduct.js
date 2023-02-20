import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempLocationId = [];
var tempImageId = [];
var tempInventoriesId = [];

const UpdateProduct = async (listValue, values) => {
  // CLEANING DATA
  var value = listValue.attributes;
  value.category = value.category.data.id;
  value.group = value.group.data.id;
  value.manufacture = value.manufacture.data.id;
  value.sub_category = value.sub_category.data.id;

  if(value.image.data != null) {
    value.image.data.forEach((element) => {
      if(element != null) tempImageId.push({ id: element.id });
      else tempImageId.push({ id: null });
    });
  } else { tempImageId.push(null); }

  value.inventories.data.forEach((element) => {
    tempInventoriesId.push({ id: element.id });
  });

  value.locations.data.forEach((element) => {
    tempLocationId.push({ id: element.id });
  });

  value.image = tempImageId;
  value.inventories = tempInventoriesId;
  value.locations = tempLocationId;

  if(values.unit == value.unit_1) value.buy_price_1 = values.priceUnit;
  else if(values.unit == value.unit_2) value.buy_price_2 = values.priceUnit;
  else if(values.unit == value.unit_3) value.buy_price_3 = values.priceUnit;
  else if(values.unit == value.unit_4) value.buy_price_4 = values.priceUnit;
  else if(values.unit == value.unit_5) value.buy_price_5 = values.priceUnit;

  var data = {
    data: value,
  };

  const JSONdata = JSON.stringify(data);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + listValue.id;
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
  //tempProductListId = [];
  tempLocationId = [];
  tempImageId = [];
  tempInventoriesId = [];
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
