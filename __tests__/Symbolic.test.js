import {render,screen} from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom';
import { useAuth } from '@clerk/nextjs';

// Ensure the hook is mocked
jest.mock('@clerk/nextjs');

const paths = [
    // {
    //   _bound: 0,
    //   username: 'symbolic_username',
    //   password: 'symbolic_password',
    //   signup_result: 'symbolic_signup_result'
    // },
    { username: '', password: '', signup_result: '', _bound: 6 },
    {
      username: '0wDÃ',
      password: 'g7W_1x:P',
      signup_result: '',
      _bound: 12
    },
    {
      username: '1_:FpR0K',
      password: 'wqb7PW`x',
      signup_result: 'OK',
      _bound: 17,
      login_result: 'symbolic_login_result'
    },
    {
      username: '1_:FpR0K',
      password: '6FF[0RF[',
      signup_result: 'OK',
      login_result: 'OK',
      _bound: 22
    },
    {
      username: '=6<g=?F0',
      password: 'B?0xZ73w',
      signup_result: 'OK',
      login_result: '',
      _bound: 18
    },
    {
      username: '=6<g=?F0',
      password: 'pg??@A5w',
      signup_result: 'OK',
      login_result: 'OK',
      _bound: 22
    }
  ]
  paths.forEach((path) => {
    test(`renders correctly when signup_result is ${path.signup_result}`, () => {
      // Mock useAuth based on the signup_result, initial state
      useAuth.mockImplementation(() => ({
        isSignedIn: path.signup_result === 'OK', // If signup_result is 'OK', set isSignedIn to true
      }));
  
      render(<Home />);
  
      if (path.signup_result === '') {
        // Expecting 'Sign up' and 'Log in' when not signed in
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();
      } else {
        // Expecting 'Go to Connect' and 'Log out' when signed in
        expect(screen.getByText('Go to Connect')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();
      }
    });
  });