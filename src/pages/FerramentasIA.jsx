import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/ferramentasIa.module.css';
import MainContent from '../components/MainContent'; 
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Lock, LockOpen } from '@mui/icons-material';

const FerramentasIA = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [hovered, setHovered] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas'); // Categoria ativa

  const ferramentasData = [
    { nome: 'Gerador de Títulos', descricao: 'Crie títulos de alta conversão.', ativo: true, custo: 'R$ 29,90', categoria: 'Geradores' },
    { nome: 'Gerador de Descrições', descricao: 'Gere descrições otimizadas para SEO.', ativo: false, custo: 'R$ 39,90', categoria: 'Geradores' },
    { nome: 'Gerador de Palavras-chave', descricao: 'Encontre palavras-chave estratégicas.', ativo: true, custo: 'R$ 19,90', categoria: 'Análise' },
    { nome: 'Analisador de Concorrência', descricao: 'Compare sua concorrência em tempo real.', ativo: false, custo: 'R$ 49,90', categoria: 'Análise' },
    { nome: 'Análise de anúncio', descricao: 'Analise seu anúncio.', ativo: false, custo: 'R$ 49,90', categoria: 'Análise' },
  ];

  // Filtros de categorias
  const categorias = ['Todas', 'Geradores', 'Análise'];

  // Função para filtrar ferramentas com base na categoria selecionada
  const ferramentasFiltradas = categoriaAtiva === 'Todas'
    ? ferramentasData
    : ferramentasData.filter(ferramenta => ferramenta.categoria === categoriaAtiva);

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.iaContainer}>
          <h1 className={styles.title}>Ferramentas de IA</h1>

          {/* Botões de Categoria */}
          <div className={styles.categoriaButtons}>
            {categorias.map((categoria, index) => (
              <button
                key={index}
                className={`${styles.categoriaButton} ${categoriaAtiva === categoria ? styles.categoriaAtiva : ''}`}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          <div className={styles.toolsGrid}>
            {ferramentasFiltradas.map((ferramenta, index) => (
              <div 
                key={index} 
                className={`${styles.toolCard} ${!ferramenta.ativo ? styles.inactive : ''}`}
              >
                <h3 className={styles.toolName}>{ferramenta.nome}</h3>
                <p className={styles.toolDesc}>{ferramenta.descricao}</p>

                {!ferramenta.ativo && (
                  <div className={styles.lockIcon}>
                    {hovered === index ? <LockOpen className={styles.iconInativo} /> : <Lock className={styles.iconInativo} />}
                  </div>
                )}

                <div className={styles.bottomSection}>
                  <button 
                    className={ferramenta.ativo ? styles.adquiridoButton : styles.assinarButton}
                    onMouseEnter={() => setHovered(index)} 
                    onMouseLeave={() => setHovered(null)}
                  >
                    {ferramenta.ativo ? 'Usar' : 'Assinar'} 
                    {!ferramenta.ativo && (
                      <span className={styles.custoDentro}>{ferramenta.custo}</span>
                    )}
                  </button>
                </div>
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