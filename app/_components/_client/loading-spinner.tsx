import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center h-screen">
        <Spin />
    </div>
);

export default LoadingSpinner;
