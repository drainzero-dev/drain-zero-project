import React from 'react';
import { Layout, Typography, Card, Row, Col, Statistic, Table, Tag, Button, ConfigProvider, Space } from 'antd';
import { ArrowLeftOutlined, CheckCircleFilled, SwapOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const RegimeComparison = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, subcategory, ownership, formData } = location.state || {};

    // Mock Calculation Logic based on inputs
    const gross = (formData?.annualSalary || 1500000) + (formData?.bonus || 0) + (formData?.otherIncome || 0);

    // Deductions (Simplified)
    const stdDeductionOld = 50000;
    const stdDeductionNew = 75000;
    const d80C = Math.min(formData?.deduction80C || 0, 150000);
    const d80D = Math.min(formData?.deduction80D || 0, 25000);
    const dHRA = formData?.hraDeduction || 0;

    // Vehicle Specific Benefits (Old Regime / Business Usage)
    let vehicleBenefit = 0;
    if (category === 'Vehicle' && formData?.usageType !== 'Personal') {
        const price = formData?.purchasePrice || 0;
        const depRate = ownership === 'First-hand' ? 0.15 : 0.10;
        const interest = formData?.interestRate ? (formData.purchasePrice * (formData.interestRate / 100)) : 0;
        const businessUsage = (formData?.businessUsage || 0) / 100;

        vehicleBenefit = ((price * depRate) + interest) * businessUsage;
    }

    const totalDeductionsOld = stdDeductionOld + d80C + d80D + dHRA + vehicleBenefit;

    // Tax Calculation (Simplified India Slabs FY 25-26 approximation)
    const calcTaxOld = (taxable) => {
        if (taxable <= 250000) return 0;
        if (taxable <= 500000) return (taxable - 250000) * 0.05;
        if (taxable <= 1000000) return 12500 + (taxable - 500000) * 0.20;
        return 112500 + (taxable - 1000000) * 0.30;
    };

    const calcTaxNew = (taxable) => {
        if (taxable <= 300000) return 0;
        if (taxable <= 600000) return (taxable - 300000) * 0.05;
        if (taxable <= 900000) return 15000 + (taxable - 600000) * 0.10;
        if (taxable <= 1200000) return 45000 + (taxable - 900000) * 0.15;
        if (taxable <= 1500000) return 90000 + (taxable - 1200000) * 0.20;
        return 150000 + (taxable - 1500000) * 0.30;
    };

    const taxableOld = Math.max(0, gross - totalDeductionsOld);
    const taxableNew = Math.max(0, gross - stdDeductionNew);

    const taxOld = calcTaxOld(taxableOld);
    const taxNew = calcTaxNew(taxableNew);

    const bestRegime = taxOld < taxNew ? 'Old Regime' : 'New Regime';
    const savings = Math.abs(taxOld - taxNew);

    const columns = [
        { title: 'Component', dataIndex: 'label', key: 'label' },
        { title: 'Old Regime', dataIndex: 'old', key: 'old', render: (v) => `₹${v.toLocaleString()}` },
        { title: 'New Regime', dataIndex: 'new', key: 'new', render: (v) => `₹${v.toLocaleString()}` },
    ];

    const data = [
        { key: 1, label: 'Gross Income', old: gross, new: gross },
        { key: 2, label: 'Standard Deduction', old: stdDeductionOld, new: stdDeductionNew },
        { key: 3, label: 'Investments (80C, 80D, HRA)', old: d80C + d80D + dHRA, new: 0 },
        { key: 4, label: `${category} Optimization Benefit`, old: Math.round(vehicleBenefit), new: 0 },
        { key: 5, label: 'Taxable Income', old: Math.round(taxableOld), new: Math.round(taxableNew) },
        { key: 6, label: 'Final Tax Amount', old: Math.round(taxOld), new: Math.round(taxNew) },
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
                <Content style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/dashboard', { state: location.state })}
                        style={{ marginBottom: '24px', borderRadius: '12px', fontWeight: 600, color: '#08457E' }}
                    >
                        Back to Dashboard
                    </Button>

                    <Title level={2} style={{ color: '#08457E', fontWeight: 800, marginBottom: '8px' }}>
                        Regime Comparison Analysis
                    </Title>
                    <Paragraph style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>
                        Detailed comparison for your {subcategory} ({ownership}) based on provided financial inputs.
                    </Paragraph>

                    <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
                        <Col xs={24} md={8}>
                            <Card style={{ borderRadius: '24px', textAlign: 'center', height: '100%' }}>
                                <Statistic title="Old Regime Tax" value={taxOld} prefix="₹" precision={0} />
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ borderRadius: '24px', textAlign: 'center', height: '100%', border: bestRegime === 'New Regime' ? '2px solid #5B92E5' : 'none' }}>
                                <Statistic title="New Regime Tax" value={taxNew} prefix="₹" precision={0} />
                                {bestRegime === 'New Regime' && <Tag color="blue" style={{ marginTop: '8px' }}>Recommended</Tag>}
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card style={{ borderRadius: '24px', textAlign: 'center', height: '100%', background: '#08457E' }}>
                                <Statistic
                                    title={<span style={{ color: '#CCF1FF' }}>Estimated Savings</span>}
                                    value={savings}
                                    prefix="₹"
                                    precision={0}
                                    valueStyle={{ color: '#FFFFFF', fontWeight: 800 }}
                                />
                                <div style={{ color: '#10B981', fontWeight: 600, marginTop: '8px' }}>
                                    <CheckCircleFilled /> Switch to {bestRegime}
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Card
                        title={<Space><SwapOutlined /> Breakup Analysis</Space>}
                        style={{ borderRadius: '24px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            style={{ borderRadius: '16px', overflow: 'hidden' }}
                        />

                        <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#F9FAFB', borderRadius: '16px' }}>
                            <Title level={4} style={{ color: '#08457E', marginBottom: '16px' }}>Key Insights</Title>
                            <ul style={{ color: '#4B5563', lineHeight: '2' }}>
                                <li><strong>{bestRegime}</strong> is significantly more efficient for your current profile.</li>
                                {category === 'Vehicle' && ownership === 'First-hand' && (
                                    <li>First-hand {subcategory} loan interest and business depreciation provide a high shield in the Old Regime.</li>
                                )}
                                {category === 'Vehicle' && ownership === 'Second-hand' && (
                                    <li>Second-hand {subcategory} has limited depreciation, making the New Regime simplified slabs attractive.</li>
                                )}
                            </ul>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default RegimeComparison;
