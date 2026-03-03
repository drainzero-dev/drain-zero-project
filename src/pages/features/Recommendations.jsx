import React from 'react';
import { Layout, Typography, Card, Row, Col, Space, Button, Badge, Tag, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, RocketOutlined, CheckCircleOutlined, SwapOutlined, CarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, subcategory, ownership, formData } = location.state || {};

    const recommendations = [];

    // Recommendation 1: Regime Switch
    const currentRegime = formData?.regimePreference || 'Auto Suggest';
    if (currentRegime !== 'Auto Suggest') {
        recommendations.push({
            id: 1,
            title: 'Enable Auto-Regime Selector',
            description: 'The engine will automatically pick the cheaper regime based on your latest inputs.',
            icon: <SwapOutlined />,
            iconColor: '#5B92E5',
            savings: '₹12,000+',
            tag: 'Regime'
        });
    }

    // Recommendation 2: Vehicle Depreciation
    if (category === 'Vehicle' && formData?.usageType !== 'Business') {
        recommendations.push({
            id: 2,
            title: 'Conver to Business Asset',
            description: `If you use your ${subcategory} for official work, claiming it as a business asset allows for 15% depreciation shield.`,
            icon: <CarOutlined />,
            iconColor: '#10B981',
            savings: '₹35,000+',
            tag: 'Optimization'
        });
    }

    // Recommendation 3: Second-Hand Resale (Specific)
    if (category === 'Vehicle' && ownership === 'Second-hand') {
        recommendations.push({
            id: 3,
            title: 'Plan Resale Timing',
            description: `Second-hand ${subcategory} values drop faster. Plan to resell after 3 years for maximum market efficiency.`,
            icon: <RocketOutlined />,
            iconColor: '#F59E0B',
            savings: '₹45,000+',
            tag: 'Resale'
        });
    }

    // Recommendation 4: Reimbursements
    if (!formData?.fuelReimbursement) {
        recommendations.push({
            id: 4,
            title: 'Claim Fuel & Maintenance',
            description: `Submit actual bills to claim tax-free reimbursements for your ${subcategory}.`,
            icon: <CheckCircleOutlined />,
            iconColor: '#8B5CF6',
            savings: '₹8,000+',
            tag: 'Salary'
        });
    }

    const recCardStyle = {
        borderRadius: '24px',
        border: 'none',
        boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
        background: '#FFFFFF',
        height: '100%',
        transition: 'transform 0.3s ease',
        cursor: 'default'
    };

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
                        Actionable Recommendations
                    </Title>
                    <Paragraph style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
                        Step-by-step suggestions to improve your tax efficiency and financial health.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        {recommendations.map((rec) => (
                            <Col xs={24} md={12} key={rec.id}>
                                <Badge.Ribbon text={rec.tag} color={rec.iconColor} style={{ padding: '0 12px', borderRadius: '4px', top: '20px', right: '-10px' }}>
                                    <Card style={recCardStyle} bodyStyle={{ padding: '40px' }}>
                                        <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: `${rec.iconColor}15`,
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: rec.iconColor,
                                                fontSize: '24px'
                                            }}>
                                                {rec.icon}
                                            </div>
                                            <div>
                                                <Title level={4} style={{ color: '#08457E', margin: '0 0 12px 0', fontWeight: 700 }}>{rec.title}</Title>
                                                <Paragraph style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6 }}>{rec.description}</Paragraph>
                                            </div>
                                            <div style={{ padding: '16px 20px', background: '#F9FAFB', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text type="secondary" style={{ fontSize: '13px', fontWeight: 600 }}>POTENTIAL SAVINGS</Text>
                                                <Text strong style={{ color: '#10B981', fontSize: '18px' }}>{rec.savings}</Text>
                                            </div>
                                        </Space>
                                    </Card>
                                </Badge.Ribbon>
                            </Col>
                        ))}

                        {recommendations.length === 0 && (
                            <Col span={24} style={{ textAlign: 'center', padding: '100px 0' }}>
                                <Paragraph style={{ fontSize: '18px', color: '#6B7280' }}>Your profile is highly optimized. No additional recommendations available.</Paragraph>
                            </Col>
                        )}
                    </Row>

                    <div style={{ marginTop: '80px', textAlign: 'center' }}>
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '24px', border: '1px dashed #5B92E5', display: 'inline-block', maxWidth: '600px' }}>
                            <Title level={4} style={{ color: '#08457E', marginBottom: '12px' }}>Expert Review Available</Title>
                            <Paragraph style={{ color: '#4B5563' }}>Get these recommendations vetted by a chartered accountant for personalized advice. Coming soon.</Paragraph>
                        </div>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Recommendations;
