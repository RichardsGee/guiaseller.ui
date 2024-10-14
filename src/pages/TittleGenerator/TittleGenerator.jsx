import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import WebhookResultComponent from '../../components/WebhookResultComponent'; // Importando o componente do Webhook
import styles from './TittleGenerator.module.css'; 

const GeradorTitulos = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userId = user ? user.uid : null; // Pegando o userId do usuário

  const [inputText, setInputText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [webhookTitle, setWebhookTitle] = useState(''); // Novo estado para armazenar o título recebido via webhook

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
        body: JSON.stringify({ inputText, userId }), // Enviando o userId junto com o inputText
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

  // Função de callback para receber o título do webhook vindo do componente WebhookResultComponent
  const handleWebhookTitleUpdate = (title) => {
    setWebhookTitle(title); // Armazena o título vindo do webhook no estado
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
            Insira os detalhes do seu produto e gere títulos de alta conversão.
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

          {/* Exibir o título gerado pelo processo */}
          <div className={styles.resultSection}>
            <p className={styles.resultText}>{generatedTitle}</p>
          </div>

          {/* Exibir o título recebido pelo webhook */}
          <div className={styles.webhookResult}>
            <h2>Título Recebido via Webhook:</h2>
            <textarea 
              value={webhookTitle} 
              readOnly 
              className={styles.webhookInput} 
              rows={4} 
              cols={50} 
            />
          </div>

          {/* Exibindo o resultado do webhook vindo do backend */}
          <WebhookResultComponent 
            apiUrl="https://guiaseller-backend.dlmi5z.easypanel.host" 
            userId={userId} 
            onWebhookTitleUpdate={handleWebhookTitleUpdate} // Passando a função para receber o título do webhook
          />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default GeradorTitulos;
