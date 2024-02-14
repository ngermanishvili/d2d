"use client";
import * as XLSX from "xlsx";
import { Shipment } from "@prisma/client";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";
import { FaFileExcel } from "react-icons/fa";

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
      "თრექინგი ID": data.trackingId,
      "სახელი / გვარი": data.gamgzavniFullName,
      "ტელეფონის ნომერი": data.phoneNumber,
      "მისამართი": data.address,
      "ქალაქი": data.city,
      "შექმნის თარიღი": data.createdAt,
      "მსხვრევადი": data.brittle,
      "შეფუთვა": data.packaging,
      "ფასი": data.price,
      "მონიშნულია კურიერის მიერ": data.markedByCourier,
      "აღწერა": data.courierComment,
      label: data.label,
      "ვინ იხდის?": data.whopays,
      "პროდუქტის ფასი": data.itemPrice,
      "აღწერის თარიღი": data.updatedAt,
      "მიმღები კურიერი": data.assignedCourier,
      "მიმდინარე სტატუსი": data.status,
      'სავარაუდო აღების დრო': data.agebisDro,
      "სავარაუდო ჩაბარების დრო": data.chabarebisDro,
      "მიმღების სახელი / გვარი": data.mimgebiFullName,

      "მიმღების  ნომერი": data.mimgebisNumber,
      "მიმღების  ქალაქი": data.mimgebiQalaqi,
      "მიმღების მისამართი": data.mimgebisAddress,
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
      const blob = XLSX.writeFile(workbook, "შეკვეთების-ისტორია.xlsx");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <button
        title="გადმოწერე XLSX file"
        type="button"
        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex gap-3 "
        onClick={downloadXLSX}
      >
        <FaFileExcel className="mt-1" />
        გადმოწერე XLSX
      </button>
    </div>
  );
};

export default ShipmentFormXLSX;
