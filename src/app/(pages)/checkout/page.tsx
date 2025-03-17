"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Footer from "@/components/Footer";
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Product {
  id: number;
  name: string;
  description: string;
  link: string;
  thumbnail: string;
  buylink: string;
  price: number;
  secondaryImage?: string;
}

interface ProductDetails {
  products: Product[];
}

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams ? searchParams.get("productId") : null;
  const dataSource = searchParams ? searchParams.get("source") : null;
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize as null
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [validCoupons, setValidCoupons] = useState<any[]>([]); // Changed to any[] to accommodate coupon objects
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (dataSource === 'influ-1') {
        const { default: data } = await import('@/data/influence/influ-1.json');
        setProductDetails(data);
      } else if (dataSource === 'product_details') {
        const { default: data } = await import('@/data/product_details.json');
        setProductDetails(data);
      }else if (dataSource === 'RIM689') {
        const { default: data } = await import('@/data/influence/RIM689.json');
        setProductDetails(data);
      }else if (dataSource === 'SAL100') {
        const { default: data } = await import('@/data/influence/SAL100.json');
        setProductDetails(data);
      }
    };

    fetchProductDetails();
    const intervalId = setInterval(fetchProductDetails, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [dataSource]);

  useEffect(() => {
    if (productDetails && productId) {
      const foundProduct = productDetails.products.find((p: Product) => p.id === parseInt(productId as string));
      setProduct(foundProduct || null);
    }
  }, [productDetails, productId]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('/api/getCoupons');
        setValidCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
    const intervalId = setInterval(fetchCoupons, 30000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    const matchedCoupon = validCoupons && validCoupons.find(coupon => coupon.coupon === couponCode);
    if (matchedCoupon) {
      setDiscount(parseFloat(matchedCoupon.discountPer) / 100); // Use discountPer from coupon object
    } else {
      setDiscount(0);
    }
  }, [couponCode, validCoupons]);

  useEffect(() => {
    const priceAfterDiscountValue = product?.price ? product.price * (1 - discount) : 0;
    const totalPriceValue = priceAfterDiscountValue * quantity;
    const discountedPriceValue = product?.price ? product.price * quantity * (1 - discount) : 0;

    setPriceAfterDiscount(priceAfterDiscountValue);
    setTotalPrice(totalPriceValue);
    setDiscountedPrice(discountedPriceValue);
  }, [discount, quantity, product]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get('/api/getProductDetails', { params: { productId } });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
    const intervalId = setInterval(fetchProductDetails, 1000); // Fetch every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [productId]);
  
  const handleSuccess = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const pincode = (document.getElementById("pincode") as HTMLInputElement).value;
    const city = (document.getElementById("city") as HTMLInputElement).value;
    const state = (document.getElementById("state") as HTMLInputElement).value;
    const country = (document.getElementById("country") as HTMLInputElement).value;
    const size = (document.getElementById("size") as HTMLInputElement).value;

    if (!name) {
      alert("Please enter your Name.");
      return;
    }
    if (!email) {
      alert("Please enter your Email.");
      return;
    }
    if (!phone) {
      alert("Please enter your Phone Number.");
      return;
    }
    if (!address) {
      alert("Please enter your Shipping Address.");
      return;
    }
    if (!pincode) {
      alert("Please enter your Pincode.");
      return;
    }
    if (!city) {
      alert("Please enter your City.");
      return;
    }
    if (!state) {
      alert("Please enter your State.");
      return;
    }
    if (!country) {
      alert("Please enter your Country.");
      return;
    }
     if (!size) {
      alert("Please select a Size.");
      return;
    }

    const orderDetails = {
      productId,
      productName: product?.name || 'Product Name Not Available',
      quantity,
      totalPrice: discountedPrice,
      email,
      name,
      phone,
      address,
      pincode,
      city,
      state,
      country,
      size,
      couponCode, // Include the coupon code in the order details
    };

    try {
      console.log('Creating order with details:', orderDetails);
      // Create order before invoking Razorpay
      const { data } = await axios.post('/api/createOrder', orderDetails);
      console.log('Order created:', data);

      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: "Artemyx",
        description: "Payment for Artemyx product",
        order_id: data.id,
        handler: async (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) => {
          console.log('Payment successful:', response);
          await axios.post('/api/saveOrder', {
            ...orderDetails,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          await axios.post('/api/sendEmail', { email: orderDetails.email, orderDetails });
        },
        prefill: {
          name: orderDetails.name,
          email: orderDetails.email,
          contact: orderDetails.phone,
        },
        notes: {
          address: orderDetails.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log('Opening Razorpay with options:', options);
      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Razorpay script not loaded');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-black py-12 pt-36 dark:bg-grid-[#e4dcc7]/[0.09]">
        <h1 className="text-lg md:text-6xl text-center font-sans font-bold mb-2 text-[#e4dcc7]">Checkout</h1>
        <div className="flex justify-center">
          <CardContainer className="inter-var m-4">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#e4dcc7]/[0.2] dark:bg-black dark:border-[#e4dcc7]/[0.4] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]"
              >
                {product?.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-[#e4dcc7]"
              >
                {product?.description}
              </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={dataSource === 'product_details' ? product?.thumbnail || "" : product?.secondaryImage || product?.thumbnail || ""}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-2xl"
                  alt="thumbnail" />
                </CardItem>
              <div className="flex justify-between items-center mt-20">
                {/* <CardItem
                  translateZ={20}
                  as="a"
                  href={product.link}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-[#e4dcc7]"
                >
                  AR →
                </CardItem> */}
                <CardItem
                  translateZ={20}
                  as="a"
                  href={product?.buylink}
                  target="__blank"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]"
                >
                  ₹ {product?.price}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
        {/* <div className="flex justify-center mt-8">
          <div className="w-full max-w-lg bg-gray-50 dark:bg-black p-6 rounded-xl border border-[#e4dcc7]/[0.4]">
            <h2 className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]">Product Summary</h2>
            <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">{product?.name}</p>
            <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Quantity: {quantity}</p>
            <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Price per item: ₹ {priceAfterDiscount.toFixed(2)}</p>
            <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Total Price: ₹ {totalPrice.toFixed(2)}</p>
            <Image
              src={product?.thumbnail}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl mt-4"
              alt="thumbnail" />
          </div>
        </div> */}
        <div className="flex justify-center mt-8">
          <form className="w-full max-w-lg bg-gray-50 dark:bg-black p-6 rounded-xl border border-[#e4dcc7]/[0.4]">
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="name"
                type="text"
                placeholder="Your Name"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="email"
                type="email"
                placeholder="Your Email"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="phone"
                type="text"
                placeholder="Your Phone Number"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="address">
                Shipping Address
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="address"
                type="text"
                placeholder="Address with Landmark"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="pincode">
                Pincode
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="pincode"
                type="text"
                placeholder="Pincode"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="city"
                type="text"
                placeholder="City"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="state"
                type="text"
                placeholder="State"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="country"
                type="text"
                placeholder="Country"
                defaultValue="India"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsedQuantity = value === "" ? 1 : parseInt(value);
                  setQuantity(parsedQuantity);
                  
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="size">
                Size
              </label>
              <select
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="size"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  
                }}
              >
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-[#e4dcc7] text-sm font-bold mb-2" htmlFor="coupon">
                Coupon Code
              </label>
              <input
                className="w-full px-3 py-2 text-black dark:text-[#e4dcc7] bg-white dark:bg-[#141218] border border-[#e4dcc7]/[0.4] rounded"
                id="coupon"
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  
                }}
              />
            </div>
            
            <div className="w-full max-w-lg bg-gray-50 dark:bg-black p-6 rounded-xl border border-[#e4dcc7]/[0.4]">
              <h2 className="text-xl font-bold text-neutral-600 dark:text-[#e4dcc7]">Product Summary</h2>
              <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">{product?.name}</p>
              <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Quantity: {quantity}</p>
              <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Price per item: ₹ {priceAfterDiscount.toFixed(2)}</p>
              <p className="text-neutral-500 text-sm mt-2 dark:text-[#e4dcc7]">Total Price: ₹ {discountedPrice.toFixed(2)}</p>
              {/* <Image
                src={product?.thumbnail}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl mt-4"
                alt="thumbnail" /> */}
            </div>
            <br />
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-[#141218] dark:text-[#e4dcc7] text-[white] text-xs font-bold border border-[#e4dcc7]/[0.4]"
                onClick={handleSuccess}
                
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
