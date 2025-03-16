'use client';

import React, { useState, useEffect } from 'react';
import styles from './OrdersTable.module.css'; // Import the CSS module

interface Order {
    _id: string;
    razorpay_payment_id?: string;
    [key: string]: any;
}

const OrdersTable: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/getOrders');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (e: any) {
                setError(e.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-black py-12 pt-36 dark:bg-grid-[#e4dcc7]/[0.09]"> {/* Apply background styles */}
            <h1 className="text-lg md:text-6xl text-center font-sans font-bold mb-2 text-[#e4dcc7]">Orders</h1> {/* Add title */}
            <table className="w-full max-w-4xl mx-auto bg-gray-50 dark:bg-black border border-[#e4dcc7]/[0.4] rounded-xl"> {/* Apply table styles */}
                <thead className="bg-gray-200 dark:bg-[#141218]"> {/* Apply header styles */}
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        {orders.length > 0 && Object.keys(orders[0]).filter(key => key !== '_id').map(key => (
                            <th key={key} className="px-4 py-2">{key}</th>
                        ))}
                        <th className="px-4 py-2">Razorpay Payment ID</th> {/* New column */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className="border-t border-gray-200 dark:border-[#e4dcc7]/[0.4]"> {/* Apply row styles */}
                            <td className="px-4 py-2">{order._id}</td> {/* Apply cell styles */}
                            {Object.keys(order).filter(key => key !== '_id').map(key => (
                                <td key={key} className="px-4 py-2">{String(order[key])}</td>
                            ))}
                            <td className="px-4 py-2">{order.razorpay_payment_id}</td> {/* New cell */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
