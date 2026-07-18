import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "../generated/prisma/client"

const db = new PrismaClient({
  adapter: new PrismaLibSql({ url: "file:" + process.cwd() + "/dev.db" }),
})

/**
 * Fills the demo user's workspace with realistic sample data so the redesigned
 * UI can be reviewed with content (clients, projects, tasks, invoices).
 * Idempotent-ish: clears the workspace's core records first, then reseeds.
 */
async function main() {
  const user = await db.user.findFirst({ where: { email: "demo@7f.app" } })
  const ws = user?.workspaceId
    ? await db.workspace.findUnique({ where: { id: user.workspaceId } })
    : await db.workspace.findFirst()

  if (!ws) {
    console.error("No workspace found. Run the demo-login flow first.")
    process.exit(1)
  }
  const workspaceId = ws.id
  console.log("Seeding workspace:", ws.nombre ?? ws.slug ?? workspaceId)

  // Clean existing core records for this workspace (children first)
  await db.factura.deleteMany({ where: { workspaceId } })
  await db.tarea.deleteMany({ where: { workspaceId } })
  await db.proyecto.deleteMany({ where: { workspaceId } })
  await db.cliente.deleteMany({ where: { workspaceId } })

  const clientsData = [
    { nombre: "Ana Rodríguez", empresa: "Lumina Studio", email: "ana@lumina.co", telefono: "+1 555 0112", tipo: "empresa", estado: "activo" },
    { nombre: "Marcos Vidal", empresa: "Vidal & Co.", email: "marcos@vidalco.com", telefono: "+1 555 0143", tipo: "empresa", estado: "activo" },
    { nombre: "Sofía Herrera", empresa: "Nordic Bloom", email: "sofia@nordicbloom.io", telefono: "+1 555 0187", tipo: "empresa", estado: "activo" },
    { nombre: "Diego Salas", empresa: "Salas Legal", email: "diego@salaslegal.com", telefono: "+1 555 0165", tipo: "empresa", estado: "prospecto" },
    { nombre: "Camila Torres", empresa: "Brío Fitness", email: "camila@briofit.com", telefono: "+1 555 0198", tipo: "empresa", estado: "activo" },
    { nombre: "Julián Mendez", empresa: "Mendez Arquitectos", email: "julian@mendezarq.com", telefono: "+1 555 0121", tipo: "empresa", estado: "inactivo" },
  ]

  const clients = []
  for (const c of clientsData) {
    clients.push(await db.cliente.create({ data: { ...c, workspaceId } }))
  }
  console.log("Clients:", clients.length)

  const now = Date.now()
  const day = 86400000
  const projectsData = [
    { nombre: "Rediseño de identidad de marca", estado: "en_progreso", prioridad: "alta", progreso: 65, presupuesto: 12500, clienteId: clients[0].id },
    { nombre: "Sitio web e-commerce", estado: "en_progreso", prioridad: "alta", progreso: 40, presupuesto: 28000, clienteId: clients[1].id },
    { nombre: "Campaña de lanzamiento Q3", estado: "planificacion", prioridad: "media", progreso: 15, presupuesto: 9000, clienteId: clients[2].id },
    { nombre: "App móvil de reservas", estado: "en_progreso", prioridad: "alta", progreso: 78, presupuesto: 42000, clienteId: clients[4].id },
    { nombre: "Manual de marca y guía visual", estado: "completado", prioridad: "media", progreso: 100, presupuesto: 6500, clienteId: clients[0].id },
  ]
  const projects = []
  for (const p of projectsData) {
    projects.push(
      await db.proyecto.create({
        data: {
          ...p,
          workspaceId,
          fechaInicio: new Date(now - 30 * day),
          fechaFin: new Date(now + 30 * day),
        },
      }),
    )
  }
  console.log("Projects:", projects.length)

  const tasksData = [
    { titulo: "Presentar propuesta de logo v3", estado: "pendiente", prioridad: "alta", proyectoId: projects[0].id, clienteId: clients[0].id, fechaLimite: new Date(now + 2 * day) },
    { titulo: "Ajustar paleta de color del logo", estado: "en_progreso", prioridad: "alta", proyectoId: projects[0].id, clienteId: clients[0].id, fechaLimite: new Date(now + 1 * day) },
    { titulo: "Configurar pasarela de pago", estado: "en_progreso", prioridad: "alta", proyectoId: projects[1].id, clienteId: clients[1].id, fechaLimite: new Date(now + 5 * day) },
    { titulo: "Diseñar página de producto", estado: "pendiente", prioridad: "media", proyectoId: projects[1].id, clienteId: clients[1].id, fechaLimite: new Date(now + 7 * day) },
    { titulo: "Definir calendario de contenidos", estado: "pendiente", prioridad: "media", proyectoId: projects[2].id, clienteId: clients[2].id, fechaLimite: new Date(now - 1 * day) },
    { titulo: "Pruebas de flujo de reserva", estado: "en_progreso", prioridad: "alta", proyectoId: projects[3].id, clienteId: clients[4].id, fechaLimite: new Date(now + 3 * day) },
    { titulo: "Revisión final del manual de marca", estado: "completado", prioridad: "baja", proyectoId: projects[4].id, clienteId: clients[0].id, completedAt: new Date(now - 3 * day) },
    { titulo: "Enviar factura de hito 2", estado: "pendiente", prioridad: "alta", proyectoId: projects[3].id, clienteId: clients[4].id, fechaLimite: new Date(now - 2 * day) },
  ]
  for (const t of tasksData) {
    await db.tarea.create({ data: { ...t, workspaceId } })
  }
  console.log("Tasks:", tasksData.length)

  const invoicesData = [
    { numero: "INV-1001", estado: "pagada", subtotal: 6250, impuesto: 0, total: 6250, clienteId: clients[0].id, proyectoId: projects[0].id, paidAt: new Date(now - 10 * day) },
    { numero: "INV-1002", estado: "enviada", subtotal: 14000, impuesto: 0, total: 14000, clienteId: clients[1].id, proyectoId: projects[1].id, fechaVencimiento: new Date(now + 12 * day) },
    { numero: "INV-1003", estado: "vencida", subtotal: 4500, impuesto: 0, total: 4500, clienteId: clients[2].id, proyectoId: projects[2].id, fechaVencimiento: new Date(now - 6 * day) },
    { numero: "INV-1004", estado: "borrador", subtotal: 21000, impuesto: 0, total: 21000, clienteId: clients[4].id, proyectoId: projects[3].id },
  ]
  for (const inv of invoicesData) {
    await db.factura.create({
      data: {
        ...inv,
        workspaceId,
        items: JSON.stringify([{ descripcion: "Servicios de diseño", cantidad: 1, precio: inv.total }]),
      },
    })
  }
  console.log("Invoices:", invoicesData.length)

  console.log("Demo workspace seeded successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => process.exit(0))
