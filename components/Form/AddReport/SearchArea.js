import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Area({ onChangeArea }) {
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/areas/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    onChangeArea(res.data);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchArea(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchArea = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/areas?filters[$or][0][name][$contains]=${query}&filters[$or][1][code][$contains]=${query}`;
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
          const areaResult = res.data.map((area) => ({
            //label: `${supplier.attributes.id_supplier} - ${supplier.attributes.name}`,
            label: `${area.attributes.name}`,
            value: area.id,
          }));

          callback(areaResult);
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
          name="area_id"
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
            placeholder="Pilih Area"
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
