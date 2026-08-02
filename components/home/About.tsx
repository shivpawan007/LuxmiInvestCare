import { BadgeCheck, Target, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <section
            id="about" className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-4xl font-bold">
                    Why Choose Luxmi InvestCare
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-center text-slate-600">
                    We help investors pursue long-term financial goals through
                    disciplined investing, investor education and informed
                    decision-making.
                </p>
                <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">

                    {/* Left Image */}

                    <div>
                        <Image
                            src="/images/office.jpg"
                            alt="Luxmi InvestCare Office"
                            width={650}
                            height={500}
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>

                    {/* Right Content */}

                    <div>

                        <div className="grid gap-6">

                            <div className="rounded-2xl border p-8 shadow-sm">
                                <BadgeCheck className="mb-5 h-10 w-10 text-green-700" />
                                <h3 className="text-xl font-bold">
                                    Investor Education
                                </h3>

                                <p className="mt-3 text-slate-600">
                                    We focus on investor awareness and financial literacy to help investors make informed investment decisions.
                                </p>
                            </div>

                            <div className="rounded-2xl border p-8 shadow-sm">
                                <TrendingUp className="mb-5 h-10 w-10 text-green-700" />
                                <h3 className="text-xl font-bold">
                                    Goal Based Planning
                                </h3>

                                <p className="mt-3 text-slate-600">
                                    We help clients invest systematically for retirement, children's education and wealth creation.
                                </p>
                            </div>

                            <div className="rounded-2xl border p-8 shadow-sm">
                                <Target className="mb-5 h-10 w-10 text-green-700" />
                                <h3 className="text-xl font-bold">
                                    Disciplined Investing
                                </h3>

                                <p className="mt-3 text-slate-600">
                                    Long-term investing with regular SIPs and diversified mutual fund portfolios.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}