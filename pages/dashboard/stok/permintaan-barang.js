import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@iso/containers/DashboardLayout/DashboardLayout";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "@iso/components/TitlePage/TitlePage";
import { Button, DatePicker, Input, InputNumber, Select } from "antd";
import useDebounce from "../../../hooks/useDebounce";
import nookies from "nookies";
import { SearchOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";

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
            value: id,
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
        setLoading({ ...loading, location2: false });
        setOptions({
          ...options,
          location2: response.data.map(({ id, attributes }) => ({
            label: attributes.name,
            value: id,
          })),
        });
      }

      console.log("response from fetchOptions 2", response);
    }

    fetchLocations();
  }, [debouncedLocation2]);

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  useEffect(() => {
    async function fetchProducts() {
      const endpoint = `${process.env.NEXT_PUBLIC_URL}/inventories/stock?location=${selectedLocation1}&query=${debounceProducts}`;
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
              unique_id: Math.random().toString(36),
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

  const getProductUnits = (product, unit) => {
    const units = [];

    for (let i = 1; i < 6; i++) {
      if (unit === product.attributes?.[`unit_${i}`]) {
        units.push({
          label: product.attributes?.[`unit_${i}`],
          value: product.attributes?.[`unit_${i}`],
        });
      }
    }

    return units;
  };

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

  return (
    <>
      <Head>
        <title>Permintaan Barang</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <TitlePage titleText={"Permintaan Barang (WIP)"} />
          <LayoutContent>
            <div className="lg:w-4/5 w-full mx-auto mb-4">
              <div className="w-full grid grid-cols-3 mb-3 gap-3">
                <DatePicker
                  size="large"
                  placeholder="Tanggal"
                  className="w-full lg:col-span-1 col-span-3"
                />
                <Input
                  size="large"
                  placeholder="No Refrensi"
                  className="w-full lg:col-span-1 col-span-3"
                />
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
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Select
                  onSearch={(value) => {
                    setLoading({ ...loading, location1: true });
                    setLocation1(value);
                  }}
                  onSelect={(value) => {
                    setSelectedLocation1(value);
                  }}
                  value={selectedLocation1}
                  placeholder="Lokasi Gudang Pengirim"
                  showSearch
                  filterOption={false}
                  size="large"
                  loading={loading.location1}
                  options={options.location1}
                />
                <Select
                  onSearch={(value) => {
                    setLoading({ ...loading, location2: true });
                    setLocation2(value);
                  }}
                  onSelect={(value) => {
                    setSelectedLocation2(value);
                  }}
                  value={selectedLocation2}
                  placeholder="Lokasi Gudang Penerima"
                  showSearch
                  filterOption={false}
                  size="large"
                  loading={loading.location2}
                  options={options.location2}
                />
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
                setProducts([...products, JSON.parse(value)]);
              }}
              value={null}
              size="large"
              placeholder={!selectedLocation1 ? "Pilih lokasi gudang pengirim" : "Pilih produk"}
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

            <Input.TextArea className="mt-5 w-full" placeholder="Keterangan" rows={5} />
          </LayoutContent>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
}
