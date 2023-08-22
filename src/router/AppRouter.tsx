import { Navigate, Route, Routes } from 'react-router-dom'
import { ScorePage } from '../pages'

export const AppRouter = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<ScorePage />} />
          <Route path='vivo' element={<ScorePage />} />
          <Route path='ligasprincipales' element={<ScorePage />} />
          <Route path='ligasproximos' element={<ScorePage />} />
          <Route path='fecha' element={<ScorePage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}
