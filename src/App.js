import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const Home = () => (
  <Container className="mt-5 text-center">
    <div className="p-5 bg-light rounded-3 border">
      <img src={require('./asset/Hocbong-100-e-bannerweb.png')} alt="Chat Room" className="mb-4" style={{ width: '1550px' }} />
      <h1 className="display-4 fw-bold">Welcome to ChatRoom App</h1>
      <p className="lead">This is a simple real-time chat application built with React and JSON Server.</p>
      <hr className="my-4" />
      <p>Go to the Chat Room to see all messages and start chatting!</p>
    </div>
  </Container>
);

function App() {
  const [chatData, setChatData] = useState(null);

  const loadData = async () => {
    try {
      // Lưu ý: Đề bài yêu cầu lấy dữ liệu từ 'chatroom'. 
      // Hãy kiểm tra chính xác tên key trong db.json của bạn.
      const res = await axios.get('http://localhost:9999/room');
      setChatData(res.data);
    } catch (error) {
      console.error("Error loading data from json-server:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        {/* Header chứa Logo và Nav Links */}
        <Header />

        {/* flex-grow-1 giúp main chiếm hết khoảng trống, đẩy Footer xuống đáy */}
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Truyền dữ liệu chatData và hàm loadData vào ChatRoom */}
            <Route
              path="/chat"
              element={
                chatData ? (
                  <div>
                    <img src={require('./asset/Hocbong-100-e-bannerweb.png')} alt="Chat Room" className="mb-4" style={{ width: '1550px' }} />
                    <ChatRoom chatData={chatData} onMessageSent={loadData} />
                  </div>
                ) : (
                  <div>
                    <img src={require('./asset/Hocbong-100-e-bannerweb.png')} alt="Chat Room" className="mb-4" style={{ width: '1550px' }} />
                    <Container className="text-center">Loading chat room...</Container>
                  </div>
                )
              }
            />
          </Routes>
        </main>

        {/* Footer ở dưới cùng */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;