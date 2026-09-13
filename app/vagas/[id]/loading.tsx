export default function Carregando() {
  return (
    // A REGRA: o esqueleto tem MAIS OU MENOS a altura do conteúdo real.
    // Um "Carregando..." de uma linha no lugar de um bloco de 300px faz a
    // página inteira pular quando o dado chega — e o dedo de quem já ia
    // clicar acerta outra coisa.
    <div className="esqueleto" aria-busy="true">
      <div className="barra titulo" />
      <div className="barra" />
      <div className="barra" />
      <div className="barra curta" />
    </div>
  );
}