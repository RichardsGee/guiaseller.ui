import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  loading: true,
  userLevel: '', // Adicionando userLevel ao contexto
  signOut: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState(''); // Estado para o nível do usuário

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Se o usuário estiver autenticado, busca o nível do usuário
        await fetchUserLevel(user.uid);
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
    <AuthContext.Provider value={{ user, loading, userLevel, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
