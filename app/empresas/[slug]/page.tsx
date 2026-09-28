// app/empresas/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import  { buscarEmpresa, listarEmpresas, listarVagas } from "@/lib/api";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({
    slug: empresa.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const empresa = await buscarEmpresa(slug);

  if (!empresa) {
    return {
      title: "Empresa não encontrada · Leque de Vagas",
    };
  }

  return {
    title: `${empresa.nome} · Leque de Vagas`,
    description: empresa.sobre.slice(0, 150),
  };
}

export default async function PaginaDaEmpresa({ params }: Props) {
  const { slug } = await params;

  const [empresa, vagas] = await Promise.all([
    buscarEmpresa(slug),
    listarVagas(),
  ]);

  if (!empresa) {
    notFound();
  }

  const vagasDaEmpresa = vagas.filter(
    (vaga) => vaga.empresaSlug === empresa.slug,
  );

  return (
    <section>
      <h1>{empresa.nome}</h1>

      <AbasDaEmpresa
        empresa={empresa}
        vagas={vagasDaEmpresa}
      />
    </section>
  );
}
