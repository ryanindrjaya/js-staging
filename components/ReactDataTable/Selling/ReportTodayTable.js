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
import * as moment from "moment";

export default function ReactDataTable({
  data,
  onPageChange
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

    const columns = [
    {
      name: "No Penjualan Panel",
      width: "170px",
      selector: (row) => row.attributes?.no_panel_sale,
    },
    {
      name: "Customer",
      width: "140px",
      selector: (row) => row.attributes?.customer?.data?.attributes?.name,
    },
    {
      name: "Lokasi",
      width: "150px",
      selector: (row) => row.attributes?.location?.data?.attributes?.name,
    },
    {
      name: "Tanggal",
      width: "120px",
      selector: (row) => formatMyDate(row.attributes?.sale_date),
    },
    {
      name: <div className="">Status</div>,
      width: "150px",
      selector: (row) => {
        // return tag if status == belum dibayar, give it a red color. else give it a green color
        if (row.attributes?.status == "Belum Dibayar") {
          return <Tag color="red">{row.attributes?.status}</Tag>;
        } else if (row.attributes?.status == "Diretur") {
          return <Tag color="orange">{row.attributes?.status}</Tag>;
        } else {
          return <Tag color="green">{row.attributes?.status}</Tag>;
        }
      },
    },
    {
      name: "Jumlah Total",
      width: "180px",
      selector: (row) => formatter.format(row.attributes?.total ?? "-"),
    },
    {
      name: "Total Dibayar",
      width: "150px",
      selector: (row) => {
        const dataPayment = row?.attributes?.store_payments?.data ?? [];

        const dataPaymentValue =
          dataPayment.length > 1
            ? dataPayment.reduce(
                (acc, curr) =>
                  parseFloat(acc) + parseFloat(curr.attributes.payment),
                0
              )
            : dataPayment.length === 1
            ? dataPayment[0].attributes.payment
            : 0;

        return formatter.format(dataPaymentValue);
      },
    },
    {
      name: "Sisa Pembayaran",
      width: "150px",
      selector: (row) => {
        const totalHarga = row.attributes?.total ?? 0;
        const dataPayment = row?.attributes?.store_payments?.data ?? [];

        if (row.attributes.status === "Dibayar") {
          const dataPaymentValue = dataPayment.reduce(
            (acc, curr) => parseInt(acc) + parseInt(curr.attributes.payment),
            0
          );
          const kembali =
            dataPaymentValue - totalHarga < 0
              ? 0
              : dataPaymentValue - totalHarga;
          return formatter.format(kembali);
        }

        return formatter.format(0);
      },
    },
    {
      name: "Metode Pembayaran",
      width: "180px",
      selector: (row) => {
        const dataPaymentMethod =
          row?.attributes?.store_payments?.data
            ?.map((payment) => payment?.attributes?.payment_method)
            .join(", ") ?? null;

        console.log(row.id, row?.attributes?.store_payments?.data);
        return dataPaymentMethod ?? "-";
      },
    },
    {
      name: "Catatan Staff",
      width: "150px",
      selector: (row) => row.attributes?.sale_staff ?? "-",
    },
    {
      name: "Catatan Penjualan",
      width: "150px",
      selector: (row) => row.attributes?.sale_note ?? "-",
    },
    {
      name: "Ditambah oleh",
      width: "150px",
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
      //data={data.data}
      pagination
      noDataComponent={"Belum ada data Penjualan"}
      data={data.data.filter((item) => {
        let man = new Date(moment()); //date from data "2023-03-10"
        let itemDate = new Date(item?.attributes?.sale_date);

        if( itemDate.getFullYear() == man.getFullYear() &&
            itemDate.getMonth() + 1 == man.getMonth() + 1 &&
            itemDate.getDate() == man.getDate()
          ) {
          return item;
        }
      })}
    />
  );
}
