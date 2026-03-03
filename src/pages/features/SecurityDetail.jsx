import React from 'react';
import { Layout, Typography, Card, Result, Button, List, Tag, Breadcrumb, Row, Col, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LockOutlined, SafetyOutlined, SafetyCertificateOutlined, KeyOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const SecurityDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const securityFeatures = [
        { title: '256-bit SSL Encryption', icon: <LockOutlined />, desc: 'All data transmission between your browser and our servers is encrypted.' },
        { title: 'Data Isolation', icon: <SafetyCertificateOutlined />, desc: 'Your financial profile is isolated in encrypted buckets; no cross-data access.' },
        { title: 'OAuth 2.0 Auth', icon: <KeyOutlined />, desc: 'Secure login via industry-standard protocols; we never store your passwords.' },
        { title: 'Regulatory Compliance', icon: <SafetyOutlined />, desc: 'Aligned with national data privacy and financial data handling laws.' },
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#DCE6F5', padding: '24px' }}>
            <Content style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                <Breadcrumb
                    items={[
                        { title: <a onClick={() => navigate('/dashboard')}>Dashboard</a> },
                        { title: 'Security & Privacy' }
                    ]}
                    style={{ marginBottom: '16px' }}
                />

                <Card bordered={false} style={{ borderRadius: '24px', boxShadow: '0 8px 30px rgba(8, 76, 141, 0.08)' }}>
                    <Result
                        status="success"
                        icon={<SafetyCertificateOutlined style={{ color: '#084C8D', fontSize: '72px' }} />}
                        title={<Title level={2} style={{ color: '#084C8D' }}>Bank-Grade Security Protocol</Title>}
                        subTitle={<Paragraph style={{ fontSize: '16px' }}>Your financial privacy is our top priority. We use strict encryption to ensure your data is never accessible to unauthorized parties.</Paragraph>}
                        extra={[
                            <Button type="primary" key="dashboard" onClick={() => navigate('/dashboard')} style={{ background: '#084C8D', height: '48px', padding: '0 32px' }}>
                                Return to Dashboard
                            </Button>
                        ]}
                    />

                    <Title level={4} style={{ textAlign: 'center', marginBottom: '40px', color: '#084C8D' }}>How We Protect You</Title>

                    <Row gutter={[24, 24]}>
                        {securityFeatures.map((feat, i) => (
                            <Col xs={24} md={12} key={i}>
                                <Card size="small" style={{ height: '100%', borderRadius: '16px', background: '#f5f5f5', border: 'none' }}>
                                    <Space direction="vertical">
                                        <div style={{ padding: '8px', background: '#fff', borderRadius: '8px', display: 'inline-block' }}>
                                            {React.cloneElement(feat.icon, { style: { color: '#084C8D', fontSize: '20px' } })}
                                        </div>
                                        <Text strong>{feat.title}</Text>
                                        <Text type="secondary">{feat.desc}</Text>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div style={{ marginTop: '48px', padding: '24px', background: '#EEF3FA', borderRadius: '16px', textAlign: 'center' }}>
                        <Tag color="blue" icon={<SafetyCertificateOutlined />}>Certified Secure Finance App</Tag>
                        <Paragraph style={{ marginTop: '16px', marginBottom: 0 }}>
                            We do not sell your personal data. Our monetization comes from subscription-based optimization tools,
                            meaning our interests are aligned with your savings, not data brokers.
                        </Paragraph>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default SecurityDetail;
