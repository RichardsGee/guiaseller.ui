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
  const [startDate, setStartDate] = useState(''); // Data de início para importação
  const [endDate, setEndDate] = useState(''); // Data de fim para importação
  const [showPopup, setShowPopup] = useState(false); // Controlar a exibição do popup
  const [vendasPreview, setVendasPreview] = useState([]); // Armazenar as vendas para o popup
  const [importStatus, setImportStatus] = useState(''); // Status da importação (sucesso ou erro)

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

  // Função para mostrar o popup com a pré-visualização das vendas
  const handleImportPreview = async () => {
    console.log("Botão de importação clicado!"); // Log para verificar
  
    if (!startDate || !endDate) {
      console.error("Selecione as datas de início e fim!");
      return;
    }
  
    // Formatação da URL com os horários fixos no final
    const startOfDay = startDate; // Recebe a data de início, o horário será fixado na URL
    const endOfDay = endDate; // Recebe a data de fim, o horário será fixado na URL
    
    // Logando as datas para verificação
    console.log(`Buscando pedidos entre: ${startOfDay}T00:00:00.000Z e ${endOfDay}T23:59:59.999Z`);
  
    // URL com as datas e os horários fixos para o início e fim
    const url = `https://guiaseller-backend.dlmi5z.easypanel.host/vendas?from=${startOfDay}T00:00:00.000Z&to=${endOfDay}T23:59:59.999Z`;
  
    // Log da URL da requisição
    console.log(`URL da requisição: ${url}`);
  
    setImporting(true); // Inicia o carregamento
    let allVendas = []; // Para acumular todas as vendas
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (Array.isArray(response.data)) {
        allVendas = [...allVendas, ...response.data]; // Acumula as vendas
      } else if (response.data && response.data.message) {
        console.log(response.data.message); // Logando a mensagem de sucesso
      } else {
        console.error("Resposta inesperada:", response.data);
      }
  
      // Atualizando a lista de vendas com os novos pedidos
      setVendas(prevVendas => [...prevVendas, ...allVendas]);
      setVendasPreview(allVendas); // Setando todas as vendas para o popup
      setShowPopup(true); // Exibe o popup com as vendas
    } catch (error) {
      console.error("Erro ao obter vendas para o preview:", error);
    } finally {
      setImporting(false); // Finaliza o carregamento
    }
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
                  <label htmlFor="start-date-select">Data Início:</label>
                  <input
                    type="date"
                    id="start-date-select"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <label htmlFor="end-date-select">Data Fim:</label>
                  <input
                    type="date"
                    id="end-date-select"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleImportPreview} 
                  disabled={importing}
                  className={styles.importButton}
                >
                  {importing ? 'Importando...' : 'Importar'}
                </button>
              </div>
            </div>

            <OrdersList vendas={filteredVendas} /> {/* Exibindo todas as vendas sem afetar a listagem */}
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
            </div>
          </div>
        </div>
      )}

      {/* Overlay de carregamento enquanto importa */}
      {importing && (
        <div className={styles.loadingOverlay}>
          <span>Importando Pedidos...</span>
        </div>
      )}

      <Footer />
    </MainContent>
  );
};

export default VendasPage;
