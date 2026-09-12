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

export const vagas: Vaga[] = [
  {
    id: "1",
    titulo: "Pessoa Desenvolvedora Front-end",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    descricao: "Trabalhar com React e Next.js num time de produto inovador construindo interfaces acessíveis.",
  },
  {
    id: "2",
    titulo: "Engenharia de Dados Pleno",
    empresa: "DataCorp",
    empresaSlug: "datacorp",
    area: "Dados",
    senioridade: "Pleno",
    local: "São Paulo, SP (Híbrido)",
    aceitaIniciante: false,
    descricao: "Responsável pela construção e manutenção de pipelines de dados em nuvem utilizando Python e SQL.",
  },
  {
    id: "3",
    titulo: "Desenvolvedor(a) Back-end Node.js",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Back-end",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    descricao: "Desenvolver APIs RESTful escaláveis em Node.js e TypeScript para nossos serviços core.",
  },
  {
    id: "4",
    titulo: "Analista de Suporte Técnico (TI)",
    empresa: "Global Solutions",
    empresaSlug: "global-solutions",
    area: "Suporte",
    senioridade: "Júnior",
    local: "Rio de Janeiro, RJ (Presencial)",
    aceitaIniciante: true,
    descricao: "Prestar suporte de primeiro nível para nossos clientes corporativos, resolvendo incidentes de software e hardware.",
  },
  {
    id: "5",
    titulo: "UX/UI Designer Sênior",
    empresa: "DataCorp",
    empresaSlug: "datacorp",
    area: "Design",
    senioridade: "Sênior",
    local: "Remoto",
    aceitaIniciante: false,
    descricao: "Liderar a pesquisa e a prototipação de interfaces complexas para ferramentas de visualização de dados.",
  },
  {
    id: "6",
    titulo: "Pessoa Desenvolvedora Full-stack Júnior",
    empresa: "InovaTech",
    empresaSlug: "inovatech",
    area: "Full-stack",
    senioridade: "Júnior",
    local: "Curitiba, PR (Híbrido)",
    aceitaIniciante: true,
    descricao: "Atuar em todo o ciclo de desenvolvimento de software, do banco de dados (PostgreSQL) ao cliente (React).",
  }
];
