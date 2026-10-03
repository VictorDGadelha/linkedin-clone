"use server";

import { EsquemaDaCandidatura } from "@/lib/esquemas";
import { porCampo, valoresDe } from "@/lib/formulario";
import { prisma } from "@/lib/prisma";
import { Estado } from "@/lib/tipos";
import { revalidatePath } from "next/cache";

export async function enviarCandidatura(anterior: Estado, dados: FormData): Promise<Estado> {
  const analise = EsquemaDaCandidatura.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores: valoresDe(dados) };
  }

  // A relação OBRIGA a vaga a existir. Sem esta checagem, o Prisma lança —
  // e exceção dentro de action manda a pessoa para o error.tsx. Vaga que
  // não existe é conversa, não falha do sistema.
  const vaga = await prisma.vaga.findUnique({ where: { id: analise.data.vagaId } });
  if (!vaga) {
    return { ok: false, erros: { vagaId: "Essa vaga não está mais disponível." }, valores: {} };
  }

  const cliente = prisma as unknown as {
    candidatura: { create(args: { data: typeof analise.data }): Promise<unknown> };
  };
  await cliente.candidatura.create({ data: analise.data });

  revalidatePath("/vagas/" + analise.data.vagaId);
  return { ok: true, erros: {}, valores: {}, mensagem: "Candidatura enviada." };
}