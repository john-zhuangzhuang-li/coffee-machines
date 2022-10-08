import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

type UserProviderProps = {
  children?: React.ReactNode;
};

interface UserContextInterface {
  user: User;
  isLoading: boolean;
  error: boolean;
  userSignIn: (email: string, password: string) => void;
  userSignOut: () => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const userSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await signInWithEmailAndPassword(auth, email, password);
      if (!userData) throw new Error("User sign-in failed");
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const userSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) =>
      setUser(userData)
    );

    return () => unsubscribe();
  }, []);

  const userState = {
    user,
    isLoading,
    error,
    userSignIn,
    userSignOut,
  };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userState = useContext(UserContext);
  if (!userState) return null;
  const { user, isLoading, error, userSignIn, userSignOut } = userState;
  return {
    user,
    isLoading,
    error,
    userSignIn,
    userSignOut,
  };
};
