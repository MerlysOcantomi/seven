import { NextRequest, NextResponse } from "next/server"
import { createSession, buildSessionCookie } from "@/lib/auth/session"
import { db } from "@/lib/db"
import { ensureUserHasDefaultWorkspace } from "@/lib/workspace"

/**
 * DEMO-ONLY auto-login endpoint.
 *
 * Only active when DEMO_BYPASS_AUTH=true. It signs in a fixed demo user
 * (creating it + a default workspace on first hit) and redirects back to the
 * originally requested path. This lets the whole app be browsed without any
 * external auth provider or real credentials, purely for design review.
 *
 * DO NOT enable DEMO_BYPASS_AUTH in production.
 */
const DEMO_EMAIL = "demo@7f.com"
const DEMO_NOMBRE = "Demo 7F"

export async function GET(request: NextRequest) {
  if (process.env.DEMO_BYPASS_AUTH !== "true") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const nextParam = request.nextUrl.searchParams.get("next") || "/"
  // Only allow internal relative redirects.
  const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/"

  try {
    let user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })

    if (!user) {
      user = await db.user.create({
        data: {
          email: DEMO_EMAIL,
          nombre: DEMO_NOMBRE,
          role: "admin",
          lastLogin: new Date(),
        },
      })
    } else {
      user = await db.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      })
    }

    const activeWorkspaceId = await ensureUserHasDefaultWorkspace(user.id)

    const token = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      nombre: user.nombre,
      avatar: user.avatar,
      platformRole: null,
    })

    const cookie = buildSessionCookie(token)
    const response = NextResponse.redirect(new URL(safeNext, request.url))

    /**
     * DEMO cookies must survive inside the v0 preview <iframe>, which loads the
     * app on a different origin. Cross-site iframes only receive cookies marked
     * `SameSite=None; Secure`. With the default `SameSite=Lax` the cookie is set
     * but never sent back, so the middleware keeps redirecting here in a loop
     * and the preview stays blank. Force None+Secure for demo mode only.
     */
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: true,
      sameSite: "none",
      path: cookie.path,
      maxAge: cookie.maxAge,
    })
    response.cookies.set("wf_workspace", activeWorkspaceId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    })

    return response
  } catch (error) {
    console.error("[7F Demo Auth] Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error de auto-login demo" },
      { status: 500 },
    )
  }
}
