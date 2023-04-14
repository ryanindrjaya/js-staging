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
  console.log('this is date', values)
  var newDate = moment
    .utc(date)
    .utcOffset(7 * 60)
    .format();
  var orderDate = newDate;

  const supplier = products?.preorderData?.data?.attributes?.supplier?.data;
  const location = products?.preorderData?.data?.attributes?.location?.data;
  var tempProductListId = [];

  listId.forEach((element) => {
    tempProductListId.push(element);
  });
  var supplierId = parseInt(
    Number.isNaN(parseInt(values?.supplier_id)) ? supplier?.id : values?.supplier_id
  );

  var locationId = parseInt(
    Number.isNaN(parseInt(values?.location)) ? location?.id : values?.location
  );


  // only in purchasing
  delete values?.delivery_date;
  delete values?.products;

  values.price_after_disc = parseFloat(discPrice);
  values.tempo_days = String(values?.tempo_days);
  values.purchasing_details = tempProductListId;
  values.purchase = parseInt(values?.no_po);
  values.location = locationId;

  values.date_purchasing = orderDate;
  values.status_pembayaran = "Belum Lunas";
  values.total_purchasing =
    grandTotal === 0 ? parseFloat(totalPrice) : parseFloat(grandTotal);

  values.DPP_active = values?.DPP_active === true ? "DPP" : null;
  values.returs = [];

  // delete every values on null or undefined value using for
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined) {
      delete values[key];
    }
  }

  var data = {
    data: values,
  };


  // get user creator
  const user = await getUserMe();

  data.data.supplier = supplierId;
  data.data.added_by = user.name;


  const req = await createData(data);
  const res = await req.json();

  console.log("create LPB =>", res);

  if (req.status === 200) {
    form.resetFields();
    router.replace("/dashboard/pembelian/pembelian_barang");
    openNotificationWithIcon("success");
    updateOrderData(res.data?.id);
  } else {
    console.log("error lpb", res);
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/purchasings";
  const JSONdata = JSON.stringify(data);
  console.log("jsondata", JSONdata);
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
        "Produk gagal ditambahkan 2. Silahkan cek NO PO atau kelengkapan data lainnya",

    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description: "Produk berhasil ditambahkan. Silahkan cek pada halaman Pembelian Barang",
    });
  }
};

export default CreateOrder;
