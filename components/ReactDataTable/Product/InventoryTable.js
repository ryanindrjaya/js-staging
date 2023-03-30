import DataTable from "react-data-table-component";
import React from "react";
import Link from "next/link";

export default function ReactDataTable({ data, productId }) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getTotalStock(row) {
    let stock = "";
    const data = row.attributes;
    const product = row.attributes?.product.data.attributes;

    console.log("product", product);
    console.log("data", data);

    for (let i = 1; i <= 5; i++) {
      if (product?.[`unit_${i}`]) {
        if (i !== 1) {
          stock += `, ${numberWithCommas(data[`stock_unit_${i}`])} ${product[`unit_${i}`]}`;
        } else {
          stock += `${numberWithCommas(data[`stock_unit_${i}`])} ${product[`unit_${i}`]}`;
        }
      }
    }

    return stock;
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
      selector: (row) => row.attributes?.location.data.attributes.name,
    },
    {
      name: "Total Stok",
      width: "w-1/4",
      sortable: true,
      selector: (row) => getTotalStock(row),
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
        const locationId = row.attributes.location.data.id;
        return (
          <>
            <Link href={`/dashboard/stok?location=${locationId}&product=${productId}`}>
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
