import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Customer({ onChangeCustomer, customer, disabled, fetching, page }) {
  console.log("data customer", customer);
  const [data, setData] = useState(
    customer
      ? [
          {
            label: customer.attributes.name,
            value: customer.id,
          },
        ]
      : []
  );
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/customers/${id}?populate=deep`;
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
      fetchCustomer(newValue, setData, page);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const fetchCustomer = async (query, callback, page) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/customers?filters[$or][0][name][$contains]=${query}&filters[$and][1][tipe_penjualan_query][$contains]=${page}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("res customer", res);

        if (req.status == 200) {
          const customerResult =
            res.data?.map((customer) => ({
              label: `${customer.attributes.name}`,
              value: customer.id,
            })) || [];

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
        {customer && !fetching ? (
          <Form.Item
            initialValue={customer.id}
            name="customer"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Customer tidak boleh kosong!",
              },
            ]}
          >
            <Select
              disabled={disabled}
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
        ) : (
          <Form.Item
            name="customer"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Customer tidak boleh kosong!",
              },
            ]}
          >
            <Select
              disabled={disabled}
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
        )}
      </div>
    </>
  );
}
