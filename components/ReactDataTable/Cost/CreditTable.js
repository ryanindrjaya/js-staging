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
        router.push("piutang/print/" + row.id);
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

    const openModal = (id) => {
        router.replace(
          {
            pathname: "/dashboard/keuangan/piutang",
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
                    onClick={() => openModal(row.id)}
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
                    onClick={() => lihat(row)}
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
                message="Kategori yang dihapus tidak dapat dikembalikan lagi. Lanjutkan?"
                id={row}
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
          name: "No Penagihan Piutang",
          width: "200px",
          selector: (row) => row.attributes?.no_piutang ?? "-",
        },
        {
          name: "Sales",
          width: "180px",
          selector: (row) => {
            var detail = row?.attributes?.credit_details?.data;
            var salesName = "";

              for (const key in detail) {
                salesName += detail[key]?.attributes?.customer?.data?.attributes?.sales_name +", ";
              }

            return salesName;
          }
        },
        {
          name: "Area",
          width: "150px",
          selector: (row) => {
            var detail = row?.attributes?.credit_details?.data;
            var areaName = "";

              for (const key in detail) {
                areaName += detail[key]?.attributes?.customer?.data?.attributes?.area?.data?.attributes?.name +", ";
              }

            return areaName;
          }
        },
        {
          name: "Wilayah",
          width: "150px",
          selector: (row) => {
            var detail = row?.attributes?.credit_details?.data;
            var wilayahName = "";

              for (const key in detail) {
                wilayahName += detail[key]?.attributes?.customer?.data?.attributes?.wilayah?.data?.attributes?.name +", ";
              }

            return wilayahName;
          }
        },
        {
          name: "Tanggal",
          width: "120px",
          selector: (row) => formatMyDate(row.attributes?.tanggal ?? row.attributes?.publishedAt),
        },
        {
          name: "Status Penagihan",
          width: "150px",
          selector: (row) => row.attributes?.status_pembayaran ?? "-",
        },
        {
          name: "Total Penagihan",
          width: "150px",
          selector: (row) => formatter.format(row.attributes?.total_pembayaran ?? "-"),
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
            noDataComponent={"Belum ada data piutang"}
            pointerOnHover
            highlightOnHover
            onRowClicked={(row) => openModal(row.id)}
        />
    );
}
