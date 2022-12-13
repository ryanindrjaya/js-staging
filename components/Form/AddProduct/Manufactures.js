import { Form, Select, Spin } from "antd";
import nookies from "nookies";
import { useState } from "react";

export default function Manufactures({ onSelect, initialValue, selectedManufacures, label }) {
  const [manufactures, setSelectedManufactures] = useState(selectedManufacures);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");

  const options = data?.map((d) => <Select.Option key={d.value}>{d.label}</Select.Option>);

  const handleSearchManufacure = (newValue) => {
    if (newValue) {
      setLoading(true);
      fetchManufactures(newValue, setData);
    } else {
      setData([]);
    }

    setLoading(false);
  };

  const handleChangeManufactures = (newValue) => {
    setSelectedManufactures(newValue);
    onSelect(newValue);
  };

  const fetchManufactures = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL + `/manufactures?filters[$or][0][name][$containsi]=${query}&filters[$or][1][code][$containsi]=${query}`;
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
          const manufactureResult = res.data.map((manufacture) => ({
            label: `${manufacture.attributes.name}`,
            value: manufacture.id,
          }));

          callback(manufactureResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(manufactures ?? initialValue.attributes.name);

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item
        initialValue={initialValue?.attributes.name}
        name="manufactures"
        className="w-1/1"
        rules={[
          {
            required: true,
            message: "Pabrikasi tidak boleh kosong!",
          },
        ]}
      >
        <Select
          onKeyDown={(e) => (e.key == "Enter" ? e.preventDefault() : "")}
          value={manufactures ?? initialValue?.attributes.name}
          size="large"
          defaultValue={
            initialValue && {
              value: initialValue?.id,
              label: initialValue?.attributes?.name,
            }
          }
          showSearch
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          placeholder="Pabrikasi"
          onChange={handleChangeManufactures}
          onSearch={handleSearchManufacure}
        >
          {options}
        </Select>
      </Form.Item>
    </div>
  );
}
