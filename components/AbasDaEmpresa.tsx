"use client";

import { useState } from "react";
import Link from "next/link";
import type { Empresa, Vaga } from "@/lib/tipos";

export default function AbasDaEmpresa({
  empresa,
  vagas,
}: {
  empresa: Empresa;
  vagas: Vaga[];
}) {
  const [aba, setAba] = useState("sobre");

  return (
    <div>
      <div className="abas">
        <button
          type="button"
          className={aba === "sobre" ? "aba ativa" : "aba"}
          onClick={() => setAba("sobre")}
        >
          Sobre
        </button>

        <button
          type="button"
          className={aba === "vagas" ? "aba ativa" : "aba"}
          onClick={() => setAba("vagas")}
        >
          Vagas ({vagas.length})
        </button>
      </div>

      {aba === "sobre" ? (
        <>
          <p>{empresa.sobre}</p>

          <p>
            <a
              href={empresa.site}
              target="_blank"
              rel="noopener noreferrer"
            >
              {empresa.site}
            </a>
          </p>
        </>
      ) : vagas.length === 0 ? (
        <p>Esta empresa não tem vaga aberta agora.</p>
      ) : (
        <ul className="lista">
          {vagas.map((vaga) => (
            <li key={vaga.id}>
              <Link href={`/vagas/${vaga.id}`}>
                {vaga.titulo}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}