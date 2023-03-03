import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const CreateOrderSale = async (
  values,
  listId,
  form,
  router
) => {
  // CLEANING DATA
  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  values.status = "Diproses"
  values.purchasing_payments = null;

  var data = {
    data: values,
  };

  const req = await createData(data);
  const res = await req.json();

  if (req.status === 200) { 
    await putRelationSaleDetail(res.data.id, res.data.attributes, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells";
  const JSONdata = JSON.stringify(data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);

  return req;
};

const putRelationSaleDetail = async (id, value, form, router) => {
  const user = await getUserMe();
  const dataSale = {
    data: value,
  };

  dataSale.data.sales_sell_details = tempProductListId;

  // clean object
  for (var key in dataSale) {
    if (dataSale[key] === null || dataSale[key] === undefined) {
      delete dataSale[key];
    }
  }

  const JSONdata = JSON.stringify(dataSale);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/sales-sells/" + id;
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
    form.resetFields();
    router.replace("/dashboard/penjualan/pesanansales");
    openNotificationWithIcon("success");
  } else {
    openNotificationWithIcon("error");
  }
};

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
      description:
        "Produk gagal ditambahkan. Silahkan cek NO Penjualan atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description:
        "Data berhasil ditambahkan. Silahkan cek pada halaman Pesanan Penjualan Sales",
    });
  }
};

export default CreateOrderSale;
