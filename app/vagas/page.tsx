import Link from "next/link";
import { vagas } from "@/data/vagas";

export default function ListaDeVagas() {
  return (
    <section className="card-conteudo">
      <h1 className="titulo-secao" style={{ marginBottom: '16px' }}>Vagas Abertas</h1>
      <ul className="lista-vagas">
        {vagas.map((vaga) => (
          <li key={vaga.id} className="card-item" style={{ marginBottom: '16px', listStyle: 'none' }}>
            <h3>
              <Link href={`/vagas/${vaga.id}`} className="link-externo" style={{ fontSize: '1.2rem' }}>
                {vaga.titulo}
              </Link>
            </h3>
            <p style={{ marginTop: '8px' }}>
              <strong>Empresa:</strong> {vaga.empresa} <br/>
              <strong>Local:</strong> {vaga.local} <br/>
              <strong>Área:</strong> <span className="badge">{vaga.area}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
