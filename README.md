This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# 🚀 Desafio 01 — Ambiente, Projeto e Deploy
### Curso: Introdução ao Next.js · NickDev

## Getting Started
Este repositório contém a entrega do **Desafio 01** do curso de Introdução ao Next.js. O projeto foi inicializado com **Next.js 16 (App Router)** e Turbopack, estruturado com componentes modulares e preparado para deploy contínuo na Vercel.

First, run the development server:
---

## 🔗 Links de Entrega

- **Deploy na Vercel:** `https://seu-projeto-aqui.vercel.app` *(adicione seu link após publicar)*
- **Repositório GitHub:** `https://github.com/seu-usuario/seu-repositorio` *(adicione a URL do seu repositório)*

---

## 💻 01. Verificação do Ambiente (Node & npm)

Ambiente verificado localmente atendendo ao requisito de Node 20.9+:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
$ node -v
v24.21.0

$ npm -v
11.19.0
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
---

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
## 🧠 02. O Que É um Componente?

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
> **Conceito & Racional:**
> 
> No React e Next.js, um **componente** é como um bloco de Lego da interface: uma função que encapsula visual (HTML/JSX), regras e comportamento em um único lugar reutilizável.
> 
> Em vez de escrever o HTML e a lógica do cabeçalho repetidamente na Home, na página Sobre e na página de Contato, criamos o componente `Cabecalho.tsx` uma única vez e o inserimos no `app/layout.tsx`.
> 
> **Por que isso é fundamentalmente melhor do que copiar e colar?**
> 1. **Manutenção centralizada (DRY - Don't Repeat Yourself):** Se precisarmos alterar o logotipo, trocar uma rota ou adicionar um novo link no menu, alteramos um único arquivo (`components/Cabecalho.tsx`) e a mudança reflete instantaneamente em todas as telas.
> 2. **Prevenção de inconsistências:** Evita esquecer de atualizar uma página ou ter cabeçalhos com tamanhos e estilos divergentes em rotas diferentes.
> 3. **Legibilidade e organização:** As páginas (`page.tsx`) ficam limpas e focadas exclusivamente no seu próprio conteúdo, enquanto a estrutura comum da aplicação fica delegada ao layout e aos componentes dedicados.

## Learn More
---

To learn more about Next.js, take a look at the following resources:
## 📁 03. Estrutura do Projeto & Rotas

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
O projeto utiliza o **App Router** e navegação com o componente `<Link>` do `next/link` (garantindo transições de página sem recarregamento completo do navegador):

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
```
├── app/
│   ├── layout.tsx         # Layout raiz com <Cabecalho />, <Rodape /> e metadata
│   ├── page.tsx           # Rota principal (Home /)
│   ├── sobre/
│   │   └── page.tsx       # Rota /sobre (Apresentação pessoal e expectativas)
│   ├── contato/
│   │   └── page.tsx       # Rota /contato (Redes e canais de contato - Extra)
│   └── globals.css        # Estilos globais e variáveis de tema em CSS padrão
├── components/
│   ├── Cabecalho.tsx      # Componente modular de cabeçalho com menu de links
│   └── Rodape.tsx         # Componente modular de rodapé (Extra)
└── package.json
```

### Rotas Disponíveis:
- `/` — Página inicial com introdução ao tema **Leque de Vagas**.
- `/sobre` — Quem sou eu e o que espero do semestre.
- `/contato` — Canais de conexão profissional (GitHub, LinkedIn, E-mail).

---

## 🛠️ 04. Validação do Build

Execução do comando `npm run build` validada com sucesso, gerando todas as páginas estáticas via Turbopack:

```bash
$ npm run build

> linkedin-clone@0.1.0 build
> next build

▲ Next.js 16.3.5 (Turbopack)
✓ Running next.config.ts took 10ms

  Creating an optimized production build ...
✓ Compiled successfully in 919ms
  Running TypeScript ...
  Finished TypeScript in 643ms ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/6) ...
✓ Generating static pages using 7 workers (6/6) in 198ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /contato
└ ○ /sobre

○  (Static)  prerendered as static content
```

---

## 👥 05. Equipe & Tema do Projeto

- **Tema:** **Leque de Vagas** — Portal de vagas em tecnologia voltado para profissionais iniciantes e em transição de carreira.
- **Integrantes da Equipe & Frentes de Atuação:**
  1. **Bruno de Araújo** — *Pessoa e Candidatura*
  2. **João Victor Camargo** — *Busca e Números*
  3. **Marcelo Gomes** — *Vaga*
  4. **Victor Gadelha** — *Empresa*

---

## 💡 06. Reflexão sobre a Aula 01

> **O que foi mais desafiador / principal aprendizado:**  
> Compreender a divisão de responsabilidades entre o `app/layout.tsx` e as páginas (`app/**/page.tsx`), além de ver na prática a diferença na experiência do usuário ao navegar usando o componente `<Link>` do Next.js em comparação com a tag tradicional `<a>`.
