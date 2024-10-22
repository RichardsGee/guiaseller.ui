import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import styles from './EbooksPage.module.css';
import '../../styles/styles.css';
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';
import BuySound from '../../components/BuySound';
import EbooksList from './EbooksList'; // Importando a lista de eBooks
import { ebooksData } from './Ebooks'; // Importando a lista de eBooks e imagens

const EbooksPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas'); // Categoria ativa
  const [favoritos, setFavoritos] = useState([]); // Estado para armazenar eBooks favoritos
  const [adquiridos, setAdquiridos] = useState([]); // Estado para armazenar eBooks comprados

  const categorias = ['Todas', 'Marketing', 'SEO', 'Favoritos'];

  const ebooksFiltrados = categoriaAtiva === 'Todas'
    ? ebooksData
    : categoriaAtiva === 'Favoritos'
      ? ebooksData.filter(ebook => favoritos.includes(ebook.nome))
      : ebooksData.filter(ebook => ebook.categoria === categoriaAtiva);

  const handleCompraEbook = (ebook) => {
    if (!adquiridos.includes(ebook.nome)) {
      setAdquiridos([...adquiridos, ebook.nome]);
      alert(`Você comprou o eBook: ${ebook.nome}`);
    }
  };

  const handleBaixarEbook = (route) => {
    window.location.href = route;
  };

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
          <h1 className="title">eBooks Disponíveis</h1>

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

          {/* Passa os eBooks filtrados para o componente EbooksList */}
          <EbooksList 
            ebooks={ebooksFiltrados} 
            favoritos={favoritos} 
            adquiridos={adquiridos} 
            handleCompraEbook={handleCompraEbook} 
            handleBaixarEbook={handleBaixarEbook} 
            handleToggleFavorito={handleToggleFavorito} 
          />

          <BuySound play={false} stop={false} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default EbooksPage;
