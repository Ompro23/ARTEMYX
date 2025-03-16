import React from 'react';
import axios from 'axios';

const RazorpayButton = ({ amount, currency, onSuccess }: { amount: number, currency: string, onSuccess: () => void }) => {
  const handlePayment = async () => {
    const order = await axios.post('/api/createOrder', { amount, currency });
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: order.data.currency,
      order_id: order.data.id,
      handler: function (response: any) {
        onSuccess();
      },
      prefill: {
        name: "Om Vataliya",
        email: "omvataliya23@gmail.com",
        contact: "6351497589"
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="px-4 py-2 bg-black dark:bg-[#141218] text-white dark:text-[#e4dcc7] font-bold rounded border border-[#e4dcc7]/[0.4]">
      Complete Purchase
    </button>
  );
};

export default RazorpayButton;
