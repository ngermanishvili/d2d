import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { shipmentId: string } }
) {
    try {
        const { shipmentId } = params;

        if (!shipmentId) {
            return new NextResponse('shipmentId is required', { status: 400 });
        }

        const statusHistory = await db.shipmentStatusHistory.findMany({
            where: {
                shipmentId: shipmentId,
            },
        });

        return NextResponse.json(statusHistory);
    } catch (error) {
        console.log('[STATUSHISTORY_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}




