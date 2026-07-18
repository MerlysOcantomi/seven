import type { ReactNode } from "react"

const COLOR_BG: Record<string, string> = {
  rose: "var(--f-rose-soft)",
  gold: "var(--f-gold-soft)",
  sage: "var(--f-sage-soft)",
  plum: "var(--f-plum-soft)",
}
const COLOR_FG: Record<string, string> = {
  rose: "var(--f-rose-deep)",
  gold: "#8a6a2f",
  sage: "#566b4d",
  plum: "#7a4f66",
}

export function FAvatar({
  initials,
  color = "rose",
  className = "h-11 w-11 text-base",
}: {
  initials: string
  color?: string
  className?: string
}) {
  return (
    <span
      className={`f-avatar ${className}`}
      style={{ background: COLOR_BG[color] ?? COLOR_BG.rose, color: COLOR_FG[color] ?? COLOR_FG.rose }}
    >
      {initials}
    </span>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="f-eyebrow mb-2">{eyebrow}</p>
        <h1 className="f-serif text-3xl font-semibold leading-tight lg:text-[2.5rem]" style={{ color: "var(--f-ink)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm lg:text-[15px]" style={{ color: "var(--f-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="hidden shrink-0 lg:block">{action}</div>}
    </div>
  )
}
