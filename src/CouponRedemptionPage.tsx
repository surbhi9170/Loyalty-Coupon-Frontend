import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from './hooks/useAccount';
import { useEthersProvider } from './hooks/useEthersProvider';
import { useOrganizationStore } from './slices/useOrganizationStore';

const CouponRedemptionPage: React.FC = () => {
  const { couponId } = useParams<{ couponId: string }>();
  const navigate = useNavigate();
  const { chainId, address } = useAccount();
  const provider = useEthersProvider({ chainId });
  const { claimCoupon, isLoading, error } = useOrganizationStore();

  const handleRedeemCoupon = async () => {
    console.log(`Redeeming coupon with ID: ${couponId}`);
    try{
        await claimCoupon(couponId,provider);
    }catch(error){
        console.log(error)
    }
    
    // if(tx){
    //      // After redemption, you can navigate back to the previous page or a success page
    //     alert(`Coupon ${couponId} redeemed successfully!`);
    //     navigate('/');
    // }
  };

  return (
    <div>
      <h1>Coupon Redemption</h1>
      <p>Coupon ID: {couponId}</p>
      <button onClick={handleRedeemCoupon}>Redeem Coupon</button>
    </div>
  );
};

export default CouponRedemptionPage;

