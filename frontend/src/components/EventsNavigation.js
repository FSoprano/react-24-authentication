import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  const token = useRouteLoaderData('root');
  
  const adm = localStorage.getItem('email');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          { token && (adm === 'test2@test.com') ?  <li>
            <NavLink
              to="/events/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Event
            </NavLink>
          </li> : undefined }
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
