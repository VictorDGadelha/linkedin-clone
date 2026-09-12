import Link from "next/link";

export default function VagaNotFound() {
  return (
    <div className="card-conteudo" style={{ textAlign: "center", padding: "40px 20px" }}>
      <h2 className="titulo-principal">404 - Vaga não encontrada</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "1.1rem" }}>
        Desculpe, a vaga que você tentou acessar não existe ou já foi preenchida.
      </p>
      <Link href="/vagas" className="botao botao-primario">
        Ver todas as vagas
      </Link>
    </div>
  );
}
