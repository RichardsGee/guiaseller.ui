// /components/CompanySettings.jsx
import React from 'react';
import styles from './settingsPage.module.css';

const CompanySettings = ({ companyName, setCompanyName, cnpj, setCnpj, fantasyName, setFantasyName, taxRate, setTaxRate, isEditing, handleEditClick, handleSave, isFieldEmpty }) => {
  return (
    <div className={styles.settingsColumn}>
      <h2 className={styles.sectionTitle}>Configurações da Empresa</h2>
      <button 
        className={styles.editButton} 
        onClick={handleEditClick}
      >
        {isEditing ? 'Cancelar' : 'Editar'}
      </button>

      <div className={styles.settingsContainer}>
        <div className={styles.settingItem}>
          <label>Nome da Empresa:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(companyName) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>CNPJ:</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(cnpj) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>Nome Fantasia:</label>
          <input
            type="text"
            value={fantasyName}
            onChange={(e) => setFantasyName(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(fantasyName) && <span className={styles.fieldAlert}>⚠️</span>}
        </div>

        <div className={styles.settingItem}>
          <label>Taxa de Imposto Paga Atualmente:</label>
          <input
            type="text"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className={`${styles.inputField} ${isEditing ? styles.editing : ''}`}
            disabled={!isEditing}
          />
          {isFieldEmpty(taxRate) && <span className={styles.fieldAlert}>⚠️</span>}
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

export default CompanySettings;