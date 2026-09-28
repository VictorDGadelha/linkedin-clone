import { Suspense } from "react";
import { listarVagas } from "@/lib/api";
import MuralDeVagas from "@/components/MuralDeVagas";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";
import NumerosEsqueleto from "@/components/NumerosEsqueleto";
import ListaEsqueleto from "@/components/ListaEsqueleto";

export default function PaginaDeVagas() {
  return (
    <>
      <h1>Vagas</h1>                          {/* chega em ~0 ms */}

      <Suspense fallback={<NumerosEsqueleto />}>
        <NumerosDoCatalogo />                {/* chega quando ficar pronto */}
      </Suspense>

      <Suspense fallback={<ListaEsqueleto />}>
        <ListagemDeVagas />                  {/* async, busca sozinho */}
      </Suspense>
    </>
  );
}

// O componente que embrulha o mural da aula 03. Ele busca, o mural filtra.
async function ListagemDeVagas() {
  const vagas = await listarVagas();
  return <MuralDeVagas vagas={vagas} />;
}