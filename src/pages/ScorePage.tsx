import { useLocation } from 'react-router-dom'
import { Navbar } from '../components'
import { ScoreList } from '../components/ScoreList'
import { useState, useEffect } from 'react'

export const ScorePage = () => {
  const [info, setInfo] = useState<string>('EN VIVO')
  const location = useLocation()

  useEffect(() => {
    let pageInfo: string = ''
    if (location.pathname === '/') {
      pageInfo = 'EN VIVO'
    } else if (location.pathname === '/ligasprincipales') {
      pageInfo = 'HOY - LIGAS PRINCIPALES'
    } else if (location.pathname === '/fecha') {
      pageInfo = 'ELIGE EL DIA'
    } else if (location.pathname === '/ligasproximos') {
      pageInfo = 'PROXIMOS PARTIDOS - LIGAS PRINCIPALES'
    }
    setInfo(pageInfo)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <ScoreList pageInfo={info} />
    </>
  )
}
