// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { ThemeProvider } from './context/ThemeContext'; // Importando o ThemeProvider
import { AuthProvider } from './context/AuthContext'; 
import { UserProvider } from './context/UserContext'; // Importando o UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider> {/* Envolvendo o App com UserProvider */}
          <App />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
