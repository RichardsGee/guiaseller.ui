import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import styles from './SettingsPage.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaBuilding } from 'react-icons/fa'; // Ícones de perfil e empresa

function SettingsPage() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : 'No User Logged';
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userId = user ? user.uid : null;

  // Estados para os dados
  const [first_name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [additionalCost, setAdditionalCost] = useState(''); // Campo adicional
  const [userLevel, setUserLevel] = useState('');

  // Estados de edição
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Sidebar state para alternar entre seções
  const [activeSection, setActiveSection] = useState('profile');

  // Funções para controle de edição e salvamento
  const handleSaveProfile = async () => {
    await updateUserData();
    setIsEditingProfile(false); // Desativa o modo de edição após salvar
  };

  const handleSaveCompany = async () => {
    await updateCompanyData();
    setIsEditingCompany(false); // Desativa o modo de edição após salvar
  };

  const isFieldEmpty = (field) => field === '';

  // Função para buscar detalhes do usuário
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      const userData = response.data;
      setName(userData.first_name || '');
      setPhone(userData.phone || '');
      setUserLevel(userData.user_level || '');
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Função para buscar detalhes da empresa
  const getCompanyDetails = async () => {
    try {
      const responseUser = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      const company_id = responseUser.data.companies[0].company_id;
      const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${company_id}`);
      const companyData = response.data;
      setCompanyName(companyData.company_name || '');
      setCnpj(companyData.cnpj || '');
      setFantasyName(companyData.fantasy_name || '');
      setTaxRate(companyData.tax_rate || '');
      setAdditionalCost(companyData.additional_cost || ''); // Campo adicional
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  // Função para atualizar dados do usuário
  const updateUserData = async () => {
    try {
      await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`, {
        first_name,
        email,
        phone,
        user_level: userLevel,
      });
      toast.success('Dados do usuário atualizados com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar os dados do usuário!');
      console.error('Error updating user data:', error);
    }
  };

  // Função para atualizar dados da empresa
  const updateCompanyData = async () => {
    try {
      const responseUser = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      const company_id = responseUser.data.companies[0].company_id;
      await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${company_id}`, {
        company_name: companyName,
        fantasy_name: fantasyName,
        cnpj,
        tax_rate: parseFloat(taxRate),
        additional_cost: parseFloat(additionalCost), // Salvando o campo adicional
      });
      toast.success('Dados da empresa atualizados com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar os dados da empresa!');
      console.error('Error updating company data:', error);
    }
  };

  // Carrega os dados iniciais do usuário e da empresa ao montar o componente
  useEffect(() => {
    if (userId) {
      getUserDetails();
      getCompanyDetails();
    }
  }, [userId]);

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="contentContainer">
        <div className={styles.settingsContainer}>
          <div className={styles.sidebarSettings}>
            <div className={`${styles.sidebarItem} ${activeSection === 'profile' ? styles.active : ''}`} onClick={() => setActiveSection('profile')}>
              <FaUser className={styles.icon} /> Perfil
            </div>
            <div className={`${styles.sidebarItem} ${activeSection === 'company' ? styles.active : ''}`} onClick={() => setActiveSection('company')}>
              <FaBuilding className={styles.icon} /> Empresa
            </div>
          </div>

          <div className={styles.contentArea}>
            {activeSection === 'profile' && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Configurações de Perfil</h2>
                  <button className={styles.editButton} onClick={() => setIsEditingProfile(true)}>Editar</button>
                </div>
                <div className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nome</label>
                    <input type="text" className={styles.inputField} value={first_name} onChange={(e) => setName(e.target.value)} disabled={!isEditingProfile} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input type="email" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditingProfile} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Telefone</label>
                    <input type="text" className={styles.inputField} value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditingProfile} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nível do Usuário</label>
                    <input type="text" className={styles.inputField} value={userLevel} onChange={(e) => setUserLevel(e.target.value)} disabled={!isEditingProfile} />
                  </div>
                </div>
                {isEditingProfile && <button className={styles.saveButton} onClick={handleSaveProfile}>Salvar Alterações</button>}
              </>
            )}

            {activeSection === 'company' && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Configurações da Empresa</h2>
                  <button className={styles.editButton} onClick={() => setIsEditingCompany(true)}>Editar</button>
                </div>
                <div className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nome da Empresa</label>
                    <input type="text" className={styles.inputField} value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={!isEditingCompany} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>CNPJ</label>
                    <input type="text" className={styles.inputField} value={cnpj} onChange={(e) => setCnpj(e.target.value)} disabled={!isEditingCompany} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nome Fantasia</label>
                    <input type="text" className={styles.inputField} value={fantasyName} onChange={(e) => setFantasyName(e.target.value)} disabled={!isEditingCompany} />
                  </div>
                  <div className={styles.inlineFormGroup}>
                    <div className={styles.inlineItem}>
                      <label className={styles.label}>Taxa de Impostos</label>
                      <input type="text" className={styles.inputField} value={taxRate} onChange={(e) => setTaxRate(e.target.value)} disabled={!isEditingCompany} />
                    </div>
                    <div className={styles.inlineItem}>
                      <label className={styles.label}>Custo Adicional</label>
                      <input type="text" className={styles.inputField} value={additionalCost} onChange={(e) => setAdditionalCost(e.target.value)} disabled={!isEditingCompany} />
                    </div>
                  </div>
                </div>
                {isEditingCompany && <button className={styles.saveButton} onClick={handleSaveCompany}>Salvar Alterações</button>}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default SettingsPage;
