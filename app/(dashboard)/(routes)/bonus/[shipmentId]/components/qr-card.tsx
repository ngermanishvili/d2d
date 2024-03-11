"use client"
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import QRCodeGenerator from '@/components/ui/qr-code';


export const QrCodeComponent = () => {
    const params = useParams()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>დაასკანერე QR</CardTitle>
                    <CardDescription>ყველა შეკვეთას გააჩნია უნიკალური QR </CardDescription>
                </CardHeader>
                <CardContent>
                    <QRCodeGenerator text={`${window.location.origin}/categories/${params.shipmentId}`} />
                </CardContent>
            </Card>
        </>
    )
}

