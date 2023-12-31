import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/AlertCancel";
import { Popover, Select, Row, Tag, notification } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined, CalculatorOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { IoIosSwap } from "react-icons/io";

export default function ReactDataTable({ data, onDelete, onUpdate, onPageChange, onChangeStatus }) {
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

  const print = (row) => {
    router.push("pembelian_barang/print/" + row.id);
    // router.push('/dashboard')
  };

  const edit = (row) => {
    console.log("status transaksi", row, row.attributes.status);

    if (row.attributes.status === "Diterima") {
      openNotificationWithIcon(
        "error",
        "Transaksi Selesai",
        "Transaksi yang sudah selesai / diterima tidak dapat diedit kembali"
      );
    } else {
      router.push("pembelian_barang/edit/" + row.id);
    }
  };

  const pembayaran = (row) => {
    router.push("pembelian_barang/pembayaran/" + row.id);
  };

  const retur = (row) => {
    //console.log(row.attributes.status)
    if (row.attributes.status != "Diretur") {
      router.push("pembelian_barang/retur/" + row.id);
    } else {
      openNotificationWithIcon(
        "error",
        "Maaf tidak bisa diretur",
        "Karena status lembar pembelian barang sudah diretur."
      );
    }
    //router.push("pembelian_barang/retur/" + row.id);
  };

  const onConfirm = (id, row) => {
    console.log(id);
    onDelete(id, row);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  //const onEdit = (id) => {
  //  onUpdate(id);
  //};

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  });

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/pembelian_barang",
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const content = (row) => (
    <div>
      <div>
        <button
          onClick={() => print(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
          Cetak
        </button>
      </div>
      <div>
        <button
          onClick={() => openModal(row.id)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>
      <div>
        <button
          onClick={() => edit(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <EditOutlined className="mr-2 mt-0.5 float float-left" />
          Edit
        </button>
      </div>

      {/*{row.attributes.status === "Diproses" ? (*/}
      {/*  <div></div>*/}
      {/*) : (*/}
      {/*  <button*/}
      {/*    onClick={() => onEdit(row.id)}*/}
      {/*    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "*/}
      {/*  >*/}
      {/*    <EditOutlined className="mr-2 mt-0.5 float float-left" />*/}
      {/*    Edit*/}
      {/*  </button>*/}
      {/*)}*/}

      {/* <AlertDialog
        onCancel={onCancel}
        onConfirm={(e) => onConfirm(e, row)}
        title="Batalkan Transaksi"
        message="Transaksi yang dibatalkan tidak dapat dikembalikan lagi. Lanjutkan?"
        id={row.id}
      /> */}

      {/* <div className="mt-4">
        <button
          onClick={() => pembayaran(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <CalculatorOutlined className="mr-2 mt-0.5 float float-left" />
          Pembayaran
        </button>
      </div> */}
    </div>
  );

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
      name: "Tindakan",
      width: "100px",
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom" trigger="click">
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
    },
    {
      name: "NO LPB",
      width: "180px",
      selector: (row) => row.attributes?.no_purchasing ?? "-",
    },
    {
      name: "Supplier",
      width: "180px",
      wrap: true,
      selector: (row) => row.attributes?.supplier?.data?.attributes?.name ?? "-",
    },
    {
      name: "Nota Supplier",
      width: "180px",
      selector: (row) => row.attributes?.no_nota_suppplier ?? "-",
    },
    {
      name: "Tanggal",
      width: "150px",
      selector: (row) => formatMyDate(row.attributes?.date_purchasing),
    },
    {
      name: "Lokasi",
      width: "200px",
      wrap: true,
      selector: (row) => row.attributes?.location?.data?.attributes?.name,
    },
    {
      name: "Status",
      width: "200px",
      selector: (row) => {
        return (
          <>
            <Select
              defaultValue={row.attributes.status}
              disabled={row.attributes.status === "Diterima"}
              bordered={false}
              onChange={(e) => onChangeStatus(e, row, row.id)}
              style={{
                width: "150px",
              }}
            >
              <Option value="Diproses" key="Diproses" className="text-black">
                <Tag color="default">Diproses</Tag>
              </Option>
              <Option value="Dibatalkan" key="Dibatalkan" className="text-black">
                <Tag color="error">Dibatalkan</Tag>
              </Option>
              <Option value="Diretur" key="Diretur" className="text-black">
                <Tag color="blue">Diretur</Tag>
              </Option>
              <Option value="Diterima" key="Diterima" className="text-black">
                <Tag color="success">Diterima</Tag>
              </Option>
            </Select>
          </>
        );
      },
    },
    {
      name: "Tempo",
      width: "150px",
      selector: (row) => {
        var tempoDate = new Date(row.attributes?.date_purchasing);
        var tempoTime = parseInt(row.attributes?.tempo_days ?? 0);
        var today = new Date();
        var isTempo = false;
        var statusPembayaran = row.attributes?.status_pembayaran;
        var purchasingHistory = row.attributes?.purchasing_payments?.data;

        if (row.attributes?.tempo_time === "Hari") {
          tempoDate.setDate(tempoDate.getDate() + tempoTime);
        } else {
          tempoDate.setDate(tempoDate.getMonth() + tempoTime);
        }

        if (tempoDate < today) {
          isTempo = true;
        }

        if (isTempo) {
          if (statusPembayaran === "Belum Lunas") {
            return <Tag color="red">Tempo</Tag>;
          } else if (statusPembayaran === "Lunas") {
            return <Tag color="green">Selesai</Tag>;
          }
        } else {
          if (statusPembayaran === "Belum Lunas" && purchasingHistory?.length > 0) {
            return <Tag color={tagRed}>Tempo</Tag>;
          } else if (statusPembayaran === "Lunas" && purchasingHistory.length > 0) {
            return <Tag color={tagGreen}>Selesai</Tag>;
          } else {
            return <Tag color={tagOrange}>Menunggu</Tag>;
          }
        }

        return <Tag color={tagOrange}>Menunggu</Tag>;
      },
    },
    {
      name: "Pembayaran",
      width: "150px",
      selector: (row) => {
        // const lastIndex = row.attributes.purchasing_payments?.data?.length;
        // const lastPayment =
        //   row.attributes.purchasing_payments?.data[lastIndex - 1];

        // if (
        //   lastPayment?.attributes.payment_remaining ===
        //   lastPayment?.attributes.total_payment
        // ) {
        //   return <Tag color={tagRed}>Belum Lunas</Tag>;
        // } else if (
        //   lastPayment?.attributes.payment_remaining > 0 &&
        //   lastPayment?.attributes.payment_remaining <
        //     lastPayment?.attributes.total_payment
        // ) {
        //   return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        // } else if (lastPayment?.attributes.payment_remaining <= 0) {
        //   return <Tag color={tagGreen}>Lunas</Tag>;
        // } else {
        //   return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        // }
        if (row.attributes?.status_pembayaran == "Belum Lunas") {
          return <Tag color="red">{row.attributes?.status_pembayaran}</Tag>;
        } else if (row.attributes?.status_pembayaran == "Diretur") {
          return <Tag color="orange">{row.attributes?.status_pembayaran}</Tag>;
        } else if (row.attributes?.status_pembayaran == "Dibayar Sebagian") {
          return <Tag>{row.attributes?.status_pembayaran}</Tag>;
        } else {
          return <Tag color="green">{row.attributes?.status_pembayaran}</Tag>;
        }
        //return row.attributes.status_pembayaran;
      },
    },
    {
      name: "Total Beli",
      width: "150px",
      selector: (row) => formatter.format(row.attributes?.total_purchasing ?? 0),
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
      noDataComponent={"Belum ada data Pembelian"}
      pointerOnHover
      highlightOnHover
      onRowClicked={(row) => openModal(row.id)}
    />
  );
}
