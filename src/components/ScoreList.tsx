import { useEffect, useState } from 'react'
import { ScoreCard } from '.'
import { getAPI } from '../helpers/getAPI'
import { MatchData } from '../types/types'

export const ScoreList: React.FC = () => {
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
      <div className='grid-container'>
        {teamData.map((team) => (
          <ScoreCard key={team.idGame} team={team} />
        ))}
      </div>
    </>
  )
}
