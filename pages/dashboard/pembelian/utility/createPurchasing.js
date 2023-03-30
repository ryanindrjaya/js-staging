import React from "react";
import nookies from "nookies";
import { notification } from "antd";
import * as moment from "moment";

const cookies = nookies.get(null, "token");

const CreateOrder = async (
  products,
  grandTotal,
  totalPrice,
  values,
  listId,
  discPrice,
  form,
  router,
  updateOrderData
) => {
  // CLEANING DATA
  var date = new Date(values.order_date);
  var newDate = moment
    .utc(date)
    .utcOffset(7 * 60)
    .format();
  var orderDate = newDate;

  const supplier = products?.preorderData?.data?.attributes?.supplier?.data;
  const location = products?.preorderData?.data?.attributes?.location?.data;
  var tempProductListId = [];

  listId.forEach((element) => {
    tempProductListId.push({ id: element });
  });

  var supplierId = {
    id: parseInt(
      Number.isNaN(parseInt(values?.supplier_id))
        ? supplier?.id
        : values?.supplier_id
    ),
  };

  var locationId = {
    id: parseInt(
      Number.isNaN(parseInt(values?.location)) ? location?.id : values?.location
    ),
  };

  var purchaseOrderId = values?.no_po ? { id: values?.no_po } : null;

  // only in purchasing
  delete values?.delivery_date;
  delete values?.order_date;
  delete values?.products;

  values.price_after_disc = parseInt(discPrice);
  values.tempo_days = String(values?.tempo_days);
  values.purchasing_details = tempProductListId;
  values.purchase = purchaseOrderId;
  values.location = locationId;
  values.supplier_id = supplierId;
  values.date_purchasing = orderDate;
  values.supplier_id = supplierId;
  values.status_pembayaran = "Belum Lunas";
  values.total_purchasing =
    grandTotal === 0 ? parseInt(totalPrice) : parseInt(grandTotal);
  values.DPP_active = values?.DPP_active === true ? "DPP" : null;

  var data = {
    data: values,
  };

  console.log("data", data);

  const req = await createData(data);
  const res = await req.json();

  console.log("create LPB =>", res);

  if (req.status === 200) {
    await putRelationOrder(
      res.data.id,
      res.data.attributes,
      values,
      form,
      router,
      updateOrderData
    );
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings";
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

const putRelationOrder = async (
  id,
  value,
  values,
  form,
  router,
  updateOrderData
) => {
  const user = await getUserMe();
  const dataOrder = {
    data: value,
  };

  dataOrder.data.supplier = {
    id: values.supplier_id.id,
  };
  dataOrder.data.purchasing_details = values.purchasing_details;
  dataOrder.data.added_by = user.name;
  dataOrder.data.locations = values.location;

  // clean object
  for (var key in dataOrder.data) {
    if (dataOrder.data[key] === null || dataOrder.data[key] === undefined) {
      delete dataOrder[key];
    }
  }

  const JSONdata = JSON.stringify(dataOrder);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings/" + id;
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

  console.log(res);

  if (req.status === 200) {
    form.resetFields();
    router.replace("/dashboard/pembelian/pembelian_barang");
    openNotificationWithIcon("success");
    updateOrderData(res.data?.id);
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

export default CreateOrder;
