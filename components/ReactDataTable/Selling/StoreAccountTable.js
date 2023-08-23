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
    onChangeSetting,
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

    const edit = (row) => {
      router.push("/dashboard/penjualan/toko/setting/edittambahakun/" + row.id);
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

    const content = (row) => (
        <div>
            <div>
                <button
                    onClick={() => edit(row)}
                    className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
                >
                    <EditOutlined className="mr-2 mt-0.5 float float-left" />
                    Edit
                </button>
            </div>

            <AlertDialog
                onCancel={onCancel}
                onConfirm={onConfirm}
                title="Hapus Kategori"
                message="Akun hutang yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
                id={row.id}
            />
        </div>
    );

    const columns = [
        {
          name: "Kode akun",
          width: "200px",
          selector: (row) => row.attributes?.kode ?? "-",
        },
        {
          name: "Nama",
          width: "250px",
          selector: (row) => row.attributes?.nama ?? "-",
        },
        {
          name: "Saldo",
          width: "200px",
          selector: (row) => formatter.format( row.attributes?.chart_of_account?.data?.attributes?.saldo ?? row.attributes?.saldo ) ?? "-",
        },
        {
          name: "Tipe",
          width: "150px",
          selector: (row) => row.attributes?.type ?? "-",
        },
        {
          name: "Setting",
          width: "200px",
          selector: (row) => {
            var setting = "-";

            if (row.attributes?.setting == false) setting = "Tidak Aktif";
            else if (row.attributes?.setting == true) setting = "Aktif";
            else setting = "-";

            return (
              <>
                <Select
                  defaultValue={setting}
                  bordered={false}
                  //disabled={row.attributes.delivery_status === "Terkirim"}
                  onChange={(e) => onChangeSetting(e, row)}
                >
                  <Option value="Tidak Aktif">
                    <Tag color="error">Tidak Aktif</Tag>
                  </Option>
                  <Option value="Aktif">
                    <Tag color="success">Aktif</Tag>
                  </Option>
                </Select>
              </>
            );
          }
        },
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
            noDataComponent={"Belum ada data akun"}
        />
    );
}
