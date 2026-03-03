import React from 'react';
import { Layout, Typography, Card, Row, Col, Space, Button, List, Tag, Statistic, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, WarningOutlined, InfoCircleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TaxLeakage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, subcategory, ownership, formData } = location.state || {};

    // Logic: Identify potential missed deductions
    const missed80C = Math.max(0, 150000 - (formData?.deduction80C || 0));
    const missed80D = Math.max(0, 25000 - (formData?.deduction80D || 0));
    const slabRate = (formData?.annualSalary || 0) > 1500000 ? 0.30 : 0.20;

    let leakageItems = [];
    let totalLeakage = 0;

    if (missed80C > 0) {
        const potentialSave = missed80C * slabRate;
        leakageItems.push({
            title: 'Unused 80C Limit',
            description: `You have ₹${missed80C.toLocaleString()} left in your Section 80C limit (LIC, PPF, etc).`,
            potential: potentialSave,
            tag: 'Investment'
        });
        totalLeakage += potentialSave;
    }

    if (missed80D > 0) {
        const potentialSave = missed80D * slabRate;
        leakageItems.push({
            title: 'Health Insurance Gap',
            description: `You haven't fully utilized Section 80D for self or family.`,
            potential: potentialSave,
            tag: 'Insurance'
        });
        totalLeakage += potentialSave;
    }

    if (category === 'Vehicle') {
        if (!formData?.fuelReimbursement || formData.fuelReimbursement === 0) {
            const potentialSave = 40000 * slabRate; // Assume average fuel reimbursement potential
            leakageItems.push({
                title: 'Fuel Reimbursement Not Claimed',
                description: `Claiming fuel as a business reimbursement instead of salary can save tax.`,
                potential: potentialSave,
                tag: 'Reimbursement'
            });
            totalLeakage += potentialSave;
        }

        if (ownership === 'First-hand' && (!formData?.interestRate || formData.interestRate === 0)) {
            leakageItems.push({
                title: 'No Loan Interest Benefit',
                description: `For new vehicles, taking a loan can provide significant interest deductions in Old Regime.`,
                potential: 15000,
                tag: 'Loan'
            });
            totalLeakage += 15000;
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5B92E5',
                    borderRadius: 20,
                    fontFamily: "'Outfit', sans-serif",
                },
            }}
        >
            <Layout style={{ minHeight: '100vh', background: '#F2F3F4', padding: '40px 24px' }}>
                <Content style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/dashboard', { state: location.state })}
                        style={{ marginBottom: '24px', borderRadius: '12px', fontWeight: 600, color: '#08457E' }}
                    >
                        Back to Dashboard
                    </Button>

                    <Title level={2} style={{ color: '#08457E', fontWeight: 800 }}>
                        Tax Leakage Detection
                    </Title>
                    <Paragraph style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
                        Identifying efficiency gaps where you are paying more tax than legally necessary.
                    </Paragraph>

                    <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                        <Col span={24}>
                            <Card
                                style={{ borderRadius: '24px', background: '#EF444408', border: '1px solid #FCA5A5' }}
                                bodyStyle={{ padding: '40px' }}
                            >
                                <Row align="middle" gutter={24}>
                                    <Col xs={24} md={12}>
                                        <Space direction="vertical" size={12}>
                                            <Tag color="red" style={{ fontWeight: 700, borderRadius: '4px' }} icon={<WarningOutlined />}>HIGH LEAKAGE FOUND</Tag>
                                            <Title level={1} style={{ margin: 0, color: '#08457E', fontWeight: 800 }}>
                                                ₹{totalLeakage.toLocaleString()}
                                            </Title>
                                            <Text style={{ fontSize: '18px', color: '#4B5563' }}>Total Estimated Annual Tax Leakage</Text>
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                                        <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '20px', display: 'inline-block', minWidth: '240px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.05)' }}>
                                            <Statistic title={<span style={{ color: '#08457E' }}>Optimization Potential</span>} value={88} suffix="%" valueStyle={{ color: '#EF4444', fontWeight: 800 }} />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Card
                        title={<Space><InfoCircleFilled style={{ color: '#5B92E5' }} /> <span>Leakage Breakdown</span></Space>}
                        style={{ borderRadius: '24px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={leakageItems}
                            renderItem={(item) => (
                                <List.Item style={{ padding: '24px 0' }} extra={
                                    <Statistic
                                        value={item.potential}
                                        prefix="₹"
                                        valueStyle={{ fontSize: '18px', color: '#EF4444', fontWeight: 700 }}
                                        title={<span style={{ fontSize: '12px' }}>Potential Savings</span>}
                                    />
                                }>
                                    <List.Item.Meta
                                        title={<Space><Text strong style={{ fontSize: '18px', color: '#08457E' }}>{item.title}</Text><Tag color="orange" style={{ borderRadius: '4px' }}>{item.tag}</Tag></Space>}
                                        description={<Text style={{ fontSize: '15px', color: '#6B7280' }}>{item.description}</Text>}
                                    />
                                </List.Item>
                            )}
                        />

                        <div style={{ marginTop: '32px', textAlign: 'center' }}>
                            <Button
                                type="primary"
                                size="large"
                                style={{ borderRadius: '50px', height: '52px', padding: '0 40px', fontWeight: 700 }}
                                onClick={() => navigate('/feature/recommendations', { state: location.state })}
                            >
                                Get Fix Recommendations <ArrowLeftOutlined style={{ rotate: '180deg', marginLeft: '8px' }} />
                            </Button>
                        </div>
                    </Card>

                    <style>
                        {`
                            .ant-list-item-meta-title { margin-bottom: 8px !important; }
                        `}
                    </style>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default TaxLeakage;
