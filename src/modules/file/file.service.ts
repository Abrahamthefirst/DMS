import cloudinary from "../../config/cloudinary";
import { v2 } from "cloudinary";
import fs from "node:fs/promises";
import { Document } from "../../generated/prisma";

class uploadService {
  constructor(private cloudinary: typeof v2) {
    this.cloudinary = cloudinary;
  }
  async upload(files: Express.Multer.File[]): Promise<Document[] | null> {
    try {
      const uploadedResults: Document[] = [];
      const filesToCleanUp: string[] = [];
      if (files !== undefined) {
        for (const file of files) {
          const filePath = file.path;
          filesToCleanUp.push(filePath);
          const uploadResult = await this.cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
          });
          // uploadedResults.push({
          //   url: uploadResult.secure_url,
          //   publicId: uploadResult.public_id,
          //   title: file.originalname,
          //   fileSize: file.size.toString(),
          //   fileType: file.mimetype,
          // });
          await Promise.all(
            filesToCleanUp.map((path) =>
              fs.unlink(path).catch((err) => {
                console.error(`Failed to delete local file ${path}:`, err);
              })
            )
          );
        }
        return uploadedResults;
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}

export default uploadService;
