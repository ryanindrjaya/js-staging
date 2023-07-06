import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import Head from "next/head";
import { DatePicker, Empty, Select, Spin, Table, Tag } from "antd";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
import useDebounce from "../../../hooks/useDebounce";
import moment from "moment";
import { PrinterOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

export default function Riwayat({ defaultOptions }) {
  const { token } = nookies.get();
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const debouncedProduct = useDebounce(product, 200);
  const debouncedLocation = useDebounce(location, 200);
  const [data, setData] = useState();
  const [options, setOptions] = useState({
    product: defaultOptions?.product || [],
    location: defaultOptions?.location || [],
  });
  const [loading, setLoading] = useState({
    product: false,
    location: false,
    print: false,
  });
  const [history, setHistory] = useState();
  const [date, setDate] = useState([
    moment().startOf("month").format("YYYY-MM-DD"),
    moment().endOf("month").format("YYYY-MM-DD"),
  ]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [fetchingHistory, setFetchingHistory] = useState(false);
  const [printState, setPrintState] = useState(false);

  const [locationData, setLocationData] = useState();
  const [productData, setProductData] = useState();

  const printArea = useRef();

  async function fetchHistory(product, location, start, end) {
    setFetchingHistory(true);
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories/history?product=${product}&location=${location}${
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

    console.log("response", response);

    if (response?.data) {
      setHistory(response);
      setFetchingHistory(false);
    } else {
      setHistory();
    }

    console.log("response from fetchHistory", response);
  }

  async function fetchData(url, type) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    switch (type) {
      case "product":
        setProductData(data.data?.attributes);
        break;
      case "location":
        setLocationData(data.data?.attributes);
        break;
      default:
        break;
    }
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

    console.log("response from fetchInventory", response);

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

      fetchData(`/products/${router.query.product}`, "product");
      fetchData(`/locations/${router.query.location}`, "location");

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
    if (selectedLocation) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            location: selectedLocation,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedProduct) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            product: selectedProduct,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [selectedProduct]);

  const handlePrintData = () => {
    setLoading({ ...loading, print: true });
    setPrintState(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {printState ? (
        <>
          <Head>
            <title>Cetak Kartu Stok</title>
          </Head>
          <div className="px-6 py-3">
            <div className="flex justify-between items-center mb-5">
              <ArrowLeftOutlined
                title="Kembali"
                className="print:hidden cursor-pointer"
                onClick={() => {
                  setPrintState(false);
                  setLoading({ ...loading, print: false });
                }}
              />
              <button onClick={handlePrint} class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white">
                <span>
                  <PrinterOutlined className="mr-1 text-lg" />
                </span>{" "}
                Cetak Dokumen
              </button>
            </div>
            <div className="w-full mb-5 flex items-end justify-between">
              <p className="uppercase font-bold text-xl">Kartu Stok</p>
              <p className="uppercase text-sm">Cetakan Tanggal : {moment().format("DD/MM/YYYY HH:mm:ss")}</p>
            </div>

            <p className="font-bold uppercase mb-0">{productData?.name}</p>
            <p className="uppercase mb-0">LOKASI PRODUK : {locationData?.name}</p>
            <p className="uppercase mb-0">
              RENTANG TANGGAL :{" "}
              {date?.[0] && date?.[1]
                ? `${moment(date?.[0]).format("DD/MM/YYYY")} - ${moment(date?.[1]).format("DD/MM/YYYY")}`
                : "-"}
            </p>

            {history?.units?.length > 0 ? (
              <Table bordered pagination={false} loading={fetchingHistory} dataSource={history?.data}>
                <Column
                  className="uppercase"
                  title="Tanggal"
                  render={(row) => {
                    return moment(row.createdAt).format("DD/MM/YYYY");
                  }}
                  key="createdAt"
                />
                <Column className="uppercase" title="No refrensi" dataIndex="no_referensi" key="no_referensi" />
                <Column className="uppercase" title="Jenis" dataIndex="type" key="type" />
                <ColumnGroup className="uppercase" title="MASUK">
                  {history?.units?.map((unit) => (
                    <Column
                      className="uppercase child text-center"
                      title={unit}
                      render={(_, record) => {
                        return record.detail?.type === "Masuk" && record.detail?.qty?.[unit] > 0
                          ? record.detail?.qty?.[unit]
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
                        return record.detail?.type === "Keluar" && record.detail?.qty?.[unit] > 0
                          ? record.detail?.qty?.[unit]
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
                        return record.detail?.remaining_stock?.[unit] > 0 ? record.detail?.remaining_stock?.[unit] : "";
                      }}
                      dataIndex={unit}
                      key={unit}
                    />
                  ))}
                </ColumnGroup>
                <Column className="uppercase" title="Pembuat" dataIndex="author" key="author" />
                <Column className="uppercase" title="Keterangan" dataIndex="keterangan" key="keterangan" />
              </Table>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <>
          <Head>
            <title>Riwayat Inventory</title>
          </Head>
          <DashboardLayout>
            <LayoutWrapper>
              <TitlePage titleText={"Riwayat Inventory"} />
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
                    defaultValue={[moment().startOf("month"), moment().endOf("month")]}
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

                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK AWAL</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.awal?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK PEMBELIAN</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.pembelian?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK RETUR PENJUALAN</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.retur_penjualan?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK TRANSFER MASUK</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.transfer_masuk?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="font-bold text-[#036b82] text-xl mb-1">PRODUK KELUAR</p>

                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK TERJUAL</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.terjual?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK PENYESUAIAN STOK</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.penyesuaian_stok?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK RETUR PEMBELIAN</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.retur_pembelian?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK TRANSFER KELUAR</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.transfer_keluar?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="font-bold text-[#036b82] text-xl mb-1">TOTAL STOK</p>

                        <div className="w-full flex flex-col gap-1 mb-3">
                          <p className="text-sm font-bold mb-0">STOK SAAT INI</p>
                          <div className="flex gap-y-1 flex-wrap">
                            {data.current_stock?.split(", ").map((item) => {
                              return (
                                <Tag className="text-sm" color="blue" key={item}>
                                  {item}
                                </Tag>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="m-0">Keterangan Unit : {data.conversion}</p>
                    {history?.units?.length > 0 ? (
                      <>
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
                                  return record.detail?.type === "Masuk" && record.detail?.qty?.[unit] > 0
                                    ? record.detail?.qty?.[unit]
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
                                  return record.detail?.type === "Keluar" && record.detail?.qty?.[unit] > 0
                                    ? record.detail?.qty?.[unit]
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
                                  return record.detail?.remaining_stock?.[unit] > 0
                                    ? record.detail?.remaining_stock?.[unit]
                                    : "";
                                }}
                                dataIndex={unit}
                                key={unit}
                              />
                            ))}
                          </ColumnGroup>
                          <Column className="uppercase" title="Pembuat" dataIndex="author" key="author" />
                          <Column width={250} title="Keterangan" dataIndex="keterangan" key="keterangan" />
                        </Table>
                        <div className="w-full flex item justify-center">
                          {loading.print ? (
                            <Spin />
                          ) : (
                            <button
                              onClick={handlePrintData}
                              className="bg-cyan-700 lg:w-2/5 w-3/4 hover:bg-cyan-700/80 duration-150 rounded-md m-1 text-sm"
                            >
                              <p className="px-4 py-2 m-0 text-white">CETAK KARTU STOK</p>
                            </button>
                          )}
                        </div>
                      </>
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
      )}
    </>
  );
}

Riwayat.getInitalProps = async (ctx) => {
  const { product, location } = ctx.query;
  const { token } = nookies.get(ctx);

  const reqProduct = fetchData(`/products/${product}`, token);
  const reqLocation = fetchData(`/locations/${location}`, token);

  const [productData, locationData] = await Promise.all([reqProduct, reqLocation]);

  return {
    defaultOptions: {
      product: productData?.data ? [formatOptions(productData)] : [],
      location: locationData?.data ? [formatOptions(locationData)] : [],
    },
  };
};

async function fetchData(url, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

const formatOptions = (data) => {
  return {
    value: data?.id,
    label: data?.atributes?.name,
  };
};
