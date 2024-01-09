
import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: {} }
) {
    try {
        const body = await req.json()

        const { name, lastName, phoneNumber, address, city, brittle, price, markedByCourier, } = body;

        const userId = await currentUserId();


        if (!userId) {
            return new NextResponse("User ID is required", { status: 400 })
        }

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
            data: { name, lastName, phoneNumber, address, city, brittle, price, markedByCourier, userId, },
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
        const userId = await currentUserId();

        if (!userId) {
            return new NextResponse("User ID is required", { status: 400 })
        }

        const shipments = await db.shipment.findMany({
            where: { userId },
        });

        return NextResponse.json(shipments)
    } catch (error) {
        console.log('[SHIPMENT_GET]', error)
        return new NextResponse("Internal error BROJ", { status: 500 })
    }
}
