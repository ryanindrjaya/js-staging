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
          <p>NERACA</p>
        </div>
        <div className="uppercase">
          <p>PER {indonesianMonth}</p>
        </div>
      </div>

      <table name="table" className="w-full text-xs">
        <thead>
          <tr className="p-2">
            <th className="border-2 p-1 w-1/3" colSpan={2}>Keterangan</th>
            <th className="border-2 p-1 w-1/3">Periode Sebelumnya</th>
            <th className="border-2 p-1 w-1/3">Periode Sekarang</th>
          </tr>
        </thead>
        <tbody>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Aktiva</th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Aktiva Lancar</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Kas dan Setara Kas</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.kas.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.kas.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Piutang Usaha</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.piutang.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.piutang.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Piutang Lain-lain</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.piutangLainnya.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.piutangLainnya.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Persediaan</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.persediaan.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.persediaan.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Uang Muka Pajak</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.pajak.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.pajak.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Biaya Dibayar Dimuka</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.biayaBayardiMuka.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.biayaBayardiMuka.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Uang Muka</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.uangMuka.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.uangMuka.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Jumlah Aktiva Lancar</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.kas.previousPeriode.total +
                data.piutang.previousPeriode.total + 
                data.piutangLainnya.previousPeriode.total +
                data.persediaan.previousPeriode.total +
                data.pajak.previousPeriode.total +
                data.biayaBayardiMuka.previousPeriode.total +
                data.uangMuka.previousPeriode.total
              )}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.kas.currentPeriode.total +
                data.piutang.currentPeriode.total + 
                data.piutangLainnya.currentPeriode.total +
                data.persediaan.currentPeriode.total +
                data.pajak.currentPeriode.total +
                data.biayaBayardiMuka.currentPeriode.total +
                data.uangMuka.currentPeriode.total
              )}
            </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Aktiva Tetap</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Harga Perolehan</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.hargaPerolehanAktivaTetap.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.hargaPerolehanAktivaTetap.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Akumulasi Penyusutan</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Nilai Buku</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.nilaiBuku.previousPeriode)}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.nilaiBuku.currentPeriode)}
            </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Aktiva Lain-Lain</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Aktiva Lain-lain</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.akumulasiPenyusutanAktivaTetap.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaTetap.akumulasiPenyusutanAktivaTetap.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Jumlah Aktiva Tidak Lancar</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaLainLain.aktivaLainLain.previousPeriode.total)}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.aktivaLainLain.aktivaLainLain.currentPeriode.total)}
            </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={2}>Jumlah Aktiva</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.kas.previousPeriode.total +
                data.piutang.previousPeriode.total + 
                data.piutangLainnya.previousPeriode.total +
                data.persediaan.previousPeriode.total +
                data.pajak.previousPeriode.total +
                data.biayaBayardiMuka.previousPeriode.total +
                data.uangMuka.previousPeriode.total +

                data.aktivaTetap.nilaiBuku.previousPeriode +

                data.aktivaLainLain.aktivaLainLain.previousPeriode.total
              )}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.kas.currentPeriode.total +
                data.piutang.currentPeriode.total + 
                data.piutangLainnya.currentPeriode.total +
                data.persediaan.currentPeriode.total +
                data.pajak.currentPeriode.total +
                data.biayaBayardiMuka.currentPeriode.total +
                data.uangMuka.currentPeriode.total +

                data.aktivaTetap.nilaiBuku.currentPeriode +

                data.aktivaLainLain.aktivaLainLain.currentPeriode.total
              )}
            </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Kewajiban dan Ekuitas</th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Kewajiban Jangka Pendek</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Usaha</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangUsaha.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangUsaha.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Biaya yang masih harus dibayar</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.biayaMasihHarusDiBayar.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.biayaMasihHarusDiBayar.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Bank</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangBank.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangBank.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Pajak</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangPajak.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangPajak.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Lain-lain</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangLain.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangLain.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Jumlah Kewajiban Jangka Pendek</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahKewajibanJangkaPendek.previousPeriode.total)}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahKewajibanJangkaPendek.currentPeriode.total)}
            </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Kewajiban Jangka Panjang</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Bank</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangBankJangkaPanjang.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangBankJangkaPanjang.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Hutang Lain-lain</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangLainJangkaPanjang.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.hutangLainJangkaPanjang.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Total Kewajiban Jangka Panjang</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahKewajibanJangkaPanjang.previousPeriode.total)}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahKewajibanJangkaPanjang.currentPeriode.total)}
            </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}>Ekuitas</th>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Modal</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.modal.previousPeriode.total)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.modal.currentPeriode.total)}
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Laba (Rugi) Ditahan</td>
            <td className="border-2 p-1 text-right">
              -
            </td>
            <td className="border-2 p-1 text-right">
              -
            </td>
          </tr>
          <tr className="p-2">
            <td className="border-2 p-1"></td>
            <td className="border-2 p-1">Laba (Rugi) Tahun Tahun Berjalan</td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.retainedEarning.previousPeriode.rugiLabaTahunBerjalan)}
            </td>
            <td className="border-2 p-1 text-right">
              {formatCurrency(data.retainedEarning.currentPeriode.rugiLabaTahunBerjalan,)}
            </td>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1"></th>
            <th className="border-2 p-1">Jumlah Ekuitas</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahEkuitas.previousPeriode.total)}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(data.jumlahEkuitas.currentPeriode.total)}
            </th>
          </tr>

          <tr className="p-2">
            <th className="border-2 p-1" colSpan={4}> </th>
          </tr>
          <tr className="p-2">
            <th className="border-2 p-1" colSpan={2}> Jumlah Kewajiban dan Ekuitas</th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.jumlahKewajibanJangkaPendek.previousPeriode.total +

                data.jumlahKewajibanJangkaPanjang.previousPeriode.total +

                data.jumlahEkuitas.previousPeriode.total
              )}
            </th>
            <th className="border-2 p-1 text-right">
              {formatCurrency(
                data.jumlahKewajibanJangkaPendek.currentPeriode.total +

                data.jumlahKewajibanJangkaPanjang.currentPeriode.total +

                data.jumlahEkuitas.currentPeriode.total
              )}
            </th>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default NeracaDetailTableView;
