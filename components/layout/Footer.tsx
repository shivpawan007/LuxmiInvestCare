"use client";

import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
} from "lucide-react";

import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">

            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Company */}

                    <div>

                        <Image
                            src="/images/Logo.png"
                            alt="Luxmi InvestCare"
                            width={170}
                            height={60}
                            className="mb-5"
                        />

                        <p className="leading-7 text-slate-300">
                            Helping investors pursue long-term financial goals through
                            disciplined investing and investor education.
                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link href="#home" className="hover:text-green-400">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="#about" className="hover:text-green-400">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href="#services" className="hover:text-green-400">
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="#investor-education"
                                    className="hover:text-green-400"
                                >
                                    Investor Education
                                </Link>
                            </li>

                            <li>
                                <Link href="#contact" className="hover:text-green-400">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Services */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold text-white">
                            Our Services
                        </h3>

                        <ul className="space-y-3 text-slate-300">

                            <li>Mutual Funds</li>

                            <li>SIP Planning</li>

                            <li>Goal Based Investing</li>

                            <li>Retirement Planning</li>

                            <li>Investor Education</li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-lg font-bold">
                            Contact
                        </h3>

                        <div className="space-y-4">

                            <div className="flex gap-3">

                                <Phone className="mt-1 h-5 w-5 text-green-400" />

                                <span>+91 9650060044</span>

                            </div>

                            <div className="flex gap-3">

                                <Mail className="mt-1 h-5 w-5 text-green-400" />

                                <span>info@luxmiinvestcare.com</span>

                            </div>

                            <div className="flex gap-3">

                                <MapPin className="mt-1 h-5 w-5 text-green-400" />

                                <span>
                                    1063, D-Block,
                                    <br />
                                    Street-6, Sanjay Enclave,
                                    <br />
                                    Faridabad - 121005
                                </span>

                            </div>

                        </div>

                        <div className="mt-8 flex gap-4">

                            <a
                                href="https://www.facebook.com/luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook className="h-6 w-6 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.instagram.com/luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram className="h-6 w-6 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/LuxmiInvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin className="h-6 w-6 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.youtube.com/@LuxmiInvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube className="h-6 w-6 hover:text-green-400" />
                            </a>

                        </div>

                    </div>

                </div>

                {/* Disclaimer */}

                <div className="mt-12 border-t border-slate-700 pt-8">

                    <p className="text-center text-sm leading-7 text-slate-400">
                        Mutual Fund investments are subject to market risks. Read all
                        scheme related documents carefully before investing.
                    </p>

                    <p className="mt-4 text-center text-sm text-slate-500">
                        AMFI Registered Mutual Fund Distributor | ARN-365140
                    </p>

                    <p className="mt-2 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Luxmi InvestCare. All Rights Reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}