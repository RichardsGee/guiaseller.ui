import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard";
import VendasPage from "./pages/VendasPage"; 
import SettingsPage from "./pages/SettingsPage"; 
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; 
import ProdutosPage from './pages/ProdutosPage'; 
import FerramentasIA from './pages/FerramentasIA'; 
import MessagesPage from './pages/MessagesPage'; // Adicione a importação da página de mensagens
import IntegrationsPage from './pages/IntegrationsPage';

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
          <Route path="/ferramentas-ia" element={<FerramentasIA />} /> 
          <Route path="/mensagens" element={<MessagesPage />} /> {/* Adicionando a rota de mensagens */}
          <Route path="/integrações" element={<IntegrationsPage />} /> 

        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
