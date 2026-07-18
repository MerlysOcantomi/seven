"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, ChevronLeft, ChevronRight, Clock, Lock, ListChecks } from "lucide-react"
import { FAvatar } from "@/components/finesse/finesse-ui"
import { citasHoy, proximasCitas } from "../_data/demo"

const SEMANA = [
  { d: "L", n: 15 },
  { d: "M", n: 16 },
  { d: "X", n: 17 },
  { d: "J", n: 18 },
  { d: "V", n: 19 },
  { d: "S", n: 20 },
  { d: "D", n: 21 },
]

const ESTADO: Record<string, string> = {
  completada: "f-chip-sage",
  en_curso: "f-chip-rose",
  confirmada: "f-chip-gold",
  pendiente: "f-chip-neutral",
}
const ESTADO_LABEL: Record<string, string> = {
  completada: "Completada",
  en_curso: "En curso",
  confirmada: "Confirmada",
  pendiente: "Por confirmar",
}

// Build a timeline of appointments interleaved with free gaps.
const SLOTS = [
  { tipo: "cita" as const, ...citasHoy[0] },
  { tipo: "cita" as const, ...citasHoy[1] },
  { tipo: "libre" as const, desde: "11:30", label: "Libre · 30 min" },
  { tipo: "cita" as const, ...citasHoy[2] },
  { tipo: "cita" as const, ...citasHoy[3] },
  { tipo: "libre" as const, desde: "14:00", label: "Libre · 2 h" },
  { tipo: "cita" as const, ...citasHoy[4] },
  { tipo: "cita" as const, ...citasHoy[5] },
]

export default function AgendaPage() {
  const [sel, setSel] = useState(3)

  return (
    <div className="f-rise">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="f-eyebrow mb-2">Julio 2026</p>
          <h1 className="f-serif text-3xl font-semibold leading-tight lg:text-[2.5rem]" style={{ color: "var(--f-ink)" }}>
            Agenda
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--f-surface)", border: "1px solid var(--f-line)" }}>
            <ChevronLeft className="h-5 w-5" style={{ color: "var(--f-muted)" }} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--f-surface)", border: "1px solid var(--f-line)" }}>
            <ChevronRight className="h-5 w-5" style={{ color: "var(--f-muted)" }} />
          </button>
          <button className="f-btn f-btn-primary ml-1">
            <Plus className="h-4 w-4" />
            Nueva cita
          </button>
        </div>
      </div>

      {/* Week strip */}
      <div className="f-card mb-5 flex justify-between gap-1 p-2 sm:gap-2 sm:p-3">
        {SEMANA.map((day, i) => {
          const active = i === sel
          return (
            <button
              key={day.n}
              onClick={() => setSel(i)}
              className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-2.5 transition-colors"
              style={{
                background: active ? "var(--f-rose)" : "transparent",
                color: active ? "#fff" : "var(--f-muted)",
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider">{day.d}</span>
              <span className={`f-serif text-xl font-semibold ${active ? "text-white" : ""}`} style={{ color: active ? "#fff" : "var(--f-ink)" }}>
                {day.n}
              </span>
              {i === 3 ? (
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? "#fff" : "var(--f-rose)" }} />
              ) : (
                <span className="h-1.5 w-1.5" />
              )}
            </button>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>
              Jueves 18 · {citasHoy.length} citas
            </h2>
            <span className="f-chip f-chip-rose">6 h ocupadas</span>
          </div>

          <ol className="relative flex flex-col gap-2.5">
            {SLOTS.map((s, i) =>
              s.tipo === "cita" ? (
                <li key={i} className="f-card flex items-stretch gap-0 overflow-hidden">
                  <div
                    className="w-1.5 shrink-0"
                    style={{ background: `var(--f-${s.color === "gold" ? "gold" : s.color === "sage" ? "sage" : s.color === "plum" ? "plum" : "rose"})` }}
                  />
                  <div className="flex flex-1 items-center gap-3 p-3.5">
                    <div className="w-14 shrink-0 text-center">
                      <p className="text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{s.hora}</p>
                      <p className="text-[11px]" style={{ color: "var(--f-faint)" }}>{s.duracion}</p>
                    </div>
                    <FAvatar initials={s.iniciales} color={s.color} className="h-10 w-10 text-sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{s.clienta}</p>
                      <p className="truncate text-xs" style={{ color: "var(--f-muted)" }}>{s.servicio} · {s.precio} €</p>
                    </div>
                    <span className={`f-chip ${ESTADO[s.estado]} hidden sm:inline-flex`}>{ESTADO_LABEL[s.estado]}</span>
                  </div>
                </li>
              ) : (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-dashed px-4 py-3" style={{ borderColor: "var(--f-line-strong)" }}>
                  <div className="w-14 shrink-0 text-center">
                    <p className="text-xs font-medium" style={{ color: "var(--f-faint)" }}>{s.desde}</p>
                  </div>
                  <span className="flex-1 text-sm" style={{ color: "var(--f-faint)" }}>{s.label}</span>
                  <button className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--f-rose-deep)" }}>
                    <Plus className="h-4 w-4" /> Añadir
                  </button>
                </li>
              ),
            )}
          </ol>
        </div>

        {/* Side rail */}
        <div className="flex flex-col gap-5">
          <div className="f-card p-5">
            <h2 className="mb-3 text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Acciones rápidas</h2>
            <div className="flex flex-col gap-2">
              <QuickAction icon={Plus} label="Nueva cita" tone="rose" />
              <QuickAction icon={Lock} label="Bloquear horario" tone="gold" />
              <QuickAction icon={ListChecks} label="Lista de espera" tone="sage" />
            </div>
          </div>

          <div className="f-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: "var(--f-rose)" }} />
              <h2 className="text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Próximas citas</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {proximasCitas.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-16 shrink-0">
                    <p className="text-xs font-semibold" style={{ color: "var(--f-rose-deep)" }}>{c.fecha}</p>
                    <p className="text-[11px]" style={{ color: "var(--f-faint)" }}>{c.hora}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{c.clienta}</p>
                    <p className="truncate text-xs" style={{ color: "var(--f-muted)" }}>{c.servicio}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/finesse" className="mt-4 block text-center text-sm font-medium" style={{ color: "var(--f-rose-deep)" }}>
              Volver a hoy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label, tone }: { icon: typeof Plus; label: string; tone: "rose" | "gold" | "sage" }) {
  const bg: Record<string, string> = { rose: "var(--f-rose-soft)", gold: "var(--f-gold-soft)", sage: "var(--f-sage-soft)" }
  const fg: Record<string, string> = { rose: "var(--f-rose-deep)", gold: "#8a6a2f", sage: "#566b4d" }
  return (
    <button className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--f-surface-2)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: bg[tone], color: fg[tone] }}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-sm font-medium" style={{ color: "var(--f-ink)" }}>{label}</span>
    </button>
  )
}
