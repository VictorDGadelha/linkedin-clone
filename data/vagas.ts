// FRENTE 1 · o contrato da equipe. Este arquivo define o formato de dados
// utilizado por todas as frentes (Vaga, Empresa, Candidatura e Busca).

export type { Vaga } from "@/lib/tipos";
import type { Vaga } from "@/lib/tipos";


export const vagas: Vaga[] = [
  {
    id: "1",
    titulo: "Pessoa Desenvolvedora Front-end Júnior",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    descricao:
      "Você vai trabalhar com React e Next.js num time de produto que já está no ar, " +
      "pareando com desenvolvedores mais experientes nas primeiras semanas e assumindo a " +
      "construção de telas e componentes modulares depois. Nosso dia a dia envolve ler código " +
      "em equipe, abrir pull requests pequenos com testes e conversar diretamente com designers. " +
      "Não exigimos anos de experiência profissional em carteira: buscamos pessoas com boa base " +
      "em HTML/CSS/JavaScript, curiosidade e disposição para aprender em público.",
  },
  {
    id: "2",
    titulo: "Analista de Dados Júnior",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Dados",
    senioridade: "Júnior",
    local: "Híbrido · Recife, PE",
    aceitaIniciante: true,
    descricao:
      "O time de dados cuida dos dashboards analíticos que direcionam as decisões da liderança. " +
      "Você atuará escrevendo consultas em SQL, organizando fontes de dados despadronizadas e " +
      "criando visualizações claras que solucionam dúvidas reais de negócio. Metade da rotina é " +
      "técnica e a outra metade envolve ouvir as áreas clientes para entender a dor de negócio. " +
      "Conhecimento de Python e bibliotecas como Pandas é um excelente diferencial, mas não obrigatório.",
  },
  {
    id: "3",
    titulo: "Pessoa Desenvolvedora Mobile Pleno",
    empresa: "Pixel Labs",
    empresaSlug: "pixel-labs",
    area: "Mobile",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    descricao:
      "O aplicativo da Pixel Labs possui milhares de usuários ativos e passa por ciclos contínuos " +
      "de entrega nas lojas da Apple e do Google. Buscamos alguém com vivência consolidada em " +
      "React Native, TypeScript e consumo de APIs GraphQL. Você participará da arquitetura de " +
      "novas funcionalidades, melhorias de desempenho de renderização e automação de deploys via CI/CD. " +
      "Exigimos experiência prévia relevante lidando com releases em produção.",
  },
  {
    id: "4",
    titulo: "Estágio em Desenvolvimento Web",
    empresa: "Nexus Digital",
    empresaSlug: "nexus-digital",
    area: "Front-end",
    senioridade: "Estágio",
    local: "Remoto",
    aceitaIniciante: true,
    descricao:
      "Oportunidade desenhada para quem está matriculado no ensino superior ou técnico e quer " +
      "iniciar na prática com desenvolvimento web. Você aprenderá a criar páginas responsivas, " +
      "organizar estilos CSS modernos e manipular componentes React sob supervisão direta de um mentor. " +
      "Oferecemos plano de capacitação semanal, carga horária de 30 horas flexíveis e suporte constante " +
      "para acelerar seu aprendizado técnico e profissional.",
  },
  {
    id: "5",
    titulo: "Engenheira de Back-end Node.js Pleno",
    empresa: "Orbit Software",
    empresaSlug: "orbit-software",
    area: "Back-end",
    senioridade: "Pleno",
    local: "Híbrido · São Paulo, SP",
    aceitaIniciante: false,
    descricao:
      "Venha integrar a equipe responsável pelas APIs e microsserviços de alto volume da Orbit Software. " +
      "Suas principais atividades serão arquitetar rotas escaláveis em Node.js com Fastify e TypeScript, " +
      "modelar bancos relacionais com PostgreSQL e otimizar queries lentas. Esperamos domínio de " +
      "testes automatizados (unitários e de integração), mensageria com RabbitMQ e familiaridade com Docker.",
  },
  {
    id: "6",
    titulo: "Pessoa Analista de QA Júnior",
    empresa: "Vertex Solutions",
    empresaSlug: "vertex-solutions",
    area: "QA",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    descricao:
      "Buscamos alguém com olhar analítico e atenção a detalhes para fortalecer a qualidade das nossas soluções. " +
      "Você criará cenários de teste funcionais, executará validações de regressão, documentará bugs de forma " +
      "reproduzível e apoiará a transição gradual para automação com Cypress e Playwright. Ideal para quem está " +
      "migrando de carreira e já conhece fundamentos de testes de software e metodologias ágeis.",
  },
  {
    id: "7",
    titulo: "Pessoa Designer de Produto (UI/UX) Júnior",
    empresa: "Pixel Labs",
    empresaSlug: "pixel-labs",
    area: "Design",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    descricao:
      "A Pixel Labs valoriza a experiência de uso intuitiva e acessível. Você trabalhará em conjunto " +
      "com desenvolvedores e gerentes de produto, conduzindo entrevistas com usuários, desenhando wireframes " +
      "e protótipos de alta fidelidade no Figma, além de manter nosso Design System consistente com diretrizes " +
      "de acessibilidade WCAG. Buscamos alguém com portfólio prático de projetos de estudo ou estudos de caso.",
  },
  {
    id: "8",
    titulo: "Desenvolvedor(a) Back-end Júnior (Python/Django)",
    empresa: "Nexus Digital",
    empresaSlug: "nexus-digital",
    area: "Back-end",
    senioridade: "Júnior",
    local: "Presencial · Florianópolis, SC",
    aceitaIniciante: true,
    descricao:
      "Atue na sustentação e evolução de portais corporativos construídos em Python e Django. " +
      "Você criará endpoints RESTful, implementará validações de regras de negócio, integrará gateways de " +
      "pagamento e participará dos ritos ágeis diários. Não exigimos experiência sênior, mas valorizamos " +
      "projetos pessoais no GitHub que demonstrem código limpo, boas práticas e compreensão do protocolo HTTP.",
  },
  {
    id: "9",
    titulo: "Especialista em Banco de Dados / DBA Pleno",
    empresa: "Vertex Solutions",
    empresaSlug: "vertex-solutions",
    area: "Dados",
    senioridade: "Pleno",
    local: "Híbrido · Curitiba, PR",
    aceitaIniciante: false,
    descricao:
      "Responsável pela integridade, particionamento e alta disponibilidade dos clusters de banco de dados " +
      "da Vertex Solutions. Atuará na definição de rotinas de backup, tuning de performance em instâncias " +
      "PostgreSQL e auditoria de segurança de dados em conformidade com a LGPD. Vaga voltada para profissionais " +
      "com sólida vivência prática em administração de bancos e monitoramento de infraestrutura.",
  },
  {
    id: "10",
    titulo: "Estágio em Testes Automatizados e QA",
    empresa: "Orbit Software",
    empresaSlug: "orbit-software",
    area: "QA",
    senioridade: "Estágio",
    local: "Remoto",
    aceitaIniciante: true,
    descricao:
      "Vaga de estágio focada em aprendizado contínuo para estudantes de tecnologia. Você aprenderá " +
      "a configurar testes de API usando Postman, escrever scripts básicos de teste em JavaScript e " +
      "acompanhar pipelines de integração contínua. Excelente oportunidade para quem deseja mergulhar " +
      "na cultura DevOps e garantir que entregas cheguem aos usuários sem regressões indesejadas.",
  },
  {
    id: "11",
    titulo: "Pessoa Desenvolvedora Front-end Pleno (React/Next)",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    descricao:
      "Buscamos profissional com domínio em arquitetura de front-end, Server Components, SSR e " +
      "otimização de Core Web Vitals. Você liderará a modernização de fluxos críticos de navegação, " +
      "mentoreará pessoas juniores e estagiárias no dia a dia e colaborará ativamente na definição das " +
      "ferramentas e padrões de engenharia de software da empresa. Experiência sólida com TypeScript é indispensável.",
  },
  {
    id: "12",
    titulo: "Product Designer Pleno",
    empresa: "Nexus Digital",
    empresaSlug: "nexus-digital",
    area: "Design",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    descricao:
      "Buscamos Product Designer para conduzir descobertas de ponta a ponta (Discovery e Delivery) em " +
      "nossos produtos digitais. Você estruturará mapas de jornada do usuário, testes de usabilidade, " +
      "métricas de produto e prototipação interativa em colaboração com o time de engenharia. " +
      "Exige-se bagagem prévia na liderança de iniciativas de design e facilitação de dinâmicas com stakeholders.",
  },
];
