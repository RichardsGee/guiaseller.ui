import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import WebhookResultComponent from '../../components/WebhookResultComponent';
import FunctionCopy from '../../components/FunctionCopy/FunctionCopy'; // Importando o componente de cópia
import CopyAllIcon from '@mui/icons-material/CopyAll'; // Ícone de copiar
import styles from './TittleGenerator.module.css'; 
import '../../styles/styles.css'; // Importando o CSS global onde está o contentContainer

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
  const [newInputText, setNewInputText] = useState(''); // Novo estado para o novo input
  const [copyStatus, setCopyStatus] = useState(''); // Novo estado para o status de cópia

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

      const filteredTitles = titlesArray
        .map(title => title.replace(/^\d+\.\s*/, '')) // Remove os números e espaços
        .filter(title => title.length > 0); // Filtra apenas os que têm comprimento maior que 0

      setGeneratedTitles(filteredTitles);

      setTimeout(() => {
        setShowResultText(true);
      }, 5000);

    } catch (error) {
      console.error('Erro ao gerar título:', error);
      setGeneratedTitles([]);
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
    setNewInputText(''); // Limpar o novo input
    setCopyStatus(''); // Limpar o status de cópia
  };

  const handleWebhookTitleUpdate = (titlesString) => {
    const titlesArray = titlesString.split('<br>').map(title => title.trim());

    const filteredTitles = titlesArray
      .map(title => title.replace(/^\d+\.\s*/, ''))
      .filter(title => title.length > 0);

    setGeneratedTitles(filteredTitles);
  };

  // Função para gerenciar a entrada do novo input
  const handleNewInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 60) {
      setNewInputText(value);
    }
  };

  // Função para copiar o texto do input para a área de transferência
  const copyToClipboard = () => {
    navigator.clipboard.writeText(newInputText)
      .then(() => {
        setCopyStatus('✅ Copiado!'); // Atualiza o status para "Copiado"
        setTimeout(() => setCopyStatus(''), 2000); // Limpa o status após 2 segundos
      })
      .catch(err => console.error('Erro ao copiar o texto: ', err));
  };

  // Função para copiar o título clicado para o input
  const handleTitleClick = (title) => {
    setNewInputText(title); // Atualiza o estado do input com o título clicado
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        
        <div className="contentContainer">
          <h1 className="title">Gerador de Títulos</h1>   
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
                  onTitleClick={handleTitleClick} // Passando a função para clicar no título
                />
              ))}
            </div>
          )}

          {/* Novo container e input abaixo dos resultados dos títulos */}
          <div className={styles.newInputContainer}>
            <span className={styles.characterCount}>{newInputText.length}/60</span> {/* Contagem de caracteres */}
            <input
              type="text"
              value={newInputText}
              onChange={handleNewInputChange}
              placeholder="Edite o título manualmente..."
              className={styles.newInput} // Borda verde fixa
            />
            <div onClick={copyToClipboard} className={styles.copyButton} title="Copiar">
              <CopyAllIcon style={{ color: 'white' }} /> {/* Ícone de copiar em branco */}
              {copyStatus && <span>{copyStatus}</span>} {/* Exibe o status de cópia */}
            </div>
          </div>

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
