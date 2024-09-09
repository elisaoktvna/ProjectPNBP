import Product from "../models/ProductModel.js";
import Kategori from "../models/KategoriModel.js"; 
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            include: Kategori 
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: Kategori 
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No file Uploaded" });
    const { name, price, description, stock, categoryId } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid image" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({ name, price, description, stock, image: fileName, url, categoryId });
            res.status(201).json({ msg: "Product created successfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "no data found" });

    let fileName = "";
    if (req.files === null) {
        fileName = product.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid image" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "image must be less than 5 MB" });

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { name, price, description, stock, categoryId } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Product.update({ name, price, description, stock, image: fileName, url, categoryId }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "updated successfully" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "no data found" });
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "product deleted successfully" });
    } catch (error) {
        console.log(error.message);
    }
}