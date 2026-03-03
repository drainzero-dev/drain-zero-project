import React from 'react';
import { Segmented, Typography } from 'antd';
import {
    CarOutlined,
    HomeOutlined,
    MedicineBoxOutlined,
    StockOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const ScenarioTabs = ({ currentScenario, onScenarioChange }) => {
    return (
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <Text strong style={{ display: 'block', marginBottom: '12px', color: '#084C8D' }}>
                Select Analysis Scenario:
            </Text>
            <Segmented
                size="large"
                value={currentScenario}
                onChange={onScenarioChange}
                options={[
                    { label: 'Vehicle', value: 'Vehicle', icon: <CarOutlined /> },
                    { label: 'Land', value: 'Land', icon: <HomeOutlined /> },
                    { label: 'Health', value: 'Health Insurance', icon: <MedicineBoxOutlined /> },
                    { label: 'Stocks', value: 'Stocks', icon: <StockOutlined /> },
                ]}
                style={{
                    background: '#EEF3FA',
                    padding: '4px',
                    borderRadius: '12px'
                }}
            />
        </div>
    );
};

export default ScenarioTabs;
