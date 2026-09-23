// lib/api.ts
// FRENTE 1 · Camada centralizada de acesso a dados da aplicação.
// Este é o ÚNICO arquivo do projeto que conhece a origem dos dados externos.
// As outras três frentes (Empresa, Candidatura, Busca) apenas importam e chamam estas funções.

import type { Vaga, Empresa } from "@/lib/tipos";
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

/**
 * Carrega a lista completa de vagas da fonte externa.
 * Inclui verificação de resposta.ok e fallback local para garantir compilação no build.
 */
export async function listarVagas(): Promise<Vaga[]> {
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
 * Busca uma vaga específica por ID.
 * O Next.js agrupa requisições idênticas via Request Memoization, evitando buscas duplicadas.
 */
export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => String(vaga.id) === String(id));
}

/**
 * Carrega a lista de empresas cadastradas.
 */
export async function listarEmpresas(): Promise<Empresa[]> {
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
 * Busca uma empresa específica pelo seu slug.
 */
export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}
