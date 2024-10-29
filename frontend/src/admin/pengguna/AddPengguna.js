import React, { useState } from "react";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { z } from "zod";
import { getLocalStorage } from "../../helpers/localStorage";

const AddPengguna = () => {
  const [Show, setShow] = useState(false);
  const { setReload, reload } = useGlobalContext();

  // Zod schema untuk validasi
  const schema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    role: z.string().min(1, "Role wajib dipilih"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = e.target;
    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    // Validasi dengan Zod
    const result = schema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Proses pengiriman jika validasi sukses
    const validData = result.data;

    try {
      const formBody = new FormData();
      formBody.append("name", validData.name);
      formBody.append("email", validData.email);
      formBody.append("password", validData.password);
      formBody.append("role", validData.role);
      const token = getLocalStorage("site");

      await fetch(process.env.REACT_APP_BASE_URL + "/users", {
        method: "POST",
        body: formBody,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShow(false);
      e.target.reset();
      setReload(!reload);
      toast.success("Pengguna berhasil ditambahkan");
    } catch (error) {
      toast.error("Pengguna gagal ditambahkan");
    }
  };

  return (
    <>
      <button
        className="ms-auto bg-[#FFC200] hover:bg-[#FFC200]/70 px-5 py-2 text-sm text-white rounded-full"
        onClick={() => setShow(true)}
      >
        Tambah Pengguna
      </button>
      <Modal
        title={"Tambah Pengguna"}
        show={Show}
        onClose={(val) => setShow(val)}
      >
        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="text-sm inline-block mb-1">
              Nama
            </label>
            <input
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
              required
              type="email"
              name="email"
              id="email"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Masukkan Email"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="text-sm inline-block mb-1">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
              placeholder="Password (min 8 karakter)"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="role" className="text-sm inline-block mb-1">
              Role
            </label>
            <select
              required
              name="role"
              id="role"
              className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
            >
              <option value="" disabled selected>
                Pilih Role
              </option>
              <option value="admin">Admin</option>
              <option value="karyawan">Karyawan</option>
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

export default AddPengguna;
