import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const CreateSale = async (
  grandTotal,
  totalPrice,
  values,
  listId,
  form,
  router,
  url,
  page,
  locations,
  updateStock
) => {
  tempProductListId = [];

  console.log("CREATE SELL DATA");

  // CLEANING DATA
  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  values.total = grandTotal;

  values.status = "Belum Dibayar";
  values.purchasing_payments = null;

  var data = {
    data: values,
  };

  console.log("test data create sales", data);

  const req = await createData(data, url);
  const res = await req.json();

  if (req.status === 200) {
    await putRelationSaleDetail(
      res.data.id,
      res.data.attributes,
      form,
      router,
      url,
      page,
      locations,
      updateStock
    );
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data, url) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + url;
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

const putRelationSaleDetail = async (
  id,
  value,
  form,
  router,
  url,
  page,
  locations,
  updateStock
) => {
  const user = await getUserMe();
  const dataSale = {
    data: value,
  };

  dataSale.data.store_sale_details = tempProductListId;
  dataSale.data.retur_store_sale_details = tempProductListId;

  dataSale.data.sales_sale_details = tempProductListId;
  dataSale.data.retur_sales_sale_details = tempProductListId;

  dataSale.data.non_panel_sale_details = tempProductListId;
  dataSale.data.retur_non_panel_sale_details = tempProductListId;

  dataSale.data.panel_sale_details = tempProductListId;
  dataSale.data.retur_panel_sale_details = tempProductListId;

  // clean object
  for (var key in dataSale) {
    if (dataSale[key] === null || dataSale[key] === undefined) {
      delete dataSale[key];
    }
  }

  const JSONdata = JSON.stringify(dataSale);
  const endpoint = process.env.NEXT_PUBLIC_URL + url + id;
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
    if (page == "store sale") router.replace("/dashboard/penjualan/toko");
    if (page == "sales sale") router.replace("/dashboard/penjualan/sales");
    if (page == "non panel sale")
      router.replace("/dashboard/penjualan/non_panel");
    if (page == "panel sale") router.replace("/dashboard/penjualan/panel");
    openNotificationWithIcon("success");
    if (updateStock) {
      updateStock(res.data.id, locations);
    }
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
        "Produk berhasil ditambahkan. Silahkan cek pada halaman Pembelian Barang",
    });
  }
};

export default CreateSale;
