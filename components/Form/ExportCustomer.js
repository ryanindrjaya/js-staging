import { Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import writeXlsxFile from "write-excel-file";
import { HEADER_ROW_1, columnsWidth } from "./utils/ExcelStylesCustomer";
import { toast } from "react-toastify";

export default function ExportCustomer({ data = [], setProduct }) {
  const [loading, setLoading] = useState(false);
  const excelData = [HEADER_ROW_1];

  const exportData = async () => {
    setLoading(true);
    const time = moment().format("DD-MM-YYYY");

    if (data.length > 0) {
      const productData = data.map((product) => {
        const { attributes } = product;

        const tipe_penjualan = attributes?.tipe_penjualan_query || "";
        const area = attributes?.area?.data?.attributes?.name || "";
        const wilayah = attributes?.wilayah?.data?.attributes?.name || "";

        const {
          name,
          address,
          code,
          city,
          phone,
          description = "",
          customer_type,
          sales_name = "",
          credit_limit = 0,
          credit_limit_duration = 0,
          credit_limit_duration_type = "Hari",
          saldo_awal = 0,
          nama_npwp = "",
          nomor_npwp = "",
          alamat_npwp = "",
          nik = "",
        } = attributes;

        return [
          {
            value: code,
            fontSize: 11,
          },
          {
            value: name,
            fontSize: 11,
          },
          {
            value: address,
            fontSize: 11,
          },
          {
            value: city,
            fontSize: 11,
          },
          {
            value: phone,
            fontSize: 11,
          },
          {
            value: description,
            fontSize: 11,
          },
          {
            value: customer_type,
            fontSize: 11,
          },
          {
            value: tipe_penjualan,
            fontSize: 11,
          },
          {
            value: sales_name,
            fontSize: 11,
          },
          {
            value: area,
            fontSize: 11,
          },
          {
            value: wilayah,
            fontSize: 11,
          },
          {
            value: credit_limit,
            fontSize: 11,
          },
          {
            value: `${credit_limit_duration ?? ""} ${credit_limit_duration_type ?? ""}`,
            fontSize: 11,
          },
          {
            value: saldo_awal,
            fontSize: 11,
          },
          {
            value: nama_npwp,
            fontSize: 11,
          },
          {
            value: nomor_npwp,
            fontSize: 11,
          },
          {
            value: alamat_npwp,
            fontSize: 11,
          },
          {
            value: nik,
            fontSize: 11,
          },
        ];
      });

      excelData.push(...productData);
    }

    try {
      const writeFile = await writeXlsxFile(excelData, {
        columns: columnsWidth,
        fileName: `Data Customer_${time}.xlsx`,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const maintenance = () => {
    toast.warning("Fitur ini sedang dalam pengembangan");
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-10">
          <Spin />
        </div>
      ) : (
        <button
          onClick={exportData}
          type="button"
          className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
        >
          Export Excel
        </button>
      )}
    </>
  );
}
