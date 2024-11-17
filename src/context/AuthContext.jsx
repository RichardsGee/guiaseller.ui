import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { checkUserAlphaStatus } from '../services/api';
import axios from 'axios'; // Import axios here

export const AuthContext = createContext({
  user: null,
  loading: true,
  isAlphaUser: false,
  userLevel: '',
  canAccessApp: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlphaUser, setIsAlphaUser] = useState(false);
  const [userLevel, setUserLevel] = useState(''); // State for user level
  const [canAccessApp, setCanAccessApp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(true);

      if (user) {
        try {
          const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${user.uid}`);
          const userData = response.data;

          // Set user level
          setUserLevel(userData.user_level || ''); // Update user level based on user data

          const hasAccess =
            userData.user_level === 'Admin' ||
            userData.isAlpha ||
            userData.isInfluencer === true;

          setCanAccessApp(hasAccess);

          const isAlpha = await checkUserAlphaStatus(user.uid);
          setIsAlphaUser(isAlpha);
        } catch (error) {
          console.error('Erro ao buscar informações do usuário ou verificar status alpha', error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAlphaUser, userLevel, canAccessApp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
