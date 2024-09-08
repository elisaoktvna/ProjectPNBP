import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Kategori = db.define('kategori', {
    name: DataTypes.STRING,

    image: DataTypes.STRING,
    url: DataTypes.STRING

},{
    freezeTableName: true
});

export default Kategori;

(async()=>{
    await db.sync();
})();