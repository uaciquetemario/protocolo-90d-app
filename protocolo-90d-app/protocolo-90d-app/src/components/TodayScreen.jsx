import { useEffect, useState } from 'react'
import { getEntry, saveEntry, getAllEntries, getSetting } from '../db.js'
import { todayISO, formatDatePT } from '../lib/date.js'
import { computeBettingStreak, computeProtocolDay, PHASE_LABELS } from '../lib/streak.js'
import { dayScore } from '../lib/consistency.js'
import { DEFAULT_ENTRY, SECTIONS } from '../lib/formSchema.js'
import Section from './Section.jsx'

const MINIMO_VIAVEL_KEYS = ['betting_free', 'prayer_minutes', 'day_note']

export default function TodayScreen() {
  const [values, setValues] = useState(DEFAULT_ENTRY)
  const [streak, setStreak] = useState(0)
  const [protocolDay, setProtocolDay] = useState(null)
  const [phase, setPhase] = useState(null)
  const [saving, setSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  const date = todayISO()

  async function refresh() {
    const [existing, entries, streakStart, protocolStart] = await Promise.all([
      getEntry(date),
      getAllEntries(),
      getSetting('betting_free_streak_start'),
      getSetting('protocol_start_date'),
    ])

    if (existing) setValues({ ...DEFAULT_ENTRY, ...existing })

    setStreak(computeBettingStreak(entries, streakStart))

    const { day, phase: currentPhase } = computeProtocolDay(protocolStart)
    setProtocolDay(day)
    setPhase(currentPhase)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    const normalized = { ...values, date }
    // converte campos numéricos vazios em null, e strings numéricas em number
    for (const section of SECTIONS) {
      for (const field of section.fields) {
        if (field.type === 'number') {
          const raw = normalized[field.key]
          normalized[field.key] = raw === '' || raw === null || raw === undefined ? null : Number(raw)
        }
      }
    }
    normalized.day_score = dayScore(normalized)

    await saveEntry(normalized)
    await refresh()
    setSaving(false)
    setSavedMessage('Dia guardado.')
    setTimeout(() => setSavedMessage(''), 2500)
  }

  const isDayRuim = values.day_type === 'ruim'

  return (
    <div className="max-w-md mx-auto px-5 pb-28 pt-8">
      {/* Hero: sequência sem apostar */}
      <div className="text-center mb-8">
        <p className="text-muted text-sm mb-1 capitalize">{formatDatePT(date)}</p>
        <p className="font-serif text-6xl text-gold leading-none">{streak}</p>
        <p className="text-muted text-sm mt-1">dias sem apostar</p>
        {protocolDay != null && (
          <p className="text-sage text-sm mt-4">
            Dia {protocolDay} de 90 · {PHASE_LABELS[phase]}
          </p>
        )}
      </div>

      {isDayRuim && (
        <div className="border border-rust/40 bg-rust/10 rounded-md px-4 py-3 mb-4 text-sm">
          Dia marcado como "ruim". O mínimo viável hoje: não apostar, uma oração curta
          e uma nota sobre o dia. O resto pode esperar.
        </div>
      )}

      <div className="border-t border-line">
        {SECTIONS.map((section, i) => (
          <Section
            key={section.id}
            section={section}
            values={values}
            onChange={handleChange}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full mt-6 bg-gold text-bg font-medium rounded-md py-3 disabled:opacity-60"
      >
        {saving ? 'A guardar…' : 'Guardar dia'}
      </button>

      {savedMessage && (
        <p className="text-sage text-sm text-center mt-3">{savedMessage}</p>
      )}
    </div>
  )
}
