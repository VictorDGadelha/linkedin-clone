// lib/api.ts
// FRENTE 1 · Camada centralizada de acesso a dados da aplicação.
// Este é o ÚNICO arquivo do projeto que conhece a origem dos dados externos.
// As outras três frentes (Empresa, Candidatura, Busca) apenas importam e chamam estas funções.

import type { Vaga, Empresa, Candidatura } from "@/lib/tipos";
import fs from "fs";
import path from "path";

// URL base da fonte externa de dados (GitHub raw da equipe)
const FONTE =
  process.env.NEXT_PUBLIC_DADOS_URL ||
  "https://raw.githubusercontent.com/VictorDGadelha/linkedin-clone/main/dados";

// Vagas: revalidação a cada 60 segundos (novas oportunidades precisam aparecer rápido)
const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };

// Empresas: revalidação a cada 3600 segundos (1 hora - dados institucionais mudam raramente)
const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

// ─── O DEPÓSITO ────────────────────────────────────────────────────────
// A memória do PROCESSO. Some quando o servidor reinicia.
// O que importa hoje é que ela mora AQUI, atrás das mesmas funções que o
// resto do projeto já chama. Na aula 06, estas linhas viram operações de banco.
const criadas: Vaga[] = [];
const arquivadas = new Set<string>(); // ← FRENTE 4: Onde ficam as vagas escondidas
const candidaturas: Candidatura[] = [];
const editadas = new Map<string, Empresa>();


// ─── LEITURA ───────────────────────────────────────────────────────────

/**
 * A função da aula 04 troca de nome e vira privada: ela é só a metade
 * "publicada" da lista, e ninguém de fora deveria pedir só ela.
 */
async function buscarVagasPublicadas(): Promise<Vaga[]> {
  try {
    const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);
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

  throw new Error("Não foi possível carregar as vagas nem pela URL externa nem pelo arquivo local.");
}

/**
 * O NOME NÃO MUDA. Toda página do projeto chama esta função desde a aula 04.
 * Agora ela junta as vagas criadas em memória com as publicadas, e esconde as arquivadas.
 */
export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();

  return [...criadas, ...publicadas]
    .filter((vaga) => !arquivadas.has(String(vaga.id))); // ← FRENTE 4 atua aqui
}

/**
 * Busca uma vaga específica por ID.
 */
export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => String(vaga.id) === String(id));
}

/**
 * Função privada para buscar as empresas publicadas no JSON.
 */
async function buscarEmpresasPublicadas(): Promise<Empresa[]> {
  try {
    const resposta = await fetch(`${FONTE}/empresas.json`, CACHE_EMPRESAS);
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

  throw new Error("Não foi possível carregar as empresas nem pela URL externa nem pelo arquivo local.");
}

/**
 * Lista empresas fundindo o arquivo publicado com as edições em memória.
 */
export async function listarEmpresas(): Promise<Empresa[]> {
  const publicadas = await buscarEmpresasPublicadas();   
  return publicadas.map((e) => editadas.get(e.slug) ?? e);
}

/**
 * Busca uma empresa específica pelo seu slug.
 */
export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}


// ─── ESCRITA ───────────────────────────────────────────────────────────
// Nenhuma delas é `async`, porque escrever em memória não espera nada.

export function guardarVaga(vaga: Vaga) {
  criadas.unshift(vaga);        // no começo: a mais nova aparece primeiro
}

// ← FRENTE 4: A função que a sua action chama para jogar o ID no Set
export function arquivarVaga(id: string) {
  arquivadas.add(String(id));
}

export function guardarCandidatura(candidatura: Candidatura) {
  candidaturas.push(candidatura);
}

export function guardarEmpresa(empresa: Empresa) {
  editadas.set(empresa.slug, empresa);
}