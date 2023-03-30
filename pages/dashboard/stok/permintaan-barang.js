import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, DatePicker, Form, Input, InputNumber, notification, Select, Spin } from "antd";
import useDebounce from "../../../hooks/useDebounce";
import nookies from "nookies";
import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";
import moment from "moment";

export default function permintaanBarang() {
  const { token } = nookies.get();

  const [options, setOptions] = useState({
    location1: [],
    location2: [],
    products: [],
  });
  const [loading, setLoading] = useState({
    location1: false,
    location2: false,
    product: false,
    send: false,
    print: false,
  });
  const [location1, setLocation1] = useState("");
  const [selectedLocation1, setSelectedLocation1] = useState();
  const [location2, setLocation2] = useState("");
  const [selectedLocation2, setSelectedLocation2] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const debouncedLocation1 = useDebounce(location1, 200);
  const debouncedLocation2 = useDebounce(location2, 200);
  const debounceProducts = useDebounce(searchProduct, 200);

  const [products, setProducts] = useState([]);
  const [printState, setPrintState] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchLocations() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/locations?filters[name][$containsi]=${debouncedLocation1}`;
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
          setLoading({ ...loading, location1: false });
          console.log(err);
        });

      if (response.data) {
        setLoading({ ...loading, location1: false });
        setOptions({
          ...options,
          location1: response.data.map(({ id, attributes }) => ({
            label: attributes.name,
            value: JSON.stringify({
              id: id,
              ...attributes,
            }),
          })),
        });
      }

      console.log("response from fetchOptions 1", response);
    }

    fetchLocations();
  }, [debouncedLocation1]);

  useEffect(() => {
    async function fetchLocations() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/locations?filters[name][$containsi]=${debouncedLocation2}`;
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
          setLoading({ ...loading, location2: false });
          console.log(err);
        });

      if (response.data) {
        const location2 = response.data.map(({ id, attributes }) => ({
          label: attributes.name,
          value: JSON.stringify({
            id: id,
            ...attributes,
          }),
        }));
        console.log("selectedLocation1", selectedLocation1);
        const filtered = location2.filter(
          (item) => JSON.parse(item?.value)?.id !== selectedLocation1?.id
        );
        setLoading({ ...loading, location2: false });
        setOptions({
          ...options,
          location2: filtered,
        });
      }

      console.log("response from fetchOptions 2", response);
    }

    fetchLocations();
  }, [debouncedLocation2, selectedLocation1]);

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };
  const printStyles = {
    headCells: {
      style: {
        color: "black",
        background: "white",
        border: "1px solid black",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        color: "black",
        background: "white",
        border: "1px solid black",
      },
    },
  };

  const generateRandomId = () => {
    return moment().unix();
  };

  useEffect(() => {
    async function fetchProducts() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories/stock?location=${selectedLocation1?.id}&query=${debounceProducts}`;
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
          products: response.data.map((data) => ({
            label: data.name,
            value: JSON.stringify({
              unique_id: generateRandomId(),
              qty: 1,
              unit: data.available_units[0],
              ...data,
            }),
          })),
        });
      }

      console.log("response from fetchOptions 3", response);
    }

    if (selectedLocation1) {
      fetchProducts();
    }
  }, [debounceProducts]);

  const columns = [
    {
      name: "Nama Produk",
      align: "center",
      selector: (row, index) => row.name,
    },
    {
      name: "Kuantitas Transfer",
      align: "center",
      selector: (row, index) => {
        let maxQty = row?.stock?.[row?.unit]?.qty || 1;
        const units = row.available_units.map((unit) => ({
          label: unit,
          value: unit,
        }));

        const sameData = products.filter(
          (product, productIdx) =>
            product.id === row.id && product.unit === row.unit && productIdx !== index
        );

        if (sameData.length > 0) {
          sameData.forEach((data) => {
            maxQty -= data.qty;
          });
        }

        return (
          <Input.Group compact className="w-full">
            <InputNumber
              onChange={(value) => {
                const newProducts = products.map((product, productIdx) => {
                  if (productIdx === index) {
                    return {
                      ...product,
                      qty: value,
                    };
                  }

                  return product;
                });

                setProducts(newProducts);
              }}
              defaultValue={row?.qty || 1}
              min={maxQty > 0 ? 1 : 0}
              max={maxQty > 0 ? maxQty : 0}
              className="w-[30%]"
            />
            <Select
              onChange={(value) => {
                const newProducts = products.map((product, productIdx) => {
                  if (productIdx === index) {
                    return {
                      ...product,
                      unit: value,
                    };
                  }

                  return product;
                });

                setProducts(newProducts);
              }}
              className="w-[70%]"
              defaultValue={units?.[0]}
              options={units}
            />
          </Input.Group>
        );
      },
    },
    {
      name: "Total",
      align: "center",
      selector: (row, index) => {
        const qty = row?.qty || 1;
        const unit = row?.unit || row?.attributes?.unit_1;

        return `${qty} ${unit}`;
      },
    },
    {
      width: "250px",
      align: "right",
      selector: (row, index) => {
        return (
          <Button
            onClick={() => {
              const newProducts = products.filter((product) => product.unique_id !== row.unique_id);

              setProducts(newProducts);
            }}
            danger
          >
            Hapus
          </Button>
        );
      },
    },
  ];
  const printColumns = [
    {
      name: "Nama Produk",
      align: "center",
      selector: (row, index) => row.name,
    },
    {
      name: "Kuantitas Transfer",
      align: "center",
      selector: (row) => {
        return `${row?.qty} ${row?.unit}`;
      },
    },
  ];

  const handlePrintData = () => {
    const formValues = form.getFieldsValue();

    console.log("formValues", formValues);
    if (!formValues?.location_recipient || !formValues?.location_sender) {
      notification["error"]({
        message: "Field Kosong",
        description: "Harap pilih lokasi pengirim dan penerima terlebih dahulu",
      });
      return;
    }

    if (products?.length === 0) {
      notification["error"]({
        message: "Field Kosong",
        description: "Harap pilih produk terlebih dahulu",
      });
      return;
    }

    setLoading({ ...loading, print: true });
    setPrintState(true);
  };

  const onFinish = async (values) => {
    setLoading({ ...loading, send: true });

    if (products?.length === 0) {
      notification["error"]({
        message: "Field Kosong",
        description: "Produk tidak boleh kosong",
      });
      return;
    }

    values.date = values?.date?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
    values.location_sender = selectedLocation1?.id;
    values.location_recipient = selectedLocation2?.id;

    try {
      const response = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-requests`;
        const data = {
          ...values,
          product: product.id,
          qty: product.qty,
          unit: product.unit,
          exp_date: product.stock?.[product.unit]?.exp_date || null,
          batch: product.stock?.[product.unit]?.batch || null,
        };
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };

        const res = await fetch(endpoint, headers)
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });

        response.push(res);
      }

      const filteredResponse = response.filter((res) => res.status === "success");

      if (filteredResponse.length === response.length) {
        notification["success"]({
          message: "Berhasil",
          description:
            "Berhasil membuat permintaan produk, harap cek data di 'Daftar Barang Keluar' dan 'Daftar Barang Masuk'",
        });

        form.resetFields();
        setProducts([]);
        setLoading({ ...loading, send: false });
        setOptions({
          ...options,
          products: [],
        });
        setSelectedLocation1(null);
        setSelectedLocation2(null);
      } else {
        console.log("response", response);
        notification["error"]({
          message: "Gagal",
          description: "Gagal membuat permintaan produk, silahkan coba lagi",
        });
      }
    } catch (error) {
      console.log(error);
      notification["error"]({
        message: "Gagal",
        description: "Gagal membuat permintaan produk, silahkan coba lagi",
      });
    }
  };

  const onFinishFailed = () => {
    const error = form.getFieldsError();
    error.forEach((element) => {
      if (element.errors.length > 0) {
        console.log();
        notification["error"]({
          message: "Field Kosong",
          description: element.errors[0],
        });
      }
    });
  };

  useEffect(() => {
    // get latest no_referensi
    async function fetchLatestNoReferensi() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/product-requests?sort[0]=id:desc&pagination[limit]=1`;
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
          console.log(err);
        });

      if (response) {
        const latestId = response.data?.[0]?.id || 1;
        const latestNoReferensi = `MT/${String(latestId).padStart(3, "0")}/${moment().format(
          "DD/MM/YYYY"
        )}`;
        form.setFieldsValue({
          no_referensi: latestNoReferensi,
        });
      }

      console.log("response from fetchLatestNoReferensi", response);
    }

    fetchLatestNoReferensi();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {printState ? (
        <>
          <Head>
            <title>Cetak Kartu Permintaan Transfer Stok</title>
          </Head>
          <div className="px-6 py-3 w-full">
            <div className="flex justify-between items-center mb-5">
              <ArrowLeftOutlined
                title="Kembali"
                className="print:hidden cursor-pointer"
                onClick={() => {
                  setPrintState(false);
                  setLoading({ ...loading, print: false });
                }}
              />
              <button
                onClick={handlePrint}
                class="print:hidden rounded-full bg-sky-400 px-4 py-2 font-bold text-white"
              >
                <span>
                  <PrinterOutlined className="mr-1 text-lg" />
                </span>{" "}
                Cetak Dokumen
              </button>
            </div>

            <div className="w-2/4 mx-auto">
              <p className="text-xl font-bold text-center">BUKTI PERMINTAAN TRANSFER STOK</p>
            </div>

            <div className="w-full flex justify-between">
              <div className="w-2/4 grid grid-cols-2 mb-3">
                <div>
                  <p className="text-sm mb-0 uppercase">Tanggal Dokumen</p>
                  <p className="text-sm mb-0 uppercase">No. Referensi</p>
                  <p className="text-sm mb-0 uppercase">Lokasi Pengirim</p>
                  <p className="text-sm mb-0 uppercase">Lokasi Penerima</p>
                  <p className="text-sm mb-0 uppercase">Deskripsi</p>
                </div>
                <div className="text-right">
                  <p className="text-sm mb-0 font-bold uppercase">
                    {form.getFieldValue("date")?.format("DD/MM/YYYY")}
                  </p>

                  <p className="text-sm mb-0 font-bold uppercase">
                    {form.getFieldValue("no_referensi")}
                  </p>
                  <p className="text-sm mb-0 font-bold uppercase">{selectedLocation1?.name}</p>
                  <p className="text-sm mb-0 font-bold uppercase">{selectedLocation2?.name}</p>
                  <p className="text-sm mb-0 font-bold uppercase">
                    {form.getFieldValue("description")}
                  </p>
                </div>
              </div>

              <p className="uppercase text-sm">
                Cetakan Tanggal : {moment().format("DD/MM/YYYY HH:mm:ss")}
              </p>
            </div>

            <DataTable
              dense
              columns={printColumns}
              data={products}
              keyField="unique_id"
              customStyles={printStyles}
              noDataComponent={`--Harap pilih produk--`}
            />
          </div>
        </>
      ) : (
        <>
          <Head>
            <title>Permintaan Barang</title>
          </Head>
          <DashboardLayout>
            <LayoutWrapper>
              <TitlePage titleText={"Permintaan Barang"} />
              <LayoutContent>
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="lg:w-4/5 w-full mx-auto mb-4">
                    <div className="w-full grid grid-cols-3 mb-3 gap-3">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Tanggal tidak boleh kosong",
                          },
                        ]}
                        initialValue={moment()}
                        name="date"
                        className="m-0"
                      >
                        <DatePicker
                          size="large"
                          placeholder="Tanggal"
                          className="w-full lg:col-span-1 col-span-3"
                        />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "No Referensi tidak boleh kosong",
                          },
                        ]}
                        name="no_referensi"
                        className="m-0"
                      >
                        <Input
                          size="large"
                          placeholder="No Refrensi"
                          className="w-full lg:col-span-1 col-span-3"
                        />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Status tidak boleh kosong",
                          },
                        ]}
                        initialValue="Proses"
                        name="status"
                        className="m-0"
                      >
                        <Select
                          size="large"
                          placeholder="Status"
                          options={[
                            { label: "Proses", value: "Proses" },
                            { label: "Sebagian", value: "Sebagian" },
                            { label: "Selesai", value: "Selesai" },
                          ]}
                          className="w-full lg:col-span-1 col-span-3"
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-3">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Harap pilih lokasi gudang pengirim",
                          },
                        ]}
                        name="location_sender"
                        className="m-0"
                      >
                        <Select
                          onSearch={(value) => {
                            setLoading({ ...loading, location1: true });
                            setLocation1(value);
                          }}
                          onSelect={(value) => {
                            const selectedLocation = JSON.parse(value);
                            setSelectedLocation1(selectedLocation);
                          }}
                          value={selectedLocation1}
                          placeholder="Lokasi Gudang Pengirim"
                          showSearch
                          filterOption={false}
                          size="large"
                          loading={loading.location1}
                          options={options.location1}
                        />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Harap pilih lokasi gudang penerima",
                          },
                        ]}
                        name="location_recipient"
                        className="m-0"
                      >
                        <Select
                          onSearch={(value) => {
                            setLoading({ ...loading, location2: true });
                            setLocation2(value);
                          }}
                          onSelect={(value) => {
                            const selectedLocation = JSON.parse(value);
                            setSelectedLocation2(selectedLocation);
                          }}
                          value={selectedLocation2}
                          placeholder="Lokasi Gudang Penerima"
                          showSearch
                          filterOption={false}
                          size="large"
                          loading={loading.location2}
                          options={options.location2}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <p className="uppercase text-[#036B82] font-bold text-xl mb-1">Produk Transfer</p>
                  <Select
                    disabled={!selectedLocation1}
                    onSearch={(value) => {
                      setLoading({ ...loading, product: true });
                      setSearchProduct(value);
                    }}
                    onSelect={(value) => {
                      const selectedProduct = JSON.parse(value);
                      selectedProduct.unique_id = generateRandomId();
                      setProducts([...products, selectedProduct]);
                    }}
                    value={null}
                    size="large"
                    placeholder={
                      !selectedLocation1 ? "Pilih lokasi gudang pengirim" : "Pilih produk"
                    }
                    filterOption={false}
                    showSearch
                    className={`w-full mb-3 border-[3px] rounded-lg ${
                      !selectedLocation1 ? "" : "hover:border-[#036B82] border-[#036B82]"
                    }`}
                    loading={loading.product}
                    options={options.products}
                  />

                  <DataTable
                    columns={columns}
                    data={products}
                    keyField="unique_id"
                    customStyles={customStyles}
                    noDataComponent={`--Harap pilih produk--`}
                  />

                  <Form.Item name="description" className="m-0">
                    <Input.TextArea className="mt-5 w-full" placeholder="Deskripsi" rows={5} />
                  </Form.Item>

                  <div className="w-full flex item-center gap-3 mt-5 justify-center">
                    {loading.send ? (
                      <Spin />
                    ) : (
                      <button
                        type="submit"
                        className="bg-cyan-700 lg:w-2/5 w-2/4 hover:bg-cyan-700/80 duration-150 rounded-md m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-white">KIRIM</p>
                      </button>
                    )}
                    {loading.cetak ? (
                      <Spin />
                    ) : (
                      <button
                        type="button"
                        onClick={handlePrintData}
                        className="bg-cyan-700 lg:w-2/5 w-2/4 hover:bg-cyan-700/80 duration-150 rounded-md m-1 text-sm"
                      >
                        <p className="px-4 py-2 m-0 text-white">CETAK</p>
                      </button>
                    )}
                  </div>
                </Form>
              </LayoutContent>
            </LayoutWrapper>
          </DashboardLayout>
        </>
      )}
    </>
  );
}