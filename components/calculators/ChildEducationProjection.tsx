"use client";

interface Props {
  currentAge: number;
  educationStartAge: number;
  currentEducationCost: number;
  educationInflation: number;
  futureEducationCost: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ChildEducationProjection({
  currentAge,
  educationStartAge,
  currentEducationCost,
  educationInflation,
  futureEducationCost,
}: Props) {
  const yearsToGoal = Math.max(1, educationStartAge - currentAge);

  const milestones = [
    {
      age: currentAge,
      years: 0,
      cost: currentEducationCost,
      label: "Today",
    },
    {
      age: Math.round(currentAge + yearsToGoal * 0.25),
      years: Math.round(yearsToGoal * 0.25),
      cost:
        currentEducationCost *
        Math.pow(1 + educationInflation / 100, yearsToGoal * 0.25),
      label: "25% of journey",
    },
    {
      age: Math.round(currentAge + yearsToGoal * 0.5),
      years: Math.round(yearsToGoal * 0.5),
      cost:
        currentEducationCost *
        Math.pow(1 + educationInflation / 100, yearsToGoal * 0.5),
      label: "Halfway",
    },
    {
      age: Math.round(currentAge + yearsToGoal * 0.75),
      years: Math.round(yearsToGoal * 0.75),
      cost:
        currentEducationCost *
        Math.pow(1 + educationInflation / 100, yearsToGoal * 0.75),
      label: "75% of journey",
    },
    {
      age: educationStartAge,
      years: yearsToGoal,
      cost: futureEducationCost,
      label: "Education begins",
    },
  ];

  const maxCost = futureEducationCost || currentEducationCost;

  return (
    <section className="mt-12">
      <div className="mb-8">
        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          EDUCATION COST PROJECTION
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          How Education Costs May Grow
        </h2>

        <p className="mt-2 max-w-3xl text-slate-600">
          This illustration shows how the current education cost may increase
          over time based on your selected education inflation assumption.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-7">
          {milestones.map((item) => {
            const width = Math.max(
              8,
              Math.min(100, (item.cost / maxCost) * 100)
            );

            return (
              <div key={`${item.age}-${item.years}`}>
                <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Age {item.age}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.label}
                      {item.years > 0
                        ? ` • ${item.years} ${
                            item.years === 1 ? "year" : "years"
                          } from now`
                        : ""}
                    </p>
                  </div>

                  <p className="font-bold text-green-700">
                    {formatCurrency(item.cost)}
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-semibold text-green-800">
            Planning Insight
          </p>

          <p className="mt-2 leading-7 text-slate-700">
            At an assumed education inflation rate of{" "}
            <strong>{educationInflation}%</strong>, an education cost of{" "}
            <strong>{formatCurrency(currentEducationCost)}</strong> today may
            require approximately{" "}
            <strong>{formatCurrency(futureEducationCost)}</strong> when your
            child reaches age <strong>{educationStartAge}</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
