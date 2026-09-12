import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vagas | Leque de Vagas",
  description: "Explore oportunidades na área de tecnologia.",
};

export default function VagasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="vagas-layout">
      <header className="vagas-header">
        <h2>🚀 Mural de Oportunidades</h2>
        <p className="text-subtle">Encontre a sua próxima oportunidade em tech.</p>
      </header>
      <div className="vagas-conteudo">
        {children}
      </div>
    </div>
  );
}
