import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        handlePost(req, res);
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const excelFile = req.body.file;
        if (!excelFile) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Insert data into the database using Prisma Client
        await prisma.excelData.create({
            data: {
                rawData: JSON.stringify(data),
            },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
