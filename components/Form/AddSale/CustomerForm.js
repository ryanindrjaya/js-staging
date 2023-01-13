import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Customer({ onChangeCustomer }) {
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/customers/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    onChangeCustomer(res.data);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchCustomer(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchCustomer = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/customers?filters[$or][0][name][$contains]=${query}&filters[$or][1][type][$contains]=${query}`;
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
          const customerResult = res.data.map((customer) => ({
            label: `${customer.attributes.name} - ${customer.attributes.type}`,
            value: customer.id,
          }));

          callback(customerResult);
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
          rules={[
            {
              required: true,
              message: "Supplier tidak boleh kosong!",
            },
          ]}
        >
          <Select
            size="large"
            showSearch
            placeholder="Pilih Customer"
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
