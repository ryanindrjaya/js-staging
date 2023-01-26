import DataTable from "react-data-table-component";
import React from "react";
import { Tag } from "antd";
import Link from "next/link";

export default function ReactDataTable({ data }) {
  console.log(data.attributes);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formattedDate(d = new Date()) {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
      .map((n) => (n < 10 ? `0${n}` : `${n}`))
      .join("/");
  }

  const customStyles = {
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const columns = [
    {
      name: "EXPIRED DATE",
      width: "w-1/4",
      sortable: true,
      selector: (row) => {
        const date = new Date(row.attributes?.expired_date);
        const newDate = date.toLocaleDateString("id-ID");
        return newDate;
      },
    },
    {
      name: "Total Stok",
      width: "w-1/4",
      sortable: true,
      selector: (row) => numberWithCommas(row.attributes?.stock),
    },
    {
      name: "Keterangan",
      width: "w-1/4",
      sortable: true,
      selector: (row) => {
        if (row.attributes?.keterangan === "Pembelian") {
          return <Tag color="success">Pembelian</Tag>;
        } else {
          return <Tag color="processing">{row.attributes?.keterangan}</Tag>;
        }
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      customStyles={customStyles}
      paginationRowsPerPageOptions={[100]}
      data={data}
      noDataComponent={"Tidak ada riwayat stok"}
    />
  );
}
