import React, { useState } from 'react';
import styled from 'styled-components';
import { useOrganizationStore } from '../../slices/useOrganizationStore';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { AddressZero } from '@ethersproject/constants';

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
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

const ErrorMessage = styled.p`
  color: #dc3545;
  text-align: center;
`;

const CreateCouponComponent: React.FC = () => {
  const { organizations} = useOrganizationStore();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { createCoupon, isLoading, error } = useOrganizationStore();
  const { chainId } = useOrganizationStore(); 
  const provider = useEthersProvider({ chainId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCoupon(discountAmount, provider);
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  return (
    <Container>
      <Header>Create Coupon</Header>
      {organizations && organizations[0] != AddressZero ? 
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Discount Amount:</Label>
          <Input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Coupon'}
        </Button>
      </Form>: <Label>Please connect wallet and create organization</Label>}
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
    </Container>
  );
};

export default CreateCouponComponent;
