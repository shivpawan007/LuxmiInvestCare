"use client";

import { useMemo, useState } from "react";

import GoalSelector from "./GoalSelector";
import GoalInputs from "./GoalInputs";
import GoalResults from "./GoalResults";
import GoalProjectionChart from "./GoalProjectionChart";

import { calculateGoal } from "@/lib/goal";

export default function GoalPlanner() {

    const [goal, setGoal] = useState("house");

    const [targetAmount, setTargetAmount] = useState(5000000);

    const [years, setYears] = useState(15);

    const [expectedReturn, setExpectedReturn] = useState(12);

    const [inflation, setInflation] = useState(6);

    const result = useMemo(
        () =>
            calculateGoal(
                targetAmount,
                years,
                expectedReturn,
                inflation
            ),
        [targetAmount, years, expectedReturn, inflation]
    );

    return (

        <section className="section bg-white">

            <div className="container-custom">

                {/* Heading */}

                <div className="mx-auto mb-14 max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">

                        GOAL PLANNER

                    </span>

                    <h1 className="section-title mt-6">

                        Plan Financial Goals

                        <span className="block text-green-700">

                            With Confidence

                        </span>

                    </h1>

                    <p className="section-subtitle">

                        Estimate the future cost of your financial goals after inflation
                        and calculate the SIP or lump sum investment required to achieve
                        them.

                    </p>

                </div>

                {/* Goal Selection */}

                <GoalSelector

                    selectedGoal={goal}

                    onSelect={setGoal}

                />

                {/* Inputs */}

                <div className="mt-10">

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

                </div>

                {/* Results */}

                <GoalResults

                    targetAmount={targetAmount}

                    inflationAdjustedAmount={result.futureValue}

                    monthlySIP={result.monthlySIP}

                    lumpsumRequired={result.lumpsumRequired}

                />
                <GoalProjectionChart
                    currentGoal={targetAmount}
                    futureGoal={result.futureValue}
                    monthlySIP={result.monthlySIP}
                    lumpsum={result.lumpsumRequired}
                />

            </div>

        </section>

    );

}