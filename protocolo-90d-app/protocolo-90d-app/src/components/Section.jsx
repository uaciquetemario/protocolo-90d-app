import FieldRow from './FieldRow.jsx'

export default function Section({ section, values, onChange, defaultOpen = false }) {
  return (
    <details
      className="border-b border-line py-1 group"
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between py-3 cursor-pointer select-none list-none">
        <span className="font-serif text-lg">{section.title}</span>
        <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="divide-y divide-line/60 pb-2">
        {section.fields.map((field) => (
          <FieldRow
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={onChange}
          />
        ))}
      </div>
    </details>
  )
}
