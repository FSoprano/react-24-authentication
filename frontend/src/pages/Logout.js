import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('token');
  // This should also be cleared upon logout:
  localStorage.removeItem('expiration');
  
  return redirect('/');
}