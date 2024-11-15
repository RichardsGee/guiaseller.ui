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
  const [importing, setImporting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(''); // Data selecionada
  const [showPopup, setShowPopup] = useState(false); // Controlar a exibição do popup
  const [vendasPreview, setVendasPreview] = useState([]); // Armazenar as vendas para o popup

  // Fetch do access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:8080/integration/${userId}`);
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

  // Filtrando as vendas pelo mês selecionado
  const filteredVendas = vendas
    .filter(venda => 
      new Date(venda.date_created).getMonth() + 1 === selectedMonth &&
      (venda.comprador_nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       venda.status?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  // Função para mostrar o popup com a pré-visualização das vendas
  const handleImportPreview = async () => {
    console.log("Botão de importação clicado!"); // Log para verificar

    if (!selectedDate) {
      console.error("Selecione uma data!");
      return;
    }

    const from = new Date(selectedDate);
    const to = new Date(selectedDate);

    from.setHours(0, 0, 0, 0); // Início do dia
    to.setHours(23, 59, 59, 999); // Fim do dia

    const url = `http://localhost:8080/vendas?from=${from.toISOString()}&to=${to.toISOString()}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (Array.isArray(response.data)) {
        console.log("Vendas do dia:", response.data); // Logando as vendas no console
        setVendasPreview(response.data); // Setando as vendas para o popup
        setShowPopup(true); // Exibe o popup com as vendas
      } else {
        console.error("A resposta não é um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao obter vendas para o preview:", error);
    }
  };

  // Função para confirmar a importação das vendas
  const handleConfirmImport = () => {
    console.log("Confirmando a importação...");
    setShowPopup(false); // Fecha o popup
    // Realiza a importação de vendas
    setImporting(true);
    // Lógica de importação de vendas (você pode adicionar a chamada da API aqui)
    setImporting(false);
  };

  // Função para fechar o popup sem importar
  const handleClosePopup = () => {
    setShowPopup(false); // Fecha o popup sem realizar a importação
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
              <div className={styles.faturamentoContainer}>
                <div className={styles.quantidadeItem}>
                  <h3>Quantidade Vendas {new Date(0, selectedMonth - 1).toLocaleString("pt-BR", { month: "long" })}</h3>
                  <p>{filteredVendas.length}</p> {/* Exibe a quantidade de vendas filtradas */}
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
            </div>

            {/* Mover os filtros para o canto superior direito */}
            <div className={styles.filtersRightContainer}>
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

              {/* Agrupar data e botão de importação */}
              <div className={styles.dateAndImportContainer}>
                <div className={styles.dateFilter}>
                  <label htmlFor="date-select">Selecione a Data:</label>
                  <input
                    type="date"
                    id="date-select"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleImportPreview} 
                  disabled={importing}
                  className={styles.importButton}
                >
                  {importing ? 'Importando...' : 'Preview das Vendas e Importar'}
                </button>
              </div>
            </div>

            <OrdersList vendas={filteredVendas} />
          </div>
        </div>
      </div>

      {/* Popup para visualizar as vendas antes da importação */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Vendas do Dia</h2>
            <ul>
              {vendasPreview.map((venda, index) => (
                <li key={index}>
                  <strong>{venda.comprador_nickname}</strong> - {venda.date_created}
                </li>
              ))}
            </ul>
            <div className={styles.popupActions}>
              <button onClick={handleClosePopup}>Cancelar</button>
              <button onClick={handleConfirmImport}>Confirmar Importação</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </MainContent>
  );
};

export default VendasPage;
