import React from 'react';
import { Layout, Typography, Card, Space, Button, Statistic, Progress, Row, Col, List, Tag, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, SafetyCertificateFilled, CheckCircleFilled, WarningOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TaxHealth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, subcategory, formData } = location.state || {};

    // Logic for Score calculation (Simplified)
    let score = 100;
    let factors = [];

    // Factor 1: 80C Usage
    const d80C = formData?.deduction80C || 0;
    if (d80C < 150000) {
        score -= 15;
        factors.push({ status: 'warning', title: '80C Utilization', description: 'Underutilized investment limits (₹1.5L cap).' });
    } else {
        factors.push({ status: 'success', title: '80C Utilization', description: 'Maxed out section 80C deductions.' });
    }

    // Factor 2: 80D Usage
    const d80D = formData?.deduction80D || 0;
    if (d80D < 15000) {
        score -= 10;
        factors.push({ status: 'warning', title: '80D Health Cover', description: 'Limited health insurance deduction claimed.' });
    } else {
        factors.push({ status: 'success', title: '80D Health Cover', description: 'Efficient insurance deductions.' });
    }

    // Factor 3: Vehicle Optimization (if applicable)
    if (category === 'Vehicle') {
        if (!formData?.fuelReimbursement || !formData?.maintenanceReimbursement) {
            score -= 15;
            factors.push({ status: 'warning', title: 'Vehicle Reimbursements', description: 'Missing fuel/maintenance reimbursements.' });
        } else {
            factors.push({ status: 'success', title: 'Vehicle Reimbursements', description: 'Appropriate expense claims detected.' });
        }

        if (formData?.usageType === 'Business' && !formData?.interestRate) {
            score -= 10;
            factors.push({ status: 'warning', title: 'Asset Financing', description: 'No loan interest shield despite business usage.' });
        }
    }

    // Regime Logic (simplified)
    const regime = formData?.regimePreference || 'Auto Suggest';
    if (regime === 'Auto Suggest') {
        factors.push({ status: 'success', title: 'Regime Efficiency', description: 'Engine-led regime selection active.' });
    } else {
        score -= 5;
        factors.push({ status: 'warning', title: 'Regime Logic', description: 'Manual selection may not be the cheapest option.' });
    }

    const scoreFinal = Math.max(20, score);
    let level = 'Good';
    let statusColor = '#10B981';
    if (scoreFinal < 50) { level = 'Poor'; statusColor = '#EF4444'; }
    else if (scoreFinal < 80) { level = 'Moderate'; statusColor = '#F59E0B'; }

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
                        Tax Health Score
                    </Title>
                    <Paragraph style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
                        Your overall fiscal efficiency score across regime, investments, and assets.
                    </Paragraph>

                    <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                        <Col xs={24} md={12}>
                            <Card
                                style={{ borderRadius: '24px', textAlign: 'center', height: '100%', padding: '40px 20px' }}
                                bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <Progress
                                    type="dashboard"
                                    percent={scoreFinal}
                                    strokeColor={statusColor}
                                    strokeWidth={10}
                                    width={220}
                                    gapDegree={40}
                                    format={(percent) => (
                                        <div style={{ padding: '0 20px' }}>
                                            <div style={{ fontSize: '48px', fontWeight: 800, color: '#08457E' }}>{percent}</div>
                                            <div style={{ fontSize: '16px', color: '#6B7280', marginTop: '-10px' }}>out of 100</div>
                                        </div>
                                    )}
                                />
                                <div style={{ marginTop: '24px' }}>
                                    <Tag color={statusColor === '#10B981' ? 'green' : statusColor === '#F59E0B' ? 'orange' : 'red'} style={{ padding: '4px 20px', fontSize: '16px', fontWeight: 700, borderRadius: '50px' }}>
                                        {level} Optimization
                                    </Tag>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} md={12}>
                            <Card
                                style={{ borderRadius: '24px', height: '100%', background: '#08457E', color: '#FFFFFF' }}
                                title={<span style={{ color: '#FFFFFF' }}>Optimization Breakdown</span>}
                            >
                                <List
                                    dataSource={factors}
                                    renderItem={(item) => (
                                        <List.Item style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 0' }}>
                                            <List.Item.Meta
                                                avatar={item.status === 'success' ? <CheckCircleFilled style={{ color: '#10B981', fontSize: '20px' }} /> : <WarningOutlined style={{ color: '#F59E0B', fontSize: '20px' }} />}
                                                title={<Text style={{ color: '#FFFFFF', fontWeight: 600 }}>{item.title}</Text>}
                                                description={<Text style={{ color: '#CCF1FF', fontSize: '13px' }}>{item.description}</Text>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Card
                        style={{ borderRadius: '24px', border: 'none', padding: '24px', backgroundColor: '#FFFFFF' }}
                        title={<Space><SafetyCertificateFilled style={{ color: '#5B92E5' }} /> <span>Improvement Strategy</span></Space>}
                    >
                        <Paragraph style={{ color: '#4B5563', fontSize: '15px', lineHeight: 2 }}>
                            To reach a <strong>Perfect Score (100)</strong>, you should:
                            <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                                <li>Fully utilize Section 80C through voluntary provident funds (VPF) or ELSS mutual funds.</li>
                                <li>Claim the additional ₹50,000 deduction under Section 80CCD(1B) for NPS.</li>
                                {category === 'Vehicle' && (
                                    <li>Restructure your {subcategory} ownership to business usage if eligible, claiming 15% annual depreciation.</li>
                                )}
                                <li>Ensure medical premium receipts cover both health checkups and primary insurance.</li>
                            </ul>
                        </Paragraph>
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default TaxHealth;
