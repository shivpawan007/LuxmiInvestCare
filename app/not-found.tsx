import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">

            <h1 className="text-5xl font-bold">
                404
            </h1>

            <p className="mt-4 text-slate-600">
                Page not found.
            </p>

            <Link
                href="/"
                className="mt-8 rounded-lg bg-green-700 px-6 py-3 text-white"
            >
                Go Home
            </Link>

        </div>
    );
}