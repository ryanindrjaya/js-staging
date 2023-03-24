import React, { useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import nookies from "nookies";
import { Form, Select } from "antd";

function SearchPO({ supplier, handleSelect, disabled }) {
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

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchPO = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      let supplierName = supplier?.attributes?.name;

      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/purchases/?populate=deep&filters[status][$eq]=Sebagian Diterima&filters[status][$eq]=Diproses&filters[supplier][name][$eq]=${supplierName}`;
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
          const po = res?.data?.map((po) => ({
            label: `${po.attributes.no_po}`,
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
    <Form.Item required name="no_po">
      <Select
        disabled={disabled}
        allowClear
        size="large"
        showSearch
        value={poData}
        placeholder="Ketikan Nomor PO"
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

export default SearchPO;
