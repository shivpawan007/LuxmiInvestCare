import PlatformNav from "@/components/platform/PlatformNav";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PlatformNav />
      <main>{children}</main>
    </div>
  );
}
