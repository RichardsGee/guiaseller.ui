import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard";
import VendasPage from "./pages/VendasPage"; 
import SettingsPage from "./pages/SettingsPage"; // Importe a página ToolsPage
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; // Importando o UserProvider
import ProdutosPage from './pages/ProdutosPage'; // Certifique-se que o caminho esteja correto


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendas" element={<VendasPage />} /> {/* Rota para Vendas */}
          <Route path="/produtos" element={<ProdutosPage />} /> {/* Rota para Vendas */}
          <Route path="/configuracoes" element={<SettingsPage />} /> {/* Rota para Configurações redirecionando para ToolsPage */}
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
