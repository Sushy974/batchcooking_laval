import type { Metadata } from "next";

import { ConfigForm } from "@/components/config-form";
import { getConfig } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Configuration — Admin" };

export default async function AdminConfigPage() {
  const config = await getConfig();

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Configuration</h1>
      <ConfigForm config={config} />
    </div>
  );
}
