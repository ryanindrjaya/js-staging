import React from "react";
import nookies from "nookies";
import * as moment from "moment";
import { notification } from "antd";

const cookies = nookies.get(null, "token");

const getStoreSale = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/store-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getSalesSale = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/sales-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getPanelSale = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/panel-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  return data;
};
const getNonPanelSale = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/non-panel-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getStoreRetur = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/retur-store-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const data = await response.json();

  return data;
};

const updateLocations = async ({ id, body, url }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};

export async function InventoryOutFromPanel(id, customer, location) {
  try {
    const data = [];
    const locations = [];

    //   console.log("row", row);
    const sale = await getPanelSale(id);
    const sale_details = sale.data.attributes.panel_sale_details.data;
    const no_ref = sale.data.attributes.no_panel_sale;

    sale_details.forEach((element) => {
      console.log("element store detail (penjualan)", element);
      let totalOrder = parseInt(element.attributes.qty);
      const unitOrder = element.attributes.unit;
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";
      const dataGudang = element.attributes.inventory || [];

      for (let i = 0; i < dataGudang.length; i++) {
        const detailInven = dataGudang[i];
        const qty = parseInt(detailInven.availableStock);
        const location = detailInven.location;

        console.log({
          totalOrder,
          unitOrder,
          product,
          location,
          qty,
        });

        if (totalOrder > 0) {
          if (unitOrder && product && location) {
            if (!locations.includes(location)) {
              locations.push(location);
            }

            const item = {
              location: location,
              product: product.id,
              unit: detailInven?.unit || unitOrder,
              qty: totalOrder >= qty ? qty : totalOrder,
              exp_date: expDate,
              batch,
            };

            data.push(item);
            totalOrder -= qty;
          }
        } else {
          break;
        }
      }
    });

    if (data.length > 0) {
      updateLocations({
        id: row.id,
        body: {
          data: {
            locations: locations,
          },
        },
        url: "panel-sales",
      });

      const promises = locations.map((location) => getLocationsDetail(location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_ref,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
      };

      const status = await addToGudang(body);

      return status;
    }
  } catch (error) {
    console.log("createInventoryFromPenjualan error", error);
    notification.error({
      message: "Error",
      description: "Gagal membuat inventory",
    });
  }
}
export async function InventoryOutFromNonPanel(id, customer) {
  try {
    const data = [];
    const locations = [];

    //   console.log("row", row);
    const sale = await getNonPanelSale(id);
    const sale_details = sale.data.attributes.non_panel_sale_details.data;
    const no_ref = sale.data.attributes.no_non_panel_sale;

    sale_details.forEach((element) => {
      console.log("element store detail (penjualan)", element);
      let totalOrder = parseInt(element.attributes.qty);
      const unitOrder = element.attributes.unit;
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";
      const dataGudang = element.attributes.inventory || [];

      for (let i = 0; i < dataGudang.length; i++) {
        const detailInven = dataGudang[i];
        const qty = parseInt(detailInven.availableStock);
        const location = detailInven.location;

        console.log({
          totalOrder,
          unitOrder,
          product,
          location,
          qty,
        });

        if (totalOrder > 0) {
          if (unitOrder && product && location) {
            if (!locations.includes(location)) {
              locations.push(location);
            }

            const item = {
              location: location,
              product: product.id,
              unit: detailInven?.unit || unitOrder,
              qty: totalOrder >= qty ? qty : totalOrder,
              exp_date: expDate,
              batch,
            };

            data.push(item);
            totalOrder -= qty;
          }
        } else {
          break;
        }
      }
    });

    if (data.length > 0) {
      updateLocations({
        id: row.id,
        body: {
          data: {
            locations: locations,
          },
        },
        url: "non-panel-sales",
      });

      const promises = locations.map((location) => getLocationsDetail(location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_ref,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
      };

      const status = await addToGudang(body);

      return status;
    }
  } catch (error) {
    console.log("createInventoryFromPenjualan error", error);
    notification.error({
      message: "Error",
      description: "Gagal membuat inventory",
    });
  }
}

export async function createInventoryFromPenjualanSales(row) {
  try {
    const data = [];
    const locations = [];

    //   console.log("row", row);
    const salesSale = await getSalesSale(row.id);
    const sales_sale_details = salesSale.data.attributes.sales_sale_details.data;
    const no_sales_sale = salesSale.data.attributes.no_sales_sale;
    const customer = salesSale.data.attributes.customer?.data?.attributes?.name;

    sales_sale_details.forEach((element) => {
      console.log("element store detail (penjualan)", element);
      let totalOrder = parseInt(element.attributes.qty);
      const unitOrder = element.attributes.unit;
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";
      const dataGudang = element.attributes.inventory || [];

      for (let i = 0; i < dataGudang.length; i++) {
        const detailInven = dataGudang[i];
        const qty = parseInt(detailInven.availableStock);
        const location = detailInven.location;

        console.log({
          totalOrder,
          unitOrder,
          product,
          location,
          qty,
        });

        if (totalOrder > 0) {
          if (unitOrder && product && location) {
            if (!locations.includes(location)) {
              locations.push(location);
            }

            const item = {
              location: location,
              product: product.id,
              unit: detailInven?.unit || unitOrder,
              qty: totalOrder >= qty ? qty : totalOrder,
              exp_date: expDate,
              batch,
            };

            data.push(item);
            totalOrder -= qty;
          }
        } else {
          break;
        }
      }
    });

    if (data.length > 0) {
      updateLocations({
        id: row.id,
        body: {
          data: {
            locations: locations,
          },
        },
        url: "sales-sales",
      });

      const promises = locations.map((location) => getLocationsDetail(location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_sales_sale,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
      };

      const status = await addToGudang(body);

      return status;
    }
  } catch (error) {
    console.log("createInventoryFromPenjualan error", error);
    notification.error({
      message: "Error",
      description: "Gagal membuat inventory",
    });

    return false;
  }
}

const getLocationsDetail = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/locations/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const data = await response.json();

  return data;
};

export async function createInventoryFromPenjualan(row) {
  try {
    const data = [];
    const locations = [];

    //   console.log("row", row);
    const storeSale = await getStoreSale(row.id);
    const store_sale_details = storeSale.data.attributes.store_sale_details.data;
    const no_store_sale = storeSale.data.attributes.no_store_sale;
    const customer = storeSale.data.attributes.customer_name;

    store_sale_details.forEach((element) => {
      console.log("element store detail (penjualan)", element);
      let totalOrder = parseInt(element.attributes.qty);
      const unitOrder = element.attributes.unit;
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";
      const dataGudang = element.attributes.inventory || [];

      for (let i = 0; i < dataGudang.length; i++) {
        const detailInven = dataGudang[i];
        const qty = parseInt(detailInven.availableStock);
        const location = detailInven.location;

        console.log({
          totalOrder,
          unitOrder,
          product,
          location,
          qty,
        });

        if (totalOrder > 0) {
          if (unitOrder && product && location) {
            if (!locations.includes(location)) {
              locations.push(location);
            }

            const item = {
              location: location,
              product: product.id,
              unit: detailInven?.unit || unitOrder,
              qty: totalOrder >= qty ? qty : totalOrder,
              exp_date: expDate,
              batch,
            };

            data.push(item);
            totalOrder -= qty;
          }
        } else {
          break;
        }
      }
    });

    if (data.length > 0) {
      updateLocations({
        id: row.id,
        body: {
          data: {
            locations: locations,
          },
        },
        url: "store-sales",
      });

      const promises = locations.map((location) => getLocationsDetail(location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_store_sale,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
      };

      const status = await addToGudang(body);

      return status;
    }
  } catch (error) {
    console.log("createInventoryFromPenjualan error", error);
    notification.error({
      message: "Error",
      description: "Gagal membuat inventory",
    });

    return false;
  }
}

export async function createInventoryFromReturPenjualan(row, customer) {
  const data = [];

  const returStoreSale = await getStoreRetur(row.id);
  console.log("returStoreSale", returStoreSale);
  const retur_store_sale_details = returStoreSale.data.attributes.retur_store_sale_details.data;
  const no_retur_store_sale = returStoreSale.data.attributes.no_retur_store_sale;

  retur_store_sale_details.forEach((element) => {
    console.log("element store detail (penjualan)", element);
    const unitOrder = element.attributes.unit;
    const totalOrder = parseInt(element.attributes.qty);
    const location = element.attributes.location.data;
    const product = element.attributes.product.data;
    const expDate = element.attributes.expired_date;
    const batch = element.attributes?.batch ?? "";

    if (unitOrder && totalOrder && product && location) {
      const item = {
        location: location.id,
        product: product.id,
        unit: unitOrder,
        qty: totalOrder,
        exp_date: expDate,
        batch,
      };

      data.push(item);
    }
  });

  if (data.length > 0) {
    const body = {
      data,
      no_referensi: no_retur_store_sale,
      type: "Retur Penjualan",
      keterangan: `Retur Penjualan dari ${customer}`,
    };

    await addToGudang(body, "add");
  }
}

async function addToGudang(body, operation = "subtract") {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/inventories/${operation}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("body", JSON.stringify(body));
  console.log("add to inventory", data);

  if (data?.status === "success") {
    notification.success({
      message: "Inventory Updated!",
      description: "Inventory barang berhasil diperbarui",
    });

    return true;
  } else {
    notification.error({
      message: "Error",
      description: data?.message,
    });

    return false;
  }
}
// export default createInventoryRetur;
