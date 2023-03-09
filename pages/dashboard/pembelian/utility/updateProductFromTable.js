import React from "react";
import nookies from "nookies";
import { notification } from "antd";

export async function updateProductFromTable(data) {
  //   console.log(data);

  const purchasingDetails = data?.attributes?.purchasing_details?.data;
  const promises = purchasingDetails.map((element) => {
    updateAPI(element);
  });

  try {
    await Promise.all(promises);
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

const updateAPI = async (element) => {
  try {
    const cookies = nookies.get(null, "token");

    const unit = element?.attributes?.unit_order;
    const unitPrice = element?.attributes?.unit_price;
    const disc = element?.attributes?.disc;

    const product = element?.attributes?.product?.data;
    const productData = product?.attributes;
    const productId = product?.id;

    if (unit === productData?.unit_1) {
      console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 1");
      productData.buy_price_1 = unitPrice;
      productData.purchase_discount_1 = disc;
    } else if (unit === productData?.unit_2) {
      console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 2");
      productData.buy_price_2 = unitPrice;
      productData.purchase_discount_2 = disc;
    } else if (unit === productData?.unit_3) {
      console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 3");
      productData.buy_price_3 = unitPrice;
      productData.purchase_discount_3 = disc;
    } else if (unit === productData?.unit_4) {
      console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 4");
      productData.buy_price_4 = unitPrice;
      productData.purchase_discount_4 = disc;
    } else if (unit === productData?.unit_5) {
      console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 5");
      productData.buy_price_5 = unitPrice;
      productData.purchase_discount_5 = disc;
    } else {
      console.log("cannot updated price & disc");
    }

    // clean object
    for (var key in productData) {
      if (productData[key] === null || productData[key] === undefined) {
        delete productData[key];
      }
    }
    delete productData?.image;
    delete productData?.sub_category;

    productData.category = { id: productData?.category?.data?.id };
    productData.manufacture = { id: productData?.manufacture?.data?.id };
    productData.group = { id: productData?.group?.data?.id };
    productData.locations = productData?.locations?.data;
    productData.inventories = productData.inventories?.data;

    const data = { data: productData };
    const JSONdata = JSON.stringify(data);
    const endpoint = process.env.NEXT_PUBLIC_URL + "/products/" + productId;
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
      openNotificationWithIcon("success");
    } else {
      openNotificationWithIcon("error");
    }
  } catch (error) {
    console.log(error);
  }
};

const openNotificationWithIcon = (type) => {
  if (type === "error") {
    notification[type]({
      message: "Gagal Memperbarui Katalog",
      description:
        "Katalog produk gagal diperbarui. Silahkan cek log untuk detail lebih lanjut",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Katalog Produk diperbarui!",
      description:
        "Katalog berhasil diperbarui. Silahkan cek pada halaman Produk",
    });
  }
};
