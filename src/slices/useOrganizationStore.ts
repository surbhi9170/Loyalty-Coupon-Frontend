import { create } from 'zustand';
import { ethers } from 'ethers';
import loyaltyCouponAbi from './../constants/artifacts/LoyaltyCoupon.json'; 
import { envConfig } from '../config';
import { useEthersProvider } from '../hooks/useEthersProvider';

const contractAddress = envConfig.loyaltyContract;

interface OrganizationState {
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
  organizationName: string;
  setOrganizationName: (name: string) => void;
  createOrganization: (name: string) => Promise<void>;
  fetchOrganizations: () => Promise<void>;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  isLoading: false,
  isAdmin: false,
  error: null,
  organizationName: '',

  // Set organization name
  setOrganizationName: (name: string) => {
    set({ organizationName: name });
  },

  // Create an organization function interacting with the smart contract
  createOrganization: async (name: string,provider : any) => {
    set({ isLoading: true, error: null });

    try {
     
      if (!provider) {
        throw new Error("No provider found, please connect your wallet.");
      }

      const signer = provider.getSigner();

      const loyaltyCouponContract = new ethers.Contract(
        contractAddress,
        loyaltyCouponAbi.abi,
        signer
      );

      // Send the transaction to create an organization
      const tx = await loyaltyCouponContract.createOrganization(name);
      console.log('Transaction sent:', tx);
      set({ isLoading: false, isAdmin: true, organizationName: name });

      // Wait for the transaction to be mined and confirmed
      const receipt = await tx.wait(); 
      console.log('Transaction mined:', receipt);

      set({ isLoading: false, isAdmin: true, organizationName: name });
      console.log("Organization created successfully");

    } catch (error: any) {
      console.error("Error creating organization:", error);
      set({ isLoading: false, error: error.message || "Failed to create organization" });
    }
  },

  // fetch organization details
  fetchOrganizations: async (provider: any,address: string) => {
    set({ isLoading: true, error: null });

    try {
      // const provider = useEthersProvider();
      if (!provider) {
        throw new Error("No provider found, please connect your wallet.");
      }

      // Get the signer (the connected wallet)
      const signer = provider.getSigner();


      const loyaltyCouponContract = new ethers.Contract(
        contractAddress,
        loyaltyCouponAbi.abi,
        signer
      );


      // Fetch organizations from the contract
      const orgs = await loyaltyCouponContract.organizations(address)
      console.log(loyaltyCouponContract)
      set({ organizations: orgs, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching organizations:", error);
      set({ isLoading: false, error: error.message || "Failed to fetch organizations" });
    }
  },

   // Create a coupon by calling the smart contract
   createCoupon: async (discountAmount: number, provider: any) => {
    set({ isLoading: true, error: null });
    
    try {
      if (!provider) {
        throw new Error("No provider found, please connect your wallet.");
      }

      // Get the signer (the connected wallet)
      const signer = provider.getSigner();

      const loyaltyCouponContract = new ethers.Contract(
        contractAddress,
        loyaltyCouponAbi.abi,
        signer
      );

      const tx = await loyaltyCouponContract.createCoupon(discountAmount);
      await tx.wait(); // Wait for the transaction to be mined

      const couponId = await loyaltyCouponContract.couponCounter();
      console.log("Coupon created",couponId)

      // Optionally: update local state with newly created coupon
      set((state) => ({
        coupons: [...state.coupons, { id: tx.hash, discountAmount }],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Assign a coupon by calling the smart contract
  claimCoupon: async (couponId: number, provider: any) => {
    set({ isLoading: true, error: null });
    
    try {
      if (!provider) {
        throw new Error("No provider found, please connect your wallet.");
      }

      // Get the signer (the connected wallet)
      const signer = provider.getSigner();

      const loyaltyCouponContract = new ethers.Contract(
        contractAddress,
        loyaltyCouponAbi.abi,
        signer
      );

      console.log(Number(couponId))
      const tx = await loyaltyCouponContract.claimCoupon(couponId);
      await tx.wait(); // Wait for the transaction to be mined

      set((state) => ({
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

   // Redeem a coupon to a user by calling the smart contract
   redeemCoupon: async (couponId: number, provider: any) => {
    set({ isLoading: true, error: null });
    
    try {
      if (!provider) {
        throw new Error("No provider found, please connect your wallet.");
      }

      // Get the signer (the connected wallet)
      const signer = provider.getSigner();

      const loyaltyCouponContract = new ethers.Contract(
        contractAddress,
        loyaltyCouponAbi.abi,
        signer
      );

      console.log(Number(couponId))
      const tx = await loyaltyCouponContract.redeemCoupon(couponId);
      await tx.wait(); // Wait for the transaction to be mined

      set((state) => ({
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));