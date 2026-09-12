"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card-conteudo" style={{ textAlign: "center", padding: "40px 20px" }}>
      <span className="badge" style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f", color: "white" }}>Erro interno</span>
      <h2 className="titulo-secao" style={{ marginTop: "16px" }}>Algo deu errado!</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
        Não conseguimos processar esta vaga no momento.
      </p>
      <button
        onClick={() => reset()}
        className="botao botao-primario"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
