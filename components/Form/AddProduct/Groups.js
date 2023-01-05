import { Form, Select } from "antd";
import nookies from "nookies";
import { useState } from "react";

export default function Groups({ onSelect, selectedGroups, initialValue }) {
  const [groups, setSelectedGroups] = useState(selectedGroups);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = nookies.get(null, "token");

  const options = data?.map((d) => {
    return <Select.Option key={d.value}>{d.alias} - {d.label}</Select.Option>
  });

  const handleSearchGroups = (newValue) => {
    if (newValue) {
      fetchGroups(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChangeGroups = (newValue) => {
    setSelectedGroups(newValue);
    onSelect(newValue);
  };

  const fetchGroups = async (query, callback) => {
    if (!query) {
      callback([]);
    } else {
      setLoading(true);
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_URL + `/groups?filters[$or][0][name][$containsi]=${query}&filters[$or][1][code][$containsi]=${query}`;
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
            alias : `${manufacture.attributes.alias}`,
            label: `${manufacture.attributes.name}`,
            value: manufacture.id,
          }));

          callback(manufactureResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full md:w-full mb-2 md:mb-0">
      <Form.Item name="groups" className="w-1/1" initialValue={initialValue?.attributes.name}>
        <Select
          onKeyDown={(e) => (e.key == "Enter" ? e.preventDefault() : "")}
          size="large"
          value={groups ?? initialValue?.attributes.name}
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
          loading={loading}
          placeholder="Golongan"
          onChange={handleChangeGroups}
          onSearch={handleSearchGroups}
        >
          {options}
        </Select>
      </Form.Item>
    </div>
  );
}
