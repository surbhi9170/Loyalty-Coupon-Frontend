import { http } from 'wagmi';
import {
  blastSepolia,
} from 'wagmi/chains';
import { envConfig } from '../config';

export const SUPPORTED_MAINNET_CHAINS = [
] as const;

export const SUPPORTED_TESTNET_CHAINS = [
  blastSepolia,
] as const;

export const SUPPORTED_CHAINS = [
  ...SUPPORTED_MAINNET_CHAINS,
  ...SUPPORTED_TESTNET_CHAINS,
] as const;

export const TRANSPORT_CHAINID = {
  //mainnet
  [blastSepolia.id]: http(),
};

export type AllowedChainId =
  | 1
  | 168587773
  | undefined;

// have to check

type ExtractObject<
  TObject extends Record<string, unknown>,
  TNarrowedObject extends Partial<TObject>,
> = Extract<TObject, TNarrowedObject>;

export type SupportedInterfaceChain<
  partialChain extends Partial<(typeof SUPPORTED_CHAINS)[number]> = Partial<
    (typeof SUPPORTED_CHAINS)[number]
  >,
> = ExtractObject<(typeof SUPPORTED_CHAINS)[number], partialChain>;

export type SupportedInterfaceChainId = SupportedInterfaceChain['id'];

type ChainInfo = SupportedInterfaceChain & {
  RPC: string[];
};

type NetworkConfig = {
  readonly [chainId in SupportedInterfaceChainId]: ChainInfo;
};

export const NETWORK_CONFIGS: NetworkConfig = {
  // Testnet
  [blastSepolia.id]: {
    ...blastSepolia,
    RPC: [envConfig.rpcUrl],
  },
} as const;

export function getNetworkConfig(
  chainId: SupportedInterfaceChainId
): ChainInfo | undefined {
  const config = NETWORK_CONFIGS[chainId];

  if (!config) return undefined; // this case can only ever occure when a wallet is connected with a unknown chainId which will not allow interaction

  return config;
}
