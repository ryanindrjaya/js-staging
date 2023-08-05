import DataTable from "react-data-table-component";
import React from "react";
import { Spin, Tag } from "antd";
import moment from "moment";

export default function ExportFakturTable({ data, refetch, loading }) {
  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const columns = [
    {
      name: "No Faktur",
      width: "w-min-content",
      sortable: true,
      selector: (row) => row.attributes.no_faktur,
    },
    {
      name: "No Referensi",
      width: "200px",
      sortable: true,
      selector: (row) => row.attributes?.no_referensi || "",
    },
    {
      name: "Jenis Nomor",
      width: "w-min-content",
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
      name: "Total Faktur",
      width: "170px",
      sortable: true,
      selector: (row) => {
        return formatter.format(row.attributes?.detail_dokumen?.total || 0);
      },
    },
    {
      name: "Tanggal Faktur",
      width: "w-min-content",
      sortable: true,
      selector: (row) => {
        return moment(row.attributes?.detail_dokumen?.sale_date ?? null).format("DD/MM/YYYY");
      },
    },
    {
      name: "DPP",
      width: "170px",
      sortable: true,
      selector: (row) => {
        return formatter.format(row.attributes?.detail_dokumen?.dpp || 0);
      },
    },
    {
      name: "PPN",
      width: "170px",
      sortable: true,
      selector: (row) => {
        return formatter.format(row.attributes?.detail_dokumen?.ppn || 0);
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
      data={data?.data || []}
      noDataComponent={"Tidak ada data"}
    />
  );
}
