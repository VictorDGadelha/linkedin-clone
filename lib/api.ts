// lib/api.ts
// FRENTE 1 · Camada centralizada de acesso a dados da aplicação.
// Este é o ÚNICO arquivo do projeto que conhece a origem dos dados externos
// E o ÚNICO que guarda os depósitos em memória desta semana.
// As outras três frentes apenas importam e chamam estas funções.

import type { Vaga, Empresa, Candidatura } from "@/lib/tipos";
import fs from "fs";
import path from "path";

// URL base da fonte externa de dados (GitHub raw da equipe)
const FONTE =
  process.env.NEXT_PUBLIC_DADOS_URL ||
  "https://raw.githubusercontent.com/VictorDGadelha/linkedin-clone/main/dados";

// ─── O DEPÓSITO ────────────────────────────────────────────────────────
// A memória do PROCESSO. Some quando o servidor reinicia, e no site
// publicado cada instância tem a sua. Isso não é gambiarra escondida: é a
// peça que falta, e ela tem data — AULA 06, banco de dados.
//
// O que importa hoje é que ela mora AQUI, atrás das mesmas funções que o
// resto do projeto já chama. Na aula 06, estas linhas viram um insert e
// nenhuma ação, nenhum formulário e nenhuma página fica sabendo.
const criadas: Vaga[] = [];
const arquivadas = new Set<string>();
const candidaturas: Candidatura[] = [];
const editadas = new Map<string, Empresa>();

// ─── LEITURA — privadas ─────────────────────────────────────────────────
// Vagas: revalidação a cada 60 segundos (novas oportunidades precisam aparecer rápido)
async function buscarVagasPublicadas(): Promise<Vaga[]> {
  try {
    const resposta = await fetch(`${FONTE}/vagas.json`, {
      next: { revalidate: 60, tags: ["vagas"] },
    });
    if (resposta.ok) {
      return await resposta.json();
    }
  } catch {
    // Fallback executado em ambiente offline ou antes do merge da branch no GitHub
  }

  // Fallback local seguro para o build e execução local
  const caminhoLocal = path.join(process.cwd(), "dados", "vagas.json");
  if (fs.existsSync(caminhoLocal)) {
    const conteudo = fs.readFileSync(caminhoLocal, "utf-8");
    return JSON.parse(conteudo);
  }

  throw new Error(
    "Não foi possível carregar as vagas nem pela URL externa nem pelo arquivo local."
  );
}

// Empresas: revalidação a cada 3600 segundos (1 hora - dados institucionais mudam raramente)
async function buscarEmpresasPublicadas(): Promise<Empresa[]> {
  try {
    const resposta = await fetch(`${FONTE}/empresas.json`, {
      next: { revalidate: 3600, tags: ["empresas"] },
    });
    if (resposta.ok) {
      return await resposta.json();
    }
  } catch {
    // Fallback executado em ambiente offline ou antes do merge da branch no GitHub
  }

  const caminhoLocal = path.join(process.cwd(), "dados", "empresas.json");
  if (fs.existsSync(caminhoLocal)) {
    const conteudo = fs.readFileSync(caminhoLocal, "utf-8");
    return JSON.parse(conteudo);
  }

  throw new Error(
    "Não foi possível carregar as empresas nem pela URL externa nem pelo arquivo local."
  );
}

// ─── LEITURA — públicas ─────────────────────────────────────────────────

/**
 * O NOME NÃO MUDA. Toda página do projeto chama esta função desde a aula
 * 04 — a listagem, o detalhe, o generateStaticParams, os números. Mudar o
 * que ela faz por dentro sem mudar a assinatura é exatamente a compra que
 * o lib/api.ts fez naquela semana, sendo usada agora.
 */
export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();

  return [...criadas, ...publicadas].filter(
    (vaga) => !arquivadas.has(vaga.id)
  ); // frente 4
}

/**
 * Busca uma vaga específica por ID.
 * O Next.js agrupa requisições idênticas via Request Memoization, evitando buscas duplicadas.
 */
export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => String(vaga.id) === String(id));
}

/**
 * Mesma ideia do lado das empresas: a frente 2 depende desta para que
 * guardarEmpresa grave num Map que esta função lê.
 */
export async function listarEmpresas(): Promise<Empresa[]> {
  const publicadas = await buscarEmpresasPublicadas();
  return publicadas.map((e) => editadas.get(e.slug) ?? e);
}

/**
 * Busca uma empresa específica pelo seu slug.
 */
export async function buscarEmpresa(
  slug: string
): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}

// ─── ESCRITA ───────────────────────────────────────────────────────────
// Nenhuma delas é `async`, porque escrever em memória não espera nada.
// Pôr `async` agora "para já ficar parecido com banco" é adivinhar o
// futuro; na aula 06 o TypeScript aponta cada chamada que passa a
// precisar de await, e o conserto leva cinco minutos.

export function guardarVaga(vaga: Vaga) {
  criadas.unshift(vaga); // no começo: a mais nova aparece primeiro
}

export function arquivarVaga(id: string) {
  arquivadas.add(id);
}

export function guardarCandidatura(candidatura: Candidatura) {
  candidaturas.push(candidatura);
}

export function guardarEmpresa(empresa: Empresa) {
  editadas.set(empresa.slug, empresa);
}
