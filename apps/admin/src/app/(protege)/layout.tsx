import { AdminNav } from "@/components/admin-nav";
import { Protege } from "@/components/protege";

export default function LayoutProtege({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protege>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 overflow-x-auto">{children}</main>
      </div>
    </Protege>
  );
}
