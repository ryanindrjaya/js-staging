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

const getPanelRetur = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/retur-panel-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const data = await response.json();

  return data;
};

const getNonPanelRetur = async (id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/retur-non-panel-sales/${id}?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const data = await response.json();

  return data;
};

export const updateLocations = async ({ id, body, url }) => {
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

export async function InventoryOutFromPanel(id, customer, user) {
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
            const uid = `${product.id}${location}`;
            if (!locations.some((loc) => loc.uid === uid)) {
              locations.push({
                uid,
                location,
                stok_keluar: [
                  {
                    qty: totalOrder >= qty ? qty : totalOrder,
                    unit: detailInven?.unit || unitOrder,
                  },
                ],
                product: product.id,
                product_name: product.attributes.name,
              });
            } else {
              const index = locations.findIndex((loc) => loc.uid === uid);
              if (index >= 0) {
                locations[index].stok_keluar.push({
                  qty: totalOrder >= qty ? qty : totalOrder,
                  unit: detailInven?.unit || unitOrder,
                });
              }
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
        id: id,
        body: {
          data: {
            locations: locations.map((loc) => loc.location),
            detail_mutasi_stok: locations,
          },
        },
        url: "panel-sales",
      });

      const promises = locations.map((location) => getLocationsDetail(location.location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_ref,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
        author: user,
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
export async function InventoryOutFromNonPanel(id, customer, user) {
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
            const uid = `${product.id}${location}`;
            if (!locations.some((loc) => loc.uid === uid)) {
              locations.push({
                uid,
                location,
                stok_keluar: [
                  {
                    qty: totalOrder >= qty ? qty : totalOrder,
                    unit: detailInven?.unit || unitOrder,
                  },
                ],
                product: product.id,
                product_name: product.attributes.name,
              });
            } else {
              const index = locations.findIndex((loc) => loc.uid === uid);
              if (index >= 0) {
                locations[index].stok_keluar.push({
                  qty: totalOrder >= qty ? qty : totalOrder,
                  unit: detailInven?.unit || unitOrder,
                });
              }
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
        id: id,
        body: {
          data: {
            locations: locations.map((loc) => loc.location),
            detail_mutasi_stok: locations,
          },
        },
        url: "non-panel-sales",
      });

      const promises = locations.map((item) => getLocationsDetail(item.location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_ref,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
        author: user,
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

export async function createInventoryFromPenjualanSales(row, user) {
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
            const uid = `${product.id}${location}`;
            if (!locations.some((loc) => loc.uid === uid)) {
              locations.push({
                uid,
                location,
                stok_keluar: [
                  {
                    qty: totalOrder >= qty ? qty : totalOrder,
                    unit: detailInven?.unit || unitOrder,
                  },
                ],
                product: product.id,
                product_name: product.attributes.name,
              });
            } else {
              const index = locations.findIndex((loc) => loc.uid === uid);
              if (index >= 0) {
                locations[index].stok_keluar.push({
                  qty: totalOrder >= qty ? qty : totalOrder,
                  unit: detailInven?.unit || unitOrder,
                });
              }
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
            locations: locations.map((loc) => loc.location),
            detail_mutasi_stok: locations,
          },
        },
        url: "sales-sales",
      });

      const promises = locations.map((item) => getLocationsDetail(item.location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_sales_sale,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
        author: user,
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

export async function createInventoryFromPenjualan(row, user) {
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
            const uid = `${product.id}${location}`;
            if (!locations.some((loc) => loc.uid === uid)) {
              locations.push({
                uid,
                location,
                stok_keluar: [
                  {
                    qty: totalOrder >= qty ? qty : totalOrder,
                    unit: detailInven?.unit || unitOrder,
                  },
                ],
                product: product.id,
                product_name: product.attributes.name,
              });
            } else {
              const index = locations.findIndex((loc) => loc.uid === uid);
              if (index >= 0) {
                locations[index].stok_keluar.push({
                  qty: totalOrder >= qty ? qty : totalOrder,
                  unit: detailInven?.unit || unitOrder,
                });
              }
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
            locations: locations.map((loc) => loc.location),
            detail_mutasi_stok: locations,
          },
        },
        url: "store-sales",
      });

      const promises = locations.map((item) => getLocationsDetail(item.location));
      const locationsDetail = await Promise.all(promises);

      const body = {
        data,
        no_referensi: no_store_sale,
        type: "Terjual",
        keterangan: `Penjualan ke ${customer} di ${
          locationsDetail?.map((location) => location.data?.attributes?.name).join(", ") || "Gudang"
        }`,
        author: user,
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

export async function createInventoryFromReturPenjualan(row, customer, returPage, user) {
  if (returPage === "retur panel sale") {
    const data = [];

    const returPanelSale = await getPanelRetur(row.id);
    console.log("retur panel sale", returPanelSale);
    const retur_panel_sale_details = returPanelSale.data.attributes.retur_panel_sale_details.data;
    const no_retur_panel_sale = returPanelSale.data.attributes.no_retur_panel_sale;
    const location = returPanelSale.data.attributes.location.data;

    const locations = returPanelSale.data.attributes.panel_sale?.data?.attributes?.detail_mutasi_stok ?? [];
    const initialLocations =
      returPanelSale.data.attributes.panel_sale?.data?.attributes?.locations?.data?.map((item) => item.id) ?? [];

    retur_panel_sale_details.forEach((element) => {
      console.log("element panel detail (penjualan)", element);
      const unitOrder = element.attributes.unit;
      const totalOrder = parseInt(element.attributes.qty);
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";

      if (unitOrder && totalOrder && product && location) {
        const uid = `${product.id}${location.id}-retur`;
        if (!locations.some((loc) => loc.uid === uid)) {
          locations.push({
            uid,
            location: location.id,
            stok_masuk: [
              {
                qty: totalOrder,
                unit: unitOrder,
              },
            ],
            product: product.id,
            product_name: product.attributes.name,
          });
        } else {
          const index = locations.findIndex((loc) => loc.uid === uid);
          if (index >= 0) {
            locations[index].stok_masuk.push({
              qty: totalOrder,
              unit: unitOrder,
            });
          }
        }

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
      updateLocations({
        id: returPanelSale.data.attributes?.panel_sale?.data?.id,
        body: {
          data: {
            locations: [...initialLocations, ...locations.map((loc) => loc.location)],
            detail_mutasi_stok: locations,
            status: "Diretur",
          },
        },
        url: "panel-sales",
      });

      const body = {
        data,
        no_referensi: no_retur_panel_sale,
        type: "Retur Penjualan",
        keterangan: `Retur Penjualan dari ${customer}`,
        author: user,
      };

      await addToGudang(body, "add");
    }
  } else if (returPage === "retur non panel sale") {
    const data = [];

    const returNonPanelSale = await getNonPanelRetur(row.id);

    const retur_non_panel_sale_details = returNonPanelSale.data.attributes.retur_non_panel_sale_details.data;
    const no_retur_non_panel_sale = returNonPanelSale.data.attributes.no_retur_non_panel_sale;
    const location = returNonPanelSale.data.attributes.location.data;

    const locations = returNonPanelSale.data.attributes.non_panel_sale?.data?.attributes?.detail_mutasi_stok ?? [];
    const initialLocations =
      returNonPanelSale.data.attributes.non_panel_sale?.data?.attributes?.locations?.data?.map((item) => item.id) ?? [];

    retur_non_panel_sale_details.forEach((element) => {
      console.log("element panel detail (penjualan)", element);
      const unitOrder = element.attributes.unit;
      const totalOrder = parseInt(element.attributes.qty);
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";

      if (unitOrder && totalOrder && product && location) {
        const uid = `${product.id}${location.id}-retur`;
        if (!locations.some((loc) => loc.uid === uid)) {
          locations.push({
            uid,
            location: location.id,
            stok_masuk: [
              {
                qty: totalOrder,
                unit: unitOrder,
              },
            ],
            product: product.id,
            product_name: product.attributes.name,
          });
        } else {
          const index = locations.findIndex((loc) => loc.uid === uid);
          if (index >= 0) {
            locations[index].stok_masuk.push({
              qty: totalOrder,
              unit: unitOrder,
            });
          }
        }

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
      updateLocations({
        id: returNonPanelSale.data.attributes?.non_panel_sale?.data?.id,
        body: {
          data: {
            locations: [...initialLocations, ...locations.map((loc) => loc.location)],
            detail_mutasi_stok: locations,
            status: "Diretur",
          },
        },
        url: "non-panel-sales",
      });

      const body = {
        data,
        no_referensi: no_retur_non_panel_sale,
        type: "Retur Penjualan",
        keterangan: `Retur Penjualan dari ${customer}`,
        author: user,
      };

      await addToGudang(body, "add");
    }
  } else {
    const data = [];

    const returStoreSale = await getStoreRetur(row.id);
    console.log("returStoreSale", returStoreSale);
    const retur_store_sale_details = returStoreSale.data.attributes.retur_store_sale_details.data;
    const no_retur_store_sale = returStoreSale.data.attributes.no_retur_store_sale;
    const locations = returStoreSale.data.attributes.store_sale?.data?.attributes?.detail_mutasi_stok ?? [];
    const initialLocations =
      returStoreSale.data.attributes.store_sale?.data?.attributes?.locations?.data?.map((item) => item.id) ?? [];

    retur_store_sale_details.forEach((element) => {
      console.log("element store detail (penjualan)", element);
      const unitOrder = element.attributes.unit;
      const totalOrder = parseInt(element.attributes.qty);
      const location = element.attributes.location.data;
      const product = element.attributes.product.data;
      const expDate = element.attributes.expired_date;
      const batch = element.attributes?.batch ?? "";

      if (unitOrder && totalOrder && product && location) {
        const uid = `${product.id}${location.id}-retur`;
        if (!locations.some((loc) => loc.uid === uid)) {
          locations.push({
            uid,
            location: location.id,
            stok_masuk: [
              {
                qty: totalOrder,
                unit: unitOrder,
              },
            ],
            product: product.id,
            product_name: product.attributes.name,
          });
        } else {
          const index = locations.findIndex((loc) => loc.uid === uid);
          if (index >= 0) {
            locations[index].stok_masuk.push({
              qty: totalOrder,
              unit: unitOrder,
            });
          }
        }

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
      updateLocations({
        id: returStoreSale.data.attributes?.store_sale?.data?.id,
        body: {
          data: {
            locations: [...initialLocations, ...locations.map((loc) => loc.location)],
            detail_mutasi_stok: locations,
            status: "Diretur",
          },
        },
        url: "store-sales",
      });

      const body = {
        data,
        no_referensi: no_retur_store_sale,
        type: "Retur Penjualan",
        keterangan: `Retur Penjualan dari ${customer}`,
        author: user,
      };

      await addToGudang(body, "add");
    }
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
