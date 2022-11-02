import { Form, Select } from "antd";

export default function Manufactures({ data, onSelect, initialValue }) {
  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        name="manufactures"
        initialValue={initialValue}
        className="w-1/1"
      >
        <Select size="large" placeholder="Pabrikasi" onChange={onSelect}>
          {data.map((data) => (
            <Select.Option key={data.id} value={data.id}>
              {data.attributes.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
}
