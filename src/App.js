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
import EbooksPage from './pages/EbooksPage/EbooksPage'; 
import ToolsPage from './pages/ToolsPage/ToolsPage'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import AlphaAccess from './components/AlphaScreen/AlphaScreen';
import Callback from "./pages/Callback/Callback";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PricingCalculatorPage from './pages/PricingCalculatorPage/PricingCalculatorPage'; 
import AdCampaignsPage from './pages/AdCampaignsPage/AdCampaignsPage'; 
import IAButton from './components/Button/IAButtonPage'; 
import QRCodePage from "./pages/QRCodePage/QRCodePage";
import ChatPage from './pages/ChatPage/ChatPage';
import AnunciosPage from './pages/AnunciosPage/AnunciosPage'; // Importe a nova página de Anúncios
import InfluencerPage from './pages/InfluencerPage/InfluencerPage'; // Importando a página do Influenciador
import StoresPage from './pages/StoresPage/StoresPage'; // Importando a nova página de Lojas

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
            path="/ebooks" 
            element={<ProtectedRoute><EbooksPage /></ProtectedRoute>} 
          />
          <Route 
            path="/pagamento-pix-qrcode" 
            element={<ProtectedRoute><QRCodePage /></ProtectedRoute>}
          />
          <Route 
            path="/ferramentas" 
            element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/calculadora-precificacao" 
            element={<ProtectedRoute><PricingCalculatorPage /></ProtectedRoute>} 
          />
          <Route 
            path="/campanhas-publicidade" 
            element={<ProtectedRoute><AdCampaignsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/chat" 
            element={<ProtectedRoute><ChatPage /></ProtectedRoute>} 
          />
          <Route 
            path="/anuncios" 
            element={<ProtectedRoute><AnunciosPage /></ProtectedRoute>} 
          />
          <Route 
            path="/influenciador" 
            element={<ProtectedRoute><InfluencerPage /></ProtectedRoute>} // Nova página de influenciador
          />
          <Route 
            path="/lojas" 
            element={<ProtectedRoute><StoresPage /></ProtectedRoute>} // Nova página de Lojas
          />
          <Route 
            path="/blocked" 
            element={<AlphaAccess />} 
          />
          <Route path="/integrations/callback" element={<Callback />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
        <IAButton /> {/* Adicionando o botão flutuante aqui */}
      </Router>
    </UserProvider>
  );
}

export default App;
