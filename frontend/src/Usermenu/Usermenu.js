import { useState } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import Mie from "../asset/mie.png";

const Usermenu = () => {
  const { data: produks } = useFetch("/produk");
  const [selectedCategory, setSelectedCategory] = useState("Minuman Dingin");
  const backendURL = process.env.REACT_APP_BASE_URL;


  const filteredProduks = produks?.filter(
    (produk) => produk.category?.name === selectedCategory
  );

  return (
    <>
      <div className="flex h-screen">
        <div className="w-3/4 p-4 overflow-y-auto">
          <div className="mb-4">
            <img
              src={Baner}
              alt="Baner"
              className="rounded-3xl shadow-md w-full"
            />
          </div>

          {/* Tombol kategori */}
          <div className="flex justify-center mb-4">
            {[
              "Minuman Dingin",
              "Minuman Panas",
              "Makanan Berat",
              "Snack",
              "Juice",
            ].map((category) => (
              <button
                key={category}
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500 ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Konten item makanan/minuman */}
          <div className="mt-24 grid grid-cols-3 gap-x-6 gap-y-20">
            {filteredProduks?.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada produk untuk kategori {selectedCategory}
              </div>
            ) : (
              filteredProduks?.map((produk, index) => {
                return (
                  <div
                    key={index}
                    className="bg-yellow-100 p-4 rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 transition-transform duration-300 ease-in-out"
                  >
                    {index + 1}
                    <img
                      src={
                        produk.image
                          ? `${backendURL}/images/${produk.image}`
                          : `${backendURL}/images/default-image.jpg`
                      }
                      alt={produk.name || "Produk"}
                      className="absolute top-0 transform -translate-y-1/2 mb-2 object-contain"
                      style={{ width: "120px", height: "120px" }}
                    />
                    <div className="text-center mt-16">
                      <h3 className="font-bold">{produk.name}</h3>
                      <p className="text-gray-700">
                        {produk.price ? `Rp ${produk.price}` : "No price"}
                      </p>
                      <p className="text-yellow-500">
                        {produk.rating || "No rating"}
                        <i className="fas fa-star"></i>
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-1/3 p-4 bg-slate-100 shadow-md flex flex-col justify-between h-full">
          {/* Bagian atas */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              <i className="fas fa-shopping-cart"></i> Order List
            </h2>
          </div>

          {/* Daftar item */}
          <div className="flex-grow overflow-auto">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="flex-1 bg-yellow-400 h-20 rounded-2xl pr-4 flex justify-between items-center">
                  <div className="bg-white size-20 rounded-2xl mr-4 drop-shadow-md">
                    <img
                      src={Mie}
                      alt="Food item"
                      className="size-20 rounded-2xl mr-4 shadow-md"
                    />
                  </div>
                  <span>1 X Taro Milk tea</span>
                  <span>Rp 5000</span>
                </div>
                <div className="flex flex-col ml-4">
                  <button className="bg-yellow-400 text-white rounded-full w-8 h-8 mb-2">
                    +
                  </button>
                  <button className="bg-yellow-400 text-white rounded-full w-8 h-8">
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bagian bawah */}
          <div>
            <hr className="mb-2" />
            <div className="flex justify-between mb-2">
              <span>Total Item : 0</span>
              <span>Total Harga : Rp 0</span>
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-full">
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
