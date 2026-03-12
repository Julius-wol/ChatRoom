import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ChatRoom = ({ chatData, onMessageSent }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsgObj = {
            id: `message${Date.now()}`,
            text: newMessage,
            senderId: "user1", // Giả định bạn là user1
            timestamp: new Date().toLocaleString('en-GB', { hour12: true }).toUpperCase()
        };

        const updatedChat = {
            ...chatData,
            messages: [...chatData.messages, newMsgObj]
        };

        try {
            await axios.put('http://localhost:9999/room', updatedChat);
            onMessageSent(); // Load lại dữ liệu ở App.js
            setNewMessage('');
        } catch (error) {
            alert("Lỗi khi gửi tin nhắn!");
        }
    };

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow">
                        {/* Header hiển thị tên phòng chat */}
                        <Card.Header className="bg-white border-bottom py-3">
                            <h4 className="mb-0 text-primary">{chatData.name}</h4>
                        </Card.Header>

                        {/* Thân box chat - Có thanh cuộn */}
                        <Card.Body style={{ height: '450px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                            {chatData.messages.map((msg) => {
                                const isMe = msg.senderId === "user1";
                                return (
                                    <div key={msg.id} className={`d-flex mb-3 ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                                        <div
                                            className={`p-3 rounded-3 shadow-sm ${isMe ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                                            style={{ maxWidth: '75%', position: 'relative' }}
                                        >
                                            <div className="fw-bold small mb-1">
                                                {isMe ? 'You' : msg.senderId}
                                            </div>
                                            <div>{msg.text}</div>
                                            <div className={`small mt-1 ${isMe ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                                                {msg.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Card.Body>

                        {/* Footer chứa ô nhập tin nhắn */}
                        <Card.Footer className="bg-white p-3">
                            <Form onSubmit={handleSend}>
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Type your message here..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="border-primary"
                                    />
                                    <Button variant="primary" type="submit" className="px-4">
                                        Send
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

// --- QUAN TRỌNG: PropTypes để lấy 1 điểm ---
ChatRoom.propTypes = {
    chatData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                senderId: PropTypes.string.isRequired,
                timestamp: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired,
    onMessageSent: PropTypes.func.isRequired
};

export default ChatRoom;