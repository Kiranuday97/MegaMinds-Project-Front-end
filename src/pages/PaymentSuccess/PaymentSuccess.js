import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './paymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceNum = searchParams.get('reference');

  return (
    <Container className="payment-success-container">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h1>Payment Successful!</h1>
          <h5>Reference No. {referenceNum}</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
