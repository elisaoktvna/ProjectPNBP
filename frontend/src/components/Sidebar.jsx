import React from "react";
import Polije from "../asset/polije.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { setLocalStorage } from "../helpers/localStorage";
const Sidebar = () => {
  const { pathname } = useLocation();
  const { data: user } = useFetch("/auth/user");
  const navigate = useNavigate();
  const logout = async () => {
    setLocalStorage("site", null);
    navigate("/login");
  };

  return (
    <div className="w-64 sticky top-[50px] left-[10px] bg-white rounded-lg text-black flex flex-col h-100%">
      <div className="flex justify-center gap-2">
        <div className="w-20 h-full ">
          <img className="w-full h-full pt-10 " src={Polije} alt="polije" />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-4">
        <h3 className="text-[15px] md:text-[18px] text-orange-800 font-bold lg:text-[16px] w-full2xl:w-full whitespace-nowrap text-ellipsis overflow-hidden">
          Projek PNBP
        </h3>
        <h2 className="mt-3">{user?.name}</h2>
        <p className="text-[#535353] text-sm">{user?.role}</p>
      </div>
      <nav className="flex-1 px-4 py-6 flex flex-col justify-between">
        <ul>
          <li className="mb-2">
            <Link
              to={"/dashboard"}
              className={`${
                pathname == "/dashboard"
                  ? "bg-[#FF8E29] text-white"
                  : "hover:bg-[#FF8E29]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <div className="me-2 fa fa-home"></div> Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={"/listproduk"}
              className={`${
                pathname == "/listproduk"
                  ? "bg-[#FF8E29] text-white"
                  : "hover:bg-[#FF8E29]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <div className="me-2 fa fa-box-open"></div> List Produk
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={"/kategori"}
              className={`${
                pathname == "/kategori"
                  ? "bg-[#FF8E29] text-white"
                  : "hover:bg-[#FF8E29]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <i className="me-2 fa fa-list"></i> Kategori
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={"/users"}
              className={`${
                pathname == "/users"
                  ? "bg-[#FF8E29] text-white"
                  : "hover:bg-[#FF8E29]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <i className="me-2 fa fa-users"></i> Pengguna
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={"/laporan"}
              className={`${
                pathname == "/laporan"
                  ? "bg-[#FF8E29] text-white"
                  : "hover:bg-[#FF8E29]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <i className="me-2 fa fa-chart-line"></i> Keuangan
            </Link>
          </li>
        </ul>

        <button
          onClick={logout}
          className="text-white text-sm  px-4 rounded-full hover:bg-[#F65454]/70 bg-[#F65454] py-2"
        >
          <div className="fa fa-right-from-bracket me-2"></div> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
