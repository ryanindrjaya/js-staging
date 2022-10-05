import { Form, Select } from "antd";

export default function Groups({ data, onSelect, initialValue }) {
  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={initialValue}
        name="locations"
        className="w-1/1"
        rules={[
          {
            required: true,
            message: "Lokasi Produk tidak boleh kosong!",
          },
        ]}
      >
        <Select
          mode="multiple"
          size="large"
          placeholder="Lokasi"
          onChange={onSelect}
        >
          {data.data.map((data) => (
            <Select.Option key={data.id} value={data.id}>
              {data.attributes.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
}
