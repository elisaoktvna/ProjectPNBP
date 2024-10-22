import React, { useRef, useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import * as tf from "@tensorflow/tfjs";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import preProcessLandmark from "../helpers/LandmarkProses";
import calcLandmarkList from "../helpers/CalculateLandmark";
import ConvertResult from "../helpers/ConvertResult";

const Usermenu = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [loadCamera, setLoadCamera] = useState(false);

  const [resultPredict, setResultPredict] = useState({
    abjad: "",
    acc: "",
    handType: "",
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
        webcamRef.current.srcObject = stream;
      }

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
        "http://localhost:3000/model/model2/model.json"
      );
      model = lm;

      setLoadCamera(true);
    } catch (error) {
      console.error("Error loading model:", error);
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

  const makePrediction = async (finalResult, handedness) => {
    const input = tf.tensor2d([finalResult]);
    if (!model) return;
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
      handType: handedness, // Menyimpan informasi apakah tangan yang terdeteksi kanan atau kiri
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

      setHandPresence(detections.handednesses.length > 0);

      // Mengecek jika ada deteksi tangan
      if (detections.landmarks && detections.handednesses.length > 0) {
        const handType = detections.handednesses[0][0].categoryName; // Mendapatkan apakah tangan kanan atau kiri
        const landm = detections.landmarks[0].map((landmark) => landmark); 
        const calt = calcLandmarkList(webcamRef.current, landm);
        const finalResult = preProcessLandmark(calt);

        makePrediction(finalResult, handType); // Mengirim informasi tangan (kanan/kiri) bersama dengan hasil landmark
      }
    }
    requestAnimationFrame(detectHands);
  };

  useEffect(() => {
    loadModel();
    startWebcam();
    setLoadCamera(true);
  }, []);

  console.log(resultPredict);

  const categories = [
    "Minuman Dingin",
    "Minuman Panas",
    "Makanan Berat",
    "Snack",
    "Juice",
  ];

  const { data: produks } = useFetch("/produk");

  const backendURL = process.env.REACT_APP_BASE_URL;

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <img
            src={Baner}
            alt="Banner"
            className="rounded-3xl shadow-md w-full"
          />
        </div>
        {/* Category Buttons */}
        <div className="flex justify-center mb-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500"
            >
              {category}
            </button>
          ))}
        </div>
        {/* Menu Items */}
        <div className="mt-24 grid grid-cols-3 gap-x-6 gap-y-20">
          {produks?.map((produk, index) => {
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
                  <p className="text-gray-700">{produk.price || "No rating"}</p>
                  <p className="text-yellow-500">
                    {produk.rating || "No rating"}
                    <i className="fas fa-star"></i>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Sidebar for Order Summary */}
      <div className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">
          <i className="fa fa-cart"></i> Order List
        </h2>
        <div className="flex justify-between mb-2">
          <span>Total Item : 0</span>
          <span>Total Harga : Rp 0</span>
        </div>
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

        {/* Webcam Component */}
        <div className="mt-8">
          <video
            ref={webcamRef}
            className="w-full max-h-[80svh] object-cover"
            autoPlay
            playsInline
          ></video>
          <div
            style={{
              position: "absolute",
              top: "0", // Move out of view
              width: "1px", // Very small size
              height: "1px",
              opacity: 0, // Set opacity to 0
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                background: "red",
                marginTop: "5px",
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="font-semibold">
            Gesture: {resultPredict.abjad} - {resultPredict.acc}
          </p>
          <p className="text-sm text-gray-500">
            Tangan terdeteksi: {resultPredict.handType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Usermenu;
