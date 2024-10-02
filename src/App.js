// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard";
import VendasPage from "./pages/VendasPage"; 
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; // Importando o UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendas" element={<VendasPage />} /> {/* Adicionando a rota para vendas */}
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
