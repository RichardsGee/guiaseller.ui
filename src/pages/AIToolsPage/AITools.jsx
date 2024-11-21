import geradorTitulosImage from '../../assets/tools/title.jpg';
import geradorDescricoesImage from '../../assets/tools/description.jpg';
import geradorPalavrasChaveImage from '../../assets/tools/passwords.jpg';
import analisadorConcorrenciaImage from '../../assets/tools/concorrent.jpg';
import analiseAnuncioImage from '../../assets/tools/products.jpg';

export const ferramentasData = [
  {
    nome: 'Gerador de Títulos',
    descricao: 'Crie títulos de alta conversão.',
    image: geradorTitulosImage,
    status: 'ativo', // Define o status como ativo
    custo: '1 Token (24h)',
    restante: '18 horas',
    route: '/ferramentas-ia/gerador-titulos',
    categoria: 'Geradores',
    isClickable: true
  },
  {
    nome: 'Gerador de Descrições',
    descricao: 'Gere descrições otimizadas.',
    image: geradorDescricoesImage,
    status: 'emBreve', // Define o status como desativado
    custo: '1 Token (24h)',
    categoria: 'Geradores',
    isClickable: false
  },
  {
    nome: 'Gerador de Palavras-chave',
    descricao: 'Encontre palavras-chave.',
    image: geradorPalavrasChaveImage,
    status: 'emBreve', // Define o status como ativo
    custo: '1 Token (24h)',
    restante: '5 horas',
    category: 'Análise',
    isClickable: true
  },
  {
    nome: 'Análise de Concorrência',
    descricao: 'Compare anúncios da concorrência.',
    image: analisadorConcorrenciaImage,
    status: 'emBreve', // Define o status como em breve
    custo: '1 Token (24h)',
    categoria: 'Análise',
    isClickable: false
  },
  {
    nome: 'Análise de Anúncio',
    descricao: 'Analise seu anúncio.',
    image: analiseAnuncioImage,
    status: 'emBreve', // Define o status como em breve
    custo: '1 Token (24h)',
    categoria: 'Análise',
    isClickable: false
  }
];
