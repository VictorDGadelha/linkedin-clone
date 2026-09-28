import { listarVagas } from "@/lib/api";
import MuralDeVagas from "@/components/MuralDeVagas";

export const metadata = {
  title: "Vagas Abertas | Leque de Vagas",
  description: "Encontre vagas de tecnologia para quem está começando na carreira.",
};

export default async function ListaDeVagas() {
  const vagas = await listarVagas();

  console.log("[servidor] montando a listagem");

  return (
    <section className="card-conteudo">
      <h1 className="titulo-secao" style={{ marginBottom: "20px" }}>
        Vagas Abertas
      </h1>
      <MuralDeVagas vagas={vagas} />
    </section>
  );
}