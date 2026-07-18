"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Plus,
  Clock,
  TrendingUp,
  Sparkles,
  UserPlus,
  ArrowUpRight,
  Check,
  Instagram,
  ChevronRight,
  Bell,
} from "lucide-react"
import { FAvatar } from "@/components/finesse/finesse-ui"
import {
  citasHoy,
  tareas as tareasSeed,
  recordatorios,
  metricasHoy,
  momentoBeauty,
} from "./_data/demo"

const ESTADO_LABEL: Record<string, { label: string; chip: string }> = {
  completada: { label: "Completada", chip: "f-chip-sage" },
  en_curso: { label: "En curso", chip: "f-chip-rose" },
  confirmada: { label: "Confirmada", chip: "f-chip-gold" },
  pendiente: { label: "Por confirmar", chip: "f-chip-neutral" },
}

export default function TodayPage() {
  const [tareas, setTareas] = useState(tareasSeed.slice(0, 4))
  const toggle = (id: string) =>
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)))

  const proxima = citasHoy.find((c) => c.estado === "confirmada" || c.estado === "pendiente")

  return (
    <div className="f-rise">
      {/* Greeting */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="f-eyebrow mb-2">Jueves 18 de julio</p>
          <h1 className="f-serif text-[2.25rem] font-semibold leading-tight lg:text-[3rem]" style={{ color: "var(--f-ink)" }}>
            Buenos días, Marisol
          </h1>
          <p className="mt-1.5 text-sm lg:text-[15px]" style={{ color: "var(--f-muted)" }}>
            Tienes {metricasHoy.citas} citas hoy y {tareas.filter((t) => !t.hecha).length} pendientes por resolver.
          </p>
        </div>
        <button className="f-btn f-btn-primary">
          <Plus className="h-4 w-4" />
          Nueva cita
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Metric icon={Clock} label="Citas hoy" value={String(metricasHoy.citas)} hint="2 completadas" tone="rose" />
        <Metric icon={TrendingUp} label="Ingresos previstos" value={`${metricasHoy.ingresos} €`} hint="+18% vs. ayer" tone="gold" />
        <Metric icon={Sparkles} label="Ocupación" value={`${metricasHoy.ocupacion}%`} hint="Muy buena" tone="sage" />
        <Metric icon={UserPlus} label="Nuevas clientas" value={String(metricasHoy.nuevasClientas)} hint="Vía Instagram" tone="plum" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* Next appointment highlight */}
          {proxima && (
            <div className="f-card overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-5">
                <p className="f-eyebrow">Próxima cita</p>
                <span className={`f-chip ${ESTADO_LABEL[proxima.estado].chip}`}>
                  {ESTADO_LABEL[proxima.estado].label}
                </span>
              </div>
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="text-center">
                  <p className="f-serif text-3xl font-semibold" style={{ color: "var(--f-rose-deep)" }}>
                    {proxima.hora}
                  </p>
                  <p className="text-xs" style={{ color: "var(--f-faint)" }}>{proxima.duracion}</p>
                </div>
                <div className="h-12 w-px" style={{ background: "var(--f-line-strong)" }} />
                <FAvatar initials={proxima.iniciales} color={proxima.color} className="h-12 w-12 text-base" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold" style={{ color: "var(--f-ink)" }}>
                    {proxima.clienta}
                  </p>
                  <p className="truncate text-sm" style={{ color: "var(--f-muted)" }}>{proxima.servicio}</p>
                </div>
                <button className="f-btn f-btn-ghost hidden sm:inline-flex">Ver ficha</button>
              </div>
            </div>
          )}

          {/* Today's agenda */}
          <div className="f-card">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Agenda de hoy</h2>
              <Link href="/finesse/agenda" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--f-rose-deep)" }}>
                Ver agenda <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="f-hairline mx-5" />
            <ul className="px-2 py-2">
              {citasHoy.map((c) => (
                <li key={c.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-[var(--f-surface-2)]">
                  <div className="w-14 shrink-0 text-right">
                    <p className="text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{c.hora}</p>
                    <p className="text-[11px]" style={{ color: "var(--f-faint)" }}>{c.duracion}</p>
                  </div>
                  <span className="h-9 w-1 shrink-0 rounded-full" style={{ background: `var(--f-${c.color === "gold" ? "gold" : c.color === "sage" ? "sage" : c.color === "plum" ? "plum" : "rose"})` }} />
                  <FAvatar initials={c.iniciales} color={c.color} className="h-9 w-9 text-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{c.clienta}</p>
                    <p className="truncate text-xs" style={{ color: "var(--f-muted)" }}>{c.servicio}</p>
                  </div>
                  <span className={`f-chip ${ESTADO_LABEL[c.estado].chip} hidden sm:inline-flex`}>
                    {ESTADO_LABEL[c.estado].label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Momento Beauty */}
          <div className="f-card overflow-hidden">
            <div className="relative h-40 w-full lg:h-48">
              <Image src="/finesse/momento-beauty.png" alt="Inspiración de contenido beauty" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(58,46,40,0.55), rgba(58,46,40,0.05))" }} />
              <div className="absolute left-5 top-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">Finesse</p>
                <h2 className="f-serif mt-1 text-2xl font-semibold text-white lg:text-3xl">{momentoBeauty.titulo}</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-3 rounded-2xl p-3.5" style={{ background: "var(--f-rose-tint)" }}>
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--f-rose-deep)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "var(--f-ink)" }}>{momentoBeauty.sugerencia}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {momentoBeauty.ideas.map((idea) => (
                  <span key={idea} className="f-chip f-chip-neutral">{idea}</span>
                ))}
              </div>
              <button className="f-btn f-btn-gold mt-4 w-full sm:w-auto">
                <Instagram className="h-4 w-4" />
                Programar publicación
              </button>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-5">
          {/* Quick tasks */}
          <div className="f-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Tareas rápidas</h2>
              <Link href="/finesse/tareas" className="text-sm font-medium" style={{ color: "var(--f-rose-deep)" }}>Todas</Link>
            </div>
            <ul className="flex flex-col gap-1.5">
              {tareas.map((t) => (
                <li key={t.id}>
                  <button onClick={() => toggle(t.id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--f-surface-2)]">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors"
                      style={{
                        borderColor: t.hecha ? "var(--f-rose)" : "var(--f-line-strong)",
                        background: t.hecha ? "var(--f-rose)" : "transparent",
                      }}
                    >
                      {t.hecha && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </span>
                    <span className="flex-1 text-sm" style={{ color: t.hecha ? "var(--f-faint)" : "var(--f-ink)", textDecoration: t.hecha ? "line-through" : "none" }}>
                      {t.texto}
                    </span>
                    {t.prioridad === "alta" && !t.hecha && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--f-rose)" }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Reminders */}
          <div className="f-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4" style={{ color: "var(--f-gold)" }} />
              <h2 className="text-[15px] font-semibold" style={{ color: "var(--f-ink)" }}>Recordatorios</h2>
            </div>
            <ul className="flex flex-col gap-2.5">
              {recordatorios.map((r) => (
                <li key={r.id} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--f-gold)" }} />
                  <div>
                    <p className="text-sm" style={{ color: "var(--f-ink)" }}>{r.texto}</p>
                    <p className="text-xs" style={{ color: "var(--f-faint)" }}>{r.tipo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="f-card-soft p-5">
            <h2 className="f-serif text-xl font-semibold" style={{ color: "var(--f-ink)" }}>¿Un hueco libre?</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--f-muted)" }}>
              Ofrece tu disponibilidad de última hora a tus clientas frecuentes.
            </p>
            <button className="f-btn f-btn-ghost mt-3.5 w-full">
              Enviar oferta
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: typeof Clock
  label: string
  value: string
  hint: string
  tone: "rose" | "gold" | "sage" | "plum"
}) {
  const bg: Record<string, string> = {
    rose: "var(--f-rose-soft)",
    gold: "var(--f-gold-soft)",
    sage: "var(--f-sage-soft)",
    plum: "var(--f-plum-soft)",
  }
  const fg: Record<string, string> = {
    rose: "var(--f-rose-deep)",
    gold: "#8a6a2f",
    sage: "#566b4d",
    plum: "#7a4f66",
  }
  return (
    <div className="f-card p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: bg[tone], color: fg[tone] }}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <p className="mt-3 f-serif text-2xl font-semibold lg:text-3xl" style={{ color: "var(--f-ink)" }}>{value}</p>
      <p className="text-[13px] font-medium" style={{ color: "var(--f-ink)" }}>{label}</p>
      <p className="text-xs" style={{ color: "var(--f-faint)" }}>{hint}</p>
    </div>
  )
}
