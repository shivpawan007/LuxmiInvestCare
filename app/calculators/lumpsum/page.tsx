//import LumpsumCalculator from "@/components/calculators/LumpsumCalculator";
import LumpsumCalculator from "../../../components/calculators/LumpsumCalculator";

export const metadata = {
    title: "Lumpsum Calculator | Luxmi InvestCare",
    description:
        "Estimate the future value of your one-time investment using our Lumpsum Calculator.",
};

export default function LumpsumPage() {
    return <LumpsumCalculator />;
}