import DataTable from "react-data-table-component";
import React from "react";
import { Spin, Tag } from "antd";
import moment from "moment";

export default function GenerateFakturTable({ data, loading }) {
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
        if (row.attributes.no_referensi) {
          return <Tag color="green">Approved</Tag>;
        } else {
          return <Tag color="process">Unapproved</Tag>;
        }
      },
    },
    {
      name: "Waktu Generate",
      width: "w-1/3",
      sortable: true,
      selector: (row) => {
        return row.attributes.createdAt === row.attributes.updatedAt
          ? ""
          : moment(row.attributes.updatedAt).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      customStyles={customStyles}
      pagination
      selectableRows
      progressComponent={<Spin />}
      progressPending={loading}
      paginationTotalRows={data?.meta?.pagination.total}
      data={data?.data || []}
      noDataComponent={"Tidak ada data"}
    />
  );
}
