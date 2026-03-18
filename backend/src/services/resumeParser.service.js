import axios from "axios";
import PDFParser from "pdf2json";

export const extractResumeText = (fileUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
      const pdfBuffer = Buffer.from(response.data);

      const pdfParser = new PDFParser(this, 1); // 1 = returns raw text

      pdfParser.on("pdfParser_dataError", (errData) => {
          console.error("PDF Parser Error:", errData.parserError);
          reject(new Error("Resume parsing failed"));
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
          const text = pdfParser.getRawTextContent();
          resolve(text.slice(0, 12000));
      });

      pdfParser.parseBuffer(pdfBuffer);

    } catch (error) {
      console.error("Download Error:", error);
      reject(new Error("Failed to fetch resume from Cloudinary"));
    }
  });
};