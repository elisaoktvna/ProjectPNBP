import Product from "../models/ProductModel.js";
import Kategori from "../models/KategoriModel.js";
import path from "path";
import fs from "fs";
import ProdukService from "../services/ProdukService.js";

class ProductController {
  static async getProducts(req, res) {
    try {
      const response = await ProdukService.getProdukAll();
      return res.json(response);
    } catch (error) {
      return res.status(error.code).json({ msg: error.message });
    }
  }

  static async getProductById(req, res) {
    const id = req.params.id;
    try {
      const response = await ProdukService.getProdukById(id);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async saveProduct(req, res) {
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });
    const data = req.body;
    const file = req.files.file;

    try {
      await ProdukService.saveProduk(data, file);
      return res.status(201).json({ msg: "Product created successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async updateProduct(req, res) {
    const id = req.params.id;
    const data = req.body;
    const file = req.files.file;

    const product = await ProdukService.getProdukById(id);
    if (!product) return res.status(404).json({ msg: "no data found" });
    try {
      await ProdukService.updateProduk(id, data, file);
      return res.status(200).json({ msg: "updated successfuly" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteProduct(req, res) {
    const id = req.params.id;
    const product = await ProdukService.getProdukById(id);
    if (!product) return res.status(404).json({ msg: "no data found" });
    try {
      await ProdukService.deleteProduk(id, product.image);
      return res.status(200).json({ msg: "product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

export default ProductController;
