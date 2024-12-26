import React, { useRef, useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import GestureDetect from "../hooks/GestureDetect";
import GestureHandle from "../hooks/GestureHandle";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import ListMenu from "./ListMenu";
import LisitKategori from "./LisitKategori";
import ListCart from "./ListCart";
import Slider from "./Slider";
const Usermenu = () => {
  const { data: produks } = useFetch("/produk", {
    headers: {
      Authorization: "Bearer " + "kasulisecret",
    },
  });
  const { data: setting } = useFetch("/setting", {
    headers: {
      Authorization: "Bearer " + "kasulisecret",
    },
  });

  const { data: categories } = useFetch("/kategori", {
    headers: {
      Authorization: "Bearer " + "kasulisecret",
    },
  });
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
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

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
          Authorization: "Bearer " + "kasulisecret",
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
          <Slider images={setting?.data?.images} />

          {/* Tombol kategori */}
          <LisitKategori
            selectedCategory={selectedCategory}
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />

          <ListMenu
            filteredProduks={filteredProduks}
            backendURL={backendURL}
            selectedCategory={selectedCategory}
            addToOrder={addToOrder}
          />
        </div>

        <div className="w-1/3 p-4 bg-white cart-parent outline-none border-l-4  shadow-md flex flex-col justify-between h-full">
          {/* Bagian atas */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              <i className="fas fa-shopping-cart"></i> Order List
            </h2>
          </div>

          {/* Daftar item */}
          <ListCart
            backendURL={backendURL}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            orderList={orderList}
          />

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
              <p className="font-semibold">
                Persentase: {resultPredict.accuracy}
              </p>
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
