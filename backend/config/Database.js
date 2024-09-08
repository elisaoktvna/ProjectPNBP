import { Sequelize } from "sequelize";

const db = new Sequelize('kasuli_db', 'root', 'elisaoktvna4', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;