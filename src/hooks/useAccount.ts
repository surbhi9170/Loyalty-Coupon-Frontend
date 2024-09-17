import {
    SupportedInterfaceChainId,
    getNetworkConfig,
  } from '../constants/chain';
  import { useMemo } from 'react';
  import {
    UseAccountReturnType as UseAccountReturnTypeWagmi,
    useAccount as useAccountWagmi,
  } from 'wagmi';
  import { envConfig } from '../config';
  
  type ReplaceChainId<T> = T extends { chainId: number }
    ? Omit<T, 'chainId'> & { chainId: SupportedInterfaceChainId }
    : T extends { chainId: number | undefined }
      ? Omit<T, 'chainId'> & { chainId: SupportedInterfaceChainId }
      : T;
  
  type UseAccountReturnType = ReplaceChainId<UseAccountReturnTypeWagmi>;
  
  export function useAccount(): UseAccountReturnType {
    const { chainId, ...rest } = useAccountWagmi();
    const config = getNetworkConfig(chainId as SupportedInterfaceChainId);
  
    return useMemo(
      () => ({
        ...rest,
        chainId: config
          ? config.id
          : (envConfig.chainId as SupportedInterfaceChainId),
      }),
      [rest, config]
    );
  }
  