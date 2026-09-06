import { useRef, useState } from 'react'
import { exportAllJSON, exportTableCSV, importBackupJSON, EXPORTABLE_TABLES } from '../lib/exportData.js'

const TABLE_LABELS = {
  daily_entries: 'Registos diários',
  expenses: 'Gastos',
  debts: 'Dívidas',
  skill_projects: 'Projetos de portfólio',
  outreach_log: 'Propostas enviadas',
  weekly_reviews: 'Revisões semanais',
}

export default function ExportScreen() {
  const fileInputRef = useRef(null)
  const [status, setStatus] = useState('')

  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('A importar…')
    try {
      await importBackupJSON(file)
      setStatus('Backup importado com sucesso. Os dados já foram atualizados.')
    } catch (err) {
      setStatus('Não foi possível ler este ficheiro. Confirma que é um backup JSON válido.')
    }
    e.target.value = ''
  }

  return (
    <div className="max-w-md mx-auto px-5 pb-28 pt-8">
      <h1 className="font-serif text-2xl mb-2">Exportar</h1>
      <p className="text-muted text-sm mb-8">
        Os teus dados vivem só neste dispositivo. Exporta regularmente para teres um
        backup e para poderes analisar tudo fora do app.
      </p>

      <section className="mb-8">
        <h2 className="font-serif text-lg mb-3">Backup completo</h2>
        <button
          onClick={() => exportAllJSON()}
          className="w-full bg-gold text-bg font-medium rounded-md py-3"
        >
          Exportar tudo (JSON)
        </button>
        <p className="text-muted text-xs mt-2">
          Guarda este ficheiro no Google Drive ou por email. Serve para restaurar os
          dados se trocares de telemóvel ou limpares o browser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-lg mb-3">Restaurar backup</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-line text-ink rounded-md py-3"
        >
          Importar ficheiro JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
        {status && <p className="text-sage text-sm mt-2">{status}</p>}
      </section>

      <section>
        <h2 className="font-serif text-lg mb-3">Exportar por tabela (CSV)</h2>
        <div className="divide-y divide-line/60 border-t border-b border-line">
          {EXPORTABLE_TABLES.map((table) => (
            <button
              key={table}
              onClick={() => exportTableCSV(table)}
              className="w-full flex justify-between items-center py-3 text-left"
            >
              <span>{TABLE_LABELS[table] || table}</span>
              <span className="text-muted text-sm">.csv</span>
            </button>
          ))}
        </div>
        <p className="text-muted text-xs mt-3">
          Útil para abrir uma tabela específica no Excel ou Google Sheets.
        </p>
      </section>
    </div>
  )
}
