import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './SubscriptionModal.module.css'; // Estilos específicos para o modal
import { AuthContext } from '../../context/AuthContext'; // Importando o contexto de autenticação

const SubscriptionModal = ({ isOpen, closeModal, plan, cycle, cycleOptions }) => {
  const { user } = useContext(AuthContext);  // Pegando o user do contexto
  const [billingType, setBillingType] = useState('PIX');
  const [description, setDescription] = useState('');
  const [customer, setCustomer] = useState(''); // Estado para armazenar o customerId
  const [value, setValue] = useState(0);
  const [name, setName] = useState('');  // Novo estado para o Nome
  const [phone, setPhone] = useState('');  // Novo estado para o Celular
  const [personType, setPersonType] = useState('FISICA');  // Tipo de pessoa (Física ou Jurídica)
  const [document, setDocument] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);  // Para controlar se o usuário precisa atualizar os dados

  useEffect(() => {
    // Limpar o customerId do localStorage ao sair da página
    return () => {
      localStorage.removeItem('customerId');
      console.log('customerId removido do localStorage');
    };
  }, []); // O useEffect será chamado apenas quando o componente for desmontado

  useEffect(() => {
    if (plan) {
      setDescription(`${plan.name} Assinatura`);
      setValue(plan.value); // Atualiza o valor com o valor do plano
    }
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Ex: "2024-11-22"
    setNextDueDate(formattedDate); // Definindo a data de vencimento para o dia de hoje

    // Verificando se o customerId está armazenado no localStorage
    const storedCustomerId = localStorage.getItem('customerId');
    
    if (storedCustomerId) {
      // Se já existe, preenche diretamente o estado
      setCustomer(storedCustomerId);
      console.log('customerId recuperado do localStorage:', storedCustomerId);
    } else if (user?.uid) {
      // Se não estiver armazenado, faz a requisição para buscar o customerId
      fetchCustomerId();
    }

  }, [plan, user?.uid]); // O useEffect depende de `plan` e `user?.uid`

  const fetchCustomerId = async () => {
    try {
      if (user?.uid) {
        console.log("userId enviado para a requisição:", user.uid); // Log do userId

        // Requisição para a API com o customerId
        const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${user.uid}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("Resposta da API:", response.data);

        // Verificando se o usuário tem o customerId (ID do cliente)
        if (response.data?.customerId) {
          setCustomer(response.data.customerId); // Preenche o estado com o customerId
          localStorage.setItem('customerId', response.data.customerId); // Armazena o customerId no localStorage
          console.log("customerId encontrado e salvo no localStorage:", response.data.customerId); // Log do customerId
        } else {
          // Se não tiver customerId, o usuário precisa preencher os dados
          setIsUpdating(true); // Muda para a tela de atualizar cadastro
        }
      }
    } catch (error) {
      console.error("Erro ao buscar o customerId:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subscriptionData = {
      billingType,
      cycle,
      customer,
      value,
      nextDueDate,
      personType,
      document,
      name,
      phone,  // Adicionando nome e telefone aos dados da assinatura
    };

    try {
      // Simula o envio dos dados para a API (substitua com a lógica real)
      console.log('Enviando dados de assinatura', subscriptionData);
      alert('Assinatura realizada com sucesso!');
      closeModal();
    } catch (error) {
      alert('Erro ao processar a assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      name,
      phone,
      document,
      personType,
    };

    try {
      // Aqui você pode enviar os dados para a API para atualizar o cadastro
      console.log('Atualizando dados do usuário', updatedData);

      // Simula a resposta da API (depois de atualizar)
      localStorage.setItem('customerId', 'NEW_CUSTOMER_ID'); // Simula o preenchimento do customerId após atualização

      setCustomer('NEW_CUSTOMER_ID'); // Preenche o estado do customerId com o novo ID
      setIsUpdating(false); // Fechar a tela de atualização
      alert('Cadastro atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar o cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !plan) return null;

  // Traduzindo os ciclos para português
  const cycleLabels = {
    'MONTHLY': 'Mensal',
    'QUARTERLY': 'Trimestral',
    'SEMIANNUAL': 'Semestral',
    'ANNUAL': 'Anual',
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        
        {/* Exibindo o nome da assinatura e o valor */}
        <h2>{`${plan.name} - R$ ${value},00`}</h2> {/* Título com o nome do plano e preço */}
        
        {/* Exibindo a recorrência */}
        <h3>{cycleLabels[cycle] || cycle}</h3> {/* Exibindo a recorrência (ex: Mensal, Trimestral, Anual) */}
        
        {/* Exibindo a tela para atualizar cadastro, caso o customerId não exista */}
        {isUpdating ? (
          <form onSubmit={handleUpdateRegistration}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Celular</label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite seu celular"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="document">
                {personType === 'FISICA' ? 'CPF' : 'CNPJ'}
              </label>
              <input
                id="document"
                type="text"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder={personType === 'FISICA' ? 'Digite seu CPF' : 'Digite seu CNPJ'}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Processando...' : 'Atualizar Cadastro'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="customer">ID do Cliente</label>
              <input
                id="customer"
                type="text"
                value={customer}  // Exibe o ID do Cliente
                readOnly  // Torna o campo não editável
                className={styles.readOnlyInput} // Classe para estilizar o campo não editável
              />
            </div>

            {/* Tipo de faturamento */}
            <div className={styles.formGroup}>
              <label htmlFor="billingType">Escolha o Tipo de Faturamento</label>
              <select
                id="billingType"
                value={billingType}
                onChange={(e) => setBillingType(e.target.value)}
                required
              >
                <option value="PIX">PIX</option>
                <option value="BOLETO">Boleto</option>
                <option value="CREDIT_CARD">Cartão de Crédito</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Processando...' : 'Assinar Agora'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;