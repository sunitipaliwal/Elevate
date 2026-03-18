import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"

export const generateOptimizedPDF = async (htmlContent, layout) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = `optimized_resume_${Date.now()}.pdf`
      const tempDir = path.resolve(process.cwd(), "temp")
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
      
      const filePath = path.join(tempDir, fileName)
      
      const browser = await puppeteer.launch({ 
         headless: "new",
         args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      const marginY = layout?.marginY || 40;
      const marginX = layout?.marginX || 45;

      // 🚀 INCLUDED EXPANDED FONTS & MAGIC AUTO-STRETCH CSS
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Lora:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Montserrat:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
          <style>
            @page { 
                size: A4; 
                margin: 0; /* Remove default page margins, we handle it in body */
            }
            body { 
                margin: 0 !important; 
                background: white; 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                
                /* Force Exact A4 Dimensions */
                width: 210mm;
                height: 297mm; 
                box-sizing: border-box;
                
                /* Apply user margins dynamically here instead of Puppeteer config */
                padding-top: ${marginY}px;
                padding-bottom: ${marginY}px;
                padding-left: ${marginX}px;
                padding-right: ${marginX}px;
            }
            
            #resume-print-area {
                height: 100%;
                display: flex;
                flex-direction: column;
                
                /* 🔥 THE MAGIC HACK: This distributes any extra blank space at the bottom evenly between all sections! */
                justify-content: space-between; 
            }
            
            a { text-decoration: none; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

      await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

      // Notice: We removed the `margin` object from here because CSS is handling it perfectly now.
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
      });

      await browser.close();
      resolve(filePath);
    } catch (error) {
      console.error("Puppeteer Generation Error:", error);
      reject(error);
    }
  });
}