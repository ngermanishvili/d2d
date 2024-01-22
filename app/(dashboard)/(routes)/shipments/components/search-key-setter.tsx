import React, {useState} from "react";
import {useSearchKeyStore} from "@/hooks/search-key-store";

export const ShipmentSearchDropdown = () => {
  const shipmentColumns: string[] = [
    "id",
    "name",
    "lastName",
    "phoneNumber",
    "address",
    "city",
    "price",
    "brittle",
    "packaging",
    "createdAt",
    "updatedAt",
    "mimgebisName",
    "mimgebisLastname",
    "mimgebisNumber",
    "mimgebisAddress",
    "markedByCourier",
    "mimgebiQalaqi",
    "trackingId",
    "status",
    "courierComment",
    "agebisDro",
    "chabarebisDro",
  ];
  const {searchKey, setSearchKey} = useSearchKeyStore();

  const handleChange = (selectedKey: string) => {
    setSearchKey(selectedKey);
  };

  return (
    <select
      value={searchKey}
      onChange={(e) => handleChange(e.target.value)}
      className="border p-2 rounded-md"
    >
      <option value="">Select Search Key</option>
      {shipmentColumns.map((column) => (
        <option key={column} value={column}>
          {column}
        </option>
      ))}
    </select>
  );
};
