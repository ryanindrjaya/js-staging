import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row } from "antd";
import {
  EditOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({
  data,
  onDelete,
  onUpdate,
  onPageChange,
  onChangeStatusPengiriman,
  onChangeStatus,
}) {

  const router = useRouter();
  const { Option } = Select;

  const print = (row) => {
    router.push("order_pembelian/print/" + row.id);
  };

  const lihat = (row) => {
    router.push("order_pembelian/print/" + row.id);
  };

  const onConfirm = (id) => {
    console.log(id);
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    onUpdate(id);
  };

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

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
      {row.attributes.status === "Diterima" ? (
        <div></div>
      ) : (
        <button
          onClick={() => onEdit(row.id)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <EditOutlined className="mr-2 mt-0.5 float float-left" />
          Edit
        </button>
      )}

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
      width: "100px",
      sortable: true,
      selector: (row) => formatMyDate(row.attributes?.order_date),
    },
    {
      name: "NO PO",
      width: "180px",
      sortable: true,
      selector: (row) => row.attributes?.no_po ?? "-",
    },
    {
      name: "Lokasi",
      width: "200px",
      selector: (row) => {
        return (
          <div>
            <Row align="middle" justify="center">
              {row.attributes?.location?.data?.attributes.name}
            </Row>
          </div>
        );
      },
    },
    {
      name: "Status Pengiriman",
      width: "150px",
      selector: (row) => {
        return (
          <>
            <Select
              defaultValue={row.attributes.delivery_status}
              bordered={false}
              disabled={row.attributes.delivery_status === "Terkirim"}
              onChange={(e) => onChangeStatusPengiriman(e, row)}
            >
              <Option value="Loading">
                {" "}
                <span className="rounded-full bg-slate-400 px-2 py-1 text-white text-xs">
                  Loading
                </span>{" "}
              </Option>
              <Option value="Pending">
                <span className="rounded-full bg-yellow-400 px-2 py-1 text-black text-xs">
                  Pending
                </span>{" "}
              </Option>
              <Option value="Antrian">
                <span className="rounded-full bg-blue-400 px-2 py-1 text-white text-xs">
                  Antrian
                </span>{" "}
              </Option>
              <Option value="Terkirim">
                {" "}
                <span className="rounded-full bg-green-400 px-2 py-1 text-white text-xs">
                  Terkirim
                </span>{" "}
              </Option>
            </Select>
          </>
        );
      },
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
              {" "}
              <span className="rounded-full bg-yellow-400 px-2 py-1 text-black text-xs">
                Dipesan
              </span>{" "}
            </Option>
            <Option value="Diterima">
              {" "}
              <span className="rounded-full bg-green-400 px-2 py-1 text-white text-xs">
                Diterima
              </span>{" "}
            </Option>
          </Select>
        );
      },
    },
    {
      name: "Ditambahkan Oleh",
      width: "150px",
      sortable: true,
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
      noDataComponent={"Belum ada data Order Pembelian"}
    />
  );
}
