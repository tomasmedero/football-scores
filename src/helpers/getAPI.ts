import { LeagueInfo, MatchInfo } from '../types/types'
import { timeConvert } from './timeConvert'

export const getAPI = async (): Promise<LeagueInfo[]> => {
  // Hacer un calendario arriba del grid
  //En Ligas Hoy poner los partidos que se juegan hoy, Si no se jugaron borde Azul, si ya se jugaron borde Gris,
  //si se estan jugan borde Verde
  // En proximos Partidos crear un uno getAPI donde traiga los partidos proximos de las ligas principales

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

  const matchLive: LeagueInfo[] = []

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

    const matchInfo: MatchInfo = {
      // Fixture
      idGame: fixture.id,
      gameTime: fixture.status.elapsed,
      dateDay: gameDay,
      dateTime: gameTime,
      dateDayNumber: gameDayNumber,
      dateMonth: gameMonth,
      winnerHome: winnerHome,

      // Home Info
      nameHome: teamHome.name,
      idHome: teamHome.id,
      goalHome: goals.home,

      // Away Info
      nameAway: teamAway.name,
      idAway: teamAway.id,
      goalAway: goals.away,
    }

    const existingLeague = matchLive.find(
      (league) => league.idLeague === idLeague
    )

    if (existingLeague) {
      // Si existe, agregamos el matchInfo al arreglo matchInfo existente
      existingLeague.matchInfo.push(matchInfo)
    } else {
      const matchData: LeagueInfo = {
        //League
        idLeague: idLeague,
        logoLeague: logoLeague,
        nameLeague: nameLeague,
        flagLeague: flagLeague,
        matchInfo: [matchInfo],
      }

      matchLive.push(matchData)
    }
  })

  return matchLive
}
