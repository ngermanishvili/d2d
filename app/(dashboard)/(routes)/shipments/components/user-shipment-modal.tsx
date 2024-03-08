"use client";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { Modal, Steps, Tag } from "antd";
import { Button } from "@/components/ui/button";
import { Shipment } from "@prisma/client";

import D2DLogo from "@/assets/images/d2d.jpg";
import Image from "next/image";
import usePhoneStore from "@/hooks/user-shipment-phone";
import LoadingSpinner from "@/app/_components/_client/loading-spinner";

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
      <div className="flex justify-between mt-5 w-full flex-col sm:flex-row">
        <div className="">
          <Title level={4}>გამგზავნის ინფორმაცია</Title>
          <Paragraph>
            <ul>
              <li>სახელი: {capitalizeFirstLetter(shipmentData.gamgzavniFullName)}</li>
              <li>
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
                სახელი: {capitalizeFirstLetter(shipmentData.mimgebiFullName)}
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
      className="w-full"
      title={`შეკვეთა: ${shipmentData?.trackingId}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {shipmentData ? (
        <ShipmentDetails shipmentData={shipmentData} />
      ) : (
        <>
          <LoadingSpinner />
        </>
      )}
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="destructive"
          onClick={() => {
            onClose()

            onConfirm(phone)
          }
          }
        >
          დახურვა
        </Button>

      </div>
    </Modal>
  );
};
