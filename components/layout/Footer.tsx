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

const quickLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Investor Education", href: "/#investor-education" },
    { label: "Contact", href: "/#contact" },
];

const services = [
    "Mutual Funds",
    "SIP Planning",
    "Goal-Based Investing",
    "Portfolio Review",
    "Investor Education",
];

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">

            <div className="container-custom py-20">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Company */}

                    <div>

                        <Image
                            src="/images/Logo.png"
                            alt="Luxmi InvestCare"
                            width={150}
                            height={60}
                            priority
                            className="mb-6 h-auto w-auto"
                        />

                        <p className="leading-8 text-slate-300">
                            Helping investors pursue long-term financial goals through
                            investor education, disciplined investing and transparent
                            financial guidance.
                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-6 text-xl font-bold">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">

                            {quickLinks.map((link) => (

                                <li key={link.label}>

                                    <Link
                                        href={link.href}
                                        className="transition duration-300 hover:text-green-400"
                                    >
                                        {link.label}
                                    </Link>

                                </li>

                            ))}

                        </ul>

                    </div>

                    {/* Services */}

                    <div>

                        <h3 className="mb-6 text-xl font-bold">
                            Our Services
                        </h3>

                        <ul className="space-y-4 text-slate-300">

                            {services.map((service) => (

                                <li key={service}>
                                    {service}
                                </li>

                            ))}

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-6 text-xl font-bold">
                            Contact Us
                        </h3>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">

                                <Phone className="mt-1 h-5 w-5 text-green-400" />

                                <span>
                                    +91 9650060044
                                </span>

                            </div>

                            <div className="flex items-start gap-3">

                                <Mail className="mt-1 h-5 w-5 text-green-400" />

                                <span className="break-all">
                                    info@luxmiinvestcare.com
                                </span>

                            </div>

                            <div className="flex items-start gap-3">

                                <MapPin className="mt-1 h-5 w-5 text-green-400" />

                                <span>
                                    1063, D-Block,
                                    <br />
                                    Street-6,
                                    <br />
                                    Sanjay Enclave,
                                    <br />
                                    Faridabad – 121005
                                </span>

                            </div>

                        </div>

                        {/* Social Icons */}

                        <div className="mt-8 flex gap-5">

                            <a
                                href="https://www.facebook.com/luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="text-2xl transition duration-300 hover:scale-110 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.instagram.com/luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-2xl transition duration-300 hover:scale-110 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-2xl transition duration-300 hover:scale-110 hover:text-green-400" />
                            </a>

                            <a
                                href="https://www.youtube.com/@luxmiinvestcare"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-2xl transition duration-300 hover:scale-110 hover:text-green-400" />
                            </a>

                        </div>

                    </div>

                </div>

                {/* Divider */}

                <div className="mt-16 border-t border-slate-800 pt-10">

                    <p className="text-center text-sm leading-7 text-slate-400">
                        Mutual Fund investments are subject to market risks.
                        Please read all scheme-related documents carefully before
                        investing. The information provided on this website is
                        intended solely for investor education and awareness purposes.
                    </p>

                    <p className="mt-5 text-center text-sm font-medium text-green-400">
                        AMFI Registered Mutual Fund Distributor | ARN-365140
                    </p>

                    <p className="mt-3 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Luxmi InvestCare. All Rights Reserved.
                    </p>

                    <p className="mt-2 text-center text-xs text-slate-600">
                        Designed for Investor Education & Financial Awareness.
                    </p>

                </div>

            </div>

        </footer>
    );
}