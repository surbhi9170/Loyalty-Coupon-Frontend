import React, { useState } from 'react';
import styled from 'styled-components';
import { ConnectWallet } from './components/ConnectWallet/index';
import ClaimCouponComponent from './components/user/ClaimCouponCompnent';
import RedeemCouponComponent from './components/user/RedeemCouponComponent';

// Styled Components
const UserWrapper = styled.div`
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

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('claim-coupon');

  return (
    <UserWrapper>
      <Header>
        <Brand>User Portal</Brand>
        <ConnectWallet />
      </Header>

      <Nav>
        <TabList>
          <Tab
            active={activeTab === 'claim-coupon'}
            onClick={() => setActiveTab('claim-coupon')}
          >
            Claim Coupon
          </Tab>
          <Tab
            active={activeTab === 'redeem-coupon'}
            onClick={() => setActiveTab('redeem-coupon')}
          >
            Redeem Coupon
          </Tab>
        </TabList>

        <TabContent>
          {activeTab === 'claim-coupon' && <ClaimCouponComponent />}
          {activeTab === 'redeem-coupon' && <RedeemCouponComponent />}
        </TabContent>
      </Nav>
    </UserWrapper>
  );
};

export default UserPage;
