const TABS = [
  { id: 'hoje', label: 'Hoje' },
  { id: 'painel', label: 'Painel' },
  { id: 'exportar', label: 'Exportar' },
  { id: 'definicoes', label: 'Definições' },
]

export default function NavBar({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-raised border-t border-line">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-3 text-sm transition-colors ${
              active === tab.id ? 'text-gold font-medium' : 'text-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
