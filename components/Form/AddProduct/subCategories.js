import { Form, Select, Button } from "antd";
import { useState } from "react";

export default function subCategories({ subCategories, onSelect, selectedSubCategory, initialValue }) {
  const [filteredSubCategories, setFilteredSubCategories] = useState(subCategories);

  const handleSearchSubCategory = (newValue) => {
    if (newValue) {
      const filtered = subCategories.filter((subCategory) => {
        return subCategory?.attributes?.name.toLowerCase().includes(newValue.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories(subCategories);
    }
  };

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item initialValue={initialValue} name="subCategories" className="w-1/1">
        <Select
          size="large"
          showSearch
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          placeholder="Sub Kategori"
          onChange={onSelect}
          onSearch={handleSearchSubCategory}
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
