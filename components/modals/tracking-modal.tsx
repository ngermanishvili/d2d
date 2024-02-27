"use client";
import React from "react";
import moment from "moment";
import { Divider, Typography } from "antd";
import { Modal, Steps, Tag } from "antd";
import { Button } from "@/components/ui/button";
import { Shipment, ShipmentStatusHistory } from "@prisma/client";
const { Step } = Steps;

import D2DLogo from "@/assets/images/d2d.jpg";
import Image from "next/image";

const { Title, Paragraph } = Typography;
interface fetchedShipment {
  Shipment: Shipment;
  ShipmentStatusHistory: ShipmentStatusHistory[];
}
interface ShipmentDetailsProps {
  shipmentData: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipmentData }) => {
  const capitalizeFirstLetter = (str: string) => {
    return str;
  };
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
        <Tag className=" text-sm p-1 absolute right-[20px] " color="orange">
          {" "}
        </Tag>
      </div>
      <div className="flex justify-between mt-5">
        <div className="">
          <Title level={4}>გამგზავნის ინფორმაცია</Title>
          <Paragraph>
            <ul>
              <li>
                სახელი: {capitalizeFirstLetter(shipmentData.gamgzavniFullName)}
              </li>
              <li> ტელ: +995 {shipmentData.phoneNumber}</li>
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
  statusHistory: ShipmentStatusHistory[] | null;
  onConfirm: () => void;
  loading: boolean;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  shipmentData,
  statusHistory,
  onConfirm,
  loading,
}) => {
  return (
    <Modal
      width={1000}
      title={`შეკვეთა:`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {shipmentData ? (
        <ShipmentDetails shipmentData={shipmentData} />
      ) : (
        <p>Loading...</p>
      )}

      {statusHistory && statusHistory.length > 0 && (
        <div>
          <Divider />
          <Title level={5}>ადევნე თვალი შეკვეთას</Title>
          <Steps direction="horizontal" current={statusHistory.length - 1}>
            {statusHistory.map((status, index) => (
              <Step
                key={status.id}
                title={status.status}
                description={moment(status.timestamp).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
                status={
                  index === statusHistory.length - 1 ? "process" : "finish"
                }
              />
            ))}
          </Steps>
        </div>
      )}

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          დახურვა
        </Button>
      </div>
    </Modal>
  );
};
