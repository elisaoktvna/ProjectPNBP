import { useState, useEffect } from "react";
import Baner from "../asset/Rectangle 27 (1).png";
import { useFetch } from "../hooks/useFetch";
import Mie from "../asset/mie.png";


const Usermenu = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [loadCamera, setLoadCamera] = useState(false);

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
    </>
  );
};

export default Usermenu;