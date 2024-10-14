import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import WebhookResultComponent from '../../components/WebhookResultComponent';
import FunctionCopy from '../../components/FunctionCopy/FunctionCopy'; // Importando o componente de cópia
import styles from './TittleGenerator.module.css'; 

const GeradorTitulos = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userId = user ? user.uid : null;

  const [inputText, setInputText] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResultText, setShowResultText] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerateTitle = async () => {
    if (!inputText) {
      alert("Digite os detalhes do seu produto!");
      return;
    }

    setLoading(true);
    setShowResultText(false);
    setCopiedIndex(null);

    try {
      const response = await fetch('https://n8n.criartificial.com/webhook-test/9e16c197-c97d-43ed-a714-7b3d3377d7c4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, userId }), 
      });

      const result = await response.json();
      const titlesArray = result.title.split('<br>').map(title => title.trim());

      // Filtrar títulos que após a remoção de "1. ", "2. " resultam em comprimento maior que 0
      const filteredTitles = titlesArray
        .map(title => title.replace(/^\d+\.\s*/, '')) // Remove os números e espaços
        .filter(title => title.length > 0); // Filtra apenas os que têm comprimento maior que 0

      setGeneratedTitles(filteredTitles);

      setTimeout(() => {
        setShowResultText(true);
      }, 5000);

    } catch (error) {
      console.error('Erro ao gerar título:', error);
      setGeneratedTitles(['Ocorreu um erro ao gerar o título.']);
      setShowResultText(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setGeneratedTitles([]);
    setShowResultText(false);
    setCopiedIndex(null);
  };

  const handleWebhookTitleUpdate = (titlesString) => {
    const titlesArray = titlesString.split('<br>').map(title => title.trim());

    // Filtrar títulos que após a remoção de "1. ", "2. " resultam em comprimento maior que 0
    const filteredTitles = titlesArray
      .map(title => title.replace(/^\d+\.\s*/, ''))
      .filter(title => title.length > 0);

    setGeneratedTitles(filteredTitles);
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.geradorContainer}>
          <h1 className={styles.title}>Gerador de Títulos</h1>   
          <div className={styles.inputSection}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite os detalhes do seu produto..."
              className={styles.inputArea}
            ></textarea>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.generateButton} 
                onClick={handleGenerateTitle}
                disabled={loading}
              >
                {loading ? 'Gerando...' : 'Gerar'}
              </button>
              <button 
                className={styles.clearButton} 
                onClick={handleClear}
              >
                Limpar
              </button>
            </div>
          </div>

          {showResultText && (
            <div className={styles.resultSection}>
              {generatedTitles.map((title, index) => (
                <FunctionCopy 
                  key={index}
                  title={title}
                  onCopy={() => setCopiedIndex(index)}
                  copied={copiedIndex === index}
                />
              ))}
            </div>
          )}

          <WebhookResultComponent 
            apiUrl="https://guiaseller-backend.dlmi5z.easypanel.host" 
            userId={userId} 
            onWebhookTitleUpdate={handleWebhookTitleUpdate} 
          />

        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default GeradorTitulos;
