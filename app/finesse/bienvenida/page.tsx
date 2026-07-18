import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Scissors, Users, Palette, ArrowRight, Check } from "lucide-react"
import { FinesseLogo } from "@/components/finesse/finesse-logo"

const PASOS = [
  { icon: MessageCircle, titulo: "Conecta tus canales", desc: "WhatsApp, Instagram y Gmail en un solo inbox.", hecho: true },
  { icon: Scissors, titulo: "Añade tus servicios", desc: "Precios, duración y disponibilidad.", hecho: true },
  { icon: Users, titulo: "Importa tus clientas", desc: "Historial, notas y preferencias.", hecho: false },
  { icon: Palette, titulo: "Personaliza tu marca", desc: "Colores, logo y plantillas de mensajes.", hecho: false },
]

export default function BienvenidaPage() {
  const completados = PASOS.filter((p) => p.hecho).length

  return (
    <div className="f-rise mx-auto max-w-3xl">
      {/* Hero */}
      <div className="f-card overflow-hidden">
        <div className="relative h-52 w-full sm:h-64">
          <Image src="/finesse/bienvenida.png" alt="Bienvenida a Finesse" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(58,46,40,0.10), rgba(58,46,40,0.55))" }} />
          <div className="absolute inset-x-0 bottom-0 p-6 text-center">
            <div className="inline-flex flex-col items-center">
              <span className="f-display text-3xl text-white sm:text-4xl">Finesse</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.32em] text-white/80">by Sevenef</span>
            </div>
          </div>
        </div>
        <div className="p-6 text-center sm:p-8">
          <p className="f-eyebrow">Te damos la bienvenida</p>
          <h1 className="f-serif mt-2 text-3xl font-semibold sm:text-4xl" style={{ color: "var(--f-ink)" }}>
            Tu belleza, con toda la finura
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-[15px]" style={{ color: "var(--f-muted)" }}>
            Gestiona citas, clientas y mensajes desde un solo lugar, con la elegancia que tu estudio merece.
            Configura tu espacio en unos minutos.
          </p>
        </div>
      </div>

      {/* Setup progress */}
      <div className="mt-5 flex items-center justify-between px-1">
        <p className="text-sm font-medium" style={{ color: "var(--f-ink)" }}>Configuración inicial</p>
        <span className="text-sm" style={{ color: "var(--f-muted)" }}>{completados} de {PASOS.length}</span>
      </div>

      {/* Steps */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {PASOS.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.titulo} className="f-card flex items-start gap-3.5 p-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: p.hecho ? "var(--f-rose)" : "var(--f-rose-soft)",
                  color: p.hecho ? "#fff" : "var(--f-rose-deep)",
                }}
              >
                {p.hecho ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <Icon className="h-5 w-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: "var(--f-ink)" }}>{p.titulo}</p>
                <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--f-muted)" }}>{p.desc}</p>
              </div>
              {!p.hecho && <ArrowRight className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--f-faint)" }} />}
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <Link href="/finesse" className="f-btn f-btn-primary w-full justify-center sm:w-auto sm:px-10">
          Entrar a Finesse
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs" style={{ color: "var(--f-faint)" }}>Puedes terminar la configuración más tarde.</p>
      </div>
    </div>
  )
}
