import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useEthersProvider } from '../../hooks/useEthersProvider';
import { useOrganizationStore } from '../../slices/useOrganizationStore';

const RedeemCouponComponent: React.FC = () => {
  const [couponId, setCouponId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { redeemCoupon, isLoading, error } = useOrganizationStore();

  const {chainId} = useAccount();
  const provider = useEthersProvider({ chainId });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await redeemCoupon(couponId,provider);
        setSuccessMessage('Coupon redeemed successfully!');
        setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while redeeming the coupon.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Redeem Coupon</h1>
      {(
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="couponId">Enter your coupon Id :</label>
            <input
              type="text"
              id="couponId"
              value={couponId}
              onChange={(e) => setCouponId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Redeem Coupon</button>
        </form>
      )}

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default RedeemCouponComponent;
