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
  const tagOrange = process.env.TAG_ORANGE; console.log("data", data.data, tipeLaporan);
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
      name: "No Pembayaran",
      width: "200px",
      cell: (row) => ( <div className="mt-1"><p key={0}>{row.attributes?.no_hutang}</p><hr/></div> ),
    },
    {
      name: "Tgl Bayar",
      width: "150px",
      cell: (row) => ( <div className="mt-1"><p key={0}>{formatMyDate(row.attributes?.tanggal_pembayaran)}</p><hr/></div> ),
    },
    {
      name: "Nota Supplier",
      width: "150px",
      cell: (row) => {
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{element.attributes.purchasing.data.attributes.no_nota_suppplier}</p>
        ));
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
      name: "No LPB",
      width: "180px",
      cell: (row) => {
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{element.attributes.purchasing.data.attributes.no_purchasing}</p>
        ));
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
      name: "Tgl LPB",
      width: "150px",
      cell: (row) => {
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{element.attributes.purchasing.data.attributes.date_purchasing}</p>
        ));
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
      name: "Nilai LPB",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.purchasing.data.attributes.total_purchasing, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}</p>
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
      name: "Tunai",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.tunai, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
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
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.transfer, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
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
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.giro, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
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
      name: "CN",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.cn, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
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
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.oth, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
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
      name: "Saldo Hutang",
      width: "150px",
      cell: (row) => {
        var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.sisa_hutang, 0);
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{formatter.format(element.attributes.sisa_hutang)}</p>
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
      name: "No Pembayaran",
      width: "200px",
      cell: (row) => ( <div><span className="font-bold">Supplier : </span><span>{row.attributes?.supplier.data.attributes.name}</span></div> ),
    },
    {
      name: "Tgl Bayar",
      width: "150px",
      cell: (row) => {
        var tempo_days = row.attributes?.debt_details.data[0].attributes.purchasing.data.attributes.tempo_days;
        var tempo_time = row.attributes?.debt_details.data[0].attributes.purchasing.data.attributes.tempo_time;
        return (
          <div>
            <span className="font-bold">Tempo : </span>
            <span>{tempo_days} {tempo_time}</span>
          </div>
        );
      },
    },
    {
      name: "Nota Supplier",
      width: "150px",
      // cell: (row) => {
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{element.attributes.purchasing.data.attributes.no_nota_suppplier}</p>
      //   ));
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
      name: "No LPB",
      width: "180px",
      // cell: (row) => {
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{element.attributes.purchasing.data.attributes.no_purchasing}</p>
      //   ));
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
      name: "Tgl LPB",
      width: "150px",
      // cell: (row) => {
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{element.attributes.purchasing.data.attributes.date_purchasing}</p>
      //   ));
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
      name: "Nilai LPB",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.purchasing.data.attributes.total_purchasing, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.purchasing.data.attributes.total_purchasing)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Tunai",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.tunai, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.tunai)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Transfer",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.transfer, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.transfer)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Giro",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.giro, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.giro)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "CN",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.cn, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.cn)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "OTH",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.oth, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.oth)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
    },
    {
      name: "Saldo Hutang",
      width: "150px",
      // cell: (row) => {
      //   var sum = row.attributes.debt_details.data.reduce((total, row) => total += row.attributes.sisa_hutang, 0);
      //   const cellData = row.attributes.debt_details.data.map((element, index) => (
      //     <p key={index}>{formatter.format(element.attributes.sisa_hutang)}</p>
      //   ));
      //   return( 
      //     <div className="mt-4">
      //       {cellData}
      //       <hr/> 
      //       <p>{formatter.format(sum)}</p>
      //     </div>
      //   );
      // },
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
        <div className="text-center">Belum ada data hutang</div>
      ) : (
        <DataTable
          customStyles={customStyles}
          onChangePage={onPageChange}
          paginationRowsPerPageOptions={[10]}
          paginationTotalRows={data?.meta?.pagination?.total}
          columns={column}
          data={data.data}
          pagination
          noDataComponent={"Belum ada data hutang"}
        />
      )}
    </>
  );
}
