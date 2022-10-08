import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

type UserProviderProps = {
  children?: React.ReactNode;
};

interface UserContextInterface {
  user: User | null;
  userSignIn: (email: string, password: string) => Promise<UserCredential>;
  userSignOut: () => Promise<void>;
}

const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const userSignIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) =>
      setUser(userData)
    );

    return () => unsubscribe();
  }, []);

  const userState = {
    user,
    userSignIn,
    userSignOut,
  };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userState = useContext(UserContext);
  if (!userState) return {};
  const { user, userSignIn, userSignOut } = userState;
  return {
    user,
    userSignIn,
    userSignOut,
  };
};
