import React, { useState, useEffect } from 'react';
import {
    Layout,
    Card,
    Form,
    Input,
    InputNumber,
    Button,
    Typography,
    Space,
    Row,
    Col,
    Divider,
    Select,
    ConfigProvider,
    Radio,
    message
} from 'antd';
import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    CarOutlined,
    SafetyCertificateOutlined,
    DollarOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const AnalysisForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();

    // Get state from navigation
    const { category, subcategory, ownership } = location.state || {
        category: 'Vehicle',
        subcategory: 'Car',
        ownership: 'First-hand'
    };

    const isVehicle = category === 'Vehicle';
    const isFirstHand = ownership === 'First-hand';

    const onFinish = (values) => {
        console.log('Form Values:', values);
        message.success("Analyzing your data...");
        // Navigate to dashboard with all results
        navigate('/dashboard', {
            state: {
                formData: values,
                category,
                subcategory,
                ownership
            }
        });
    };

    const cardStyle = {
        borderRadius: '24px',
        border: 'none',
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.04)',
        background: '#FFFFFF',
        marginBottom: '24px'
    };

    const inputStyle = {
        borderRadius: '12px',
        height: '48px',
        width: '100%'
    };

    const renderVehicleInputs = () => {
        return (
            <>
                {/* Vehicle Details */}
                <Card
                    title={<Space><CarOutlined style={{ color: '#5B92E5' }} /> <span>Vehicle Details ({subcategory})</span></Space>}
                    style={cardStyle}
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Purchase Price (₹)" name="purchasePrice" rules={[{ required: true }]}>
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Purchase Year" name="purchaseYear" rules={[{ required: true }]}>
                                <Select style={inputStyle}>
                                    {[2023, 2024, 2025, 2026].map(y => <Option key={y} value={y}>{y}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        {!isFirstHand && (
                            <Col xs={24} md={12}>
                                <Form.Item label="Current Market Value (₹)" name="currentMarketValue" rules={[{ required: true }]}>
                                    <InputNumber style={inputStyle} prefix="₹" />
                                </Form.Item>
                            </Col>
                        )}
                        <Col xs={24} md={12}>
                            <Form.Item label="Category" name="vehicleEnergy" initialValue="ICE">
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="EV">Electric (EV)</Radio.Button>
                                    <Radio.Button value="ICE">Fuel (ICE)</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Estimated Resale Value (Optional)" name="resaleValue">
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Loan Details */}
                <Card
                    title={<Space><DollarOutlined style={{ color: '#5B92E5' }} /> <span>Loan Details</span></Space>}
                    style={cardStyle}
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Loan Amount (₹)" name="loanAmount" rules={[{ required: isFirstHand }]}>
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Interest Rate (%)" name="interestRate" rules={[{ required: isFirstHand }]}>
                                <InputNumber style={inputStyle} suffix="%" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Loan Tenure (Years)" name="tenure" rules={[{ required: isFirstHand }]}>
                                <InputNumber style={inputStyle} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Down Payment (₹)" name="downPayment">
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* Usage Details */}
                <Card
                    title={<Space><SafetyCertificateOutlined style={{ color: '#5B92E5' }} /> <span>Usage & Reimbursements</span></Space>}
                    style={cardStyle}
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Usage Type" name="usageType" initialValue="Personal">
                                <Select style={inputStyle}>
                                    <Option value="Personal">Personal</Option>
                                    <Option value="Business">Business</Option>
                                    <Option value="Mixed">Mixed (Personal + Business)</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Business Usage (%)" name="businessUsage" initialValue={0}>
                                <InputNumber style={inputStyle} suffix="%" min={0} max={100} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Fuel Reimbursement / Year (₹)" name="fuelReimbursement">
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Maintenance Reimbursement / Year (₹)" name="maintenanceReimbursement">
                                <InputNumber style={inputStyle} prefix="₹" />
                            </Form.Item>
                        </Col>
                        {subcategory === 'Car' && (
                            <Col xs={24}>
                                <Form.Item label="Monthly Driver Salary (₹)" name="driverSalary">
                                    <InputNumber style={inputStyle} prefix="₹" />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                </Card>
            </>
        );
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5B92E5',
                    borderRadius: 16,
                    fontFamily: "'Outfit', sans-serif",
                },
            }}
        >
            <Layout style={{ minHeight: '100vh', background: '#F2F3F4', padding: '40px 24px' }}>
                <Content style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                    {/* Page Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(-1)}
                            style={{ color: '#08457E' }}
                        />
                        <div>
                            <Title level={2} style={{ color: '#08457E', margin: 0, fontWeight: 700 }}>
                                {category} Analysis → {subcategory} → {ownership}
                            </Title>
                            <Text type="secondary" style={{ fontSize: '16px' }}>
                                Provide your financial and asset details for precise tax optimization.
                            </Text>
                        </div>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        initialValues={{
                            purchaseYear: 2025,
                            annualSalary: 1500000,
                            regimePreference: 'Auto Suggest'
                        }}
                    >
                        {/* Dynamic Category Inputs */}
                        {isVehicle && renderVehicleInputs()}

                        {!isVehicle && (
                            <Card title="Analysis Details" style={cardStyle}>
                                <Paragraph>Analysis logic for {category} - {subcategory} is under preparation. Please enter your income details below.</Paragraph>
                            </Card>
                        )}

                        {/* Income Details */}
                        <Card
                            title={<Space><DollarOutlined style={{ color: '#5B92E5' }} /> <span>Income Details</span></Space>}
                            style={cardStyle}
                        >
                            <Row gutter={[24, 0]}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Annual Base Salary (₹)" name="annualSalary" rules={[{ required: true }]}>
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Bonus / Variables (₹)" name="bonus">
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Form.Item label="Other Income (Interest, Rental, etc.) (₹)" name="otherIncome">
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Deductions */}
                        <Card
                            title={<Space><LineChartOutlined style={{ color: '#5B92E5' }} /> <span>Tax Deductions</span></Space>}
                            style={cardStyle}
                        >
                            <Row gutter={[24, 0]}>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Section 80C (LIC, PPF, etc.)" name="deduction80C">
                                        <InputNumber style={inputStyle} prefix="₹" placeholder="Max ₹1.5 Lakh" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Section 80D (Health Insurance)" name="deduction80D">
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="Section 80CCD (NPS)" name="deductionNPS">
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item label="HRA Benefit Claimed" name="hraDeduction">
                                        <InputNumber style={inputStyle} prefix="₹" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Regime Preference */}
                        <Card style={{ ...cardStyle, background: '#08457E' }} bodyStyle={{ padding: '32px' }}>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <Text style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 600 }}>Tax Regime Preference</Text>
                                    <div style={{ color: '#CCF1FF', fontSize: '13px', marginTop: '4px' }}>Our engine will recommend the best option by default.</div>
                                </Col>
                                <Col>
                                    <Form.Item name="regimePreference" noStyle>
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="Auto Suggest">Auto Suggest</Radio.Button>
                                            <Radio.Button value="Old Regime">Old Regime</Radio.Button>
                                            <Radio.Button value="New Regime">New Regime</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Submit */}
                        <div style={{ marginTop: '48px', textAlign: 'center' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                icon={<ArrowRightOutlined />}
                                style={{
                                    height: '64px',
                                    padding: '0 64px',
                                    fontSize: '20px',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    boxShadow: '0 8px 30px rgba(91, 146, 229, 0.3)'
                                }}
                            >
                                Analyze Now
                            </Button>
                        </div>
                    </Form>

                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <Text style={{ color: '#9CA3AF', fontSize: '13px' }}>
                            Private & Secure Analysis · Encrypted Data Transmission
                        </Text>
                    </div>
                </Content>
            </Layout>
            <style>
                {`
                    .ant-input-number-input { height: 48px !important; }
                    .ant-form-item-label label { font-weight: 600; color: #08457E; }
                    .ant-radio-button-wrapper-checked { background: #5B92E5 !important; border-color: #5B92E5 !important; }
                `}
            </style>
        </ConfigProvider>
    );
};

export default AnalysisForm;
