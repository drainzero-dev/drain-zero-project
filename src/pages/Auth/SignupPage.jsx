import React from 'react';
import { ConfigProvider, Button, Card, Typography, Space, Layout, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const SignupPage = () => {
    const navigate = useNavigate();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5B92E5', // United Nations Blue
                    borderRadius: 12,
                    colorText: '#1F2937',
                    fontFamily: "'Inter', sans-serif",
                },
                components: {
                    Button: {
                        controlHeightLG: 52,
                        fontWeight: 600,
                        borderRadius: 12,
                    },
                    Input: {
                        colorBgContainer: '#EEF3FA',
                        colorBorder: '#B8C8E6',
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
                        maxWidth: 500,
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
                                color: '#084C8D'
                            }}>
                                Create Account
                            </Title>
                        </Space>
                        <Text style={{
                            fontSize: 16,
                            color: '#6B7280',
                            display: 'block'
                        }}>
                            Start your journey with professional tax optimization
                        </Text>
                    </div>

                    <Form layout="vertical" size="large">
                        <Form.Item name="fullname" label={<Text strong style={{ color: '#084C8D' }}>Full Name</Text>}>
                            <Input placeholder="Enter your full name" />
                        </Form.Item>

                        <Form.Item name="email" label={<Text strong style={{ color: '#084C8D' }}>Email</Text>}>
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item name="password" label={<Text strong style={{ color: '#084C8D' }}>Password</Text>}>
                            <Input.Password placeholder="Create a password" />
                        </Form.Item>

                        <Form.Item name="confirmPassword" label={<Text strong style={{ color: '#084C8D' }}>Confirm Password</Text>}>
                            <Input.Password placeholder="Confirm your password" />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 8 }}>
                            <Button type="primary" block size="large" onClick={() => navigate('/category-selection')}>
                                Create Account
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center', marginTop: 24 }}>
                            <Text style={{ color: '#6B7280' }}>
                                Already have an account? <Link to="/login" style={{ color: '#5B92E5', fontWeight: 600 }}>Sign In</Link>
                            </Text>
                        </div>
                    </Form>
                </Card>
            </Layout>
        </ConfigProvider>
    );
};

export default SignupPage;
