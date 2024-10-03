import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard";
import VendasPage from "./pages/VendasPage"; 
import SettingsPage from "./pages/SettingsPage"; 
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; 
import ProdutosPage from './pages/ProdutosPage'; 
import FerramentasIA from './pages/FerramentasIA'; // Certifique-se de adicionar esta linha

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendas" element={<VendasPage />} /> 
          <Route path="/produtos" element={<ProdutosPage />} /> 
          <Route path="/configuracoes" element={<SettingsPage />} /> 
          <Route path="/ferramentas-ia" element={<FerramentasIA />} /> {/* Adicionada a rota corretamente */}
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
