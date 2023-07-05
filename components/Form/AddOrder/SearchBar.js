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
  selectedProduct,
  user,
  isBasedOnLocation = true,
  available = false,
  inventoryLocation,
  getProductAtLocation,
  location,
  disabled = false,
}) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const productList = [];

  const handleChange = async (id) => {};

  const handleSelect = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log("select product ==>", res);

    if (res) {
      dispatch({ type: "ADD_PRODUCT", product: res.data });
      getProductAtLocation(1, res.data.id);
      form.setFieldsValue({ products: undefined });
    }
  };

  const getUserInfo = async () => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/users/me?populate=*`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    const locationData = res.locations.map((location, idx) => {
      return `filters[$or][${idx}][locations][id][$eq]=${location?.id}`;
    });
    // console.log("querylocation " + queryLocations);
    return locationData.join("&");
  };

  const handleSearch = (newValue) => {
    if (newValue) {
      fetchProduct(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const fetchProduct = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        let queryLocations = await getUserInfo();

        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/products?populate=*&filters[name][$contains]=${query}&${queryLocations}${
            available && inventoryLocation
              ? `&filters[locations][inventories][total_stock][$gt]=0&filters[locations][id][$eq]=${inventoryLocation}`
              : ""
          }`;
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
          const filteredProductByLocation = res.data.filter((item) =>
            item.attributes.locations.data.some((location) =>
              user.locations.some((userLocation) => userLocation.id === location.id)
            )
          );

          const products = filteredProductByLocation.map((product) => ({
            label: `${product.attributes.name}`,
            value: product.id,
          }));

          callback(products);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-full mb-2 md:mb-0">
        <Form.Item name="products">
          <Select
            disabled={disabled}
            allowClear
            size="large"
            showSearch
            value={product}
            placeholder={disabled ? "Pilih lokasi gudang terlebih dahulu" : "Ketikan Nama Produk / SKU"}
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
