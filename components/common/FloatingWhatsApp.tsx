"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/919650060044"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        bg-green-600
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:bg-green-700
      "
        >
            <MessageCircle className="h-8 w-8" />
        </a>
    );
}