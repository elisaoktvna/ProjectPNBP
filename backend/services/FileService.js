import path from "path";
import fs from "fs";
import { CustomError } from "../helpers/CustomError.js";
class FileService {
  static async saveFile(
    file,
    allowedType = [".png", ".jpg", ".jpeg"],
    maxFileSize = 5000000
  ) {
    try {
      const fileSize = file?.data?.length || 0;
      const ext = path.extname(file?.name || "").toLowerCase();
      const fileName = `${file?.md5 || Math.random() * 10}${ext}`;
      const url = `http://localhost:5000/images/${fileName}`;

      if (!allowedType.includes(ext)) {
        throw new CustomError(
          "Invalid image format. Allowed types: .png, .jpg, .jpeg",
          400
        );
      }

      if (fileSize > maxFileSize) {
        throw new CustomError("Image size must be less than 5 MB", 400);
      }

      await this.moveFile(file, `./public/images/${fileName}`);
      return {
        url,
        fileName,
      };
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }

  static moveFile(file, destination) {
    return new Promise((resolve, reject) => {
      file.mv(destination, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static removeFile(fileName) {
    const filepath = `./public/images/${fileName}`;
    if (fs.existsSync(filepath) && fileName) fs.unlinkSync(filepath);
  }
}

export default FileService;
