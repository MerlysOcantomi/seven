"use client"

import { useState } from "react"
import { Plus, Check } from "lucide-react"
import { tareas as tareasSeed, type Tarea } from "../_data/demo"

const PRIORIDAD_CHIP: Record<string, string> = {
  alta: "f-chip-rose",
  media: "f-chip-gold",
  baja: "f-chip-neutral",
}
const PRIORIDAD_LABEL: Record<string, string> = {
  alta: "Prioritaria",
  media: "Media",
  baja: "Cuando puedas",
}

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasSeed)
  const toggle = (id: string) => setTareas((p) => p.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))

  const pendientes = tareas.filter((t) => !t.hecha)
  const hechas = tareas.filter((t) => t.hecha)

  return (
    <div className="f-rise">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="f-eyebrow mb-2">{pendientes.length} pendientes · {hechas.length} completadas</p>
          <h1 className="f-serif text-3xl font-semibold leading-tight lg:text-[2.5rem]" style={{ color: "var(--f-ink)" }}>
            Pendientes
          </h1>
        </div>
        <button className="f-btn f-btn-primary">
          <Plus className="h-4 w-4" />
          Nueva tarea
        </button>
      </div>

      {/* Progress */}
      <div className="f-card mb-5 p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium" style={{ color: "var(--f-ink)" }}>Progreso del día</span>
          <span style={{ color: "var(--f-muted)" }}>{hechas.length}/{tareas.length}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--f-surface-soft)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(hechas.length / tareas.length) * 100}%`, background: "var(--f-rose)" }}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Pending */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Por hacer</h2>
          <ul className="flex flex-col gap-2.5">
            {pendientes.map((t) => (
              <TaskRow key={t.id} t={t} onToggle={toggle} />
            ))}
            {pendientes.length === 0 && (
              <li className="f-card-soft p-6 text-center text-sm" style={{ color: "var(--f-muted)" }}>
                Todo listo por hoy. Disfruta tu café ☕
              </li>
            )}
          </ul>
        </section>

        {/* Done */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Completadas</h2>
          <ul className="flex flex-col gap-2.5">
            {hechas.map((t) => (
              <TaskRow key={t.id} t={t} onToggle={toggle} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function TaskRow({ t, onToggle }: { t: Tarea; onToggle: (id: string) => void }) {
  return (
    <li className="f-card flex items-center gap-3 p-3.5">
      <button
        onClick={() => onToggle(t.id)}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors"
        style={{
          borderColor: t.hecha ? "var(--f-rose)" : "var(--f-line-strong)",
          background: t.hecha ? "var(--f-rose)" : "transparent",
        }}
        aria-label={t.hecha ? "Marcar como pendiente" : "Marcar como hecha"}
      >
        {t.hecha && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm"
          style={{ color: t.hecha ? "var(--f-faint)" : "var(--f-ink)", textDecoration: t.hecha ? "line-through" : "none" }}
        >
          {t.texto}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[11px]" style={{ color: "var(--f-faint)" }}>{t.contexto}</span>
          {t.hora && <span className="text-[11px]" style={{ color: "var(--f-faint)" }}>· {t.hora}</span>}
        </div>
      </div>
      {!t.hecha && <span className={`f-chip ${PRIORIDAD_CHIP[t.prioridad]}`}>{PRIORIDAD_LABEL[t.prioridad]}</span>}
    </li>
  )
}
