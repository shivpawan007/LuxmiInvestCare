const services = [
    "Mutual Fund Investments",
    "SIP Planning",
    "Retirement Planning",
    "Child Education Planning",
    "Wealth Creation",
    "Goal-Based Investing",
];

export default function Services() {
    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-4xl font-bold">
                    Our Services
                </h2>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {services.map((service) => (
                        <div
                            key={service}
                            className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-lg"
                        >
                            <h3 className="text-xl font-semibold">
                                {service}
                            </h3>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}