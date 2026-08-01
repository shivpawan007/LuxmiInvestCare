interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

export default function SectionHeading({
    title,
    subtitle,
    center = true,
}: SectionHeadingProps) {
    return (
        <div className={center ? "text-center mb-12" : "mb-12"}>
            <h2 className="text-4xl font-bold text-gray-900">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-4 max-w-3xl text-lg text-gray-600 mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}