// FRENTE 1 · sem estado e SEM "use client".
// Este componente é um Server Component puro: recebe a vaga por prop e gera HTML estático,
// sem incluir JavaScript extra no pacote do cliente.

import Link from "next/link";
import type { Vaga } from "@/lib/tipos";

export default function CardDeVaga({ vaga }: { vaga: Vaga }) {
  return (
    <li className="card-item" style={{ listStyle: "none" }}>
      <Link href={`/vagas/${vaga.id}`} className="link-vaga">
        <h3>{vaga.titulo}</h3>
        <p className="infos-card">
          <span>{vaga.empresa}</span> · <span>{vaga.area}</span> · <span>{vaga.senioridade}</span> · <span>{vaga.local}</span>
        </p>
      </Link>
      {vaga.aceitaIniciante && <span className="selo">aceita iniciante</span>}
    </li>
  );
}

