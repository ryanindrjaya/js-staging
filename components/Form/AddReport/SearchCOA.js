import React, { useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import nookies from "nookies";
import action from "@iso/redux/application/order/action";
import { useDispatch } from "react-redux";

const { addProduct } = action;

export default function SearchBar({
  form,
  tempList,
  onChange,
  selectedAkun,
  user,
  isBasedOnLocation = true,
  available = false,
  inventoryLocation,
  getProductAtLocation,
  location,
  disabled = false,
  page
}) {
  const dispatch = useDispatch();

  const [akun, setAkun] = useState(selectedAkun);
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const productList = [];

  const handleChange = async (id) => {onChange()};

  const handleSelect = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/chart-of-accounts/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    //console.log("select COA ==>", res.data, req.status);
    if(req.status == 200) onChange(res.data);
    if (res) {
      dispatch({ type: "ADD_AKUN_COA", akun: res.data });
      //form.setFieldsValue({ akun: undefined });

      // console.log("======= exce =======", getProductAtLocation);
      // if (getProductAtLocation) {
      //  getProductAtLocation(location);
      // }
    }
  };

  //const getUserInfo = async () => {
  //  const endpoint = process.env.NEXT_PUBLIC_URL + `/users/me?populate=*`;
  //  const options = {
  //    method: "GET",
  //    headers: {
  //      "Content-Type": "application/json",
  //      Authorization: "Bearer " + cookies.token,
  //    },
  //  };
  //  const req = await fetch(endpoint, options);
  //  const res = await req.json();

  //  const locationData = res.locations.map((location, idx) => {
  //    return `filters[$or][${idx}][locations][id][$eq]=${location?.id}`;
  //  });
  //  // console.log("querylocation " + queryLocations);
  //  return locationData.join("&");
  //};

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchCOA(newValue, setData, page);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => (
    <Select.Option key={d.value}>{d.label}</Select.Option>
  ));

  const fetchCOA = async (query, callback, page) => {
    if (!query) {
      callback([]);
    } else {
      try {
        var url = `/chart-of-accounts?populate=*&filters[kode][$contains]=${query}`;
        if(page == "hutang"){
          url += "&filters[jenis_akun][$eq]=true";
        } else if (page == "piutang"){
          url += "&filters[jenis_akun][$eq]=false";
        } else {
          
        };

        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          url;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("endpoint", endpoint);

        if (req.status == 200) {
          const dataAkun = res.data.filter((item) => item);
          const akun = dataAkun.map((item) =>
          ({
            label: `${item.attributes.kode} - ${item.attributes.nama}`,
            value: item.id,
          }));

          callback(akun);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        <Form.Item name="akun">
          <Select
            disabled={disabled}
            allowClear
            size="large"
            showSearch
            value={akun}
            placeholder={disabled ? "Pilih akun terlebih dahulu" : "Ketikan Akun yang dicari"}
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={handleSelect}
            filterOption={false}
            defaultActiveFirstOption={false}
            suffixIcon={<CaretDownOutlined />}
            style={{ width: "100%" }}
          >
            {options}
          </Select>
        </Form.Item>
      </div>
    </>
  );
}
