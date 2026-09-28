type FiltrosProps = {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  area: string;
  aoMudarArea: (valor: string) => void;
  areas: string[];
};

export default function Filtros({ busca, aoMudarBusca, area, aoMudarArea, areas }: FiltrosProps) {
  return (
    <div className="filtros-container">
      <input 
        type="text" 
        placeholder="Buscar por título..." 
        value={busca} 
        onChange={(e) => aoMudarBusca(e.target.value)} 
        style={{ padding: '8px', width: '100%', marginBottom: '16px' }}
      />
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {areas.map(nomeArea => (
          <button 
            key={nomeArea}
            onClick={() => aoMudarArea(nomeArea)}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              backgroundColor: area === nomeArea ? '#0070f3' : '#eaeaea',
              color: area === nomeArea ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {nomeArea}
          </button>
        ))}
      </div>
    </div>
  );
}