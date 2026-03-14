import React from 'react';
import { ConfigProvider, Button, Typography, Row, Col, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    SwapOutlined,
    SearchOutlined,
    LineChartOutlined,
    CheckCircleOutlined,
    WalletOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const features = [
    {
        title: "Regime Comparison",
        description: "Compare Old vs New tax regime and show the best option.",
        icon: <SwapOutlined style={{ fontSize: 28 }} />
    },
    {
        title: "Tax Leakage Detection",
        description: "Identify missed deductions and hidden tax-saving opportunities.",
        icon: <SearchOutlined style={{ fontSize: 28 }} />
    },
    {
        title: "Tax Health Score",
        description: "Show overall tax optimization score.",
        icon: <LineChartOutlined style={{ fontSize: 28 }} />
    },
    {
        title: "Actionable Recommendations",
        description: "Provide clear steps to reduce tax.",
        icon: <CheckCircleOutlined style={{ fontSize: 28 }} />
    },
    {
        title: "Salary Structure Analysis",
        description: "Analyze salary structure for better tax efficiency.",
        icon: <WalletOutlined style={{ fontSize: 28 }} />
    }
];


const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5B92E5', // United Nations Blue
                    colorBgContainer: '#FFFFFF',
                    borderRadius: 20,
                    fontFamily: "'Outfit', sans-serif",
                },
                components: {
                    Button: {
                        borderRadius: 50,
                        controlHeight: 52,
                        fontWeight: 600,
                    }
                }
            }}
        >
            <div style={{
                backgroundColor: '#F2F3F4', // Anti Flash White
                minHeight: '100vh',
                color: '#4B5563',
                overflowX: 'hidden'
            }}>
                {/* Hero Section */}
                <section style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 24px',
                    textAlign: 'center',
                    maxWidth: 1200,
                    margin: '0 auto'
                }}>
                    <Space direction="vertical" size={24} align="center">
                        <Title style={{
                            color: '#08457E', // Dark Cerulean
                            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                            fontWeight: 800,
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-2px'
                        }}>
                            Drain Zero
                        </Title>
                        <Title level={2} style={{
                            color: '#08457E',
                            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                            fontWeight: 600,
                            margin: 0,
                            opacity: 0.9
                        }}>
                            Smart Tax Optimization Made Simple
                        </Title>
                        <Paragraph style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                            maxWidth: 650,
                            margin: '8px auto 0',
                            color: '#4B5563',
                            lineHeight: 1.6,
                            fontWeight: 400
                        }}>
                            Analyze your financial activities and reduce tax leakage with our professional optimization engine.
                        </Paragraph>
                        <Space size={20} style={{ marginTop: 24 }}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => navigate('/login')}
                                style={{
                                    width: 180,
                                    height: 56,
                                    fontSize: 18,
                                    boxShadow: '0 8px 15px rgba(91, 146, 229, 0.2)'
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                size="large"
                                onClick={() => navigate('/signup')}
                                style={{
                                    width: 180,
                                    height: 56,
                                    fontSize: 18,
                                    color: '#08457E',
                                    borderColor: '#08457E',
                                    borderWidth: 2
                                }}
                            >
                                Signup
                            </Button>
                        </Space>
                    </Space>
                </section>

                {/* Features Section */}
                <section style={{
                    padding: '100px 24px',
                    backgroundColor: '#FFFFFF'
                }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <Title level={2} style={{
                            textAlign: 'center',
                            color: '#08457E',
                            marginBottom: 80,
                            fontSize: '2.5rem',
                            fontWeight: 700
                        }}>
                            Platform Features
                        </Title>
                        <Row gutter={[32, 32]} justify="center">
                            {features.map((feature, index) => (
                                <Col xs={24} md={12} lg={8} key={index}>
                                    <Card
                                        bordered={false}
                                        style={{
                                            height: '100%',
                                            borderRadius: 24,
                                            backgroundColor: '#F2F3F4',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                        className="feature-card"
                                        bodyStyle={{ padding: 40 }}
                                    >
                                        <div style={{
                                            color: '#5B92E5',
                                            marginBottom: 24,
                                            display: 'inline-flex'
                                        }}>
                                            {feature.icon}
                                        </div>
                                        <Title level={4} style={{
                                            color: '#08457E',
                                            marginBottom: 16,
                                            fontSize: '1.5rem',
                                            fontWeight: 700
                                        }}>
                                            {feature.title}
                                        </Title>
                                        <Text style={{
                                            color: '#4B5563',
                                            fontSize: '1.1rem',
                                            lineHeight: 1.6
                                        }}>
                                            {feature.description}
                                        </Text>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>
                <style>
                    {`
                        .feature-card:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 15px 35px rgba(8, 69, 126, 0.08);
                        }
                    `}
                </style>
            </div>
        </ConfigProvider>
    );
};

export default LandingPage;
