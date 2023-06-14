import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
  const tagOrange = process.env.TAG_ORANGE;

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
      name: "Nama Produk",
      width: "200px",
      cell: (row) => {
        var cellData = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
            <p key={index}>{element.attributes.product.data.attributes.name}</p>
          ));
          cellData = cellDetails
        }

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="mb-3"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) => 
                (<p key={idx}>{item.attributes.products.data[0].attributes.name}</p>)
              )}
            </p>
            <hr/>
            <p className="py-2"></p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="mb-3"><span className="font-bold">Supplier : </span>{row.attributes.supplier.data.attributes.name}</p>
                    <p>{cellData}</p>
                    <hr/>
                  </div>
                ) : (
                  <div hidden></div>
              )}

            {row.attributes?.returs ? (
                  <div>
                    <p className="py-2"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}
            
          </div>
        );
      },
    },
    {
      name: "Jumlah",
      width: "150px",
      cell: (row) => {
        var cellData = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
            <p key={index}>{element.attributes.total_order} {element.attributes.unit_order}</p>
          ));
        cellData = cellDetails;
        }

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="mb-3"><span className="font-bold">Tanggal : </span>{formatMyDate(row.attributes.date_purchasing)}</p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) => 
                (<p key={idx}>{item.attributes.qty} {item.attributes.unit}</p>)
              )}
            </p>
            <hr/>
            <p className="py-2"></p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="mb-3"><span className="font-bold">Tanggal : </span>{formatMyDate(row.attributes.date_purchasing)}</p>
                    <p>{cellData}</p>
                    <hr/>
                  </div>
                ) : (
                  <div></div>
              )}
 
            {row.attributes?.returs ? (
                  <div>
                    <p className="py-2"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}

          </div>
        );
      },
    },
    {
      name: "Harga Satuan",
      width: "190px",
      cell: (row) => {
        var cellData = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
            <p key={index}>{formatter.format(element.attributes.unit_price)}</p>
          ));
        cellData = cellDetails;
        }
        // const cellData = row.attributes.purchasing_details.data.map((element, index) => (
        //   <p key={index}>{formatter.format(element.attributes.unit_price)}</p>
        // ));

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="mb-3"><span className="font-bold">No : </span>{element.attributes.no_retur}</p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) => 
                (<p key={idx}>{formatter.format(item.attributes.harga_satuan)}</p>)
              )}
            </p>
            <hr/>
            <p className="py-2"></p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="mb-3"><span className="font-bold">No : </span>{row.attributes.no_purchasing}</p>
                    <p>{cellData}</p>
                    <hr/> 
                  </div>
                ) : (
                  <div></div>
              )}

            {row.attributes?.returs ? (
                  <div>
                    <p className="py-2"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}
            
          </div>
        );
      },
    },
    {
      name: "Diskon",
      width: "200px",
      cell: (row) => {
        var cellData = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
          <p key={index}>
            {formatter.format(element.attributes.disc ?? 0)} {element.attributes.dp1}% {element.attributes.dp2}% {element.attributes.dp3}% 
          </p>
          ));
        cellData = cellDetails;
        }
        // const cellData = row.attributes.purchasing_details.data.map((element, index) => (
        //   <p key={index}>
        //     {formatter.format(element.attributes.disc ?? 0)} {element.attributes.dp1}% {element.attributes.dp2}% {element.attributes.dp3}% 
        //   </p>
        // ));

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="mb-3"><span className="font-bold">Nota Supp : </span>{element.attributes.no_nota_suppplier ?? "tidak ada"}</p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) => 
                (<p className="py-2" key={idx}></p>)
              )}
            </p>
            <hr/>
            <p className="py-2"></p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="mb-3"><span className="font-bold">Nota Supp : </span>{row.attributes.no_nota_suppplier}</p>
                    <p>{cellData}</p>
                    <hr/> 
                  </div>
                ) : (
                  <div></div>
              )}

            {row.attributes?.returs ? (
                  <div>
                    <p className="py-2"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}

          </div>
        );
      },
    },
    {
      name: "Harga Satuan Stlh Diskon",
      width: "200px",
      cell: (row) => {
        var cellData = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
            <p key={index}>{formatter.format(element.attributes.unit_price_after_disc)}</p>
          ));
        cellData = cellDetails;
        }
        // const cellData = row.attributes.purchasing_details.data.map((element, index) => (
        //   <p key={index}>{formatter.format(element.attributes.unit_price_after_disc)}</p>
        // ));

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="mb-3"><span className="font-bold">Tempo : </span>{row.attributes.tempo_days} {row.attributes.tempo_time}</p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) => 
                (<p className="py-2" key={idx}></p>)
              )}
            </p>
            <hr/>
            <p className="py-2"></p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="mb-3"><span className="font-bold">Tempo : </span>{row.attributes.tempo_days} {row.attributes.tempo_time}</p>
                    <p>{cellData}</p>
                    <hr/> 
                  </div>
                ) : (
                  <div></div>
              )}

            {row.attributes?.returs ? (
                  <div>
                    <p className="py-2"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}

          </div>
        );
      },
    },
    {
      name: "Subtotal",
      width: "200px",
      cell: (row) => {
        var cellData = null;
        var sum = null;
        if(row.attributes?.purchasing_details){
          const cellDetails = row.attributes.purchasing_details.data.map((element, index) => (
            <p key={index}>{formatter.format(element.attributes.sub_total)}</p>
          ));
        cellData = cellDetails;
        sum = row.attributes.purchasing_details.data.reduce((total, row) => total += row.attributes.sub_total, 0);
        }
        //var sum = row.attributes.purchasing_details.data.reduce((total, row) => total += row.attributes.sub_total, 0);
        // const cellData = row.attributes.purchasing_details.data.map((element, index) => (
        //   <p key={index}>{formatter.format(element.attributes.sub_total)}</p>
        // ));

        var cellRetur = null;
        if(row.attributes?.returs){
        const cellReturNo = row.attributes.returs.data.map((element, index) => (
          <p key={index}>
            <p className="py-1"></p>
            <p>
              {element.attributes.retur_details.data.map((item, idx) =>
                (<p key={idx}>{formatter.format(item.attributes.sub_total)}</p>)
              )}
            </p>
            <hr/>
            <p>{formatter.format( element.attributes.retur_details.data.reduce((total, row) => total += row.attributes.sub_total, 0) )}</p>
          </p>
        ));
        cellRetur = cellReturNo;
        }

        return( 
          <div className="mt-2">
            {row.attributes?.purchasing_details ? (
                  <div>
                    <p className="py-2"></p>
                    <p>{cellData}</p>
                    <hr/> 
                    <p>{formatter.format(sum)}</p> 
                  </div>
                ) : (
                  <div></div>
              )}

            {row.attributes?.returs ? (
                  <div>
                    <p className="py-0"> </p>
                    <p>{cellRetur}</p>
                  </div>
                ) : (
                  <div hidden></div>
              )}
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
  );
}
