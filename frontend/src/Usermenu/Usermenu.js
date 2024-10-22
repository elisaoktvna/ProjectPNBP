import { useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import Mie from "../asset/mie.png";


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
  const { data: produks } = useFetch("/produk");
  console.log(produks);  

  const backendURL = process.env.REACT_APP_BASE_URL;

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
            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">
              Minuman Dingin
            </button>
            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">
              Minuman Panas
            </button>
            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">
              Makanan Berat
            </button>
            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">
              Snack
            </button>
            <button className="bg-gray-200 text-gray-700 active:text-white px-4 py-2 rounded-full mx-2 transition transform hover:scale-105 active:scale-95 hover:bg-yellow-200 active:bg-yellow-500">
              Juice
            </button>
          </div>

          {/* Konten item makanan/minuman */}
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
                  <p className="text-yellow-500">{produk.rating || "No rating"}
                    <i className="fas fa-star"></i> 
                  </p>
                  </div>
                </div>
              );
              })}
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
        
        <div className="flex-1 bg-yellow-400  h-20 rounded-2xl pr-4 flex justify-between items-center">
        <div className=" bg-white size-20 rounded-2xl mr-4 drop-shadow-md">
        <img src={Mie} alt="Food item" className="size-20 rounded-2xl mr-4 shadow-md" />
        </div>
          <span>1 X Taro Milk tea</span>
          <span>Rp 5000</span>
        </div>
        <div className="flex flex-col ml-4">
          <button className="bg-yellow-400 text-white rounded-full w-8 h-8 mb-2">+</button>
          <button className="bg-yellow-400 text-white rounded-full w-8 h-8">-</button>
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
    </div>
  );
};

export default Usermenu;
