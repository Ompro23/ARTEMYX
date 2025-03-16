import React from 'react';
import CouponManager from './CouponManager';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CouponManager />
      <ProductManager />
      <OrderManager />
    </div>
  );
};

export default AdminDashboard;
