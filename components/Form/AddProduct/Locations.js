import { Form, Select } from "antd";

const formatInitialValue = (arr) => {
  if (arr?.length > 0) {
    return arr?.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }
};

export default function Locations({ data, onSelect, initialValue, errMsg, required = false }) {
  const formattedInitialValue = formatInitialValue(initialValue);
  return (
    <div className="w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={formattedInitialValue}
        name="locations"
        className="w-1/1"
        rules={[
          {
            required: required,
            message: "Lokasi Produk tidak boleh kosong!",
          },
        ]}
      >
        <Select onKeyDown={(e) => (e.key == "Enter" ? e.preventDefault() : "")} mode="multiple" size="large" placeholder="Lokasi" onChange={onSelect}>
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
