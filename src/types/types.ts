export interface MatchData {
  idGame: number
  gameTime: number
  dateTime: string
  dateDay: string
  dateMonth: string
  dateDayNumber: number
  idHome: number
  nameHome: string
  goalHome: number
  idAway: number
  nameAway: string
  goalAway: number
  winnerHome: boolean
  logoLeague: string
  nameLeague: string
  flagLeague: string
  idLeague: string
}

export interface ScoreCardProps {
  team: MatchData
}

export interface ScoreListProps {
  pageInfo: string
}
