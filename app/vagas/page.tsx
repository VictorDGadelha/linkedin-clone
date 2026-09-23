import { listarVagas } from "@/lib/api";
import CardDeVaga from "@/components/CardDeVaga";

export const metadata = {
  title: "Vagas Abertas | Leque de Vagas",
  description: "Encontre vagas de tecnologia para quem está começando na carreira.",
};

export default async function ListaDeVagas() {
  const vagas = await listarVagas();

  return (
    <section className="card-conteudo">
      <h1 className="titulo-secao" style={{ marginBottom: "20px" }}>
        Vagas Abertas
      </h1>
      <ul className="lista-vagas" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {vagas.map((vaga) => (
          <CardDeVaga key={vaga.id} vaga={vaga} />
        ))}
      </ul>
    </section>
  );
}
