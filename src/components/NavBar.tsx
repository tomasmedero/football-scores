import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark p-2 '>
      <Link className='navbar-brand' to='/'>
        Football Results
      </Link>

      <div className='navbar-collapse  '>
        <div className='navbar-nav'>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to='/'
          >
            Vivo
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to='/ligasproximos'
          >
            Ligas
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to='/fecha'
          >
            Fecha
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
