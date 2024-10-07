import React from "react";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import Filter from "./Filter";
import { useLocation } from "react-router-dom";
import { formatRupiah } from "./../../helpers/currency";
const Laporan = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currDate = new Date().toISOString().split("T")[0];
  params.set("endDate", currDate);
  const { data: laporan } = useFetch(`/getHistory?${params.toString()}`);
  console.log(`/getHistory?${params.toString()}`);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="mb-6 flex justify-between ">
          <h1 className="font-semibold">Laporan Keuangan Bulanan</h1>
          <Filter currDate={currDate} />
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
                className="border-b py-4 text-slate-500 font-semibold w-[150px]"
                align="start"
              >
                Nama Produk
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Total Terjual
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Harga Satuan
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Total Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {laporan.length == 0 && (
              <tr>
                <td
                  className="border-b py-4 text-center text-slate-500"
                  colSpan={6}
                >
                  Data laporan tidak ada
                </td>
              </tr>
            )}
            {laporan.map((lp, i) => {
              return (
                <tr key={i}>
                  <td className="border-b py-4  p-2" align="middle">
                    {i + 1}
                  </td>
                  <td className="border-b py-4">{lp.name}</td>
                  <td className="border-b py-4">{lp.totalSold}</td>
                  <td className="border-b py-4">
                    {formatRupiah(lp.unitPrice)}
                  </td>
                  <td className="border-b py-4">
                    {formatRupiah(lp.totalPrice)}
                  </td>
                  {/* <td className="border-b py-4">{kategori.name}</td> */}
                  <td className="border-b py-4"></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="px-5 mt-5  hover:bg-[#FF8E29] hover:text-white ms-auto border text-sm py-2 bg-[#FF8E29] text-white rounded-full">
          Print Invoice
        </button>
      </div>
    </Layout>
  );
};

export default Laporan;
