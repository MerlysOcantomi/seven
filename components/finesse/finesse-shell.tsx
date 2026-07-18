"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sparkles,
  CalendarDays,
  Users,
  MessageCircle,
  ListChecks,
  Search,
  Bell,
  Settings,
  Flower2,
} from "lucide-react"
import { FinesseLogo } from "./finesse-logo"
import { conversaciones } from "@/app/finesse/_data/demo"

const NAV = [
  { href: "/finesse", label: "Hoy", icon: Sparkles },
  { href: "/finesse/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/finesse/clientes", label: "Clientes", icon: Users },
  { href: "/finesse/inbox", label: "Inbox", icon: MessageCircle },
  { href: "/finesse/tareas", label: "Pendientes", icon: ListChecks },
]

export function FinesseShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const unread = conversaciones.reduce((n, c) => n + c.noLeidos, 0)

  const isActive = (href: string) =>
    href === "/finesse" ? pathname === "/finesse" : pathname.startsWith(href)

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--f-canvas)" }}>
      {/* ===== Desktop sidebar ===== */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r px-5 py-7 lg:flex"
        style={{ background: "var(--f-surface)", borderColor: "var(--f-line)" }}
      >
        <div className="px-2">
          <FinesseLogo size="md" />
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-full px-3.5 py-2.5"
          style={{ background: "var(--f-surface-2)", border: "1px solid var(--f-line)" }}>
          <Search className="h-4 w-4" style={{ color: "var(--f-faint)" }} />
          <span className="text-sm" style={{ color: "var(--f-faint)" }}>Buscar clienta…</span>
        </div>

        <nav className="mt-7 flex flex-col gap-1.5">
          <p className="f-eyebrow px-2 pb-2">Panel</p>
          {NAV.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link key={item.href} href={item.href} className="f-nav-item" data-active={active}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                <span className="text-sm">{item.label}</span>
                {item.href === "/finesse/inbox" && unread > 0 && (
                  <span
                    className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white"
                    style={{ background: "var(--f-rose)" }}
                  >
                    {unread}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/finesse/bienvenida"
            className="flex items-center gap-2.5 rounded-2xl px-3.5 py-3 text-sm transition-colors"
            style={{ background: "var(--f-rose-tint)", color: "var(--f-rose-deep)" }}
          >
            <Flower2 className="h-4 w-4" />
            <span className="font-medium">Bienvenida a Finesse</span>
          </Link>
          <div
            className="flex items-center gap-3 rounded-2xl px-3 py-3"
            style={{ background: "var(--f-surface-2)", border: "1px solid var(--f-line)" }}
          >
            <span className="f-avatar h-9 w-9 text-sm">MR</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold" style={{ color: "var(--f-ink)" }}>
                Estudio Marisol
              </p>
              <p className="truncate text-xs" style={{ color: "var(--f-muted)" }}>Plan Atelier</p>
            </div>
            <Settings className="h-4 w-4" style={{ color: "var(--f-faint)" }} />
          </div>
        </div>
      </aside>

      {/* ===== Mobile top bar ===== */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between border-b px-5 py-3.5 lg:hidden"
        style={{ background: "color-mix(in srgb, var(--f-surface) 88%, transparent)", borderColor: "var(--f-line)", backdropFilter: "blur(10px)" }}
      >
        <FinesseLogo size="sm" />
        <div className="flex items-center gap-2">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--f-surface-2)", border: "1px solid var(--f-line)" }}
            aria-label="Notificaciones"
          >
            <Bell className="h-[18px] w-[18px]" style={{ color: "var(--f-muted)" }} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--f-rose)" }} />
          </button>
          <span className="f-avatar h-9 w-9 text-sm">MR</span>
        </div>
      </header>

      {/* ===== Main content ===== */}
      <main className="lg:pl-[264px]">
        <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-6 lg:px-10 lg:pb-12 lg:pt-9">
          {children}
        </div>
      </main>

      {/* ===== Mobile bottom nav ===== */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex items-stretch border-t px-2 pb-[env(safe-area-inset-bottom)] pt-1 lg:hidden"
        style={{ background: "color-mix(in srgb, var(--f-surface) 92%, transparent)", borderColor: "var(--f-line)", backdropFilter: "blur(12px)" }}
      >
        {NAV.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} className="f-tab" data-active={active}>
              <span className="relative">
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.3 : 1.8} />
                {item.href === "/finesse/inbox" && unread > 0 && (
                  <span
                    className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ background: "var(--f-rose)" }}
                  >
                    {unread}
                  </span>
                )}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
