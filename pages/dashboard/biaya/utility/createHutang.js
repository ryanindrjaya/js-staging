import React from "react";
import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;

const CreateHutang = async (
  sisaHutang,
  values,
  listId,
  form,
  router,
  url,
  page,
  //locations
) => {
  // CLEANING DATA
  listId.forEach((element) => { console.log("el", element)
    tempProductListId.push({ id: element });
  }); console.log("tempProductListId", tempProductListId)

  values.status = "Dibayar";

  values.bayar1 = parseInt( values.bayar1 );
  values.bayar2 = parseInt( values.bayar2 );
  values.bayar3 = parseInt( values.bayar3 );
  values.bayar4 = parseInt( values.bayar4 );
  values.bayar5 = parseInt( values.bayar5 );

  values.total_pembayaran = values.total_hutang_jatuh_tempo - values.sisa_hutang_jatuh_tempo;

  var data = {
    data: values,
  };

  const req = await createData(data, url);
  const res = await req.json();

  if (req.status === 200) {
    await putRelationDetail(res.data.id, res.data.attributes, form, router, url, page);
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

const putRelationDetail = async (id, value, form, router, url, page) => {
  const user = await getUserMe();
  const data = {
    data: value,
  };

  //dataSale.data.store_sale_details = tempProductListId;
  //dataSale.data.retur_store_sale_details = tempProductListId;

  //dataSale.data.sales_sale_details = tempProductListId;
  //dataSale.data.retur_sales_sale_details = tempProductListId;

  //dataSale.data.non_panel_sale_details = tempProductListId;
  //dataSale.data.retur_non_panel_sale_details = tempProductListId;

  //dataSale.data.panel_sale_details = tempProductListId;
  //dataSale.data.retur_panel_sale_details = tempProductListId;

  data.data.debt_details = tempProductListId;

  // clean object
  for (var key in data) {
    if (data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  }

  const JSONdata = JSON.stringify(data);
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
    //if(page == "store sale") router.replace("/dashboard/penjualan/toko");
    //if(page == "sales sale") router.replace("/dashboard/penjualan/sales");
    //if(page == "non panel sale") router.replace("/dashboard/penjualan/non_panel");
    //if(page == "panel sale") router.replace("/dashboard/penjualan/panel");
    router.replace("/dashboard/biaya/hutang");
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
        "Data lpb yg dipilih gagal ditambahkan. Silahkan cek NO hutang atau kelengkapan data lainnya",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Berhasil menambahkan data",
      description:
        "Data lpb yg dipilih berhasil ditambahkan. Silahkan cek pada halaman Hutang",
    });
  }
};

export default CreateHutang;
