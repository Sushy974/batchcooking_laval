import { notFound } from "next/navigation";

import { PlatForm } from "@/components/plat-form";
import { getPlatById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditPlatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plat = await getPlatById(id);
  if (!plat) notFound();

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Modifier : {plat.nom}
      </h1>
      <PlatForm plat={plat} />
    </div>
  );
}
