import { useState, createContext, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Este componente es un HOC -> Higher order component

interface IAuthContext {
  user: any;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => any;
  loading: any;
}

let AuthContext = createContext<IAuthContext>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const logIn = async (email: string, password: string) => {
    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return loggedUser;
    } catch (error: any) {
      console.error(error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  // checks for auth change to update the user
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
  }, []);

  return (
    // Con esto, todos los valores = {} serán accesibles desde los componentes hijos
    <AuthContext.Provider value={{ user, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook
// Facilita la importacion del contexto en otros archivos y nos deja acceder a sus valores
export function useAuth() {
  return useContext(AuthContext);
}
