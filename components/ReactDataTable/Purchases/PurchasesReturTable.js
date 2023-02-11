import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import {
  EditOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({
  data,
  onDelete,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
}) {
  const router = useRouter(); 
  const { Option } = Select;

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const print = (row) => {
    openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    //router.push("order_pembelian/print/" + row.id);
  };

  const lihat = (row) => {
    openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    //router.push("order_pembelian/print/" + row.id);
  };

  const returLpb = (row) => {
    //openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
    router.push("retur/returLpb/" + row.id);
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
          onClick={() => lihat(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <UnorderedListOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
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

  const columns = [
    {
      name: "Tanggal",
      width: "150px",
      selector: (row) => formatMyDate(row.attributes?.tanggal_retur),
    },
    //{
    //  name: "NO PO",
    //  width: "180px",
    //  selector: (row) => row.attributes?.no_po ?? "-",
    //},
    {
      name: "NO Retur",
      width: "180px",
      selector: (row) => row.attributes?.no_retur ?? "-",
    },
    {
      name: "NO LPB",
      width: "180px",
      //selector: (row) => row.attributes.purchasing.data.attributes?.no_purchasing ?? "-",
    },
    {
      name: "Lokasi",
      width: "200px",
      selector: (row) => row.attributes?.location.data.attributes.name,
    },
    {
      name: "Supplier",
      width: "180px",
      selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
    },
    //{
    //  name: "Status Pembayaran",
    //  width: "150px",
    //  selector: (row) => {
    //    var tempoDate = new Date(row.attributes?.date_purchasing);
    //    var tempoTime = parseInt(row.attributes?.tempo_days ?? 0);
    //    var today = new Date();
    //    var isTempo = false;
    //    var statusPembayaran = row.attributes?.status_pembayaran;
    //    var purchasingHistory = row.attributes?.purchasing_payments.data;

    //    if (row.attributes?.tempo_time === "Hari") {
    //      tempoDate.setDate(tempoDate.getDate() + tempoTime);
    //    } else {
    //      tempoDate.setDate(tempoDate.getMonth() + tempoTime);
    //    }

    //    if (tempoDate < today) {
    //      isTempo = true;
    //    }

    //    if (isTempo) {
    //      if (statusPembayaran === "Belum Lunas") {
    //        return <Tag color="red">Tempo</Tag>;
    //      } else if (statusPembayaran === "Lunas") {
    //        return <Tag color="green">Lunas</Tag>;
    //      }
    //    } else {
    //      if (
    //        statusPembayaran === "Belum Lunas" &&
    //        purchasingHistory.length > 0
    //      ) {
    //        return <Tag color={tagRed}>Tempo</Tag>;
    //      } else if (
    //        statusPembayaran === "Lunas" &&
    //        purchasingHistory.length > 0
    //      ) {
    //        return <Tag color={tagGreen}>Lunas</Tag>;
    //      } else {
    //        return <Tag color={tagOrange}>Menunggu</Tag>;
    //      }
    //    }

    //    return <Tag color={tagOrange}>Menunggu</Tag>;
    //  },
    //},
    {
      name: "Grand Total",
      width: "180px",
      //selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
    },
    {
      name: "Pembayaran",
      width: "180px",
      //selector: (row) => row.attributes?.supplier.data.attributes.name ?? "-",
    },
    //{
    //  name: <div className="ml-6">Status</div>,
    //  width: "150px",
    //  selector: (row) => {
    //    return (
    //      <Select
    //        defaultValue={row.attributes.status}
    //        bordered={false}
    //        disabled={row.attributes.status === "Diterima"}
    //        onChange={(e) => onChangeStatus(e, row)}
    //      >
    //        <Option value="Dipesan">
             
    //          <Tag color="default">Dipesan</Tag>
    //        </Option>
    //        <Option value="Diterima">
    //        <Tag color="success">Diterima</Tag>
    //        </Option>
    //      </Select>
    //    );
    //  },
    //},
    //{
    //  name: "Status Pengiriman",
    //  width: "150px",
    //  selector: (row) => {
    //    return (
    //      <>
    //        <Select
    //          defaultValue={row.attributes.delivery_status}
    //          bordered={false}
    //          disabled={row.attributes.delivery_status === "Terkirim"}
    //          onChange={(e) => onChangeStatusPengiriman(e, row)}
    //        >
    //          <Option value="Loading">
    //            <Tag color="default">Loading</Tag>
    //          </Option>
    //          <Option value="Pending">
    //            <Tag color="warning">Pending</Tag>
    //          </Option>
    //          <Option value="Antrian">
    //            <Tag color="processing">Antrian</Tag>
    //          </Option>
    //          <Option value="Terkirim">
    //            <Tag color="success">Terkirim</Tag>
    //          </Option>
    //        </Select>
    //      </>
    //    );
    //  },
    //},
    {
      name: "Tindakan",
      width: "250px",
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
      noDataComponent={"Belum ada data Order Pembelian"}
    />
  );
}
