"use client";
import React, { useState, useCallback } from "react";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { TrackingModal } from "@/components/modals/tracking-modal";
import { Shipment, ShipmentStatusHistory } from "@prisma/client";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading-spinner";
interface fetchedShipment {
  Shipment: Shipment;
  ShipmentStatusHistory: ShipmentStatusHistory[];
}
const TrackingSearchContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
  const [statusHistory, setStatusHistory] = useState<
    ShipmentStatusHistory[] | null
  >(null);
  const [showNoShipmentAlert, setShowNoShipmentAlert] = useState(false);

  const router = useRouter();

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const trimmedInputValue = inputValue.trim();

      const response = await fetch(`/api/statushistory/${trimmedInputValue}`);

      const data = await response.json();

      if (!data) {
        setShowNoShipmentAlert(true);
        setTimeout(() => {
          setShowNoShipmentAlert(false);
        }, 8000); // Hide alert after 5 seconds
        return;
      }

      const { ShipmentStatusHistory, ...cleanedData } = data;

      // Fetch the status history separately

      const tosethistory = ShipmentStatusHistory;
      setShipmentData({
        ...cleanedData,
      });
      setStatusHistory(tosethistory);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [inputValue]);

  const handleSearchClick = () => {
    fetchData();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <div className="rounded-md  bg-transparent flex justify-between p-4  ">
          <Input
            placeholder="ადევნე თვალი შენს ამანათს"
            className="border-2 h-[50px] border-white bg-white outine-none md:flex-col"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <SearchIcon
            onClick={handleSearchClick}
            className=" absolute right-[40px] mt-3 lg:right-[120px] text-black rounded-md w-6 h-6 ml-4  flex justify-center items-center "
          />
        </div>

        {showNoShipmentAlert && (
          <div
            className="z-[99] transition  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-[100px] flex justify-center items-center mt-[50px]"
            role="alert"
          >
            <strong className="font-bold flex items-center justify-center">
              სამწუხაროდ ამ თრექინგით ამანათი ვერ მოიძებნა...{" "}
            </strong>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setShowNoShipmentAlert(false)}
            >
              <svg
                className="fill-current h-7 w-7 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.929 2.93a1 1 0 1 1-1.414-1.415L8.586 10 5.657 7.071a1 1 0 0 1 1.414-1.415L10 8.586l2.929-2.93a1 1 0 0 1 1.414 1.415L11.414 10l2.93 2.929a1 1 0 0 1 0 1.42z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        )}
      </Container>
      {isModalOpen && shipmentData && (
        <TrackingModal
          statusHistory={statusHistory || []}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          shipmentData={shipmentData}
          loading={loading}
          onConfirm={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setIsModalOpen(false);
            }, 1000);
          }}
        />
      )}
    </>
  );
};

export default TrackingSearchContainer;
