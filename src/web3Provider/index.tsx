import { WagmiProvider } from 'wagmi';
import { queryClient, wagmiConfig } from './wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={midnightTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
