import React, { useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import nookies from "nookies";
import { Form, Select } from "antd";

function SearchOrder({ customer, handleSelect, disabled }) {
  const cookies = nookies.get(null, "token");
  const [data, setData] = useState([]);
  const [poData, setPoData] = useState();

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchPO(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const fetchPO = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      let customerId = customer?.id;

      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/sales-sells/?populate=deep&filters[status][$eq]=Sebagian Diterima&filters[status][$eq]=Diproses&filters[customer][id][$eq]=${customerId}&filters[no_sales_sell][$contains]=${query}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("result fetch no_sales_sell", query, res);

        if (req.status == 200) {
          const po = res?.data?.map((po) => ({
            label: `${po.attributes.no_sales_sell}`,
            value: po.id,
          }));

          callback(po);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form.Item required name="no_sales_sell">
      <Select
        disabled={disabled}
        allowClear
        size="large"
        showSearch
        value={poData}
        placeholder="Ketikan Nomor Order Penjualan"
        onSearch={handleSearch}
        onSelect={handleSelect}
        filterOption={false}
        defaultActiveFirstOption={false}
        suffixIcon={<CaretDownOutlined />}
        style={{ width: "100%" }}
      >
        {options}
      </Select>
    </Form.Item>
  );
}

export default SearchOrder;
