// Todas as datas são tratadas como strings "YYYY-MM-DD" para evitar
// problemas de fuso horário ao comparar/gravar no IndexedDB.

export function todayISO() {
  const d = new Date()
  return toISO(d)
}

export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromISO(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function diffInDays(isoA, isoB) {
  const a = fromISO(isoA)
  const b = fromISO(isoB)
  const ms = a.getTime() - b.getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

export function addDays(iso, days) {
  const d = fromISO(iso)
  d.setDate(d.getDate() + days)
  return toISO(d)
}

export function formatDatePT(iso) {
  const d = fromISO(iso)
  return d.toLocaleDateString('pt-PT', { weekday: 'long', day: '2-digit', month: 'long' })
}

export function lastNDaysISO(n, endISO = todayISO()) {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    days.push(addDays(endISO, -i))
  }
  return days
}
