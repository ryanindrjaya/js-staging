import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import nookies from "nookies";

export default function Supplier({ onChangeLocations, locations, fetching, disabled }) {
  const [data, setData] = useState(
    locations
      ? [
          {
            label: `${locations.attributes.id_supplier} - ${locations.attributes.name}`,
            value: locations.id,
          },
        ]
      : []
  );
  const cookies = nookies.get(null, "token");
  const order = useSelector((state) => state.Order);

  const handleChange = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/locations/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    onChangeLocations(res.data);
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchSupplier(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value} value={d.value}>
      {d.label}
    </Select.Option>
  ));

  const fetchSupplier = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/locations?filters[$or][0][name][$contains]=${query}&filters[$or][1][location_id][$contains]=${query}`;
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
          const locationsResult = res.data.map((locations) => ({
            label: `${locations.attributes.location_id} - ${locations.attributes.name}`,
            value: locations.id,
          }));

          callback(locationsResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        {locations && !fetching ? (
          <Form.Item
            initialValue={supplier.id}
            name="location_id"
            style={{ width: "100%" }}
          >
            <Select
              disabled={disabled}
              size="large"
              showSearch
              placeholder="Lokasi Gudang"
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
            name="location_id"
            style={{ width: "100%" }}
          >
            <Select
            disabled={disabled}
              size="large"
              showSearch
              placeholder="Lokasi Gudang"
              onSearch={handleSearch}
              onChange={handleChange}
              filterOption={false}
              defaultActiveFirstOption={false}
              suffixIcon={<CaretDownOutlined />}
              allowClear
            >
              {options}
            </Select>
          </Form.Item>
        )}
      </div>
    </>
  );
}
