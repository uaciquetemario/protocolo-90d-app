import { useEffect, useState } from 'react'
import { getAllEntries, getAllFromStore, getSetting, STORES } from '../db.js'
import { todayISO, lastNDaysISO } from '../lib/date.js'
import { computeBettingStreak } from '../lib/streak.js'
import { weeklyConsistency, average } from '../lib/consistency.js'
import { GOALS, goalProgressPercent } from '../lib/goals.js'

export default function DashboardScreen() {
  const [entries, setEntries] = useState([])
  const [outreach, setOutreach] = useState([])
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [allEntries, outreachRows, streakStart] = await Promise.all([
        getAllEntries(),
        getAllFromStore(STORES.OUTREACH_LOG),
        getSetting('betting_free_streak_start'),
      ])
      setEntries(allEntries)
      setOutreach(outreachRows)
      setStreak(computeBettingStreak(allEntries, streakStart))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return <div className="max-w-md mx-auto px-5 pt-8 text-muted">A carregar…</div>
  }

  const today = todayISO()
  const last7Dates = new Set(lastNDaysISO(7, today))
  const last7Entries = entries.filter((e) => last7Dates.has(e.date))

  const consistency = weeklyConsistency(last7Entries)
  const avgScreen = average(last7Entries, 'screen_hours')
  const avgSleep = average(last7Entries, 'sleep_hours')
  const avgWater = average(last7Entries, 'water_liters')

  const goalContext = { entries, streak, avgScreen, outreach }

  return (
    <div className="max-w-md mx-auto px-5 pb-28 pt-8">
      <h1 className="font-serif text-2xl mb-6">Painel</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard label="Consistência (7 dias)" value={`${consistency}%`} accent="gold" />
        <StatCard label="Dias sem apostar" value={streak} accent="gold" />
        <StatCard label="Sono médio (7d)" value={avgSleep != null ? `${avgSleep.toFixed(1)}h` : '—'} />
        <StatCard label="Tela média (7d)" value={avgScreen != null ? `${avgScreen.toFixed(1)}h` : '—'} />
      </div>

      <h2 className="font-serif text-lg mb-3">As 10 metas-mãe</h2>
      <div className="divide-y divide-line/60 border-t border-b border-line">
        {GOALS.map((goal) => {
          const value = goal.compute(goalContext)
          const percent = goalProgressPercent(goal, value)
          return (
            <div key={goal.id} className="py-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[15px]">{goal.title}</span>
                <span className="text-muted text-sm">
                  {value} / {goal.target} {goal.unit}
                </span>
              </div>
              <div className="h-1.5 bg-raised rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-muted text-xs mt-6">
        Água média (7 dias): {avgWater != null ? `${avgWater.toFixed(1)}L` : 'sem registos'}
      </p>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className="border border-line rounded-md px-4 py-4">
      <p className={`font-serif text-3xl ${accent === 'gold' ? 'text-gold' : 'text-ink'}`}>{value}</p>
      <p className="text-muted text-xs mt-1">{label}</p>
    </div>
  )
}
