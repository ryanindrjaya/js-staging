import { Form, Select, Button } from "antd";

export default function subCategories({
  subCategories,
  onSelect,
  selectedSubCategory,
  initialValue,
}) {
  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={initialValue}
        name="subCategories"
        className="w-1/1"
      >
        <Select
          size="large"
          placeholder="Sub Kategori"
          onChange={onSelect}
          defaultValue={selectedSubCategory}
        >
          {subCategories?.map((data) => (
            <Select.Option key={data.id} value={data.id}>
              {data.attributes.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
}
