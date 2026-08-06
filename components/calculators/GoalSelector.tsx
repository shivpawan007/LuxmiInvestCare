"use client";

import {
    Home,
    GraduationCap,
    Plane,
    Car,
    Briefcase,
    Heart,
} from "lucide-react";

interface GoalSelectorProps {
    selectedGoal: string;
    onSelect: (goal: string) => void;
}

const goals = [
    {
        id: "house",
        title: "Dream Home",
        icon: <Home size={28} />,
    },
    {
        id: "education",
        title: "Child Education",
        icon: <GraduationCap size={28} />,
    },
    {
        id: "retirement",
        title: "Retirement",
        icon: <Briefcase size={28} />,
    },
    {
        id: "car",
        title: "New Car",
        icon: <Car size={28} />,
    },
    {
        id: "vacation",
        title: "Vacation",
        icon: <Plane size={28} />,
    },
    {
        id: "wealth",
        title: "Wealth Creation",
        icon: <Heart size={28} />,
    },
];

export default function GoalSelector({
    selectedGoal,
    onSelect,
}: GoalSelectorProps) {
    return (
        <section className="mt-16">

            <h2 className="text-3xl font-bold text-slate-900">
                Choose Your Financial Goal
            </h2>

            <p className="mt-3 text-slate-600">
                Select a goal to start planning your investments.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        onClick={() => onSelect(goal.id)}
                        className={`rounded-3xl border p-8 transition-all duration-300 ${selectedGoal === goal.id
                                ? "border-green-700 bg-green-50 shadow-lg"
                                : "border-slate-200 hover:border-green-400 hover:shadow-md"
                            }`}
                    >
                        <div className="mb-5 text-green-700">
                            {goal.icon}
                        </div>

                        <h3 className="text-xl font-semibold">
                            {goal.title}
                        </h3>
                    </button>
                ))}

            </div>

        </section>
    );
}