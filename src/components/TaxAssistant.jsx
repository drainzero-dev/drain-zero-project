import React, { useState } from 'react';
import { Button, Card, Input, Typography, Space, List, Avatar } from 'antd';
import { MessageOutlined, CloseOutlined, UserOutlined, RobotOutlined, SendOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const TaxAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Section 80D allows deduction for health insurance premiums. Up to ₹25,000 for self/family and ₹50,000 for senior citizens.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const location = useLocation();

    // Hide floating chatbot on pages where inline TaxAssistantChatbot is used or not needed
    const hiddenPaths = ['/', '/login', '/signup', '/analysis', '/vehicle', '/stocks', '/health-insurance', '/land'];
    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { role: 'user', text: inputValue }];
        setMessages(newMessages);
        setInputValue('');

        // Simulate bot reply
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: 'This is a simulated AI response tailored to your tax queries.' }
            ]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
            {isOpen ? (
                <Card
                    title={
                        <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Text strong style={{ color: '#08457E' }}>Drain Zero Tax Assistant</Text>
                            <Button type="text" icon={<CloseOutlined />} onClick={() => setIsOpen(false)} style={{ padding: 0 }} />
                        </Space>
                    }
                    bodyStyle={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '400px' }}
                    style={{ width: 350, borderRadius: 16, boxShadow: '0 8px 30px rgba(8, 69, 126, 0.2)' }}
                >
                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.role === 'user' ? '#5B92E5' : '#F2F3F4',
                                color: msg.role === 'user' ? '#FFF' : '#1F2937',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                maxWidth: '85%',
                                wordBreak: 'break-word',
                                borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                                borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '12px',
                            }}>
                                <Space size={8} align="start">
                                    {msg.role === 'bot' && <RobotOutlined style={{ fontSize: 16, marginTop: 4, color: '#084C8D' }} />}
                                    <Text style={{ color: 'inherit', display: 'block' }}>{msg.text}</Text>
                                    {msg.role === 'user' && <UserOutlined style={{ fontSize: 16, marginTop: 4, color: '#FFF' }} />}
                                </Space>
                            </div>
                        ))}
                    </div>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            placeholder="Ask a tax question..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onPressEnter={handleSend}
                            style={{ borderRadius: '24px 0 0 24px' }}
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={handleSend}
                            style={{ borderRadius: '0 24px 24px 0', background: '#5B92E5' }}
                        />
                    </Space.Compact>
                </Card>
            ) : (
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<MessageOutlined />}
                    onClick={() => setIsOpen(true)}
                    style={{
                        height: 56,
                        boxShadow: '0 8px 24px rgba(91, 146, 229, 0.4)',
                        fontSize: 16,
                        fontWeight: 600,
                        background: '#08457E'
                    }}
                >
                    💬 Tax Assistant
                </Button>
            )}
        </div>
    );
};

export default TaxAssistant;
