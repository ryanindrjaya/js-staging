import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

import nookies from "nookies";

export default function Customer({ onChangeCustomer }) {
  const [options, setOptions] = useState([]);
  const cookies = nookies.get(null, "token");

  const handleChange = async (id) => {
    console.log("id", id);
    try {
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

      console.log("select customer ==>", res);

      onChangeCustomer(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchCustomer(newValue);
    }
  };

  const fetchCustomer = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/customers?filters[$or][0][name][$contains]=${query}&filters[$or][1][customer_type][$contains]=${query}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();
        console.log("customer", res);

        if (req.status == 200) {
          const customerResult = res.data.map((customer) => ({
            label: `${customer.attributes.name}`,
            value: customer.id,
          }));

          setOptions(customerResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        <Form.Item name="customer" style={{ width: "100%" }}>
          <Select
            allowClear
            size="large"
            showSearch
            options={options}
            placeholder="Pilih Customer"
            onSearch={handleSearch}
            onSelect={handleChange}
            filterOption={false}
            defaultActiveFirstOption={false}
            suffixIcon={<CaretDownOutlined />}
          />
        </Form.Item>
      </div>
    </>
  );
}
