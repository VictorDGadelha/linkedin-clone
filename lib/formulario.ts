import type { ZodError } from "zod";

// O Zod devolve uma LISTA de problemas, e a tela quer UM por campo. Esta
// função faz a ponte. Ela lê `error.issues`, que é a forma que funciona
// tanto no Zod 3 quanto no 4 — os atalhos de agrupamento mudaram de nome
// entre as versões, e este não mudou.
export function porCampo(erro: ZodError): Record<string, string> {
  const erros: Record<string, string> = {};

  for (const problema of erro.issues) {
    const campo = String(problema.path[0] ?? "_");

    // A PRIMEIRA mensagem de cada campo, e só ela. Um campo pode falhar
    // em três regras de uma vez, e empilhar três frases embaixo do
    // mesmo input não ajuda ninguém a consertar nada.
    if (!erros[campo]) erros[campo] = problema.message;
  }

  return erros;
}

// Devolve o que a pessoa digitou, para o formulário voltar preenchido.
// Um formulário longo recusado e devolvido em branco é a forma mais
// rápida de fazer alguém desistir.
export function valoresDe(dados: FormData): Record<string, string> {
  const valores: Record<string, string> = {};

  for (const [chave, valor] of dados.entries()) {
    // FormData também carrega File. Só texto volta para a tela.
    if (typeof valor === "string") valores[chave] = valor;
  }

  return valores;
}