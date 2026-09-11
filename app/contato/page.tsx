import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Leque de Vagas",
  description: "Canais de contato e redes do projeto",
};

export default function ContatoPage() {
  return (
    <section className="card-conteudo">
      <Link href="/" className="link-voltar">
        ← Voltar para o Início
      </Link>

      <span className="badge">Conecte-se</span>
      <h1 className="titulo-secao">Canais de Contato</h1>

      <p className="descricao">
        Quer trocar uma ideia sobre o projeto, networking ou desenvolvimento web? Sinta-se à vontade para entrar em contato com a equipe através dos canais abaixo:
      </p>

      <div className="grid-contatos">
        <div className="card-item">
          <h3>🐙 GitHub</h3>
          <p>Acompanhe os repositórios da equipe e nossas contribuições de código aberto.</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-externo"
          >
            Visitar GitHub ↗
          </a>
        </div>

        <div className="card-item">
          <h3>💼 LinkedIn</h3>
          <p>Conecte-se conosco profissionalmente e confira nossas atualizações de carreira.</p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-externo"
          >
            Conectar no LinkedIn ↗
          </a>
        </div>

        <div className="card-item">
          <h3>✉️ E-mail</h3>
          <p>Para dúvidas, parcerias e feedbacks sobre o projeto.</p>
          <span className="info-texto">contato@lequedevagas.com</span>
        </div>
      </div>

      <div className="acoes" style={{ marginTop: "32px" }}>
        <Link href="/" className="botao botao-primario">
          Voltar para Home
        </Link>
        <Link href="/sobre" className="botao botao-secundario">
          Sobre o Projeto
        </Link>
      </div>
    </section>
  );
}

