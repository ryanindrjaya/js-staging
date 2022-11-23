import React, { useState } from "react";
import { Form, Select } from "antd";
import nookies from "nookies";

export default function Categories({
  selectedCategory,
  onSelectCategory,
  setSubCategories,
  setSelectedSubCategory,
  selectedSubCategory,
  initialValue,
}) {
  const [category, setCategory] = useState(selectedCategory);
  const [data, setData] = useState([]);
  const cookies = nookies.get(null, "token");

  const fetchSubCategoriesById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + `/sub-categories?populate[category][filters][id][$eq]=${id}&populate=*`;

    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    const listOfData = [];

    res.data.forEach((element) => {
      if (element.attributes.category.data !== null) {
        listOfData.push(element);
      }
    });

    setSubCategories(listOfData);
  };

  const handleChangeCategory = (newValue) => {
    setSelectedSubCategory(0);
    fetchSubCategoriesById(newValue);

    setCategory(newValue);
    onSelectCategory(newValue);
  };

  const handleSearchCategory = (newValue) => {
    if (newValue) {
      fetchCategory(newValue, setData);
    } else {
      setData([]);
    }
  };

  const options = data.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const fetchCategory = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL + `/categories?filters[$or][0][name][$contains]=${query}&filters[$or][1][category_id][$contains]=${query}`;
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
          const categoriesResult = res.data.map((categories) => ({
            label: `${categories.attributes.category_id} - ${categories.attributes.name}`,
            value: categories.id,
          }));

          callback(categoriesResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={initialValue}
        name="category_id"
        rules={[
          {
            required: true,
            message: "Kategori Produk tidak boleh kosong!",
          },
        ]}
      >
        <Select
          size="large"
          showSearch
          value={category}
          showArrow={false}
          placeholder="Pilih Kategori"
          onSearch={handleSearchCategory}
          onChange={handleChangeCategory}
          filterOption={false}
          defaultActiveFirstOption={false}
        >
          {options}
        </Select>
      </Form.Item>
    </div>
  );
}
