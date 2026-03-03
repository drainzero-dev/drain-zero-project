import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';

const SummaryCards = ({ data }) => {
    const summaryCardStyle = {
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(8, 76, 141, 0.05)',
        background: '#EEF3FA',
        textAlign: 'center',
        height: '100%'
    };

    return (
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            <Col xs={24} sm={12} lg={6}>
                <Card style={summaryCardStyle}>
                    <Statistic title="Tax Health Score" value={data.healthScore} suffix="/ 100" />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={summaryCardStyle}>
                    <Statistic title="Tax Leakage" value={data.leakage} prefix="₹" valueStyle={{ color: '#cf1322' }} />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={summaryCardStyle}>
                    <Statistic title="Recommended" value={data.regime} />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card style={summaryCardStyle}>
                    <Statistic title="Est. Liability" value={data.liability} prefix="₹" />
                </Card>
            </Col>
        </Row>
    );
};

export default SummaryCards;
