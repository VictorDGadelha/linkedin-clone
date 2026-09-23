"use client";

// FRENTE 1 · Componente de Cliente com estado booleano
// Primeira linha com "use client" pois este componente precisa escutar o clique
// do usuário no navegador e guardar na memória se a descrição está aberta ou recolhida.

import { useState } from "react";

// Constante fora do componente para não ser recriada a cada renderização
const LIMITE = 180;

export default function DescricaoDaVaga({ texto }: { texto: string }) {
  // A memória do componente: booleano (true para aberta, false para recolhida)
  const [aberta, setAberta] = useState(false);

  // Estados derivados: calculados diretamente a partir do texto e do estado.
  // NÃO criamos um segundo useState para guardar texto truncado ou flag de tamanho,
  // evitando sincronizações manuais e inconsistências de tela.
  const cabeInteira = texto.length <= LIMITE;
  const visivel = aberta || cabeInteira ? texto : texto.slice(0, LIMITE) + "…";

  return (
    <div className="descricao-vaga" style={{ marginTop: "16px", marginBottom: "20px" }}>
      <p style={{ lineHeight: "1.6", color: "var(--text-color, #e0e0e0)" }}>{visivel}</p>
      {!cabeInteira && (
        <button
          type="button"
          onClick={() => setAberta(!aberta)}
          className="botao-ver-mais"
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-color, #0a66c2)",
            cursor: "pointer",
            fontWeight: 600,
            padding: "4px 0",
            marginTop: "6px",
            fontSize: "0.95rem",
          }}
        >
          {aberta ? "ver menos ▲" : "ver mais ▼"}
        </button>
      )}
    </div>
  );
}

