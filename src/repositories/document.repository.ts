import { ConflictError } from "../utils/error";
import { Document } from "../generated/prisma";
import { PrismaClient } from "../generated/prisma";
class DocumentRepo {
  constructor(private prisma: PrismaClient){

  }
  //  async createDocument(
  //   data: Partial<Document>
  // ): Promise<Document> {
  //   try {
  //     const userData = await prisma.document.create({
  //       data,
  //     });
  //     return userData;
  //   } catch (err) {
  //     if (err instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (err.code === "P2002") {
  //         throw new ConflictError("Email already exits, try logging in");
  //       }
  //     }
  //     throw err;
  //   }
  // }

   async getDocumentById(id: number): Promise<Document | null> {
    try {
      const document = await this.prisma.document.findUnique({
        where: {
          id,
        },
      });
      return document;
    } catch (err) {
      throw err;
    }
  }

   async updateDocumentById(
    document: Partial<Document>
  ): Promise<Document | null> {
    try {
      const { id, ...data } = document;
      const updatedDocument = await this.prisma.document.update({
        where: {
          id,
        },
        data,
      });
      return updatedDocument;
    } catch (err) {
      throw err;
    }
  }

   async deleteDocumentById(id: number): Promise<Document | null> {
    try {
      const document = await this.prisma.document.delete({
        where: {
          id,
        },
      });

      return document;
    } catch (err) {
      throw err;
    }
  }
}

export default DocumentRepo;
