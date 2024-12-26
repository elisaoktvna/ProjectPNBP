import React, { useRef } from "react";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import Filter from "./Filter";
import { Link, useLocation } from "react-router-dom";
import { formatRupiah } from "./../../helpers/currency";
import LaporanPrint from "../../print/LaporanPrint";
import html2pdf from "html2pdf.js";
import { formatTanggal } from "../../helpers/Date";
const Laporan = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currDate = new Date();
  params.set("endDate", params.get("endDate") ?? currDate);
  const { data: laporan } = useFetch(`/getHistory?${params.toString()}`);

  const handlePrint = () => {
    const element = document.querySelector("#invoice");
    html2pdf(element, { margin: 20 });
  };
  console.log(params.toString());

  return (
    <Layout>
      <div className="flex flex-col" id="invoice">
        <div className="mb-6 flex justify-between ">
          <h1 className="font-semibold">
            Laporan Keuangan{" "}
            {params.get("startDate")
              ? formatTanggal(params.get("startDate")) +
                " - " +
                formatTanggal(params.get("endDate"))
              : "Bulanan"}
          </h1>
          <Filter currDate={currDate.toISOString().split("T")[0]} />
        </div>
        <h1 className="font-semibold mb-4">
          Jember, Jawa Timur,
          <br />
          Indonesia
        </h1>
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border-b py-4 text-slate-500 font-semibold w-16">
                No
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold "
                align="start"
              >
                No. transaksi
              </th>

              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Total Harga
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Tanggal Transaksi
              </th>
              <th
                data-html2canvas-ignore
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              ></th>
            </tr>
          </thead>
          <tbody>
            {laporan.length === 0 && (
              <tr>
                <td
                  className="border-b py-4 text-center text-slate-500"
                  colSpan={6}
                >
                  Data laporan tidak ada
                </td>
              </tr>
            )}
            {laporan.map((lp, i) => (
              <tr key={i}>
                <td className="border-b py-4  p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">{lp.no_transaksi}</td>
                <td className="border-b py-4">{formatRupiah(lp.totalPrice)}</td>
                <td className="border-b py-4">{formatTanggal(lp.createdAt)}</td>
                <td className="border-b py-4" data-html2canvas-ignore>
                  <Link
                    to={"/laporan/" + lp.id}
                    className="px-5 mt-5 hover:bg-green-500 hover:text-white ms-auto border text-sm py-2 bg-green-500 text-white rounded-full"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          data-html2canvas-ignore
          onClick={handlePrint}
          className="px-5 mt-5 hover:bg-[#FF8E29] hover:text-white ms-auto border text-sm py-2 bg-[#FF8E29] text-white rounded-full"
        >
          Print Invoice
        </button>
      </div>
    </Layout>
  );
};

export default Laporan;
