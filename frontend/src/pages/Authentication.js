
import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm  />;
}

export default AuthenticationPage;
export async function action({ request }) { 
  // Action that is run each time the <AuthForm> is submitted.
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  // Need to check the mode first, signup for new users, login for all other cases.
  if (mode !== 'signup' && mode !== 'login') {
        throw new Response(JSON.stringify({message: 'Unknown mode'}),
            { status: 422 }
        );
    } 
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  const response = await fetch ('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(authData)
  });
  if (response.status === 422 || response.status === 401) {
    return response; // The response can be returned like this. React will 
    // automatically handle the data.
  }
  if (!response.ok) {
    throw new Response(JSON.stringify({message: 'Could not authenticate user.'}),
            { status: 500 }
        );
  }
// If we make it past these if-checks, the authentication was successful.
// Token that is returned by the backend:
// The token is attached to outgoing requests, and will, for example, 
// allow users to delete events.
const resData = await response.json();
const token = resData.token;
// The token can be stored in the local storage of the browser:
localStorage.setItem('token', token);
// 'token' is the key here.
// The token is valid for one hour when set. To use this time span when calculating  
// the expiration time and final logout of the user, we need to store this value:
const expiration = new Date();
expiration.setHours(expiration.getHours() + 1);
localStorage.setItem('expiration', expiration.toISOString());
// We now also store the expiration date in local storage.

 return redirect('/');
}