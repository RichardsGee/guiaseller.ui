import React, { useState } from 'react'; // Importando o useState junto com o React
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent'; 
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import styles from '../styles/settingsPage.module.css';

function SettingsPage() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userLevel = "Chief AI Officer"; // Exemplo de nível do usuário

  // Estados de edição de dados pessoais e da empresa
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('Minha Empresa Ltda');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [fantasyName, setFantasyName] = useState('Empresa Fantasia');
  const [taxRate, setTaxRate] = useState('15%');

  return (
    <MainContent> {/* MainContent deve envolver todo o conteúdo */}
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content"> {/* Certifique-se de que o container principal tem a classe main-content */}
        <div className={styles.configContent}>
          <h1>Configurações</h1>
          <p>Aqui você pode ajustar as suas configurações de perfil e preferências.</p>

          {/* Configurações da Conta */}
          <h2>Configurações da Conta</h2>
          <div className={styles.settingsContainer}>
            <div className={styles.settingItem}>
              <span>Nome:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.settingItem}>
              <span>Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.settingItem}>
              <span>Celular:</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.inputField}
                placeholder="(xx) xxxx-xxxx"
              />
            </div>

            <div className={styles.settingItem}>
              <span>Nível do Usuário:</span>
              <input
                type="text"
                value={userLevel}
                readOnly
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Configurações da Empresa */}
          <h2>Configurações da Empresa</h2>
          <div className={styles.settingsContainer}>
            <div className={styles.settingItem}>
              <span>Nome da Empresa:</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.settingItem}>
              <span>CNPJ:</span>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.settingItem}>
              <span>Nome Fantasia:</span>
              <input
                type="text"
                value={fantasyName}
                onChange={(e) => setFantasyName(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.settingItem}>
              <span>Taxa de Imposto Paga Atualmente:</span>
              <input
                type="text"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className={styles.inputField}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default SettingsPage;
