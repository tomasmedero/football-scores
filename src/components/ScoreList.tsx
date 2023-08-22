import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { getAPI } from '../helpers/getAPI'
import { MatchData, ScoreListProps } from '../types/types'

export const ScoreList: React.FC<ScoreListProps> = ({ pageInfo }) => {
  const [teamData, setTeamData] = useState<MatchData[]>([])

  useEffect(() => {
    async function fetchTeams() {
      try {
        const teams = await getAPI()
        teams.sort((a, b) => a.gameTime - b.gameTime)
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
      <div className='grid-container'>
        {teamData.map((team) => (
          <ScoreCard key={team.idGame} team={team} />
        ))}
      </div>
    </>
  )
}
