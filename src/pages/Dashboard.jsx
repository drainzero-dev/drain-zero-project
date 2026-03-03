import React from 'react';
import {
    Layout,
    Typography,
    Row,
    Col,
    Space,
    Button,
    ConfigProvider,
    Tag,
    message,
    Tooltip
} from 'antd';
import {
    ArrowRightOutlined,
    SearchOutlined,
    SwapOutlined,
    LineChartOutlined,
    CheckCircleOutlined,
    WalletOutlined,
    DownloadOutlined,
    LogoutOutlined,
    SyncOutlined,
    LockFilled
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get analysis parameters from location state
    const { category, subcategory, ownership, formData } = location.state || {
        category: 'Vehicle',
        subcategory: 'Car',
        ownership: 'First-hand',
        formData: {}
    };

    const featureCards = [
        {
            id: 'regime',
            title: 'Regime Comparison',
            description: 'Compare Old vs New tax regime and show the best option.',
            icon: <SwapOutlined />,
            iconColor: '#5B92E5',
            path: '/feature/regime-comparison'
        },
        {
            id: 'leakage',
            title: 'Tax Leakage Detection',
            description: 'Identify missed deductions and hidden tax-saving opportunities.',
            icon: <SearchOutlined />,
            iconColor: '#F59E0B',
            path: '/feature/tax-leakage'
        },
        {
            id: 'health',
            title: 'Tax Health Score',
            description: 'Show overall tax optimization score.',
            icon: <LineChartOutlined />,
            iconColor: '#10B981',
            path: '/feature/tax-health'
        },
        {
            id: 'recommendations',
            title: 'Actionable Recommendations',
            description: 'Provide clear steps to reduce tax.',
            icon: <CheckCircleOutlined />,
            iconColor: '#3B82F6',
            path: '/feature/recommendations'
        },
        {
            id: 'salary',
            title: 'Salary Structure Analysis',
            description: 'Analyze salary structure for better tax efficiency.',
            icon: <WalletOutlined />,
            iconColor: '#8B5CF6',
            path: '/feature/salary-analysis'
        }
    ];

    const handleCardClick = (path) => {
        // Navigate to the feature result page with complete state
        navigate(path, {
            state: {
                category,
                subcategory,
                ownership,
                formData
            }
        });
    };

    const handleLogout = () => {
        message.info("Logged out successfully");
        navigate('/');
    };

    const handleNewAnalysis = () => {
        navigate('/category-selection');
    };

    const handleDownloadReport = () => {
        message.loading("Generating your comprehensive tax report...", 2)
            .then(() => {
                message.success("Drain_Zero_Analysis_Report.pdf downloaded successfully!");
            });
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
                <Content style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <Title level={1} style={{ color: '#08457E', margin: 0, fontWeight: 800 }}>
                                Strategy Dashboard
                            </Title>
                            <Space size={12} style={{ marginTop: '8px' }}>
                                <Tag color="blue" style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '100px', fontWeight: 600 }}>
                                    {category}
                                </Tag>
                                <Tag color="cyan" style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '100px', fontWeight: 600 }}>
                                    {subcategory}
                                </Tag>
                                {category === 'Vehicle' && (
                                    <Tag color="purple" style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '100px', fontWeight: 600 }}>
                                        {ownership}
                                    </Tag>
                                )}
                            </Space>
                        </div>
                        <Space wrap>
                            <Button
                                type="primary"
                                icon={<SyncOutlined />}
                                onClick={handleNewAnalysis}
                                style={{ height: '48px', borderRadius: '12px' }}
                            >
                                New Analysis
                            </Button>
                            <Button
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                                style={{ height: '48px', borderRadius: '12px', color: '#EF4444', borderColor: '#FCA5A5' }}
                            >
                                Logout
                            </Button>
                        </Space>
                    </div>

                    {/* Feature Cards Grid */}
                    <div style={{ marginBottom: '60px' }}>
                        <Title level={4} style={{ color: '#08457E', marginBottom: '24px', opacity: 0.8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Detailed Analysis Features
                        </Title>
                        <Row gutter={[24, 24]}>
                            {featureCards.map((feat) => (
                                <Col xs={24} md={12} lg={8} key={feat.id}>
                                    <div
                                        onClick={() => handleCardClick(feat.path)}
                                        className="feature-card"
                                        style={{
                                            background: '#FFFFFF',
                                            borderRadius: '24px',
                                            padding: '40px',
                                            cursor: 'pointer',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                                            transition: 'all 0.3s ease',
                                            position: 'relative'
                                        }}
                                    >
                                        <div>
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                background: `${feat.iconColor}15`,
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: feat.iconColor,
                                                marginBottom: '28px',
                                                fontSize: '24px'
                                            }}>
                                                {feat.icon}
                                            </div>
                                            <Title level={4} style={{ color: '#08457E', margin: '0 0 16px 0', fontWeight: 700 }}>
                                                {feat.title}
                                            </Title>
                                            <Paragraph style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6 }}>
                                                {feat.description}
                                            </Paragraph>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                            <Tooltip title="View Detailed Analysis">
                                                <Button
                                                    type="text"
                                                    icon={<ArrowRightOutlined />}
                                                    style={{ color: '#5B92E5', fontSize: '20px' }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Action Section */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            borderRadius: '32px',
                            background: '#08457E',
                            padding: '60px 40px',
                            display: 'inline-block',
                            width: '100%',
                            boxShadow: '0 20px 40px rgba(8, 69, 126, 0.15)'
                        }}>
                            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                <Title level={2} style={{ color: '#FFFFFF', margin: 0, fontWeight: 700 }}>Ready to Optimize?</Title>
                                <Paragraph style={{ color: '#CCF1FF', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                                    Get the complete technical breakdown of your tax strategy, including regime comparison and leakage detection in one professional document.
                                </Paragraph>
                                <Button
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    size="large"
                                    onClick={handleDownloadReport}
                                    style={{
                                        height: '64px',
                                        padding: '0 64px',
                                        borderRadius: '50px',
                                        fontSize: '20px',
                                        background: '#5B92E5',
                                        border: 'none',
                                        fontWeight: 700,
                                        marginTop: '12px',
                                        boxShadow: '0 10px 20px rgba(91, 146, 229, 0.3)'
                                    }}
                                >
                                    Download Analysis Report
                                </Button>
                            </Space>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div style={{ marginTop: '80px', textAlign: 'center' }}>
                        <Space style={{ background: '#FFFFFF', padding: '16px 32px', borderRadius: '50px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <LockFilled style={{ color: '#10B981', fontSize: '20px' }} />
                            <Text style={{ fontWeight: 600, color: '#08457E', fontSize: '15px' }}>
                                Your data is secure and private. Analysis is visible only to you.
                            </Text>
                        </Space>
                    </div>

                    <style>
                        {`
                            .feature-card:hover {
                                transform: translateY(-10px);
                                box-shadow: 0 20px 40px rgba(8, 69, 126, 0.08) !important;
                                background: #F8FAFF !important;
                            }
                            @media (max-width: 768px) {
                                .feature-card { padding: 30px !important; }
                            }
                        `}
                    </style>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Dashboard;
