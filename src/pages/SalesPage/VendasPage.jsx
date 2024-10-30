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
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };
    fetchVendas();
  }, [userId]);

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
            <h1 className="title">Meus Pedidos</h1>
            
            {/* Filtro de mês */}
            <div className={styles.filters}>
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
