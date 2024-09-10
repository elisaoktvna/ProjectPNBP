import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import ProdukRoute from "./routes/ProdukRoute.js";
import UserRoute from './routes/UserRoute.js';
import './associations.js'; 
dotenv.config();

const app = express();

// (async()=>{
//     await db.sync();
// })();

// app.use(cors());
//baru
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

//baru
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(KategoriRoute);
app.use(ProdukRoute);
app.use(UserRoute);
app.listen(5000, "10.10.184.250");
// app.listen(5000, () => console.log("server up and running..."));
