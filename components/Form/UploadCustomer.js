import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { productKeys } from "./utils/productKeys";
import { getRelationalData, getLocationsId } from "./utils/getRelationalData";
import nookies from "nookies";
import { toast } from "react-toastify";
import { Progress, Spin, message } from "antd";

export default function UploadProduk({ setCustomer }) {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const cookies = nookies.get(null);

  const postData = async (row) => {
    const endpoint = process.env.NEXT_PUBLIC_URL + "/customers";

    try {
      const data = {
        data: row,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSON.stringify(data),
      };

      console.log("options", options);

      try {
        const req = await fetch(endpoint, options);
        const res = await req.json();

        console.log("res", res);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      message.error({
        content: "Gagal mengunggah data",
        key: "process",
        duration: 2,
      });
      message.destroy("process");
      setLoading(false);
    }
  };

  const getCustomerCode = async (value) => {
    let code = "";

    switch (value) {
      case "TOKO":
        return "WALK IN CUSTOMER";
      case "PANEL":
        code = "PA";
        break;
      case "NON PANEL":
        code = "TS";
        break;
      case "SALES":
        code = "SO";
        break;
      case "KARYAWAN":
        return "BK";
      default:
        return;
    }

    const endpoint =
      process.env.NEXT_PUBLIC_URL + "/customers?sort[0]=id:desc&pagination[limit]=1&filters[code][$contains]=" + code;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    console.log(res);

    if (req.status === 200) {
      const lastCustomer = res?.data?.[0];
      const lastCustomerId = parseInt(lastCustomer?.attributes?.code?.split(code)?.[1] || 0);

      return code + String(lastCustomerId + 1).padStart(5, "0");
    } else {
      toast.error("Tidak dapat menambahkan Customer", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRelationId = async (value, url) => {
    const endpoint =
      process.env.NEXT_PUBLIC_URL +
      `${url}?filters[$or][0][name][$containsi]=${value}&filters[$or][1][code][$containsi]=${value}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.token,
      },
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 200) {
      const entity = res?.data?.[0];
      return entity?.id;
    } else {
      toast.error("Tidak dapat menambahkan Customer", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const parseData = async (data) => {
    const parsedData = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      let result = {};
      for (let key in row) {
        switch (key) {
          case "NAMA CUSTOMER*":
            result["name"] = row[key];
            break;
          case "ALAMAT*":
            result["address"] = row[key];
            break;
          case "KOTA*":
            result["city"] = row[key];
            break;
          case "TELEPON*":
            result["phone"] = row[key];
            break;
          case "TIPE PENJUALAN*":
            result["tipe_penjualan"] = [row[key]];
            result["tipe_penjualan_query"] = row[key];
            break;
          case "GOLONGAN CUSTOMER*":
            result["customer_type"] = row[key];
            break;
          case "DESKRIPSI":
            result["description"] = row[key];
            break;
          case "NAMA SALES*":
            result["sales_name"] = row[key];
            break;
          case "AREA*":
            result["area"] = await getRelationId(row[key], "/areas");
            break;
          case "WILAYAH*":
            result["wilayah"] = await getRelationId(row[key], "/wilayahs");
            break;
          case "BATAS KREDIT":
            result["credit_limit"] = parseInt(row?.[key] || 0);
            break;
          case "TERMIN PEMBAYARAN":
            result["credit_limit_duration"] = row[key] || 0;
            result["credit_limit_duration_type"] = "Hari";
            break;
          case "SALDO AWAL":
            result["saldo_awal"] = parseInt(row?.[key] || 0);
            break;
          case "NAMA NPWP":
            result["nama_npwp"] = row[key];
            break;
          case "NOMOR NPWP":
            result["nomor_npwp"] = String(row[key]);
            break;
          case "ALAMAT NPWP":
            result["alamat_npwp"] = row[key];
            break;
          case "NOMOR NIK":
            result["nik"] = String(row[key]);
            break;
          default:
            break;
        }
      }

      result["code"] = await getCustomerCode(row["TIPE PENJUALAN*"]);

      await postData(result);

      parsedData.push(result);
    }
    return parsedData;
  };

  const importExcel = (e) => {
    setLoading(true);

    console.log(e.target.files);
    try {
      message.loading({
        content: "Memproses data excel, jangan tutup halaman ini...",
        key: "process",
        duration: 60 * 1000,
      });

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const bstr = event.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const workSheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[workSheetName];
        const fileData = XLSX.utils.sheet_to_json(workSheet);

        await parseData(fileData);

        const endpointProduct = process.env.NEXT_PUBLIC_URL + "/customers?populate=*";

        const optionsAllProduct = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        };

        const reqProduct = await fetch(endpointProduct, optionsAllProduct);
        const resProduct = await reqProduct.json();

        message.success({
          content: "Berhasil mengunggah data",
          key: "process",
          duration: 2,
        });

        setCustomer(resProduct);

        setLoading(false);
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      setError("gagal ges ges");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (percent >= 100) {
      toast.success("Berhasil mengunggah data");
      setLoading(false);
      setPercent(0);
    }
  }, [percent]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  return loading ? (
    <div className="flex flex-col items-center justify-center w-full">
      <Spin />
    </div>
  ) : (
    <>
      <label
        htmlFor="upload_file"
        className="bg-cyan-700 cursor-pointer text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
      >
        Upload
      </label>
      <input onChange={importExcel} type="file" id="upload_file" hidden />
    </>
  );
}
