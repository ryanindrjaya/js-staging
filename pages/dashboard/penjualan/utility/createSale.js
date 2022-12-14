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
  router
) => { console.log("form and values :",form,values, listId)
  // CLEANING DATA
  //var orderDate = new Date(values.order_date);
  //var deliveryDate = new Date(values.delivery_date);
  //var supplierId = { id: parseInt(values.supplier_id) };

  //tempSupplierId = parseInt(values.supplier_id);
  //tempLocationId = parseInt(values.location);
  //tempProductListId = [];

  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  //values.order_date = orderDate;
  //values.delivery_date = deliveryDate;
  //values.supplier_id = supplierId;
  //values.status = "Dipesan";
  //values.delivery_total =
  //  grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
  //values.purchase_details = null;
  //values.supplier_id = null;

  var data = {
    data: values,
  };

  const req = await createData(data);
  const res = await req.json();

  if (req.status === 200) { console.log("values nich bro:",res.data.attributes)
    await putRelationSaleDetail(res.data.id, res.data.attributes, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales";
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
    console.log("data sale :",dataSale);
  //dataSale.data.supplier = { id: tempSupplierId };
  dataSale.data.store_sale_detail = tempProductListId;
  //dataSale.data.added_by = user.name;
  //dataSale.data.locations = { id: tempLocationId };

  // clean object
  for (var key in dataSale) {
    if (dataSale[key] === null || dataSale[key] === undefined) {
      delete dataSale[key];
    }
  }

  const JSONdata = JSON.stringify(dataSale);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/store-sales/" + id;
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
    router.replace("/dashboard/penjualan/toko");
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
        "Produk gagal ditambahkan. Silahkan cek NO PO atau kelengkapan data lainnya",
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
