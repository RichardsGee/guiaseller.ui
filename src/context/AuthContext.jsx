import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { checkUserAlphaStatus } from '../services/api';
import axios from 'axios'; // Import axios here

export const AuthContext = createContext({
  user: null,
  loading: true,
  isAlphaUser: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAlphaUser, setIsAlphaUser] = useState(false);
  const [userLevel, setUserLevel] = useState(''); // Add state for user level if needed

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(true);

      if (user) {
        try {
          const isAlpha = await checkUserAlphaStatus(user.uid); 
          setIsAlphaUser(isAlpha);
          await fetchUserLevel(user.uid); // Call the function here
        } catch (error) {
          console.error("Erro ao verificar o status de acesso alpha", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserLevel = async (userId) => {
    try {
      const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      setUserLevel(response.data.user_level || ''); // Atualiza o userLevel com o valor retornado
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAlphaUser, userLevel, signOut }}> {/* Include userLevel in the provider's value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
