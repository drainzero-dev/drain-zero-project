import React from 'react';
import { ConfigProvider, Button, Card, Typography, Space, Layout, Form, Input, Divider } from 'antd';
import { GoogleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5B92E5', // United Nations Blue
                    borderRadius: 12,
                    colorText: '#1F2937', // Text Primary
                    fontFamily: "'Inter', sans-serif",
                },
                components: {
                    Button: {
                        controlHeightLG: 52,
                        fontWeight: 600,
                        borderRadius: 12,
                    },
                    Input: {
                        colorBgContainer: '#EEF3FA', // Input Background
                        colorBorder: '#B8C8E6', // Input Border
                        borderRadius: 12,
                        controlHeight: 48,
                    },
                    Card: {
                        paddingLG: 40,
                        borderRadiusLG: 24,
                        boxShadow: '0 8px 30px rgba(8, 76, 141, 0.08)',
                    }
                },
            }}
        >
            <Layout style={{
                minHeight: '100vh',
                background: '#DCE6F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
            }}>
                <Card
                    style={{
                        maxWidth: 480,
                        width: '100%',
                        border: 'none',
                    }}
                >
                    <div style={{ marginBottom: 32 }}>
                        <Space align="center" size={16} style={{ marginBottom: 8 }}>
                            <ArrowLeftOutlined
                                onClick={() => navigate('/')}
                                style={{
                                    fontSize: 22,
                                    color: '#084C8D',
                                    cursor: 'pointer',
                                }}
                            />
                            <Title level={2} style={{
                                margin: 0,
                                fontWeight: 700,
                                color: '#084C8D' // Dark Cerulean
                            }}>
                                Login
                            </Title>
                        </Space>
                        <Text style={{
                            fontSize: 16,
                            color: '#6B7280', // Text Secondary
                            display: 'block'
                        }}>
                            Access your personal fiscal optimization dashboard
                        </Text>
                    </div>

                    <div style={{ marginTop: 24 }}>
                        <Button
                            block
                            size="large"
                            icon={<GoogleOutlined />}
                            style={{
                                borderColor: '#B8C8E6',
                                color: '#1F2937'
                            }}
                            onClick={() => {
                                // Simulate Google Auth
                                window.confirm('Sign in with Google?');
                                navigate('/category-selection');
                            }}
                        >
                            Continue with Google
                        </Button>

                        <div style={{ textAlign: 'center', marginTop: 32 }}>
                            <Text style={{ color: '#6B7280' }}>
                                New here? <Link to="/signup" style={{ color: '#5B92E5', fontWeight: 600 }}>Create account</Link>
                            </Text>
                        </div>
                    </div>
                </Card>
            </Layout>
        </ConfigProvider>
    );
};

export default LoginPage;
