import React from "react";
import DataTable from "react-data-table-component";

export default function PreviewTable({ data, columns }) {
  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };
  return (
    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={data}
      noDataComponent={"Belum ada data Retur Penjualan"}
    />
  );
}
