import React, { useRef, useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import GestureDetect from "../hooks/GestureDetect";
import GestureHandle from "../hooks/GestureHandle";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
const Usermenu = () => {
  const { data: produks } = useFetch("/produk");
  const { data: categories } = useFetch("/kategori");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [handleGesture, setHandleGesture] = useState(null);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [print, setPrint] = useState(false);
  const [reset, setReset] = useState(false);
  const backendURL = process.env.REACT_APP_BASE_URL;

  const filteredProduks = produks?.filter((produk) =>
    selectedCategory ? produk.category?.name === selectedCategory : produk
  );
  const webcamRef = useRef(null);
  const [resultPredict, setResultPredict] = useState(false);

  const addToOrder = (produk) => {
    setOrderList((prev) => {
      const existingItem = prev.find((item) => item.id === produk.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === produk.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...produk, qty: 1 }];
      }
    });
  };

  const increaseQuantity = (item) => {
    setOrderList((prev) =>
      prev.map((ordItem) =>
        ordItem.id === item.id ? { ...ordItem, qty: ordItem.qty + 1 } : ordItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setOrderList((prev) => {
      const updatedList = prev.map((ordItem) =>
        ordItem.id === item.id ? { ...ordItem, qty: ordItem.qty - 1 } : ordItem
      );

      // Hapus item jika kuantitas menjadi 0
      return updatedList.filter((ordItem) => ordItem.qty > 0);
    });
  };

  const getTotalItemCount = () => {
    return orderList.reduce((total, item) => total + item.qty, 0);
  };

  const getTotalPrice = () => {
    return orderList.reduce((total, item) => total + item.price * item.qty, 0);
  };

  useEffect(() => {
    const gesture = new GestureDetect(webcamRef, setResultPredict);
    gesture.loadModel();
    gesture.startWebcam();

    const hdlGesture = new GestureHandle();
    setHandleGesture(hdlGesture);
  }, [reset]);

  useEffect(() => {
    if (handleGesture) {
      handleGesture.setGesture(resultPredict);
      handleGesture.init();
    }
  }, [resultPredict]);

  const handleTransaction = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL + "/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: orderList, print }),
      });
      const data = await res.json();
      setModal2(false);
      setReset(true);
      setOrderList([]);
    } catch (error) {
      toast.error("Gagal melakukan transaksi");
    }
  };
  const handleConfirm = async () => {
    setModal1(false);
    setModal2(true);
    toast.success("Berhasil melakukan transaksi");
  };

  const cancel = () => {
    setReset(true);
    setOrderList([]);
  };
  return (
    <>
      <div className="flex h-screen bg-slate-100">
        <div className="w-3/4 p-4 overflow-y-auto">
          <div className="mb-4">
            <img
              src={Baner}
              alt="Baner"
              className="rounded-3xl shadow-md w-full"
            />
          </div>

          {/* Tombol kategori */}
          <div className="flex kategori-parent outline-none border-b-4 pb-3 justify-center mb-4">
            {categories.map((category, i) => (
              <button
                key={i}
                className={`bg-gray-200 kategori-item text-gray-700 px-4 py-2 rounded-full mx-2 transition-all transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500 focus:bg-yellow-200 outline-none ${
                  selectedCategory === category.name
                    ? "bg-yellow-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Konten item makanan/minuman */}
          <div className="pt-24 grid grid-cols-4 produk-parent  border-l-4 pl-4 outline-none  gap-x-6 gap-y-20">
            {filteredProduks?.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada produk untuk kategori {selectedCategory}
              </div>
            ) : (
              filteredProduks?.map((produk) => {
                return (
                  <div
                    key={produk.id}
                    tabIndex="-1"
                    className="bg-white p-4 border-transparent active:border-yellow-500 focus:border-yellow-500 border-4 outline-none  produk-item rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 focus:-translate-y-3 active:-translate-y-3  transition-transform duration-200 ease-in-out"
                    onClick={() => addToOrder(produk)}
                  >
                    <img
                      src={
                        produk.image
                          ? `${backendURL}/images/${produk.image}`
                          : `${backendURL}/images/default-image.jpg`
                      }
                      alt={produk.name || "Produk"}
                      className="absolute top-0 transform -translate-y-1/2 mb-2 object-cover"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <div className="text-center mt-16">
                      <h3 className="font-bold">{produk.name}</h3>
                      <p className="text-blue-500 font-bold text-lg">
                        {produk.price ? `Rp ${produk.price}` : "No price"}
                      </p>
                      <p className="text-yellow-400">
                        {produk.rating || "No rating"}{" "}
                        <i className="fas fa-star"></i>
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-1/3 p-4 bg-white cart-parent outline-none border-l-4  shadow-md flex flex-col justify-between h-full">
          {/* Bagian atas */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              <i className="fas fa-shopping-cart"></i> Order List
            </h2>
          </div>

          {/* Daftar item */}
          <div className="flex-grow overflow-auto">
            {orderList.length === 0 ? (
              <div className="text-center text-gray-500">
                Belum ada item yang dipesan.
              </div>
            ) : (
              orderList.map((item) => (
                <div key={item.id} className="flex  items-center mb-4">
                  <div
                    tabIndex="-1"
                    className="flex-1 outline-none bg-white cart-item  shadow-md h-28 rounded-2xl pr-4 pl-4 flex justify-between items-center"
                  >
                    <div className="flex-1 rounded-2xl mr-8">
                      <img
                        src={
                          item.image
                            ? `${backendURL}/images/${item.image}`
                            : `${backendURL}/images/default-image.jpg`
                        }
                        alt={item.name}
                        className="size-20 rounded-2xl ml-5 mr-2"
                      />
                    </div>

                    <div className="flex-1 flex flex-col items-start mr-8">
                      <span className="font-medium text-lg">{item.name}</span>
                      <span className="font-bold text-2xl text-blue-600">
                        Rp {item.price * item.qty}
                      </span>
                    </div>

                    <span className="font-bold text-lg">{item.qty}</span>
                  </div>

                  <div className="flex flex-col justify-between ml-4">
                    <button
                      className="bg-blue-600 text-white increase rounded-full w-10 h-10 focus:bg-yellow-500 mb-2 font-bold text-lg"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                    <button
                      className="bg-blue-600 text-white decrease rounded-full w-10 h-10 focus:bg-yellow-500 font-bold text-lg"
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bagian bawah */}
          <div>
            <hr className="mb-2" />
            <div className="flex justify-between mb-2">
              <span>Total Item : {getTotalItemCount()}</span>
              <span>Total Harga : Rp {getTotalPrice()}</span>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={cancel}
                className="bg-red-500 cancelBtn text-white px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => setModal1(true)}
                className="bg-green-500 checkoutBtn text-white px-4 py-2 rounded-full"
              >
                Checkout
              </button>
            </div>

            {/* Webcam Component */}
            <div className="mt-8">
              <div
                style={{
                  position: "absolute",
                  top: "0", // Move out of view
                  width: "1px", // Very small size
                  height: "1px",
                  opacity: 0, // Set opacity to 0
                }}
              >
                <video
                  ref={webcamRef}
                  className="w-full max-h-[80svh] object-cover"
                  autoPlay
                  playsInline
                ></video>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold">Gesture: {resultPredict.gesture}</p>
              <p className="text-sm text-gray-500">
                Tangan terdeteksi: {resultPredict.handType}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal title={"Pertanyaan"} show={modal1} onClose={setModal1}>
        <div className="flex justify-center">
          <i class="fa-solid block mb-4  fa-circle-info  text-9xl"></i>
        </div>
        <p className="text-center">
          Apakah anda yakin untuk melakukan transaksi?
        </p>
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleConfirm}
            type="submit"
            className="px-5 okeModal hover:bg-[#FFC200]/70 text-sm py-2 bg-[#FFC200] rounded-full text-white"
          >
            Ya
          </button>
          <button
            onClick={() => setModal1(false)}
            type="button"
            className="px-5 batalModal hover:bg-[#FF8E29] hover:text-white ms-3 border text-sm py-2 border-[#FF8E29] text-[#FF8E29] rounded-full"
          >
            Batal
          </button>
        </div>
      </Modal>
      <Modal title={"Pertanyaan"} show={modal2} onClose={setModal2}>
        <div className="flex justify-center">
          <i class="fa-solid block mb-4  fa-circle-info  text-9xl"></i>
        </div>
        <p className="text-center">Apakah anda ingin cetak kwitansi?</p>
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => {
              setPrint(true);
              handleTransaction();
            }}
            type="submit"
            className="px-5 okeModal hover:bg-[#FFC200]/70 text-sm py-2 bg-[#FFC200] rounded-full text-white"
          >
            Ya
          </button>
          <button
            onClick={() => {
              handleTransaction();
              setPrint(false);
            }}
            type="button"
            className="px-5 batalModal hover:bg-[#FF8E29] hover:text-white ms-3 border text-sm py-2 border-[#FF8E29] text-[#FF8E29] rounded-full"
          >
            Batal
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Usermenu;
