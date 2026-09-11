export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-container">
        <p>© {new Date().getFullYear()} Leque de Vagas · Desafio 01 NickDev — Introdução ao Next.js</p>
        <p className="rodape-tagline">Construído com Next.js (App Router) & React</p>
      </div>
    </footer>
  );
}

