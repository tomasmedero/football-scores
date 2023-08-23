export interface MatchInfo {
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
}

export interface LeagueInfo {
  idLeague: number
  logoLeague: string
  nameLeague: string
  flagLeague: string
  matchInfo: MatchInfo[]
}

export interface ScoreCardProps {
  team: LeagueInfo
}

export interface ScoreListProps {
  pageInfo: string
}
