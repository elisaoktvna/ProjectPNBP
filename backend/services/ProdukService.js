import Kategori from "../models/KategoriModel.js";
import Produk from "../models/ProductModel.js";
import FileService from "./FileService.js";

class ProdukService {
  static async getProdukAll() {
    const response = await Produk.findAll({
      include: Kategori,
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
    if (resFile.status !== 200) return { msg: resFile.msg };
    const { fileName, url } = resFile.data;
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
    if (files === null) {
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
