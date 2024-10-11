import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import ProdukRoute from "./routes/ProdukRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import "./associations.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//baru
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(KategoriRoute);
app.use(TransactionRoute);
app.use(ProdukRoute);
app.use(UserRoute);
app.use(AuthRoute);

// app.listen(5000, "10.10.184.250");
app.listen(5000, () => console.log("server up and running..."));
