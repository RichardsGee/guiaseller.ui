// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const UserContext = createContext();

// Criação do hook para acessar o contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Provider para fornecer os dados do usuário
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "Fulano de Tal",
    email: "fulano@email.com",
    level: "VIP",
    photo: "https://via.placeholder.com/80"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
