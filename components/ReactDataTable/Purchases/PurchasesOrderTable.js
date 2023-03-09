import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons";
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

  function formatMyDate(value, locale = "id-ID") {
    return new Date(value).toLocaleDateString(locale);
  }

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const openModal = (id) => {
    router.replace(
      {
        pathname: "/dashboard/pembelian/order_pembelian",
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
          Lihat
        </button>
      </div>
      {row.attributes.status === "Diterima" ? (
        <div></div>
      ) : (
        <button
          onClick={() => onUpdate(row)}
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
      name: "Tindakan",
      width: "180px",
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
      selector: (row) => formatMyDate(row.attributes?.order_date),
    },
    {
      name: "NO PO",
      width: "180px",
      selector: (row) => row.attributes?.no_po ?? "-",
    },
    {
      name: "Supplier",
      width: "200px",
      selector: (row) => row.attributes?.supplier?.data?.attributes?.name,
    },
    {
      name: "Lokasi",
      width: "200px",
      selector: (row) => row.attributes?.location?.data?.attributes?.name,
    },

    {
      name: <div className="ml-6">Status</div>,
      width: "180px",
      selector: (row) => {
        return (
          <Select
            defaultValue={row.attributes.status}
            bordered={false}
            disabled /*={row.attributes.status === "Diterima" || row.attributes.status === "Selesai"}*/
            onChange={(e) => onChangeStatus(e, row)}
            style={{ width: 140 }}
          >
            <Option value="Diproses">
              <Tag color="default">Diproses</Tag>
            </Option>
            <Option value="Sebagian Diterima">
              <Tag color="warning">Sebagian Diterima</Tag>
            </Option>
            <Option value="Diterima">
              <Tag color="success">Diterima</Tag>
            </Option>
          </Select>
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
                <Tag color="default">Loading</Tag>
              </Option>
              <Option value="Pending">
                <Tag color="warning">Pending</Tag>
              </Option>
              <Option value="Antrian">
                <Tag color="processing">Antrian</Tag>
              </Option>
              <Option value="Terkirim">
                <Tag color="success">Terkirim</Tag>
              </Option>
            </Select>
          </>
        );
      },
    },
    {
      name: "Ditambahkan Oleh",
      width: "150px",
      sortable: true,
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
      noDataComponent={"Belum ada data Order Pembelian"}
      highlightOnHover
      pointerOnHover
      onRowClicked={(row) => openModal(row.id)}
    />
  );
}
