// import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { getUser } from "@/lib/actions/auth.action";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  console.log({ user }, "<---userDashboardLayout");
  return (
    <div className="b-rose-600 flex flex-row min-h-screen">
      <Sidebar />

      {/* Navbar and Content */}
      <div className="b-cyan-500 w-full max-w-7xl">
        <NavbarAdmin user={user} />
        {children}
      </div>
    </div>
  );
}
