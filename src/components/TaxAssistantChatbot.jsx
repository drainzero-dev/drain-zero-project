import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space } from 'antd';
import { RobotOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TaxAssistantChatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I am your AI Tax Assistant. Ask me anything about tax optimization, deductions, or how to use this tool.' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { role: 'user', text: inputValue }];
        setMessages(newMessages);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            let reply = "I'm your AI assistant. I can help answer tax questions!";
            const lowerInput = inputValue.toLowerCase();
            
            if (lowerInput.includes('reduce')) {
                reply = "You can reduce tax using deductions like:\n• 80C investments\n• 80D health insurance\n• Home loan interest\n• NPS contribution";
            } else if (lowerInput.includes('80c')) {
                reply = "Section 80C allows a deduction of up to ₹1.5 Lakhs for investments in PPF, ELSS, EPF, Life Insurance, and Principal Home Loan Repayment.";
            } else if (lowerInput.includes('old or new')) {
                reply = "The New Regime generally benefits those with fewer deductions, while the Old Regime is better if you claim HRA, 80C, 80D, and Home Loan interest. Our tool will automatically suggest the best one!";
            } else if (lowerInput.includes('depreciation')) {
                reply = "For business use, vehicles can claim depreciation (usually 15% for normal vehicles, 40% for commercial) which reduces your taxable business income.";
            } else if (lowerInput.includes('deduction')) {
                reply = "Common deductions include Section 80C (up to ₹1.5L), 80D (Health Insurance up to ₹75K), 80CCD(1B) (NPS up to ₹50K), and Section 24(b) (Home loan interest up to ₹2L).";
            }

            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: reply }
            ]);
        }, 1000);
    };

    return (
        <Card
            style={{ 
                marginTop: '40px', 
                borderRadius: '24px', 
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}
            bodyStyle={{ padding: 0 }}
        >
            <div style={{ 
                background: '#08457E', 
                padding: '20px 24px', 
                borderTopLeftRadius: '24px', 
                borderTopRightRadius: '24px' 
            }}>
                <Title level={4} style={{ color: '#FFFFFF', margin: 0 }}>
                    <RobotOutlined style={{ marginRight: '8px' }} /> AI Tax Assistant
                </Title>
                <Text style={{ color: '#CCF1FF' }}>Ask anything about tax optimization.</Text>
            </div>
            
            <div style={{ padding: '24px', background: '#FFFFFF', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
                <div style={{ 
                    height: '250px', 
                    overflowY: 'auto', 
                    marginBottom: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px',
                    paddingRight: '10px'
                }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.role === 'user' ? '#5B92E5' : '#F2F3F4',
                            color: msg.role === 'user' ? '#FFF' : '#1F2937',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            maxWidth: '85%',
                            borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                            borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '16px',
                        }}>
                            <Space size={8} align="start" style={{ display: 'flex' }}>
                                {msg.role === 'bot' && <RobotOutlined style={{ fontSize: 16, marginTop: 4, color: '#084C8D' }} />}
                                <Text style={{ color: 'inherit', display: 'block', whiteSpace: 'pre-line' }}>{msg.text}</Text>
                                {msg.role === 'user' && <UserOutlined style={{ fontSize: 16, marginTop: 4, color: '#FFF' }} />}
                            </Space>
                        </div>
                    ))}
                </div>
                
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        size="large"
                        placeholder="Ask a tax question..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleSend}
                        style={{ borderRadius: '12px 0 0 12px' }}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        style={{ borderRadius: '0 12px 12px 0', background: '#5B92E5', width: '60px' }}
                    />
                </Space.Compact>
            </div>
        </Card>
    );
};

export default TaxAssistantChatbot;
