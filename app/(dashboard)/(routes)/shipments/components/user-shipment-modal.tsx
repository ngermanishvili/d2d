"use client";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import { Modal, Steps, Tag } from "antd";
import { Button } from "@/components/ui/button";
import { Shipment, ShipmentStatusHistory } from "@prisma/client";

import D2DLogo from "@/assets/images/d2d.jpg";
import Image from "next/image";
import usePhoneStore from "@/hooks/user-shipment-phone";
import LoadingSpinner from "@/app/_components/_client/loading-spinner";
import { TrackingModalForHistory } from "@/components/modals/tracking-modal-history";

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
              <li>
                სახელი: {capitalizeFirstLetter(shipmentData.gamgzavniFullName)}
              </li>
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
  statusHistory: ShipmentStatusHistory[];
}

export const UserShimpmentModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  shipmentData,
  onConfirm,
  loading,
  statusHistory,
}) => {
  const { phone } = usePhoneStore();
  return (
    <Modal className="w-full" open={isOpen} onCancel={onClose} footer={null}>
      <div className="w-full">
        {shipmentData ? (
          <>
            <ShipmentDetails shipmentData={shipmentData} />
            <TrackingModalForHistory statusHistory={statusHistory} />
          </>
        ) : (
          <>
            <LoadingSpinner />
          </>
        )}
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="default"
            onClick={() => {
              onClose();
            }}
          >
            დახურვა
          </Button>{" "}
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => {
              onConfirm(phone);
              onClose();
            }}
          >
            შენახვა
          </Button>
        </div>
      </div>
    </Modal>
  );
};
