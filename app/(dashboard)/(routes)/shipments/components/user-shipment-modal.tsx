"use client";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { Modal, Steps, Tag } from "antd";
import { Button } from "@/components/ui/button";
import { Shipment } from "@prisma/client";

import D2DLogo from "@/assets/images/d2d.jpg";
import Image from "next/image";
import usePhoneStore from "@/hooks/user-shipment-phone";

const { Title, Paragraph } = Typography;

interface ShipmentDetailsProps {
  shipmentData: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipmentData }) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { phone, setPhone } = usePhoneStore();
  useEffect(() => {
    setPhone(shipmentData.phoneNumber);
  }, [shipmentData]);

  return (
    <>
      <div className="flex justify-between mt-5 ">
        <div>
          <Image
            className="hidden md:block cursor-pointer rounded-full"
            src={D2DLogo}
            height="80"
            width="80"
            alt="Logo"
          />
        </div>
       
      </div>
      <div className="flex justify-between mt-5">
        <div className="">
          <Title level={4}>გამგზავნის ინფორმაცია</Title>
          <Paragraph>
            <ul>
              <li>სახელი: {capitalizeFirstLetter(shipmentData.name)}</li>
              <li>გვარი: {capitalizeFirstLetter(shipmentData.lastName)}</li>
              <li>
                {" "}
                <input
                  type="text"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </li>
            </ul>
          </Paragraph>
        </div>
        <div className="">
          <Title level={4}>მიმღების ინფორმაცია</Title>
          <Paragraph>
            <ul>
              <li>
                სახელი: {capitalizeFirstLetter(shipmentData.mimgebisName)}
              </li>
              <li>
                გვარი: {capitalizeFirstLetter(shipmentData.mimgebisLastname)}
              </li>
              <li>ტელ: +995 {shipmentData.mimgebisNumber}</li>
            </ul>
          </Paragraph>
        </div>
      </div>
    </>
  );
};

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentData: Shipment | null;
  onConfirm: (phone: string) => void;
  loading: boolean;
}

export const UserShimpmentModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  shipmentData,
  onConfirm,
  loading,
}) => {
  const { phone } = usePhoneStore();
  return (
    <Modal
      width={1000}
      title={`შეკვეთა: ${shipmentData?.trackingId}`}
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {shipmentData ? (
        <ShipmentDetails shipmentData={shipmentData} />
      ) : (
        <p>Loading...</p>
      )}

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={() => onConfirm(phone)}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
