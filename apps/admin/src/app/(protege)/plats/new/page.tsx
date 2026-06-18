import { PlatForm } from "@/components/plat-form";

export const dynamic = "force-dynamic";

export default function NouveauPlatPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Nouveau plat</h1>
      <PlatForm />
    </div>
  );
}
