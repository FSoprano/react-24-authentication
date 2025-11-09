import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  // The token needs to be available on all routes. Also, the routes or components 
  // must be re-evaluated, if, for example, we log out and remove the token. 
  // How do we do that? useContext is one possible way, but in react-dom-router, 
  // we can also use a loader prop. Using it on the root route will 
  // automatically make it availalbe to all routes (all pages).
  // Using react-dom-router also has the advantage 
  // that on removal of the token, routes are re-evaluated automatically.
  // Making the token available in the main navigation:
  const token = useRouteLoaderData('root');
  // This is the token because it's what the loader of the root route returns.
  // If the token can be retrieved, someone's logged in. If it's undefined, 
  // no one is logged in. This can be used for conditional processing.
 
  
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token &&  <li>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Authentication
            </NavLink>
          </li> }
          { token && <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li> }
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
