// empresas/[slug]/editar/acoes.ts
// Ações do formulário de edição de empresa.
"use server";

import { revalidatePath } from "next/cache";
import { EsquemaDaEmpresa } from "@/lib/esquemas";
import { porCampo, valoresDe } from "@/lib/formulario";
import { buscarEmpresa, guardarEmpresa } from "@/lib/api";
import type { Estado } from "@/lib/tipos";

export async function salvarEmpresa(
  slug: string,
  estadoAnterior: Estado,
  dados: FormData,
): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaEmpresa.safeParse(
    Object.fromEntries(dados),
  );

  if (!analise.success) {
    return {
      ok: false,
      erros: porCampo(analise.error),
      valores,
    };
  }

  const atual = await buscarEmpresa(slug);

  if (!atual) {
    return {
      ok: false,
      erros: {},
      valores,
      mensagem: "Empresa não encontrada.",
    };
  }

  await guardarEmpresa({
    ...atual,
    ...analise.data,
  });

  // A empresa aparece tanto na página de detalhe quanto na listagem.
  // Por isso as duas rotas precisam ser revalidadas após a alteração.
  revalidatePath(`/empresas/${slug}`);
  revalidatePath("/empresas");

  // Não redirecionamos: a pessoa permanece na página de edição.
  return {
    ok: true,
    erros: {},
    valores,
    mensagem: "Perfil atualizado.",
  };
}