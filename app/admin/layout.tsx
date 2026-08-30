import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminHeader />

            <main className="min-h-screen bg-slate-50">
                {children}
            </main>
        </>
    );
}