import DataTable from "react-data-table-component";
import React from "react";
import { Tag } from "antd";
import moment from "moment";

export default function ReactDataTable({ data }) {
  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    {
      name: "No.Faktur",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.attributes.no_faktur,
    },
    {
      name: "Jenis Nomor",
      width: "w-1/3",
      sortable: true,
      selector: (row) => {
        switch (row.attributes.jenis) {
          case "Penjualan":
            return <Tag color="success">Penjualan</Tag>;
          case "Retur Penjualan":
            return <Tag color="success">Retur Penjualan</Tag>;
          case "Pembelian":
            return <Tag color="processing">Pembelian</Tag>;
          case "Retur Pembelian":
            return <Tag color="processing">Retur Pembelian</Tag>;
          default:
            return row.attributes.jenis;
        }
      },
    },
    {
      name: "Status",
      width: "w-1/3",
      sortable: true,
      selector: (row) => {
        if (row.attributes.isUsed) {
          return <Tag color="error">Sudah Dipakai</Tag>;
        } else {
          return <Tag color="processing">Belum Dipakai</Tag>;
        }
      },
    },
    {
      name: "Waktu Pembuatan",
      width: "w-1/3",
      sortable: true,
      selector: (row) => {
        return moment(row.attributes.createdAt).format("DD-MM-YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      customStyles={customStyles}
      pagination
      paginationTotalRows={data?.meta?.pagination.total}
      data={data.data}
      noDataComponent={"Tidak ada data"}
    />
  );
}
