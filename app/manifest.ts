import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Luxmi InvestCare",
        short_name: "Luxmi",
        description:
            "AMFI Registered Mutual Fund Distributor helping investors pursue long-term financial goals.",

        start_url: "/",

        display: "standalone",

        background_color: "#ffffff",

        theme_color: "#047857",

        icons: [
            {
                src: "/images/favicon.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
    };
}