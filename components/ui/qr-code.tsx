"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF, { AcroFormField, AcroFormTextField } from "jspdf";
import { Button } from "./button";
interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text }) => {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate QR code when the component mounts
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, text, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  }, [text]);

  const downloadPdf = () => {
    if (qrCodeRef.current) {
      // Capture canvas as image using html2canvas
      html2canvas(qrCodeRef.current).then((canvas) => {
        // Convert canvas to base64 image data
        const imageData = canvas.toDataURL("image/png");

        // Initialize jsPDF
        const pdf = new jsPDF();

        // Add image to PDF
        pdf.addImage(imageData, "PNG", 50, 50, 100, 100); // Adjust position and size as needed

        // Download PDF
        pdf.save("qrcode.pdf");
      });
    }
  };

  console.log(text);

  return (
    <div>
      <canvas ref={qrCodeRef} />
      <Button className="w-full" onClick={downloadPdf}>გადმოწერე QR</Button>
    </div>
  );
};

export default QRCodeGenerator;
