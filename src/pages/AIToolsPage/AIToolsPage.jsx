import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import styles from './AIToolsPage.module.css'; // Importando o CSS específico da página
import '../../styles/styles.css'; // Importando o CSS global onde está o contentContainer
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';
import AIToolsList from './AIToolsList'; // Importando o componente de lista
import { ferramentasData } from './AITools'; // Importando os dados das ferramentas
import BuySound from '../../components/BuySound'; // Componente de som para a interação de compra

const AIToolsPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas'); // Categoria ativa
  const [favoritos, setFavoritos] = useState([]); // Estado para armazenar ferramentas favoritas
  const [adquiridos, setAdquiridos] = useState([]); // Estado para armazenar ferramentas adquiridas

  // Categorias disponíveis
  const categorias = ['Todas', 'Geradores', 'Análise', 'Favoritos'];

  // Função para filtrar ferramentas com base na categoria ativa
  const ferramentasFiltradas = categoriaAtiva === 'Todas'
    ? ferramentasData
    : categoriaAtiva === 'Favoritos'
      ? ferramentasData.filter(ferramenta => favoritos.includes(ferramenta.nome))
      : ferramentasData.filter(ferramenta => ferramenta.categoria === categoriaAtiva);

  // Função para usar a ferramenta (navega para a página específica da ferramenta)
  const handleUseTool = (route) => {
    window.location.href = route;
  };

  // Função para adicionar ou remover dos favoritos
  const handleToggleFavorito = (nome) => {
    setFavoritos((prev) => 
      prev.includes(nome) ? prev.filter(fav => fav !== nome) : [...prev, nome]
    );
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={user.email} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Ferramentas de IA</h1>

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

          <AIToolsList 
            ferramentas={ferramentasFiltradas} 
            favoritos={favoritos} 
            adquiridos={adquiridos} 
            handleUseTool={handleUseTool} 
            handleToggleFavorito={handleToggleFavorito} 
          />

          <BuySound play={false} stop={false} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default AIToolsPage;
