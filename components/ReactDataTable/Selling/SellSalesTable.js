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
        openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
        //router.push("order_pembelian/print/" + row.id);
    };

    const print = (row) => {
        openNotificationWithIcon("info", "Work In Progress", "Hai, Fitur ini sedang dikerjakan. Silahkan tunggu pembaruan selanjutnya");
        //router.push("order_pembelian/print/" + row.id);
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
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Edit
                </button>
            </div>
            <div>
                <button
                    onClick={() => edit(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Batal
                </button>
            </div>
            <div>
                <button
                    onClick={() => piutang(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Jadikan Piutang
                </button>
            </div>
            <div>
                <button
                    onClick={() => returJual(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Retur Jual
                </button>
            </div>
            <div>
                <button
                    onClick={() => pembayaran(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Pembayaran
                </button>
            </div>
            <div>
                <button
                    onClick={() => lihatPembayaran(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Lihat Pembayaran
                </button>
            </div>
            <div>
                <button
                    onClick={() => updateStatus(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
                    Update Status
                </button>
            </div>
            <div>
                <button
                    onClick={() => returPenjualan(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
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
                    <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
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
          width: "120px",
          selector: (row) => formatMyDate(row.attributes?.sale_date),
        },
        {
          name: "Customer",
          width: "150px",
          selector: (row) => row.attributes?.customer_name ?? "-",
        },
        {
          name: "NO Sales Order",
          width: "150px",
          selector: (row) => row.attributes?.no_sales_sale ?? "-",
        },
        {
          name: "Sales",
          width: "150px",
          //selector: user?.name ?? "-",
        },
        {
          name: "Jumlah Item",
          width: "120px",
          //selector: (row) => formatter.format(row.attributes?.total ?? "-"),
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
            noDataComponent={"Belum ada data Penjualan Sales"}
        />
    );
}
