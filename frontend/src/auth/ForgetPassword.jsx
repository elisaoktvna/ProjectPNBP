import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  // Define the Zod schema for validation
  const schema = z.object({
    email: z.string().email("Email tidak valid").nonempty("Email harus diisi."),
    pin: z.string().length(6, "PIN harus berjumlah 6 karakter."),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset error state

    // Validate input data using Zod
    try {
      schema.parse({ email, pin });

      const formData = new FormData();
      formData.append("email", email);
      formData.append("pin", pin);

      const res = await fetch(
        process.env.REACT_APP_BASE_URL + "/forget-password",
        {
          method: "POST",
          body: formData,
        }
      );

      const dataRes = await res.json();
      // Navigate on success
      if (res.ok) {
        console.log(dataRes);

        navigate("/reset-password?token=" + dataRes.data.token);
      } else {
        toast.error("User tidak ditemukan");
      }
    } catch (error) {
      console.log(error);

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
          <form onSubmit={handleLogin} className="flex flex-col p-10">
            <h1 className="text-2xl font-semibold text-center">
              Lupa Kata Sandi
            </h1>
            <div className="mb-2">
              <label htmlFor="email" className="text-sm mb-2 inline-block">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="pin" className="text-sm mb-2 inline-block">
                Pin
              </label>
              <input
                placeholder="Masukkan pin akun"
                type="number" // Change to text to use string length validation
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                name="pin"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)} // Update state on input change
              />
              {errors.pin && (
                <p className="text-red-500 text-sm mt-1">{errors.pin}</p>
              )}
            </div>
            <button className="px-5 mt-4 bg-[#FFC200] hover:bg-[#FFC200]/90 hover:text-white ms-3 border text-sm py-2 border-[#FFC200] text-white w-full rounded-full">
              Lanjutkan
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

export default ForgetPassword;
