import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Equipe | Leque de Vagas",
  description: "Apresentação da equipe e expectativas para o projeto",
};

export default function SobrePage() {
  return (
    <section className="card-conteudo">
      <Link href="/" className="link-voltar">
        ← Voltar para o Início
      </Link>

      <span className="badge">Sobre o Projeto</span>
      <h1 className="titulo-secao">Conheça o Leque de Vagas</h1>

      <article className="texto-sobre">
        <h2>🌐 O que é a plataforma?</h2>
        <p>
          O <strong>Leque de Vagas</strong> é um portal focado em conectar oportunidades de tecnologia a profissionais em transição de carreira ou buscando suas primeiras experiências na área. 
          Criamos um ecossistema simplificado para que empresas encontrem os talentos certos e candidatos desenvolvam suas carreiras.
        </p>

        <h2>🎯 Nossa Missão</h2>
        <p>
          O mercado de tecnologia pode parecer fechado para quem está começando. Nosso objetivo é abrir portas. 
          A plataforma foi estruturada em módulos para garantir a melhor experiência possível:
        </p>

        <ul>
          <li><strong>Vagas:</strong> Divulgação clara de oportunidades, salários e requisitos;</li>
          <li><strong>Empresas:</strong> Espaço para organizações demonstrarem sua cultura e buscar talentos;</li>
          <li><strong>Pessoas e Candidaturas:</strong> Perfis otimizados para destacar o real potencial dos candidatos;</li>
          <li><strong>Busca e Números:</strong> Filtros inteligentes e métricas de mercado acessíveis a todos.</li>
        </ul>

        <h2>🚀 O Futuro</h2>
        <p>
          Esta plataforma está sendo construída com as melhores práticas de desenvolvimento web moderno usando Next.js.
          Acreditamos que a tecnologia deve ser usada para facilitar oportunidades e encurtar distâncias entre talentos e recrutadores.
        </p>
      </article>

      <div className="acoes" style={{ marginTop: "32px" }}>
        <Link href="/contato" className="botao botao-primario">
          Entre em Contato →
        </Link>
        <Link href="/" className="botao botao-secundario">
          Ir para a Home
        </Link>
      </div>
    </section>
  );
}
