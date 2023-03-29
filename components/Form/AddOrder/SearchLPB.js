import React, { useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import nookies from "nookies";
import { Form, Select } from "antd";

const fetchLPBById = async (id, callback) => {
  const cookies = nookies.get(null, "token");
  const endpoint =
    process.env.NEXT_PUBLIC_URL + `/purchasings/${id}?populate=deep`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.token,
    },
  };

  const req = await fetch(endpoint, options);
  const res = await req.json();

  console.log("lpb detail ", res.data);
  callback(res.data);
};

function SearchLPB({ supplier, handleSelect, disabled }) {
  const cookies = nookies.get(null, "token");
  const [data, setData] = useState([]);
  const [lpbData, setlpbData] = useState();

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchLPB(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchLPB = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      let supplierName = supplier?.attributes?.name;

      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/purchasings/?populate=deep&filters[status_pembayaran][$eq]=Belum Lunas&filters[supplier][name][$eq]=${supplierName}&filters[no_purchasing][$contains]=${query}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("result lpb", query, res);

        if (req.status == 200) {
          const lpb = res?.data?.map((lpb) => ({
            label: `${lpb.attributes.no_purchasing}`,
            value: lpb.id,
          }));

          callback(lpb);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form.Item required name="no_purchasing">
      <Select
        disabled={disabled}
        allowClear
        size="large"
        showSearch
        value={lpbData}
        placeholder="Ketikan Nomor LPB"
        onSearch={handleSearch}
        onSelect={(e) => {
          fetchLPBById(e, handleSelect);
        }}
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

export default SearchLPB;
