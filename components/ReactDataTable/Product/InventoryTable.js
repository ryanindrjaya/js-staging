import DataTable from "react-data-table-component";
import React from "react";
import Link from "next/link";

export default function ReactDataTable({ data, productId }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      name: "Lokasi Unit",
      width: "w-1/4",
      sortable: true,
      selector: (row) => row.attributes?.locations.data[0].attributes.name,
    },
    {
      name: "Total Stok",
      width: "w-1/4",
      sortable: true,
      selector: (row) => numberWithCommas(row.attributes?.total_stock),
    },
    {
      name: "Total Unit Terjual",
      width: "w-1/4",
      sortable: true,
      selector: (row) => "-",
    },
    {
      name: "Lihat Detail",
      width: "w-1/4",
      sortable: true,
      selector: (row) => {
        const locationId = row.attributes.locations.data[0].id;
        return (
          <>
            <Link
              href={"/dashboard/produk/riwayat/" + locationId + "/" + productId}
            >
              <a className="no-underline">Riwayat Stok</a>
            </Link>
          </>
        );
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
