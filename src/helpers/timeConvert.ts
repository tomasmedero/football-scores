export const timeConvert = (fecha: string) => {
  // Convertir a objeto Date
  const fechaHora: Date = new Date(fecha)

  // Obtener la hora en formato HH:MM
  const horaFormato: string = fechaHora.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const diasSemana: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const diaSemanaFormato: string = diasSemana[fechaHora.getDay()]

  // Obtener el nombre del mes en formato texto
  const meses: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const nombreMes: string = meses[fechaHora.getMonth()]

  // Obtener el número del día
  const numeroDia: number = fechaHora.getDate()

  return { horaFormato, diaSemanaFormato, numeroDia, nombreMes }
}
