import Kategori from "./../models/KategoriModel.js";
import FileService from "./FileService.js";

class KategoriService {
  static async getKategoriAll() {
    const response = await Kategori.findAll();
    return response;
  }
  static async saveKategori(title, file) {
    const allowedType = [".png", ".jpg", ".jpeg"];
    const resFile = await FileService.saveFile(file, allowedType, 5000000);
    const { fileName, url } = resFile;
    const data = await Kategori.create({
      name: title,
      image: fileName,
      url,
    });

    return data;
  }
  static async getKategoriById(id) {
    const kategori = await Kategori.findOne({
      where: {
        id,
      },
    });

    return kategori;
  }

  static async updateKategori(id, name, files) {
    const kategori = await this.getKategoriById(id);
    let fileName = "";
    let url = "";
    if (files === null) {
      fileName = kategori.image;
      url = kategori.url;
    } else {
      const file = files.file;
      const allowedType = [".png", ".jpg", ".jpeg"];
      const data = await FileService.saveFile(file, allowedType, 5000000);
      fileName = data.fileName;
      url = data.url;
      FileService.removeFile(kategori.image);
    }
    const data = { name: name, image: fileName, url: url };
    await Kategori.update(data, {
      where: {
        id,
      },
    });
    return data;
  }
  static async deleteKategori(id, image) {
    FileService.removeFile(image);
    const data = await Kategori.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}

export default KategoriService;
