import React, { useEffect } from 'react';
import { useAccount } from './../../hooks/useAccount';
import { useEthersProvider } from './../../hooks/useEthersProvider';
import { useOrganizationStore } from './../../slices/useOrganizationStore';
import { AddressZero } from '@ethersproject/constants';

const OrganizationListComponent: React.FC = () => {
  const { organizations, fetchOrganizations, isLoading, error } = useOrganizationStore();
  const { chainId, address } = useAccount();
  const provider = useEthersProvider({ chainId });

  useEffect(() => {
    fetchOrganizations(provider, address); 
  }, [fetchOrganizations, provider, address]);

  return (
    <div>
      <h1>Organization List</h1>
      {isLoading && <p>Loading organizations...</p>}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {
        organizations && organizations[0] != AddressZero ? <><p>User: {organizations[0]}</p>
        <p>Name of organization: {organizations[1]}</p></> :<p>No organization registered</p>
      }
    </div>
  );
};

export default OrganizationListComponent;
