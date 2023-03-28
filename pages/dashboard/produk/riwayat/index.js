import React, { useEffect, useState } from "react";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Head from "next/head";
import { DatePicker, Empty, Select, Table } from "antd";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import useDebounce from "../../../../hooks/useDebounce";
import moment from "moment";

const { Column, ColumnGroup } = Table;

export default function riwayat() {
  const { token } = nookies.get();
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const debouncedProduct = useDebounce(product, 200);
  const debouncedLocation = useDebounce(location, 200);
  const [data, setData] = useState();
  const [options, setOptions] = useState({
    product: [],
    location: [],
  });
  const [loading, setLoading] = useState({
    product: false,
    location: false,
  });
  const [history, setHistory] = useState();
  const [date, setDate] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [fetchingHistory, setFetchingHistory] = useState(false);

  async function fetchHistory(product, location, start, end) {
    setFetchingHistory(true);
    const endpoint = `${
      process.env.NEXT_PUBLIC_URL
    }/inventories/history?product=${product}&location=${location}${
      start && end ? `&start_date=${start}&end_date=${end}` : ""
    }`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (response?.data) {
      setHistory(response);
      setFetchingHistory(false);
    } else {
      setHistory();
    }

    console.log("response from fetchHistory", response);
  }

  async function fetchInventory(product, location) {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories/get?product=${product}&location=${location}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(endpoint, options)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (response?.data) {
      setData(response.data);
    } else {
      setData();
    }

    console.log("response from fetchInventory", response);
  }

  useEffect(() => {
    if (router.query?.product && router.query?.location) {
      fetchInventory(router.query.product, router.query.location);
      fetchHistory(router.query.product, router.query.location, date?.[0], date?.[1]);
      setSelectedProduct(parseInt(router.query.product));
      setSelectedLocation(parseInt(router.query.location));
    }
  }, [router.query, date]);

  useEffect(() => {
    async function fetchProducts() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/products?filters[name][$containsi]=${debouncedProduct}`;
      const headers = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setLoading({ ...loading, product: false });
          console.log(err);
        });

      if (response.data) {
        setLoading({ ...loading, product: false });
        setOptions({
          ...options,
          product: response.data.map(({ id, attributes }) => ({
            label: attributes.name,
            value: id,
          })),
        });
      }

      console.log("response from fetchOptions", response);
    }

    fetchProducts();
  }, [debouncedProduct]);

  useEffect(() => {
    async function fetchLocations() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/locations?filters[name][$containsi]=${debouncedLocation}`;
      const headers = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(endpoint, headers)
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          setLoading({ ...loading, location: false });
          console.log(err);
        });

      if (response.data) {
        setLoading({ ...loading, location: false });
        setOptions({
          ...options,
          location: response.data.map(({ id, attributes }) => ({
            label: attributes.name,
            value: id,
          })),
        });
      }

      console.log("response from fetchOptions", response);
    }

    fetchLocations();
  }, [debouncedLocation]);

  useEffect(() => {
    if (selectedLocation && selectedProduct) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            product: selectedProduct,
            location: selectedLocation,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [selectedLocation, selectedProduct]);

  return (
    <>
      <Head>
        <title>Riwayat Stok</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage titleText={"Riwayat Stok"} />
          <LayoutContent>
            <div className="lg:w-3/4 w-full gap-3 grid grid-cols-3 mb-3">
              <Select
                onSearch={(value) => {
                  setLoading({ ...loading, product: true });
                  setProduct(value);
                }}
                onSelect={(value) => {
                  setSelectedProduct(value);
                }}
                value={selectedProduct}
                placeholder="Produk"
                showSearch
                filterOption={false}
                size="large"
                loading={loading.product}
                options={options.product}
              />
              <Select
                onSearch={(value) => {
                  setLoading({ ...loading, location: true });
                  setLocation(value);
                }}
                onSelect={(value) => {
                  setSelectedLocation(value);
                }}
                value={selectedLocation}
                placeholder="Lokasi"
                showSearch
                filterOption={false}
                size="large"
                loading={loading.location}
                options={options.location}
              />
              <DatePicker.RangePicker
                onChange={(_, value) => {
                  if (value?.[0] !== "" && value?.[1] !== "") {
                    setDate(value);
                  } else {
                    setDate();
                  }
                }}
                size="middle"
              />
            </div>

            {data ? (
              <div className="flex flex-col gap-4">
                <div className="w-full grid grid-cols-3 gap-12">
                  <div className="w-full">
                    <p className="font-bold text-[#036b82] text-xl mb-1">PRODUK MASUK</p>

                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK AWAL</p>
                      <p className="text-sm mb-0">{data.awal}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK PEMBELIAN</p>
                      <p className="text-sm mb-0">{data.pembelian}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK RETUR PENJUALAN</p>
                      <p className="text-sm mb-0">{data.retur_penjualan}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK TRANSFER MASUK</p>
                      <p className="text-sm mb-0">{data.transfer_masuk}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-[#036b82] text-xl mb-1">PRODUK KELUAR</p>

                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK TERJUAL</p>
                      <p className="text-sm mb-0">{data.terjual}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK PENYESUAIAN STOK</p>
                      <p className="text-sm mb-0">{data.penyesuaian_stok}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK RETUR PEMBELIAN</p>
                      <p className="text-sm mb-0">{data.retur_pembelian}</p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                      <p className="text-sm mb-0">STOK TRANSFER KELUAR</p>
                      <p className="text-sm mb-0">{data.transfer_masuk}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-[#036b82] text-xl mb-1">TOTAL STOK</p>

                    <div className="w-full flex gap-2 justify-between">
                      <p className="text-sm mb-0">STOK SAAT INI</p>
                      <p className="text-sm mb-0">{data.current_stock}</p>
                    </div>
                  </div>
                </div>
                {history?.units?.length > 0 ? (
                  <Table
                    loading={fetchingHistory}
                    dataSource={history?.data}
                    scroll={{
                      x: 1500,
                    }}
                  >
                    <Column
                      className="uppercase"
                      title="Tanggal"
                      render={(row) => {
                        return moment(row.createdAt).format("DD/MM/YYYY");
                      }}
                      key="createdAt"
                    />
                    <Column
                      className="uppercase"
                      title="No refrensi"
                      dataIndex="no_referensi"
                      key="no_referensi"
                    />
                    <Column className="uppercase" title="Jenis" dataIndex="type" key="type" />
                    <ColumnGroup className="uppercase" title="MASUK">
                      {history?.units?.map((unit) => (
                        <Column
                          className="uppercase child text-center"
                          title={unit}
                          render={(_, record) => {
                            return record.detail?.unit === unit && record.detail?.type === "Masuk"
                              ? record.detail?.qty
                              : "";
                          }}
                          dataIndex={unit}
                          key={unit}
                        />
                      ))}
                    </ColumnGroup>
                    <ColumnGroup className="uppercase" title="KELUAR">
                      {history?.units?.map((unit) => (
                        <Column
                          className="uppercase child text-center"
                          title={unit}
                          render={(_, record) => {
                            return record.detail?.unit === unit && record.detail?.type === "Keluar"
                              ? record.detail?.qty
                              : "";
                          }}
                          dataIndex={unit}
                          key={unit}
                        />
                      ))}
                    </ColumnGroup>
                    <ColumnGroup className="uppercase" title="SISA STOK">
                      {history?.units?.map((unit) => (
                        <Column
                          className="uppercase child text-center"
                          title={unit}
                          render={(_, record) => {
                            return record.detail?.remaining_stock?.[unit];
                          }}
                          dataIndex={unit}
                          key={unit}
                        />
                      ))}
                    </ColumnGroup>
                    <Column className="uppercase" title="Pembuat" dataIndex="author" key="author" />
                    <Column
                      className="uppercase"
                      title="Keterangan"
                      dataIndex="description"
                      key="description"
                    />
                  </Table>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Tidak ada data"
                className="w-full h-[20vh] flex flex-col justify-center items-center"
              />
            )}
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
