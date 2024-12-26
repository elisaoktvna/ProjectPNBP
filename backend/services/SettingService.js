import FileService from "./FileService.js";
import SettingModel from "./../models/SettingModel.js";
class SettingService {
  static async all() {
    return await SettingModel.findOne();
  }
  static async updateSetting(id, images, data) {
    const allowedType = [".png", ".jpg", ".jpeg"];
    let imagesResult = [];
    const dataIndex = data.imageIndex
      ? data.imageIndex
          .split(",")
          .map(Number)
          .sort((a, b) => a - b)
      : [];

    // Ambil data setting yang ada
    const settingData = await SettingModel.findOne();

    // Auto-fill dengan gambar lama jika tidak di-update
    if (settingData?.images) {
      settingData.images.forEach((image, i) => {
        if (dataIndex.includes(i)) {
          // Jika ada gambar yang di-update, skip posisi index ini
          imagesResult.splice(i, 0, null);
        } else {
          // Jika tidak ada, masukkan gambar lama
          imagesResult.push(image);
        }
      });
    }

    // Upload file baru dan tambahkan ke array hasil
    if (images && images["images[]"]) {
      const files = Array.isArray(images["images[]"])
        ? images["images[]"]
        : [images["images[]"]];

      await Promise.all(
        files.map(async (image, i) => {
          try {
            const resFile = await FileService.saveFile(
              image,
              allowedType,
              5000000
            );
            const targetIndex =
              dataIndex[i] !== undefined ? dataIndex[i] : imagesResult.length;
            imagesResult.splice(targetIndex, 1, resFile.fileName);
          } catch (err) {
            console.error("Error saving file:", err);
          }
        })
      );
    }

    // Hapus file lama yang tidak digunakan
    const oldImages = settingData?.images || [];
    const unusedImages = oldImages.filter((img) => !imagesResult.includes(img));

    unusedImages.forEach((image) => {
      try {
        FileService.removeFile(image); // Implement unlink di FileService
      } catch (err) {
        console.error(`Error unlinking file: ${image}`, err);
      }
    });

    // Simpan data yang telah diperbarui
    const result = await SettingModel.upsert({
      id,
      images: imagesResult.filter(Boolean), // Hapus nilai `null` yang mungkin tersisa
    });

    return result;
  }

  static async addSetting(data) {}
}

export default SettingService;
