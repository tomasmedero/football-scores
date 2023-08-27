import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { LeagueInfo, ScoreListProps } from '../types/types'
import { useLocation } from 'react-router-dom'
import { getAPI, getAPInext } from '../helpers'

export const ScoreList: React.FC<ScoreListProps> = ({ pageInfo }) => {
  const [teamData, setTeamData] = useState<LeagueInfo[]>([])
  const location = useLocation()

  // const leagueIds = [
  //   39, 135, 78, 71, 128, 140, 61, 2, 3, 13, 11, 9, 5, 1, 14, 1032,
  // ]

  useEffect(() => {
    async function fetchTeams() {
      try {
        let teams: LeagueInfo[] = []
        if (location.pathname === '/ligasproximos') {
          teams = await getAPInext(39)
        } else if (location.pathname === '/') {
          teams = await getAPI()
        }
        console.log(teams)

        teams.sort((a, b) => a.idLeague - b.idLeague)
        teams.forEach((team) => {
          team.matchInfo.sort((a, b) => a.gameTime - b.gameTime)
        })
        setTeamData(teams)
      } catch (error) {
        console.error('Error fetching team name:', error)
      }
    }

    fetchTeams()
  }, [location.pathname])

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
                width='30'
                height='30'
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
    </>
  )
}
