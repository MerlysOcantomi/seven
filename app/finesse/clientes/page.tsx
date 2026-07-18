"use client"

import { useState } from "react"
import { Plus, Search, Phone, MessageCircle, Heart, Star, CalendarDays } from "lucide-react"
import { FAvatar } from "@/components/finesse/finesse-ui"
import { clientas, type Clienta } from "../_data/demo"

const FILTROS = ["Todas", "VIP", "Frecuente", "Nueva", "Riesgo"] as const

const ETIQUETA_CHIP: Record<string, string> = {
  VIP: "f-chip-gold",
  Frecuente: "f-chip-rose",
  Nueva: "f-chip-sage",
  Riesgo: "f-chip-plum",
}

export default function ClientesPage() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todas")
  const lista = filtro === "Todas" ? clientas : clientas.filter((c) => c.etiqueta === filtro)

  return (
    <div className="f-rise">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="f-eyebrow mb-2">{clientas.length} clientas</p>
          <h1 className="f-serif text-3xl font-semibold leading-tight lg:text-[2.5rem]" style={{ color: "var(--f-ink)" }}>
            Clientes
          </h1>
        </div>
        <button className="f-btn f-btn-primary">
          <Plus className="h-4 w-4" />
          Nueva clienta
        </button>
      </div>

      {/* Search + filters */}
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-full px-3.5 py-2.5" style={{ background: "var(--f-surface)", border: "1px solid var(--f-line)" }}>
          <Search className="h-4 w-4" style={{ color: "var(--f-faint)" }} />
          <input placeholder="Buscar por nombre o teléfono…" className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--f-ink)" }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="f-chip shrink-0"
              style={
                filtro === f
                  ? { background: "var(--f-rose)", color: "#fff" }
                  : { background: "var(--f-surface)", color: "var(--f-muted)", border: "1px solid var(--f-line)" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Client cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {lista.map((c) => (
          <ClientCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  )
}

function ClientCard({ c }: { c: Clienta }) {
  return (
    <article className="f-card p-5">
      <div className="flex items-start gap-3.5">
        <FAvatar initials={c.iniciales} color={c.color} className="h-14 w-14 text-lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-semibold" style={{ color: "var(--f-ink)" }}>{c.nombre}</h2>
            <span className={`f-chip ${ETIQUETA_CHIP[c.etiqueta]}`}>
              {c.etiqueta === "VIP" && <Star className="h-3 w-3" />}
              {c.etiqueta}
            </span>
          </div>
          <p className="mt-0.5 text-xs" style={{ color: "var(--f-muted)" }}>{c.telefono}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs" style={{ color: "var(--f-faint)" }}>
            <CalendarDays className="h-3 w-3" /> Última visita: {c.ultimaVisita}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl p-3" style={{ background: "var(--f-surface-2)" }}>
        <Stat value={String(c.visitas)} label="Visitas" />
        <Stat value={`${c.gastoTotal} €`} label="Gasto total" />
        <Stat value={c.favorito === "—" ? "—" : "★"} label="Favorito" title={c.favorito} />
      </div>

      {/* Favorito */}
      {c.favorito !== "—" && (
        <p className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: "var(--f-muted)" }}>
          <Heart className="h-3.5 w-3.5" style={{ color: "var(--f-rose)" }} />
          Servicio favorito: <span className="font-medium" style={{ color: "var(--f-ink)" }}>{c.favorito}</span>
        </p>
      )}

      {/* Preferences */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {c.preferencias.map((p) => (
          <span key={p} className="f-chip f-chip-neutral">{p}</span>
        ))}
      </div>

      {/* Notes */}
      <p className="mt-3 rounded-xl px-3 py-2 text-xs italic leading-relaxed" style={{ background: "var(--f-rose-tint)", color: "var(--f-ink)" }}>
        “{c.notas}”
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button className="f-btn f-btn-ghost flex-1 !py-2 !text-[13px]">
          <MessageCircle className="h-4 w-4" /> Mensaje
        </button>
        <button className="f-btn f-btn-ghost flex-1 !py-2 !text-[13px]">
          <Phone className="h-4 w-4" /> Llamar
        </button>
        <button className="f-btn f-btn-primary flex-1 !py-2 !text-[13px]">
          <CalendarDays className="h-4 w-4" /> Agendar
        </button>
      </div>
    </article>
  )
}

function Stat({ value, label, title }: { value: string; label: string; title?: string }) {
  return (
    <div className="text-center" title={title}>
      <p className="f-serif text-lg font-semibold" style={{ color: "var(--f-ink)" }}>{value}</p>
      <p className="text-[11px]" style={{ color: "var(--f-faint)" }}>{label}</p>
    </div>
  )
}
