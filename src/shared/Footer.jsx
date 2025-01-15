import React from 'react';
import logoImg from '../assets/logo1.png';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-10">
                <div className="container mx-auto flex justify-between">
                    {/* Logo and Description */}
                    <div className='w-1/3'>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src={logoImg} alt="Logo" className="w-10 h-10" />
                            <h2 className="text-2xl font-semibold">Product Hunt</h2>
                        </div>
                        <p className="text-gray-400">
                            Product Hunt is a hub for all the latest products and trends. We are dedicated to providing quality service and the best user experience.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li className="flex items-center space-x-2">
                                <IoLocationOutline className="text-xl" />
                                <span>123 Main Street, City, Country</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <HiOutlinePhone className="text-xl" />
                                <span>+123 456 7890</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <HiOutlineMail className="text-xl" />
                                <span>support@yourwebsite.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex flex-col space-y-4">

                            <div
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-500 transition flex items-center gap-2"
                            >
                                <FaFacebookF className="text-2xl" />
                                <h3 className="">Facebook</h3>
                            </div>

                            <div
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition flex items-center gap-2"
                            >
                                <FaTwitter className="text-2xl" />
                                <h3 className="">Twitter</h3>
                            </div>

                            <div
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-pink-500 transition flex items-center gap-2"
                            >
                                <FaInstagram className="text-2xl" />
                                <h3 className="">Instagram</h3>
                            </div>

                            <div
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-700 transition flex items-center gap-2"
                            >
                                <FaLinkedin className="text-2xl" />
                                <h3 className="">Linkedin</h3>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} ProductHunt. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Footer;