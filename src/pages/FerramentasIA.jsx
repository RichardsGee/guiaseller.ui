import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/ferramentasIa.module.css'; // Corrigido para o nome correto
import MainContent from '../components/MainContent'; // Importando o MainContent
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Lock } from '@mui/icons-material'; // Ícone de cadeado

const FerramentasIA = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [ferramentas, setFerramentas] = useState([
    { nome: 'Gerador de Títulos', descricao: 'Crie títulos de alta conversão.', ativo: true, custo: 'R$ 29,90' },
    { nome: 'Gerador de Descrições', descricao: 'Gere descrições otimizadas para SEO.', ativo: false, custo: 'R$ 39,90' },
    { nome: 'Gerador de Palavras-chave', descricao: 'Encontre palavras-chave estratégicas.', ativo: true, custo: 'R$ 19,90' },
    { nome: 'Analisador de Concorrência', descricao: 'Compare sua concorrência em tempo real.', ativo: false, custo: 'R$ 49,90' },
  ]);

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.iaContainer}>
          <h1 className={styles.title}>Ferramentas de IA</h1>

          <div className={styles.toolsGrid}>
            {ferramentas.map((ferramenta, index) => (
              <div 
                key={index} 
                className={`${styles.toolCard} ${!ferramenta.ativo ? styles.inactive : ''}`}
              >
                <h3 className={styles.toolName}>{ferramenta.nome}</h3>
                <p className={styles.toolDesc}>{ferramenta.descricao}</p>

                {/* Ícone de cadeado no canto superior direito, apenas se inativo */}
                {!ferramenta.ativo && (
                  <div className={styles.lockIcon}>
                    <Lock className={styles.iconInativo} />
                  </div>
                )}

                <div className={styles.bottomSection}>
                  {/* Botão de adquirir ou assinar */}
                  <button className={ferramenta.ativo ? styles.adquiridoButton : styles.assinarButton}>
                    {ferramenta.ativo ? 'Usar' : 'Assinar'} 
                  </button>
                </div>

                {/* Custo da ferramenta abaixo do botão */}
                {!ferramenta.ativo && (
                  <p className={styles.custo}>{ferramenta.custo}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default FerramentasIA;
