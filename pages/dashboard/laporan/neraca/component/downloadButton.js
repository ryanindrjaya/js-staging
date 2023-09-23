import { Button } from "antd";
import React from "react";
import { CSVLink } from "react-csv";

export default function DownloadButton({ data, currentTime }) {
  const csvData = [
    ["KEELOLA"],
    ["NERACA DETAIL"],
    ["Per", currentTime.format("M YYYY")],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang"],
    [],
    ["Aktiva"],
    ["Aktiva Lancar"],
    ["Kas dan Setara Kas", data.kas.previousPeriode.total, data.kas.currentPeriode.total],
    ["Piutang Usaha", data.piutang.previousPeriode.total, data.piutang.currentPeriode.total],
    ["Piutang Lain-lain", data.piutangLainnya.previousPeriode.total, data.piutangLainnya.currentPeriode.total],
    ["Persediaan", data.persediaan.previousPeriode.total, data.persediaan.currentPeriode.total],
    ["Uang Muka Pajak", data.pajak.previousPeriode.total, data.pajak.currentPeriode.total],
    ["Biaya Dibayar Dimuka", data.biayaBayardiMuka.previousPeriode.total, data.biayaBayardiMuka.currentPeriode.total],
    ["Uang Muka", data.uangMuka.previousPeriode.total, data.uangMuka.currentPeriode.total],
    [
      "Jumlah Aktiva Lancar",
      data.kas.previousPeriode.total +
        data.piutang.previousPeriode.total +
        data.piutangLainnya.previousPeriode.total +
        data.persediaan.previousPeriode.total +
        data.pajak.previousPeriode.total +
        data.uangMuka.previousPeriode.total +
        data.biayaBayardiMuka.previousPeriode.total,

      data.kas.currentPeriode.total +
        data.piutang.currentPeriode.total +
        data.piutangLainnya.currentPeriode.total +
        data.persediaan.currentPeriode.total +
        data.pajak.currentPeriode.total +
        data.uangMuka.currentPeriode.total +
        data.biayaBayardiMuka.currentPeriode.total,
    ],
    ["Aktiva Tetap"],
    [
      "Harga Perolehan",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.total,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.total,
    ],
    [
      "Akumulasi Penyusutan",
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.total,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.total,
    ],
    ["Nilai Buku", data.aktivaTetap.nilaiBuku.previousPeriode, data.aktivaTetap.nilaiBuku.currentPeriode],
    ["Aktiva Lain-lain"],
    [
      "Aktiva Lain-lain",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.total,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.total,
    ],
    [
      "Jumlah Aktiva Tidak Lancar",
      data.aktivaLainLain.aktivaTidakLancar.previousPeriode.total,
      data.aktivaLainLain.aktivaTidakLancar.currentPeriode.total,
    ],
    [
      "Jumlah Aktiva",
      data.aktivaTetap.nilaiBuku.previousPeriode +
        data.kas.previousPeriode.total +
        data.piutang.previousPeriode.total +
        data.piutangLainnya.previousPeriode.total +
        data.persediaan.previousPeriode.total +
        data.pajak.previousPeriode.total +
        data.uangMuka.previousPeriode.total +
        data.biayaBayardiMuka.previousPeriode.total +
        data.aktivaLainLain.aktivaTidakLancar.previousPeriode.total,

      data.aktivaTetap.nilaiBuku.currentPeriode +
        data.kas.currentPeriode.total +
        data.piutang.currentPeriode.total +
        data.piutangLainnya.currentPeriode.total +
        data.persediaan.currentPeriode.total +
        data.pajak.currentPeriode.total +
        data.uangMuka.currentPeriode.total +
        data.biayaBayardiMuka.currentPeriode.total +
        data.aktivaLainLain.aktivaTidakLancar.currentPeriode.total,
    ],

    [],
    ["Kewajiban dan Ekuitas"],
    ["Kewajiban Jangka Pendek"],
    ["Hutang Usaha", data.hutangUsaha.previousPeriode.total, data.hutangUsaha.currentPeriode.total],
    [
      "Biaya yang masih harus dibayar",
      data.biayaMasihHarusDiBayar.previousPeriode.total,
      data.biayaMasihHarusDiBayar.currentPeriode.total,
    ],
    ["Hutang Bank", data.hutangBank.previousPeriode.total, data.hutangBank.currentPeriode.total],
    ["Hutang Pajak", data.hutangPajak.previousPeriode.total, data.hutangPajak.currentPeriode.total],
    ["Hutang Lain-lain", data.hutangLain.previousPeriode.total, data.hutangLain.currentPeriode.total],
    [
      "Jumlah Kewajiban Jangka Pendek",
      data.jumlahKewajibanJangkaPendek.previousPeriode.total,
      data.jumlahKewajibanJangkaPendek.currentPeriode.total,
    ],
    ["Kewajiban Jangka Panjang"],
    [
      "Hutang Bank",
      data.hutangBankJangkaPanjang.previousPeriode.total,
      data.hutangBankJangkaPanjang.currentPeriode.total,
    ],
    [
      "Hutang Lain-lain",
      data.hutangLainJangkaPanjang.previousPeriode.total,
      data.hutangLainJangkaPanjang.currentPeriode.total,
    ],
    [
      "Jumlah Kewajiban Jangka Panjang",
      data.jumlahKewajibanJangkaPanjang.previousPeriode.total,
      data.jumlahKewajibanJangkaPanjang.currentPeriode.total,
    ],
    ["Ekuitas"],
    ["Modal"],
    ["Modal", data.modal.previousPeriode.total, data.modal.currentPeriode.total],
    ["Laba (Rugi) Ditahan", "-", "-"],
    [
      "Laba (Rugi) Tahun Tahun Berjalan",
      data.retainedEarning.previousPeriode.rugiLabaTahunBerjalan,
      data.retainedEarning.currentPeriode.rugiLabaTahunBerjalan,
    ],
    ["Jumlah Ekuitas", data.jumlahEkuitas.previousPeriode.total, data.jumlahEkuitas.currentPeriode.total],
    [
      "Jumlah Kewajiban dan Ekuitas",
      data.jumlahKewajibanJangkaPendek.previousPeriode.total +
        data.jumlahKewajibanJangkaPanjang.previousPeriode.total +
        data.jumlahEkuitas.previousPeriode.total,

      data.jumlahKewajibanJangkaPendek.currentPeriode.total +
        data.jumlahKewajibanJangkaPanjang.currentPeriode.total +
        data.jumlahEkuitas.currentPeriode.total,
    ],
  ];

  return (
    <CSVLink
      filename="neraca.csv"
      data={csvData}
      className="text-white text-lg font-semibold py-2 px-4 rounded bg-cyan-500 hover:bg-cyan-600 flex float-right no-underline"
    >
      Download CSV
    </CSVLink>
  );
}
