import React from "react";
import writeXlsxFile from "write-excel-file";
import { HEADER_ROW_1, HEADER_ROW_2, columnsWidth } from "./utils/ExcelStyles.js";

function DownloadTemplate() {
  const data = [HEADER_ROW_1, HEADER_ROW_2];

  const downloadFile = async () => {
    try {
      const writeFile = await writeXlsxFile(data, {
        columns: columnsWidth,
        fileName: "Template Excel Data Produk.xlsx",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={downloadFile}
      type="button"
      className="bg-cyan-700 text-xs font-bold text-white w-full rounded h-10 hover:bg-cyan-800  shadow-sm flex items-center justify-center float-right"
    >
      Download Template
    </button>
  );
}

export default DownloadTemplate;
