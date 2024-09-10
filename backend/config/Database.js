import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;
const db = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBHOST,
  dialect: "mysql",
});

export default db;
