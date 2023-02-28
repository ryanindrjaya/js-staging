import { Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import writeXlsxFile from "write-excel-file";
import { HEADER_ROW_1, HEADER_ROW_2, columnsWidth } from "./utils/ExcelStyles";
import { toast } from "react-toastify";

export default function ExportCustomer({ data = [], setProduct }) {
  const [loading, setLoading] = useState(false);
  const excelData = [HEADER_ROW_1, HEADER_ROW_2];

  const exportData = async () => {
    setLoading(true);
    const time = moment().unix();

    if (data.length > 0) {
      const productData = data.map((product) => {
        const { attributes } = product;
      });

      excelData.push(...productData);
    }

    try {
      const writeFile = await writeXlsxFile(excelData, {
        columns: columnsWidth,
        fileName: `Data Produk_${time}.xlsx`,
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
          onClick={maintenance}
          type="button"
          className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
        >
          Export Excel
        </button>
      )}
    </>
  );
}
