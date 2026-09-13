import Link from "next/link";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        <Link href="/" className="logo">
           <span>Leque de Vagas</span>
        </Link>
        <nav className="navegacao">
          <Link href="/">Início</Link>
          <Link href="/vagas">Vagas</Link>
          <Link href="/sobre">Sobre o Projeto</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/empresas">Empresas</Link>
        </nav>
      </div>
    </header>
  );
}

