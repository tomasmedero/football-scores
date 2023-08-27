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
      <div
        className={`grid-item ${
          match.gameTime ? 'grid-item-live' : 'grid-item-finish'
        }`}
        key={match.idGame}
      >
        <div className='column-left'>
          <div className='teams'>
            <img width='70' height='70' src={teamHomeURL} />
            <p className={classNameHome}>{match.nameHome}</p>
          </div>
        </div>

        <div className='column-center'>
          {match.gameTime ? (
            <>
              {team.logoLeague && (
                <img
                  width='40'
                  height='40'
                  src={team.logoLeague}
                  alt='Logo de la liga'
                />
              )}
              <div className='match-day'>
                {match.dateDay} {match.dateDayNumber} {match.dateMonth}
              </div>
              <div className='match-time'>{match.dateTime}</div>
              <div className='match-score'>
                {match.penaltyHome ? (
                  <span className='penalty-left'>({match.penaltyHome})</span>
                ) : null}
                {match.goalHome} : {match.goalAway}
                {match.penaltyHome ? (
                  <span className='penalty-right'>({match.penaltyAway})</span>
                ) : null}
              </div>
              <div className='match-minutes'>
                {match.gameTime ? match.gameTime : ''}'
              </div>
            </>
          ) : (
            <>
              <div className='no-match-start'>
                {team.logoLeague && (
                  <img
                    width='70'
                    height='70'
                    src={team.logoLeague}
                    alt='Logo de la liga'
                  />
                )}
                <div className='match-day'>
                  {match.dateDay} {match.dateDayNumber} {match.dateMonth}
                </div>
                <div className='match-time' style={{ marginTop: '5px' }}>
                  {match.dateTime}
                </div>
              </div>
            </>
          )}
        </div>

        <div className='column-right'>
          <div className='teams'>
            <img width='70' height='70' src={teamAwayURL} />
            <p className={classNameAway}>{match.nameAway}</p>
          </div>
        </div>
      </div>
    )
  })

  return <>{scoreCards}</>
}
