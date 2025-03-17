"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '@/lib/api-config';

interface Order {
  _id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  productName: string; // Added productName
  couponCode?: string; // Added coupon
  size?: string;

}

interface Coupon {
  _id: string;
  name: string;
  discountPer: string;
  coupon: string;
  size?: string;
}

const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'orders' | 'coupons'>('coupons');
  const [newCoupon, setNewCoupon] = useState<Coupon>({ _id: '', name: '', discountPer: '', coupon: '', size: 'small' });
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [editedCoupon, setEditedCoupon] = useState<Coupon | null>({ _id: '', name: '', discountPer: '', coupon: '', size: 'small' });

  // Function to refresh orders and coupons with better error handling and status updates
  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Refreshing data at:", new Date().toISOString());
      
      // Separate the requests to handle individual failures
      try {
        const ordersResponse = await apiClient.get('/api/getOrders', {
          params: { _nocache: Date.now() } // Force fresh data
        });
        
        if (ordersResponse.data) {
          setOrders(ordersResponse.data);
          console.log(`Retrieved ${ordersResponse.data.length} orders`);
        }
      } catch (orderErr) {
        console.error("Error fetching orders:", orderErr);
      }
      
      try {
        const couponsResponse = await apiClient.get('/api/getCoupons', {
          params: { _nocache: Date.now() } // Force fresh data
        });
        
        if (couponsResponse.data) {
          setCoupons(couponsResponse.data);
          console.log(`Retrieved ${couponsResponse.data.length} coupons`);
        }
      } catch (couponErr) {
        console.error("Error fetching coupons:", couponErr);
      }
    } catch (err: any) {
      console.error("General error refreshing data:", err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data load
    refreshData();
    
    // Set up real-time polling with better interval management
    const intervalId = setInterval(refreshData, 3000); // Poll every 3 seconds
    
    // Set up focus detection to refresh data when tab becomes active
    const handleFocus = () => {
      console.log("Window focused, refreshing data");
      refreshData();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleEdit = (order: Order) => {
    setEditingOrderId(order._id);
    setEditedOrder({ ...order });
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditedOrder(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!editedOrder) return;

    try {
      const { _id, ...updateData } = editedOrder; // Exclude _id from the update payload
      await axios.put(`/api/updateOrder/${_id}`, updateData);
      await refreshData();
      setEditingOrderId(null);
      setEditedOrder(null);
    } catch (err: any) {
      setError((err as any).message || 'Failed to update order');
      console.error("Update order failed:", err); // Log the error for debugging
    }
  };

  const handleAddCoupon = async () => {
    try {
      setLoading(true);
      console.log("Attempting to add coupon:", newCoupon);
      const response = await apiClient.post('/api/createCoupons', newCoupon);
      console.log("Coupon added successfully:", response.data);
      
      // Immediately refresh data to show the new coupon
      await refreshData();
      
      // Reset form
      setNewCoupon({ _id: '', name: '', discountPer: '', coupon: '', size: 'small' });
    } catch (err: any) {
      console.error("Error adding coupon:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      }
      setError(err.message || 'Failed to add coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      setLoading(true);
      console.log("Attempting to delete coupon with ID:", id);
      
      const deleteUrl = `/api/createCoupons/${id}`;
      const response = await apiClient.delete(deleteUrl);
      console.log("Coupon deleted successfully:", response.data);
      
      // Immediately refresh data to update the table
      await refreshData();
    } catch (err: any) {
      console.error("Error deleting coupon:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      }
      setError(err.message || 'Failed to delete coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCouponId(coupon._id);
    setEditedCoupon({ ...coupon });
  };

  const handleCancelEditCoupon = () => {
    setEditingCouponId(null);
    setEditedCoupon(null);
  };

  const handleInputChangeCoupon = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editedCoupon) {
      setEditedCoupon({ ...editedCoupon, [name]: value });
    }
  };

  const handleSaveCoupon = async () => {
    if (!editedCoupon) return;

    try {
      setLoading(true);
      const { _id, ...updateData } = editedCoupon;
      console.log("Updating coupon with ID:", _id);
      
      const putUrl = `/api/createCoupons/${_id}`;
      const response = await apiClient.put(putUrl, updateData);
      console.log("Coupon updated successfully:", response.data);
      
      // Immediately refresh data
      await refreshData();
      
      // Reset state
      setEditingCouponId(null);
      setEditedCoupon(null);
    } catch (err: any) {
      console.error("Update coupon failed:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      }
      setError(err.message || 'Failed to update coupon');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredCoupons = coupons.filter(coupon =>
    Object.values(coupon).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black py-12 pt-15 dark:bg-grid-[#e4dcc7]/[0.09]">
      <h1 className="text-lg md:text-4xl lg:text-6xl text-center font-sans font-bold mb-4 text-[#e4dcc7]">Admin Page</h1>

      <div className="flex justify-center mb-4">
        <button
          className={`px-2 md:px-4 py-1 md:py-2 rounded-xl ${activeTab === 'orders' ? 'bg-gray-50 dark:bg-[#141218] dark:text-[#e4dcc7] text-[black]' : 'bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white]'} text-xs font-bold border border-[#e4dcc7]/[0.4]`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <div className='p-2'></div>
        <button
          className={`px-2 md:px-4 py-1 md:py-2 rounded-xl ${activeTab === 'coupons' ? 'bg-gray-50 dark:bg-[#141218] dark:text-[#e4dcc7] text-[black]' : 'bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white]'} text-xs font-bold border border-[#e4dcc7]/[0.4]`}
          onClick={() => setActiveTab('coupons')}
        >
          Coupons
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 text-xs md:text-base"
        />
      </div>
      <br />

      <div className="overflow-x-auto px-10">
        {activeTab === 'orders' ? (
          <table className="min-w-full bg-gray-50 dark:bg-black dark:border-[#e4dcc7]/[0.4] border-black/[0.1] rounded-xl border-collapse text-xs md:text-sm">
            <thead>
              <tr className="text-xs">
                <th className="px-2 py-1 border border-gray-300">Order ID</th>
                <th className="px-2 py-1 border border-gray-300">Product ID</th>
                <th className="px-2 py-1 border border-gray-300">ProductName</th>
                <th className="px-2 py-1 border border-gray-300">Quantity</th>
                <th className="px-2 py-1 border border-gray-300">Total Price</th>
                <th className="px-2 py-1 border border-gray-300">Email</th>
                <th className="px-2 py-1 border border-gray-300">Name</th>
                <th className="px-2 py-1 border border-gray-300">Phone</th>
                <th className="px-2 py-1 border border-gray-300">Address</th>
                <th className="px-2 py-1 border border-gray-300">Pincode</th>
                <th className="px-2 py-1 border border-gray-300">City</th>
                <th className="px-2 py-1 border border-gray-300">State</th>
                <th className="px-2 py-1 border border-gray-300">Country</th>
                <th className="px-2 py-1 border border-gray-300">Coupon</th>
                <th className="px-2 py-1 border border-gray-300">Size</th>
                <th className="px-2 py-1 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id} className="text-center">
                  {editingOrderId === order._id ? (
                    <>
                      <td className="px-1 py-1 border border-gray-300">{order._id}</td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="productId"
                          value={editedOrder?.productId || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="productName"
                          value={editedOrder?.productName || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="number"
                          name="quantity"
                          value={editedOrder?.quantity || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="number"
                          name="totalPrice"
                          value={editedOrder?.totalPrice || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="email"
                          name="email"
                          value={editedOrder?.email || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="name"
                          value={editedOrder?.name || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="phone"
                          value={editedOrder?.phone || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="address"
                          value={editedOrder?.address || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="pincode"
                          value={editedOrder?.pincode || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="city"
                          value={editedOrder?.city || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="state"
                          value={editedOrder?.state || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="country"
                          value={editedOrder?.country || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                       <td className="px-1 py-1 border border-gray-300">
                        <input
                          type="text"
                          name="coupon"
                          value={editedOrder?.couponCode || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                         <input
                          type="text"
                          name="size"
                          value={editedOrder?.size || ''}
                          onChange={handleInputChange}
                          className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                        />
                      </td>
                      <td className="px-1 py-1 border border-gray-300">
                        <button onClick={handleSave} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Save</button>
                      <button onClick={handleCancelEdit} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-1 py-1 border border-gray-300">{order._id}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.productId}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.productName}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.quantity}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.totalPrice}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.email}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.name}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.phone}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.address}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.pincode}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.city}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.state}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.country}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.couponCode}</td>
                      <td className="px-1 py-1 border border-gray-300">{order.size}</td>
                      <td className="px-1 py-1 border border-gray-300">
                        <button onClick={() => handleEdit(order)} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="overflow-x-auto lg:px-20">
            <table className="min-w-full bg-gray-50 dark:bg-black dark:border-[#e4dcc7]/[0.4] border-black/[0.1] rounded-xl border-collapse text-xs md:text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 border border-gray-300">Coupon ID</th>
                  <th className="px-2 py-1 border border-gray-300">Name</th>
                  <th className="px-2 py-1 border border-gray-300">Discount</th>
                  <th className="px-2 py-1 border border-gray-300">Code</th>
                  {/* <th className="px-2 py-1 border border-gray-300">Size</th> */}
                  <th className="px-2 py-1 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map(coupon => (
                  <tr key={coupon._id} className="text-center">
                    {editingCouponId === coupon._id ? (
                      <>
                        <td className="px-1 py-1 border border-gray-300">{coupon._id}</td>
                        <td className="px-1 py-1 border border-gray-300">
                          <input
                            type="text"
                            name="name"
                            value={editedCoupon?.name || ''}
                            onChange={handleInputChangeCoupon}
                            className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                          />
                        </td>
                        <td className="px-1 py-1 border border-gray-300">
                          <input
                            type="text"
                            name="discountPer"
                            value={editedCoupon?.discountPer || ''}
                            onChange={handleInputChangeCoupon}
                            className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                          />
                        </td>
                        <td className="px-1 py-1 border border-gray-300">
                          <input
                            type="text"
                            name="coupon"
                            value={editedCoupon?.coupon || ''}
                            onChange={handleInputChangeCoupon}
                            className="bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 rounded px-1 py-0.5 text-xs"
                          />
                        </td>
                        {/* <td className="px-1 py-1 border border-gray-300">
                          <select
                            name="size"
                            value={editedCoupon?.size || 'small'}
                            onChange={handleInputChangeCoupon}
                            className="px-2 py-1 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 text-xs"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra large">Extra Large</option>
                          </select>
                        </td> */}
                        <td className="px-1 py-1 border border-gray-300">
                          <button onClick={handleSaveCoupon} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Save</button>
                          <button onClick={handleCancelEditCoupon} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-1 py-1 border border-gray-300">{coupon._id}</td>
                        <td className="px-1 py-1 border border-gray-300">{coupon.name}</td>
                        <td className="px-1 py-1 border border-gray-300">{coupon.discountPer}</td>
                        <td className="px-1 py-1 border border-gray-300">{coupon.coupon}</td>
                        {/* <td className="px-1 py-1 border border-gray-300">{coupon.size}</td> */}
                        <td className="px-1 py-1 border border-gray-300">
                          <button onClick={() => handleEditCoupon(coupon)} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Edit</button>
                          <button onClick={() => handleDeleteCoupon(coupon._id)} className="px-2 py-1 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {activeTab === 'coupons' && (
        <div className="mt-4 justify-center flex flex-col items-center">
          <br />
          <h2 className="text-base md:text-lg font-bold mb-2 text-[#e4dcc7]">Add New Coupon</h2>
          
          <input
            type="text"
            placeholder="Name"
            value={newCoupon.name}
            onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
            className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 mb-2 text-xs"
          />
          <input
            type="text"
            placeholder="Discount"
            value={newCoupon.discountPer}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountPer: e.target.value })}
            className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 mb-2 text-xs"
          />
          <input
            type="text"
            placeholder="Code"
            value={newCoupon.coupon}
            onChange={(e) => setNewCoupon({ ...newCoupon, coupon: e.target.value })}
            className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 mb-2 text-xs"
          />
          {/* <select
            value={newCoupon.size}
            onChange={(e) => setNewCoupon({ ...newCoupon, size: e.target.value })}
            className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-gray-50 dark:bg-black dark:text-[#e4dcc7] border border-gray-300 mb-2 text-xs"
          ></select>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra large">Extra Large</option>
          </select> */}
          <button onClick={handleAddCoupon} className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]">Add Coupon</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
