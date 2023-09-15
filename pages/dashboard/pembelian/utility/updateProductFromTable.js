import nookies from "nookies";
import { notification } from "antd";

const cookies = nookies.get(null, "token");

const updateProductFromTable = async (data) => {
  try {
    const dataDetails = await fetch(`${process.env.NEXT_PUBLIC_URL}/purchasings/${data.id}?populate=deep`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data?.attributes?.purchasing_details?.data)
      .catch((err) => {
        console.log("error", err);
        return [];
      });
    console.log("purchasingDetails", dataDetails);

    const promises = dataDetails.map(async (element) => {
      await updateAPI(element);
    });

    const res = await Promise.all(promises);
    console.log("Product updated successfully", res);
    openNotificationWithIcon("success");
  } catch (error) {
    console.error("Error updating data:", error);
    openNotificationWithIcon("error");
  }
};

const updateAPI = async (element) => {
  console.log("updating all api");
  try {
    const unit = element?.attributes?.unit_order;
    const unitPrice = element?.attributes?.unit_price;
    const disc = element?.attributes?.disc;

    const product = element?.attributes?.product?.data;
    const productData = product?.attributes;
    const productId = product?.id;

    const dp1 = element?.attributes?.dp1;
    const dp2 = element?.attributes?.dp2;
    const dp3 = element?.attributes?.dp3;

    for (let i = 1; i <= 5; i++) {
      if (productData?.[`unit_${i}`]) {
        productData[`unit_${i}_dp1`] = dp1;
        productData[`unit_${i}_dp2`] = dp2;
        productData[`unit_${i}_dp3`] = dp3;
      }
    }

    console.log("element coy", element);

    if (unit === productData?.unit_1) {
      updateAtProductUnit1(productData, unit, unitPrice, disc);
    } else if (unit === productData?.unit_2) {
      updateAtProductUnit2(productData, unit, unitPrice, disc);
    } else if (unit === productData?.unit_3) {
      updateAtProductUnit3(productData, unit, unitPrice, disc);
    } else if (unit === productData?.unit_4) {
      updateAtProductUnit4(productData, unit, unitPrice, disc);
    } else if (unit === productData?.unit_5) {
      updateAtProductUnit5(productData, unit, unitPrice, disc);
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
    console.log("jsondata from update produk", JSONdata);
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

    console.log("res updateProductFromTable", res, JSONdata);

    if (req.status !== 200) {
      console.log("error updateProductFromTable", res);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateAtProductUnit1 = (productData, unit, unitPrice, disc) => {
  console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 1");

  productData.buy_price_1 = unitPrice;
  productData.buy_price_2 = productData.buy_price_1 / productData?.qty_2;
  productData.buy_price_3 = productData.buy_price_2 / productData?.qty_3;
  productData.buy_price_4 = productData.buy_price_3 / productData?.qty_4;
  productData.buy_price_5 = productData.buy_price_4 / productData?.qty_5;

  productData.purchase_discount_1 = disc;
  productData.purchase_discount_2 = productData.purchase_discount_1 / productData?.qty_2;
  productData.purchase_discount_3 = productData.purchase_discount_2 / productData?.qty_3;
  productData.purchase_discount_4 = productData.purchase_discount_3 / productData?.qty_4;
  productData.purchase_discount_5 = productData.purchase_discount_4 / productData?.qty_5;
};

const updateAtProductUnit2 = (productData, unit, unitPrice, disc) => {
  console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 2");

  //unit 2
  productData.buy_price_2 = unitPrice;
  productData.buy_price_3 = productData.buy_price_2 / productData.qty_3;
  productData.buy_price_4 = productData.buy_price_3 / productData?.qty_4;
  productData.buy_price_5 = productData.buy_price_4 / productData?.qty_5;
  productData.buy_price_1 = productData.buy_price_2 * productData.qty_2;

  productData.purchase_discount_2 = disc;
  productData.purchase_discount_3 = productData.purchase_discount_2 / productData?.qty_3;
  productData.purchase_discount_4 = productData.purchase_discount_3 / productData?.qty_4;
  productData.purchase_discount_5 = productData.purchase_discount_4 / productData?.qty_5;
  productData.purchase_discount_1 = productData.purchase_discount_2 * productData?.qty_2;
};

const updateAtProductUnit3 = (productData, unit, unitPrice, disc) => {
  console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 3");

  //unit 3
  productData.buy_price_3 = unitPrice;
  productData.buy_price_4 = productData.buy_price_3 / productData?.qty_4;
  productData.buy_price_5 = productData.buy_price_4 / productData?.qty_5;
  productData.buy_price_2 = productData.buy_price_3 * productData.qty_3;
  productData.buy_price_1 = productData.buy_price_2 * productData.qty_2;

  //unit 2
  productData.purchase_discount_3 = disc;
  productData.purchase_discount_4 = productData.purchase_discount_3 / productData?.qty_4;
  productData.purchase_discount_5 = productData.purchase_discount_4 / productData?.qty_5;
  productData.purchase_discount_2 = productData.purchase_discount_3 * productData?.qty_3;
  productData.purchase_discount_1 = productData.purchase_discount_2 * productData?.qty_2;
};

const updateAtProductUnit4 = (productData, unit, unitPrice, disc) => {
  console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 4");

  productData.buy_price_4 = unitPrice;
  productData.buy_price_5 = productData.buy_price_4 / productData?.qty_5;
  productData.buy_price_3 = productData.buy_price_4 * productData?.qty_4;
  productData.buy_price_2 = productData.buy_price_3 * productData.qty_3;
  productData.buy_price_1 = productData.buy_price_2 * productData.qty_2;

  productData.purchase_discount_4 = disc;
  productData.purchase_discount_5 = productData.purchase_discount_4 / productData?.qty_5;
  productData.purchase_discount_3 = productData.purchase_discount_4 * productData?.qty_4;
  productData.purchase_discount_2 = productData.purchase_discount_3 * productData?.qty_3;
  productData.purchase_discount_1 = productData.purchase_discount_2 * productData?.qty_2;
};

const updateAtProductUnit5 = (productData, unit, unitPrice, disc) => {
  console.log("UPDATE DISC & HARGA PEMBELIAN DI UNIT 5");

  //unit 5
  productData.buy_price_5 = unitPrice;
  productData.buy_price_4 = productData.buy_price_5 * productData?.qty_5;
  productData.buy_price_3 = productData.buy_price_4 * productData?.qty_4;
  productData.buy_price_2 = productData.buy_price_3 * productData.qty_3;
  productData.buy_price_1 = productData.buy_price_2 * productData.qty_2;

  productData.purchase_discount_5 = disc;
  productData.purchase_discount_4 = productData.purchase_discount_5 * productData?.qty_5;
  productData.purchase_discount_3 = productData.purchase_discount_4 * productData?.qty_4;
  productData.purchase_discount_2 = productData.purchase_discount_3 * productData?.qty_3;
  productData.purchase_discount_1 = productData.purchase_discount_2 * productData?.qty_2;
};

const openNotificationWithIcon = (type) => {
  if (type === "error") {
    notification[type]({
      message: "Gagal Memperbarui Katalog",
      description: "Katalog produk gagal diperbarui. Silahkan cek log untuk detail lebih lanjut",
    });
  } else if (type === "success") {
    notification[type]({
      message: "Katalog Produk diperbarui!",
      description: "Katalog berhasil diperbarui. Silahkan cek pada halaman Produk",
    });
  }
};

export default updateProductFromTable;
