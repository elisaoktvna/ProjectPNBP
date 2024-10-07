import React, { useState } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";

const DeleteProduk = ({ id, nama }) => {
  const [show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(process.env.REACT_APP_BASE_URL + "/produk/" + id, {
        method: "DELETE",
      });
      setShow(false);
      setReload(!reload);
      toast.success("Produk berhasil dihapus");
    } catch (error) {
      console.log(error);
      toast.error("Produk gagal dihapus");
    }
  };

  return (
    <>
      <button
        className="text-white text-sm px-4 rounded-full hover:bg-[#F65454]/70 bg-[#F65454] py-1"
        onClick={() => setShow(true)}
      >
        Hapus
      </button>
      <Modal
        title={"Hapus Produk"}
        show={show}
        onClose={(val) => setShow(val)}
      >
        <form onSubmit={onSubmit}>
          <h5 className="text-sm font-semibold mb-1">
            Apakah anda yakin menghapus data {nama}?
          </h5>
          <p className="text-sm text-slate-500">
            Produk akan terhapus permanen dan tidak dapat dikembalikan.
          </p>
          <div className="mt-5 flex justify-end items-center">
            <button
              type="submit"
              className="px-5 hover:bg-[#F65454]/70 text-sm py-2 bg-[#F65454] rounded-full text-white"
            >
              Hapus
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

export default DeleteProduk;
