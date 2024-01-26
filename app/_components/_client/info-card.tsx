import React from "react";

import { Typography, Card, CardBody } from "@material-tailwind/react";

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}


export function InfoCard({ title, children }: InfoCardProps) {
    return (
        <Card placeholder='' color="transparent" shadow={false}>
            <CardBody placeholder='' className="grid px-0">
                <Typography placeholder='' variant="h2" color="blue-gray" className="mb-2">
                    {title}
                </Typography>
                <Typography placeholder='' className=" font-normal">{children}</Typography>
            </CardBody>
        </Card>
    );
}

export default InfoCard;