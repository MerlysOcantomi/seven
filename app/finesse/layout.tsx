import type { Metadata } from "next"
import { Cinzel_Decorative, Cormorant_Garamond, Inter } from "next/font/google"
import { FinesseShell } from "@/components/finesse/finesse-shell"
import "./finesse.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-cinzel",
})
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Finesse — by Sevenef",
  description: "Gestión beauty premium: agenda, clientas, inbox y tu momento en redes.",
}

export default function FinesseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`finesse ${inter.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <FinesseShell>{children}</FinesseShell>
    </div>
  )
}
