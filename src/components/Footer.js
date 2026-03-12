import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="custom-footer mt-auto">
            <Container className="text-center">
                <p className="mb-1 text-white">© 2026 <strong>FER202 Practical Exam</strong></p>
                <p className="small mb-0">Designed by FPT University Student</p>
            </Container>
        </footer>
    );
};
export default Footer;