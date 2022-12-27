import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");
var tempProductListId = [];
var tempSupplierId = 0;
var tempLocationId;
var tempListId = [];

const CreateReturLPB = async (
  grandTotal,
  totalPrice,
  values,
  listId,
  form,
  router,
  dataLPB,
  setListLPBdetail
) => {
  // CLEANING DATA
  tempProductListId = []; console.log("masuk put relation", tempProductListId)

    console.log("Masuk LPB"); console.log(values); console.log(dataLPB); 

  listId.forEach((element) => { console.log("masuk put listid", listId)
    tempProductListId.push({ id: element });
  });

  var data = { 
    data: values,
  };
    
  const req = await createData(data); 
  const res = await req.json();
    console.log("ini data 1 : "); console.log(res);
  if (req.status === 200) {
    //putStatus(values.purchasing, dataLPB, tempListId);
    await putRelationReturLPB(res.data.id, res.data.attributes, form, router);
  } else {
    openNotificationWithIcon("error");
  }
};

const createData = async (data) => {
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs";
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
  //const res = await req.json();
  return req;
};

const putStatus = async (id, value, listdetail) => {
    const dataLPB = {
        data: value.attributes,
    };

    dataLPB.data.status = "Diretur";
    dataLPB.data.supplier = dataLPB.data.supplier.data.id;
    dataLPB.data.location = dataLPB.data.location.data.id;
    var listLPBdetailId = dataLPB.attributes.purchasing_details.data;

    const JSONdata = JSON.stringify(dataLPB);
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
    //const res = await req.json();

    if (req.status === 200) {
        listLPBdetailId.forEach((element) => {
            //listLPBdetail.push(element.id);
            console.log("creat nih : "); console.log(element);
        });
        //tempListId.push(?.id);
    } else {
        openNotificationWithIcon("error");
    }
};

const putRelationReturLPB = async (id, value, form, router) => {
  const user = await getUserMe(); 
  const dataRetur = {
    data: value,
  };

  dataRetur.data.retur_lpb_details = tempProductListId;

  // clean object
  for (var key in dataRetur) {
    if (dataRetur[key] === null || dataRetur[key] === undefined) {
      delete dataRetur[key];
    }
  }

  const JSONdata = JSON.stringify(dataRetur);
  const endpoint = process.env.NEXT_PUBLIC_URL + "/retur-lpbs/" + id;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
    body: JSONdata,
  };

  const req = await fetch(endpoint, options);
  //const res = await req.json();

  if (req.status === 200) { console.log("req status :"); console.log(req);
    form.resetFields();
    router.replace("/dashboard/pembelian/pembelian_barang");
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

export default CreateReturLPB;
