import React, { forwardRef } from "react";
import { formatRupiah } from "../helpers/currency";

const LaporanPrint = forwardRef(({ laporan = [] }, ref) => {
  return (
    <div ref={ref} id="invoice">
      {" "}
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
          {laporan?.map((lp, i) => {
            return (
              <tr key={i}>
                <td className="border-b py-4  p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">{lp.name}</td>
                <td className="border-b py-4">{lp.totalSold}</td>
                <td className="border-b py-4">{formatRupiah(lp.unitPrice)}</td>
                <td className="border-b py-4">{formatRupiah(lp.totalPrice)}</td>
                {/* <td className="border-b py-4">{kategori.name}</td> */}
                <td className="border-b py-4"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default LaporanPrint;
