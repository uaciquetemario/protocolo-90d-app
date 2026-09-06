import { useEffect, useState } from 'react'
import { getSetting, setSetting } from '../db.js'
import { todayISO } from '../lib/date.js'

export default function SettingsScreen() {
  const [protocolStart, setProtocolStart] = useState('')
  const [streakStart, setStreakStart] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const p = await getSetting('protocol_start_date', todayISO())
      const s = await getSetting('betting_free_streak_start', todayISO())
      setProtocolStart(p)
      setStreakStart(s)
    }
    load()
  }, [])

  async function handleSave() {
    await setSetting('protocol_start_date', protocolStart)
    await setSetting('betting_free_streak_start', streakStart)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-md mx-auto px-5 pb-28 pt-8">
      <h1 className="font-serif text-2xl mb-6">Definições</h1>

      <label className="flex flex-col gap-1 py-3 border-b border-line">
        <span className="text-[15px] text-muted">Data de início do protocolo (Dia 1)</span>
        <input
          type="date"
          value={protocolStart}
          onChange={(e) => setProtocolStart(e.target.value)}
          className="bg-raised border border-line rounded-md px-3 py-2 text-ink"
        />
      </label>

      <label className="flex flex-col gap-1 py-3 border-b border-line">
        <span className="text-[15px] text-muted">
          Início da sequência sem apostar (inclui os dias já feitos antes do app)
        </span>
        <input
          type="date"
          value={streakStart}
          onChange={(e) => setStreakStart(e.target.value)}
          className="bg-raised border border-line rounded-md px-3 py-2 text-ink"
        />
      </label>

      <button
        onClick={handleSave}
        className="w-full mt-6 bg-gold text-bg font-medium rounded-md py-3"
      >
        Guardar definições
      </button>

      {saved && <p className="text-sage text-sm text-center mt-3">Definições guardadas.</p>}
    </div>
  )
}
