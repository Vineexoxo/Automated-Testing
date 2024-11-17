import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { SignOutButton, useAuth } from '@clerk/nextjs';

test('should render sign-up and log-in when not signed in, then handle sign-up and log-in flow', () => {
  // Mock initial state: not signed in
  useAuth.mockImplementation(() => ({
    isSignedIn: false,
  }));

  // Render the component
  const { rerender } = render(<Home />);

  // Verify "Sign up" and "Log in" links are present
  expect(screen.getByText('Sign up')).toBeInTheDocument();
  expect(screen.getByText('Log in')).toBeInTheDocument();

  // Simulate clicking "Sign up"
  fireEvent.click(screen.getByText('Sign up'));
  // Verify navigation (uncomment if mock navigation is set up)
  // expect(mockPush).toHaveBeenCalledWith('/sign-up');

  // Simulate signing in
  useAuth.mockImplementation(() => ({
    isSignedIn: true,
  }));

  // Re-render the component to reflect signed-in state
  rerender(<Home />);

  // Verify "Go to Connect" and "Log out" links are present
  expect(screen.getByText('Go to Connect')).toBeInTheDocument();
  expect(screen.getByText('Log out')).toBeInTheDocument();

  // Simulate clicking "Log out"
  fireEvent.click(screen.getByText('Log out'));

  // Mock state: signed out
  useAuth.mockImplementation(() => ({
    isSignedIn: false,
  }));

  // Re-render to reflect signed-out state
  rerender(<Home />);

  // Verify "Sign up" and "Log in" links are back
  expect(screen.getByText('Sign up')).toBeInTheDocument();
  expect(screen.getByText('Log in')).toBeInTheDocument();

  // Simulate clicking "Log in"
  fireEvent.click(screen.getByText('Log in'));

  // Mock state: signed in again
  useAuth.mockImplementation(() => ({
    isSignedIn: true,
  }));

  // Re-render to reflect signed-in state again
  rerender(<Home />);

  // Verify "Go to Connect" and "Log out" links are present again
  expect(screen.getByText('Go to Connect')).toBeInTheDocument();
  expect(screen.getByText('Log out')).toBeInTheDocument();
});
