"use client";
import * as XLSX from "xlsx";
import { Shipment } from "@prisma/client";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";
export type ShipmentColumn = {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
  brittle: string;
  packaging: string;
  createdAt: string | Date;
  updatedAt: string | Date; // Allow both string and Date
  mimgebisName: string;
  mimgebisLastname: string;
  mimgebisNumber: string;
  mimgebisAddress: string;
  markedByCourier: string;
  mimgebiQalaqi: string;
  trackingId: string;
  status: string;
  courierComment: string;
  agebisDro: string | null;
  chabarebisDro: string | null;
};

const ShipmentFormXLSX = () => {
  const { filteredDataxlsx, setFilteredDataxlsx } = useShipmentStoreXLSX();
  const renameKeys = (data: any) => {
    return {
      id: data.id,
      name: data.name,
      "ტრექინგის ID": data.trackingId,
      userId: data.userId,
      გვარი: data.lastName,
      "ტელეფონის ნომერი": data.phoneNumber,
      მისამართი: data.address,
      ქალაქი: data.city,
      "შექმნის თარიღი": data.createdAt,
      brittle: data.brittle,
      packaging: data.packaging,
      ფასი: data.price,
      "მონიშნულია კურიერის მიერ": data.markedByCourier,
      აღწერა: data.courierComment,
      label: data.label,
      whopays: data.whopays,
      itemPrice: data.itemPrice,
      "აღწერის თარიღი": data.updatedAt,
      "მიმღები კურიერი": data.assignedCourier,
      "მიმდინარე სტატუსი": data.status,
      agebisDro: data.agebisDro,
      chabarebisDro: data.chabarebisDro,
      "მიმღები კურიერის სახელი": data.mimgebisName,
      "მიმღები კურიერის გვარი": data.mimgebisLastname,
      "მიმღები კურიერის ნომერი": data.mimgebisNumber,
      "მიმღები კურიერის ქალაქი": data.mimgebiQalaqi,
      "მიმღები კურიერის მისამართი": data.mimgebisAddress,
    };
  };

  const downloadXLSX = () => {
    if (filteredDataxlsx) {
      const transformedShipmentData = filteredDataxlsx.map((shipment) =>
        renameKeys(shipment)
      );

      const worksheet = XLSX.utils.json_to_sheet(transformedShipmentData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ShipmentData");

      // Use XLSX.write instead of XLSX.writeFile
      const blob = XLSX.writeFile(workbook, "shipment.xlsx");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadXLSX}
      >
        Download XLSX
      </button>
    </div>
  );
};

export default ShipmentFormXLSX;
