import React, { useState } from 'react';
import styled from 'styled-components';
import { ConnectWallet } from './components/ConnectWallet/index';
import CreateOrganizationComponent from './components/admin/CreateOrganizationComponent';
import OrganizationListComponent from './components/admin/OrganizationListComponent';
import CreateCouponComponent from './components/admin/CreateCouponComponent';
import SendMailComponent from './components/admin/SendMailComponent';

// Styled Components
const AdminWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 15px 30px;
  color: white;
`;

const Brand = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  border-bottom: 2px solid #007bff;
`;

const Tab = styled.li<{ active: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: bold;
  color: ${(props) => (props.active ? '#007bff' : '#495057')};
  border-bottom: ${(props) => (props.active ? '2px solid #007bff' : 'none')};

  &:hover {
    color: #007bff;
  }
`;

const TabContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 5px;
  margin-top: 20px;
`;

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create-organization');

  return (
    <AdminWrapper>
      <Header>
        <Brand>Admin Panel</Brand>
        <ConnectWallet />
      </Header>

      <Nav>
        <TabList>
          <Tab
            active={activeTab === 'create-organization'}
            onClick={() => setActiveTab('create-organization')}
          >
            Create Organization
          </Tab>
          <Tab
            active={activeTab === 'organization-list'}
            onClick={() => setActiveTab('organization-list')}
          >
            Organization List
          </Tab>
          <Tab
            active={activeTab === 'create-coupon'}
            onClick={() => setActiveTab('create-coupon')}
          >
            Create Coupon
          </Tab>
          <Tab
            active={activeTab === 'send-mail'}
            onClick={() => setActiveTab('send-mail')}
          >
            Send Mail
          </Tab>
        </TabList>

        <TabContent>
          {activeTab === 'create-organization' && <CreateOrganizationComponent />}
          {activeTab === 'organization-list' && <OrganizationListComponent />}
          {activeTab === 'create-coupon' && <CreateCouponComponent />}
          {activeTab === 'send-mail' && <SendMailComponent />}
        </TabContent>
      </Nav>
    </AdminWrapper>
  );
};

export default AdminPage;
