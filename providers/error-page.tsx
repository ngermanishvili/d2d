"use client"
import React from 'react';

import { Result } from 'antd';
import { Button } from '@/components/ui/button'
import Link from 'next/link';

const Error404Page: React.FC = () => (
    <Result
        status="404"
        title="404"
        subTitle="შეცდომა, მოთხოვნილი გვერდი არ არის ხელმისაწვდომი"
        extra={
            <Button>
                <Link href="/">უკან დაბრუნება</Link>
            </Button>
        }
    />
);

export default Error404Page;