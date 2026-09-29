# Decisões de Arquitetura de Dados · Aula 06

Este documento registra as decisões combinadas pela equipe sobre contratos de tipos, esquemas de banco de dados e prioridade de fontes.

---

## 1. Quem manda quando o tipo e a tabela discordam

- **Contratos públicos (`lib/tipos.ts`)**: Mantemos os tipos TypeScript (`Vaga`, `Empresa`, `Candidatura`) como os contratos da camada de visualização e componentes.
- **Campos exclusivos do banco (`criadaEm`, `arquivada`)**:
  - No banco (`schema.prisma`), o banco gerencia `criadaEm` com `@default(now())` e `arquivada` com `@default(false)`.
  - No TypeScript (`lib/tipos.ts`), campos extras do banco podem ser tratados como opcionais ou tipados via Prisma quando necessário, permitindo que objetos vindos do `vagas.json` (que não possuem `criadaEm`) continuem válidos na mesma interface sem quebras.
- **Campos do JSON vs Banco**:
  - A função `listarVagas()` retorna a união `[...criadasNoBanco, ...publicadasNoJson]`.
  - Ambas as fontes respeitam o contrato base de `Vaga`.

---

## 2. Prioridade de Fontes (Empresas)

- **Regra: O banco vence.**
- Se uma empresa existir tanto no `dados/empresas.json` quanto no banco de dados SQLite (com o mesmo `slug`), a versão editada no banco tem precedência.
- Justificativa: alterações feitas pelos usuários da aplicação devem refletir imediatamente e sobrepor os dados iniciais do arquivo mock.

---

## 3. Instância do Cliente Prisma e Migrations

- **Cliente único**: O PrismaClient deve ser instanciado exclusivamente em `lib/prisma.ts` anexado a `globalThis` para prevenir esgotamento de conexões durante o Fast Refresh do Next.js.
- **Migrations ordenadas**:
  1. Frente 1 entrega a estrutura inicial de `Vaga`, o cliente `lib/prisma.ts` e a migration inicial na branch principal.
  2. As Frentes 2, 3 e 4 executam `git pull` antes de adicionar seus respectivos models (`Empresa`, `Candidatura`) e rodar `prisma migrate dev`.
- **Segurança de dados**: Arquivos de banco local (`*.db`, `*.db-journal`) e credenciais (`.env`) estão estritamente fora do controle de versão via `.gitignore`.

