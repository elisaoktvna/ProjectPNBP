import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Baner from "../asset/Rectangle 27 (1).png";
import Mie from "../asset/mie.png";
import Milo from "../asset/milo.png";
import * as tf from "@tensorflow/tfjs";

const Usermenu = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(
          "http://localhost:3000/model/model.json"
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const contextCanvas = canvasRef.current.getContext("2d");
    const intervalId = setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;

        // Draw the video frame to the canvas
        contextCanvas.drawImage(
          video,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const imageData = contextCanvas.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (model) {
          // Convert image to Tensor and resize
          let resizedImage = tf.image
            .resizeBilinear(tf.browser.fromPixels(imageData), [42, 42])
            .toFloat()
            .mean(2) // Convert to grayscale by averaging RGB channels
            .expandDims(0) // Add batch dimension
            .expandDims(-1); // Add channel dimension (should be 1 for grayscale)

          // Check shape before prediction
          console.log(resizedImage.shape); // Should be [1, 42, 42, 1]

          // Reshape to [1, 42] if necessary
          const reshapedImage = resizedImage.reshape([1, 42 * 42]);

          // Make a prediction
          const predictions = await model.predict(reshapedImage).data();
          console.log(predictions);
        }

        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.5);
        setCapturedImage(dataUrl);
      }
    }, 1200);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [model]);

  const menuItems = [
    { name: "Taro Milk tea", price: "Rp 5000", rating: 5.0, img: Mie },
    { name: "Mochaccino", price: "Rp 5000", rating: 5.0, img: Milo },
    { name: "Chocolate", price: "Rp 5000", rating: 5.0, img: Mie },
    { name: "Thai Tea", price: "Rp 5000", rating: 5.0, img: Milo },
    { name: "Cincau Susu Gula Aren", price: "Rp 5000", rating: 5.0, img: Mie },
    { name: "Kopi susu Gula Aren", price: "Rp 5000", rating: 5.0, img: Milo },
    {
      name: "Lemon Tea",
      price: "Rp 4000",
      rating: 5.0,
      img: "https://placehold.co/100x200",
    },
    {
      name: "Teh",
      price: "Rp 4000",
      rating: 5.0,
      img: "https://placehold.co/100x200",
    },
    {
      name: "Milo",
      price: "Rp 4000",
      rating: 5.0,
      img: "https://placehold.co/100x200",
    },
  ];

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
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-yellow-100 p-4 rounded-lg shadow-md flex flex-col items-center relative group hover:-translate-y-3 transition-transform duration-300 ease-in-out"
            >
              <img
                src={item.img}
                alt={item.name}
                className="absolute top-0 transform -translate-y-1/2 mb-2 object-contain"
                style={{ width: "120px", height: "120px" }}
              />
              <div className="text-center mt-16">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-700">{item.price}</p>
                <p className="text-yellow-500">
                  <i className="fa fa-star"></i> {item.rating}
                </p>
              </div>
            </div>
          ))}
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
          <div
            style={{
              position: "absolute",
              top: "0", // Move out of view
              width: "1px", // Very small size
              height: "1px",
              opacity: 0, // Set opacity to 0
            }}
          >
            <Webcam
              mirrored
              ref={webcamRef}
              height={600}
              width={800}
              videoConstraints={videoConstraints}
            />
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
  );
};

export default Usermenu;
