import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { z } from "zod";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const param = useLocation();
  const params = new URLSearchParams(param.search);
  const token = params.get("token");
  

  // Define the Zod schema for validation
  const schema = z.object({
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirm_password: z
      .string()
      .min(8, "Konfirmasi kata sandi harus berjumlah 8 karakter")
      .refine((val) => val === password, {
        message: "Kata sandi dan konfirmasi tidak cocok",
      }),
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset error state

    // Validate input data using Zod
    try {
      schema.parse({ password, confirm_password });

      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/reset-password`,
        {
          method: "POST",
          body: formData,
        }
      );

      const dataRes = await res.json();

      // Navigate on success
      if (res.ok) {
        toast.success("Kata sandi berhasil diubah!");
        navigate("/login");
      } else {
        toast.error(dataRes.message || "Terjadi kesalahan, coba lagi.");
      }
      console.log(dataRes);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message; // map errors to the corresponding fields
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white md:w-[820px] w-full rounded-md overflow-hidden shadow-lg">
        <div className="grid grid-cols-2 gap-5">
          <form onSubmit={handleResetPassword} className="flex flex-col p-10">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Ubah Kata Sandi
            </h1>
            <div className="mb-2">
              <label htmlFor="password" className="text-sm mb-2 inline-block">
                Kata Sandi
              </label>
              <input
                placeholder="Masukkan kata sandi"
                type="password"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirm_password"
                className="text-sm mb-2 inline-block"
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                placeholder="Masukkan konfirmasi kata sandi"
                type="password"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                name="confirm_password"
                id="confirm_password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <button className="px-5 mt-4 bg-[#FFC200] hover:bg-[#FFC200]/90 hover:text-white ms-3 border text-sm py-2 border-[#FFC200] text-white w-full rounded-full">
              Ubah Kata Sandi
            </button>
          </form>

          <div
            className="p-6 flex items-end"
            style={{ backgroundImage: "url(./login-image.png)" }}
          >
            <h1 className="font-bold text-white text-xl">
              Halo <br />
              Selamat <br /> Datang
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
