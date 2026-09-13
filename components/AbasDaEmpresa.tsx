// components/AbasDaEmpresa.tsx
"use client";

import { useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  empresaSlug: string;
  // adicione outros campos de vagas se necessário
};

type AbasDaEmpresaProps = {
  sobre: string;
  vagas: Vaga[];
};

export default function AbasDaEmpresa({ sobre, vagas }: AbasDaEmpresaProps) {
  // Estado único guardando o nome da aba ativa ("sobre" ou "vagas")
  const [aba, setAba] = useState<"sobre" | "vagas">("sobre");

  return (
    <div className="w-full mt-6">
      {/* Botões de navegação das abas */}
      <div className="flex border-b border-gray-200 gap-4 mb-4">
        <button
          onClick={() => setAba("sobre")}
          className={`pb-2 px-4 font-medium transition-colors border-b-2 ${
            aba === "sobre"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Sobre
        </button>

        <button
          onClick={() => setAba("vagas")}
          className={`pb-2 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            aba === "vagas"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <span>Vagas</span>
          {/* Contagem dinâmica vinda do tamanho do array, nunca de um useState */}
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {vagas.length}
          </span>
        </button>
      </div>

      {/* Conteúdo condicional baseado estritamente na string do estado */}
      <div className="py-4">
        {aba === "sobre" && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            <p>{sobre}</p>
          </div>
        )}

        {aba === "vagas" && (
          <div className="space-y-3">
            {vagas.length === 0 ? (
              <p className="text-gray-500 italic">Não há vagas abertas no momento.</p>
            ) : (
              vagas.map((vaga) => (
                <div
                  key={vaga.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-lg text-gray-900">{vaga.titulo}</h3>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}