import React, { useState } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";
import File from "../../components/File";
import FileInput from "../../components/File";
import { getLocalStorage } from "../../helpers/localStorage";

const Update = ({ id, data }) => {
  const [Show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, image } = e.target;
    const nameVal = name.value;
    const imageVal = image.files[0];
    const formData = new FormData();
    formData.append("title", nameVal);
    formData.append("file", imageVal);
    try {
      const token = getLocalStorage("site");

      await fetch(process.env.REACT_APP_BASE_URL + "/kategori/" + id, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShow(false);
      e.target.reset();
      setReload(!reload);
      toast.success("Kategori berhasil diubah");
    } catch (error) {
      toast.error("Kategori gagal diubah");
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
      <Modal
        title={"Ubah Kategori"}
        show={Show}
        onClose={(val) => setShow(val)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="text-sm inline-block mb-1">
              Nama
            </label>
            <input
              defaultValue={data?.name}
              required
              type="text"
              name="name"
              id="name"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Nama Kategori"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="text-sm inline-block mb-1">
              Gambar
            </label>

            <File
              accept="image/*"
              name={"image"}
              url={process.env.REACT_APP_BASE_URL + "/images/" + data.image}
            />
          </div>
          <div className="mt-5 flex justify-end items-center">
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

export default Update;
