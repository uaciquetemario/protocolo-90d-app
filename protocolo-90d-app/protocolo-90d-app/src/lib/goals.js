// As 10 metas-mãe do protocolo (secção 17 de docs/PROTOCOLO-90D.md).
// `compute` recebe { entries, streak, outreach } e devolve o valor atual.
// `invert: true` significa que "menor é melhor" (ex.: horas de tela).
export const GOALS = [
  {
    id: 'zero_apostas',
    title: 'Zero apostas',
    unit: 'dias sem apostar',
    target: 120,
    compute: ({ streak }) => streak,
  },
  {
    id: 'controle_digital',
    title: 'Controlo digital',
    unit: 'h de tela em média (meta: ≤ 5h)',
    target: 5,
    invert: true,
    compute: ({ avgScreen }) => (avgScreen == null ? 0 : Number(avgScreen.toFixed(1))),
  },
  {
    id: 'saude',
    title: 'Saúde',
    unit: 'sessões de exercício',
    target: 30,
    compute: ({ entries }) => entries.filter((e) => e.exercise_done).length,
  },
  {
    id: 'espiritualidade',
    title: 'Espiritualidade',
    unit: 'dias com prática espiritual',
    target: 78,
    compute: ({ entries }) => entries.filter((e) => e.bible_done || Number(e.prayer_minutes || 0) > 0).length,
  },
  {
    id: 'ingles',
    title: 'Inglês',
    unit: 'sessões de inglês',
    target: 70,
    compute: ({ entries }) => entries.filter((e) => Number(e.english_minutes || 0) > 0).length,
  },
  {
    id: 'habilidade',
    title: 'Habilidade profissional',
    unit: 'sessões dedicadas',
    target: 70,
    compute: ({ entries }) => entries.filter((e) => Number(e.skill_minutes || 0) > 0).length,
  },
  {
    id: 'renda',
    title: 'Renda',
    unit: 'primeira proposta enviada',
    target: 1,
    compute: ({ outreach }) => (outreach.length > 0 ? 1 : 0),
  },
  {
    id: 'financas',
    title: 'Finanças',
    unit: 'dias com gastos registados',
    target: 90,
    compute: ({ entries }) => entries.filter((e) => e.expenses_logged).length,
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos',
    unit: 'momentos de qualidade',
    target: 13,
    compute: ({ entries }) => entries.filter((e) => e.relationship_quality_time).length,
  },
  {
    id: 'vida',
    title: 'Vida real',
    unit: 'experiências significativas',
    target: 12,
    compute: ({ entries }) => entries.filter((e) => e.life_experience_done).length,
  },
]

export function goalProgressPercent(goal, value) {
  if (goal.invert) {
    // menor é melhor: 100% quando value <= target, decresce conforme sobe
    if (value <= goal.target) return 100
    const over = value - goal.target
    return Math.max(0, Math.round(100 - over * 10))
  }
  return Math.min(100, Math.round((value / goal.target) * 100))
}
