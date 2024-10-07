import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { setLocalStorage } from "../helpers/localStorage";
import toast from "react-hot-toast";

// Define Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = e.target;
    const email = data.email.value;
    const password = data.password.value;

    // Perform validation with Zod
    const formData = { email, password };
    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      // Format the errors to be easier to display
      const errorMessages = validation.error.format();
      setErrors({
        email: errorMessages.email?._errors[0],
        password: errorMessages.password?._errors[0],
      });
      return;
    }

    // Clear errors if valid
    setErrors({});

    const formDataToSend = new FormData();
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);

    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/login", {
        method: "POST",
        body: formDataToSend,
      });
      const dataRes = await res.json();
      if (res.status == 200) {
        setLocalStorage("site", dataRes.token);
        navigate("/dashboard");
      } else {
        toast.error("User tidak ditemukan");
      }
    } catch (error) {
      toast.error("Login gagal");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white md:w-[820px] w-full rounded-md overflow-hidden shadow-lg ">
        <div className="grid grid-cols-2 gap-5">
          <form onSubmit={handleLogin} className="flex flex-col p-10">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
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
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="text-sm mb-2 inline-block">
                Password
              </label>
              <input
                placeholder="Masukkan kata sandi"
                type="password"
                className="block bg-[#F5F5F5] w-full rounded-lg px-4 py-2 text-sm"
                name="password"
                id="password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <Link
              to={"/forget-password"}
              className="text-sm text-[#FF8E29] mt-2 ms-auto"
            >
              Lupa kata sandi
            </Link>
            <button className="px-5 mt-4 bg-[#FFC200] hover:bg-[#FFC200]/90 hover:text-white ms-3 border text-sm py-2 border-[#FFC200] text-white w-full rounded-full">
              Log In
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

export default Login;
