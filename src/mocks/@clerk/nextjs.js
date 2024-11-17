export const useAuth = jest.fn(() => ({
    isSignedIn: false, // Default state: user not signed in
  }));
  
  export const SignOutButton = jest.fn(({ children }) => <div>{children}</div>);
  
  // Mock additional Clerk APIs if needed
  