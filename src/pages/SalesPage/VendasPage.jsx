import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import OrdersList from './OrdersList';
import styles from './vendas.module.css';
import filterStyles from '../../styles/filter.module.css';
import axios from 'axios';

const VendasPage = ({ faturamento, quantidadeVendasMesAtual }) => {
  const [vendas, setVendas] = useState([]); // Para armazenar as vendas
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, signOut } = useContext(AuthContext);

  const userId = user ? user.uid : null;
  const [accessToken, setAccessToken] = useState(null);

  // Fetch do access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/integration/${userId}`);
        const { access_token } = response.data;
        setAccessToken(access_token);
      } catch (error) {
        console.error("Erro ao buscar access token:", error);
      }
    };

    fetchAccessToken();
  }, [userId]);

  // Fetch de vendas
  useEffect(() => {
    const fetchVendas = async () => {
      if (!userId || !accessToken) return;

      try {
        const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/vendas/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (Array.isArray(response.data)) {
          setVendas(response.data);
        } else {
          console.error("Dados de vendas não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchVendas();
  }, [userId, accessToken]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filtrando as vendas para exibição, com base no mês selecionado
  const filteredVendas = vendas
    .filter(venda => new Date(venda.date_created).getMonth() + 1 === selectedMonth) // Filtro por mês
    .filter(venda => 
      venda.comprador_nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  return (
    <MainContent>
      <Header username={user?.displayName || user?.email || "No User Logged"} logout={signOut} />
      <Sidebar userPhoto={user?.photoURL} username={user?.displayName || user?.email} userEmail={user?.email} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.vendasContainer}>
            <div className={styles.headerContainer}>
              <h1 className="title">Meus Pedidos</h1>
            </div>

            {/* Filtro de Busca e Seletor de Mês na mesma linha */}
            <div className={styles.filtersContainer}>
              {/* Barra de busca à esquerda */}
              <div className={filterStyles.filterWrapper}>
                <div className={filterStyles.filterSection}>
                  <input
                    id="search"
                    type="text"
                    placeholder="Digite o nome do comprador, código ou status..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Seletor de Mês à direita */}
              <div className={styles.monthFilter}>
                <p className={styles.quantidadeText}>
                  {filteredVendas.length} Vendas em |
                  <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className={styles.monthSelect}
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("pt-BR", { month: "long" }).toUpperCase()}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            <OrdersList vendas={filteredVendas} /> {/* Exibindo todas as vendas sem afetar a listagem */}
          </div>
        </div>
      </div>

      <Footer />
    </MainContent>
  );
};

export default VendasPage;
