import React, { useState } from 'react';

interface Coupon {
  code: string;
  discount: number;
}

const CouponManager: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState<Coupon>({ code: '', discount: 0 });

  const handleAddCoupon = () => {
    setCoupons([...coupons, newCoupon]);
    setNewCoupon({ code: '', discount: 0 });
  };

  return (
    <div>
      <h2>Coupon Management</h2>
      <input
        type="text"
        placeholder="Coupon Code"
        value={newCoupon.code}
        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
      />
      <input
        type="number"
        placeholder="Discount"
        value={newCoupon.discount}
        onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseFloat(e.target.value) })}
      />
      <button onClick={handleAddCoupon}>Add Coupon</button>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index}>{coupon.code} - {coupon.discount}%</li>
        ))}
      </ul>
    </div>
  );
};

export default CouponManager;
