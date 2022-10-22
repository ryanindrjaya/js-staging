import { Spin } from "antd";
import React, { useState } from "react";
import nookies from "nookies";
import { toast } from "react-toastify";

const FormAddKlien = () => {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState({});

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const cookies = nookies.get(null, "token");

    const data = {
      data: field,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = process.env.NEXT_PUBLIC_URL + "owners";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      e.target.reset();
      toast.success("Data Pemilik berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      res.error?.details.errors.map((error) => {
        const ErrorMsg = error.path[0];
        toast.error(
          ErrorMsg === "phone"
            ? "Nomor HP sudah digunakan"
            : ErrorMsg === "email"
            ? "Email sudah digunakan"
            : "Tidak dapat menambahkan Pemilik",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
            <input
              onChange={setValue}
              required
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="name"
              type="text"
              placeholder="Nama Pemilik"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              required
              onChange={setValue}
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="phone"
              type="text"
              placeholder="No.Telp"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              required
              onChange={setValue}
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              onChange={setValue}
              required
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="address"
              type="text"
              placeholder="Alamat"
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

export default FormAddKlien;
