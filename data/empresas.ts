export type Empresa = {
    slug: string;
    nome: string;
    sobre: string;
    site: string;
};

export const empresas: Empresa[] = [
    {
        slug: "aurora-tech",
        nome: "Aurora Tech",
        sobre: "Empresa líder em desenvolvimento de produtos modernos com React e Next.js.",
        site: "https://auroratech.exemplo",
    },
    {
        slug: "nexus-digital",
        nome: "Nexus Digital",
        sobre: "Empresa especializada em soluções digitais escaláveis para negócios de todos os tamanhos.",
        site: "https://nexusdigital.exemplo",
    },
    {
        slug: "orbit-software",
        nome: "Orbit Software",
        sobre: "Desenvolvedora de sistemas web inovadores focados em performance, segurança e experiência do usuário.",
        site: "https://orbitsoftware.exemplo",
    },
    {
        slug: "pixel-labs",
        nome: "Pixel Labs",
        sobre: "Estúdio de tecnologia dedicado à criação de aplicações modernas e experiências digitais.",
        site: "https://pixellabs.exemplo",
    },
    {
        slug: "vertex-solutions",
        nome: "Vertex Solutions",
        sobre: "Empresa de tecnologia que cria plataformas personalizadas para otimizar processos e resultados.",
        site: "https://vertexsolutions.exemplo",
    },
];
