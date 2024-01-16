"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { useParams, useRouter, } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { ShipmentColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/date-table"
import { ApiList } from "@/components/ui/api-list"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { DateRange } from "react-day-picker"

interface ShipmentClientProps {
    data: ShipmentColumn[];

}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);

    const handleDateRangeChange = (dateRange: DateRange) => {
        const filteredData = data.filter((shipment) => {
            const shipmentDate = new Date(shipment.createdAt);

            return (
                (!dateRange.from || shipmentDate >= dateRange.from) &&
                (!dateRange.to || shipmentDate <= dateRange.to)
            );
        });

        setFilteredData(filteredData);
    };


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Shipment (${data.length})`}
                    description="manage your shipments"
                />
                <Button onClick={() => router.push(`/shipments/new`)}>
                    <Plus className="mr-2 h-4 w-4 " />
                    Add New
                </Button>
            </div>
            <Separator />
            <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
            {filteredData.length > 0 ? (
                <>
                    <DataTable searchKey="name" columns={columns} data={filteredData} />

                    <Heading title="APIss" description="api calls for shipmensdts" />
                    <Separator />
                    <ApiList entityName="shipments" entityIdName="shipmentId" />
                </>
            ) : (
                <DataTable searchKey="name" columns={columns} data={filteredData} />
            )}
        </>

    )
}