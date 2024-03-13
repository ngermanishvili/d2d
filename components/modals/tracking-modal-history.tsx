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

interface TrackingModalProps {
  statusHistory: ShipmentStatusHistory[] | null;
}

export const TrackingModalForHistory: React.FC<TrackingModalProps> = ({
  statusHistory,
}) => {
  return (
    <>
      {statusHistory && statusHistory.length > 0 && (
        <div>
          <Divider />
          <Title level={5}>ადევნე თვალი შეკვეთას</Title>
          <Steps direction="horizontal" current={statusHistory.length - 1}>
            {statusHistory
              .map((status, index) => (
                <Step
                  key={status.id}
                  title={status.status}
                  description={moment(status.timestamp).format(
                    "MMMM Do YYYY, "
                  )}
                  status={
                    index === statusHistory.length - 1 ? "process" : "finish"
                  }
                />
              ))
              .reverse()}
          </Steps>
        </div>
      )}
    </>
  );
};
