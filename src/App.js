import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/DashboardPage/Dashboard";
import VendasPage from "./pages/SalesPage/VendasPage";  
import SettingsPage from "./pages/SettingsPage/SettingsPage"; 
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext"; 
import ProdutosPage from './pages/ProductsPage/ProdutosPage'; 
import FerramentasIA from './pages/AIToolsPage/AITools'; 
import MessagesPage from './pages/MessagesPage/MessagesPage'; 
import IntegrationsPage from './pages/IntegrationsPage/IntegrationsPage';
import GeradorTitulos from './pages/TittleGenerator/TittleGenerator';
import TokensBuyPage from './pages/TokensBuyPage/TokensBuyPage'; 
import ProtectedRoute from './components/ProtectedRoute'; 

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
            path="/integrações" 
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
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
