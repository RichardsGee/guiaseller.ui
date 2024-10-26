// ToolsData.js
import precificadorImage from '../../assets/tools/calculator.png';
import consultorLucroImage from '../../assets/tools/imagem.jpg';
import gestaoFinanceiraImage from '../../assets/tools/gestor.png';

export const ferramentasData = [
  {
    nome: 'Calculadora de Precificação',
    descricao: 'Calcule preços de forma rápida e fácil.',
    image: precificadorImage,
    custo: '1 Token (24h)',
    restante: '10 horas',
    route: '/calculadora-precificacao',
    categoria: 'Gestão',
    status: 'ativo', // Define o status como "ativo"
    isClickable: true
  },
  {
    nome: 'Consultor de Lucro',
    descricao: 'Avalie a lucratividade de seus produtos.',
    image: consultorLucroImage,
    custo: '1 Token (24h)',
    restante: '8 horas',
    route: '/tools/consultor-lucro',
    categoria: 'Gestão',
    status: 'emBreve', // Define o status como "desativado"
    isClickable: false
  },
  {
    nome: 'Gestão Financeira',
    descricao: 'Mantenha suas finanças em dia.',
    image: gestaoFinanceiraImage,
    custo: '1 Token (24h)',
    categoria: 'Gestão',
    status: 'emBreve', // Define o status como "em breve"
    isClickable: false
  }
];
