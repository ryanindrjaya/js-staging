import DataTable from "react-data-table-component";
import AlertDialog from "../../Alert/Alert";
import { Popover, Select, Row, Tag, notification } from "antd";
import { EditOutlined, PrinterOutlined, UnorderedListOutlined } from "@ant-design/icons";
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

  const print = (row) => {
    router.push("/dashboard/penjualan/order-penjualan/print/" + row.id, undefined, {
      shallow: true,
    });
  };

  const onConfirm = (id) => {
    console.log(id);
    onDelete(id);
  };

  const edit = (row) => {
    router.push("order-penjualan/edit/" + row.id);
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
      {row.attributes.status === "Diterima" || row.attributes.status === "Diretur" ? (
        ""
      ) : (
        <>
          <div>
            <button
              onClick={() => edit(row)}
              className=" hover:text-cyan-700 transition-colors  text-xs font-normal py-2 px-2 rounded-md "
            >
              <PrinterOutlined className="mr-2 mt-0.5 float float-left" />
              Edit
            </button>
          </div>

          <AlertDialog
            onCancel={onCancel}
            onConfirm={onConfirm}
            title="Batalkan pesanan?"
            id={row.id}
            label="Batal"
            buttonText="Batalkan"
          />
        </>
      )}
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
      width: "100px",
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
      width: "120px",
      selector: (row) => formatMyDate(row.attributes?.sale_date),
    },
    {
      name: "Customer",
      width: "100px",
      wrap: true,
      selector: (row) => row.attributes?.customer?.data?.attributes?.name ?? "-",
    },
    {
      name: "No Order Penjualan",
      width: "200px",
      selector: (row) => row.attributes?.no_sales_sell ?? "-",
    },
    // {
    //   name: "Status",
    //   width: "200px",
    //   selector: (row) => {
    //     return (
    //       <>
    //         <Select
    //           defaultValue={row.attributes.status}
    //           disabled={row.attributes.status === "Diterima"}
    //           bordered={false}
    //           onChange={(e) => onChangeStatus(e, row.id)}
    //           style={{
    //             width: "150px",
    //           }}
    //         >
    //           <Option value="Diproses" key="Diproses" className="text-black">
    //             <Tag color="default">Diproses</Tag>
    //           </Option>
    //           <Option value="Dibatalkan" key="Dibatalkan" className="text-black">
    //             <Tag color="error">Dibatalkan</Tag>
    //           </Option>
    //           <Option value="Diretur" key="Diretur" className="text-black">
    //             <Tag color="blue">Diretur</Tag>
    //           </Option>
    //           <Option value="Diterima" key="Diterima" className="text-black">
    //             <Tag color="success">Diterima</Tag>
    //           </Option>
    //         </Select>
    //       </>
    //     );
    //   },
    // },
    {
      name: "Sales",
      width: "150px",
      selector: (row) => row.attributes?.sales ?? "-",
    },
    {
      name: "Jumlah Item",
      width: "120px",
      selector: (row) => row.attributes?.total_item || row.attributes?.sales_sell_details?.data?.length || "-",
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
      noDataComponent={"--Data Kosong--"}
      pointerOnHover
      highlightOnHover
      onRowClicked={(row) => lihat(row)}
    />
  );
}
