import {render,screen, fireEvent} from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom';
import { useAuth } from '@clerk/nextjs';

// Ensure the hook is mocked
jest.mock('@clerk/nextjs');

const paths = require('../SymbolicExecution/paths.json')


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