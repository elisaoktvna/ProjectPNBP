import { Op, Sequelize } from "sequelize"; // Pastikan sequelize diimport

import Kategori from "../models/KategoriModel.js";
import Produk from "../models/ProductModel.js";
import TransactionDetail from "../models/TransactionDetailModel.js";
import FileService from "./FileService.js";
import Transaction from "../models/TransactionModel.js";

class ProdukService {
  static async getProdukAll() {
    const response = await Produk.findAll({
      include: {
        model: Kategori,
      },
      order: [["id", "DESC"]],
    });
    return response;
  }
  static async getProdukTerlaris() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Awal hari ini

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // Akhir hari ini

    const response = await Produk.findAll({
      include: [
        {
          model: Kategori,
          required: true, // Menyertakan kategori jika ada
        },
        {
          model: TransactionDetail,
          attributes: [], // Tidak memerlukan kolom langsung dari TransactionDetail
          required: true, // Hanya produk yang terjual
          include: [
            {
              model: Transaction,
              where: {
                createdAt: {
                  [Op.between]: [startOfToday, endOfToday], // Filter berdasarkan hari ini
                },
              },
            },
          ],
        },
      ],
      attributes: [
        "name", // Nama produk
        "price", // Harga produk
        [
          Sequelize.fn("SUM", Sequelize.col("TransactionDetails.qty")), // Total kuantitas
          "totalTerjual",
        ],
      ],
      group: [
        "products.id",
        "categoryId",
        "products.name",
        "products.price",
        "TransactionDetails.transactionId",
      ], // Kelompokkan berdasarkan Produk dan Kategori
      order: [[Sequelize.literal("totalTerjual"), "DESC"] ], // Urutkan berdasarkan total terjual
    });
    return response;
  }

  static async getProdukById(id) {
    const produk = await Produk.findOne({
      where: {
        id,
      },
      include: Kategori,
    });

    return produk;
  }

  static async saveProduk(data, file) {
    const allowedType = [".png", ".jpg", ".jpeg"];
    const resFile = await FileService.saveFile(file, allowedType, 5000000);
    console.log(resFile);

    const { fileName, url } = resFile;
    const result = await Produk.create({
      ...data,
      image: fileName,
      url,
    });

    return result;
  }

  static async updateProduk(id, datas, files) {
    const produk = await this.getProdukById(id);
    let fileName = "";
    let url = "";

    if (!files) {
      fileName = produk.image;
      url = produk.url;
    } else {
      const file = files;
      const allowedType = [".png", ".jpg", ".jpeg"];
      const data = await FileService.saveFile(file, allowedType, 5000000);
      fileName = data?.fileName;
      url = data?.url;
      FileService.removeFile(produk.image);
    }

    const dataUpdate = { ...datas, image: fileName, url: url };

    const data = await Produk.update(dataUpdate, {
      where: {
        id,
      },
    });

    return data;
  }
  static async deleteProduk(id, image) {
    FileService.removeFile(image);
    const data = await Produk.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}

export default ProdukService;
