"use client"

import { useState } from "react"
import { ArrowLeft, Send, Phone, CalendarPlus, Sparkles, Search } from "lucide-react"
import { FAvatar } from "@/components/finesse/finesse-ui"
import { conversaciones, plantillas, type Conversacion } from "../_data/demo"

const CANAL_STYLE: Record<string, { bg: string; fg: string }> = {
  WhatsApp: { bg: "var(--f-sage-soft)", fg: "#4a7a52" },
  Instagram: { bg: "var(--f-plum-soft)", fg: "#a3457e" },
  Gmail: { bg: "var(--f-rose-soft)", fg: "var(--f-rose-deep)" },
}

export default function InboxPage() {
  const [activeId, setActiveId] = useState<string | null>(conversaciones[0].id)
  const active = conversaciones.find((c) => c.id === activeId) ?? null

  return (
    <div className="f-rise">
      <div className="mb-5">
        <p className="f-eyebrow mb-2">Conversaciones</p>
        <h1 className="f-serif text-3xl font-semibold leading-tight lg:text-[2.5rem]" style={{ color: "var(--f-ink)" }}>
          Inbox
        </h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* Conversation list — hidden on mobile when a thread is open */}
        <div className={`${active ? "hidden lg:block" : "block"}`}>
          <div className="mb-3 flex items-center gap-2 rounded-full px-3.5 py-2.5" style={{ background: "var(--f-surface)", border: "1px solid var(--f-line)" }}>
            <Search className="h-4 w-4" style={{ color: "var(--f-faint)" }} />
            <input
              placeholder="Buscar conversación…"
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "var(--f-ink)" }}
            />
          </div>
          <ul className="flex flex-col gap-2">
            {conversaciones.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className="f-card flex w-full items-start gap-3 p-3.5 text-left transition-colors"
                  style={{ background: activeId === c.id ? "var(--f-rose-tint)" : "var(--f-surface)" }}
                >
                  <FAvatar initials={c.iniciales} color={c.color} className="h-11 w-11 text-sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{c.clienta}</p>
                      <span className="shrink-0 text-[11px]" style={{ color: "var(--f-faint)" }}>{c.hora}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs" style={{ color: "var(--f-muted)" }}>{c.ultimo}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: CANAL_STYLE[c.canal].bg, color: CANAL_STYLE[c.canal].fg }}
                      >
                        {c.canal}
                      </span>
                      {c.etiqueta && <span className="f-chip f-chip-neutral !py-0.5 !text-[10px]">{c.etiqueta}</span>}
                    </div>
                  </div>
                  {c.noLeidos > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white" style={{ background: "var(--f-rose)" }}>
                      {c.noLeidos}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Thread */}
        <div className={`${active ? "block" : "hidden lg:block"}`}>
          {active ? (
            <Thread conv={active} onBack={() => setActiveId(null)} />
          ) : (
            <div className="f-card flex h-full min-h-[360px] flex-col items-center justify-center p-8 text-center">
              <Sparkles className="h-7 w-7" style={{ color: "var(--f-gold)" }} />
              <p className="f-serif mt-3 text-xl" style={{ color: "var(--f-ink)" }}>Elige una conversación</p>
              <p className="mt-1 text-sm" style={{ color: "var(--f-muted)" }}>Responde con cariño y a tiempo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Thread({ conv, onBack }: { conv: Conversacion; onBack: () => void }) {
  return (
    <div className="f-card flex h-[560px] flex-col overflow-hidden lg:h-[600px]">
      {/* Thread header */}
      <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--f-line)" }}>
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full lg:hidden" style={{ background: "var(--f-surface-2)" }}>
          <ArrowLeft className="h-5 w-5" style={{ color: "var(--f-ink)" }} />
        </button>
        <FAvatar initials={conv.iniciales} color={conv.color} className="h-10 w-10 text-sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{conv.clienta}</p>
          <span
            className="text-[11px] font-semibold"
            style={{ color: CANAL_STYLE[conv.canal].fg }}
          >
            {conv.canal}
          </span>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--f-surface-2)" }}>
          <Phone className="h-[18px] w-[18px]" style={{ color: "var(--f-muted)" }} />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--f-rose-soft)" }}>
          <CalendarPlus className="h-[18px] w-[18px]" style={{ color: "var(--f-rose-deep)" }} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5" style={{ background: "var(--f-canvas)" }}>
        {conv.mensajes.map((m, i) => (
          <div key={i} className={`flex ${m.de === "yo" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm"
              style={
                m.de === "yo"
                  ? { background: "var(--f-rose)", color: "#fff", borderBottomRightRadius: 6 }
                  : { background: "var(--f-surface)", color: "var(--f-ink)", border: "1px solid var(--f-line)", borderBottomLeftRadius: 6 }
              }
            >
              <p className="leading-relaxed">{m.texto}</p>
              <p className="mt-1 text-[10px]" style={{ color: m.de === "yo" ? "rgba(255,255,255,0.7)" : "var(--f-faint)" }}>{m.hora}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="flex gap-2 overflow-x-auto border-t px-4 py-2.5" style={{ borderColor: "var(--f-line)" }}>
        {plantillas.map((p) => (
          <button key={p.id} className="f-chip f-chip-neutral shrink-0 hover:brightness-95">{p.titulo}</button>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: "var(--f-line)" }}>
        <input
          placeholder="Escribe un mensaje…"
          className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none"
          style={{ background: "var(--f-surface-2)", border: "1px solid var(--f-line)", color: "var(--f-ink)" }}
        />
        <button className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: "var(--f-rose)" }}>
          <Send className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  )
}
