import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import {
  InventoryOutFromNonPanel,
  InventoryOutFromPanel,
  createInventoryFromReturPenjualan,
} from "../../../../library/functions/createInventory";
import updateJurnal from "./updateJurnal";

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
  updateStock,
  simpanData
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

  console.log("reqq", req);
  if (req.status === 200) {
    await putRelationSaleDetail(
      res.data.id,
      res.data.attributes,
      form,
      router,
      url,
      page,
      locations,
      updateStock,
      simpanData
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

const putRelationSaleDetail = async (id, value, form, router, url, page, locations, updateStock, simpanData) => {
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

  console.log("res update", res);

  console.log("simpan data", simpanData);

  const posted = simpanData !== "Draft";

  if (res?.data && posted && page !== "store sale") {
    const getData = await fetch(endpoint + "?populate=deep,3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    });
    const resData = await getData.json();
    console.log("res data", resData);
    const api = page?.split(" ").join("_");
    const customer =
      resData?.data?.attributes?.customer?.data?.attributes?.name ??
      resData?.data?.attributes?.[api]?.data?.attributes?.customer?.data?.attributes?.name ??
      resData?.data?.attributes?.customer_name;
    console.log("otw update stock");
    switch (page) {
      case "panel sale":
        console.log("panel sale");
        const inventoryOut = await InventoryOutFromPanel(res.data.id, customer, user);
        break;
      case "non panel sale":
        console.log("non panel sale");
        const inventoryOutNonPanel = await InventoryOutFromNonPanel(res.data.id, customer, user);
        break;
      case "retur panel sale":
        console.log("retur panel sale");
        const inventoryInReturPanel = await createInventoryFromReturPenjualan(
          res.data,
          customer,
          "retur panel sale",
          user
        );
        break;
      case "retur non panel sale":
        console.log("retur panel sale");
        const inventoryInReturNonPanel = await createInventoryFromReturPenjualan(
          res.data,
          customer,
          "retur non panel sale",
          user
        );
        break;
    }
  }

  if (req.status === 200) {
    form.resetFields();
    if (page == "store sale") router.replace(`/dashboard/penjualan/toko/print/${id}`);
    if (page == "retur store sale") router.replace(`/dashboard/penjualan/toko/retur/print/${id}`);
    if (page == "sales sale") router.replace(`/dashboard/penjualan/sales/print/${id}`);
    if (page == "retur sales sale") {
      updateJurnal(res.data, user, "retur", "retur sales");
      router.replace(`/dashboard/penjualan/sales`);
    }
    if (page == "non panel sale") {
      if (simpanData === "Publish") {
        //update jurnal dan coa
        updateJurnal(res.data, user, "penjualan", "non panel");
        router.replace(`/dashboard/penjualan/non_panel/print/${id}`);
      } else router.replace(`/dashboard/penjualan/non_panel`);
    }
    if (page == "retur non panel sale") {
      updateJurnal(res.data, user, "retur", "retur non panel");
      router.replace(`/dashboard/penjualan/non_panel`);
    }
    if (page == "panel sale") {
      if (simpanData === "Publish") {
        //update jurnal dan coa
        updateJurnal(res.data, user, "penjualan", "panel");
        router.replace(`/dashboard/penjualan/panel/print/${id}`);
      } else router.replace(`/dashboard/penjualan/panel`);
    }
    if (page == "retur panel sale") {
      updateJurnal(res.data, user, "retur", "retur panel");
      router.replace(`/dashboard/penjualan/panel`);
    }
    // simpanData === "Publish"
    //   ? router.replace(`/dashboard/penjualan/panel/print/${id}`)
    //   : router.replace(`/dashboard/penjualan/panel`);

    openNotificationWithIcon("success");
  } else {
    openNotificationWithIcon("error");
  }
};

const getUserMe = async () => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/users/me?populate=*";
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
      description: "Produk gagal ditambahkan. Silahkan cek NO Penjualan atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description: "Produk berhasil ditambahkan. Silahkan cek pada halaman Penjualan",
    });
  }
};

export default CreateSale;
