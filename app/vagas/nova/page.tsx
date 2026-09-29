// app/vagas/nova/page.tsx
// A página continua Server Component, e continua async: quem busca as
// empresas para o <select> é ela. O cliente recebe a lista pronta —
// exatamente a divisão da aula 03, sem uma linha de novidade.

import type { Metadata } from "next";
import { listarEmpresas } from "@/lib/api";
import FormularioDeVaga from "./formulario";

export const metadata: Metadata = {
  title: "Publicar vaga · Leque de Vagas",
};

export default async function PublicarVaga() {
  const empresas = await listarEmpresas();

  return (
    <section className="pagina-nova-vaga">
      <h1 className="titulo-nova-vaga">Publicar uma vaga</h1>
      <p className="subtitulo-nova-vaga">
        Preencha os campos abaixo para divulgar uma oportunidade.
      </p>
      <FormularioDeVaga empresas={empresas} />
    </section>
  );
}

