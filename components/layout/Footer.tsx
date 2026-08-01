import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

                <div>
                    <h3 className="text-3xl font-bold text-green-400">
                        Luxmi InvestCare
                    </h3>

                    <p className="mt-4 text-slate-300">
                        Helping investors pursue long-term financial goals through
                        disciplined investing and investor education.
                    </p>
                </div>

                <div>
                    <h4 className="mb-5 font-semibold">
                        Quick Links
                    </h4>

                    <div className="space-y-3">

                        <Link href="/">Home</Link><br />
                        <Link href="/about">About</Link><br />
                        <Link href="/services">Services</Link><br />
                        <Link href="/contact">Contact</Link>

                    </div>
                </div>

                <div>
                    <h4 className="mb-5 font-semibold">
                        Contact
                    </h4>

                    <p>📞 +91 9650060044</p>

                    <p className="mt-2">
                        ✉ info@luxmiinvestcare.com
                    </p>

                    <p className="mt-2">
                        ARN : 365140
                    </p>
                </div>

            </div>

            <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
                © 2026 Luxmi InvestCare. All Rights Reserved.
                <br />
                AMFI Registered Mutual Fund Distributor | ARN-365140
            </div>

        </footer>
    );
}