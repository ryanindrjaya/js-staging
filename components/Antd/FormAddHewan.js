import { Spin } from "antd";
import React, { useState } from "react";
import nookies from "nookies";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import SelectOption from "../Form/SelectOption";

const FormAddHewan = () => {
  const [selectedTindakan1, setSelectedTindakan1] = useState("");
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState({});
  const [pemilik, setPemilik] = useState({});

  const cookies = nookies.get(null, "token");

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });
  }

  function setOptionValue(e) {
    console.log(e);
    setField({
      ...field,
      owner: e === null ? null : e.owner,
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const cookies = nookies.get(null, "token");

    const data = {
      data: field,
    };

    console.log(data);

    const JSONdata = JSON.stringify(data);
    const endpoint = process.env.NEXT_PUBLIC_DB + "owners";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    // const req = await fetch(endpoint, options);
    // const res = await req.json();

    // if (req.status === 200) {
    //   e.target.reset();
    //   toast.success("Data Pemilik berhasil ditambahkan!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // } else {
    //   res.error?.details.errors.map((error) => {
    //     const ErrorMsg = error.path[0];
    //     toast.error(
    //       ErrorMsg === "phone"
    //         ? "Nomor HP sudah digunakan"
    //         : ErrorMsg === "email"
    //         ? "Email sudah digunakan"
    //         : "Tidak dapat menambahkan Pemilik",
    //       {
    //         position: toast.POSITION.TOP_RIGHT,
    //       }
    //     );
    //   });
    // }

    setLoading(false);
  };

  const fetchOwner = async (query, callback, pemilik) => {
    if (!query) {
      callback([]);
    } else {
      try {
        const endpoint =
          process.env.NEXT_PUBLIC_DB +
          `owners?filters[$or][0][name][$contains]=${query}`;

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const req = await fetch(endpoint, options);
        const res = await req.json();
        console.log(endpoint);

        if (req.status == 200) {
          const ownerResults = res.data.map((owner) => ({
            label: `${owner.attributes.name}`,
            value: `${owner.attributes.name}`,
            owner: owner,
          }));

          callback(ownerResults);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <AsyncSelect
              isClearable={true}
              classNamePrefix="select2-selection"
              name="pemilik"
              className="pb-5"
              defaultValue={selectedTindakan1}
              loadOptions={fetchOwner}
              placeholder="Pilih Pemilik Hewan"
              onChange={(e) => {
                setOptionValue(e);
              }}
              defaultOptions={false}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              required
              onChange={setValue}
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="name"
              type="text"
              placeholder="Nama"
            />
          </div>
        </div>

        {loading ? (
          <div className=" flex float-right">
            <Spin />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 rounded px-5 py-2 hover:bg-blue-700 shadow-sm flex float-right mt-5"
          >
            <div className="text-white text-center text-sm font-bold">
              Submit
            </div>
          </button>
        )}
      </form>
    </>
  );
};

export default FormAddHewan;
