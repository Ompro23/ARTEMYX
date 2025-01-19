"use client"
import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
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
                <h1 className="text-4xl font-bold mb-4 lg:mt-20 ">Terms and Conditions</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Please read our terms and conditions carefully before using our platform.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-10 max-w-3xl mx-auto text-left"
            >
                {/** User Responsibilities Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. User Responsibilities</h2>
                    <p className="mb-1">By accessing or using our platform, customers agree to comply with all applicable laws and regulations.</p>
                    <p>Customers must ensure the information provided during the checkout process is accurate and up-to-date.</p>
                </section>

                {/** Order Cancellations Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Order Cancellations</h2>
                    <p className="mb-1">Customers can cancel orders within three (3) calendar days of placing the order.</p>
                    <p>Upon successful cancellation, 95% of the total payment will be refunded to the original payment method. The remaining 5% will be deducted as processing and transaction fees to cover administrative costs.</p>
                </section>

                {/** Payments Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Payments</h2>
                    <p className="mb-1">The platform accepts payments via UPI, Netbanking, Debit Cards, Credit Cards, and Wallets.</p>
                    <p>All transactions are securely processed through third-party payment gateways to ensure the safety and confidentiality of customer data.</p>
                </section>

                {/** Shipping and Delivery Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Shipping and Delivery</h2>
                    <p className="mb-1">Orders are shipped in a batch process and delivered during the last week of each month.</p>
                    <p>Currently, the platform does not support international shipping.</p>
                </section>

                {/** Handling Defective Items Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Handling Defective Items</h2>
                    <p className="mb-1">Customers can report defective items by providing proof, such as an unboxing video, to validate their claim.</p>
                    <p className="mb-1">Defective items may include errors in design prints or manufacturing flaws.</p>
                    <p>The platform will bear the freight charges for returning defective items.</p>
                </section>

                {/** Ownership of Intellectual Property Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Ownership of Intellectual Property</h2>
                    <p className="mb-1">For influencer-designed drops, the ownership of the design and associated AR features remains with the influencer.</p>
                    <p>For other collections, all intellectual property rights are retained by the brand.</p>
                </section>

                {/** Technical Compatibility Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Technical Compatibility</h2>
                    <p>Customers must have devices capable of rendering 3D content or the Snapchat app installed to access and utilize AR features provided by the platform.</p>
                </section>

                {/** Limitation of Liability Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">8. Limitation of Liability</h2>
                    <p>ARTEMYX is not liable for any damages resulting from the use or inability to use our services.</p>
                </section>

                {/** Changes to Terms Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">9. Changes to Terms</h2>
                    <p>We reserve the right to update these Terms. Continued use of our services implies acceptance of changes.</p>
                </section>

                {/** Contact Us Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
                    <p>For questions about these Terms, please contact us through the &quot;Contact Us&quot; page or via email.</p>
                </section>
            </motion.div>
        </div>
    );
};

export default TermsAndConditions;
