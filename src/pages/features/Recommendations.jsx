import React from 'react';
import { Layout, Typography, Card, Row, Col, Space, Button, Badge, Tag, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, RocketOutlined, CheckCircleOutlined, SwapOutlined, CarOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import TaxAssistantChatbot from '../../components/TaxAssistantChatbot';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <Title level={2}>Actionable Recommendations</Title>
                <div style={{ padding: '60px', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <p>Recommendations are generated based on your profile. Please provide your data first.</p>
                    <Button type="primary" onClick={() => navigate('/category-selection')}>Generate Recommendations</Button>
                </div>
            </div>
        );
    }

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

    // Recommendation: NPS Optimization
    const currentNPS = formData?.deductionNPS || 0;
    if (currentNPS < 50000) {
        recommendations.push({
            id: 7,
            title: 'Maximize NPS (80CCD 1B)',
            description: 'Invest an additional ₹50,000 in Tier-1 NPS to get exclusive deduction beyond the ₹1.5L Sec 80C limit.',
            icon: <RocketOutlined />,
            iconColor: '#8B5CF6',
            savings: '₹15,600',
            tag: 'Retirement'
        });
    }

    // Recommendation: Stock Gain Harvesting
    if (category === 'Stocks' || category === 'Investments') {
        recommendations.push({
            id: 8,
            title: 'Harvest ₹1.25L Tax-Free Gain',
            description: 'Equity LTCG is tax-free up to ₹1.25 Lakh. Consider selling and reinvesting to reset your purchase price tax-efficiently.',
            icon: <SwapOutlined />,
            iconColor: '#10B981',
            savings: '₹15,625',
            tag: 'LTCG Rule'
        });

        if (formData.hasCapitalLoss === 'yes') {
             recommendations.push({
                id: 9,
                title: 'Offset Capital Gains',
                description: 'Use your previous losses to offset current year gains. Ensure you file ITR before deadline to carry forward losses.',
                icon: <CheckCircleOutlined />,
                iconColor: '#F59E0B',
                savings: 'Variable',
                tag: 'Loss Offset'
            });
        }
    }

    // Recommendation 2: Vehicle Depreciation & EV
    if (category === 'Vehicle') {
        if (formData.usageType !== 'Business' && formData.employmentType === 'Self-Employed') {
            recommendations.push({
                id: 2,
                title: 'Convert to Business Asset',
                description: `Claiming your ${subcategory} as a business asset allows for 15% depreciation shield for cars (30% for bikes).`,
                icon: <CarOutlined />,
                iconColor: '#10B981',
                savings: '₹35,000+',
                tag: 'Optimization'
            });
        }
        
        if (formData.fuelType === 'Electric' && !formData.loanInterestPaid) {
            recommendations.push({
                id: 10,
                title: 'Leverage 80EEB EV Loan',
                description: 'EV loans offer ₹1.5L interest deduction. Even if you have cash, a small loan can shield higher income from tax.',
                icon: <RocketOutlined />,
                iconColor: '#5B92E5',
                savings: '₹46,800',
                tag: 'EV Benefit'
            });
        }
    }

    // Recommendation 5: Health Insurance Optimization
    if (category === 'Health Insurance' || formData.premiumAmount > 0) {
        const isSenior = formData?.hasSeniorCitizen === 'yes' || formData?.coverageType === 'Senior Parents';
        const limit80D = isSenior ? 50000 : 25000;
        const premium = formData?.premiumAmount || 0;

        if (premium < limit80D) {
            recommendations.push({
                id: 5,
                title: 'Optimize Health Cover',
                description: `Increase your coverage or add parents to utilize the full Sec 80D limit of ₹${limit80D.toLocaleString()}.`,
                icon: <RocketOutlined />,
                iconColor: '#10B981',
                savings: '₹7,500+',
                tag: 'Protection'
            });
        }

        recommendations.push({
            id: 6,
            title: 'Claim Preventive Health Checkup',
            description: 'Claim up to ₹5,000/year for health checkups. This is within the 80D limit and often missed by taxpayers.',
            icon: <CheckCircleOutlined />,
            iconColor: '#5B92E5',
            savings: '₹1,560',
            tag: 'Health'
        });
    }

    // Recommendation 11: Property Optimization
    if (category === 'Land' || category === 'Property') {
        if (formData.propertyOwnershipType === 'Self-occupied' && !formData.loanInterestPaid) {
            recommendations.push({
                id: 11,
                title: 'Home Loan Interest Shield',
                description: 'Self-occupied property interest up to ₹2 Lakh is deductible. Consider taking a loan for renovations if needed.',
                icon: <SwapOutlined />,
                iconColor: '#8B5CF6',
                savings: '₹62,400',
                tag: 'Sec 24b'
            });
        }
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

                    <div style={{ marginTop: '40px' }}>
                        <TaxAssistantChatbot />
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Recommendations;
