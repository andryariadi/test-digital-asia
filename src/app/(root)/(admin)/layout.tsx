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

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />

      {/* Navbar and Content */}
      <div className="w-full max-w7xl pl-[10rem] lg:pl-[12rem] xl:pl-[16.5rem]">
        <NavbarAdmin user={user} />
        {children}
      </div>
    </div>
  );
}
