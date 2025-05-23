// import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-rose-600 flex flex-row min-h-screen">
      <Sidebar />

      {/* Navbar and Content */}
      <div className="bg-cyan-500 w-full max-w-7xl">
        <NavbarAdmin />
        {children}
      </div>
    </div>
  );
}
