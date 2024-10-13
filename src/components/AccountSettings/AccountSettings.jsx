import React from 'react';
import styles from './accountsSettings.module.css';

const AccountSettings = ({ name, setName, email, setEmail, phone, setPhone, userLevel, isEditing, handleEditClick, handleSave, isFieldEmpty }) => {
  // Adicionando log para verificar o valor do userLevel
  console.log("Account Settings User Level:", userLevel);

  return (
    <div className={styles.settingsColumn}>
      <h2 className={styles.sectionTitle}>Configurações da Conta</h2>
      <button 
        className={styles.editButton} 
        onClick={handleEditClick}
      >
        {isEditing ? 'Cancelar' : 'Editar'}
      </button>

      <div className={styles.settingsContainer}>
        <div className={styles.settingItem}>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(name) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(email) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>Celular:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
            placeholder="(xx) xxxx-xxxx"
          />
          {isFieldEmpty(phone) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>Nível do Usuário:</label>
          <input
            type="text"
            value={userLevel} // Valor vindo do banco de dados
            readOnly // Campo somente leitura
            className={styles.inputField} // Classe para estilização
          />
        </div>

        {/* Exibir o botão de salvar se estiver em modo de edição */}
        {isEditing && (
          <button className={styles.saveButton} onClick={handleSave}>
            Salvar
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
