"use client"
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="dark:bg-black dark:text-gray-100 bg-gray-50 text-gray-800 p-6 sm:p-8 md:p-12 lg:p-16 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="text-center mb-12 mt-16 lg:mt-10"
                >
                    <br />
                    <br />
                <h1 className="text-4xl font-bold mb-4 lg:mt-20 ">Privacy Policy</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Please read our privacy policy carefully to understand how we handle your information.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-10 max-w-3xl mx-auto text-left"
            >
                {/** Information We Collect Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                    <p className="mb-1">We collect the following personal information for order fulfillment and service improvement:</p>
                    <ul className="list-disc list-inside">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Instagram ID</li>
                        <li>Shipping Address with Pincode</li>
                        <li>Payment Details</li>
                        <li>Bank Account Details (for refunds, if applicable)</li>
                    </ul>
                </section>

                {/** How We Use Your Information Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                    <p className="mb-1">The data collected is used to:</p>
                    <ul className="list-disc list-inside">
                        <li>Provide personalized recommendations and product suggestions.</li>
                        <li>Notify customers about new drops, promotions, and marketing campaigns.</li>
                        <li>Facilitate order processing and dispatch notifications.</li>
                    </ul>
                </section>

                {/** Third-Party Services Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Third-Party Services</h2>
                    <p className="mb-1">We rely on third-party platforms for payment processing and customer relationship management (CRM).</p>
                    <p>These third parties comply with industry-standard security practices to safeguard customer data.</p>
                </section>

                {/** Cookies and Tracking Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking</h2>
                    <p className="mb-1">Cookies are used to enhance the user experience and improve the functionality of the platform.</p>
                    <p>Customers can modify their cookie preferences through browser settings.</p>
                </section>

                {/** Children’s Privacy Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Children’s Privacy</h2>
                    <p className="mb-1">Our platform is accessible to users under the age of 18. However, parental or guardian supervision is advised.</p>
                </section>

                {/** Data Retention Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Data Retention</h2>
                    <p className="mb-1">Customer data is stored for a maximum of one (1) year from the date of their last purchase.</p>
                    <p>Customers may request account deletion at any time, and all associated data will be permanently removed.</p>
                </section>

                {/** Security Measures Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Security Measures</h2>
                    <p>We implement robust security protocols, including encryption and distributed data management, to ensure the confidentiality and integrity of customer information.</p>
                </section>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
