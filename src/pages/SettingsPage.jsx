import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/settingsPage.module.css';

function SettingsPage() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userLevel = "Admin"; // Exemplo de nível do usuário

  // Estados de edição de dados pessoais e da empresa
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('Minha Empresa Ltda');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [fantasyName, setFantasyName] = useState('Empresa Fantasia');
  const [taxRate, setTaxRate] = useState('15%');

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />

      <div className="main-content">
        <TopBar userPhoto={userPhoto} />

        <div className={styles.configContent}>
          <h1 className={styles.mainTitle}>Configurações</h1>
          
          {/* Organizando as seções lado a lado */}
          <div className={styles.settingsGrid}>

            {/* Coluna de Configurações da Conta */}
            <div className={styles.settingsColumn}>
              <h2 className={styles.sectionTitle}>Configurações da Conta</h2>
              <button className={styles.editButton}>Editar</button> {/* Botão de Editar no topo direito */}
              <div className={styles.settingsContainer}>
                <div className={styles.settingItem}>
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Celular:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.inputField}
                    placeholder="(xx) xxxx-xxxx"
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Nível do Usuário:</label>
                  <input
                    type="text"
                    value={userLevel}
                    readOnly
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>

            {/* Coluna de Configurações da Empresa */}
            <div className={styles.settingsColumn}>
              <h2 className={styles.sectionTitle}>Configurações da Empresa</h2>
              <button className={styles.editButton}>Editar</button> {/* Botão de Editar no topo direito */}
              <div className={styles.settingsContainer}>
                <div className={styles.settingItem}>
                  <label>Nome da Empresa:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>CNPJ:</label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Nome Fantasia:</label>
                  <input
                    type="text"
                    value={fantasyName}
                    onChange={(e) => setFantasyName(e.target.value)}
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Taxa de Imposto Paga Atualmente:</label>
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
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default SettingsPage;
