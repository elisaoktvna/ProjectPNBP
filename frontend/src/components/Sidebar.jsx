import React from 'react'
import Polije from "../asset/polije.png";
import { Link } from 'react-router-dom';
const Sidebar = () => {
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
                    <Link to={"/"} class="block px-4 py-2 rounded hover:bg-gray-300">Home</Link>
                </li>
                <li class="mb-2">
                    <Link href="#" class="block px-4 py-2 rounded hover:bg-gray-300">Tambah Produk</Link>
                </li>
                <li class="mb-2">
                    <Link href="#" class="block px-4 py-2 rounded hover:bg-gray-300">List Produk</Link>
                </li>
                <li class="mb-2">
                    <Link to={"/kategori"} class="block px-4 py-2 rounded hover:bg-gray-300">Kategori</Link>
                </li>
                <li class="mb-2">
                    <Link href="#" class="block px-4 py-2 rounded hover:bg-gray-300">Produk Terlaris</Link>
                </li>
            </ul>
        </nav>
    </div>

    
  
); 
  
};

export default Sidebar;