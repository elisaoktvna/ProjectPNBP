import React, { useState } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Delete = ({ id, nama }) => {
  const [Show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(process.env.REACT_APP_BASE_URL + "/kategori/" + id, {
        method: "delete",
      });
      setShow(false);
      setReload(!reload);
      toast.success("Kategori berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        className="text-white text-sm  px-4 rounded-full hover:bg-[#F65454]/70 bg-[#F65454] py-1"
        onClick={() => setShow(true)}
      >
        Hapus
      </button>
      <Modal
        title={"Hapus Kategori"}
        show={Show}
        onClose={(val) => setShow(val)}
      >
        <form onSubmit={onSubmit}>
          <h5 className="text-sm font-semibold mb-1">
            Apakah anda yakin menhapus data {nama}?
          </h5>
          <p className="text-sm text-slate-500">
            Kategori akan terhapus permanent dan tidak dapat dikembalikan
          </p>
          <div className="mt-5 flex justify-end items-center">
            <button
              type="submit"
              className="px-5 hover:bg-[#F65454]/70 text-sm py-2 bg-[#F65454] rounded-full text-white "
            >
              Hapus
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

export default Delete;
