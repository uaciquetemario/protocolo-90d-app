import { todayISO, diffInDays } from './date.js'

/**
 * Calcula a sequência atual de dias sem apostar.
 *
 * Regra: a contagem começa em `streakStartISO` (que pode já incluir dias
 * anteriores ao uso do app, ex.: os ~30 dias que a utilizadora já tinha).
 * Se existir algum daily_entry com betting_free === false numa data >=
 * streakStartISO, a sequência reinicia no dia seguinte a essa quebra.
 * Dias sem registo não quebram a sequência (assume-se que continuou).
 */
export function computeBettingStreak(entries, streakStartISO, todayOverride = null) {
  const today = todayOverride || todayISO()
  if (!streakStartISO) return 0

  const breaks = entries
    .filter((e) => e.date >= streakStartISO && e.date <= today && e.betting_free === false)
    .map((e) => e.date)
    .sort()

  const effectiveStart = breaks.length > 0 ? addOneDay(breaks[breaks.length - 1]) : streakStartISO

  const days = diffInDays(today, effectiveStart) + 1
  return Math.max(0, days)
}

function addOneDay(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + 1)
  const yy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

/**
 * Determina o dia do protocolo (1-90+) e a fase atual, a partir da data de início.
 */
export function computeProtocolDay(protocolStartISO, todayOverride = null) {
  const today = todayOverride || todayISO()
  if (!protocolStartISO) return { day: null, phase: null }

  const day = diffInDays(today, protocolStartISO) + 1

  let phase = 'reset'
  if (day > 60) phase = 'expansao'
  else if (day > 30) phase = 'construcao'

  return { day, phase }
}

export const PHASE_LABELS = {
  reset: 'Fase 1 — Reset (D1–30)',
  construcao: 'Fase 2 — Construção (D31–60)',
  expansao: 'Fase 3 — Expansão (D61–90)',
}
