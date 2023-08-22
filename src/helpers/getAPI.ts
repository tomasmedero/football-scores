import { MatchData } from '../types/types'
import { timeConvert } from './timeConvert'

export const getAPI = async (): Promise<MatchData[]> => {
  //En el Score List pedirle que le pases si estas en ruta fecha o en vivo
  //Hacer dos constantes una que tenga live all y otra que diga date
  // Hacer un calendario arriba del grid
  // Pasar la fecha y mandarsela por aca, ponerle que sea opcional
  //Hacer que los types sean opcionales chequear lo que trae el date

  //League IDs --->

  // Premier: 39
  // Seria A: 135
  // Bundesliga: 78
  // Brasileirao: 71
  // Liga Argentina:128
  // La liga: 140
  // Uber Eats: 61
  // Copa Liga: 483
  // Champions:2
  // Europa League: 3
  // Copa Libertadores: 13
  // Copa Sudamericana:11
  //Copa America:9
  //Nation League: 5
  /// Mundial: 1
  // Mundialito: 15

  const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all'
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f8e2477e43mshab00ee1dbddc605p1fc742jsna8cbaede0703',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  }

  const resp = await fetch(url, options)

  const data = await resp.json()

  const matchLive: MatchData[] = []

  data.response.forEach((match: any) => {
    const fixture = match.fixture
    const teamHome = match.teams.home
    const teamAway = match.teams.away
    const goals = match.goals
    const winnerHome = match.teams.home.winner
    const logoLeague = match.league.logo
    const nameLeague = match.league.name
    const flagLeague = match.league.flag
    const idLeague = match.league.id

    const dateMatch = timeConvert(fixture.date)
    const gameDay = dateMatch.diaSemanaFormato
    const gameTime = dateMatch.horaFormato
    const gameDayNumber = dateMatch.numeroDia
    const gameMonth = dateMatch.nombreMes

    const matchData: MatchData = {
      // Fixture
      idGame: fixture.id,
      gameTime: fixture.status.elapsed,
      dateDay: gameDay,
      dateTime: gameTime,
      dateDayNumber: gameDayNumber,
      dateMonth: gameMonth,
      winnerHome: winnerHome,
      logoLeague: logoLeague,
      nameLeague: nameLeague,
      flagLeague: flagLeague,
      idLeague: idLeague,

      // Home Info
      nameHome: teamHome.name,
      idHome: teamHome.id,
      goalHome: goals.home,

      // Away Info
      nameAway: teamAway.name,
      idAway: teamAway.id,
      goalAway: goals.away,
    }

    matchLive.push(matchData)
  })

  return matchLive
}
