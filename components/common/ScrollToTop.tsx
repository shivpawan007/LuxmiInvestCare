"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
        fixed
        bottom-28
        right-6
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-slate-900
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:bg-slate-800
      "
        >
            <ChevronUp className="h-7 w-7" />
        </button>
    );
}