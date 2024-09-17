import React from 'react';
import styled from 'styled-components';
import { useAccount } from './../../hooks/useAccount';
import { useEthersProvider } from './../../hooks/useEthersProvider';
import { useOrganizationStore } from './../../slices/useOrganizationStore'; 

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
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
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;

const CreateOrganizationComponent: React.FC = () => {
  const { isLoading, isAdmin, error, organizationName, setOrganizationName, createOrganization } = useOrganizationStore();

  const { chainId } = useAccount();
  const provider = useEthersProvider({ chainId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization(organizationName, provider);
    } catch (err) {
      console.error('Error creating organization:', err);
    }
  };

  return (
    <Container>
      <Title>Create Organization</Title>
      {isAdmin && <p>You're the admin of {organizationName}</p>}
      
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Organization Name:</Label>
          <Input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Organization'}
        </Button>
      </Form>

      {/* {error && <ErrorText>{error}</ErrorText>} */}
    </Container>
  );
};

export default CreateOrganizationComponent;
