import {render,screen, fireEvent} from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom';
import { useAuth } from '@clerk/nextjs';

// Ensure the hook is mocked
jest.mock('@clerk/nextjs');

const paths = [
    {
      _bound: 0,
      username: 'symbolic_username',
      password: 'symbolic_password',
      signup_result: 'symbolic_signup_result'
    },
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

      // mock initial state which is signed out
    useAuth.mockImplementation(() => ({
      isSignedIn: false,
    }));

    const { rerender } = render(<Home />);

    fireEvent.click(screen.getByText('Sign up'));
    //input username and password from symbolic execution


    //now read input from the paths array, now i simulate signing up
      useAuth.mockImplementation(() => ({
        isSignedIn: path.signup_result === 'OK',
      }));
  
      if (path.signup_result === 'OK') {
        rerender(<Home />);
        expect(screen.getByText('Go to Connect')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Log out'));
        
      } else {
        rerender(<Home />);
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();

      }
        // Mock state: signed out
        useAuth.mockImplementation(() => ({
          isSignedIn: false,
        }));


        // Re-render to reflect signed-out state
        rerender(<Home />);

        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Log in'));

      //input username and password from symbolic execution

      //now read input from the paths array, now i simulate logging in
      useAuth.mockImplementation(() => ({
        isSignedIn: path.login_result === 'OK',
      }));
  
      if (path.login_result === 'OK') {
        rerender(<Home />);
        
        expect(screen.getByText('Go to Connect')).toBeInTheDocument();
        expect(screen.getByText('Log out')).toBeInTheDocument();

        // Simulate clicking "Log out"
        fireEvent.click(screen.getByText('Log out'));
        
      } else {
        rerender(<Home />);
        
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();

      }
    });
  });