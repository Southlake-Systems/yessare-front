import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-[#f8f9fa]">
        {children}
      </div>
    </div>
  );
}