import '@testing-library/jest-dom';

jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(() => ({
    isSignedIn: false, // Default behavior for tests
  })),
  SignOutButton: ({ children }) => <button>{children}</button>,
}));
