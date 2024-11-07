import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import '@n8n/chat/style.css'; // Estilos do widget de chat do N8N
import { createChat } from '@n8n/chat'; // Importando createChat para inicializar o chat
import '../../styles/styles.css'; // Importando estilos globais (onde está o contentContainer)

const ChatPage = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.criartificial.com/webhook/370ed33e-aab7-49f5-8e17-932b1d224a95/chat', // URL do webhook do N8N
      mode: 'fullscreen', // O chat ocupará o tamanho do contêiner definido
      showWelcomeScreen: true,
      initialMessages: [
        'Olá! 👋',
        'Como posso ajudar você hoje?'
      ],
      i18n: {
        en: {
          title: 'Bem-vindo!',
          subtitle: 'Inicie uma conversa. Estamos aqui para ajudar!',
          inputPlaceholder: 'Digite sua pergunta...',
          getStarted: 'Nova Conversa'
        }
      },
    });
  }, []);

  return (
    <MainContent>
      <Header />
      <Sidebar />
      <div className="main-content">
        <style>
          {`
            :root {
              /* Cores principais */
              --chat--color-primary: var(--primary-color);
              --chat--color-secondary: var(--secondary-color);
              --chat--color-white: #ffffff;
              --chat--color-light: var(--background-color);
              --chat--color-dark: var(--text-color);

              /* Estilo de espaçamento e borda */
              --chat--spacing: 1rem;
              --chat--border-radius: 8px;
              --chat--transition-duration: 0.3s;

              /* Cabeçalho */
              --chat--header--background: var(--primary-color);
              --chat--header--color: var(--background-color);
              --chat--heading--font-size: 1.2em;
              --chat--subtitle--font-size: 1rem;
              --chat--subtitle--line-height: 1.5;

              /* Estilos de mensagem */
              --chat--message--bot--background: var(--background-color);
              --chat--message--bot--color: var(--text-color);
              --chat--message--user--background: var(--secondary-color);
              --chat--message--user--color: white;
            }

            /* Contêiner centralizado para o chat */
            .chat-container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 1200px; /* Ajuste a largura conforme necessário */
              height: 800px; /* Ajuste a altura conforme necessário */
              border-radius: 8px;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              background-color: var(--background-color); /* Fundo para combinar com o tema */
            }
          `}
        </style>
        <div className="contentContainer">
          <div className="chat-container" id="n8n-chat"></div> {/* Chat renderizado no contêiner */}
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default ChatPage;
