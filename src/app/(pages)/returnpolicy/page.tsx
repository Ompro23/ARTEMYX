"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ReturnPolicy: React.FC = () => {
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
                <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Please read our return policy carefully to understand the process and conditions for returns.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-10 max-w-3xl mx-auto text-left"
            >
                {/** Eligibility for Returns Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">1. Eligibility for Returns</h2>
                    <ul className="list-disc list-inside">
                        <li>Returns are accepted within seven (7) calendar days of delivery, provided the items are proven to be defective.</li>
                        <li>Defective items include: 
                            <ul className="list-disc list-inside ml-4">
                                <li>Errors in design or print quality.</li>
                                <li>Manufacturing defects.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                {/** Proof Requirements Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">2. Proof Requirements</h2>
                    <p className="mb-1">Customers must provide clear evidence of the defect, including an unboxing video, to validate their claim.</p>
                </section>

                {/** Handling Size Issues Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">3. Handling Size Issues</h2>
                    <ul className="list-disc list-inside">
                        <li>In cases where the delivered product does not match the requested size, the platform will provide an additional article in the correct size at no extra cost.</li>
                        <li>Customers may retain or return the incorrect size article, subject to case-specific decisions.</li>
                    </ul>
                </section>

                {/** Non-Returnable Items Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">4. Non-Returnable Items</h2>
                    <p className="mb-1">Individually customized articles are non-returnable and non-refundable.</p>
                </section>

                {/** Return Shipping and Charges Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">5. Return Shipping and Charges</h2>
                    <p className="mb-1">The platform will cover all freight charges associated with returning defective items.</p>
                </section>

                {/** Technical Support for AR Features Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">6. Technical Support for AR Features</h2>
                    <p className="mb-1">In the event of any technical issues related to AR features, customers can report the problem, and the platform will resolve it within three (3) working days.</p>
                </section>

                {/** Initiating a Return or Complaint Section **/}
                <section>
                    <h2 className="text-2xl font-semibold mb-2">7. Initiating a Return or Complaint</h2>
                    <ul className="list-disc list-inside">
                        <li>Customers can initiate a return or lodge a complaint through a simple message on WhatsApp or Instagram.</li>
                        <li>Our support team will guide customers through the process and ensure swift resolution.</li>
                    </ul>
                </section>
            </motion.div>
        </div>
    );
};

export default ReturnPolicy;
