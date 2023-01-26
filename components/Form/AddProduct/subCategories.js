import { Form, Select, Button } from "antd";
import { useState } from "react";
import nookies from "nookies";

export default function subCategories({
  category,
  subCategories,
  onSelect,
  selectedSubCategory,
  initialValue,
}) {
  const [filteredSubCategories, setFilteredSubCategories] =
    useState(subCategories);
  const cookies = nookies.get(null, "token");

  const handleSearchSubCategory = (newValue) => {
    if (newValue) {
      const filtered = subCategories.filter((subCategory) => {
        return subCategory?.attributes?.name
          .toLowerCase()
          .includes(newValue.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories(subCategories);
    }
  };

  const fetchSubCategoriesById = async (value) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `/sub-categories?filters[category][id]=${category?.id}&filters[name][$contains]=${value}&populate=*`;
    console.log(category, endpoint);
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

    if (value) {
      setFilteredSubCategories(listOfData);
    } else {
      setFilteredSubCategories(subCategories);
    }
  };

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={initialValue}
        name="subCategories"
        className="w-1/1"
      >
        <Select
          onKeyDown={(e) => (e.key == "Enter" ? e.preventDefault() : "")}
          size="large"
          showSearch
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          placeholder="Sub Kategori"
          onChange={onSelect}
          onSearch={
            category?.attributes
              ? fetchSubCategoriesById
              : handleSearchSubCategory
          }
          defaultValue={selectedSubCategory}
        >
          {filteredSubCategories.map((data) => (
            <Select.Option key={data.id} value={data.id}>
              {data.attributes.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
}
