import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import {
  EditOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  CalculatorOutlined,
  CloseOutlined,
  BarcodeOutlined,
  BankOutlined,
  UndoOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

export default function SalesSellingTable({
  data,
  onDelete,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
  returPage,
}) {
  console.log("test table data ", data);

  const router = useRouter();
  console.log("data :", data);
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
    router.push("/dashboard/penjualan/sales/print/" + row.id);
  };

  const returPenjualan = (row) => {
    // openNotificationWithIcon(
    //   "info",
    //   "Work In Progress",
    //   "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    // );

    // return;

    if (row.attributes.status === "Diterima") {
      if (returPage == "toko") router.push("toko/retur/" + row.id);
      if (returPage == "sales") router.push("sales/retur/" + row.id);
      if (returPage == "nonpanel") router.push("non_panel/retur/" + row.id);
      if (returPage == "panel") router.push("panel/retur/" + row.id);
    } else {
      const message =
        row.attributes.status === "Diretur"
          ? "Karena status lembar pembelian barang sudah diretur."
          : row.attributes.status === "Belum Dibayar"
          ? "Karena status retur harus sudah dibayar."
          : row.attributes.status === "Diproses"
          ? "Karena status penjualan sales masih di proses."
          : "Tidak bisa diretur.";

      openNotificationWithIcon("error", "Maaf tidak bisa diretur", message);
    }

    //router.push("toko/retur/" + row.id);
  };

  const onConfirm = (id) => {
    console.log(id);
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

  const edit = (row) => {
    console.log("status transaksi", row, row.attributes.status);

    if (row.attributes.status === "Diterima") {
      openNotificationWithIcon(
        "error",
        "Transaksi Selesai",
        "Transaksi yang sudah selesai / diterima tidak dapat diedit kembali"
      );
    } else {
      router.push("sales/edit/" + row.id);
    }
  };

  const pembayaran = (row) => {
    router.push("sales/pembayaran/" + row.id);
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

      {row.attributes.status === "Diterima" || row.attributes.status === "Diretur" ? (
        ""
      ) : (
        <div>
          <button
            onClick={() => edit(row)}
            className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
          >
            <EditOutlined className="mr-2 mt-0.5 float float-left" />
            Edit
          </button>
        </div>
      )}

      {row.attributes.status !== "Diretur" && (
        <div>
          <button
            onClick={() => returPenjualan(row)}
            className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
          >
            <UndoOutlined className="mr-2 mt-0.5 float float-left" />
            Retur Penjualan
          </button>
        </div>
      )}

      {row.attributes.status === "Diterima" || row.attributes.status === "Diretur" ? (
        ""
      ) : (
        <AlertDialog
          onCancel={onCancel}
          onConfirm={onConfirm}
          title="Hapus Kategori"
          message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
          id={row.id}
        />
      )}

      <div>
        <button
          onClick={() => pembayaran(row)}
          className=" hover:text-cyan-700 transition-colors mt-3 text-xs font-normal py-2 px-2 rounded-md "
        >
          <CalculatorOutlined className="mr-2 mt-0.5 float float-left" />
          Pembayaran
        </button>
      </div>
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

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/penjualan/sales",
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const columns = [
    {
      name: "Tindakan",
      width: "150px",
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
      name: "Tanggal",
      width: "150px",
      selector: (row) => formatMyDate(row.attributes?.sale_date),
    },
    {
      name: "Customer",
      width: "180px",
      selector: (row) => row.attributes?.customer_name ?? "-",
    },
    {
      name: "No Faktur",
      width: "180px",
      selector: (row) => row.attributes?.no_sales_sale || "-",
    },
    {
      name: <div className="">Status</div>,
      width: "200px",
      selector: (row) => (
        <>
          <Select
            defaultValue={row.attributes.status}
            disabled={row.attributes.status === "Diterima"}
            bordered={false}
            onChange={(e) => onChangeStatus(e, row)}
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
      ),
    },
    {
      name: "Status Pembayaran",
      width: "150px",
      selector: (row) => {
        // const lastIndex = row.attributes.purchasing_payments?.data?.length;
        // const lastPayment = row.attributes.purchasing_payments?.data[lastIndex - 1];

        // if (lastPayment?.attributes.payment_remaining === lastPayment?.attributes.total_payment) {
        //   return <Tag color={tagRed}>Belum Lunas</Tag>;
        // } else if (
        //   lastPayment?.attributes.payment_remaining > 0 &&
        //   lastPayment?.attributes.payment_remaining < lastPayment?.attributes.total_payment
        // ) {
        //   return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        // } else if (lastPayment?.attributes.payment_remaining <= 0) {
        //   return <Tag color={tagGreen}>Lunas</Tag>;
        // } else {
        //   return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        // }

        if (row.attributes.status_pembayaran === "Belum Lunas") {
          return <Tag color={tagRed}>Belum Lunas</Tag>;
        } else if (row.attributes.status_pembayaran === "Dibayar Sebagian") {
          return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        } else if (row.attributes.status_pembayaran === "Lunas") {
          return <Tag color={tagGreen}>Lunas</Tag>;
        }
      },
    },
    {
      name: "Metode Pembayaran",
      width: "180px",
      selector: (row) => {
        const dataPaymentMethod =
          row?.attributes?.purchasing_payments?.data
            ?.map((payment, idx) => payment?.attributes?.[`payment_method_${idx + 1}`])
            .join(", ") ?? null;

        console.log(row.id, row?.attributes?.purchasing_payments?.data);
        return dataPaymentMethod;
      },
    },
    {
      name: "Jumlah Total",
      width: "180px",
      selector: (row) => formatter.format(row.attributes?.total ?? "-"),
    },
    {
      name: "Total Dibayar",
      width: "180px",
      selector: (row) => {
        const dataPayment = row?.attributes?.purchasing_payments?.data ?? [];

        const dataPaymentValue =
          dataPayment.length > 1
            ? dataPayment.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.attributes.payment), 0)
            : dataPayment.length === 1
            ? dataPayment[0].attributes.payment
            : 0;

        return formatter.format(dataPaymentValue);
      },
    },
    {
      name: "Sisa Pembayaran",
      width: "200px",
      selector: (row) => {
        const totalHarga = row.attributes?.total ?? 0;
        const dataPayment = row?.attributes?.purchasing_payments?.data ?? [];

        if (row.attributes.status === "Dibayar") {
          const dataPaymentValue = dataPayment.reduce(
            (acc, curr) => parseInt(acc) + parseInt(curr.attributes.payment),
            0
          );
          const kembali = dataPaymentValue - totalHarga < 0 ? 0 : dataPaymentValue - totalHarga;

          return formatter.format(kembali);
        }

        return formatter.format(0);
      },
    },
    {
      name: "Catatan Staff",
      width: "180px",
      selector: (row) => row.attributes?.sale_staff ?? "-",
    },
    {
      name: "Catatan Penjualan",
      width: "180px",
      selector: (row) => row.attributes?.sale_note ?? "-",
    },
    {
      name: "Ditambah Oleh",
      width: "180px",
      selector: (row) => row.attributes?.added_by ?? "-",
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
      noDataComponent={"Tidak ada data Pesanan Sales"}
      pointerOnHover
      highlightOnHover
      onRowClicked={(row) => openModal(row.id)}
    />
  );
}
