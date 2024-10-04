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
import MessagesPage from './pages/MessagesPage'; 
import IntegrationsPage from './pages/IntegrationsPage';
import GeradorTitulos from './pages/GeradorTitulos';
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
        </Routes>
        <ToastContainer />
      </Router>
    </UserProvider>
  );
}

export default App;
