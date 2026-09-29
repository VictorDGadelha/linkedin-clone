"use server"; // PRIMEIRA linha do arquivo. Antes de qualquer import.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EsquemaDaVaga } from "@/lib/esquemas";
import { porCampo, valoresDe } from "@/lib/formulario";
import { guardarVaga, buscarEmpresa } from "@/lib/api";
import type { Estado } from "@/lib/tipos";

// DOIS parâmetros. Com useActionState o Next chama a ação com o estado
// anterior na frente — quem declara só (dados: FormData) recebe o ESTADO
// no lugar do formulário, e todo campo vira undefined sem nenhum erro.
export async function criarVaga(
  estadoAnterior: Estado,
  dados: FormData
): Promise<Estado> {
  const valores = valoresDe(dados);

  // 1. DESCONFIE. Primeira instrução da ação, sempre. Nada do que chegou
  //    aqui passou pelo seu formulário: este POST pode ter sido montado
  //    na mão, sem HTML nenhum no meio.
  const analise = EsquemaDaVaga.safeParse(Object.fromEntries(dados));

  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores };
  }

  // 2. AS REGRAS QUE O ZOD NÃO SABE. O esquema garante que o slug é um
  //    texto não vazio; ele não tem como saber se essa empresa existe.
  const empresa = await buscarEmpresa(analise.data.empresaSlug);
  if (!empresa) {
    return {
      ok: false,
      erros: { empresaSlug: "Essa empresa não está cadastrada." },
      valores,
    };
  }

  // 3. FAÇA O TRABALHO. O id nasce AQUI, no servidor — nunca vindo do
  //    formulário. Um id de fora deixaria quem manda o POST escolher
  //    sobrescrever a vaga de outra pessoa.
  const vaga = {
    ...analise.data,
    id: crypto.randomUUID(),
    empresa: empresa.nome,
  };
  await guardarVaga(vaga);

  // 4. AVISE O CACHE. Sem esta linha a vaga existe e a listagem não
  //    mostra — porque na aula 04 vocês mandaram, por escrito, que ela
  //    não fosse buscar de novo antes de 60 segundos.
  revalidatePath("/vagas");

  // 5. SAIA. O redirect é a ÚLTIMA linha, e fora de qualquer try/catch —
  //    ele funciona lançando um erro de controle que o Next intercepta, e
  //    um catch em volta engole o redirecionamento em silêncio.
  redirect(`/vagas/${vaga.id}`);
}

