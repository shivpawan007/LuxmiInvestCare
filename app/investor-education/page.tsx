"use client";

import {
  BookOpen,
  TrendingUp,
  PiggyBank,
  PieChart,
  ShieldCheck,
  Target,
  Calculator,
  ArrowRight,
} from "lucide-react";

const topics = [
  {
    icon: BookOpen,
    title: "Start Early",
    description:
      "Starting early gives investments more time to participate in long-term market growth and can help build disciplined investing habits.",
  },
  {
    icon: TrendingUp,
    title: "Stay Invested",
    description:
      "Long-term investing can help investors stay focused on their investment horizon instead of reacting to short-term market movements.",
  },
  {
    icon: PiggyBank,
    title: "SIP Discipline",
    description:
      "Systematic Investment Plans encourage regular investing and can help investors develop consistent investing habits over time.",
  },
  {
    icon: PieChart,
    title: "Diversification",
    description:
      "Diversification across suitable investments may help reduce the impact of individual investment risks.",
  },
  {
    icon: ShieldCheck,
    title: "Understand Risk",
    description:
      "Every investment carries risk. Understanding the product, market risks and relevant documents is important before investing.",
  },
  {
    icon: Target,
    title: "Investment Objectives",
    description:
      "Investors can consider their financial objectives, investment horizon and circumstances when learning about investment options.",
  },
];

const calculators = [
  {
    title: "SIP Calculator",
    description:
      "Explore an illustrative SIP investment projection using your selected assumptions.",
    href: "/calculators/sip",
  },
  {
    title: "Lumpsum Calculator",
    description:
      "Explore an illustrative one-time investment projection over your selected period.",
    href: "/calculators/lumpsum",
  },
  {
    title: "SWP Calculator",
    description:
      "Explore an illustrative withdrawal scenario and its effect on a projected corpus.",
    href: "/calculators/swp",
  },
  {
    title: "Step-Up SIP",
    description:
      "Explore how increasing a SIP contribution periodically may affect an illustrative projection.",
    href: "/calculators/step-up-sip",
  },
  {
    title: "Goal Planner",
    description:
      "Explore the effect of inflation, time horizon and investment assumptions on a selected objective.",
    href: "/calculators/goal-planner",
  },
  {
    title: "Child Education Planner",
    description:
      "Explore an illustrative future education-cost and investment requirement calculation.",
    href: "/calculators/education",
  },
];

export default function InvestorEducationPage() {
  return (
    <main className="bg-white">

      {/* =====================================================
                HERO
            ====================================================== */}
      <section className="relative overflow-hidden bg-green-950 py-24 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_45%)]" />

        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-green-700/30 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="container-custom relative z-10">

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-green-300/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
              <BookOpen className="h-5 w-5 text-green-300" />
              Investor Education
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
              Learn Before You
              <span className="block text-green-300">
                Invest
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 lg:text-xl">
              Build your understanding of investing through
              simple educational concepts covering SIPs,
              diversification, risk, time horizon and
              disciplined investing.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
                LEARNING TOPICS
            ====================================================== */}
      <section className="section bg-slate-50">

        <div className="container-custom">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
              LEARNING TOPICS
            </span>

            <h2 className="section-title mt-6">
              Understand The Basics
              <span className="block text-green-700">
                Step by Step
              </span>
            </h2>

            <p className="section-subtitle mx-auto">
              Explore key concepts that can help you better
              understand investment products, investing
              behaviour and market risks.
            </p>

          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <article
                  key={topic.title}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-7 text-2xl font-bold text-slate-900">
                    {topic.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {topic.description}
                  </p>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
                INVESTOR REMINDER
            ====================================================== */}
      <section className="section bg-white">

        <div className="container-custom">

          <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-xl lg:p-12">

            <div className="grid items-center gap-10 lg:grid-cols-2">

              <div>

                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                  INVESTOR AWARENESS
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight">
                  Knowledge Today.
                  <span className="block">
                    Confidence Tomorrow.
                  </span>
                </h2>

                <p className="mt-6 text-lg leading-8 text-green-50">
                  Informed investing is supported by
                  education, discipline and patience
                  rather than reacting to short-term
                  market movements.
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">

                <h3 className="mb-5 text-2xl font-bold">
                  Investor Reminder
                </h3>

                <ul className="space-y-4 text-green-50">
                  <li>
                    • Understand the purpose of an
                    investment before investing.
                  </li>
                  <li>
                    • Consider your investment horizon
                    and circumstances.
                  </li>
                  <li>
                    • Understand the risks associated
                    with the product.
                  </li>
                  <li>
                    • Read scheme and product documents
                    carefully.
                  </li>
                  <li>
                    • Use investor education resources
                    whenever you need clarity.
                  </li>
                </ul>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
                INTERACTIVE CALCULATORS
            ====================================================== */}
      <section className="section bg-slate-50">

        <div className="container-custom">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
              INTERACTIVE TOOLS
            </span>

            <h2 className="section-title mt-6">
              Learn Through
              <span className="block text-green-700">
                Illustrations
              </span>
            </h2>

            <p className="section-subtitle mx-auto">
              Use the interactive calculators to explore how
              time, investment amount, inflation, withdrawals
              and assumed returns can affect illustrative
              projections.
            </p>

          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {calculators.map((calculator) => (
              <article
                key={calculator.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Calculator className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {calculator.title}
                </h3>

                <p className="mt-3 flex-1 leading-7 text-slate-600">
                  {calculator.description}
                </p>

                <a
                  href={calculator.href}
                  className="mt-6 inline-flex items-center font-semibold text-green-700 transition hover:text-green-800"
                >
                  Open Calculator
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

              </article>
            ))}

          </div>

          <div className="mt-10 text-center">
            <a
              href="/calculators"
              className="inline-flex items-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Explore All Calculators
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* =====================================================
                CONTACT CTA
            ====================================================== */}
      <section className="section bg-white">

        <div className="container-custom">

          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center lg:p-12">

            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
              NEED MORE INFORMATION?
            </span>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 lg:text-4xl">
              Continue Your Investor Education Journey
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-600">
              Explore the educational resources and
              illustrations, or contact Luxmi InvestCare
              for information related to the products and
              concepts you are exploring.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <a
                href="/calculators"
                className="inline-flex items-center rounded-xl bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Explore Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center rounded-xl border border-green-700 bg-white px-7 py-3 font-semibold text-green-700 transition hover:bg-green-50"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
                DISCLAIMER
            ====================================================== */}
      <section className="bg-slate-50 pb-20">

        <div className="container-custom">

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 lg:p-10">

            <h2 className="text-xl font-bold text-slate-900">
              Investor Education Disclaimer
            </h2>

            <p className="mt-4 max-w-5xl leading-8 text-slate-700">
              This information is provided solely for investor
              education and awareness purposes. Calculator
              illustrations are based on assumptions entered
              by the user and actual outcomes may differ.
              Mutual Fund investments are subject to market
              risks. Please read all scheme-related documents
              carefully before investing. Past performance may
              or may not be sustained in the future and should
              not be used as the sole basis for investment
              decisions.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}