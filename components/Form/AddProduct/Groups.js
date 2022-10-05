import { Form, Select } from "antd";

export default function Groups({ data, onSelect, initialValue }) {

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item name="groups" className="w-1/1" initialValue={initialValue}>
        <Select
          size="large"
          placeholder="Golongan"
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
