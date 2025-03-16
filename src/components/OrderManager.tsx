import React, { useState } from 'react';

interface Order {
  id: string;
  product: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
  shippingAddress: string;
  name: string;
  contactNumber: string;
  email: string;
}

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({
    id: '',
    product: '',
    size: '',
    quantity: 1,
    price: 0,
    discount: 0,
    shippingAddress: '',
    name: '',
    contactNumber: '',
    email: ''
  });

  const handleAddOrder = () => {
    setOrders([...orders, newOrder]);
    setNewOrder({
      id: '',
      product: '',
      size: '',
      quantity: 1,
      price: 0,
      discount: 0,
      shippingAddress: '',
      name: '',
      contactNumber: '',
      email: ''
    });
  };

  return (
    <div>
      <h2>Order Management</h2>
      <input
        type="text"
        placeholder="Order ID"
        value={newOrder.id}
        onChange={(e) => setNewOrder({ ...newOrder, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product"
        value={newOrder.product}
        onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
      />
      <input
        type="text"
        placeholder="Size"
        value={newOrder.size}
        onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newOrder.quantity}
        onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newOrder.price}
        onChange={(e) => setNewOrder({ ...newOrder, price: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Discount"
        value={newOrder.discount}
        onChange={(e) => setNewOrder({ ...newOrder, discount: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Shipping Address"
        value={newOrder.shippingAddress}
        onChange={(e) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newOrder.name}
        onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={newOrder.contactNumber}
        onChange={(e) => setNewOrder({ ...newOrder, contactNumber: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newOrder.email}
        onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
      />
      <button onClick={handleAddOrder}>Add Order</button>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.id} - {order.product} - {order.size} - {order.quantity} - ${order.price} - {order.discount}% - {order.shippingAddress} - {order.name} - {order.contactNumber} - {order.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManager;
