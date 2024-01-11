"use client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { ShipmentColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/date-table"
import { ApiList } from "@/components/ui/api-list"

interface ShipmentClientProps {
    data: ShipmentColumn[];

}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

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
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="api calls for shipments" />
            <Separator />
            <ApiList entityName="shipments" entityIdName="shipmentId" />
        </>

    )
}