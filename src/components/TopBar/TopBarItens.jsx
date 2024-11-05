import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; // Ícone para Faturamento
import SellIcon from '@mui/icons-material/Sell'; // Ícone para Vendas
import PaymentsIcon from '@mui/icons-material/Payments'; // Ícone para Custo (agora Payments)
import SavingsIcon from '@mui/icons-material/Savings'; // Ícone para Lucro

const topBarItems = [
  { title: 'Faturamento', value: 'R$ 50,000', icon: <PointOfSaleIcon />, id: 'faturamento' },
  { title: 'Vendas', value: '1200', icon: <SellIcon />, id: 'vendas' },
  { title: 'Custo', value: 'Em Breve', icon: <PaymentsIcon />, id: 'custo' }, // Alterado para Payments
  { title: 'Lucro', value: 'Em Breve', icon: <SavingsIcon />, id: 'lucro' },
];

export default topBarItems;
