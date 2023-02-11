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
    SyncOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({
    data,
    onDelete,
    onPageChange,
    onChangeStatusPengiriman,
    onChangeStatus,
    returPage,
}) {
    const router = useRouter(); console.log("data :",data)
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
        openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
        //router.push("order_pembelian/print/" + row.id);
    };

    const print = (row) => {
        openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
        //router.push("order_pembelian/print/" + row.id);
    };

    const returPenjualan = (row) => {
        if (row.attributes.status != "Diretur") {
            if (returPage == "toko") router.push("toko/retur/" + row.id);
            if (returPage == "sales") router.push("sales/retur/" + row.id);
            if (returPage == "nonpanel") router.push("non_panel/retur/" + row.id);
            if (returPage == "panel") router.push("panel/retur/" + row.id);
        } else {
            openNotificationWithIcon(
                "error",
                "Maaf tidak bisa diretur",
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
            <div>
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

    const columns = [
        {
          name: "Tanggal",
          width: "150px",
          selector: (row) => formatMyDate(row.attributes?.sale_date),
        },
        {
          name: "Customer",
          width: "180px",
          selector: (row) => row.attributes?.customer?.data.attributes.name ?? "-",
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
                <Option value="Dipesan">
                  <Tag color="default">Dipesan</Tag>
                </Option>
                <Option value="Diterima">
                  <Tag color="success">Diterima</Tag>
                </Option>
                <Option value="Diretur">
                  <Tag color="blue">Diretur</Tag>
                </Option>
              </Select>
            );
          },
        },
        {
          name: "Metode Pembayaran",
          width: "180px",
          //selector: (row) => row.attributes.purchasing.data.attributes?.no_purchasing ?? "-",
        },
        {
          name: "Jumlah Total",
          width: "180px",
          selector: (row) => formatter.format(row.attributes?.total ?? "-"),
        },
        {
          name: "Total Dibayar",
          width: "180px",
          //selector: (row) => formatter.format(row.attributes?.total ?? "-"),
        },
        {
          name: "Sisa Pembayaran",
          width: "200px",
          //selector: (row) => row.attributes?.location.data.attributes.name,
        },
        {
          name: "Status Pembayaran",
          width: "150px",
          selector: (row) => {
            const lastIndex = row.attributes.purchasing_payments?.data?.length;
            const lastPayment =
              row.attributes.purchasing_payments.data[lastIndex - 1];

            if (
              lastPayment?.attributes.payment_remaining ===
              lastPayment?.attributes.total_payment
            ) {
              return <Tag color={tagRed}>Belum Dibayar</Tag>;
            } else if (
              lastPayment?.attributes.payment_remaining > 0 &&
              lastPayment?.attributes.payment_remaining <
                lastPayment?.attributes.total_payment
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
            noDataComponent={"Belum ada data Penjualan Toko"}
        />
    );
}
