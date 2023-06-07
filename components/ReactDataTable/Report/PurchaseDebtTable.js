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
  user,
}) {
  const router = useRouter();
  const { Option } = Select;

  const tagRed = process.env.TAG_RED;
  const tagGreen = process.env.TAG_GREEN;
  const tagOrange = process.env.TAG_ORANGE; console.log("data", data.data);

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

  //const content = (row) => (
  //    <div>
  //        <div>
  //            <button
  //                onClick={() => lihat(row)}
  //                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
  //            >
  //                <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
  //                Melihat
  //            </button>
  //        </div>
  //        <div>
  //            <button
  //                onClick={() => print(row)}
  //                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
  //            >
  //                <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
  //                Cetak
  //            </button>
  //        </div>
  //        {row?.attributes?.document == "Draft" ? (
  //          <div>
  //            <button
  //                onClick={() => lihat(row)}
  //                className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
  //            >
  //                <EditOutlined className="mr-2 mt-0.5 float float-left" />
  //                Edit
  //            </button>
  //          </div>
  //        ) : (
  //            <> </>
  //        )}

  //        <AlertDialog
  //            onCancel={onCancel}
  //            onConfirm={onConfirm}
  //            title="Hapus Kategori"
  //            message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
  //            id={row}
  //        />
  //    </div>
  //);

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
      name: "No Pembayaran",
      width: "200px",
      cell: (row) => ( <div><p key={0} className="-mt-11">{row.attributes?.no_hutang}</p></div> ),
    },
    {
      name: "Tgl Bayar",
      width: "150px",
      cell: (row) => ( <div><p key={0} className="-mt-11">{formatMyDate(row.attributes?.tanggal_pembayaran)}</p></div> ),
    },
    {
      name: "Nota Supplier",
      width: "150px",
      cell: (row) => {
        const cellData = row.attributes.debt_details.data.map((element, index) => (
          <p key={index}>{element.attributes.purchasing.data.attributes.no_nota_suppplier}</p>
        ));
        return( 
          <div className="-mt-3">
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
          <div className="-mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
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
          <div className="mt-3">
            {cellData}
            <hr/> 
            <p>{formatter.format(sum)}</p>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      onChangePage={onPageChange}
      paginationRowsPerPageOptions={[10]}
      paginationTotalRows={data?.meta?.pagination?.total}
      columns={columns}
      data={data.data}
      pagination
      noDataComponent={"Belum ada data jurnal"}
    />
    // <table style={customStyles} className="w-full">
    //   <thead>
    //     <tr>
    //       <th>No Pembayaran</th>
    //       <th>Tgl Bayar</th>
    //       <th>Nota Supplier</th>
    //       <th>No LPB</th>
    //       <th>Tgl LPB</th>
    //       <th>Nilai LPB</th>
    //       <th>Total Nilai RB</th>
    //       <th>Tunai</th>
    //       <th>Transfer</th>
    //       <th>Giro</th>
    //       <th>CN</th>
    //       <th>OTH</th>
    //       <th>Saldo Hutang</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.data.map((item) => {
    //       <tr key={item.id}>
    //         <td>{item.attributes.no_hutang}</td>
    //       </tr>
    //     })}
    //   </tbody>
    // </table>
  );
}
