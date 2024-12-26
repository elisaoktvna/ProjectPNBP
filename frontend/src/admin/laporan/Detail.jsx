import React, { useRef } from "react";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, useParams } from "react-router-dom";
import { formatRupiah } from "../../helpers/currency";
import { formatTanggal } from "../../helpers/Date";

const Detail = () => {
  const { id } = useParams();

  const { data: laporan } = useFetch(`/getHistory/${id}`);
  console.log(laporan);

  return (
    <Layout>
      <div className="flex flex-col" id="invoice">
        <h1 className="font-semibold mb-4">{laporan.no_transaksi}</h1>
        <h4 className="font">
          Tanggal transaksi {formatTanggal(laporan.createdAt)}
        </h4>

        <h2 className="mb-2">
          Total Harga : {formatRupiah(laporan.totalPrice)}
        </h2>
        <table className="border w-full">
          <thead>
            <tr>
              <th className="border-b py-4 text-slate-500 font-semibold w-16">
                No
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold w-[250px]"
                align="start"
              >
                Nama Produk
              </th>

              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Harga
              </th>
              <th
                className="border-b py-4 text-slate-500 font-semibold"
                align="start"
              >
                Qty
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
            {laporan?.TransactionDetails?.length === 0 && (
              <tr>
                <td
                  className="border-b py-4 text-center text-slate-500"
                  colSpan={6}
                >
                  Data laporan tidak ada
                </td>
              </tr>
            )}
            {laporan?.TransactionDetails?.map((lp, i) => (
              <tr key={i}>
                <td className="border-b py-4  p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">{lp.product.name}</td>
                <td className="border-b py-4">{formatRupiah(lp.price)}</td>
                <td className="border-b py-4">{lp.qty}</td>
                <td className="border-b py-4">{formatRupiah(lp.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Detail;
