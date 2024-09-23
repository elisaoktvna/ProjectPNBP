import React, { useState } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";

const AddProduk = () => {
  const [Show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, image, stock, price, category } = e.target;
    const nameVal = name.value;
    const imageVal = image.files[0];
    const stockVal = stock.value;
    const priceVal = price.value;
    const categoryVal = category.value;

    const formData = new FormData();
    formData.append("name", nameVal);
    formData.append("image", imageVal);
    formData.append("stock", stockVal);
    formData.append("price", priceVal);
    formData.append("category", categoryVal);

    try {
      await fetch(process.env.REACT_APP_BASE_URL + "/produk", {
        method: "POST",
        body: formData,
      });
      setShow(false);
      e.target.reset();
      setReload(!reload);
      toast.success("Produk berhasil ditambahkan");
    } catch (error) {
      toast.error("Produk gagal ditambahkan");
    }
  };

  return (
    <>
      <button
        className="ms-auto bg-[#FFC200] hover:bg-[#FFC200]/70 px-5 py-2 text-sm text-white rounded-full"
        onClick={() => setShow(true)}
      >
        Tambah Produk
      </button>
      <Modal
        title={"Tambah Produk"}
        show={Show}
        onClose={(val) => setShow(val)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="text-sm inline-block mb-1">
              Nama Produk
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Nama Produk"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="stock" className="text-sm inline-block mb-1">
              Stok Produk
            </label>
            <input
              required
              type="number"
              name="stock"
              id="stock"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Jumlah Stok"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="price" className="text-sm inline-block mb-1">
              Harga Produk
            </label>
            <input
              required
              type="number"
              name="price"
              id="price"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Harga Produk"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="category" className="text-sm inline-block mb-1">
              Kategori Produk
            </label>
            <input
              required
              type="text"
              name="category"
              id="category"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Kategori Produk"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="text-sm inline-block mb-1">
              Gambar Produk
            </label>
            <input
              required
              type="file"
              name="image"
              id="image"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="px-5 hover:bg-[#FFC200]/70 text-sm py-2 bg-[#FFC200] rounded-full text-white "
            >
              Simpan
            </button>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="px-5 hover:bg-[#FF8E29] hover:text-white ms-3 border  text-sm py-2  border-[#FF8E29] text-[#FF8E29] rounded-full  "
            >
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProduk;
