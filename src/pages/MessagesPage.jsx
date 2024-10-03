import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/messages.module.css'; // Certifique-se de criar o arquivo CSS
import filterStyles from '../styles/messagesfilter.module.css'; // Importando o novo CSS do filtro

const MessagesPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Exemplo de dados de mensagens
    const exampleMessages = [
      {
        id: 1,
        sender: 'Mercado Livre',
        subject: 'Seu produto foi enviado',
        content: 'O produto foi enviado com sucesso!',
        date: '02/10/2024',
        isRead: false
      },
      {
        id: 2,
        sender: 'Magalu',
        subject: 'Promoção de Fim de Ano',
        content: 'Aproveite as promoções de fim de ano em nossos produtos!',
        date: '01/10/2024',
        isRead: true
      },
      {
        id: 3,
        sender: 'Kwai',
        subject: 'Atualização de Vendas',
        content: 'Confira suas vendas recentes no Kwai.',
        date: '28/09/2024',
        isRead: false
      }
    ];
    setMessages(exampleMessages);
  }, []);

  // Função para contar as mensagens lidas e não lidas
  const totalMessages = messages.length;
  const readMessages = messages.filter(message => message.isRead).length;

  return (
    <div className="container">
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />

        <div className={styles.messagesContainer}>
          <h1 className={styles.title}>Minhas Mensagens</h1>

          {/* Contador de mensagens lidas e não lidas, abaixo do título */}
          <div className={filterStyles.filterWrapper}>
            <div className={filterStyles.filterSection}>
              <p><strong>Total de Mensagens:</strong> {totalMessages}</p>
              <p><strong>Mensagens Lidas:</strong> {readMessages}</p>
            </div>
          </div>

          <ul className={styles.messageList}>
            {messages.map(message => (
              <li key={message.id} className={`${styles.messageItem} ${message.isRead ? styles.read : styles.unread}`}>
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageSender}>{message.sender}</h3>
                  <p className={styles.messageDate}>{message.date}</p>
                </div>
                <h4 className={styles.messageSubject}>{message.subject}</h4>
                <p className={styles.messageContent}>{message.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessagesPage;