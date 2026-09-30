import { notFound } from "next/navigation";
import { buscarEmpresa } from "@/lib/api";
import FormularioDeEmpresa from "./formulario";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PaginaDeEdicao({params,}: 
  Props) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) {
    notFound();
  }

  return (
    <section>
      <h1>Editar Empresa</h1>
      <FormularioDeEmpresa empresa={empresa} />
    </section>
  );
}