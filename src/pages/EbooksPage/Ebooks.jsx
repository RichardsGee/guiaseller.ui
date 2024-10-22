import estrategiasVendasImage from '../../assets/ebooks/imagem.jpg';
import otimizacaoProdutosImage from '../../assets/ebooks/imagem.jpg';
import marketingDigitalImage from '../../assets/ebooks/imagem.jpg';

export const ebooksData = [
  { 
    nome: 'eBook de Estratégias de Vendas', 
    descricao: 'Dicas e estratégias para impulsionar suas vendas.', 
    dono: 'Fulano de Tal', 
    image: estrategiasVendasImage, 
    ativo: true, 
    custo: '1 Token', 
    route: '/ebooks/estrategias-vendas', 
    categoria: 'Marketing' 
  },
  { 
    nome: 'Guia de Otimização de Produtos', 
    descricao: 'Melhorias para aumentar a visibilidade dos seus produtos.', 
    dono: 'Ciclano de Tal', 
    image: otimizacaoProdutosImage, 
    ativo: true, 
    custo: '2 Tokens', 
    route: '/ebooks/otimizacao-produtos', 
    categoria: 'SEO' 
  },
  { 
    nome: 'eBook de Marketing Digital', 
    descricao: 'Técnicas e ferramentas para alavancar sua presença online.', 
    dono: 'Beltrano de Tal', 
    image: marketingDigitalImage, 
    ativo: false, 
    custo: '2 Tokens', 
    categoria: 'Marketing' 
  }
];
