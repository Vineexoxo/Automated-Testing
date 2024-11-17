import {render,screen} from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom';
import { useAuth } from '@clerk/nextjs';

// Ensure the hook is mocked
jest.mock('@clerk/nextjs');

test('it should have Striide text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Striide')

    expect(myElem).toBeInTheDocument()
}
)


test('it should have Log in text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Log in')

    expect(myElem).toBeInTheDocument()
}
)
test('it should have Sign Up text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Sign up')

    expect(myElem).toBeInTheDocument()
}
)


test('it should render Striide, Sign up, and Log in texts sequentially', () => {
    // Render the Home component
    render(<Home />);
  
    // Check for the presence of the "Striide" text
    const striideText = screen.getByText('Striide');
    expect(striideText).toBeInTheDocument();
  
    // Check for the presence of the "Sign up" text
    const signUpText = screen.getByText('Sign up');
    expect(signUpText).toBeInTheDocument();
  
    // Check for the presence of the "Log in" text
    const logInText = screen.getByText('Log in');
    expect(logInText).toBeInTheDocument();
  });

test('renders Sign up and Log in when not signed in', () => {
  useAuth.mockImplementation(() => ({
    isSignedIn: false,
  }));

  render(<Home />);

  expect(screen.getByText('Sign up')).toBeInTheDocument();
  expect(screen.getByText('Log in')).toBeInTheDocument();
});

test('renders Go to Connect and Log out when signed in', () => {
  useAuth.mockImplementation(() => ({
    isSignedIn: true,
  }));

  render(<Home />);

  expect(screen.getByText('Go to Connect')).toBeInTheDocument();
  expect(screen.getByText('Log out')).toBeInTheDocument();
});

