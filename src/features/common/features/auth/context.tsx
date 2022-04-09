import React from "react";

import { signIn, User } from "@/features/auth";

export type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User | Error>;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const context = {
    user,
    signIn: async (email: string, password: string) => {
      const user = await signIn(email, password);
      setUser(user);
      return user;
    },
    signOut: () => {
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return { ...context, isAuthenticated: !!context.user };
}
