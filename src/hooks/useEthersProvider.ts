import { Web3Provider } from '@ethersproject/providers';

import { useMemo } from 'react';
import type { Client, Transport } from 'viem';
import { useClient, useConnectorClient } from 'wagmi';
import { AllowedChainId, SupportedInterfaceChain } from '../constants/chain';

const providers = new WeakMap<Client, Web3Provider>();

function clientToProvider(
  client?: Client<Transport, SupportedInterfaceChain>,
  chainId?: number
) {
  if (!client) {
    return undefined;
  }
  const { chain, transport } = client;
  const network = chain
    ? {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts
          ? 'ensRegistry' in chain.contracts
            ? chain.contracts.ensRegistry?.address
            : undefined
          : undefined,
      }
    : chainId
      ? { chainId, name: 'Unsupported' }
      : undefined;
  if (!network) {
    return undefined;
  }

  if (providers?.has(client)) {
    return providers.get(client);
  } else {
    const provider = new Web3Provider(transport, network);
    providers.set(client, provider);
    return provider;
  }
}

/** Hook to convert a viem Client to an ethers.js Provider with a default disconnected Network fallback. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient({
    chainId: chainId as AllowedChainId,
  });
  const disconnectedClient = useClient({ chainId: chainId as AllowedChainId });
  return useMemo(
    () => clientToProvider(client ?? disconnectedClient, chainId),
    [chainId, client, disconnectedClient]
  );
}

/** Hook to convert a connected viem Client to an ethers.js Provider. */
export function useEthersWeb3Provider({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient({
    chainId: chainId as AllowedChainId,
  });
  return useMemo(() => clientToProvider(client, chainId), [chainId, client]);
}
