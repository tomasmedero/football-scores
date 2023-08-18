import { ScoreCardProps } from '../types/types'

export const ScoreCard: React.FC<ScoreCardProps> = ({ team }) => {
  const teamHomeURL = `https://media.api-sports.io/football/teams/${team.idHome}.png`
  const teamAwayURL = `https://media.api-sports.io/football/teams/${team.idAway}.png`

  let classNameAway
  let classNameHome

  if (team.winnerHome === true) {
    classNameHome = 'team-winner'
    classNameAway = 'team-loser'
  } else if (team.winnerHome === false) {
    classNameHome = 'team-loser'
    classNameAway = 'team-winner'
  } else {
    classNameHome = 'team-draw'
    classNameAway = 'team-draw'
  }
  return (
    <>
      <div className='grid-item'>
        <div className='column-left'>
          <div className='teams'>
            <img width='40' height='50' src={teamHomeURL} />
            <p className={classNameHome}>{team.nameHome}</p>
          </div>
        </div>

        <div className='column-center'>
          {team.logoLeague ? (
            <img width='40' height='40' src={team.logoLeague} />
          ) : (
            ''
          )}

          <div className='league-name'>
            {team.flagLeague ? (
              <img width='20' height='20' src={team.flagLeague} />
            ) : (
              ''
            )}

            {team.nameLeague}
          </div>
          <div className='match-day'>
            {team.dateDay} {team.dateDayNumber} {team.dateMonth}
          </div>
          <div className='match-time'>{team.dateTime}</div>
          <div className='match-score'>
            {team.goalHome} : {team.goalAway}
          </div>
          <div className='match-minutes'>{team.gameTime}'</div>
        </div>

        <div className='column-right'>
          <div className='teams'>
            <img width='40' height='50' src={teamAwayURL} />
            <p className={classNameAway}>{team.nameAway}</p>
          </div>
        </div>
      </div>
    </>
  )
}
