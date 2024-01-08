import { NextResponse } from "next/server"
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    try {
        const body = await req.json()

        const { name, lastName, phoneNumber, address, city, brittle, price, markedByCourier } = body;



        if (!phoneNumber) {
            return new NextResponse("Phone number is required", { status: 400 })
        }
        if (!address) {
            return new NextResponse("Address is required", { status: 400 })
        }

        if (!city) {
            return new NextResponse("City is required", { status: 400 })
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 })
        }


        if (!name) {
            return new NextResponse("Label is required", { status: 400 })
        }

        if (!lastName) {
            return new NextResponse("Image URL is required", { status: 400 })
        }


        const shipment = await db.shipment.create({
            data: {
                name,
                lastName,
                phoneNumber,
                address,
                city,
                brittle,
                price,
                markedByCourier,


            }
        });

        return NextResponse.json(shipment)

    } catch (error) {
        console.log('[SHIPMENT_POST]', error)
        return new NextResponse("Internal error BROJ", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: {} }
) {

    try {

        const shipment = await db.shipment.findMany({
        });

        return NextResponse.json(shipment)

    } catch (error) {
        console.log('[SHIPMENT_GET]', error)
        return new NextResponse("Internal error BROJ", { status: 500 })
    }
}