// lib/tipos.ts
// Centralização dos contratos de dados do projeto.
// Este arquivo guarda apenas os tipos (sem dados embutidos), permitindo que a aplicação
// receba informações de fontes externas (JSON, API externa ou banco de dados).

// Vaga - Empresa
export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
};

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

// Formulário - Candidatura
export type Estado = {
  ok: boolean;
  erros: Record<string, string>;    // campo → mensagem. UMA por campo.
  valores: Record<string, string>;  // o que a pessoa digitou, para devolver preenchido
  mensagem?: string;                 // recado geral: sucesso, ou falha que não é de campo
};

// O estado antes de qualquer envio. Uma constante só, exportada, porque
// um objeto literal criado dentro do componente muda de identidade a
// cada render sem precisar.
export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };

// A frente 3 precisa deste. Ele não existia porque, até ontem, a
// candidatura nunca saía do navegador de quem preencheu.
export type Candidatura = {
  id: string;
  vagaId: string;
  nome: string;
  email: string;
  habilidades: string[];
  enviadaEm: string;
};