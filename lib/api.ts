// lib/api.ts
// FRENTE 1 · Camada centralizada de acesso a dados da aplicação.
// Este é o ÚNICO arquivo do projeto que conhece a origem dos dados externos
// e que fala diretamente com o Prisma para as vagas da aplicação.
// As outras três frentes apenas importam e chamam estas funções.

import type { Vaga, Empresa, Candidatura } from "@/lib/tipos";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// URL base da fonte externa de dados (GitHub raw da equipe)
const FONTE =
  process.env.NEXT_PUBLIC_DADOS_URL ||
  "https://raw.githubusercontent.com/VictorDGadelha/linkedin-clone/main/dados";

// Depósitos temporários para frentes que ainda não migraram para o banco nesta semana
const candidaturas: Candidatura[] = [];

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
 * 04 — a listagem, o detalhe, o generateStaticParams, os números.
 * Agora junta as vagas gravadas no SQLite com as vagas públicas.
 */
export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();

  const criadas = await prisma.vaga.findMany({
    where: { arquivada: false }, // frente 4
    orderBy: { criadaEm: "desc" },
  });

  return [...criadas, ...publicadas];
}

/**
 * Busca uma vaga específica por ID.
 * O Next.js agrupa requisições idênticas via Request Memoization, evitando buscas duplicadas.
 */
export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  // Tenta buscar no banco primeiro
  const doBanco = await prisma.vaga.findUnique({
    where: { id },
  });
  if (doBanco && !doBanco.arquivada) {
    return doBanco;
  }

  // Senão, procura nas vagas publicadas
  const vagas = await listarVagas();
  return vagas.find((vaga) => String(vaga.id) === String(id));
}

/**
 * Mesma ideia do lado das empresas: a frente 2 depende desta para que
 * guardarEmpresa grave num Map/banco que esta função lê.
 */
export async function listarEmpresas(): Promise<Empresa[]> {
  const publicadas = await buscarEmpresasPublicadas();

  const editadas = await prisma.empresa.findMany();

  const empresasDoBanco = new Map(editadas.map((empresa) => [empresa.slug, empresa]),);

  return publicadas.map((empresa) => empresasDoBanco.get(empresa.slug) ?? empresa,);
}


/**
 * Busca uma empresa específica pelo seu slug.
 */

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const editada = await prisma.empresa.findUnique({where: { slug },});

  if (editada) {
    return editada;
  }

  const publicadas = await listarEmpresas();

  return publicadas.find((empresa) => empresa.slug === slug);
}

// ─── ESCRITA ───────────────────────────────────────────────────────────

/**
 * O array saiu de cena. Uma palavra mudou a assinatura (async) — e o TypeScript
 * aponta sozinho cada chamada que passou a precisar de await.
 */
export async function guardarVaga(vaga: Vaga): Promise<void> {
  await prisma.vaga.create({
    data: {
      id: vaga.id,
      titulo: vaga.titulo,
      empresa: vaga.empresa,
      empresaSlug: vaga.empresaSlug,
      area: vaga.area,
      senioridade: vaga.senioridade,
      local: vaga.local,
      aceitaIniciante: vaga.aceitaIniciante,
      descricao: vaga.descricao,
    },
  });
}

export async function arquivarVaga(id: string): Promise<void> {
  await prisma.vaga.update({
    where: { id },
    data: { arquivada: true },
  });
}

export function guardarCandidatura(candidatura: Candidatura): void {
  candidaturas.push(candidatura);
}

export async function guardarEmpresa(empresa: Empresa): Promise<void> {
  await prisma.empresa.upsert({
    where: {
      slug: empresa.slug,
    },
    update: {
      nome: empresa.nome,
      sobre: empresa.sobre,
      site: empresa.site,
    },
    create: {
      slug: empresa.slug,
      nome: empresa.nome,
      sobre: empresa.sobre,
      site: empresa.site,
    },
  });}