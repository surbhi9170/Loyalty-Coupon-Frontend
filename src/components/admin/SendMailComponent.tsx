import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AddressZero } from '@ethersproject/constants';
import { useOrganizationStore } from '../../slices/useOrganizationStore';


// Styled components
const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ success: boolean }>`
  margin-top: 20px;
  text-align: center;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const SendCouponComponent: React.FC = () => {
  const { organizations} = useOrganizationStore();
  const [email, setEmail] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number | ''>('');
  const [couponId, setCouponId] = useState<number | ''>('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/send-coupon', {
        email,
        discountAmount,
        couponId
      });

      if (response.status === 200) {
        setMessage('Coupon sent successfully!');
      } else {
        setMessage('Failed to send coupon.');
      }
    } catch (error) {
      setMessage('An error occurred while sending the coupon.');
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
    <Container>
      <Heading>Send Coupon via Email</Heading>
      {organizations && organizations[0] != AddressZero ? 
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Discount Amount:</Label>
          <Input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <Label>Coupon Id:</Label>
          <Input
            type="number"
            value={couponId}
            onChange={(e) => setCouponId(Number(e.target.value))}
            required
          />
        </div>

        <Button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Coupon'}
        </Button>
      </Form> : <Label>Please connect wallet and create organization</Label>
}
      {message && <Message success={message.includes('successfully')}>{message}</Message>}
    </Container>
    </>
  );
};

export default SendCouponComponent;
