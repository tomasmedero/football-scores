import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { getAPI } from '../helpers/getAPI'
import { MatchData, ScoreListProps } from '../types/types'
import { useLocation } from 'react-router-dom'

export const ScoreList: React.FC<ScoreListProps> = ({ pageInfo }) => {
  const [teamData, setTeamData] = useState<MatchData[]>([])
  const location = useLocation()

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teams = await getAPI()
        teams.sort((a, b) => {
          if (a.idLeague !== b.idLeague) {
            return a.idLeague > b.idLeague ? 1 : -1
          } else {
            return a.gameTime - b.gameTime
          }
        })
        setTeamData(teams)
      } catch (error) {
        console.error('Error fetching team name:', error)
      }
    }

    fetchTeams()
  }, [])

  return (
    <>
      <h1 className='ao-vivo'>{pageInfo}</h1>

      {location.pathname === '/fecha' && (
        <h1 className='date-page'>ACA VA PARA ELEGIR LA FECHA</h1>
      )}

      {teamData.map((league) => (
        <div className='league-list' key={league.idLeague}>
          <h3 className='league-name'>
            {league.flagLeague ? (
              <img
                width='20'
                height='20'
                className='flag-league'
                src={league.flagLeague}
              />
            ) : (
              ''
            )}

            {league.nameLeague}
          </h3>
          <div className='grid-container'>
            <ScoreCard key={league.idGame} team={league} />
          </div>
        </div>
      ))}

      {/* <div className='grid-container'>
        {teamData.map((team) => (
          <ScoreCard key={team.idGame} team={team} />
        ))}
      </div> */}
    </>
  )
}
