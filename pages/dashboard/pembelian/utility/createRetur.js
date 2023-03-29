import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const CreateRetur = async (
  grandTotal,
  totalPrice,
  values,
  listId,
  form,
  router,
  lpbId
) => {
  // CLEANING DATA

  var supplierId = { id: parseInt(values.supplier_id) };

  tempSupplierId = parseInt(values.supplier_id);
  tempLocationId = parseInt(values.location);

  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  values.tanggal_retur = values.tanggal_retur;
  values.supplier_id = supplierId;
  grandTotal === 0 ? parseFloat(totalPrice) : parseFloat(grandTotal);
  values.retur_details = null;
  values.supplier_id = null;
  values.total_price = grandTotal;

  var data = {
    data: values,
  };

  await createData(data, form, router, lpbId);
};

const createData = async (data, form, router, lpbId) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs";
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
  const res = await req.json();

  console.log("res", res);

  if (req.status === 200) {
    await putRelationRetur(
      res.data.id,
      res.data.attributes,
      form,
      router,
      lpbId
    );
  } else {
    console.log("error here");
    openNotificationWithIcon("error");
  }
};

const putRelationRetur = async (id, value, form, router, lpbId) => {
  const user = await getUserMe();
  const dataRetur = {
    data: value,
  };

  dataRetur.data.supplier = { id: tempSupplierId };
  dataRetur.data.retur_details = tempProductListId;
  dataRetur.data.locations = { id: tempLocationId };
  dataRetur.data.purchasing = { id: lpbId };

  // clean object
  for (var key in dataRetur) {
    if (dataRetur[key] === null || dataRetur[key] === undefined) {
      delete dataRetur[key];
    }
  }

  const JSONdata = JSON.stringify(dataRetur);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs/" + id;
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
  console.log("reponse put relation retur", res);

  if (req.status === 200) {
    form.resetFields();
    router.replace("/dashboard/pembelian/retur");
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
        "Retur gagal ditambahkan 1. Silahkan cek NO Retur atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description:
        "Retur berhasil ditambahkan. Silahkan cek pada halaman Retur Pembelian",
    });
  }
};

export default CreateRetur;
