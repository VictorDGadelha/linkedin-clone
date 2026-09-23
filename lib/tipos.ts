// lib/tipos.ts
// Centralização dos contratos de dados do projeto.
// Este arquivo guarda apenas os tipos (sem dados embutidos), permitindo que a aplicação
// receba informações de fontes externas (JSON, API externa ou banco de dados).

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
