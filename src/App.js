import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/DashboardPage/Dashboard";
import VendasPage from "./pages/SalesPage/VendasPage";  
import SettingsPage from "./pages/SettingsPage/SettingsPage"; 
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; 
import ProdutosPage from './pages/ProductsPage/ProdutosPage'; 
import FerramentasIA from './pages/AIToolsPage/AIToolsPage'; 
import MessagesPage from './pages/MessagesPage/MessagesPage'; 
import IntegrationsPage from './pages/IntegrationsPage/IntegrationsPage';
import GeradorTitulos from './pages/TittleGenerator/TittleGenerator';
import TokensBuyPage from './pages/TokensBuyPage/TokensBuyPage'; 
import KitsPage from './pages/ProductsPage/KitsPage';
import PlansPage from './pages/PlansPage/PlansPage';  
import EbooksPage from './pages/EbooksPage/EbooksPage'; // Importando a página de eBooks
import ToolsPage from './pages/ToolsPage/ToolsPage'; // Importando a nova página de Ferramentas
import ProtectedRoute from './components/ProtectedRoute'; 
import AlphaAccess from './components/AlphaScreen/AlphaScreen';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/vendas" 
            element={<ProtectedRoute><VendasPage /></ProtectedRoute>} 
          />
          <Route 
            path="/produtos" 
            element={<ProtectedRoute><ProdutosPage /></ProtectedRoute>} 
          />
          <Route 
            path="/configuracoes" 
            element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/ferramentas-ia" 
            element={<ProtectedRoute><FerramentasIA /></ProtectedRoute>} 
          />
          <Route 
            path="/mensagens" 
            element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} 
          />
          <Route 
            path="/integracoes" 
            element={<ProtectedRoute><IntegrationsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/ferramentas-ia/gerador-titulos" 
            element={<ProtectedRoute><GeradorTitulos /></ProtectedRoute>} 
          />
          <Route 
            path="/comprar-tokens" 
            element={<ProtectedRoute><TokensBuyPage /></ProtectedRoute>} 
          />
          <Route 
            path="/kits" 
            element={<ProtectedRoute><KitsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/planos" 
            element={<ProtectedRoute><PlansPage /></ProtectedRoute>} 
          />
          <Route 
            path="/ebooks" // Adicionando a rota para a página de eBooks
            element={<ProtectedRoute><EbooksPage /></ProtectedRoute>} 
          />
          <Route 
            path="/ferramentas" // Adicionando a rota para a nova página de Ferramentas
            element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/blocked" 
            element={<AlphaAccess />} 
          />
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
