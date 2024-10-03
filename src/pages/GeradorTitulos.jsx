import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import WebhookResultComponent from '../components/WebhookResultComponent'; // Importando o novo componente
import styles from '../styles/geradorTitulos.module.css'; 

const GeradorTitulos = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [inputText, setInputText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateTitle = async () => {
    if (!inputText) {
      alert("Digite os detalhes do seu produto!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://n8n.criartificial.com/webhook-test/9e16c197-c97d-43ed-a714-7b3d3377d7c4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      const result = await response.json();
      setGeneratedTitle(result.title || 'Título gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar título:', error);
      setGeneratedTitle('Ocorreu um erro ao gerar o título.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.geradorContainer}>
          <h1 className={styles.title}>Gerador de Títulos</h1>
          <p className={styles.description}>
            Bem-vindo ao Gerador de Títulos! Insira os detalhes do seu produto e gere títulos de alta conversão.
          </p>
          
          <div className={styles.inputSection}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite os detalhes do seu produto..."
              className={styles.inputArea}
            ></textarea>
            <button 
              className={styles.generateButton} 
              onClick={handleGenerateTitle}
              disabled={loading}
            >
              {loading ? 'Gerando...' : 'Gerar Título'}
            </button>
          </div>

          <div className={styles.resultSection}>
            
            <p className={styles.resultText}>{generatedTitle}</p>
          </div>

          {/* Componente WebhookResultComponent exibindo o resultado do webhook */}
          <WebhookResultComponent webhookUrl="https://webhook.site/f5edbe5a-e407-488e-8b1e-57b4fbfcbfe9" />

        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default GeradorTitulos;
