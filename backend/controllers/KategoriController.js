import KategoriService from "../services/KategoriService.js";

class KategoriController {
  static async getKategori(req, res) {
    try {
      const response = await KategoriService.getKategoriAll();
      return res.json(response);
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
  }

  static async getKategoriById(req, res) {
    try {
      const id = req.params.id;
      const kategori = await KategoriService.getKategoriById(id);
      return res.json(kategori);
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
  }

  static async saveKategori(req, res) {
    if (req.files === null)
      return res.status(400).json({ msg: "No file Uploaded" });

    const name = req.body.title;
    const file = req.files.file;
    try {
      const data = await KategoriService.saveKategori(name, file);
      return res.status(201).json({ msg: "product created succesfuly", data });
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
  }

  static async updateKategori(req, res) {
    const name = req.body.title;
    const id = req.params.id;
    const files = req?.files;
    const kategori = await KategoriService.getKategoriById(id);
    if (!kategori) return res.status(404).json({ msg: "no data found" });

    try {
      await KategoriService.updateKategori(id, name, files);
      return res.status(200).json({ msg: "updated successfuly" });
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
  }

  static async deleteKategori(req, res) {
    const id = req.params.id;
    const kategori = await KategoriService.getKategoriById(id);
    if (!kategori) return res.status(404).json({ msg: "no data found" });
    try {
      await KategoriService.deleteKategori(id, kategori.image);
      return res.status(200).json({ msg: "kategori deleted succesfuly" });
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
  }
}

export default KategoriController;
