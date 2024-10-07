import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";
import FileInput from "../../components/File";

const UpdateProduk = ({ id, data }) => {
  const [show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BASE_URL + "/kategori/"
        );
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        toast.error("Gagal memuat kategori");
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
    if (image.files[0]) {
      formData.append("file", image.files[0]);
    }
    formData.append("categoryId", categoryId.value);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/produk/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      setShow(false);
      e.target.reset();
      setReload(!reload);
      toast.success("Produk berhasil diubah");
    } catch (error) {
      toast.error("Produk gagal diubah");
    }
  };

  return (
    <>
      <button
        className="text-white me-2 text-sm px-4 rounded-full hover:bg-green-500/70 bg-green-500 py-1"
        onClick={() => setShow(true)}
      >
        Ubah
      </button>
      <Modal title={"Ubah Produk"} show={show} onClose={(val) => setShow(val)}>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-2 col-span-2">
              <label htmlFor="name" className="text-sm inline-block mb-1">
                Nama Produk
              </label>
              <input
                defaultValue={data?.name}
                required
                type="text"
                name="name"
                id="name"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                placeholder="Nama Produk"
              />
            </div>

            <div className="form-group mb-2 col-span-2">
              <label
                htmlFor="description"
                className="text-sm inline-block mb-1"
              >
                Deskripsi
              </label>
              <textarea
                defaultValue={data?.description}
                required
                name="description"
                id="description"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                placeholder="Deskripsi Produk"
              ></textarea>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="price" className="text-sm inline-block mb-1">
                Harga
              </label>
              <input
                defaultValue={data?.price}
                required
                type="number"
                name="price"
                id="price"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                placeholder="Harga Produk"
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="stock" className="text-sm inline-block mb-1">
                Stok
              </label>
              <input
                defaultValue={data?.stock}
                required
                type="number"
                name="stock"
                id="stock"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                placeholder="Jumlah Stok"
              />
            </div>

            <div className="form-group mb-2 col-span-2">
              <label htmlFor="image" className="text-sm inline-block mb-1">
                Gambar
              </label>
              <FileInput
                name={"image"}
                url={`${process.env.REACT_APP_BASE_URL}/images/${data?.image}`}
              />
            </div>

            <div className="form-group mb-2 col-span-2">
              <label htmlFor="categoryId" className="text-sm inline-block mb-1">
                Kategori
              </label>
              <select
                defaultValue={data?.categoryId}
                required
                name="categoryId"
                id="categoryId"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 flex justify-end items-center">
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

export default UpdateProduk;
