import React from 'react';

const PaymentGateway: React.FC = () => {
  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: 50000, // amount in the smallest currency unit
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: function (response: { razorpay_payment_id: any; }) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Your Address'
      },
      theme: {
        color: '#F37254'
      }
    };
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentGateway;
