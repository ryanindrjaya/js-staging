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
  router
) => {
  // CLEANING DATA
  //var returDate = new Date(values.tanggal_retur); //console.log("nilai"); console.log(values); //console.log(values.tanggal_retur._d)
  //var deliveryReturDate = new Date(values.delivery_date);
  var supplierId = { id: parseInt(values.supplier_id) };

  tempSupplierId = parseInt(values.supplier_id);
  tempLocationId = parseInt(values.location);

  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  values.tanggal_retur = values.tanggal_retur;
  values.tanggal_pembelian = values.tanggal_retur;
  //values.delivery_date = deliveryReturDate;
  values.supplier_id = supplierId;
  //values.status = "Dipesan";
  //values.delivery_total =
  values.no_nota_supplier = "kosong";
    grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
  values.retur_details = null;
  values.supplier_id = null;

  var data = {
    data: values,
  };
    
  const req = await createData(data); 
  const res = await req.json();
    console.log("ini data 1 : "); console.log(data); console.log(req);
  if (req.status === 200) {
    await putRelationRetur(res.data.id, res.data.attributes, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/returs";
    const JSONdata = JSON.stringify(data);
    console.log("ini data "); console.log(data)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  //const res = await req.json(); console.log(res)
  return req;
};

const putRelationRetur = async (id, value, form, router) => {
  const user = await getUserMe(); console.log("masuk put relation")
  const dataRetur = {
    data: value,
  };

  dataRetur.data.supplier = { id: tempSupplierId };
  dataRetur.data.retur_details = tempProductListId;
  //dataRetur.data.added_by = user.name;
  dataRetur.data.locations = { id: tempLocationId };

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
        "Retur gagal ditambahkan. Silahkan cek NO Retur atau kelengkapan data lainnya",
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
