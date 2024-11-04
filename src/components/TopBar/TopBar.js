import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';
import { calculateSummary, calculateCurrentMonthSummary, calculatePreviousMonthSummary } from '../../components/ChartSection/ChartFunctions';

function TopBar({ items, salesData, dateRange }) {
    const [faturamentoAtual, setFaturamentoAtual] = useState(0);
    const [quantidadeVendasAtual, setQuantidadeVendasAtual] = useState(0);
    const [faturamentoAnterior, setFaturamentoAnterior] = useState(0);
    const [quantidadeVendasAnterior, setQuantidadeVendasAnterior] = useState(0);

    // Variáveis para armazenar os dados do mês atual e anterior
    const [faturamentoMesAtual, setFaturamentoMesAtual] = useState(0);
    const [quantidadeVendasMesAtual, setQuantidadeVendasMesAtual] = useState(0);
    const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState(0);
    const [quantidadeVendasMesAnterior, setQuantidadeVendasMesAnterior] = useState(0);

    useEffect(() => {
        // Função para calcular os totais
        const calculateTotals = (days, isCurrent) => {
            const today = new Date();
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

        // Função para calcular os totais de ontem
        const calculateYesterdayTotals = () => {
            const today = new Date();
            const yesterdayStart = new Date(today);
            yesterdayStart.setDate(today.getDate() - 1);
            yesterdayStart.setHours(0, 0, 1); // 00:00:01
            const yesterdayEnd = new Date(today);
            yesterdayEnd.setDate(today.getDate() - 1);
            yesterdayEnd.setHours(23, 59, 59); // 23:59:59
            let totalFaturamento = 0;
            let totalVendas = 0;

            salesData.forEach(sale => {
                const dateCreated = new Date(sale.date_created);
                if (dateCreated >= yesterdayStart && dateCreated <= yesterdayEnd) {
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
            previousSummary = calculateYesterdayTotals(); // Para "Ontem"
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
        setFaturamentoAtual(currentSummary.totalFaturamento);
        setQuantidadeVendasAtual(currentSummary.totalVendas);
        setFaturamentoAnterior(previousSummary.totalFaturamento);
        setQuantidadeVendasAnterior(previousSummary.totalVendas);

        // Cálculo do faturamento e quantidade de vendas do mês atual e anterior
        const currentMonthSummary = calculateCurrentMonthSummary(salesData);
        const previousMonthSummary = calculatePreviousMonthSummary(salesData);

        // Atualiza os estados com os valores mensais
        setFaturamentoMesAtual(currentMonthSummary.totalRevenue);
        setQuantidadeVendasMesAtual(currentMonthSummary.totalSales);
        setFaturamentoMesAnterior(previousMonthSummary.totalRevenue);
        setQuantidadeVendasMesAnterior(previousMonthSummary.totalSales);

    }, [salesData, dateRange]); // Atualiza sempre que salesData ou dateRange mudar

    // Cálculo da porcentagem de variação
    const calcularVariacao = (atual, anterior) => {
        if (anterior === 0) return 0; // Evita divisão por zero
        return ((atual - anterior) / anterior) * 100; // Retorna a variação percentual
    };

    const variacaoFaturamento = calcularVariacao(faturamentoAtual, faturamentoAnterior);
    const variacaoVendas = calcularVariacao(quantidadeVendasAtual, quantidadeVendasAnterior);

    return (
        <header className={styles.topBar}>
            {items.map((item, index) => (
                <div key={index} className={styles.topBarItem}>
                    <div className={styles.topBarContent}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.value} id={`${item.id}-value`}>
                            {item.id === 'faturamento' ? (
                                <>
                                    <span className={styles.valueToday}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faturamentoAtual)}
                                    </span><br />
                                    <span className={styles.valueCompare}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faturamentoAnterior)}
                                    </span><br />
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
                        <span className={`${styles.porcentagem} ${variacaoFaturamento < 0 ? styles.negativo : styles.positivo}`}>
                            <span className="material-icons" style={{ fontSize: '16px' }}>
                                {variacaoFaturamento >= 0 ? 'arrow_upward' : 'arrow_downward'}
                            </span>
                            {item.id === 'faturamento' ? `${Math.abs(variacaoFaturamento).toFixed(2)}%` : `${Math.abs(variacaoVendas).toFixed(2)}%`}
                        </span>
                    </div>
                </div>
            ))}
        </header>
    );
}

export default TopBar;
