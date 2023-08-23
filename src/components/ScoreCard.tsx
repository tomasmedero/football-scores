import { ScoreCardProps } from '../types/types'

export const ScoreCard: React.FC<ScoreCardProps> = ({ team }) => {
  const scoreCards: JSX.Element[] = []
  team.matchInfo.forEach((match) => {
    const teamHomeURL = `https://media.api-sports.io/football/teams/${match.idHome}.png`
    const teamAwayURL = `https://media.api-sports.io/football/teams/${match.idAway}.png`

    let classNameAway: string
    let classNameHome: string

    if (match.winnerHome === true) {
      classNameHome = 'team-winner'
      classNameAway = 'team-loser'
    } else if (match.winnerHome === false) {
      classNameHome = 'team-loser'
      classNameAway = 'team-winner'
    } else {
      classNameHome = 'team-draw'
      classNameAway = 'team-draw'
    }
    scoreCards.push(
      <div className='grid-item' key={match.idGame}>
        <div className='column-left'>
          <div className='teams'>
            <img width='80' height='80' src={teamHomeURL} />
            <p className={classNameHome}>{match.nameHome}</p>
          </div>
        </div>

        <div className='column-center'>
          {team.logoLeague ? (
            <img width='40' height='40' src={team.logoLeague} />
          ) : (
            ''
          )}

          <div className='match-day'>
            {match.dateDay} {match.dateDayNumber} {match.dateMonth}
          </div>
          <div className='match-time'>{match.dateTime}</div>
          <div className='match-score'>
            {match.goalHome} : {match.goalAway}
          </div>
          <div className='match-minutes'>{match.gameTime}'</div>
        </div>

        <div className='column-right'>
          <div className='teams'>
            <img width='80' height='80' src={teamAwayURL} />
            <p className={classNameAway}>{match.nameAway}</p>
          </div>
        </div>
      </div>
    )
  })

  return <>{scoreCards}</>
}
