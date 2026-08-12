"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    formatter?: (value: number) => string;
}

export default function AnimatedCounter({
    value,
    duration = 1200,
    formatter = (v) => v.toLocaleString("en-IN"),
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;

            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <>{formatter(Math.round(count))}</>;
}