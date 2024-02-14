import express from "express";
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.text("LOGO AMG", 20, 20);

  pdf.setDrawColor(240, 58, 58);
  pdf.setLineWidth(1);
  pdf.line(120, 10, 120, 30);
  pdf.line(195, 10, 195, 30);

  pdf.setDrawColor(255, 97, 97);
  pdf.line(125, 15, 190, 15);
  pdf.line(125, 25, 190, 25);
  pdf.setFontSize(12);
  pdf.setFont("Helvetica", "bold");
  pdf.text("CONTRATO DE FLETE", 157.5, 21.5, null, null, "center");

  pdf.setFontSize(9);
  pdf.text("TRANSPORTE AMG", 157.5, 35, null, null, "center");

  pdf.setFont("Helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Nieva y Santa Cruz S/N,", 157.5, 40, null, null, "center");
  pdf.text("Ingeniero Giagnoni, Mendoza", 157.5, 43, null, null, "center");
  pdf.text(
    "Tel: +5492634715632 / mail: diegogonzalez@transporteamg.com.ar",
    157.5,
    46,
    null,
    null,
    "center"
  );
  console.log(pdf.getFontList());

  pdf.save("test.pdf");

  res.sendFile(path.join(__dirname, "test.pdf"));
});

app.listen(8080, console.log("funcionando"));
