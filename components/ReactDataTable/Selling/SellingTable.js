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
import { useState } from "react";

export default function ReactDataTable({
  data,
  onDelete,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
  returPage,
  bayarRetur,
}) {
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
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
    //router.push("order_pembelian/print/" + row.id);
  };

  const edit = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const piutang = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const lihatPembayaran = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const updateStatus = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const cetakLabel = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const cetakBarcode = (row) => {
    openNotificationWithIcon(
      "info",
      "Work In Progress",
      "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
    );
  };

  const pembayaran = (row) => {
    if (row?.attributes?.retur_store_sale?.data !== null) {
      bayarRetur(row);
    } else {
      openNotificationWithIcon(
        "info",
        "Work In Progress",
        "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya"
      );
    }
  };

  const returPenjualan = (row) => {
    console.log("row :", row);
    if (row.attributes.status !== "Diretur") {
      if (returPage == "toko") router.push("toko/retur/" + row.id);
      if (returPage == "sales") router.push("sales/retur/" + row.id);
      if (returPage == "nonpanel") router.push("non_panel/retur/" + row.id);
      if (returPage == "panel") router.push("panel/retur/" + row.id);
    } else {
      openNotificationWithIcon(
        "error",
        "Lembar pembelian telah diretur",
        "Karena status lembar pembelian barang sudah diretur."
      );
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
    maximumFractionDigits: 0,
  });

  const isLunas = (row) => {
    const lastIndex = row.attributes.payments?.data?.length;
    const lastPayment = row.attributes.payments.data[lastIndex - 1];

    if (lastPayment?.attributes.payment_remaining <= 0) {
      return true;
    } else {
      return false;
    }
  };

  const content = (row) => (
    <div>
      <div>
        <button
          onClick={() => lihat(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
          Melihat
        </button>
      </div>
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
          onClick={() => edit(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <EditOutlined className="mr-2 mt-0.5 float float-left" />
          Edit
        </button>
      </div>
      <div>
        <button
          //onClick={() => edit(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <CloseOutlined className="mr-2 mt-0.5 float float-left" />
          Batal
        </button>
      </div>
      <div>
        <button
          onClick={() => piutang(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <CalculatorOutlined className="mr-2 mt-0.5 float float-left" />
          Jadikan Piutang
        </button>
      </div>
      <div hidden={isLunas(row)}>
        <button
          onClick={() => pembayaran(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BankOutlined className="mr-2 mt-0.5 float float-left" />
          Pembayaran
        </button>
      </div>
      <div>
        <button
          onClick={() => lihatPembayaran(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BankOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat Pembayaran
        </button>
      </div>
      <div>
        <button
          onClick={() => updateStatus(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <SyncOutlined className="mr-2 mt-0.5 float float-left" />
          Update Status
        </button>
      </div>
      <div>
        <button
          onClick={() => returPenjualan(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <UndoOutlined className="mr-2 mt-0.5 float float-left" />
          Retur Penjualan
        </button>
      </div>
      <div>
        <button
          onClick={() => cetakLabel(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
          Cetak Label
        </button>
      </div>
      <div>
        <button
          onClick={() => cetakBarcode(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BarcodeOutlined className="mr-2 mt-0.5 float float-left" />
          Cetak Barcode
        </button>
      </div>

      <AlertDialog
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="Hapus Kategori"
        message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
        id={row.id}
      />
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

  const getGrandTotal = (row) => {
    var total = 0;

    if (row.attributes?.retur_store_sale?.data?.attributes) {
      const dataRetur = row.attributes.retur_store_sale.data.attributes;

      for (let index = 1; index < 4; index++) {
        total = total + parseInt(dataRetur?.[`additional_fee_${index}_sub`] || 0);
      }

      total = total + parseInt(dataRetur?.total);

      if (dataRetur?.disc_value) {
        switch (dataRetur?.disc_type) {
          case "Persentase":
            total = total - (total * dataRetur?.disc_value) / 100;
            break;
          case "Tetap":
            total = total - dataRetur?.disc_value;
            break;
          default:
            break;
        }
      }

      return formatter.format(total);
    } else {
      for (let index = 1; index < 4; index++) {
        total = total + parseInt(row.attributes?.[`additional_fee_${index}_sub`] || 0);
      }

      total = total + parseInt(row.attributes?.total);

      if (row.attributes?.disc_value) {
        switch (row.attributes?.disc_type) {
          case "Persentase":
            total = total - (total * row.attributes?.disc_value) / 100;
            break;
          case "Tetap":
            total = total - row.attributes?.disc_value;
            break;
          default:
            break;
        }
      }

      return formatter.format(total);
    }
  };

  const getTotalPayed = (payments) => {
    var total = 0;
    payments.forEach((element) => {
      total = total + parseInt(element.attributes?.payment);
    });

    return formatter.format(total);
  };

  const columns = [
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
      name: "NO Faktur",
      width: "180px",
      selector: (row) => row.attributes?.faktur ?? "-",
    },
    {
      name: <div className="ml-6">Status</div>,
      width: "150px",
      selector: (row) => {
        return (
          <Select
            defaultValue={row.attributes.status}
            bordered={false}
            disabled={row.attributes.status === "Diterima"}
            onChange={(e) => onChangeStatus(e, row)}
          >
            <Option value="Draft">
              <Tag color="default">Draft</Tag>
            </Option>
            <Option value="Dipesan">
              <Tag color="blue">Dipesan</Tag>
            </Option>
            <Option value="Diterima">
              <Tag color="success">Diterima</Tag>
            </Option>
            <Option value="Diretur">
              <Tag color="error">Diretur</Tag>
            </Option>
          </Select>
        );
      },
    },
    {
      name: "Metode Pembayaran",
      width: "180px",
      selector: (row) => {
        const paymentData =
          row?.attributes?.payments?.data[row?.attributes?.payments?.data.length - 1]?.attributes;
        if (!paymentData) {
          return "";
        }

        var metodes = paymentData.payment_method_1;

        for (let i = 2; i < 4; i++) {
          if (paymentData[`payment_method_${i}`]) {
            metodes += ", " + paymentData[`payment_method_${i}`];
          }
        }

        return metodes;
      },
    },
    {
      name: "Jumlah Total",
      width: "180px",
      selector: (row) => getGrandTotal(row),
    },
    {
      name: "Total Dibayar",
      width: "180px",
      selector: (row) =>
        row?.attributes?.payments?.data[0]?.attributes?.payment
          ? getTotalPayed(row?.attributes?.payments?.data)
          : "",
    },
    {
      name: "Sisa Pembayaran",
      width: "200px",
      selector: (row) =>
        row?.attributes?.payments?.data[0]?.attributes?.payment_remaining
          ? formatter.format(
              row?.attributes?.payments?.data[row?.attributes?.payments?.data.length - 1]
                ?.attributes?.payment_remaining
            )
          : "",
    },
    {
      name: "Status Pembayaran",
      width: "150px",
      selector: (row) => {
        const lastIndex = row.attributes.payments?.data?.length;
        const lastPayment = row.attributes.payments.data[lastIndex - 1];

        if (lastPayment?.attributes.payment_remaining === lastPayment?.attributes.total_payment) {
          return <Tag color={tagRed}>Belum Dibayar</Tag>;
        } else if (
          lastPayment?.attributes.payment_remaining > 0 &&
          lastPayment?.attributes.payment_remaining < lastPayment?.attributes.total_payment
        ) {
          return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        } else if (lastPayment?.attributes.payment_remaining <= 0) {
          return <Tag color={tagGreen}>Selesai</Tag>;
        } else {
          return <Tag color={tagOrange}>Dibayar Sebagian</Tag>;
        }
      },
    },
    {
      name: "Faktur Jatuh Tempo",
      width: "180px",
      //selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
    },
    {
      name: "Lokasi Penjualan",
      width: "180px",
      //selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
      selector: (row) => row.attributes?.location.data.attributes.name ?? "-",
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
    {
      name: "Tindakan",
      width: "250px",
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom" trigger="click" zIndex={9999}>
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
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
      noDataComponent={"Belum ada data Penjualan Toko"}
    />
  );
}
