import * as tf from "@tensorflow/tfjs";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import preProcessLandmark from "../helpers/LandmarkProses";
import calcLandmarkList from "../helpers/CalculateLandmark";
import ConvertResult from "../helpers/ConvertResult";

class GestureDetect {
  constructor(webcamRef, setResultPredict) {
    this.webcamRef = webcamRef;
    this.setResultPredict = setResultPredict;
    this.model = null;
    this.handLandmarker = null;
    this.inputTensor = null; // Reuse input tensor
  }

  startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 }, // Optimize resolution
          height: { ideal: 480 },
        },
      });

      if (this.webcamRef.current) {
        this.webcamRef.current.srcObject = stream;
      }

      await this.initializeHandDetection();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  loadModel = async () => {
    try {
      await tf.setBackend("webgl"); // Use the 'webgl' backend for performance
      await tf.ready();
      const lm = await tf.loadLayersModel(
        // "http://localhost:3000/model/model2/model.json"
        "http://localhost:3000/model/model.json"
      );
      this.model = lm;
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  initializeHandDetection = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        numHands: 1, // Detect only one hand for better performance
        runningMode: "VIDEO",
      });

      this.detectHands();
    } catch (error) {
      console.error("Error initializing hand detection:", error);
    }
  };

  makePrediction = async (finalResult, handedness) => {
    if (!this.model) return;

    // Reuse the input tensor if possible to avoid creating new ones
    if (!this.inputTensor) {
      this.inputTensor = tf.tensor2d([finalResult]);
    } else {
      this.inputTensor.dispose(); // Dispose of the old tensor before reusing
      this.inputTensor = tf.tensor2d([finalResult]);
    }

    try {
      const prediction = this.model.predict(this.inputTensor);
      const result = prediction.dataSync();

      const maxEntry = Object.entries(result).reduce((max, entry) => {
        const [, value] = entry;
        return value > max[1] ? entry : max;
      });

      const [maxKey, maxValue] = maxEntry;
      const percentageValue = (maxValue * 100).toFixed(2);
      if (ConvertResult(parseInt(maxKey)) == "Open" && percentageValue > 70) {
        this.setResultPredict({
          gesture: ConvertResult(parseInt(maxKey)),
          handType: handedness,
          accuracy: percentageValue + "%",
        });
      } else if (ConvertResult(parseInt(maxKey)) != "Open") {
        this.setResultPredict({
          gesture: ConvertResult(parseInt(maxKey)),
          handType: handedness,
          accuracy: percentageValue + "%",
        });
      }
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      this.inputTensor.dispose(); // Dispose to free up memory
    }
  };

  detectHands = async () => {
    if (this.webcamRef.current && this.webcamRef.current.readyState >= 2) {
      const detections = this.handLandmarker.detectForVideo(
        this.webcamRef.current,
        performance.now()
      );

      if (detections.landmarks && detections.handednesses.length > 0) {
        const handType = detections.handednesses[0][0].categoryName; // Left or right hand
        const landmarks = detections.landmarks[0].map((landmark) => landmark);
        const calcLandmarks = calcLandmarkList(
          this.webcamRef.current,
          landmarks
        );
        const finalResult = preProcessLandmark(calcLandmarks);
        this.makePrediction(finalResult, handType);
      }
    }

    // Reduce processing rate to 10 frames per second (every 100ms)
    setTimeout(() => {
      requestAnimationFrame(this.detectHands);
    }, 100);
  };
}

export default GestureDetect;
