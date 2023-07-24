import DataTable from "react-data-table-component";
import AlertDialog from "../Alert/Alert";
import { Popover } from "antd";
import { EditOutlined, BarsOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function ReactDataTable({ data, onDelete, onUpdate, onPageChange }) {
  const router = useRouter();
  const lihat = (row) => {
    const id = row.id;

    router.replace(
      {
        pathname: router.pathname,
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  const onConfirm = (id) => {
    // console.log(id);
    onDelete(id);
  };

  const onCancel = () => {
    console.log("onCancel");
  };

  const onEdit = (id) => {
    onUpdate(id);
  };

  const reverseData = data.data.map((val, index, array) => array[array.length - 1 - index]);

  const content = (row) => (
    <div>
      <div>
        <button
          onClick={() => lihat(row)}
          className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
        >
          <BarsOutlined className="mr-2 mt-0.5 float float-left" />
          Lihat
        </button>
      </div>
      <button
        onClick={() => onEdit(row.id)}
        className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
      >
        <EditOutlined className="mr-2 mt-0.5 float float-left" />
        Edit
      </button>
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
      selector: (row) => (
        <>
          <Popover content={content(row)} placement="bottom">
            <button className=" text-cyan-700  transition-colors  text-xs font-normal py-2 rounded-md ">
              Tindakan
            </button>
          </Popover>
        </>
      ),
    },
    {
      name: "SKU",
      sortable: true,
      selector: (row) => row.attributes?.SKU,
    },
    {
      name: "Nama Produk",
      sortable: true,
      selector: (row) => row.attributes?.name,
    },
    {
      name: "Kategori",
      sortable: true,
      selector: (row) => row.attributes?.category?.data?.attributes?.name,
    },
    {
      name: "Pabrikasi",
      sortable: true,
      selector: (row) => row.attributes?.manufacture?.data?.attributes?.name,
    },
    {
      name: "Deskripsi",
      sortable: true,
      selector: (row) => row.attributes?.description,
    },
  ];

  return (
    <DataTable
      customStyles={customStyles}
      onChangePage={onPageChange}
      paginationRowsPerPageOptions={[10]}
      paginationTotalRows={data?.meta?.pagination.total}
      columns={columns}
      data={reverseData}
      defaultSortAsc={false}
      pagination
      pointerOnHover
      highlightOnHover
      onRowClicked={(row) => lihat(row)}
    />
  );
}
