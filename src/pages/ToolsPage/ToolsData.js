// ToolsData.js
import precificadorImage from '../../assets/tools/calculator.png'; // Substitua pela imagem real
import consultorLucroImage from '../../assets/tools/imagem.jpg'; // Substitua pela imagem real
import gestaoFinanceiraImage from '../../assets/tools/imagem.jpg'; // Substitua pela imagem real

export const ferramentasData = [
  {
    nome: 'Calculadora de Precificação',
    descricao: 'Calcule preços de forma rápida e fácil.',
    image: precificadorImage, // Imagem do precificador
    ativo: true,
    custo: '1 Token (24h)',
    restante: '10 horas',
    route: '/calculadora-precificacao',
    categoria: 'Gestão'
  },
  {
    nome: 'Consultor de Lucro',
    descricao: 'Avalie a lucratividade de seus produtos.',
    image: consultorLucroImage, // Imagem do consultor de lucro
    ativo: true,
    custo: '1 Token (24h)',
    restante: '8 horas',
    route: '/tools/consultor-lucro',
    categoria: 'Gestão'
  },
  {
    nome: 'Gestão Financeira',
    descricao: 'Mantenha suas finanças em dia.',
    image: gestaoFinanceiraImage, // Imagem da gestão financeira
    ativo: false,
    custo: '1 Token (24h)',
    categoria: 'Gestão'
  }
];
