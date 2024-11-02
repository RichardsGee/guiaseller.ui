import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import OrdersList from './OrdersList';
import styles from './vendas.module.css';
import filterStyles from '../../styles/filter.module.css';

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [totalVendasMesAtual, setTotalVendasMesAtual] = useState(0); // Total do mês atual
  const [totalVendasUltimoMes, setTotalVendasUltimoMes] = useState(0); // Total do último mês
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual
  const [searchTerm, setSearchTerm] = useState('');
  const { user, signOut } = useContext(AuthContext);

  const userId = 'pvvtctrvNdg4bcnOogd839Z1ZqD3';

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/vendas/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setVendas(data);

        // Cálculo do total para o mês atual e o último mês
        const currentMonth = new Date().getMonth() + 1;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

        const totalMesAtual = data.reduce((acc, venda) => {
          const month = new Date(venda.date_created).getMonth() + 1;
          const totalPago = venda.payments[0]?.total_paid_amount || 0;
          return month === currentMonth ? acc + (parseFloat(totalPago) || 0) : acc;
        }, 0);
        setTotalVendasMesAtual(totalMesAtual);

        const totalUltimoMes = data.reduce((acc, venda) => {
          const month = new Date(venda.date_created).getMonth() + 1;
          const totalPago = venda.payments[0]?.total_paid_amount || 0;
          return month === lastMonth ? acc + (parseFloat(totalPago) || 0) : acc;
        }, 0);
        setTotalVendasUltimoMes(totalUltimoMes);

        // Armazenar valores no localStorage
        localStorage.setItem('totalVendasMesAtual', totalMesAtual);
        localStorage.setItem('totalVendasUltimoMes', totalUltimoMes); // Armazenando também o total do mês anterior

      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };
    fetchVendas();
  }, [userId]);

  const handleImport = async () => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      const from = yesterday.toISOString();
      const to = today.toISOString();

      const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/vendas?from=${from}&to=${to}`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      console.log("Importação bem-sucedida!");
    } catch (error) {
      console.error("Erro ao importar vendas:", error);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredVendas = vendas
    .filter(venda => 
      new Date(venda.date_created).getMonth() + 1 === selectedMonth &&
      (venda.comprador_nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.status?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  // Função para obter o nome do mês
  const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString('pt-BR', { month: 'long' });
  };

  return (
    <MainContent>
      <Header username={user?.displayName || user?.email || "No User Logged"} logout={signOut} />
      <Sidebar userPhoto={user?.photoURL} username={user?.displayName || user?.email} userEmail={user?.email} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.vendasContainer}>
            <div className={styles.headerContainer}>
              <h1 className="title">Meus Pedidos</h1>
              {/* Seção de Faturamento ao lado do título */}
              <div className={styles.faturamentoContainer}>
                <div className={styles.faturamentoItem}>
                  <h3>Total {getMonthName(new Date().getMonth())}</h3> {/* Total do mês anterior */}
                  <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendasUltimoMes)}</p>
                </div>
                <div className={styles.faturamentoItem}>
                  <h3>Total {getMonthName(new Date().getMonth() + 1)}</h3> {/* Total do mês atual */}
                  <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendasMesAtual)}</p>
                </div>
              </div>
            </div>

            {/* Filtros e Importação */}
            <div className={styles.filtersContainer}>
              <button className={styles.importButton} onClick={handleImport}>Importar Últimas 24 Horas</button>

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
              
              {/* Campo de busca */}
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
                <div className={`${filterStyles.searchResults} ${searchTerm ? filterStyles.active : ''}`}>
                  <p><strong>Busca:</strong> {searchTerm || 'N/A'}</p>
                  <p><strong>Resultado:</strong> {filteredVendas.length}</p>
                </div>
              </div>
            </div>
            
            {/* Lista de pedidos */}
            <OrdersList vendas={filteredVendas} />
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default VendasPage;
