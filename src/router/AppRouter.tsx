import { Navigate, Route, Routes } from 'react-router-dom'
import { ScorePage } from '../pages'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ScorePage />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
