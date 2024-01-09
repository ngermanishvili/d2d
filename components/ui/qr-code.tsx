"use client";
import {useEffect, useRef} from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({text}) => {
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

  return <canvas ref={qrCodeRef} />;
};

export default QRCodeGenerator;
