import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Supplier({ onChangeSupplier }) {
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/suppliers/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    onChangeSupplier(res.data);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchSupplier(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchSupplier = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/suppliers?filters[$or][0][name][$contains]=${query}&filters[$or][1][id_supplier][$contains]=${query}`;
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
          const supplierResult = res.data.map((supplier) => ({
            label: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
            value: supplier.id,
          }));

          callback(supplierResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        <Form.Item
          name="supplier_id"
          style={{ width: "100%" }}
          //rules={[
          //  {
          //    required: true,
          //    message: "Supplier tidak boleh kosong!",
          //  },
          //]}
        >
          <Select
            size="large"
            showSearch
            allowClear
            placeholder="Pilih Supplier"
            onSearch={handleSearch}
            onChange={handleChange}
            filterOption={false}
            defaultActiveFirstOption={false}
            suffixIcon={<CaretDownOutlined />}
          >
            {options}
          </Select>
        </Form.Item>
      </div>
    </>
  );
}
