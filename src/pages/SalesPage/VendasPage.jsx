import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import OrdersList from './OrdersList';
import styles from './vendas.module.css';
import filterStyles from '../../styles/filter.module.css';

const VendasPage = ({ faturamento, quantidadeVendasMesAtual }) => {
  const [vendas, setVendas] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, signOut } = useContext(AuthContext);

  const userId = user ? user.uid : null;

  // Log do User UID apenas na primeira renderização
  const [isMounted, setIsMounted] = useState(false);
  if (!isMounted) {
    console.log("User UID:", userId);
    setIsMounted(true); // Muda o estado para indicar que o componente foi montado
  }

  // Fetch de vendas
  useEffect(() => {
    const fetchVendas = async () => {
      if (!userId) return; // Verifica se o userId está disponível

      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/vendas/${userId}`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setVendas(data);
        console.log("Dados de vendas:", data); // Logando os dados de vendas

      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchVendas();
  }, [userId]); // Executa apenas quando userId muda

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredVendas = vendas
    .filter(venda => 
      new Date(venda.date_created).getMonth() + 1 === selectedMonth &&
      (venda.comprador_nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.status?.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <div className={styles.faturamentoContainer}>
                <div className={styles.quantidadeItem}>
                  <h3>Quantidade Vendas {new Date().toLocaleString("pt-BR", { month: "long" })}</h3>
                  <p>{quantidadeVendasMesAtual}</p>
                </div>
              </div>
            </div>

            <div className={styles.filtersContainer}>
              <div className={styles.monthFilter}>
                <label htmlFor="month-select">Filtrar por Mês:</label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>

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
            </div>

            <OrdersList vendas={filteredVendas} />
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default VendasPage;
