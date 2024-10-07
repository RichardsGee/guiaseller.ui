import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import styles from './AITools.module.css'; // Caminho ajustado
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Lock, LockOpen } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BuySound from '../../components/BuySound'; // Certifique-se de importar corretamente o BuySound

const AITools = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas'); // Categoria ativa
  const [playSound, setPlaySound] = useState(false); // Estado para controlar a reprodução do som
  const [stopSound, setStopSound] = useState(false); // Estado para controlar o fade out do som

  const ferramentasData = [
    { nome: 'Gerador de Títulos', descricao: 'Crie títulos de alta conversão.', ativo: true, custo: '1 Token (24h)', restante: '18 horas', route: '/ferramentas-ia/gerador-titulos', categoria: 'Geradores' },
    { nome: 'Gerador de Descrições', descricao: 'Gere descrições otimizadas para SEO.', ativo: false, custo: '1 Token (24h)', categoria: 'Geradores' },
    { nome: 'Gerador de Palavras-chave', descricao: 'Encontre palavras-chave estratégicas.', ativo: true, custo: '1 Token (24h)', restante: '5 horas', categoria: 'Análise' },
    { nome: 'Analisador de Concorrência', descricao: 'Compare sua concorrência em tempo real.', ativo: false, custo: '1 Token (24h)', categoria: 'Análise' },
    { nome: 'Análise de Anúncio', descricao: 'Analise seu anúncio.', ativo: false, custo: '1 Token (24h)', categoria: 'Análise' },
  ];

  // Filtros de categorias
  const categorias = ['Todas', 'Geradores', 'Análise'];

  // Função para filtrar ferramentas com base na categoria selecionada
  const ferramentasFiltradas = categoriaAtiva === 'Todas'
    ? ferramentasData
    : ferramentasData.filter(ferramenta => ferramenta.categoria === categoriaAtiva);

  // Função para ativar a navegação para a ferramenta ativa
  const handleUseTool = (route) => {
    if (route) {
      navigate(route);
    }
  };

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
                    onClick={() => ferramenta.ativo && handleUseTool(ferramenta.route)} // Se ativo, navega para a página
                    onMouseEnter={() => { 
                      setHovered(index); 
                      if (!ferramenta.ativo) {
                        setPlaySound(true);  // Inicia o som no hover
                        setStopSound(false); // Certifica-se de que o fade out está parado
                      }
                    }} 
                    onMouseLeave={() => { 
                      setHovered(null); 
                      setPlaySound(false); // Para de tocar o som
                      setStopSound(true);  // Inicia o fade out
                    }}
                  >
                    {ferramenta.ativo ? `Ativo ${ferramenta.restante}` : 'Ativar'} 
                    {!ferramenta.ativo && (
                      <span className={styles.custoDentro}>{ferramenta.custo}</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Componente de som */}
          <BuySound play={playSound} stop={stopSound} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default AITools;
