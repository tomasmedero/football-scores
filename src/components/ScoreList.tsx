import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { LeagueInfo, ScoreListProps } from '../types/types'
import { useLocation } from 'react-router-dom'
import { cupIds, getAPI, getAPInext, leagueIds, leagueInfo } from '../helpers'

export const ScoreList: React.FC<ScoreListProps> = ({ pageInfo }) => {
  const [teamData, setTeamData] = useState<LeagueInfo[]>([])
  const location = useLocation()
  const [leagueIdData, setLeagueIdData] = useState<number>()

  const changeLeague = (leagueId: number) => {
    setLeagueIdData(leagueId)
  }

  useEffect(() => {
    async function fetchTeams() {
      try {
        let teams: LeagueInfo[] = []
        if (location.pathname === '/ligasproximos') {
          teams = await getAPInext(leagueIdData)
        } else if (location.pathname === '/') {
          teams = await getAPI()
        }
        teams.sort((a, b) => a.idLeague - b.idLeague)

        teams.forEach((team) => {
          team.matchInfo.sort((a, b) => {
            const dateA = new Date(a.dateDate).getTime()
            const dateB = new Date(b.dateDate).getTime()
            return dateA - dateB
          })
        })

        console.log(teams)

        setTeamData(teams)
      } catch (error) {
        console.error('Error fetching team name:', error)
      }
    }

    fetchTeams()
  }, [location.pathname, leagueIdData])

  return (
    <>
      <h1 className='ao-vivo'>{pageInfo}</h1>

      {location.pathname === '/fecha' && (
        <>
          <h2 className='date-page'>Elije la Fecha</h2>
          <h1 className='date-page'>ACA VA PARA ELEGIR LA FECHA</h1>
        </>
      )}
      {location.pathname === '/ligasproximos' && (
        <>
          <h2 className='date-page'>Elije la competición</h2>

          <div className='tournament-container'>
            <h3 className='tournament-tittle'>Ligas</h3>
            <div className='league-logos'>
              {leagueIds.map((leagueId) => (
                <div key={leagueId}>
                  <button
                    className='league-button'
                    onClick={() => changeLeague(leagueId)}
                  >
                    <img
                      src={`https://media-1.api-sports.io/football/leagues/${leagueId}.png`}
                      alt='Botón de cambio de liga'
                      width='55'
                      height='55'
                    />
                  </button>
                  <div className='league-text'>
                    <small>
                      {leagueInfo[leagueId as keyof typeof leagueInfo]}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='tournament-container'>
            <h3 className='tournament-tittle'>Copas</h3>
            <div className='league-logos'>
              {cupIds.map((cupId) => (
                <div key={cupId}>
                  <button
                    className='league-button'
                    onClick={() => changeLeague(cupId)}
                  >
                    <img
                      src={`https://media-1.api-sports.io/football/leagues/${cupId}.png`}
                      alt='Botón de cambio de liga'
                      width='55'
                      height='55'
                    />
                  </button>
                  <div className='league-text'>
                    <small>
                      {leagueInfo[cupId as keyof typeof leagueInfo]}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
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
