import React from "react";
import Layout from "../../components/Layout";
import AddProduk from "./Addproduk";
import UpdateProduk from "./UpdateProduk";
import DeleteProduk from "./DeleteProduk";
import { useFetch } from "../../hooks/useFetch";
import { formatRupiah } from "../../helpers/currency";

const Produk = () => {
  const { data: produks = [] } = useFetch("/produk");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 7;

  const backendURL = process.env.REACT_APP_BASE_URL;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = produks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(produks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <div>
          <h1 className="font-semibold">List Produk</h1>
          <p className="text-slate-500">
            Berikut adalah tabel untuk produk yang tersedia
          </p>
        </div>
        <AddProduk />
      </div>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border-b py-4 text-slate-500 font-semibold w-16">No</th>
            <th className="border-b py-4 text-slate-500 font-semibold w-[150px]" align="start">Foto Produk</th>
            <th className="border-b py-4 text-slate-500 font-semibold" align="start">Nama Produk</th>
            <th className="border-b py-4 text-slate-500 font-semibold" align="start">Deskripsi</th>
            <th className="border-b py-4 text-slate-500 font-semibold" align="start">Stock</th>
            <th className="border-b py-4 text-slate-500 font-semibold" align="start">Harga</th>
            <th className="border-b py-4 text-slate-500 font-semibold" align="start">Kategori</th>
            <th className="border-b py-4 text-slate-500 w-[200px] font-semibold" align="start">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td className="border-b py-4 text-center text-slate-500" colSpan={"8"}>
                Data produk tidak ada
              </td>
            </tr>
          ) : (
            currentItems.map((produk, i) => (
              <tr key={produk.id}>
                <td className="border-b py-4 p-2" align="middle">
                  {indexOfFirstItem + i + 1}
                </td>
                <td className="border-b py-4">
                  <img
                    src={produk.image ? `${backendURL}/images/${produk.image}` : `${backendURL}/images/default-image.jpg`}
                    className="w-[50px] h-[50px] bg-[#FFC200] rounded-md"
                    alt={produk.name || "Produk"}
                  />
                </td>
                <td className="border-b py-4">{produk.name}</td>
                <td className="border-b py-4">{produk.description}</td>
                <td className="border-b py-4">{produk.stock}</td>
                <td className="border-b py-4">{formatRupiah(produk.price)}</td>
                <td className="border-b py-4">{produk.category?.name}</td>
                <td className="border-b py-4">
                  <UpdateProduk id={produk.id} data={{ ...produk }} />
                  <DeleteProduk id={produk.id} nama={produk.name} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginasi */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 border bg-white"
          >
            Sebelumnya
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 border bg-white"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Produk;
