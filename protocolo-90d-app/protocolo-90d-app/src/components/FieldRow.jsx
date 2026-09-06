export default function FieldRow({ field, value, onChange }) {
  const { key, label, type, highlight } = field

  if (type === 'boolean') {
    return (
      <label
        className={`flex items-center justify-between gap-4 py-3 cursor-pointer ${
          highlight ? 'text-gold' : ''
        }`}
      >
        <span className={highlight ? 'font-serif text-lg' : 'text-[15px]'}>{label}</span>
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(key, e.target.checked)}
          className={`h-6 w-11 shrink-0 appearance-none rounded-full transition-colors relative
            before:absolute before:top-1 before:left-1 before:h-4 before:w-4 before:rounded-full
            before:bg-bg before:transition-transform
            ${value ? 'bg-gold before:translate-x-5' : 'bg-raised before:translate-x-0'}`}
        />
      </label>
    )
  }

  if (type === 'select') {
    return (
      <label className="flex flex-col gap-1 py-3">
        <span className="text-[15px] text-muted">{label}</span>
        <select
          value={value ?? ''}
          onChange={(e) => onChange(key, e.target.value)}
          className="bg-raised border border-line rounded-md px-3 py-2 text-ink"
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === '' ? '—' : opt}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (type === 'textarea') {
    return (
      <label className="flex flex-col gap-1 py-3">
        <span className="text-[15px] text-muted">{label}</span>
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(key, e.target.value)}
          rows={3}
          className="bg-raised border border-line rounded-md px-3 py-2 text-ink resize-none"
        />
      </label>
    )
  }

  // number, text, time
  return (
    <label className="flex flex-col gap-1 py-3">
      <span className="text-[15px] text-muted">{label}</span>
      <input
        type={type}
        step={field.step}
        min={field.min}
        max={field.max}
        value={value ?? ''}
        onChange={(e) => onChange(key, type === 'number' ? e.target.value : e.target.value)}
        className="bg-raised border border-line rounded-md px-3 py-2 text-ink"
      />
    </label>
  )
}
