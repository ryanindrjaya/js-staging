import DataTable from "react-data-table-component";
import * as moment from "moment";

export default function ReactDataTable({ data }) {
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const customStyles = {
    headerStyle: { textAlign: "center" },
    headCells: {
      style: {
        color: "white",
        background: "#036B82",
      },
    },
  };

  const getProductDisc = (row) => {
    var disc1 = 0;
    var disc2 = 0;
    var disc3 = 0;
    var discTetap = row.attributes?.disc;
    for (let index = 1; index < 6; index++) {
      var unitProduct =
        row.attributes?.product.data.attributes[`unit_${index}`];
      var unitOrder = row.attributes.unit_order;

      if (unitProduct === unitOrder) {
        disc1 = row.attributes?.product.data.attributes[`unit_${index}_dp1`];
        disc2 = row.attributes?.product.data.attributes[`unit_${index}_dp2`];
        disc3 = row.attributes?.product.data.attributes[`unit_${index}_dp3`];
      }
    }

    return (
      <div>
        {disc1}, {disc2}, {disc3}, {formatter.format(discTetap)}
      </div>
    );
  };

  const formatDate = (data) => {
    const date = new Date(data?.attributes?.expired_date);
    var NewDate = moment(date, "DD-MM-YYYY").format();
    NewDate = NewDate.split("T")[0];

    var dArr = NewDate.split("-"); // ex input: "2010-01-18"
    var finalDate = dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex output: "18/01/10"

    return finalDate;
  };

  const columns = [
    {
      name: "Nama Produk",
      width: "250px",
      selector: (row) => row.attributes?.product.data.attributes.name ?? "-",
    },
    {
      name: "Harga Sebelum Disc",
      width: "200px",
      selector: (row) => formatter.format(row.attributes?.unit_price),
    },
    {
      name: "Jumlah Pembelian",
      width: "150px",
      selector: (row) => {
        return `${row.attributes?.total_order} ${row.attributes?.unit_order}`;
      },
    },

    {
      name: "Disc 1, 2, 3, Tetap",
      width: "150px",
      selector: (row) => getProductDisc(row),
    },
    {
      name: "EXP.Date",
      width: "150px",
      selector: (row) => formatDate(row),
    },
    {
      name: "Batch",
      width: "150px",
      selector: (row) => row.attributes.batch ?? "-",
    },
    {
      name: "SubTotal",
      width: "150px",
      selector: (row) => formatter.format(row.attributes?.sub_total),
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      paginationRowsPerPageOptions={[50]}
      columns={columns}
      data={data.data}
      pagination
      noDataComponent={"Belum ada data Pembelian"}
    />
  );
}
