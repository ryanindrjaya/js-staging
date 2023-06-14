import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({
  data,
  onDelete,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
  tipeLaporan,
  user,
}) {
  const router = useRouter();
  const { Option } = Select;

  const tagRed = process.env.TAG_RED;
  const tagGreen = process.env.TAG_GREEN;
  const tagOrange = process.env.TAG_ORANGE; console.log("data", data, tipeLaporan);
  var column = null;

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const lihat = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
    //router.push("order_pembelian/print/" + row.id);
  };

  const print = (row) => {
    router.push("hutang/print/" + row.id);
  };

  const onConfirm = (id) => {
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
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

  const columnDetail = [
    {
      name: "No Penagihan",
      width: "200px",
      cell: (row) => ( <div className="mt-0"><p key={0}>{row.attributes?.no_piutang}</p><hr/></div> ),
    },
    {
      name: "Tgl Tagih",
      width: "150px",
      cell: (row) => ( <div className="mt-0"><p key={0}>{formatMyDate(row.attributes?.tanggal ?? row.attributes?.createdAt)}</p><hr/></div> ),
    },
    {
      name: "No Invoice",
      width: "180px",
      cell: (row) => {
        const cellData = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            return <p key={index}>{details.attributes.non_panel_sale.data.attributes.no_non_panel_sale}</p>;
          } else if (details.attributes.panel_sale.data != null) {
            return <p key={index}>{details.attributes.panel_sale.data.attributes.no_panel_sale}</p>;
          } else if (details.attributes.sales_sale.data != null) {
            return <p key={index}>{details.attributes.sales_sale.data.attributes.no_sales_sale}</p>;
          } else {
            return <p key={index}>Tidak ada</p>;
          }
        });

        return( 
          <div className="mt-1">
            {cellData}
            <hr/> 
            <p></p>
          </div>
        );
      },
    },
    {
      name: "Tgl Invoice",
      width: "150px",
      cell: (row) => {
        const cellData = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            return <p key={index}>{details.attributes.non_panel_sale.data.attributes.sale_date}</p>;
          } else if (details.attributes.panel_sale.data != null) {
            return <p key={index}>{details.attributes.panel_sale.data.attributes.sale_date}</p>;
          } else if (details.attributes.sales_sale.data != null) {
            return <p key={index}>{details.attributes.sales_sale.data.attributes.sale_date}</p>;
          } else {
            return <p key={index}>Tidak ada</p>;
          }
        });

        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>Subtotal</p>
          </div>
        );
      },
    },
    {
      name: "Total Invoice",
      width: "150px",
      cell: (row) => {
        const cellData = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            return <p key={index}>{formatter.format(details.attributes.non_panel_sale.data.attributes.total)}</p>;
          } else if (details.attributes.panel_sale.data != null) {
            return <p key={index}>{formatter.format(details.attributes.panel_sale.data.attributes.total)}</p>;
          } else if (details.attributes.sales_sale.data != null) {
            return <p key={index}>{formatter.format(details.attributes.sales_sale.data.attributes.total)}</p>;
          } else {
            return <p key={index}>Tidak ada</p>;
          }
        });

        var sum = null;
        const sumData = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            sum += details.attributes.non_panel_sale.data.attributes.total;
          } else if (details.attributes.panel_sale.data != null) {
            sum += details.attributes.panel_sale.data.attributes.total;
          } else if (details.attributes.sales_sale.data != null) {
            sum += details.attributes.sales_sale.data.attributes.total;
          } else {
            sum = sum;
          }
        });

        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Total Retur Jual",
      width: "150px",
      cell: (row) => {        
        const sumRetur = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            var sum = details.attributes.non_panel_sale.data.attributes.retur_non_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
            return <p key={index}>{formatter.format(sum)}</p>;
          } else if (details.attributes.panel_sale.data != null) {
            var sum = details.attributes.panel_sale.data.attributes.retur_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
            return <p key={index}>{formatter.format(sum)}</p>;
          } else if (details.attributes.sales_sale.data != null) {
            // blom ada relation dgn sales sell
            var sum = 0;
            return <p key={index}>{formatter.format(sum)}</p>;
          } else {
            return <p key={index}>Tidak ada</p>;
          }
        });

        var sumTotal = null;
        const sumTotalRetur = row.attributes.credit_details.data.forEach((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            sumTotal += details.attributes.non_panel_sale.data.attributes.retur_non_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
          } else if (details.attributes.panel_sale.data != null) {
            sumTotal += details.attributes.panel_sale.data.attributes.retur_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
          } else if (details.attributes.sales_sale.data != null) {
            var sum = 0;
            sumTotal += sum;
          } else {
            var sum = 0;
            sumTotal += sum;
          }
        });

        return( 
          <div className="mt-4">
            {sumRetur}
            <hr/> 
            <p>{formatter.format(sumTotal)}</p>
          </div>
        );
      },
    },
    {
      name: "Tunai",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.tunai, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.tunai)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Transfer",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.transfer, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.transfer)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Giro",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.giro, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.giro)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "DN",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.cn, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.cn)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "OTH",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.oth, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.oth)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Saldo Piutang",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.sisa_piutang, 0);
        const cellData = row.attributes.credit_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.sisa_piutang)}</p>
        ));
        return( 
          <div className="mt-4">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
  ];

  const columnRekap = [
    {
      name: "No Penagihan",
      width: "200px",
      cell: (row) => ( <div className="mt-0"><p key={0}>{row.attributes?.no_piutang}</p></div> ),
    },
    {
      name: "Tgl Tagih",
      width: "150px",
      // cell: (row) => ( <div className="mt-0"><p key={0}>{formatMyDate(row.attributes?.tanggal ?? row.attributes?.createdAt)}</p><hr/></div> ),
    },
    {
      name: "No Invoice",
      width: "180px",
      // cell: (row) => {
      //   const cellData = row.attributes.credit_details.data.map((details, index) => {
      //     if (details.attributes.non_panel_sale.data != null) {
      //       return <p key={index}>{details.attributes.non_panel_sale.data.attributes.no_non_panel_sale}</p>;
      //     } else if (details.attributes.panel_sale.data != null) {
      //       return <p key={index}>{details.attributes.panel_sale.data.attributes.no_panel_sale}</p>;
      //     } else if (details.attributes.sales_sale.data != null) {
      //       return <p key={index}>{details.attributes.sales_sale.data.attributes.no_sales_sale}</p>;
      //     } else {
      //       return <p key={index}>Tidak ada</p>;
      //     }
      //   });

      //   return( 
      //     <div className="mt-1">
      //       {cellData}
      //       <hr/> 
      //       <p></p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Tgl Invoice",
      width: "150px",
      // cell: (row) => {
      //   const cellData = row.attributes.credit_details.data.map((details, index) => {
      //     if (details.attributes.non_panel_sale.data != null) {
      //       return <p key={index}>{details.attributes.non_panel_sale.data.attributes.sale_date}</p>;
      //     } else if (details.attributes.panel_sale.data != null) {
      //       return <p key={index}>{details.attributes.panel_sale.data.attributes.sale_date}</p>;
      //     } else if (details.attributes.sales_sale.data != null) {
      //       return <p key={index}>{details.attributes.sales_sale.data.attributes.sale_date}</p>;
      //     } else {
      //       return <p key={index}>Tidak ada</p>;
      //     }
      //   });

      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>Subtotal</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Total Invoice",
      width: "150px",
      cell: (row) => {
        var sum = null;
        const sumData = row.attributes.credit_details.data.map((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            sum += details.attributes.non_panel_sale.data.attributes.total;
          } else if (details.attributes.panel_sale.data != null) {
            sum += details.attributes.panel_sale.data.attributes.total;
          } else if (details.attributes.sales_sale.data != null) {
            sum += details.attributes.sales_sale.data.attributes.total;
          } else {
            sum = sum;
          }
        });

        return( 
          <div className="mt-0">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Total Retur Jual",
      width: "150px",
      cell: (row) => {        
        var sumTotal = null;
        const sumTotalRetur = row.attributes.credit_details.data.forEach((details, index) => {
          if (details.attributes.non_panel_sale.data != null) {
            sumTotal += details.attributes.non_panel_sale.data.attributes.retur_non_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
          } else if (details.attributes.panel_sale.data != null) {
            sumTotal += details.attributes.panel_sale.data.attributes.retur_panel_sales.data.reduce((accumulator, item) =>
              accumulator + item.attributes.total, 0
            );
          } else if (details.attributes.sales_sale.data != null) {
            var sum = 0;
            sumTotal += sum;
          } else {
            var sum = 0;
            sumTotal += sum;
          }
        });

        return( 
          <div className="mt-0">
            <p>{formatter.format(sumTotal)}</p>
          </div>
        );
      },
    },
    {
      name: "Tunai",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.tunai, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Transfer",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.transfer, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Giro",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.giro, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "DN",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.cn, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "OTH",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.oth, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
    {
      name: "Saldo Piutang",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.credit_details.data.reduce((total, row) => total += row.attributes.sisa_piutang, 0);
        return( 
          <div className="mt-4">
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
  ];

  const columns = [];

  if(tipeLaporan == "Detail"){
    column = columnDetail;
  } else if(tipeLaporan == "Rekap"){
    column = columnRekap;
  } else {
    column = columns;
  }

  return (
    <>
      {column.length === 0 && data.data.length > 0 ? (
        <div className="text-center">Belum ada data piutang</div>
      ) : (
        <DataTable
          customStyles={customStyles}
          onChangePage={onPageChange}
          paginationRowsPerPageOptions={[10]}
          paginationTotalRows={data?.meta?.pagination?.total}
          columns={column}
          data={data.data}
          pagination
          noDataComponent={"Belum ada data piutang"}
        />
      )}
    </>
  );
}
