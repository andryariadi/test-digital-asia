import Footer from "@/components/Footer";
import Navbar from "@/components/NavbarUser";
import { getUser } from "@/lib/actions/auth.action";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  console.log({ user }, "<---userLayout");
  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}
