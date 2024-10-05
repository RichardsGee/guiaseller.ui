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

  // Estados para os dados exibidos
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('Minha Empresa Ltda');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [fantasyName, setFantasyName] = useState('Empresa Fantasia');
  const [taxRate, setTaxRate] = useState('15%');

  // Estados para armazenar os valores originais antes da edição
  const [originalName, setOriginalName] = useState(name);
  const [originalEmail, setOriginalEmail] = useState(email);
  const [originalPhone, setOriginalPhone] = useState(phone);
  const [originalCompanyName, setOriginalCompanyName] = useState(companyName);
  const [originalCnpj, setOriginalCnpj] = useState(cnpj);
  const [originalFantasyName, setOriginalFantasyName] = useState(fantasyName);
  const [originalTaxRate, setOriginalTaxRate] = useState(taxRate);

  // Estados para controlar se o usuário está no modo de edição
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Função para alternar entre os modos de edição
  const handleEditClick = (section) => {
    if (section === 'account') {
      if (!isEditingAccount) {
        // Entrando no modo de edição: armazenar os valores originais
        setOriginalName(name);
        setOriginalEmail(email);
        setOriginalPhone(phone);
      } else {
        // Se cancelar: restaurar os valores originais
        setName(originalName);
        setEmail(originalEmail);
        setPhone(originalPhone);
      }
      setIsEditingAccount(!isEditingAccount);
    } else if (section === 'company') {
      if (!isEditingCompany) {
        // Entrando no modo de edição: armazenar os valores originais
        setOriginalCompanyName(companyName);
        setOriginalCnpj(cnpj);
        setOriginalFantasyName(fantasyName);
        setOriginalTaxRate(taxRate);
      } else {
        // Se cancelar: restaurar os valores originais
        setCompanyName(originalCompanyName);
        setCnpj(originalCnpj);
        setFantasyName(originalFantasyName);
        setTaxRate(originalTaxRate);
      }
      setIsEditingCompany(!isEditingCompany);
    }
  };

  // Função para salvar os dados
  const handleSave = () => {
    // Dados são salvos e o modo de edição é desativado
    setIsEditingAccount(false);
    setIsEditingCompany(false);
    alert("Dados salvos com sucesso!"); // Apenas uma demonstração de feedback
  };

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
              <button 
                className={styles.editButton} 
                onClick={() => handleEditClick('account')}
              >
                {isEditingAccount ? 'Cancelar' : 'Editar'}
              </button>

              <div className={styles.settingsContainer}>
                <div className={styles.settingItem}>
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${styles.inputField} ${isEditingAccount ? styles.editing : ''}`}
                    disabled={!isEditingAccount}  // Desabilita o campo se não estiver editando
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.inputField} ${isEditingAccount ? styles.editing : ''}`}
                    disabled={!isEditingAccount}  // Desabilita o campo se não estiver editando
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Celular:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${styles.inputField} ${isEditingAccount ? styles.editing : ''}`}
                    placeholder="(xx) xxxx-xxxx"
                    disabled={!isEditingAccount}  // Desabilita o campo se não estiver editando
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

                {/* Mostrar o botão de salvar apenas quando estiver editando */}
                {isEditingAccount && (
                  <button className={styles.saveButton} onClick={handleSave}>
                    Salvar
                  </button>
                )}
              </div>
            </div>

            {/* Coluna de Configurações da Empresa */}
            <div className={styles.settingsColumn}>
              <h2 className={styles.sectionTitle}>Configurações da Empresa</h2>
              <button 
                className={styles.editButton} 
                onClick={() => handleEditClick('company')}
              >
                {isEditingCompany ? 'Cancelar' : 'Editar'}
              </button>

              <div className={styles.settingsContainer}>
                <div className={styles.settingItem}>
                  <label>Nome da Empresa:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`${styles.inputField} ${isEditingCompany ? styles.editing : ''}`}
                    disabled={!isEditingCompany}  // Desabilita o campo se não estiver editando
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>CNPJ:</label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className={`${styles.inputField} ${isEditingCompany ? styles.editing : ''}`}
                    disabled={!isEditingCompany}  // Desabilita o campo se não estiver editando
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Nome Fantasia:</label>
                  <input
                    type="text"
                    value={fantasyName}
                    onChange={(e) => setFantasyName(e.target.value)}
                    className={`${styles.inputField} ${isEditingCompany ? styles.editing : ''}`}
                    disabled={!isEditingCompany}  // Desabilita o campo se não estiver editando
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Taxa de Imposto Paga Atualmente:</label>
                  <input
                    type="text"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className={`${styles.inputField} ${isEditingCompany ? styles.editing : ''}`}
                    disabled={!isEditingCompany}  // Desabilita o campo se não estiver editando
                  />
                </div>

                {/* Mostrar o botão de salvar apenas quando estiver editando */}
                {isEditingCompany && (
                  <button className={styles.saveButton} onClick={handleSave}>
                    Salvar
                  </button>
                )}
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
