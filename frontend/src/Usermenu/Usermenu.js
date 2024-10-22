import React, { useRef, useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import * as tf from "@tensorflow/tfjs";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import preProcessLandmark from "../helpers/LandmarkProses";
import calcLandmarkList from "../helpers/CalculateLandmark";
import ConvertResult from "../helpers/ConvertResult";

const Usermenu = () => {
  const { data: produks } = useFetch("/produk");
  const [selectedCategory, setSelectedCategory] = useState("Minuman Dingin");
  const [orderList, setOrderList] = useState([]);
  const backendURL = process.env.REACT_APP_BASE_URL;

  const filteredProduks = produks?.filter(
    (produk) => produk.category?.name === selectedCategory
  );
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [loadCamera, setLoadCamera] = useState(false);

  const addToOrder = (produk) => {
    setOrderList((prev) => {
      const existingItem = prev.find(item => item.id === produk.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === produk.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...produk, quantity: 1 }];
      }
    });
  };
  

  const increaseQuantity = (item) => {
    setOrderList((prev) =>
      prev.map((ordItem) =>
        ordItem.id === item.id
          ? { ...ordItem, quantity: ordItem.quantity + 1 }
          : ordItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setOrderList((prev) => {
      const updatedList = prev.map((ordItem) =>
        ordItem.id === item.id
          ? { ...ordItem, quantity: ordItem.quantity - 1 }
          : ordItem
      );

      // Hapus item jika kuantitas menjadi 0
      return updatedList.filter((ordItem) => ordItem.quantity > 0);
    });
  };

  const getTotalItemCount = () => {
    return orderList.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return orderList.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [resultPredict, setResultPredict] = useState({
    abjad: "",
    acc: "",
  });

  let model;
  let handLandmarker;

  const [handPresence, setHandPresence] = useState(false);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (webcamRef.current) {
        console.log("halo");

        webcamRef.current.srcObject = stream;
      }
      console.log(webcamRef);

      setLoadCamera(true);
      await initializeHandDetection();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const loadModel = async () => {
    setLoadCamera(false);
    try {
      const lm = await tf.loadLayersModel(
        "http://localhost:3000/model/model.json"
      );
      model = lm;

      const emptyInput = tf.tensor2d([[0, 0]]);

      model.predict(emptyInput);

      setLoadCamera(true);
    } catch (error) {
      //   console.error("Error loading model:", error);
    }
  };

  const initializeHandDetection = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        },
        numHands: 2,
        runningMode: "VIDEO",
      });

      detectHands();
    } catch (error) {
      console.error("Error initializing hand detection:", error);
    }
  };

  const makePrediction = async (finalResult) => {
    const input = tf.tensor2d([finalResult]);

    // Melakukan prediksi
    const prediction = model.predict(input);

    const result = prediction.dataSync();

    const maxEntry = Object.entries(result).reduce((max, entry) => {
      const [, value] = entry;
      return value > max[1] ? entry : max;
    });

    // maxEntry sekarang berisi [key, value] dengan nilai terbesar
    const [maxKey, maxValue] = maxEntry;

    const percentageValue = (maxValue * 100).toFixed(2) + "%";

    setResultPredict({
      abjad: ConvertResult(parseInt(maxKey)),
      acc: percentageValue,
    });

    // Hapus tensor
    input.dispose();
    prediction.dispose();
  };

  const detectHands = async () => {
    if (webcamRef.current && webcamRef.current.readyState >= 2) {
      const detections = handLandmarker.detectForVideo(
        webcamRef.current,
        performance.now()
      );

      setHandPresence(detections.handedness.length > 0);

      // Assuming detections.landmarks is an array of landmark objects
      if (detections.landmarks) {
        if (detections.handednesses.length > 0) {
          const landm = detections.landmarks[0].map((landmark) => landmark);

          const calt = calcLandmarkList(webcamRef.current, landm);
          const finalResult = preProcessLandmark(calt);

          makePrediction(finalResult);
        }
      }
    }
    requestAnimationFrame(detectHands);
  };

  useEffect(() => {
    loadModel();
    startWebcam();
    setLoadCamera(true);
  }, []);
  // Define a drawing function

  const categories = [
    "Minuman Dingin",
    "Minuman Panas",
    "Makanan Berat",
    "Snack",
    "Juice",
  ];

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  
  return (
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
          <div className="flex justify-center mb-4">
            {["Minuman Dingin", "Minuman Panas", "Makanan Berat", "Snack", "Juice"].map((category) => (
              <button
                key={category}
                className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500 ${selectedCategory === category ? "bg-yellow-500 text-white" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Konten item makanan/minuman */}
          <div className="mt-24 grid grid-cols-4 gap-x-6 gap-y-20">
            {filteredProduks?.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada produk untuk kategori {selectedCategory}
              </div>
            ) : (
              filteredProduks?.map((produk) => {
                return (
                  <div
                    key={produk.id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 transition-transform duration-300 ease-in-out"
                    onClick={() => addToOrder(produk)}
                  >
                    <img
                      src={produk.image ? `${backendURL}/images/${produk.image}` : `${backendURL}/images/default-image.jpg`}
                      alt={produk.name || "Produk"}
                      className="absolute top-0 transform -translate-y-1/2 mb-2 object-cover"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <div className="text-center mt-16">
                      <h3 className="font-bold">{produk.name}</h3>
                      <p className="text-blue-500 font-bold text-lg">{produk.price ? `Rp ${produk.price}` : "No price"}</p>
                      <p className="text-yellow-400">{produk.rating || "No rating"} <i className="fas fa-star"></i></p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-1/3 p-4 bg-white shadow-md flex flex-col justify-between h-full">
          {/* Bagian atas */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              <i className="fas fa-shopping-cart"></i> Order List
            </h2>
          </div>

          {/* Daftar item */}
          <div className="flex-grow overflow-auto">
            {orderList.length === 0 ? (
              <div className="text-center text-gray-500">Belum ada item yang dipesan.</div>
            ) : (
              orderList.map((item) => (
                <div key={item.id} className="flex items-center mb-4">
                  <div className="flex-1 bg-white shadow-md h-28 rounded-2xl pr-4 pl-4 flex justify-between items-center">
                      <div className="flex-1 rounded-2xl mr-8">
                        <img
                          src={item.image ? `${backendURL}/images/${item.image}` : `${backendURL}/images/default-image.jpg`}
                          alt={item.name}
                          className="size-20 rounded-2xl ml-5 mr-2"
                        />
                      </div>

                      <div className="flex-1 flex flex-col items-start mr-8">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className="font-bold text-2xl text-blue-600">Rp {item.price * item.quantity}</span>
                      </div>

                      <span className="font-bold text-lg">{item.quantity}</span>
                    </div>



                  <div className="flex flex-col justify-between ml-4">
                    <button
                      className="bg-blue-600 text-white rounded-full w-10 h-10 mb-2 font-bold text-lg"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                    <button
                      className="bg-blue-600 text-white rounded-full w-10 h-10 font-bold text-lg"
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
              <button className="bg-red-500 text-white px-4 py-2 rounded-full">Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">Checkout</button>
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
            {/* <Webcam
              mirrored
              ref={webcamRef}
              height={600}
              width={800}
              videoConstraints={videoConstraints}
            /> */}

            <canvas
              ref={canvasRef}
              style={{
                background: "red",
                marginTop: "5px",
              }}
              height={600}
              width={800}
            />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Usermenu;