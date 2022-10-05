import { Form, Input, Button, Checkbox, DatePicker, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import nookies from "nookies";
import { toast } from "react-toastify";

const validateMessages = {
  required: "${label} tidak boleh kosong!",
  types: {
    email: "${label} tidak valid!",
    number: "${label} tidak valid!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormAddKlien = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    form.resetFields();
    const cookies = nookies.get(null, "token");

    const data = {
      data: {
        nama: values?.user?.nama,
        alamat: values?.user?.alamat,
        no_telp: values?.user?.no_telp,
      },
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = process.env.NEXT_PUBLIC_DB + "clients";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
      body: JSONdata,
    };

    try {
      const req = await fetch(endpoint, options);
      const res = await req.json();

      toast.success("Data Klien berhasil ditambahkan!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Gagal Menambahkan Data Klien !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <p className="mb-4 font-semibold ">Informasi Klien</p>
      <Form
        form={form}
        className="bg-transparent"
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "nama"]}
          label="Nama"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "alamat"]}
          label="Alamat"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "no_telp"]}
          label="No Telp"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name={["user", "invoices_date"]}
            label="Tanggal"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              style={{
                width: "30%",
              }}
            />
          </Form.Item>
        </Space> */}
        {/* <p className="mb-4 mt-5 font-semibold ">Invoices</p>
        <Form.List name="invoices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "nama_barang"]}
                    rules={[
                      {
                        required: true,
                        message: "Nama Barang tidak boleh kosong",
                      },
                    ]}
                  >
                    <Input placeholder="Nama Barang" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "jumlah"]}
                    rules={[
                      {
                        required: true,
                        pattern: /^(?:\d*)$/,
                        message: "Format tidak sesuai. Masukan hanya nomor",
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input placeholder="Jumlah" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "harga"]}
                    rules={[
                      {
                        required: true,
                        pattern: /^(?:\d*)$/,
                        message: "Format tidak sesuai. Masukan hanya nomor",
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input placeholder="Harga" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "satuan"]}
                    rules={[
                      {
                        required: true,
                        message: "Satuan tidak boleh kosong",
                      },
                    ]}
                  >
                    <Input placeholder="Satuan" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item >
                <Button type="dashed" onClick={() => add()} block>
                  + Tambah Item
                  
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List> */}
        <button
          htmlType="submit"
          className="bg-blue-500 rounded px-5 py-2 hover:bg-blue-700 shadow-sm flex float-right mt-5"
        >
          <div className="text-white text-center text-sm font-bold">Submit</div>
        </button>
      </Form>
    </>
  );
};

export default FormAddKlien;
