
"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  PiggyBank,
  ShieldCheck,
  GraduationCap,
  Users,
} from "lucide-react";

const services = [
  {
    icon: Landmark,
    title: "Mutual Funds",
    description:
      "Learn about mutual fund products, scheme features, investment concepts and market risks. Review the relevant scheme documents before investing.",
  },
  {
    icon: PiggyBank,
    title: "SIP Investments",
    description:
      "Understand Systematic Investment Plans, regular contributions, investment frequency and the effect of time and market fluctuations.",
  },
  {
    icon: GraduationCap,
    title: "Investor Education",
    description:
      "Explore educational resources about mutual funds, inflation, diversification, risk and investing terminology.",
  },
  {
    icon: Users,
    title: "Investor Support",
    description:
      "Get general assistance with mutual fund product information, application processes and investor documentation.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-semibold text-green-700">
            OUR SERVICES
          </span>

          <h2 className="section-title mt-8">
            Information. Education.
            <span className="block text-green-700">
              Investor Support.
            </span>
          </h2>

          <p className="section-subtitle mx-auto">
            Explore mutual fund distribution information,
            investor education and general product support.
            Understand the features and risks before investing.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="card flex h-full flex-col p-8"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm leading-6 text-slate-700">
            Luxmi InvestCare is an AMFI-registered Mutual Fund
            Distributor, ARN: 365140. Educational illustrations
            are hypothetical and do not guarantee performance.
            Mutual Fund investments are subject to market risks,
            read all scheme related documents carefully.
          </p>
        </div>
      </div>
    </section>
  );
}
