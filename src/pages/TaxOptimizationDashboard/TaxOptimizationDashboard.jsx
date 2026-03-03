import React, { useState, useEffect } from 'react';
import {
    Layout,
    Card,
    Row,
    Col,
    Tabs,
    Statistic,
    Typography,
    Button,
    Segmented,
    Tag,
    Space,
    List,
    Modal,
    Divider,
    Progress
} from 'antd';
import {
    SafetyCertificateOutlined,
    WarningOutlined,
    LineChartOutlined,
    RocketOutlined,
    SolutionOutlined,
    LockOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    InfoCircleOutlined,
    CarOutlined,
    HomeOutlined,
    MedicineBoxOutlined,
    StockOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TaxOptimizationDashboard = () => {
    const [currentScenario, setCurrentScenario] = useState('Vehicle');
    const [dashboardData, setDashboardData] = useState({
        healthScore: 78,
        leakage: 12000,
        regime: 'New Regime',
        liability: 37000,
        leakageReason: 'Analysis pending for selected scenario.',
        impact: 'Select a scenario to see impact.'
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: null });

    // Scenario Logic Effects
    useEffect(() => {
        switch (currentScenario) {
            case 'Vehicle':
                setDashboardData({
                    healthScore: 75,
                    leakage: 15400,
                    regime: 'New Regime',
                    liability: 42000,
                    leakageReason: 'Missed Section 80EEB interest deduction for Electric Vehicle.',
                    impact: 'Potential saving of ₹2,500 on interest payments.'
                });
                break;
            case 'Land':
                setDashboardData({
                    healthScore: 65,
                    leakage: 45000,
                    regime: 'Old Regime',
                    liability: 125000,
                    leakageReason: 'Unoptimized Capital Gains from property sale.',
                    impact: 'Reinvesting ₹10,00,000 in Section 54EC bonds can save ₹45,000 in tax.'
                });
                break;
            case 'Health Insurance':
                setDashboardData({
                    healthScore: 88,
                    leakage: 5000,
                    regime: 'New Regime',
                    liability: 32000,
                    leakageReason: 'Incomplete Section 80D deduction for dependent parents.',
                    impact: 'Adding parents premium saves an additional ₹5,000.'
                });
                break;
            case 'Stocks':
                setDashboardData({
                    healthScore: 82,
                    leakage: 8200,
                    regime: 'New Regime',
                    liability: 45000,
                    leakageReason: 'Tax Loss Harvesting not fully utilized.',
                    impact: 'Offsetting losses against gains can reduce liability by ₹8,200.'
                });
                break;
            default:
                break;
        }
    }, [currentScenario]);

    const showModal = (title, content) => {
        setModalContent({ title, content });
        setModalVisible(true);
    };

    const cardStyle = {
        borderRadius: '16px',
        border: 'none',
        boxShadow: '0 4px 20px rgba(8, 76, 141, 0.05)',
        background: '#EEF3FA',
        height: '100%'
    };

    const summaryCardStyle = {
        ...cardStyle,
        background: '#fff',
        textAlign: 'center'
    };

    const featureCards = [
        {
            title: 'Regime Comparison',
            icon: <LineChartOutlined style={{ color: '#084C8D' }} />,
            content: (
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="secondary">Old Regime</Text>
                        <Text strong>₹{dashboardData.liability + 15000}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="secondary">New Regime</Text>
                        <Text strong style={{ color: '#5B92E5' }}>₹{dashboardData.liability}</Text>
                    </div>
                    <Divider style={{ margin: '12px 0' }} />
                    <div style={{ textAlign: 'center' }}>
                        <Tag color="blue" style={{ borderRadius: '12px', padding: '4px 12px' }}>
                            Recommendation: {dashboardData.regime}
                        </Tag>
                    </div>
                </Space>
            ),
            details: (
                <div>
                    <Title level={4}>Why {dashboardData.regime}?</Title>
                    <Paragraph>
                        Based on your current salary structure and the <strong>{currentScenario}</strong> scenario,
                        the {dashboardData.regime} offers the lowest tax liability because it captures the flat tax benefits
                        efficiently without requiring large locked-in investments.
                    </Paragraph>
                    <Title level={5}>Scenario Impact</Title>
                    <Paragraph>
                        {dashboardData.impact}
                    </Paragraph>
                </div>
            )
        },
        {
            title: 'Tax Leakage Detection',
            icon: <WarningOutlined style={{ color: '#FAAD14' }} />,
            content: (
                <div style={{ textAlign: 'center' }}>
                    <Statistic
                        value={dashboardData.leakage}
                        prefix="₹"
                        valueStyle={{ color: '#faad14', fontWeight: 'bold' }}
                    />
                    <Text type="secondary">3 Missed Opportunities</Text>
                </div>
            ),
            details: (
                <div>
                    <Title level={4}>Leakage Analysis</Title>
                    <List
                        dataSource={[
                            { title: 'Section 80C', value: '₹5,000 remaining' },
                            { title: dashboardData.leakageReason?.split('.')[0] || 'Missed Opportunity', value: dashboardData.leakage > 10000 ? '₹10,000+' : '₹5,000' },
                            { title: 'Standard Deduction', value: 'Already applied' }
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <Text>{item.title}</Text>
                                <Text strong>{item.value}</Text>
                            </List.Item>
                        )}
                    />
                </div>
            )
        },
        {
            title: 'Tax Health Score',
            icon: <SafetyCertificateOutlined style={{ color: '#52C41A' }} />,
            content: (
                <div style={{ textAlign: 'center' }}>
                    <Progress
                        type="circle"
                        percent={dashboardData.healthScore}
                        size={80}
                        strokeColor={{
                            '0%': '#ff4d4f',
                            '100%': '#52c41a',
                        }}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <Tag color={dashboardData.healthScore > 80 ? 'success' : 'warning'}>
                            {dashboardData.healthScore > 80 ? 'Good' : 'Needs Improvement'}
                        </Tag>
                    </div>
                </div>
            ),
            details: (
                <div>
                    <Title level={4}>Score Breakdown</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                            <Text>Regime Selection</Text>
                            <Progress percent={100} size="small" />
                        </div>
                        <div>
                            <Text>Deductions Utilization</Text>
                            <Progress percent={dashboardData.healthScore - 10} size="small" status="active" />
                        </div>
                        <div>
                            <Text>Salary Structure Efficiency</Text>
                            <Progress percent={70} size="small" />
                        </div>
                    </Space>
                </div>
            )
        },
        {
            title: 'Actionable Recommendations',
            icon: <RocketOutlined style={{ color: '#1890FF' }} />,
            content: (
                <List
                    size="small"
                    dataSource={[
                        'Invest ₹1.5L in 80C',
                        'Get Health Policy'
                    ]}
                    renderItem={item => <List.Item style={{ border: 'none', padding: '4px 0' }}><Text circle>•</Text> {item}</List.Item>}
                />
            ),
            details: (
                <div>
                    <Title level={4}>Personalized Strategy</Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            { title: '80D Health Insurance', saving: '₹5,000', priority: 'High' },
                            { title: 'NPS Tier 1', saving: '₹15,000', priority: 'Medium' }
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={`Save up to ${item.saving}`}
                                />
                                <Tag color={item.priority === 'High' ? 'red' : 'blue'}>{item.priority}</Tag>
                            </List.Item>
                        )}
                    />
                </div>
            )
        },
        {
            title: 'Salary Structure Analysis',
            icon: <SolutionOutlined style={{ color: '#084C8D' }} />,
            content: (
                <Space direction="vertical" size={2} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text size="small">Basic</Text>
                        <Text strong>50%</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text size="small">HRA</Text>
                        <Text strong>20%</Text>
                    </div>
                    <Progress percent={70} showInfo={false} size={[300, 8]} />
                </Space>
            ),
            details: (
                <div>
                    <Title level={4}>Optimization Insights</Title>
                    <Paragraph>
                        Current Structure: <strong>70% Taxable</strong>
                    </Paragraph>
                    <Paragraph>
                        Insight: Increasing the component of Food Coupons or Internet Reimbursement could reduce the taxable salary by ₹40,000 per annum.
                    </Paragraph>
                </div>
            )
        },
        {
            title: 'Secure & Private',
            icon: <LockOutlined style={{ color: '#5B92E5' }} />,
            content: (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        256-bit AES Encryption Enabled. Your data never leaves your device prematurely.
                    </Text>
                </div>
            ),
            details: (
                <div style={{ textAlign: 'center' }}>
                    <LockOutlined style={{ fontSize: '48px', color: '#5B92E5', marginBottom: '16px' }} />
                    <Title level={4}>Data Security</Title>
                    <Paragraph>
                        We use bank-grade encryption to ensure your financial data is safe. Drain Zero doesn't share your data with third-party marketers.
                    </Paragraph>
                </div>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#DCE6F5', padding: '24px' }}>
            <Content style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                {/* Header Section */}
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <Title level={2} style={{ color: '#084C8D', margin: 0 }}>Tax Optimization Dashboard</Title>
                        <Text type="secondary">Strategic Analysis & Savings Planner</Text>
                    </div>
                    <Tag color="geekblue" style={{ borderRadius: '4px', fontSize: '14px', padding: '4px 12px' }}>
                        FY 2025-26
                    </Tag>
                </div>

                {/* Scenario Selector */}
                <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                    <Text strong style={{ display: 'block', marginBottom: '12px', color: '#084C8D' }}>Select Analysis Scenario:</Text>
                    <Segmented
                        size="large"
                        value={currentScenario}
                        onChange={setCurrentScenario}
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

                {/* Summary Cards */}
                <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={summaryCardStyle}>
                            <Statistic title="Tax Health Score" value={dashboardData.healthScore} suffix="/ 100" />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={summaryCardStyle}>
                            <Statistic title="Tax Leakage" value={dashboardData.leakage} prefix="₹" valueStyle={{ color: '#cf1322' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={summaryCardStyle}>
                            <Statistic title="Recommended" value={dashboardData.regime} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={summaryCardStyle}>
                            <Statistic title="Est. Liability" value={dashboardData.liability} prefix="₹" />
                        </Card>
                    </Col>
                </Row>

                {/* Features Grid */}
                <Row gutter={[24, 24]}>
                    {featureCards.map((feature, index) => (
                        <Col xs={24} md={12} lg={8} key={index}>
                            <Card
                                style={cardStyle}
                                title={
                                    <Space>
                                        {feature.icon}
                                        <Text strong style={{ color: '#084C8D' }}>{feature.title}</Text>
                                    </Space>
                                }
                                extra={
                                    feature.title !== 'Secure & Private' ? (
                                        <Button
                                            type="link"
                                            onClick={() => showModal(feature.title, feature.details)}
                                            style={{ padding: 0, color: '#5B92E5' }}
                                        >
                                            View Details
                                        </Button>
                                    ) : null
                                }
                            >
                                {feature.content}
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Detail Modal */}
                <Modal
                    title={modalContent.title}
                    open={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    footer={[
                        <Button key="close" type="primary" onClick={() => setModalVisible(false)} style={{ background: '#084C8D', borderRadius: '8px' }}>
                            Got it
                        </Button>
                    ]}
                    centered
                    styles={{
                        body: { padding: '24px' },
                        mask: { backdropFilter: 'blur(4px)' }
                    }}
                >
                    {modalContent.content}
                </Modal>

                {/* Footer Note */}
                <div style={{ marginTop: '48px', textAlign: 'center' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        Disclaimer: These calculations are estimates based on the provided scenarios and current tax laws. Please consult a tax professional for precise advice.
                    </Text>
                </div>
            </Content>
        </Layout>
    );
};

export default TaxOptimizationDashboard;
