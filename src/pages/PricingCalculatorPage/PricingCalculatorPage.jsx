import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent';  
import { AuthContext } from '../../context/AuthContext';  
import styles from './pricingCalculator.module.css'; 
import '../../styles/styles.css'; 

const TAXAS = {
  Premium: 0.16, // 16%
  Classico: 0.11 // 11%
};

const PricingCalculatorPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [custo, setCusto] = useState('');
  const [lucroPercent, setLucroPercent] = useState('');
  const [impostoPercent, setImpostoPercent] = useState('');
  const [proLabore, setProLabore] = useState('');
  const [custosAdicionais, setCustosAdicionais] = useState('');
  const [frete, setFrete] = useState('');
  const [planoML, setPlanoML] = useState("Premium");

  const taxaML = TAXAS[planoML];

  const calcularPrecoVenda = () => {
    const custoBase = parseFloat(custo) || 0;
    const taxaFixa = custoBase > 79 ? 0 : 6; 
    const totalBase = custoBase + taxaFixa;
  
    const somaPorcentagens = (parseFloat(lucroPercent) || 0) + 
                             (parseFloat(impostoPercent) || 0) + 
                             (taxaML * 100); 
  
    const precoFinal = totalBase / (1 - (somaPorcentagens / 100));
  
    return { precoFinal: precoFinal.toFixed(2), taxaFixa };
  };
  
  const { precoFinal, taxaFixa } = calcularPrecoVenda();

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className={styles.title}>Calculadora de Precificação</h1>

          <div className={styles.calculatorContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Custo</label>
                <div className={styles.inlineItem}>
                  <input
                    type="number"
                    className={`${styles.inputField} ${styles.smallInput}`}
                    placeholder="Custo"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                  />
                  <span className={styles.currencySymbol}>R$</span>
                </div>
                <small className={styles.inputExplanation}>Preço base do produto.</small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Lucro (%)</label>
                <div className={styles.inlineItem}>
                  <input
                    type="number"
                    className={`${styles.inputField} ${styles.smallInput}`}
                    placeholder="Lucro (%)"
                    value={lucroPercent}
                    onChange={(e) => setLucroPercent(e.target.value)}
                  />
                  <span className={styles.percentageSymbol}>%</span>
                </div>
                <small className={styles.inputExplanation}>Percentual de lucro desejado.</small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Imposto (%)</label>
                <div className={styles.inlineItem}>
                  <input
                    type="number"
                    className={`${styles.inputField} ${styles.smallInput}`}
                    placeholder="Imposto (%)"
                    value={impostoPercent}
                    onChange={(e) => setImpostoPercent(e.target.value)}
                  />
                  <span className={styles.percentageSymbol}>%</span>
                </div>
                <small className={styles.inputExplanation}>Percentual de imposto aplicável.</small>
              </div>

              <div className={styles.adicional}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pró-labore</label>
                  <div className={styles.inlineItem}>
                    <input
                      type="number"
                      className={`${styles.inputField} ${styles.smallInput}`}
                      placeholder="Pró-labore"
                      value={proLabore}
                      onChange={(e) => setProLabore(e.target.value)}
                    />
                    <span className={styles.currencySymbol}>R$</span>
                  </div>
                  <small className={styles.inputExplanation}>Salário pago a administradores.</small>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Custos Adicionais</label>
                  <div className={styles.inlineItem}>
                    <input
                      type="number"
                      className={`${styles.inputField} ${styles.smallInput}`}
                      placeholder="Custos Adicionais"
                      value={custosAdicionais}
                      onChange={(e) => setCustosAdicionais(e.target.value)}
                    />
                    <span className={styles.currencySymbol}>R$</span>
                  </div>
                  <small className={styles.inputExplanation}>Custos extras envolvidos.</small>
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Plano Mercado Livre</label>
                <select
                  className={`${styles.inputField} ${styles.selectField}`} // Aplica appearance: none apenas neste select
                  value={planoML}
                  onChange={(e) => setPlanoML(e.target.value)}
                >
                  <option value="Premium">Premium</option>
                  <option value="Classico">Clássico</option>
                </select>
                <small className={styles.inputExplanation}>Plano selecionado na plataforma.</small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Frete</label>
                <div className={styles.inlineItem}>
                  <input
                    type="number"
                    className={`${styles.inputField} ${styles.smallInput} ${precoFinal > 79 && !frete ? styles.errorBorder : ''}`}
                    placeholder="Frete"
                    value={frete}
                    onChange={(e) => setFrete(e.target.value)}
                  />
                  <span className={styles.currencySymbol}>R$</span>
                </div>
                <small className={styles.inputExplanation}>Custo estimado do frete.</small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Taxa Fixa</label>
                <div className={styles.inlineItem}>
                  <input
                    type="text"
                    className={`${styles.inputField} ${styles.smallInput}`}
                    value={taxaFixa === 0 ? "Sem Custo Fixo" : `R$ ${taxaFixa.toFixed(2)}`}
                    readOnly
                  />
                </div>
                <small className={styles.inputExplanation}>Taxa fixa para valores baixos.</small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Taxa Aplicada</label>
                <div className={styles.inlineItem}>
                  <input
                    type="text"
                    className={`${styles.inputField} ${styles.smallInput}`}
                    value={`${(taxaML * 100).toFixed(2)}%`}
                    readOnly
                  />
                </div>
                <small className={styles.inputExplanation}>Taxa do plano selecionado.</small>
              </div>
            </div>
          </div>

          <div className={styles.resultContainer}>
            <p><strong>Preço de Venda:</strong> R$ {precoFinal}</p>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default PricingCalculatorPage;
