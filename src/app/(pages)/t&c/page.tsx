import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="dark:bg-black dark:bg-grid-[#e4dcc7]/[0.09] p-4 sm:p-6 md:p-8 lg:p-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                    <p>Welcome to ARTEMYX! By accessing our website or using our AR fashion services, you agree to these Terms and Conditions.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">2. Use of Services</h2>
                    <p>You must be at least 13 years old to use our services.</p>
                    <p>Do not misuse our AR products or violate applicable laws.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">3. Purchases and Payments</h2>
                    <p>ARTEMYX does not handle payments directly on our website or app.</p>
                    <p>All transactions and payments are managed through our designated platform, DM2BUT.</p>
                    <p>Prices and availability are subject to change without notice.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
                    <p>All AR designs, trademarks, and content are owned by ARTEMYX. Unauthorized reproduction is prohibited.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">5. User Responsibilities</h2>
                    <p>Provide accurate personal information.</p>
                    <p>Use our AR products responsibly.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
                    <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
                    <p>ARTEMYX is not liable for any damages resulting from the use or inability to use our services.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
                    <p>We reserve the right to update these Terms. Continued use of our services implies acceptance of changes.</p>
                </section>
                <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
                    <p>For questions about these Terms, please contact us through sending email it in contact us</p>
                </section>
                
            </div>
        </div>
    );
};

export default TermsAndConditions;