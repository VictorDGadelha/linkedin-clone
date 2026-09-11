import Link from "next/link";

export default function Home() {
  return (
    <section className="card-hero">
      <span className="badge">Desafio 01 · Introdução ao Next.js</span>
      <h1 className="titulo-principal">
        Bem-vindo ao <span className="destaque">Leque de Vagas</span>
      </h1>
      <p className="descricao">
        Este é o pontapé inicial do nosso projeto semestral. Uma plataforma pensada para conectar talentos e oportunidades na área de tecnologia, especialmente para quem está iniciando ou migrando de carreira.
      </p>

      <div className="acoes">
        <Link href="/sobre" className="botao botao-primario">
          Sobre o Projeto →
        </Link>
        <Link href="/contato" className="botao botao-secundario">
          Fale Conosco
        </Link>
      </div>

      <div className="grid-destaques">
        <div className="card-item">
          <h3>⚡ Next.js 16 (App Router)</h3>
          <p>Utilizando a versão mais moderna do framework com Turbopack e Server Components nativos.</p>
        </div>
        <div className="card-item">
          <h3>🧩 Componentes Reutilizáveis</h3>
          <p>O cabeçalho e rodapé foram criados uma única vez e reaproveitados em todas as rotas da aplicação.</p>
        </div>
        <div className="card-item">
          <h3>🚀 Deploy Contínuo</h3>
          <p>Preparado e otimizado para deploy imediato e sem atritos na Vercel.</p>
        </div>
      </div>
    </section>
  );
}
