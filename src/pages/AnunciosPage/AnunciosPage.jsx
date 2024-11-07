// src/pages/AnunciosPage/AnunciosPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import AnunciosList from './AnunciosList';
import anunciosStyles from './anuncios.module.css';

const AnunciosPage = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/anuncios/${user.uid}`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAnuncios(data);
        setFilteredAnuncios(data);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
      }
    };

    if (user && user.uid) {
      fetchAnuncios();
    }
  }, [user]);

  useEffect(() => {
    const filtered = anuncios.filter((anuncio) =>
      new Date(anuncio.date_created).getMonth() + 1 === selectedMonth &&
      (anuncio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       anuncio.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       anuncio.listing_type_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAnuncios(filtered);
  }, [anuncios, selectedMonth, searchTerm]);

  return (
    <MainContent>
      <Header username={user?.displayName || user?.email || "No User Logged"} logout={signOut} />
      <Sidebar userPhoto={user?.photoURL} username={user?.displayName || user?.email} userEmail={user?.email} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={anunciosStyles.anunciosContainer}>
            <h1 className="title">Meus Anúncios</h1>
            
            {/* Filtro e busca */}
            <div className={anunciosStyles.filtersContainer}>
              {/* Filtro de mês */}
              <div className={anunciosStyles.monthFilter}>
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

            {/* Campo de busca */}
            <div className={anunciosStyles.searchWrapper}>
              <input
                id="search"
                type="text"
                placeholder="Digite o título do anúncio, ID ou status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={anunciosStyles.searchInput}
              />
            </div>

            {/* Tabela de Anúncios */}
            <AnunciosList anuncios={filteredAnuncios} />
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default AnunciosPage;
