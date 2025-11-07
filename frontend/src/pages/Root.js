

import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../utils/auth';


function RootLayout() {
  // const navigation = useNavigation();

  // The backend defines a token expiration after 1 hour. So what we like to do then is 
  // a. Log the user out after 1 hour. 
  // b. Route the user to the logout from.
  // c. Remove the token from the backend.
  // Approach: useEffect for the RootLayout with a timeout that updates 
  // the component accordingly after one hour. This works because it is 
  // the root component of all routes.
  
  const token = useLoaderData(); // Hint: It's not necessary here to call useRouteLoaderData('<routename>') 
  // because this the correct route already. We get the token by means of the tokenLoader defined 
  // for the root route.
  const submit = useSubmit(); // We use the submit hook to route the user to the logout form.

  useEffect(() => {
   
    if (!token) {
      return;
     }

    if (token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'});
      return;
     }
  
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'});
      // null: There is no data to submit here.
      // /logout: We trigger the action that belongs to the logout route.
    }, tokenDuration); // 60* ... we need milliseconds here.
    // Problem: The token expires after 1 hour; however, we might be 
    // away for 10 min., then come back and reload this application, which 
    // will trigger the useEffect hook once more and reset the timeout 
    // to one hour, even though the token will expire in 50 min.
    // We thus have to bring the remaining token validity into the logic.
    // To fix this in this effect, we have to replace the hard-coded 
    // timeout of 60*60*1000 ms (1h), with the remaining token duration time.
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
