// SEM "use client" — Página executada no servidor (Server Component).
// A página prepara os dados antes de enviar o HTML para o cliente,
// importando os componentes interativos necessários apenas nas folhas da árvore.

import { notFound } from "next/navigation";
import Link from "next/link";
import { vagas } from "@/data/vagas";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    <article className="card-conteudo" style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/vagas" className="link-voltar" style={{ textDecoration: "none", color: "var(--accent-color, #0a66c2)" }}>
          ← Voltar para listagem de vagas
        </Link>
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
        <span className="badge" style={{ backgroundColor: "#2d2250", color: "#a98ce0", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem" }}>
          {vaga.area}
        </span>
        {vaga.aceitaIniciante && (
          <span className="selo" style={{ backgroundColor: "#1e3a2f", color: "#5fd08a", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 600 }}>
            ★ aceita iniciante
          </span>
        )}
      </div>

      <h1 className="titulo-secao" style={{ fontSize: "2rem", marginBottom: "8px" }}>
        {vaga.titulo}
      </h1>

      <p style={{ color: "var(--text-muted, #999)", marginBottom: "16px", fontSize: "1.05rem" }}>
        <strong>
          <Link href={`/empresas/${vaga.empresaSlug}`} style={{ color: "inherit", textDecoration: "underline" }}>
            {vaga.empresa}
          </Link>
        </strong>{" "}
        · {vaga.senioridade} · {vaga.local}
      </p>

      {/* Componente de cliente: Botão de copiar link com memória */}
      <BotaoCopiarLink titulo={vaga.titulo} />

      <div style={{ marginTop: "16px", borderTop: "1px solid var(--border-color, #333)", paddingTop: "20px" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>Sobre a vaga</h2>
        {/* Componente de cliente: Descrição com expansão/recolhimento e estado derivado */}
        <DescricaoDaVaga texto={vaga.descricao} />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <Link
          href={`/empresas/${vaga.empresaSlug}`}
          style={{
            color: "var(--accent-color, #0a66c2)",
            textDecoration: "none",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Conheça mais sobre a {vaga.empresa} →
        </Link>
      </div>

      {/* Componente de cliente da Frente 3: Formulário de candidatura */}
      <section
        style={{
          borderTop: "1px solid var(--border-color, #333)",
          paddingTop: "24px",
          marginTop: "24px",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", marginBottom: "16px" }}>Candidatar-se a esta oportunidade</h2>
        <FormularioDeCandidatura tituloDaVaga={vaga.titulo} />
      </section>
    </article>
  );
}
