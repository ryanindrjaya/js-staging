import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, DatePicker, Form, Input, InputNumber, Select, Spin, notification } from "antd";
import moment from "moment";
import useDebounce from "../../../../hooks/useDebounce";
import nookies from "nookies";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import getUserCodeName from "../../../../library/functions/getUserCodeName";
import { addToGudang } from "../../../../library/functions/createInventory";
import confirm from "antd/lib/modal/confirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const requiredRules = [{ required: true, message: "Field ini wajib diisi" }];

export default function tambahPenyesuaian() {
  const { token } = nookies.get();
  const [loading, setLoading] = useState({
    location: false,
    submit: false,
    product: false,
  });
  const [options, setOptions] = useState({
    location: [],
    products: [],
  });
  const [method, setMethod] = useState(); // ["add", "subtract"]
  const [location, setLocation] = useState("");
  const debouncedLocation = useDebounce(location, 200);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const debounceProducts = useDebounce(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const [form] = Form.useForm();

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
  }, [debouncedLocation]);

  // get latest no_referensi
  async function fetchLatestNoReferensi() {
    const codename = await getUserCodeName();

    const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustments?sort[0]=id:desc&pagination[limit]=1&filters[no_referensi][$contains]=${codename}/SA/`;
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
      const latestDaata = response.data?.[0];
      const no = parseInt(latestDaata?.attributes?.no_referensi?.split("/")?.[2] || 0) + 1;
      console.log("no", no);
      const latestNoReferensi = `${codename}/SA/${String(no).padStart(5, "0")}/${moment().format("MM/YYYY")}`;
      form.setFieldsValue({
        no_referensi: latestNoReferensi,
      });
      return latestNoReferensi;
    }

    console.log("response from fetchLatestNoReferensi", response);
  }

  useEffect(() => {
    fetchLatestNoReferensi();
  }, []);

  const generateRandomId = () => {
    return moment().unix();
  };

  useEffect(() => {
    async function fetchProducts() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories/stock?location=${selectedLocation?.id}&query=${debounceProducts}`;
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

      console.log("fetch product", response);
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

      console.log("response from fetchProducts", response);
    }

    if (selectedLocation && debounceProducts) {
      fetchProducts();
    }
  }, [debounceProducts]);

  useEffect(() => {
    if (products?.length > 0) {
      let total_return = 0;
      products.forEach((product) => {
        const qty = product?.qty || 1;
        const buy_price = product?.buy_price?.[product.unit] || 0;
        total_return += qty * buy_price;
      });

      form.setFieldsValue({
        total_return,
      });
    }
  }, [products]);

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };
  const columns = [
    {
      name: "Nama Produk",
      align: "center",
      wrap: true,
      selector: (row, index) => row.name,
    },
    {
      name: "Stok Gudang",
      align: "center",
      omit: method === "add",

      selector: (row, index) => (
        <span className={row?.stock?.[row?.unit]?.qty > 0 ? "" : "text-red-500"}>
          {row?.stock?.[row?.unit]?.qty || 0} {row?.unit || ""}
        </span>
      ),
    },
    {
      name: "Qty Penyesuaian",
      align: "center",
      selector: (row, index) => {
        let maxQty = row?.stock?.[row?.unit]?.qty;
        const units = row.available_units.map((unit) => ({
          label: unit,
          value: unit,
        }));

        const sameData = products.filter(
          (product, productIdx) => product.id === row.id && product.unit === row.unit && productIdx !== index
        );

        if (sameData.length > 0) {
          sameData.forEach((data) => {
            maxQty -= data.qty;
          });
        }

        const max = maxQty > 0 ? maxQty : 0;

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
              max={method === "subtract" ? max : undefined}
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
      name: "Nilai Satuan",
      align: "center",
      selector: (row, index) => {
        return (
          <InputNumber
            onChange={(value) => {
              const newProducts = products.map((product, productIdx) => {
                if (productIdx === index) {
                  return {
                    ...product,
                    buy_price: {
                      ...product.buy_price,
                      [product.unit]: value,
                    },
                  };
                }

                return product;
              });

              setProducts(newProducts);
            }}
            value={row?.buy_price?.[row?.unit] || 0}
            min={0}
            className="w-full"
            formatter={(value) =>
              parseFloat(value)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        );
      },
    },
    {
      name: "Nilai Subtotal",
      align: "center",
      selector: (row, index) => {
        const qty = row?.qty || 1;
        const buy_price = row?.buy_price?.[row?.unit] || 0;
        return (
          <InputNumber
            disabled
            value={qty * buy_price}
            min={0}
            className="w-full"
            formatter={(value) =>
              parseFloat(value)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        );
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

  const getUserData = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_URL}/users/me`;
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
      return response;
    }
  };

  const onFinish = async (values) => {
    setLoading({ ...loading, submit: true });

    if (products?.length === 0) {
      notification["error"]({
        message: "Field Kosong",
        description: "Produk tidak boleh kosong",
      });
      return;
    }
    values.no_referensi = await fetchLatestNoReferensi();
    values.date = values?.date?.format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
    values.location = selectedLocation?.id;

    try {
      const detailIds = [];
      const dataInventory = [];

      // create inventory adjustment details
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustment-details`;
        const data = {
          product: product.id,
          qty: product.qty,
          unit: product.unit,
          exp_date: product.stock?.[product.unit]?.exp_date || null,
          batch: product.stock?.[product.unit]?.batch || null,
          type: method === "add" ? "Penyesuaian Masuk" : "Penyesuaian Stok",
          no_referensi: values.no_referensi,
          location: selectedLocation?.id,
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

        console.log("res detail", res);
        if (res?.id) {
          detailIds.push(res?.id);
        }

        const itemInventory = {
          location: selectedLocation?.id,
          product: product.id,
          unit: product.unit,
          qty: product.qty,
          exp_date: product.stock?.[product.unit]?.exp_date,
          batch: product.stock?.[product.unit]?.batch,
        };

        dataInventory.push(itemInventory);
      }

      console.log("dataInventory", dataInventory);

      if (detailIds.length > 0) {
        const user = await getUserData();
        const body = {
          data: dataInventory,
          no_referensi: values.no_referensi,
          type: method === "add" ? "Penyesuaian Masuk" : "Penyesuaian Stok",
          keterangan: `Penyesuaian Stok (${method === "add" ? "Bertambah" : "Berkurang"})`,
          author: user,
        };

        const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventory-adjustments`;
        const data = {
          data: {
            ...values,
            details: detailIds,
          },
        };

        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };

        const response = await fetch(endpoint, headers)
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("response create master", response);

        if (response?.data?.id) {
          await addToGudang(body, method);
          notification["success"]({
            message: "Berhasil",
            description: "Berhasil membuat penyesuaian stok, harap cek halaman penyesuaian stok untuk melihat detail",
          });

          form.resetFields();
          setProducts([]);
          setLoading({ ...loading, submit: false });
          setOptions({
            ...options,
            products: [],
          });
          setSelectedLocation(null);
          await fetchLatestNoReferensi();

          router.replace(
            {
              pathname: "/dashboard/stok/penyesuaian",
            },
            undefined,
            { shallow: true }
          );
        } else {
          console.log("response", response);
          setLoading({ ...loading, submit: false });

          notification["error"]({
            message: "Gagal",
            description: "Gagal membuat permintaan produk, silahkan coba lagi",
          });
        }
      } else {
        setLoading({ ...loading, submit: false });

        notification["error"]({
          message: "Gagal",
          description: "Gagal membuat permintaan produk, silahkan coba lagi",
        });
      }
    } catch (error) {
      setLoading({ ...loading, submit: false });

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

  return (
    <>
      <Head>
        <title>Tambah Penyesuaian Stok</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage titleText={"Tambah Penyesuaian Stok"} />
          <LayoutContent>
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                confirm({
                  title: "Apakah anda yakin?",
                  icon: <ExclamationCircleOutlined />,
                  content: "Harap periksa kembali data yang telah diinput.",
                  okText: "Ya",
                  okType: "danger",
                  cancelText: "Tidak",
                  centered: true,
                  onOk() {
                    onFinish(values);
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              onFinishFailed={onFinishFailed}
            >
              <div className="w-full grid grid-cols-4 gap-3">
                <Form.Item rules={requiredRules} initialValue={moment()} name="date">
                  <DatePicker size="large" className="w-full" />
                </Form.Item>
                <Form.Item rules={requiredRules} name="no_referensi">
                  <Input size="large" placeholder="No Referensi" />
                </Form.Item>
                <Form.Item rules={requiredRules} name="status">
                  <Select
                    size="large"
                    placeholder="Status"
                    options={[
                      { label: "Normal", value: "Normal" },
                      { label: "Abnormal", value: "Abnormal" },
                    ]}
                  />
                </Form.Item>
                <Form.Item rules={requiredRules} name="location">
                  <Select
                    onSearch={(value) => {
                      setLoading({ ...loading, location: true });
                      setLocation(value);
                    }}
                    onSelect={(value) => {
                      const selectedLocation = JSON.parse(value);
                      console.log("selectedLocation", selectedLocation);
                      setSelectedLocation(selectedLocation);
                    }}
                    value={selectedLocation}
                    placeholder="Lokasi Gudang"
                    showSearch
                    filterOption={false}
                    size="large"
                    loading={loading.location}
                    options={options.location}
                  />
                </Form.Item>
              </div>
              <div className="w-full grid grid-cols-4 gap-3 mb-4">
                <div className="col-span-3 w-full"></div>
                <Form.Item rules={requiredRules} name="adjustment">
                  <Select
                    onChange={(value) => {
                      setMethod(value);
                    }}
                    placeholder="Penyesuaian Stok"
                    size="large"
                    options={[
                      {
                        label: "Stok Bertambah",
                        value: "add",
                      },
                      {
                        label: "Stok Berkurang",
                        value: "subtract",
                      },
                    ]}
                  />
                </Form.Item>
              </div>

              <span className="uppercase text-[#036B82] font-bold text-xl mb-1">Produk Penyesuaian</span>
              <Select
                disabled={!selectedLocation}
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
                placeholder={!selectedLocation ? "Pilih lokasi gudang" : "Pilih produk"}
                filterOption={false}
                showSearch
                className={`w-full mb-3 border-[3px] rounded-lg ${
                  !selectedLocation ? "" : "hover:border-[#036B82] border-[#036B82]"
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

              <div className="w-full mt-5 flex gap-2">
                <div className="w-full flex flex-col justify-between md:w-1/4">
                  <div>
                    <p className="m-0 font-bold text-md">JUMLAH TOTAL NILAI PERSEDIAAN</p>
                    <p className="m-0">Jumlah yang di peroleh dari asuransi atau memo lainnya</p>
                  </div>

                  <Form.Item rules={requiredRules} className="m-0" name="total_return">
                    <InputNumber
                      disabled
                      prefix="Rp. "
                      className="w-full mt-2"
                      placeholder="Jumlah Total Nilai Persediaan"
                      min={0}
                      formatter={(value) =>
                        parseFloat(value)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>
                <Form.Item rules={requiredRules} name="reason" className="m-0 w-full  md:w-3/4">
                  <Input.TextArea className="h-full w-full" placeholder="Alasan" rows={5} />
                </Form.Item>
              </div>
              <div className="w-full flex item-center gap-3 mt-5 justify-center">
                {loading.submit ? (
                  <Spin />
                ) : (
                  <button
                    type="submit"
                    className="bg-cyan-700 lg:w-2/5 w-2/4 hover:bg-cyan-700/80 duration-150 rounded-md m-1 text-sm"
                  >
                    <p className="px-4 py-2 m-0 text-white">SIMPAN</p>
                  </button>
                )}
              </div>
            </Form>
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
