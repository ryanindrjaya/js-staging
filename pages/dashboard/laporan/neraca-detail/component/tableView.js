import { Collapse } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import moment from "moment";
import React from "react";

function getIndonesianMonth(monthNumber) {
  const indonesianMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return indonesianMonths[monthNumber - 1];
  } else {
    return "Invalid Month";
  }
}

function camelCaseToNormal(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/\b([A-Za-z])/g, (match) => match.toUpperCase());
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

function renderTableRows(data, coaKey, previousPeriodeKey, currentPeriodeKey) {
  if (
    !data ||
    !data[coaKey] ||
    !data[previousPeriodeKey] ||
    !data[currentPeriodeKey]
  ) {
    return null; // Return null or a placeholder if the data is not available
  }

  return Object.entries(data[coaKey]).map(([key, value]) => (
    <tr className="hover:bg-gray-50" key={key}>
      <td className="p-2 border">{camelCaseToNormal(key)}</td>
      <td className="p-2 border">
        {formatCurrency(data[previousPeriodeKey][key])}
      </td>
      <td className="p-2 border">
        {formatCurrency(data[currentPeriodeKey][key])}
      </td>
      <td className="p-2 border">{value}</td>
    </tr>
  ));
}

function NeracaDetailTableView({ data, time }) {
  const currentTime = time.format("M YYYY");
  const currentTimeParse = parseInt(currentTime);
  const indonesianMonth = getIndonesianMonth(currentTimeParse);

  return (
    <div className="mt-10">
      <div className="grid justify-center w-full font-bold text-center text-sm">
        <div>
          <p>APOTEK XXX</p>
        </div>
        <div>
          <p>NERACA DETAIL</p>
        </div>
        <div className="uppercase">
          <p>PER {indonesianMonth}</p>
        </div>
      </div>

      <Collapse
        defaultActiveKey={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
        ]}
      >
        <CollapsePanel header="Kas dan Setara Kas" key="1">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.kas,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Kas dan Setara Kas</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.kas.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.kas.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Piutang Usaha" key="2">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.piutang,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Piutang</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.piutang.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.piutang.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Piutang Lain-lain" key="3">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.piutangLainnya,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Piutang</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.piutangLainnya.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.piutangLainnya.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Persediaan" key="4">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.persediaan,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Persediaan</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.persediaan.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.persediaan.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Uang Muka Pajak" key="5">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.pajak,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Muka Pajak</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.pajak.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.pajak.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Biaya Dibayar Dimuka" key="6">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.biayaBayardiMuka,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Biaya Dibayar Dimuka</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.biayaBayardiMuka.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.biayaBayardiMuka.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Uang Muka" key="7">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.uangMuka,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Uang Muka</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.uangMuka.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.uangMuka.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Aktiva Tetap" key="8">
          <p className="font-bold">a. Harga Perolehan</p>
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.aktivaTetap.hargaPerolehanAktivaTetap,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Harga Perolehan</th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode
                      .total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode
                      .total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <p className="font-bold pt-5">b. Akumulasi Penyusutan</p>
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.aktivaTetap.akumulasiPenyusutanAktivaTetap,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Akumulasi Penyusutan</th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaTetap.akumulasiPenyusutanAktivaTetap
                      .previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaTetap.akumulasiPenyusutanAktivaTetap
                      .currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <table name="table" className="w-full text-xs mt-10">
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Nilai Buku</th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.aktivaTetap.nilaiBuku.previousPeriode)}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.aktivaTetap.nilaiBuku.currentPeriode)}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Aktiva Lain-lain" key="9">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.aktivaLainLain.aktivaLainLain,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Uang Muka</th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaLainLain.aktivaLainLain.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.aktivaLainLain.aktivaLainLain.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <table name="table" className="w-full text-xs mt-10">
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">
                  Jumlah Aktiva Tidak Lancar
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.aktivaLainLain.aktivaTidakLancar.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.aktivaLainLain.aktivaTidakLancar.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Usaha" key="10">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangUsaha,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Hutang Usaha</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangUsaha.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangUsaha.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Biaya yang masih harus dibayar" key="11">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.biayaMasihHarusDiBayar,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">
                  Jumlah Biaya yang masih harus dibayar
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.biayaMasihHarusDiBayar.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.biayaMasihHarusDiBayar.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Bank" key="12">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangBank,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Hutang Bank</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangBank.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangBank.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Pajak" key="13">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangPajak,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Hutang Pajak</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangPajak.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangPajak.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Lain-lain" key="14">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangLain,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Jumlah Hutang Lain</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangLain.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.hutangLain.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <table name="table" className="w-full text-xs mt-10">
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">
                  Jumlah Kewajiban Jangka Pendek
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.jumlahKewajibanJangkaPendek.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.jumlahKewajibanJangkaPendek.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Bank Jangka Panjang" key="15">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangBankJangkaPanjang,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">
                  Jumlah Hutang Bank Jangka Panjang
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.hutangBankJangkaPanjang.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.hutangBankJangkaPanjang.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Hutang Lain-lain Jangka Panjang" key="16">
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.hutangLainJangkaPanjang,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">
                  Jumlah Hutang Lain-lain Jangka Panjang
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.hutangLainJangkaPanjang.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(
                    data.hutangLainJangkaPanjang.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <table name="table" className="w-full text-xs mt-10">
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">
                  Jumlah Kewajiban Jangka Panjang
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.jumlahKewajibanJangkaPanjang.previousPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(
                    data.jumlahKewajibanJangkaPanjang.currentPeriode.total
                  )}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
        <CollapsePanel header="Modal" key="17">
          <p className="font-bold">a. Modal</p>
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.modal,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1">Modal</th>
                <th className="border-2 p-1">
                  {formatCurrency(data.modal.previousPeriode.total)}
                </th>
                <th className="border-2 p-1">
                  {formatCurrency(data.modal.currentPeriode.total)}
                </th>
                <th className="border-2 p-1"></th>
              </tr>
            </tfoot>
          </table>

          <p className="font-bold mt-10">b. Retained Earning</p>
          <table name="table" className="w-full text-xs">
            <thead>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Keterangan</th>
                <th className="border-2 p-1 w-1/4">Periode Sebelumnya</th>
                <th className="border-2 p-1 w-1/4">Periode Sekarang</th>
                <th className="border-2 p-1 w-1/4">COA</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows(
                data.retainedEarning,
                "coa",
                "previousPeriode",
                "currentPeriode"
              )}
            </tbody>
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Total Retained Earning</th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.retainedEarning.previousPeriode.total)}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.retainedEarning.currentPeriode.total)}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>

          <table name="table" className="w-full text-xs mt-10">
            <tfoot>
              <tr className="p-2">
                <th className="border-2 p-1 w-1/4">Jumlah Ekuitas</th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.jumlahEkuitas.previousPeriode.total)}
                </th>
                <th className="border-2 p-1 w-1/4">
                  {formatCurrency(data.jumlahEkuitas.currentPeriode.total)}
                </th>
                <th className="border-2 p-1 w-1/4"></th>
              </tr>
            </tfoot>
          </table>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

export default NeracaDetailTableView;
