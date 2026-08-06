"use client";

import { useState } from "react";
import GoalSelector from "./GoalSelector";
import GoalInputs from "./GoalInputs";
import GoalResults from "./GoalResults";

export default function GoalPlanner() {

    const [goal, setGoal] = useState("house");
    const [targetAmount, setTargetAmount] = useState(5000000);
    const [years, setYears] = useState(15);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [inflation, setInflation] = useState(6);

    return (

        <section className="container-custom py-20">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-5xl font-bold text-center">
                    Goal Planner
                </h1>

                <p className="mt-4 text-center text-slate-600">
                    Select your financial goal to begin planning.
                </p>

                <GoalSelector
                    selectedGoal={goal}
                    onSelect={setGoal}
                />

                <GoalInputs
                    targetAmount={targetAmount}
                    setTargetAmount={setTargetAmount}
                    years={years}
                    setYears={setYears}
                    expectedReturn={expectedReturn}
                    setExpectedReturn={setExpectedReturn}
                    inflation={inflation}
                    setInflation={setInflation}
                />

                <GoalResults
                    targetAmount={targetAmount}
                    inflationAdjustedAmount={futureValue}
                    monthlySIP={monthlySIP}
                    lumpsumRequired={lumpsumRequired}
                />

    // useState

                const [goal, setGoal] = useState("house");

                const [targetAmount, setTargetAmount] = useState(5000000);
                const [years, setYears] = useState(15);
                const [expectedReturn, setExpectedReturn] = useState(12);
                const [inflation, setInflation] = useState(6);

                // ALL calculations here
                const futureValue =
                targetAmount * Math.pow(1 + inflation / 100, years);

                const monthlyRate = expectedReturn / 12 / 100;
                const months = years * 12;

                const monthlySIP =
                (futureValue * monthlyRate) /
                (Math.pow(1 + monthlyRate, months) - 1) /
                (1 + monthlyRate);

                const lumpsumRequired =
                futureValue /
                Math.pow(1 + expectedReturn / 100, years);

                return (
                <>
                    ...
                </>
                )


                // calculations

                const futureValue =
                targetAmount * Math.pow(1 + inflation / 100, years);

                const monthlyRate = expectedReturn / 12 / 100;
                const months = years * 12;

                const monthlySIP =
                futureValue *
                monthlyRate /
                (Math.pow(1 + monthlyRate, months) - 1) /
                (1 + monthlyRate);

                const lumpsumRequired =
                futureValue /
                Math.pow(1 + expectedReturn / 100, years);

            </div>

        </section>

    );

}   