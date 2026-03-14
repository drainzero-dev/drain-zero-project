import React from 'react';
import { Layout, Typography, Card, Row, Col, Space, Button, Table, Statistic, Tooltip, ConfigProvider } from 'antd';
import { ArrowLeftOutlined, SolutionOutlined, InfoCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import TaxAssistantChatbot from '../../components/TaxAssistantChatbot';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SalaryAnalysis = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <Title level={2}>Salary Structure Analysis</Title>
                <div style={{ padding: '60px', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <p>Salary optimization requires your current income breakdown. Please complete the form.</p>
                    <Button type="primary" onClick={() => navigate('/category-selection')}>Analyze Salary</Button>
                </div>
            </div>
        );
    }

    const { formData, category, subcategory } = location.state || {};

    const baseSalary = formData?.annualSalary || 1500000;
    const currentStructure = [
        { key: 1, component: 'Basic Pay', value: baseSalary * 0.5 },
        { key: 2, component: 'HRA', value: baseSalary * 0.2 },
        { key: 3, component: 'Special Allowance', value: baseSalary * 0.3 },
    ];

    const suggestedStructure = [
        { key: 1, component: 'Basic Pay', value: baseSalary * 0.4 },
        { key: 2, component: 'HRA (Optimized)', value: baseSalary * 0.25 },
        { key: 3, component: 'Vehicle Fuel/Maint', value: category === 'Vehicle' ? 120000 : 0 },
        { key: 4, component: 'Tax-free Perquisites', value: baseSalary * 0.20 },
    ];

    const columns = [
        { title: 'Component', dataIndex: 'component', key: 'component' },
        { title: 'Amount', dataIndex: 'value', key: 'value', render: (v) => `₹${v.toLocaleString()}` },
    ];

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
                <Content style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/dashboard', { state: location.state })}
                        style={{ marginBottom: '24px', borderRadius: '12px', fontWeight: 600, color: '#08457E' }}
                    >
                        Back to Dashboard
                    </Button>

                    <Title level={2} style={{ color: '#08457E', fontWeight: 800 }}>
                        Salary Structure Analysis
                    </Title>
                    <Paragraph style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
                        Comparing your current pay components with an optimized structure to maximize your take-home pay.
                    </Paragraph>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title={<Space><SolutionOutlined /> Current Salary Structure</Space>}
                                style={{ borderRadius: '24px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
                            >
                                <Table columns={columns} dataSource={currentStructure} pagination={false} style={{ borderRadius: '12px', overflow: 'hidden' }} />
                                <div style={{ marginTop: '24px', padding: '20px', background: '#F9FAFB', borderRadius: '16px', textAlign: 'center' }}>
                                    <Statistic title="Annual Take Home (Est)" value={baseSalary * 0.85} prefix="₹" precision={0} valueStyle={{ color: '#08457E', fontWeight: 700 }} />
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card
                                title={<Space><Button type="primary" size="small" shape="circle" icon={<CheckCircleFilled />} style={{ background: '#10B981', border: 'none' }} /> <span style={{ color: '#10B981', fontWeight: 700 }}>Optimized Structure</span></Space>}
                                style={{ borderRadius: '24px', border: '2px dashed #10B981', background: '#FFFFFF' }}
                            >
                                <Table columns={columns} dataSource={suggestedStructure} pagination={false} style={{ borderRadius: '12px', overflow: 'hidden' }} />
                                <div style={{ marginTop: '24px', padding: '20px', background: '#F0FDF4', borderRadius: '16px', textAlign: 'center' }}>
                                    <Statistic title="Optimized Annual Take Home" value={baseSalary * 0.92} prefix="₹" precision={0} valueStyle={{ color: '#10B981', fontWeight: 800 }} />
                                    <div style={{ color: '#059669', fontSize: '13px', marginTop: '8px' }}>+ ₹{Math.round(baseSalary * 0.07).toLocaleString()} Annual Savings</div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <div style={{ marginTop: '40px' }}>
                        <Card style={{ borderRadius: '24px', background: '#08457E', color: '#FFFFFF' }}>
                            <Title level={4} style={{ color: '#FFFFFF', marginBottom: '16px' }}>Optimization Insights</Title>
                            <Row gutter={[20, 20]}>
                                <Col xs={24} md={12}>
                                    <Space size={12} align="start" style={{ marginBottom: '16px' }}>
                                        <InfoCircleOutlined style={{ color: '#5B92E5', fontSize: '18px', marginTop: '4px' }} />
                                        <div>
                                            <Text strong style={{ color: '#FFFFFF', display: 'block' }}>Basic Pay Optimization</Text>
                                            <Text style={{ color: '#CCF1FF', fontSize: '13px' }}>Keeping basic pay at 40% reduces the taxable component for HRA and PF efficiently.</Text>
                                        </div>
                                    </Space>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Space size={12} align="start" style={{ marginBottom: '16px' }}>
                                        <InfoCircleOutlined style={{ color: '#5B92E5', fontSize: '18px', marginTop: '4px' }} />
                                        <div>
                                            <Text strong style={{ color: '#FFFFFF', display: 'block' }}>{subcategory} Reimbursements</Text>
                                            <Text style={{ color: '#CCF1FF', fontSize: '13px' }}>Claiming vehicle maintenance as a flex-benefit reduces taxable gross significantly.</Text>
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <Text type="secondary" style={{ fontSize: '13px' }}>Note: Suggested structure may require discussion with your Employer HR / Payroll team.</Text>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <TaxAssistantChatbot />
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default SalaryAnalysis;
