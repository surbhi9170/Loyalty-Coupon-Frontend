import { QueryClient } from '@tanstack/react-query';
import { createConfig } from 'wagmi';
//import { injectedWithFallback } from './injectedWithFallback';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rabbyWallet,
  trustWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  SUPPORTED_MAINNET_CHAINS,
  SUPPORTED_TESTNET_CHAINS,
  TRANSPORT_CHAINID,
} from '../constants/chain';
import { envConfig } from '../config';

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        trustWallet,
        rabbyWallet,
        coinbaseWallet,
      ],
    },
  ],
  { appName: 'Loyalty Coupon', projectId: envConfig.wallectConnectProjectId }
);

export const wagmiConfig = createConfig({
  chains: [...SUPPORTED_MAINNET_CHAINS, ...SUPPORTED_TESTNET_CHAINS],
  connectors: connectors,
  transports: TRANSPORT_CHAINID,
});

export const queryClient = new QueryClient();
