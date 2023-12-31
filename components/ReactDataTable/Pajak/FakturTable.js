import DataTable from "react-data-table-component";
import React from "react";
import { Spin, Tag } from "antd";
import moment from "moment";

export default function ReactDataTable({ data, refetch, loading }) {
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
      name: "No Faktur",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.attributes.no_faktur,
    },
    {
      name: "No Referensi",
      width: "w-1/3",
      sortable: true,
      selector: (row) => row.attributes?.no_referensi || "",
    },
    {
      name: "Jenis Nomor",
      width: "w-1/3",
      sortable: true,
      selector: (row) => {
        switch (row.attributes.jenis) {
          case "Penjualan":
            return <Tag color="yellow">Penjualan</Tag>;
          case "Retur Penjualan":
            return <Tag color="orange">Retur Penjualan</Tag>;
          case "Pembelian":
            return <Tag color="green">Pembelian</Tag>;
          case "Retur Pembelian":
            return <Tag color="cyan">Retur Pembelian</Tag>;
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
        if (row.attributes.is_used) {
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
        return moment(row.attributes.createdAt).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      customStyles={customStyles}
      pagination
      progressComponent={<Spin />}
      progressPending={loading}
      paginationTotalRows={data?.meta?.pagination.total}
      data={data?.data || []}
      noDataComponent={"Tidak ada data"}
    />
  );
}
