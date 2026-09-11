import type { Metadata } from "next";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leque de Vagas | Desafio 01 - Next.js",
  description: "Desafio 01 do curso de Introdução ao Next.js - NickDev. Ambiente, componentes e deploy na Vercel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main className="conteudo-principal">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
