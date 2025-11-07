import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    // This is an ISO string, which we must convert to a Date object:
    const expirationDate = new Date(storedExpirationDate);
    // To caculate the remaining time, we must deduct the current time from 
    // the expiration Date:
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    // getTime() gives us a value in milliseconds.
    return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null; // return without value would return 
        // 'undefined', which might lead to problems.
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  
  return token;
}

export function tokenLoader() {
 // This function just executes getAuthToken and returns its value (the token).
    // This way, we can use it as a loader function in App.js.
  const token = getAuthToken();
  return token;
}

export function authLoaderCheck() {
   // This hides pages a user is not supposed to see when he or she 
    // is not logged in .
    // The loader can be added to the routes that need it, in App.js.
    // This is, for example, the Edit Event route and the New Event route.

  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
  return null;
}