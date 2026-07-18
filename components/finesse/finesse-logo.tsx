export function FinesseLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale = {
    sm: { word: "text-lg", by: "text-[9px]" },
    md: { word: "text-2xl", by: "text-[10px]" },
    lg: { word: "text-4xl", by: "text-xs" },
  }[size]

  return (
    <div className="flex flex-col items-start leading-none">
      <span
        className="f-display"
        style={{ color: "var(--f-ink)" }}
      >
        <span className={scale.word}>Finesse</span>
      </span>
      <span
        className={`${scale.by} mt-1 tracking-[0.32em] uppercase`}
        style={{ color: "var(--f-gold)", fontWeight: 600 }}
      >
        by Sevenef
      </span>
    </div>
  )
}
