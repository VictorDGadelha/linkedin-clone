// app/empresas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { empresas } from "@/data/empresas";
import { vagas } from "@/data/vagas";

export const metadata: Metadata = {
  title: "Empresas · Leque de Vagas",
  description:
    "As empresas que publicam vagas para quem está migrando para tecnologia.",
};

export default async function Empresas() {
  return (
    <section>
      <h1>Empresas</h1>

      <ul className="lista">
        {empresas.map((empresa: { slug: string; nome: string }) => {
          const quantas = vagas.filter(
            (vaga: { empresaSlug: string }) => vaga.empresaSlug === empresa.slug,
          ).length;

          return (
            <li key={empresa.slug}>
              <Link href={`/empresas/${empresa.slug}`}>
                {empresa.nome}
                <span>
                  {quantas === 1 ? "1 vaga aberta" : `${quantas} vagas abertas`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}