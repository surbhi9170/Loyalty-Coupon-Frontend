export interface EnvConfig {
    wallectConnectProjectId: string;
    rpcUrl: string;
    chainId: number;
    loyaltyContract: string;
  }
  
  export const envConfig: EnvConfig = {
    wallectConnectProjectId: import.meta.env
      .VITE_WALLET_CONNECT_PROJECT_ID as string,
    rpcUrl: import.meta.env.VITE_BLAST_SEPOLIA_RPC_URL as string,
    chainId: import.meta.env.VITE_BLAST_CHAIN_ID as number,
    loyaltyContract: import.meta.env.VITE_LOYALTY_COUPON_CONTRACT_ADDRESS as string,
  };
  