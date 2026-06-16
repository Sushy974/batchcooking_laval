import type { Metadata } from "next";

import { oui } from "@/lib/format";
import { getAllPages } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Pages — Admin" };

export default async function AdminPagesPage() {
  const pages = await getAllPages();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
      <p className="mt-1 text-sm text-muted">{pages.length} pages</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-black/5 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Publiée</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium">{p.titre}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted">
                  {p.slug}
                </td>
                <td className="px-4 py-3 text-muted">{p.type_page}</td>
                <td className="px-4 py-3">{oui(p.publie)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
