import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Sales({ onChangeSales }) {
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/users/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);

    if (req.status == 200) {
      const res = await req.json();

      onChangeSales(res);
    }
    
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchSales(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchSales = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/users?filters[$or][0][name][$contains]=${query}`;
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
          const userResult = res.map((user) => ({
            //label: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
            label: `${user.name}`,
            value: user.id,
          }));

          callback(userResult);
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
          name="sales"
          style={{ width: "100%" }}
          //rules={[
          //  {
          //    required: true,
          //    message: "Supplier tidak boleh kosong!",
          //  },
          //]}
        >
          <Select
            allowClear
            size="large"
            showSearch
            placeholder="Pilih Sales"
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
