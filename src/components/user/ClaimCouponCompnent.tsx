import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClaimCouponComponent: React.FC = () => {
    const [couponId, setCouponId] = useState('');

  const navigate = useNavigate();

  const handleClaimClick = () => {
    // You can redirect to a specific coupon ID page or handle it dynamically
    navigate(`/user/claim-coupon/${couponId}`); // Example coupon ID: 123
  };

  return (
    <div>
      <h1>Claim Your Coupon</h1>
      <div>
            <label htmlFor="couponId">Enter your coupon code:</label>
            <input
              type="number"
              id="couponId"
              value={couponId}
              onChange={(e) => setCouponId(e.target.value)}
              required
            />
          </div>
      <p>Click the button below to redeem your coupon.</p>
      <button onClick={handleClaimClick}>Go to Coupon Redemption Page</button>
    </div>
  );
};

export default ClaimCouponComponent;
