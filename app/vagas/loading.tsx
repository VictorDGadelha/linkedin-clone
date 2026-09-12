export default function VagasLoading() {
  return (
    <section className="card-conteudo">
      <h1 className="titulo-secao" style={{ marginBottom: '16px' }}>Carregando Vagas...</h1>
      <div className="grid-destaques">
        {/* Skeleton items */}
        {[1, 2, 3].map(i => (
          <div key={i} className="card-item" style={{ opacity: 0.6, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <div style={{ height: '24px', backgroundColor: 'var(--border)', borderRadius: '4px', marginBottom: '12px', width: '80%' }}></div>
            <div style={{ height: '16px', backgroundColor: 'var(--border)', borderRadius: '4px', marginBottom: '8px', width: '50%' }}></div>
            <div style={{ height: '16px', backgroundColor: 'var(--border)', borderRadius: '4px', width: '60%' }}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
