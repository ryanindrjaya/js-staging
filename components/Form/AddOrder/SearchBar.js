import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";


import nookies from "nookies";

export default function SearchBar({ form, tempList, onChange }) {
  const [product, setProduct] = useState();
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const productList = [];

  const handleChange = async (id) => {
    // console.log(id);
    // const endpoint = process.env.NEXT_PUBLIC_DB + `/products/${id}`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + cookies.token,
    //   },
    // };
    // const req = await fetch(endpoint, options);
    // const res = await req.json();
    // if (res) {
    //   setProduct();
    //   productList.push(res.data);
    //   console.log(productList);
    //   //   onSetProductList(productList);
    //   form.setFieldsValue({ products: undefined });
    //   toast.success("Produk berhasil ditambahkan!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 1000,
    //   });
    // }
  };

  const handleSelect = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DB + `/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (res) {
      setProduct();
      tempList.push(res.data);
      onChange();
      form.setFieldsValue({ products: undefined });
    }
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchProduct(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchProduct = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_DB +
          `/products?filters[$or][0][name][$contains]=${query}&filters[$or][1][SKU][$contains]=${query}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        if (req.status == 200) {
          const products = res.data.map((product) => ({
            label: `${product.attributes.name} (${product.attributes.SKU})`,
            value: product.id,
          }));

          callback(products);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        <Form.Item name="products">
          <Select
            allowClear
            size="large"
            showSearch
            value={product}
            placeholder="Ketikan Nama Produk / SKU"
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={handleSelect}
            filterOption={false}
            defaultActiveFirstOption={false}
            suffixIcon={<CaretDownOutlined />}
            style={{ width: "100%" }}
          >
            {options}
          </Select>
        </Form.Item>
      </div>
    </>
  );
}
