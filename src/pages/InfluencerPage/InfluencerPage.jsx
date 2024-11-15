import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent';  
import { AuthContext } from '../../context/AuthContext';  
import { CopyAll } from '@mui/icons-material';  // Importando o ícone de copiar
import styles from './influencer.module.css';

const InfluencerPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "Nenhum usuário logado";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [influencerData, setInfluencerData] = useState({
    totalRevenue: 5689.66,
    totalCommission: 1601.28,
    netCommission: 626.28,
    affiliates: [
      { name: 'João Silva', commission: 1601.28, orders: 5 },
      { name: 'Lúcia Souza', commission: 1208.09, orders: 4 },
      { name: 'Victor Garcia', commission: 759.21, orders: 3 },
    ],
    orders: [
      { date: '27-Out-2022', order: '#2728', commission: 200.10, customer: 'Jason Calcanis', repasse: 90.0 },
      { date: '26-Out-2022', order: '#2763', commission: 10.10, customer: 'Dina S.', repasse: 5.0 },
      { date: '20-Out-2022', order: '#2753', commission: 134.05, customer: 'Jason Calcanis', repasse: 60.0 },
      { date: '17-Out-2022', order: '#2751', commission: 175.73, customer: 'Jason Calcanis', repasse: 70.0 },
      { date: '06-Out-2022', order: '#2738', commission: 391.90, customer: 'Chris Evans', repasse: 150.0 },
    ]
  });

  useEffect(() => {
    // Dados fictícios para demonstração
  }, []);

  // Função para formatar valores para moeda, protegendo contra undefined
  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return 'R$ 0,00';  // Retorna valor padrão
    }
    return `R$ ${value.toFixed(2)}`;
  }

  // Calculando o total de ganhos por indicação e por ebooks vendidos
  const totalGanhosIndicações = influencerData.affiliates.reduce((acc, affiliate) => acc + affiliate.commission, 0);
  const totalGanhosEbooks = influencerData.orders.reduce((acc, order) => acc + order.repasse, 0);

  // Função para copiar o link de indicação
  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copiado!');
  };

  const linkIndicação = `https://minhaplataforma.com/indicar/${user?.uid}`;  // Link de exemplo de indicação

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Página do Influenciador</h1>

          {/* Relatórios de Ganhos com Destaque */}
          <div className={styles.reportsWrapper}>
            
            {/* Relatório de Ganhos com Indicação */}
            <div className={styles.reportCard}>
              <h3>Indicações</h3>
              <div className={styles.ganhoCard}>
                <p className={styles.ganhoIndicado}>{formatCurrency(totalGanhosIndicações)}</p>
                <span className={styles.quantidade}>{influencerData.affiliates.length} Indicações</span>
                <div className={styles.linkIndicação}>
                  <p>Link de Indicação:</p>
                  <div className={styles.linkWrapper}>
                    <input type="text" value={linkIndicação} readOnly className={styles.linkInput} />
                    <CopyAll className={styles.copyIcon} onClick={() => copyLink(linkIndicação)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Relatório de Ganhos com Vendas de Ebooks */}
            <div className={styles.reportCard}>
              <h3>Ebooks Vendidos</h3>
              <div className={styles.ganhoCard}>
                <p className={styles.ganhoEbook}>{formatCurrency(totalGanhosEbooks)}</p>
                <span className={styles.quantidade}>{influencerData.orders.length} Vendas</span>
              </div>
            </div>
          </div>

          {/* Containers lado a lado */}
          <div className={styles.containersWrapper}>
            
            {/* Container de Afiliados */}
            <div className={styles.affiliatesContainer}>
              <h2>Afiliados</h2>
              <table className={styles.vendasTable}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Repasse</th>
                  </tr>
                </thead>
                <tbody>
                  {influencerData.orders.map((order, index) => (
                    <tr key={index} className={styles.vendaRow}>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{formatCurrency(order.commission)}</td>
                      <td>{formatCurrency(order.repasse)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Container de Ebooks Vendidos */}
            <div className={styles.ebooksContainer}>
              <h2>Ebooks Vendidos</h2>
              <table className={styles.vendasTable}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Ebook</th>
                    <th>Valor</th>
                    <th>Repasse</th>
                  </tr>
                </thead>
                <tbody>
                  {influencerData.orders.map((order, index) => (
                    <tr key={index} className={styles.vendaRow}>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{`Ebook ${index + 1}`}</td>
                      <td>{formatCurrency(order.commission)}</td>
                      <td>{formatCurrency(order.repasse)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default InfluencerPage;
