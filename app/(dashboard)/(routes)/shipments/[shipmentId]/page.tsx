import { db } from "@/lib/db";
import { ShipmentForm } from "./components/shipment-form";
import { ShipmentForm2 } from "./components/shipment-form2";
import { RoleGate } from "@/components/auth/role-gate";
import ErrorPage404 from "@/app/_components/_client/error-page";

const ShipmentPage = async ({ params }: { params: { shipmentId: string } }) => {
    const shipment = await db.shipment.findUnique({
        where: {
            id: params.shipmentId,
        },
    });

    return (
        <>

            <RoleGate allowedRole="ADMIN"  >
                <div className="flex-col ">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <ShipmentForm2 initialData={shipment} />
                    </div>
                </div>
            </RoleGate>
            <RoleGate allowedRole="USER"  >
                <div className="flex-col ">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <ShipmentForm2 initialData={shipment} />
                    </div>
                </div>
            </RoleGate>
        </>
    );
};

export default ShipmentPage;
