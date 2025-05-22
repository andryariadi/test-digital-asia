import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-cyan-500 min-h-screen flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
