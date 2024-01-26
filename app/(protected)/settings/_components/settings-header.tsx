"use client"
import React from 'react';
import { Badge, Card, Space } from 'antd';
import { currentUser } from '@/lib/auth';

export const CabinetHeading: React.FC = () => (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Badge.Ribbon text="აქტიური" color="green">
            <Card title="თქვენი სტატუსი" size="small">
                გამარჯობა, {currentUser?.name}
            </Card>
        </Badge.Ribbon>
    </Space>
);

