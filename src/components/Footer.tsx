import React from 'react';

function Footer() {
    return (
        <footer className='bg-black text-gray-400 py-32 dark:bg-black dark:bg-grid-white/[0.07] '>
            <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8'>
                <div className='p-4'>
                    <h3 className='text-white mb-4'>Company</h3>
                    <ul>
                        <li><a href='https://example.com/about' className='hover:text-white'>About Us</a></li>
                        <li><a href='https://example.com/careers' className='hover:text-white'>Careers</a></li>
                        <li><a href='https://example.com/press' className='hover:text-white'>Press</a></li>
                    </ul>
                </div>
                <div className='p-4'>
                    <h3 className='text-white mb-4'>Support</h3>
                    <ul>
                        <li><a href='https://example.com/help' className='hover:text-white'>Help Center</a></li>
                        <li><a href='https://example.com/contact' className='hover:text-white'>Contact Us</a></li>
                        <li><a href='https://example.com/faqs' className='hover:text-white'>FAQs</a></li>
                    </ul>
                </div>
                <div className='p-4'>
                    <h3 className='text-white mb-4'>Legal</h3>
                    <ul>
                        <li><a href='https://example.com/privacy' className='hover:text-white'>Privacy Policy</a></li>
                        <li><a href='https://example.com/terms' className='hover:text-white'>Terms of Service</a></li>
                        <li><a href='https://example.com/cookies' className='hover:text-white'>Cookie Policy</a></li>
                    </ul>
                </div>
                <div className='p-4'>
                    <h3 className='text-white mb-4'>Follow Us</h3>
                    <ul className='flex space-x-4'>
                        <li><a href='https://example.com/facebook' className='hover:text-white'>Facebook</a></li>
                        <li><a href='https://example.com/twitter' className='hover:text-white'>Twitter</a></li>
                        <li><a href='https://example.com/instagram' className='hover:text-white'>Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className='text-center mt-20 text-gray-500 align-center justify-center'>
                &copy; {new Date().getFullYear()} MirrAR. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;