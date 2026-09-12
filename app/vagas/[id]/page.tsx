import { notFound } from "next/navigation";
import Link from "next/link";
import { vagas } from "@/data/vagas";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vaga = vagas.find((v) => v.id === id);
  if (!vaga) return { title: "Vaga não encontrada" };
  return { title: `${vaga.titulo} | Leque de Vagas` };
}

export default async function PaginaDaVaga({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    notFound();
  }

  return (
    <article className="card-conteudo">
      <div style={{ marginBottom: "24px" }}>
        <Link href="/vagas" className="link-voltar">
          ← Voltar para listagem
        </Link>
      </div>

      <span className="badge">{vaga.area}</span>
      <h1 className="titulo-secao">{vaga.titulo}</h1>
      
      <div className="vaga-infos" style={{ marginBottom: "24px", color: "var(--text-muted)" }}>
        <p><strong>Empresa:</strong> <Link href={`/empresas/${vaga.empresaSlug}`} className="link-externo">{vaga.empresa}</Link></p>
        <p><strong>Senioridade:</strong> {vaga.senioridade}</p>
        <p><strong>Local:</strong> {vaga.local}</p>
        <p><strong>Aceita Iniciante:</strong> {vaga.aceitaIniciante ? "Sim ✅" : "Não ❌"}</p>
      </div>

      <div className="texto-sobre">
        <h2>Descrição da vaga</h2>
        <p>{vaga.descricao}</p>
      </div>
    </article>
  );
}
