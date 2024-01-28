import React from "react";
import CardSettings from "@/components/cards/Cards/CardSettings";
import CardProfile from "@/components/cards/Cards/CardProfile";
interface SettingsPageProps {
  amountOfShipments: number;
}

const SettingsBody2: React.FC<SettingsPageProps> = ({ amountOfShipments }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 px-4">
        <CardSettings />
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <CardProfile amountOfShipments={amountOfShipments} />
      </div>
    </div>
  );
};

export default SettingsBody2;
