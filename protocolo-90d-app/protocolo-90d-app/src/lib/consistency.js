// As "regras inegociáveis" (secção 18 do protocolo) usadas para calcular
// a pontuação do dia e o Índice de Consistência 90D.
export const REQUIRED_RULES = [
  { key: 'betting_free', label: 'Zero apostas', check: (e) => e.betting_free === true },
  { key: 'screen', label: 'Tela ≤ 5h', check: (e) => typeof e.screen_hours === 'number' && e.screen_hours <= 5 },
  { key: 'sleep_logged', label: 'Sono registado', check: (e) => e.sleep_hours != null && e.sleep_hours !== '' },
  { key: 'prayer', label: 'Oração (≥5 min)', check: (e) => Number(e.prayer_minutes || 0) >= 5 },
  { key: 'english', label: 'Inglês', check: (e) => Number(e.english_minutes || 0) > 0 },
  { key: 'skill', label: 'Habilidade profissional', check: (e) => Number(e.skill_minutes || 0) > 0 },
  { key: 'expenses', label: 'Gastos registados', check: (e) => e.expenses_logged === true },
  { key: 'writing', label: 'Escrita/journaling', check: (e) => e.writing_done === true },
]

export function dayScore(entry) {
  const total = REQUIRED_RULES.length
  const met = REQUIRED_RULES.filter((r) => r.check(entry)).length
  return Math.round((met / total) * 100)
}

export function weeklyConsistency(entries) {
  if (!entries.length) return 0
  const scores = entries.map(dayScore)
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

export function average(entries, key) {
  const vals = entries
    .map((e) => e[key])
    .filter((v) => typeof v === 'number' && !Number.isNaN(v))
  if (!vals.length) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}
