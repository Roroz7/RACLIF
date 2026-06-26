import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Menu } from "lucide-react";

export const metadata = {
  title: 'Admin Panel - Raclif',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:hidden bg-[#111118] shrink-0">
          <div className="text-xl font-bold font-outfit text-primary">RACLIF.ADMIN</div>
          <button className="p-2 bg-white/5 rounded-lg text-white">
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
