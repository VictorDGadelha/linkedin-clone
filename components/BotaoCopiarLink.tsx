"use client";

// FRENTE 1 · Componente de Cliente
// Utiliza "use client" porque acessa APIs exclusivas do navegador (navigator.clipboard e location.href)
// e guarda o estado temporário do clique para fornecer feedback imediato.

import { useState } from "react";

export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          setCopiado(true);
          // Opcional: resetar após alguns segundos se desejado, mas o padrão do curso é manter ou alternar
        }
      }}
      className="botao-copiar-link"
      style={{
        padding: "8px 14px",
        borderRadius: "20px",
        border: "1px solid var(--border-color, #444)",
        backgroundColor: copiado ? "#1a3a2a" : "transparent",
        color: copiado ? "#5fd08a" : "var(--text-color, #f3f0fa)",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "16px",
        transition: "all 0.2s ease",
      }}
    >
      {copiado ? `✓ Link de “${titulo}” copiado` : "🔗 Copiar link da vaga"}
    </button>
  );
}

