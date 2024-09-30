import React from "react";
import Polije from "../asset/polije.png";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div class="w-64 bg-white rounded-lg text-black flex flex-col h-100%">
      <div className="flex justify-center gap-2">
        <div className="w-20 h-full ">
          <img className="w-full h-full pt-10 " src={Polije} alt="polije" />
        </div>
      </div>

      {/* <div className="flex  2xl:flex-col justify-between items-center 2xl:items-start w-full mt-3 gap-3">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[15px] md:text-[18px] text-orange-800 font-bold lg:text-[16px] w-full2xl:w-full whitespace-nowrap text-ellipsis overflow-hidden">
                Projek PNBP
              </h3>
              <p className="text-[#535353] text-sm">Administrator</p>
            </div>
          </div> */}

      <div className="flex justify-center flex-col items-center mt-4">
        <h3 className="text-[15px] md:text-[18px] text-orange-800 font-bold lg:text-[16px] w-full2xl:w-full whitespace-nowrap text-ellipsis overflow-hidden">
          Projek PNBP
        </h3>
        <p className="text-[#535353] text-sm">Administrator</p>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul>
          <li class="mb-2">
            <Link
              to={"/dashboard"}
              class={`${
                pathname == "/dashboard"
                  ? "bg-[#FFC200] text-white"
                  : "hover:bg-[#FFC200]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <div className="me-2 fa fa-home"></div> Home
            </Link>
          </li>
          <li class="mb-2">
            <Link
              to={"/listproduk"}
              class={`${
                pathname == "/listproduk"
                  ? "bg-[#FFC200] text-white"
                  : "hover:bg-[#FFC200]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <div className="me-2 fa fa-box-open"></div> List Produk
            </Link>
          </li>
          <li class="mb-2">
            <Link
              to={"/kategori"}
              class={`${
                pathname == "/kategori"
                  ? "bg-[#FFC200] text-white"
                  : "hover:bg-[#FFC200]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <i className="me-2 fa fa-list"></i> Kategori
            </Link>
          </li>
          <li class="mb-2">
            <Link
              to={"/laporan"}
              class={`${
                pathname == "/laporan"
                  ? "bg-[#FFC200] text-white"
                  : "hover:bg-[#FFC200]/20 text-slate-600"
              } block px-4 py-2 rounded `}
            >
              <i className="me-2 fa fa-chart-line"></i> Keuangan
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
