import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";

const AddProduk = () => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const { setReload, reload } = useGlobalContext();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_URL + "/kategori"); // Sesuaikan endpoint kategori
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, stock, image, categoryId } = e.target;

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("description", description.value);
    formData.append("stock", stock.value);
    formData.append("file", image.files[0]);
    formData.append("categoryId", categoryId.value);

    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/produk", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);

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
      <Modal title={"Tambah Produk"} show={show} onClose={(val) => setShow(val)}>
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
            <label htmlFor="price" className="text-sm inline-block mb-1">
              Harga
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
            <label htmlFor="description" className="text-sm inline-block mb-1">
              Deskripsi
            </label>
            <textarea
              required
              name="description"
              id="description"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Deskripsi Produk"
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="stock" className="text-sm inline-block mb-1">
              Stok
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
            <label htmlFor="image" className="text-sm inline-block mb-1">
              Gambar
            </label>
            <input
              required
              type="file"
              name="image"
              id="image"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="categoryId" className="text-sm inline-block mb-1">
              Kategori
            </label>
            <select
              required
              name="categoryId"
              id="categoryId"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="px-5 hover:bg-[#FFC200]/70 text-sm py-2 bg-[#FFC200] rounded-full text-white"
            >
              Simpan
            </button>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="px-5 hover:bg-[#FF8E29] hover:text-white ms-3 border text-sm py-2 border-[#FF8E29] text-[#FF8E29] rounded-full"
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