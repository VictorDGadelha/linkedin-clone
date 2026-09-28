"use client";

import { useState } from "react";
import Filtros from "./Filtros";
import CardDeVaga from "./CardDeVaga"; 
import { Vaga } from "../data/vagas";

export default function MuralDeVagas({ vagas }: { vagas: Vaga[] }) {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("Todas");

  const areas = ["Todas", ...Array.from(new Set(vagas.map(v => v.area)))];

  const visiveis = vagas.filter((vaga) => {
    const bateBusca = vaga.titulo.toLowerCase().includes(busca.toLowerCase());
    const bateArea = area === "Todas" || vaga.area === area;
    return bateBusca && bateArea;
  });

  const aceitamIniciante = visiveis.filter(v => v.aceitaIniciante).length;

  return (
    <section>
      <Filtros 
        busca={busca} 
        aoMudarBusca={setBusca} 
        area={area} 
        aoMudarArea={setArea} 
        areas={areas} 
      />

      <div style={{ marginTop: '16px', marginBottom: '16px', fontWeight: 'bold' }}>
        <p>
          {visiveis.length} de {vagas.length} vagas. ({aceitamIniciante} aceitam iniciante)
        </p>
      </div>

      {visiveis.length === 0 ? (
        <p style={{ color: 'red' }}>Nenhuma vaga encontrada para esta busca.</p>
      ) : (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
          {visiveis.map(vaga => (
            <CardDeVaga key={vaga.id} vaga={vaga} />
          ))}
        </ul>
      )}
    </section>
  );
}