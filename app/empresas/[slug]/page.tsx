// app/empresas/[slug]/page.tsx
import { empresas } from "@/data/empresas";
import { vagas } from "@/data/vagas";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EmpresaDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  // Acha a empresa específica pelo slug
  const empresa = empresas.find((e: { slug: string }) => e.slug === slug);

  if (!empresa) {
    notFound();
  }

  // Filtra as vagas daquela empresa
  const vagasDaEmpresa = vagas.filter(
    (vaga: { empresaSlug: string }) => vaga.empresaSlug === slug,
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{empresa.nome}</h1>
        {empresa.site && (
          <a
            href={empresa.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm mt-1 inline-block"
          >
            Visitar site oficial &rarr;
          </a>
        )}
      </div>

      {/* Renderiza o componente de abas client-side passando os dados */}
      <AbasDaEmpresa sobre={empresa.sobre} vagas={vagasDaEmpresa} />
    </main>
  );
}