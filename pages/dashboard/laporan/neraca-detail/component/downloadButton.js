import { Button } from "antd";
import React from "react";
import { CSVLink } from "react-csv";

export default function DownloadButton({ data, currentTime}) {
  const csvData = [
    ["APOTEK SEJATI"],
    ["NERACA DETAIL"],
    ["Per", currentTime.format("M YYYY")],
    ["Kas dan Setara Kas"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Kas Besar",
      data.kas.previousPeriode.kasBesar,
      data.kas.currentPeriode.kasBesar,
      data.kas.coa.kasBesar,
    ],
    [
      "Kas Kecil",
      data.kas.previousPeriode.kasKecil,
      data.kas.currentPeriode.kasKecil,
      data.kas.coa.kasKecil,
    ],
    [
      "Kas Kecil Sejati",
      data.kas.previousPeriode.kasKecilSejati,
      data.kas.currentPeriode.kasKecilSejati,
      data.kas.coa.kasKecilSejati,
    ],
    [
      "Kas Kecil Sales Outlet",
      data.kas.previousPeriode.kasKecilSalesOutlet,
      data.kas.currentPeriode.kasKecilSalesOutlet,
      data.kas.coa.kasKecilSalesOutlet,
    ],
    [
      "Kas E",
      data.kas.previousPeriode.kasE,
      data.kas.currentPeriode.kasE,
      data.kas.coa.kasE,
    ],
    [
      "Kas Kecil Jaya Sehat",
      data.kas.previousPeriode.kasKecilJayaSehat,
      data.kas.currentPeriode.kasKecilJayaSehat,
      data.kas.coa.kasKecilJayaSehat,
    ],
    [
      "Bank",
      data.kas.previousPeriode.bank,
      data.kas.currentPeriode.bank,
      data.kas.coa.bank,
    ],
    [
      "Bank BCA Transfer",
      data.kas.previousPeriode.bankBcaTransfer,
      data.kas.currentPeriode.bankBcaTransfer,
      data.kas.coa.bankBcaTransfer,
    ],
    [
      "Bank BCA Giro",
      data.kas.previousPeriode.bankBcaGiro,
      data.kas.currentPeriode.bankBcaGiro,
      data.kas.coa.bankBcaGiro,
    ],
    [
      "Bank BCA Payroll",
      data.kas.previousPeriode.bankBcaPayroll,
      data.kas.currentPeriode.bankBcaPayroll,
      data.kas.coa.bankBcaPayroll,
    ],
    [
      "Bank BCA Debit",
      data.kas.previousPeriode.bankBcaDebit,
      data.kas.currentPeriode.bankBcaDebit,
      data.kas.coa.bankBcaDebit,
    ],
    [
      "Bank BCA",
      data.kas.previousPeriode.bankBCA,
      data.kas.currentPeriode.bankBCA,
      data.kas.coa.bankBCA,
    ],
    [
      "Bank Mandiri",
      data.kas.previousPeriode.bankMandiri,
      data.kas.currentPeriode.bankMandiri,
      data.kas.coa.bankMandiri,
    ],
    [
      "Bank Niaga",
      data.kas.previousPeriode.bankNiaga,
      data.kas.currentPeriode.bankNiaga,
      data.kas.coa.bankNiaga,
    ],
    [
      "Jumlah Kas dan Setara Kas",
      data.kas.previousPeriode.total,
      data.kas.currentPeriode.total,
    ],
    [],
    ["Piutang Usaha"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Piutang Usaha",
      data.piutang.previousPeriode.piutangUsaha,
      data.piutang.currentPeriode.piutangUsaha,
      data.piutang.coa.piutangUsaha,
    ],
    [
      "Piutang Usaha Sejati",
      data.piutang.previousPeriode.piutangUsahaSejati,
      data.piutang.currentPeriode.piutangUsahaSejati,
      data.piutang.coa.piutangUsahaSejati,
    ],
    [
      "Piutang Usaha Jaya Sehat",
      data.piutang.previousPeriode.piutangUsahaJayaSehat,
      data.piutang.currentPeriode.piutangUsahaJayaSehat,
      data.piutang.coa.piutangUsahaJayaSehat,
    ],
    [
      "Piutang Usaha Sales Outlet",
      data.piutang.previousPeriode.piutangUsahaSalesOutlet,
      data.piutang.currentPeriode.piutangUsahaSalesOutlet,
      data.piutang.coa.piutangUsahaSalesOutlet,
    ],
    [
      "Piutang Usaha Giro",
      data.piutang.previousPeriode.piutangUsahaGiro,
      data.piutang.currentPeriode.piutangUsahaGiro,
      data.piutang.coa.piutangUsahaGiro,
    ],
    [
      "Jumlah Piutang",
      data.piutang.previousPeriode.total,
      data.piutang.currentPeriode.total,
    ],
    [],
    ["Piutang Lain-lain"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Piutang Lainnya",
      data.piutangLainnya.previousPeriode.piutangLainnya,
      data.piutangLainnya.currentPeriode.piutangLainnya,
      data.piutangLainnya.coa.piutangLainnya,
    ],
    [
      "Piutang Retur",
      data.piutangLainnya.previousPeriode.piutangRetur,
      data.piutangLainnya.currentPeriode.piutangRetur,
      data.piutangLainnya.coa.piutangRetur,
    ],
    [
      "Jumlah Piutang",
      data.piutangLainnya.previousPeriode.total,
      data.piutangLainnya.currentPeriode.total,
    ],
    [],
    ["Persediaan"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Persediaan",
      data.persediaan.previousPeriode.persediaan,
      data.persediaan.currentPeriode.persediaan,
      data.persediaan.coa.persediaan,
    ],
    [
      "Goods In Transit",
      data.persediaan.previousPeriode.goodsInTransit,
      data.persediaan.currentPeriode.goodsInTransit,
      data.persediaan.coa.goodsInTransit,
    ],
    [
      "Jumlah Persediaan",
      data.persediaan.previousPeriode.total,
      data.persediaan.currentPeriode.total,
    ],
    [],
    ["Uang Muka Pajak"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Uang Muka Pajak PPH PS 21",
      data.pajak.previousPeriode.PPHPS21,
      data.pajak.currentPeriode.PPHPS21,
      data.pajak.coa.PPHPS21,
    ],
    [
      "Uang Muka Pajak PPH PS 22",
      data.pajak.previousPeriode.PPHPS22,
      data.pajak.currentPeriode.PPHPS22,
      data.pajak.coa.PPHPS22,
    ],
    [
      "Uang Muka Pajak PPH PS 23",
      data.pajak.previousPeriode.PPHPS23,
      data.pajak.currentPeriode.PPHPS23,
      data.pajak.coa.PPHPS23,
    ],
    [
      "Uang Muka Pajak PPH 25",
      data.pajak.previousPeriode.PPHPS25,
      data.pajak.currentPeriode.PPHPS25,
      data.pajak.coa.PPHPS25,
    ],
    [
      "Uang Muka Pajak PPN",
      data.pajak.previousPeriode.PPHPSPPN,
      data.pajak.currentPeriode.PPHPSPPN,
      data.pajak.coa.PPHPSPPN,
    ],
    [
      "Jumlah Uang Muka Pajak",
      data.pajak.previousPeriode.total,
      data.pajak.currentPeriode.total,
    ],
    [],
    ["Biaya Dibayar Dimuka"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Biaya Dibayar Dimuka",
      data.biayaBayardiMuka.previousPeriode.bayarDiMuka,
      data.biayaBayardiMuka.currentPeriode.bayarDiMuka,
      data.biayaBayardiMuka.coa.bayarDiMuka,
    ],
    [
      "Biaya Dibayar Dimuka Bunga",
      data.biayaBayardiMuka.previousPeriode.bayarDiMukaBunga,
      data.biayaBayardiMuka.currentPeriode.bayarDiMukaBunga,
      data.biayaBayardiMuka.coa.bayarDiMukaBunga,
    ],
    [
      "Biaya Dibayar Dimuka Sewa",
      data.biayaBayardiMuka.previousPeriode.bayarDiMukaSewa,
      data.biayaBayardiMuka.currentPeriode.bayarDiMukaSewa,
      data.biayaBayardiMuka.coa.bayarDiMukaSewa,
    ],
    [
      "Jumlah Biaya Dibayar Dimuka",
      data.biayaBayardiMuka.previousPeriode.total,
      data.biayaBayardiMuka.currentPeriode.total,
    ],
    [],
    ["Uang Muka"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Uang Muka",
      data.uangMuka.previousPeriode.uangMuka,
      data.uangMuka.currentPeriode.uangMuka,
      data.uangMuka.coa.uangMuka,
    ],
    [
      "Uang Muka Pembelian",
      data.uangMuka.previousPeriode.uangMukaPembelian,
      data.uangMuka.currentPeriode.uangMukaPembelian,
      data.uangMuka.coa.uangMukaPembelian,
    ],
    [
      "Jumlah Uang Muka",
      data.uangMuka.previousPeriode.total,
      data.uangMuka.currentPeriode.total,
    ],
    [],
    ["Aktiva Tetap"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    ["a. Harga Perolehan"],
    [
      "Aset Tetap",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.asetTetap,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.asetTetap,
      data.aktivaTetap.hargaPerolehanAktivaTetap.coa.asetTetap,
    ],
    [
      "Aktiva Tetap Tanah",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.aktivaTetapTanah,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.aktivaTetapTanah,
      data.aktivaTetap.hargaPerolehanAktivaTetap.coa.aktivaTetapTanah,
    ],
    [
      "Aktiva Tetap Bangunan",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.aktivaTetapBangunan,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.aktivaTetapBangunan,
      data.aktivaTetap.hargaPerolehanAktivaTetap.coa.aktivaTetapBangunan,
    ],
    [
      "Aktiva Tetap Kendaraan",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.aktivaTetapKendaraan,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.aktivaTetapKendaraan,
      data.aktivaTetap.hargaPerolehanAktivaTetap.coa.aktivaTetapKendaraan,
    ],
    [
      "Aktiva Tetap Inventaris Kantor",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.aktivaTetapInventarisKantor,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.aktivaTetapInventarisKantor,
      data.aktivaTetap.hargaPerolehanAktivaTetap.coa.aktivaTetapInventarisKantor,
    ],
    [
      "Jumlah Harga Perolehan",
      data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.total,
      data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.total,
    ],
    [],
    ["b. Akumulasi Penyusutan"],
    [
      "Akumulasi Penyusutan Aktiva Tetap Bangunan",
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.bangunan,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.bangunan,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.coa.bangunan,
    ],
    [
      "Akumulasi Penyusutan Aktiva Tetap Kendaraan",
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.kendaraan,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.kendaraan,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.coa.kendaraan,
    ],
    [
      "Akumulasi Penyusutan Aktiva Tetap Inventaris Kantor",
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.kantor,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.kantor,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.coa.kantor,
    ],
    [
      "Jumlah Akumulasi Penyusutan",
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.total,
      data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.total,
    ],
    [
      "Nilai Buku",
      data.aktivaTetap.nilaiBuku.previousPeriode,
      data.aktivaTetap.nilaiBuku.currentPeriode,
    ],
    [],
    ["Aktiva Lain-lain"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Rekening Antar Cabang",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.rekeningAntarCabang,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.rekeningAntarCabang,
      data.aktivaLainLain.aktivaLainLain.coa.rekeningAntarCabang,
    ],
    [
      "Aktiva Lain-lain",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.aktivaLainLain,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.aktivaLainLain,
      data.aktivaLainLain.aktivaLainLain.coa.aktivaLainLain,
    ],
    [
      "Surat Berharga",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.suratBerharga,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.suratBerharga,
      data.aktivaLainLain.aktivaLainLain.coa.suratBerharga,
    ],
    [
      "Deposito",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.deposito,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.deposito,
      data.aktivaLainLain.aktivaLainLain.coa.deposito,
    ],
    [
      "Saham",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.saham,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.saham,
      data.aktivaLainLain.aktivaLainLain.coa.saham,
    ],
    [
      "Surat Berharga Lainnya",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.suratBerhargaLainnya,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.suratBerhargaLainnya,
      data.aktivaLainLain.aktivaLainLain.coa.suratBerhargaLainnya,
    ],
    [
      "Jumlah Aktiva Lain-lain",
      data.aktivaLainLain.aktivaLainLain.previousPeriode.total,
      data.aktivaLainLain.aktivaLainLain.currentPeriode.total,
    ],
    [
      "Jumlah Aktiva Tidak Lancar",
      data.aktivaLainLain.aktivaTidakLancar.previousPeriode.total,
      data.aktivaLainLain.aktivaTidakLancar.currentPeriode.total,
    ],
    [],
    ["Hutang Usaha"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang",
      data.hutangUsaha.previousPeriode.hutang,
      data.hutangUsaha.currentPeriode.hutang,
      data.hutangUsaha.coa.hutang,
    ],
    [
      "Hutang Jangka Pendek",
      data.hutangUsaha.previousPeriode.hutangJangkaPendek,
      data.hutangUsaha.currentPeriode.hutangJangkaPendek,
      data.hutangUsaha.coa.hutangJangkaPendek,
    ],
    [
      "Hutang Usaha",
      data.hutangUsaha.previousPeriode.utangUsaha,
      data.hutangUsaha.currentPeriode.utangUsaha,
      data.hutangUsaha.coa.utangUsaha,
    ],
    [
      "Hutang Retur",
      data.hutangUsaha.previousPeriode.hutangRetur,
      data.hutangUsaha.currentPeriode.hutangRetur,
      data.hutangUsaha.coa.hutangRetur,
    ],
    [
      "Jumlah Hutang Usaha",
      data.hutangUsaha.previousPeriode.total,
      data.hutangUsaha.currentPeriode.total,
    ],
    [],
    ["Biaya yang masih harus dibayar"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Biaya yang masih harus dibayar",
      data.biayaMasihHarusDiBayar.previousPeriode.biayaYangMasihHarusDibayar,
      data.biayaMasihHarusDiBayar.currentPeriode.biayaYangMasihHarusDibayar,
      data.biayaMasihHarusDiBayar.coa.biayaYangMasihHarusDibayar,
    ],
    [
      "Jumlah Biaya yang masih harus dibayar",
      data.biayaMasihHarusDiBayar.previousPeriode.total,
      data.biayaMasihHarusDiBayar.currentPeriode.total,
    ],
    [],
    ["Hutang Bank"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang Bank",
      data.hutangBank.previousPeriode.hutangBank,
      data.hutangBank.currentPeriode.hutangBank,
      data.hutangBank.coa.hutangBank,
    ],
    [
      "Jumlah Hutang Bank",
      data.hutangBank.previousPeriode.total,
      data.hutangBank.currentPeriode.total,
    ],
    [],
    ["Hutang Pajak"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang Pajak",
      data.hutangPajak.previousPeriode.pajak,
      data.hutangPajak.currentPeriode.pajak,
      data.hutangPajak.coa.pajak,
    ],
    [
      "Hutang Pajak PPH-22",
      data.hutangPajak.previousPeriode.pajakPPH22,
      data.hutangPajak.currentPeriode.pajakPPH22,
      data.hutangPajak.coa.pajakPPH22,
    ],
    [
      "Hutang Pajak PPH-23",
      data.hutangPajak.previousPeriode.pajakPPH23,
      data.hutangPajak.currentPeriode.pajakPPH23,
      data.hutangPajak.coa.pajakPPH23,
    ],
    [
      "Hutang Pajak PPH-25",
      data.hutangPajak.previousPeriode.pajakPPH25,
      data.hutangPajak.currentPeriode.pajakPPH25,
      data.hutangPajak.coa.pajakPPH25,
    ],
    [
      "Hutang Pajak PPH-29",
      data.hutangPajak.previousPeriode.pajakPPH29,
      data.hutangPajak.currentPeriode.pajakPPH29,
      data.hutangPajak.coa.pajakPPH29,
    ],
    [
      "Hutang Pajak PPH-4 Ayat 2",
      data.hutangPajak.previousPeriode.pajakPPH4Ayat2,
      data.hutangPajak.currentPeriode.pajakPPH4Ayat2,
      data.hutangPajak.coa.pajakPPH4Ayat2,
    ],
    [
      "Hutang Pajak PPN",
      data.hutangPajak.previousPeriode.pajakPPN,
      data.hutangPajak.currentPeriode.pajakPPN,
      data.hutangPajak.coa.pajakPPN,
    ],
    [
      "Jumlah Hutang Pajak",
      data.hutangPajak.previousPeriode.total,
      data.hutangPajak.currentPeriode.total,
    ],
    [],
    ["Hutang Lain-lain"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang Lain-lain",
      data.hutangLain.previousPeriode.utangLain2,
      data.hutangLain.currentPeriode.utangLain2,
      data.hutangLain.coa.utangLain2,
    ],
    [
      "Uang Muka Penjualan",
      data.hutangLain.previousPeriode.uangMukaPenjualan,
      data.hutangLain.currentPeriode.uangMukaPenjualan,
      data.hutangLain.coa.uangMukaPenjualan,
    ],
    [
      "Jumlah Hutang Lain-lain",
      data.hutangLain.previousPeriode.total,
      data.hutangLain.currentPeriode.total,
    ],
    [
      "Jumlah Kewajiban Jangka Pendek",
      data.jumlahKewajibanJangkaPendek.previousPeriode.total,
      data.jumlahKewajibanJangkaPendek.currentPeriode.total,
    ],
    [],
    ["Hutang Bank Jangka Panjang"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang Giro",
      data.hutangBankJangkaPanjang.previousPeriode.utangGiro,
      data.hutangBankJangkaPanjang.currentPeriode.utangGiro,
      data.hutangBankJangkaPanjang.coa.utangGiro,
    ],
    [
      "Jumlah Hutang Bank Jangka Panjang",
      data.hutangBankJangkaPanjang.previousPeriode.total,
      data.hutangBankJangkaPanjang.currentPeriode.total,
    ],
    [],
    ["Hutang Lain-lain Jangka Panjang"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    [
      "Hutang Jangka Panjang",
      data.hutangLainJangkaPanjang.previousPeriode.utangJangkaPanjang,
      data.hutangLainJangkaPanjang.currentPeriode.utangJangkaPanjang,
      data.hutangLainJangkaPanjang.coa.utangJangkaPanjang,
    ],
    [
      "Jumlah Hutang Lain-lain Jangka Panjang",
      data.hutangLainJangkaPanjang.previousPeriode.total,
      data.hutangLainJangkaPanjang.currentPeriode.total,
    ],
    [
      "Jumlah Kewajiban Jangka Panjang",
      data.jumlahKewajibanJangkaPanjang.previousPeriode.total,
      data.jumlahKewajibanJangkaPanjang.currentPeriode.total,
    ],

    [],
    ["Modal"],
    ["Keterangan", "Periode Sebelumnya", "Periode Sekarang", "COA"],
    ["a. Modal"],
    [
      "Modal",
      data.modal.previousPeriode.modal,
      data.modal.currentPeriode.modal,
      data.modal.coa.modal,
    ],
    [
      "Total Modal",
      data.modal.previousPeriode.total,
      data.modal.currentPeriode.total,
    ],
    [],
    ["b. Retained Earning"],
    [
      "Rugi/Laba Tahun Lalu",
      data.retainedEarning.previousPeriode.rugiLabaTahunLalu,
      data.retainedEarning.currentPeriode.rugiLabaTahunLalu,
      data.retainedEarning.coa.rugiLabaTahunLalu,
    ],
    [
      "Rugi/Laba Tahun Berjalan",
      data.retainedEarning.previousPeriode.rugiLabaTahunBerjalan,
      data.retainedEarning.currentPeriode.rugiLabaTahunBerjalan,
      data.retainedEarning.coa.rugiLabaTahunBerjalan,
    ],
    [
      "Koreksi Rugi/Laba",
      data.retainedEarning.previousPeriode.koreksiRugiLaba,
      data.retainedEarning.currentPeriode.koreksiRugiLaba,
      data.retainedEarning.coa.koreksiRugiLaba,
    ],
    [
      "Modal",
      data.retainedEarning.previousPeriode.modal,
      data.retainedEarning.currentPeriode.modal,
      data.retainedEarning.coa.modal,
    ],
    [
      "Prive",
      data.retainedEarning.previousPeriode.priva,
      data.retainedEarning.currentPeriode.priva,
      data.retainedEarning.coa.priva,
    ],
    [
      "Total Retained Earning",
      data.retainedEarning.previousPeriode.total,
      data.retainedEarning.currentPeriode.total,
    ],
    [],
    [
      "Jumlah Ekuitas",
      data.jumlahEkuitas.previousPeriode.total,
      data.jumlahEkuitas.currentPeriode.total,
    ],
  ];

  return (
    <CSVLink
      filename="neraca-detail.csv"
      data={csvData}
      className="text-white text-lg font-semibold py-2 px-4 rounded bg-cyan-500 hover:bg-cyan-600 flex float-right no-underline"
    >
      Download CSV
    </CSVLink>
  );
}
