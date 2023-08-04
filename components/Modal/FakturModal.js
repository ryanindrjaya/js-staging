import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, InputNumber, notification, Select, Spin } from "antd";
import nookies from "nookies";

function FakturModal({ setOpen, checkFacture, fetchData, setData }) {
  const cookies = nookies.get(null, "token");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const onFinish = async (e) => {
    setIsLoading(true);

    try {
      const nomorAwal = e.nomor_awalan;
      const nomorBelakangLength = e.nomor_belakang.length;
      const nomorBelakang = parseInt(e.nomor_belakang);
      const jenisNomor = e.jenis;

      const checker = isNaN(parseFloat(nomorBelakang));

      if (checker) {
        throw "Nomor Belakang harus format angka";
      } else {
        setErrorMsg(null);
        const fixedNomorBelakang = String(nomorBelakang).padStart(nomorBelakangLength, 0);
        var intNomorBelakang = parseInt(fixedNomorBelakang);
        var listNomorFaktur = [];

        for (let index = 0; index < e.jumlah; index++) {
          var stringNomorBelakang = String(intNomorBelakang).padStart(4, 0);

          intNomorBelakang = intNomorBelakang + e.interval;
          var appendNomor = nomorAwal + stringNomorBelakang;
          listNomorFaktur.push({
            no_faktur: appendNomor,
            isUsed: false,
            jenis: jenisNomor,
          });
        }

        var bar = new Promise((resolve, reject) => {
          listNomorFaktur.forEach(async (value, index, array) => {
            var postData = { data: value };
            await createData(postData);

            if (index === array.length - 1) resolve();
          });
        });

        bar.then(async () => {
          setOpen(false);
          const resData = await fetchData(cookies);
          const data = await resData.json();

          setData(data);
          notification["success"]({
            message: "Berhasil",
            description: `Data kamu sudah diupload. Silahkan cek kembali apakah sudah benar.`,
          });

          checkFacture(jenisNomor);
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
      setIsLoading(false);
    }
  };

  const createData = async (data) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/no-faktur-lists";
    const JSONdata = JSON.stringify(data);

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
      console.log("create res", res);
    } else {
      const errorResponse = `${data?.data?.no_faktur} sudah ada. Silahkan coba nomor lain`;
      notification["error"]({
        message: "Gagal",
        description: `Tidak dapat membuat nomor faktur baru. ${errorResponse}`,
      });
    }

    setTimeout(() => {
      if (req.status === 200) {
        // router.reload();
      }

      form.resetFields();
      setIsLoading(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="add"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="text-lg font-bold text-blue-400 ">
          <div>TAMBAHKAN MANUAL</div>
        </div>

        <div>
          <div className="w-full md:w-1/4 md:mb-0 mt-2">
            <Form.Item
              name="jenis"
              label="Jenis Nomor"
              rules={[
                {
                  required: true,
                  message: "Jenis tidak boleh kosong!",
                },
              ]}
            >
              <Select
                size="large"
                style={{
                  width: "100%",
                }}
              >
                <Select.Option value="Penjualan">Penjualan</Select.Option>
                <Select.Option value="Retur Penjualan">Retur Penjualan</Select.Option>
                <Select.Option value="Pembelian">Pembelian</Select.Option>
                <Select.Option value="Pembelian">Retur Pembelian</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3 mt-2">
          <div className="w-full md:w-3/12 px-3 mb-2 md:mb-0 mt-2">
            <Form.Item
              name="nomor_awalan"
              label="Nomor Awalan"
              rules={[
                {
                  required: true,
                  message: "Nomor awalan tidak boleh kosong!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/12 px-3 mb-2 md:mb-0 mt-2">
            <Form.Item
              name="nomor_belakang"
              label="Nomor Belakang"
              rules={[
                {
                  required: true,
                  message: "Nomor belakang tidak boleh kosong!",
                },
              ]}
            >
              <Input size="large" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/12 px-3 mb-2 md:mb-0 mt-2">
            <Form.Item
              name="interval"
              label="Interval"
              rules={[
                {
                  required: true,
                  message: "Interval tidak boleh kosong!",
                },
              ]}
            >
              <InputNumber min={1} size="large" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/12 px-3 mb-2 md:mb-0 mt-2">
            <Form.Item
              name="jumlah"
              label="Jumlah"
              rules={[
                {
                  required: true,
                  message: "Jumlah tidak boleh kosong!",
                },
              ]}
            >
              <InputNumber min={1} size="large" style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {isLoading ? (
            <div className="w-20 h-20 pl-5">
              <Spin size="large" />
            </div>
          ) : (
            <button type="submit" className="rounded px-5 py-2 border-blue-400 border shadow-sm flex mb-2 ml-4">
              <div className="text-blue-400 text-center text-sm font-bold">
                <a className="text-blue-400 no-underline text-xs sm:text-xs">Buat Nomor</a>
              </div>
            </button>
          )}

          <div className=" text-slate-400 m-4">
            {errorMsg === null ? <div></div> : <div className="text-red-500 mb-4 font-bold">{errorMsg}</div>}
            <div>
              Example : Jika mendapatkan kuota nomer 0062287575568 ada dua format yang terdapat di dalamnya nomor tetap
              sebagai nomor awalan dan nomer urutan sebagai nomor belakang
            </div>
            <div>1. Nomor awalan adalah nomor tetap pada nomor faktur misal 006228</div>
            <div>2. Nomor belakang adalah nomor yang tertera di belakang 7575568</div>
            <div>
              Setelah di pisah maka harus input jumlah yang nantinya akan mengurutkan kuota nomer pajak seperti <br />
              0062287575568 <br />
              0062287575569 <br />
              0062287575570 <br />
              0062287575576 <br /> Urutan adalah nomer urutan Faktur Pajak di mulai dari mana EXP ( 231 ) secara
              berurutan akan membuat nomer 232 dst
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default FakturModal;
