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
        router.push("hutang/print/" + row.id);
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
          name: "Nama",
          width: "200px",
          selector: (row) => row.attributes?.nama ?? "-",
        },
        {
          name: "Saldo",
          width: "200px",
          selector: (row) => formatter.format( row.attributes?.saldo) ?? "-",
        },
        {
          name: "Tipe",
          width: "120px",
          selector: (row) => row.attributes?.type ?? "-",
        },
        {
          name: "Setting",
          width: "120px",
          selector: (row) => {
            var setting = "-";

            if (row.attributes?.setting == false) setting = "Tidak Aktif";
            else if (row.attributes?.setting == true) setting = "Aktif";
            else setting = "-";
            //row.attributes?.setting ?? "-"]

            return setting;
          }
        },
        {
            name: "Tindakan",
            width: "150px",
            selector: (row) => (
                <AlertDialog
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    title="Hapus Kategori"
                    message="Akun hutang yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
                    id={row.id}
                />
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
            noDataComponent={"Belum ada data hutang"}
        />
    );
}
