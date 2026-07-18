/**
 * FINESSE — demo data (isolated design proposal).
 * Realistic beauty-business sample content in Spanish. Hardcoded on purpose:
 * this demo never reads/writes the production database.
 */

export type Cita = {
  id: string
  hora: string
  duracion: string
  clienta: string
  iniciales: string
  servicio: string
  estado: "confirmada" | "pendiente" | "en_curso" | "completada"
  precio: number
  canal: "WhatsApp" | "Instagram" | "Web" | "Teléfono"
  color: "rose" | "gold" | "sage" | "plum"
}

export const citasHoy: Cita[] = [
  { id: "c1", hora: "09:00", duracion: "45 min", clienta: "Valentina Ríos", iniciales: "VR", servicio: "Manicura semipermanente", estado: "completada", precio: 28, canal: "WhatsApp", color: "rose" },
  { id: "c2", hora: "10:00", duracion: "1 h 30 min", clienta: "Camila Duarte", iniciales: "CD", servicio: "Balayage + tratamiento", estado: "en_curso", precio: 120, canal: "Instagram", color: "gold" },
  { id: "c3", hora: "12:00", duracion: "1 h", clienta: "Isabella Moreno", iniciales: "IM", servicio: "Limpieza facial profunda", estado: "confirmada", precio: 55, canal: "Web", color: "sage" },
  { id: "c4", hora: "13:30", duracion: "30 min", clienta: "Sofía Herrera", iniciales: "SH", servicio: "Diseño de cejas", estado: "confirmada", precio: 22, canal: "WhatsApp", color: "plum" },
  { id: "c5", hora: "16:00", duracion: "2 h", clienta: "Antonella Cruz", iniciales: "AC", servicio: "Extensiones de pestañas", estado: "pendiente", precio: 90, canal: "Instagram", color: "rose" },
  { id: "c6", hora: "18:30", duracion: "45 min", clienta: "Lucía Fernández", iniciales: "LF", servicio: "Pedicura spa", estado: "confirmada", precio: 35, canal: "Teléfono", color: "gold" },
]

export const proximasCitas = [
  { dia: "Mañana", fecha: "Jue 19", clienta: "Renata Silva", servicio: "Corte + peinado", hora: "11:00" },
  { dia: "Mañana", fecha: "Jue 19", clienta: "Paula Castro", servicio: "Uñas acrílicas", hora: "15:00" },
  { dia: "Viernes", fecha: "Vie 20", clienta: "Martina López", servicio: "Maquillaje social", hora: "17:30" },
]

export type Clienta = {
  id: string
  nombre: string
  iniciales: string
  etiqueta: "VIP" | "Frecuente" | "Nueva" | "Riesgo"
  color: "rose" | "gold" | "sage" | "plum"
  telefono: string
  ultimaVisita: string
  visitas: number
  gastoTotal: number
  favorito: string
  preferencias: string[]
  notas: string
}

export const clientas: Clienta[] = [
  { id: "cl1", nombre: "Valentina Ríos", iniciales: "VR", etiqueta: "VIP", color: "rose", telefono: "+34 612 448 902", ultimaVisita: "Hoy", visitas: 24, gastoTotal: 1840, favorito: "Manicura semipermanente", preferencias: ["Tonos nude", "Sin fragancia", "Té verde"], notas: "Prefiere citas temprano. Alérgica al látex." },
  { id: "cl2", nombre: "Camila Duarte", iniciales: "CD", etiqueta: "Frecuente", color: "gold", telefono: "+34 645 210 337", ultimaVisita: "Hoy", visitas: 12, gastoTotal: 1120, favorito: "Balayage", preferencias: ["Rubios cálidos", "Corte en capas"], notas: "Le encanta charlar. Recomendó a 3 amigas." },
  { id: "cl3", nombre: "Isabella Moreno", iniciales: "IM", etiqueta: "Frecuente", color: "sage", telefono: "+34 699 874 512", ultimaVisita: "Hace 2 semanas", visitas: 9, gastoTotal: 640, favorito: "Facial profundo", preferencias: ["Piel sensible", "Productos veganos"], notas: "Rutina mensual de facial. Piel reactiva al sol." },
  { id: "cl4", nombre: "Sofía Herrera", iniciales: "SH", etiqueta: "Nueva", color: "plum", telefono: "+34 611 003 289", ultimaVisita: "Primera visita", visitas: 1, gastoTotal: 22, favorito: "—", preferencias: ["Cejas naturales"], notas: "Llegó por Instagram. Interesada en pack de cejas." },
  { id: "cl5", nombre: "Antonella Cruz", iniciales: "AC", etiqueta: "VIP", color: "rose", telefono: "+34 634 552 176", ultimaVisita: "Hace 3 días", visitas: 31, gastoTotal: 2760, favorito: "Extensiones de pestañas", preferencias: ["Volumen ruso", "Efecto natural"], notas: "Cliente desde 2021. Cumpleaños el 24 de julio." },
  { id: "cl6", nombre: "Lucía Fernández", iniciales: "LF", etiqueta: "Riesgo", color: "gold", telefono: "+34 688 447 019", ultimaVisita: "Hace 3 meses", visitas: 5, gastoTotal: 310, favorito: "Pedicura spa", preferencias: ["Esmaltes rojos"], notas: "No ha vuelto en 3 meses. Enviar promoción de reactivación." },
]

export type Conversacion = {
  id: string
  clienta: string
  iniciales: string
  color: "rose" | "gold" | "sage" | "plum"
  canal: "WhatsApp" | "Instagram" | "Gmail"
  ultimo: string
  hora: string
  noLeidos: number
  etiqueta?: "Cita" | "No-show" | "Consulta"
  mensajes: { de: "clienta" | "yo"; texto: string; hora: string }[]
}

export const conversaciones: Conversacion[] = [
  {
    id: "m1", clienta: "Antonella Cruz", iniciales: "AC", color: "rose", canal: "WhatsApp",
    ultimo: "¿Puedo mover mi cita a las 4?", hora: "09:42", noLeidos: 2, etiqueta: "Cita",
    mensajes: [
      { de: "clienta", texto: "¡Hola! Buenos días 🌸", hora: "09:40" },
      { de: "clienta", texto: "¿Puedo mover mi cita a las 4?", hora: "09:42" },
    ],
  },
  {
    id: "m2", clienta: "Camila Duarte", iniciales: "CD", color: "gold", canal: "Instagram",
    ultimo: "Me encantó el color, gracias 😍", hora: "09:15", noLeidos: 0, etiqueta: "Consulta",
    mensajes: [
      { de: "yo", texto: "¡Quedó espectacular el balayage!", hora: "09:10" },
      { de: "clienta", texto: "Me encantó el color, gracias 😍", hora: "09:15" },
    ],
  },
  {
    id: "m3", clienta: "Lucía Fernández", iniciales: "LF", color: "sage", canal: "WhatsApp",
    ultimo: "Recordatorio: te extrañamos ✨", hora: "Ayer", noLeidos: 0, etiqueta: "No-show",
    mensajes: [
      { de: "yo", texto: "Hola Lucía, ¡te extrañamos! Tenemos un 20% en pedicura esta semana ✨", hora: "Ayer" },
    ],
  },
  {
    id: "m4", clienta: "Sofía Herrera", iniciales: "SH", color: "plum", canal: "Gmail",
    ultimo: "Consulta sobre el pack de cejas", hora: "Ayer", noLeidos: 1, etiqueta: "Consulta",
    mensajes: [
      { de: "clienta", texto: "Buenas, vi el pack de cejas en Instagram. ¿Qué incluye?", hora: "Ayer" },
    ],
  },
  {
    id: "m5", clienta: "Isabella Moreno", iniciales: "IM", color: "sage", canal: "WhatsApp",
    ultimo: "Perfecto, nos vemos el jueves", hora: "Lun", noLeidos: 0,
    mensajes: [
      { de: "yo", texto: "Te confirmo el jueves a las 12:00 para tu facial 💆‍♀️", hora: "Lun" },
      { de: "clienta", texto: "Perfecto, nos vemos el jueves", hora: "Lun" },
    ],
  },
]

export const plantillas = [
  { id: "p1", titulo: "Confirmar cita", texto: "¡Hola! Te confirmamos tu cita para {servicio} el {fecha} a las {hora}. ¿Todo bien? 🌸" },
  { id: "p2", titulo: "Recordatorio 24h", texto: "Recordatorio cariñoso: mañana te esperamos a las {hora} para tu {servicio} ✨" },
  { id: "p3", titulo: "Reactivar cliente", texto: "¡Te extrañamos! Vuelve esta semana y disfruta un 20% en tu servicio favorito 💕" },
  { id: "p4", titulo: "Agradecer no-show", texto: "Notamos que no pudiste venir. ¿Reagendamos? Estamos aquí para ti 🤍" },
]

export type Tarea = {
  id: string
  texto: string
  hecha: boolean
  prioridad: "alta" | "media" | "baja"
  contexto: string
  hora?: string
}

export const tareas: Tarea[] = [
  { id: "t1", texto: "Confirmar cita de Antonella (4:00 pm)", hecha: false, prioridad: "alta", contexto: "WhatsApp", hora: "10:00" },
  { id: "t2", texto: "Reponer esmaltes tono nude", hecha: false, prioridad: "media", contexto: "Inventario" },
  { id: "t3", texto: "Publicar antes/después de Camila", hecha: false, prioridad: "alta", contexto: "Momento Beauty", hora: "13:00" },
  { id: "t4", texto: "Enviar promo de reactivación a Lucía", hecha: false, prioridad: "media", contexto: "Marketing" },
  { id: "t5", texto: "Pedir cita mayorista de pestañas", hecha: true, prioridad: "baja", contexto: "Inventario" },
  { id: "t6", texto: "Preparar cabina para facial de Isabella", hecha: true, prioridad: "media", contexto: "Salón" },
]

export const recordatorios = [
  { id: "r1", texto: "Cumpleaños de Antonella el 24 jul", tipo: "Detalle VIP" },
  { id: "r2", texto: "Renovar stock de mascarillas", tipo: "Inventario" },
  { id: "r3", texto: "Pago mensual del alquiler mañana", tipo: "Finanzas" },
]

export const metricasHoy = {
  citas: 6,
  ingresos: 350,
  ocupacion: 82,
  nuevasClientas: 1,
}

export const momentoBeauty = {
  titulo: "Momento Beauty",
  subtitulo: "Tu contenido de hoy para redes",
  sugerencia: "El antes/después de Camila tuvo 3× más alcance. Publica el balayage de hoy a las 13:00 para máximo engagement.",
  ideas: [
    "Reel: transformación balayage de Camila",
    "Carrusel: cuidados post-color en casa",
    "Historia: disponibilidad de mañana",
  ],
}
