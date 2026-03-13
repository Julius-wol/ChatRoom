import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ChatRoom = ({ chatData, onMessageSent }) => {
    const [newMessage, setNewMessage] = useState('');
    const [searchUser, setSearchUser] = useState('');
  //  const [delete, setDeleteStatus] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsgObj = {
            id: `message${Date.now()}`,
            text: newMessage,
            senderId: "user1", 
            timestamp: new Date().toLocaleString('en-GB', { hour12: true }).toUpperCase()
        };

        const updatedChat = {
            ...chatData,
            messages: [...chatData.messages, newMsgObj]
        };

        try {
            await axios.put('http://localhost:9999/room', updatedChat);
            onMessageSent(); 
            setNewMessage('');
        } catch (error) {
            alert("Lỗi khi gửi tin nhắn!");
        }
    };

    const handleDelete = async (messageId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) return;

        const updatedMessages = chatData.messages.filter(msg => msg.id !== messageId);
        const updatedChat = {
            ...chatData,
            messages: updatedMessages
        };

        try {
            await axios.put('http://localhost:9999/room', updatedChat);
            onMessageSent(); 
        } catch (error) {
            alert("Lỗi khi xóa tin nhắn!");
        }
    };

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow">
                        {/* Header hiển thị tên phòng chat */}
                        <Card.Header className="bg-white border-bottom py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0 text-primary">{chatData.name}</h4>
                            </div>
                        </Card.Header>

                        {/* Search bar để lọc tin nhắn theo user */}
                        <div className="p-3 bg-light border-bottom">
                            <InputGroup>
                                <Form.Control
                                    placeholder="Search by username..."
                                    value={searchUser}
                                    onChange={(e) => setSearchUser(e.target.value)}
                                    className="border-secondary"
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setSearchUser('')}
                                    className="px-3"
                                >
                                    Clear
                                </Button>
                            </InputGroup>
                            {searchUser && (
                                <small className="text-muted d-block mt-2">
                                    Showing messages from: <strong>{searchUser}</strong>
                                </small>
                            )}
                        </div>

                        {/* Thân box chat - Có thanh cuộn */}
                        <Card.Body style={{ height: '450px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                            {chatData.messages
                                .filter((msg) => {
                                    if (!searchUser.trim()) return true;
                                    return msg.senderId.toLowerCase().includes(searchUser.toLowerCase());
                                })
                                .map((msg) => {
                                    const isMe = msg.senderId === "user1";
                                    return (
                                        <div key={msg.id} className={`d-flex mb-3 ${isMe ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div className="d-flex align-items-start" style={{ maxWidth: '85%' }}>
                                                {isMe && (
                                                    <Button 
                                                        variant="link" 
                                                        className="text-danger p-0 me-2 mt-2" 
                                                        onClick={() => handleDelete(msg.id)}
                                                        title="Delete message"
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                        <span style={{fontSize: '0.8rem'}}>Xóa</span>
                                                    </Button>
                                                )}
                                                <div
                                                    className={`p-3 rounded-3 shadow-sm ${isMe ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <div className="fw-bold small mb-1">
                                                        {isMe ? 'You' : msg.senderId}
                                                    </div>
                                                    <div>{msg.text}</div>
                                                    <div className={`small mt-1 ${isMe ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
                                                        {msg.timestamp}
                                                    </div>
                                                </div>
                                                {!isMe && (
                                                    <Button 
                                                        variant="link" 
                                                        className="text-danger p-0 ms-2 mt-2" 
                                                        onClick={() => handleDelete(msg.id)}
                                                        title="Delete message"
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                        <span style={{fontSize: '0.8rem'}}>Xóa</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            {chatData.messages.filter((msg) => {
                                if (!searchUser.trim()) return true;
                                return msg.senderId.toLowerCase().includes(searchUser.toLowerCase());
                            }).length === 0 && searchUser && (
                                    <div className="text-center text-muted py-5">
                                        <p>Không tìm thấy tin nhắn từ user: <strong>{searchUser}</strong></p>
                                    </div>
                                )}
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

//thêm nút xóa bên cạnh các message -> bấm vào sẽ xóa 