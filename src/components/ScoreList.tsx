import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { getAPI } from '../helpers/getAPI'
import { LeagueInfo, ScoreListProps } from '../types/types'
import { useLocation } from 'react-router-dom'

export const ScoreList: React.FC<ScoreListProps> = ({ pageInfo }) => {
  const [teamData, setTeamData] = useState<LeagueInfo[]>([])
  const location = useLocation()

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teams = await getAPI()
        console.log(teams)

        teams.forEach((team) => {
          team.matchInfo.sort((a, b) => a.gameTime - b.gameTime)
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
            <ScoreCard key={league.idLeague} team={league} />
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
