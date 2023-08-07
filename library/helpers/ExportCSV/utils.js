import moment from "moment";

const headers = [
  "FK",
  "KD_JENIS_TRANSAKSI",
  "FG_PENGGANTI",
  "NOMOR_FAKTUR",
  "MASA_PAJAK",
  "TAHUN_PAJAK",
  "TANGGAL_FAKTUR",
  "NPWP",
  "NAMA",
  "ALAMAT_LENGKAP",
  "JUMLAH_DPP",
  "JUMLAH_PPN",
  "JUMLAH_PPNBM",
  "ID_KETERANGAN_TAMBAHAN",
  "FG_UANG_MUKA",
  "UANG_MUKA_DPP",
  "UANG_MUKA_PPN",
  "UANG_MUKA_PPNBM",
  "REFERENSI",
];

const boilerPlateData1 = {
  FK: "LT",
  KD_JENIS_TRANSAKSI: "NPWP",
  FG_PENGGANTI: "NAMA",
  NOMOR_FAKTUR: "JALAN",
  MASA_PAJAK: "BLOK",
  TAHUN_PAJAK: "NOMOR",
  TANGGAL_FAKTUR: "RT",
  NPWP: "RW",
  NAMA: "KECAMATAN",
  ALAMAT_LENGKAP: "KELURAHAN",
  JUMLAH_DPP: "KABUPATEN",
  JUMLAH_PPN: "PROPINSI",
  JUMLAH_PPNBM: "KODE_POS",
  ID_KETERANGAN_TAMBAHAN: "NOMOR_TELEPON",
  FG_UANG_MUKA: null,
  UANG_MUKA_DPP: null,
  UANG_MUKA_PPN: null,
  UANG_MUKA_PPNBM: null,
  REFERENSI: null,
};

const boilerPlateData2 = {
  FK: "OF",
  KD_JENIS_TRANSAKSI: "KODE_OBJEK",
  FG_PENGGANTI: "NAMA",
  NOMOR_FAKTUR: "HARGA_SATUAN",
  MASA_PAJAK: "JUMLAH_BARANG",
  TAHUN_PAJAK: "HARGA_TOTAL",
  TANGGAL_FAKTUR: "DISKON",
  NPWP: "DPP",
  NAMA: "PPN",
  ALAMAT_LENGKAP: "TARIF_PPNBM",
  JUMLAH_DPP: "PPNBM",
  JUMLAH_PPN: null,
  JUMLAH_PPNBM: null,
  ID_KETERANGAN_TAMBAHAN: null,
  FG_UANG_MUKA: null,
  UANG_MUKA_DPP: null,
  UANG_MUKA_PPN: null,
  UANG_MUKA_PPNBM: null,
  REFERENSI: null,
};

const createData = (data) => {
  const dataToExport = data.map((item) => {
    const result = Object.values(
      item?.attributes?.detail_no_faktur_lists?.data?.reduce((acc, curr) => {
        // accumulate qty based on product sku
        if (acc[curr?.code]) {
          acc[curr?.code] = {
            ...acc[curr?.code],
            qty: acc[curr?.code].qty + curr?.qty,
            total: acc[curr?.code].total + curr?.total,
            discount_total: acc[curr?.code].discount_total + curr?.discount_total,
          };
        } else {
          acc[curr?.attributes?.code] = curr?.attributes;
        }

        return acc;
      }, {})
    );
    return [
      {
        FK: "FK",
        KD_JENIS_TRANSAKSI: "01",
        FG_PENGGANTI: 0,
        NOMOR_FAKTUR: `${item?.attributes?.no_faktur}` || null,
        MASA_PAJAK: 1,
        TAHUN_PAJAK: moment(item?.attributes?.detail_dokumen?.sale_date).format("YYYY") || null,
        TANGGAL_FAKTUR: moment(item?.attributes?.detail_dokumen?.sale_date).format("L") || null,
        NPWP: item?.attributes?.detail_dokumen?.attributes?.customer?.data?.attributes.NPWP || null,
        NAMA:
          item?.attributes?.detail_dokumen?.customer?.name || item?.attributes?.detail_dokumen?.customer_name || null,
        ALAMAT_LENGKAP:
          item?.attributes?.detail_dokumen?.customer?.address || item?.attributes?.detail_dokumen?.address || null,
        JUMLAH_DPP: item?.attributes?.detail_dokumen?.dpp || null,
        JUMLAH_PPN: item?.attributes?.detail_dokumen?.ppn || null,
        JUMLAH_PPNBM: item?.attributes?.detail_dokumen?.total_ppnbm || null,
        ID_KETERANGAN_TAMBAHAN: item?.attributes?.detail_dokumen?.keterangan_tambahan || null,
        FG_UANG_MUKA: 0,
        UANG_MUKA_DPP: 0,
        UANG_MUKA_PPN: 0,
        UANG_MUKA_PPNBM: 0,
        REFERENSI: item?.attributes?.no_referensi || null,
      },
      ...result.map((detail) => {
        return {
          FK: "OF",
          KD_JENIS_TRANSAKSI: `${detail?.code}` || null,
          FG_PENGGANTI: detail?.name || null,
          NOMOR_FAKTUR: detail?.unit_price || 0,
          MASA_PAJAK: detail?.qty || 0,
          TAHUN_PAJAK: detail?.total || 0,
          TANGGAL_FAKTUR: detail?.discount_total || 0,
          NPWP: detail?.dpp || 0,
          NAMA: detail?.ppn || 0,
          ALAMAT_LENGKAP: detail?.tarif_ppnbm || 0,
          JUMLAH_DPP: detail?.ppnbm || 0,
          JUMLAH_PPN: null,
          JUMLAH_PPNBM: null,
          ID_KETERANGAN_TAMBAHAN: null,
          FG_UANG_MUKA: null,
          UANG_MUKA_DPP: null,
          UANG_MUKA_PPN: null,
          UANG_MUKA_PPNBM: null,
          REFERENSI: null,
        };
      }),
    ];
  });

  const dataToExportFlat = dataToExport.flat();
  return {
    status: true,
    data: dataToExportFlat,
  };
};

export { createData, boilerPlateData1, boilerPlateData2, headers };
