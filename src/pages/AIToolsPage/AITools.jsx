import geradorTitulosImage from '../../assets/tools/title.png';
import geradorDescricoesImage from '../../assets/tools/imagem.jpg';
import geradorPalavrasChaveImage from '../../assets/tools/imagem.jpg';
import analisadorConcorrenciaImage from '../../assets/tools/imagem.jpg';
import analiseAnuncioImage from '../../assets/tools/imagem.jpg';

export const ferramentasData = [
  {
    nome: 'Gerador de Títulos',
    descricao: 'Crie títulos de alta conversão.',
    image: geradorTitulosImage,
    ativo: true,
    custo: '1 Token (24h)',
    restante: '18 horas',
    route: '/ferramentas-ia/gerador-titulos',
    categoria: 'Geradores'
  },
  {
    nome: 'Gerador de Descrições',
    descricao: 'Gere descrições otimizadas para SEO.',
    image: geradorDescricoesImage,
    ativo: false,
    custo: '1 Token (24h)',
    categoria: 'Geradores'
  },
  {
    nome: 'Gerador de Palavras-chave',
    descricao: 'Encontre palavras-chave estratégicas.',
    image: geradorPalavrasChaveImage,
    ativo: true,
    custo: '1 Token (24h)',
    restante: '5 horas',
    categoria: 'Análise'
  },
  {
    nome: 'Analisador de Concorrência',
    descricao: 'Compare sua concorrência em tempo real.',
    image: analisadorConcorrenciaImage,
    ativo: false,
    custo: '1 Token (24h)',
    categoria: 'Análise'
  },
  {
    nome: 'Análise de Anúncio',
    descricao: 'Analise seu anúncio.',
    image: analiseAnuncioImage,
    ativo: false,
    custo: '1 Token (24h)',
    categoria: 'Análise'
  }
];
