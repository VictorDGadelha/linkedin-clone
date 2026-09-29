"use client"; // useActionState é hook: exige cliente

import { useActionState } from "react"; // REACT (era react-dom antes do 19)
import { criarVaga } from "./acoes";
import { ESTADO_INICIAL } from "@/lib/tipos";
import type { Empresa } from "@/lib/tipos";

// BotaoDeEnviar ainda não existe (é entrega da Frente 3).
// Enquanto ela não chega, usamos um botão simples aqui.
// Na aula 06, trocamos por <BotaoDeEnviar> sem mudar mais nada.
function BotaoEnviar() {
  return (
    <button type="submit" className="btn-publicar">
      Publicar vaga
    </button>
  );
}

const AREAS = [
  "Tecnologia",
  "Design",
  "Marketing",
  "Vendas",
  "Operações",
  "Financeiro",
  "Jurídico",
  "RH",
];

const SENIORIDADES = ["Estágio", "Júnior", "Pleno", "Sênior", "Especialista"];

export default function FormularioDeVaga({ empresas }: { empresas: Empresa[] }) {
  // estado    → o que a ação devolveu (erros, valores, mensagem)
  // acaoDoForm → é ISTO que vai no action=, e não a criarVaga direta
  const [estado, acaoDoForm] = useActionState(criarVaga, ESTADO_INICIAL);

  return (
    <form action={acaoDoForm} className="form-vaga">
      {/* ─── TÍTULO ─── */}
      <label className="campo">
        <span className="campo-label">Título da vaga</span>
        {/* defaultValue, e NÃO value: com Server Actions o campo volta
            a ser não controlado. `value` sem `onChange` trava o campo. */}
        <input
          name="titulo"
          placeholder="ex: Desenvolvedor Front-end Pleno"
          defaultValue={estado.valores.titulo}
          className={estado.erros.titulo ? "input-erro" : ""}
        />
        {estado.erros.titulo && (
          <p className="msg-erro">{estado.erros.titulo}</p>
        )}
      </label>

      {/* ─── EMPRESA ─── */}
      <label className="campo">
        <span className="campo-label">Empresa</span>
        {/* <select>, e não campo de texto: assim ninguém digita um slug
            que não existe. A validação no servidor continua sendo
            necessária — mas agora ela é a rede, não a porta. */}
        <select
          name="empresaSlug"
          defaultValue={estado.valores.empresaSlug ?? ""}
          className={estado.erros.empresaSlug ? "input-erro" : ""}
        >
          <option value="">Escolha…</option>
          {empresas.map((e) => (
            <option key={e.slug} value={e.slug}>
              {e.nome}
            </option>
          ))}
        </select>
        {estado.erros.empresaSlug && (
          <p className="msg-erro">{estado.erros.empresaSlug}</p>
        )}
      </label>

      {/* ─── ÁREA ─── */}
      <label className="campo">
        <span className="campo-label">Área</span>
        <select
          name="area"
          defaultValue={estado.valores.area ?? ""}
          className={estado.erros.area ? "input-erro" : ""}
        >
          <option value="">Escolha…</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {estado.erros.area && (
          <p className="msg-erro">{estado.erros.area}</p>
        )}
      </label>

      {/* ─── SENIORIDADE ─── */}
      <label className="campo">
        <span className="campo-label">Senioridade</span>
        <select
          name="senioridade"
          defaultValue={estado.valores.senioridade ?? ""}
          className={estado.erros.senioridade ? "input-erro" : ""}
        >
          <option value="">Escolha…</option>
          {SENIORIDADES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {estado.erros.senioridade && (
          <p className="msg-erro">{estado.erros.senioridade}</p>
        )}
      </label>

      {/* ─── LOCAL ─── */}
      <label className="campo">
        <span className="campo-label">Local</span>
        <input
          name="local"
          placeholder="ex: Remoto, Híbrido ou São Paulo – SP"
          defaultValue={estado.valores.local}
          className={estado.erros.local ? "input-erro" : ""}
        />
        {estado.erros.local && (
          <p className="msg-erro">{estado.erros.local}</p>
        )}
      </label>

      {/* ─── ACEITA INICIANTE ─── */}
      <label className="campo-checkbox">
        <input type="checkbox" name="aceitaIniciante" />
        <span>Aceita quem está começando</span>
      </label>

      {/* ─── DESCRIÇÃO ─── */}
      <label className="campo">
        <span className="campo-label">
          Descrição{" "}
          <span className="campo-hint">(mín. 80 caracteres)</span>
        </span>
        <textarea
          name="descricao"
          rows={8}
          placeholder="Descreva as responsabilidades, requisitos e benefícios da vaga…"
          defaultValue={estado.valores.descricao}
          className={estado.erros.descricao ? "input-erro" : ""}
        />
        {estado.erros.descricao && (
          <p className="msg-erro">{estado.erros.descricao}</p>
        )}
      </label>

      <BotaoEnviar />
    </form>
  );
}

