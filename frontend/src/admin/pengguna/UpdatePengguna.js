import React, { useState } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";

const UpdatePengguna = ({ id, data }) => {
  const [Show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role } = e.target;
    const nameVal = name.value;
    const emailVal = email.value;
    const roleVal = role.value;

    const formData = new FormData();
    formData.append("name", nameVal);
    formData.append("email", emailVal);
    formData.append("role", roleVal);

    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/users/" + id, {
        method: "PUT",
        body: formData,
      });
      console.log(await res.json());
      
      setShow(false);
      e.target.reset();
      setReload(!reload);
      toast.success("Pengguna berhasil diubah");
    } catch (error) {
      toast.error("Pengguna gagal diubah");
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
        title={"Ubah Pengguna"}
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
              placeholder="Nama Pengguna"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email" className="text-sm inline-block mb-1">
              Email
            </label>
            <input
              defaultValue={data?.email}
              required
              type="email"
              name="email"
              id="email"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Masukkan Email"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="role" className="text-sm inline-block mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              required
              defaultValue={data?.role || ""}
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="admin">Admin</option>
              <option value="karyawan">Karyawan</option>
            </select>
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

export default UpdatePengguna;
