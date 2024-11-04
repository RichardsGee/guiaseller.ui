import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';
import { calculateCurrentMonthSummary, calculatePreviousMonthSummary } from '../../components/ChartSection/ChartFunctions';

function TopBar({ items, salesData, dateRange }) {
    const [faturamentoAtual, setFaturamentoAtual] = useState('R$ 0,00');
    const [quantidadeVendasAtual, setQuantidadeVendasAtual] = useState(0);
    const [faturamentoAnterior, setFaturamentoAnterior] = useState('R$ 0,00');
    const [quantidadeVendasAnterior, setQuantidadeVendasAnterior] = useState(0);
  
    // Variáveis para armazenar os dados do mês atual e anterior
    const [faturamentoMesAtual, setFaturamentoMesAtual] = useState('R$ 0,00');
    const [quantidadeVendasMesAtual, setQuantidadeVendasMesAtual] = useState(0);
    const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState('R$ 0,00');
    const [quantidadeVendasMesAnterior, setQuantidadeVendasMesAnterior] = useState(0);

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Função para calcular os totais
        const calculateTotals = (days, isCurrent) => {
            const startDate = new Date();
            startDate.setDate(today.getDate() - days);
            let totalFaturamento = 0;
            let totalVendas = 0;

            salesData.forEach(sale => {
                const dateCreated = new Date(sale.date_created);
                if (isCurrent ? dateCreated.toDateString() === today.toDateString() : dateCreated >= startDate && dateCreated < today) {
                    totalFaturamento += sale.total_amount || 0;
                    totalVendas += 1;
                }
            });

            return { totalFaturamento, totalVendas };
        };

        // Resumos para o período atual e anterior com base no filtro
        let currentSummary = {};
        let previousSummary = {};

        if (dateRange === '1d') {
            currentSummary = calculateTotals(0, true); // Para "Hoje"
            previousSummary = calculateTotals(1, false); // Para "Ontem"
        } else if (dateRange === '7d') {
            currentSummary = calculateTotals(7, false); // Últimos 7 dias
            previousSummary = calculateTotals(14, false); // 14 dias atrás para comparação
        } else if (dateRange === '15d') {
            currentSummary = calculateTotals(15, false); // Últimos 15 dias
            previousSummary = calculateTotals(30, false); // 30 dias atrás para comparação
        } else if (dateRange === '30d') {
            currentSummary = calculateTotals(30, false); // Últimos 30 dias
            previousSummary = calculateTotals(60, false); // 60 dias atrás para comparação
        } else if (dateRange === 'currentMonth') {
            const currentMonthSummary = calculateCurrentMonthSummary(salesData);
            const previousMonthSummary = calculatePreviousMonthSummary(salesData);
            currentSummary = { totalFaturamento: currentMonthSummary.totalRevenue, totalVendas: currentMonthSummary.totalSales };
            previousSummary = { totalFaturamento: previousMonthSummary.totalRevenue, totalVendas: previousMonthSummary.totalSales };
        }

        // Atualiza os estados com os valores calculados
        setFaturamentoAtual(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentSummary.totalFaturamento));
        setQuantidadeVendasAtual(currentSummary.totalVendas);
        setFaturamentoAnterior(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(previousSummary.totalFaturamento));
        setQuantidadeVendasAnterior(previousSummary.totalVendas);

        // Cálculo do faturamento e quantidade de vendas do mês atual e anterior
        const currentMonthSummary = calculateCurrentMonthSummary(salesData);
        const previousMonthSummary = calculatePreviousMonthSummary(salesData);

        // Atualiza os estados com os valores mensais
        setFaturamentoMesAtual(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentMonthSummary.totalRevenue));
        setQuantidadeVendasMesAtual(currentMonthSummary.totalSales);
        setFaturamentoMesAnterior(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(previousMonthSummary.totalRevenue));
        setQuantidadeVendasMesAnterior(previousMonthSummary.totalSales);

    }, [salesData, dateRange]); // Atualiza sempre que salesData ou dateRange mudar

    return (
        <header className={styles.topBar}>
            {items.map((item, index) => (
                <div key={index} className={styles.topBarItem}>
                    <div className={styles.topBarContent}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.value} id={`${item.id}-value`}>
                            {item.id === 'faturamento' ? (
                                <>
                                    <span className={styles.valueToday}>{faturamentoAtual}</span><br />
                                    <span className={styles.valueCompare}>{faturamentoAnterior}</span><br />
                                </>
                            ) : item.id === 'vendas' ? (
                                <>
                                    <span className={styles.valueToday}>{quantidadeVendasAtual}</span><br />
                                    <span className={styles.valueCompare}>{quantidadeVendasAnterior}</span><br />
                                </>
                            ) : item.value}
                        </p>
                    </div>
                    <div className={styles.topBarIcon}>
                        <span className={`material-icons ${styles.icon}`}>{item.icon}</span>
                    </div>
                </div>
            ))}
        </header>
    );
}

export default TopBar;
