import { LeagueInfo, MatchInfo } from '../types/types'
import { timeConvert } from './timeConvert'

export const getAPInext = async (leagueId?: number): Promise<LeagueInfo[]> => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const fromDate = new Date(currentDate)
  const toDate = new Date(currentDate)

  fromDate.setDate(fromDate.getDate() + 1)

  toDate.setDate(toDate.getDate() + 6)

  const fromDateString = fromDate.toISOString().split('T')[0]
  const toDateString = toDate.toISOString().split('T')[0]

  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${currentYear}&from=${fromDateString}&to=${toDateString}`
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f8e2477e43mshab00ee1dbddc605p1fc742jsna8cbaede0703',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  }

  const resp = await fetch(url, options)

  const data = await resp.json()

  const matchFuture: LeagueInfo[] = []

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
    const penalty = match.score.penalty

    const dateDate = fixture.date
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
      dateDate: dateDate,

      // Home Info
      nameHome: teamHome.name,
      idHome: teamHome.id,
      goalHome: goals.home,
      penaltyHome: penalty.home,

      // Away Info
      nameAway: teamAway.name,
      idAway: teamAway.id,
      goalAway: goals.away,
      penaltyAway: penalty.away,
    }

    const existingLeague = matchFuture.find(
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

      matchFuture.push(matchData)
    }
  })

  return matchFuture
}
