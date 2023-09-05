import React, { useEffect, useState } from "react";
import { Form, Select, message } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import nookies from "nookies";
import action from "@iso/redux/application/order/action";
import { useDispatch } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";

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
  const [userLocations, setUserLocations] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceQuery = useDebounce(query, 500);
  const [product, setProduct] = useState();
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");
  const productList = [];

  const handleChange = async (id) => {};

  useEffect(() => {
    getUserInfo();
  }, []);

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
      if (getProductAtLocation) {
        getProductAtLocation(1);
      }
      form.setFieldsValue({ products: undefined });
    }
  };

  useEffect(() => {
    if (loading) {
      message.loading({ content: "Mengambil data...", key: "loading", duration: 5000 });
    } else {
      message.destroy("loading");
    }
  }, [loading]);

  const getUserInfo = async () => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/users/me?populate=locations`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };
    const req = await fetch(endpoint, options);
    const res = await req.json();

    const locationData = [];

    for (let idx = 0; idx < res.locations.length; idx++) {
      const location = res.locations[idx];

      locationData.push(`filters[$or][${idx}][locations][id][$eq]=${location?.id}`);
    }

    // console.log("querylocation " + queryLocations);
    setUserLocations(locationData.join("&"));
  };

  useEffect(() => {
    if (debounceQuery) {
      fetchProduct(debounceQuery, (data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [debounceQuery]);

  const handleSearch = (newValue) => {
    if (newValue) {
      setLoading(true);
      setQuery(newValue);
    } else {
      setData([]);
      setQuery("");
    }
  };

  const options = data.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const fetchProduct = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL +
          `/products?populate=locations&filters[name][$contains]=${query}&${userLocations}`;
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
            loading={loading}
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
