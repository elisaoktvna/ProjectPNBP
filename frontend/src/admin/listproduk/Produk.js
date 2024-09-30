import React from "react";
import Layout from "../../components/Layout";
import AddProduk from "./Addproduk";
import { useFetch } from "../../hooks/useFetch";
import { formatRupiah } from "../../helpers/currency";

const Produk = () => {
  const { data: produks } = useFetch("/produk");
  const backendURL = process.env.REACT_APP_BASE_URL;

  return (
    <Layout>
      <div className="mb-6 flex items-center ">
        <div className="">
          <h1 className="font-semibold">List Produk</h1>
          <p className="text-slate-500">
            Berikut Adalah Tabel Untuk Produk yang tersedia
          </p>
        </div>
        <AddProduk />
      </div>
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
              Foto Produk
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Nama Produk
            </th>
            <th
              className="border-b py-4 text-slate-500 font-semibold"
              align="start"
            >
              Stok
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
              Kategori
            </th>
            <th
              className="border-b py-4 text-slate-500 w-[200px] font-semibold"
              align="start"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {produks.length === 0 && (
            <tr>
              <td
                className="border-b py-4 text-center text-slate-500"
                colSpan={"7"}
              >
                Data produk tidak ada
              </td>
            </tr>
          )}
          {produks.map((produk, i) => {
            return (
              <tr key={i}>
                <td className="border-b py-4 p-2" align="middle">
                  {i + 1}
                </td>
                <td className="border-b py-4">
                  <img
                    src={
                      produk.image
                        ? `${backendURL}/images/${produk.image}`
                        : `${backendURL}/images/default-image.jpg`
                    }
                    className="w-[50px] h-[50px] bg-[#FFC200] rounded-md"
                    alt={produk.name || "Produk"}
                  />
                </td>
                <td className="border-b py-4">{produk.name}</td>
                <td className="border-b py-4">{produk.stock}</td>
                <td className="border-b py-4">{formatRupiah(produk.price)}</td>
                <td className="border-b py-4">{produk.kategori?.name}</td>
                <td className="border-b py-4">
                  <UpdateProduk
                    id={produk.id}
                    data={{ name: produk.name, image: produk.image }}
                  />
                  <DeleteProduk id={produk.id} nama={produk.name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Produk;
