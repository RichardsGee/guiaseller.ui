// ChartData.jsx
import { calculateSummary, calculateCurrentMonthSummary, calculatePreviousMonthSummary, calculateComparison } from './ChartFunctions';

export const getChartData = (salesData, dateRange) => {
    const today = new Date();

    // Resumos individuais
    const summary7d = calculateSummary(salesData, 7);
    const summary15d = calculateSummary(salesData, 15);
    const summary30d = calculateSummary(salesData, 30);
    const summaryCurrentMonth = calculateCurrentMonthSummary(salesData);
    const summaryPreviousMonth = calculatePreviousMonthSummary(salesData);

    let dataVendas, dataFaturamento, dataComparacao;

    // Cálculo de vendas e faturamento de ontem e hoje
    const todaySales = salesData.filter(sale => new Date(sale.date_created).toDateString() === today.toDateString());
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdaySales = salesData.filter(sale => new Date(sale.date_created).toDateString() === yesterday.toDateString());

    const totalTodaySales = todaySales.length;
    const totalYesterdaySales = yesterdaySales.length;
    const totalTodayRevenue = todaySales.reduce((acc, sale) => acc + (sale.total_amount || 0), 0);
    const totalYesterdayRevenue = yesterdaySales.reduce((acc, sale) => acc + (sale.total_amount || 0), 0);

    // Gráficos de comparação de hoje com ontem
    if (dateRange === '1d') {
        dataVendas = {
            labels: ['Ontem', 'Hoje'],
            datasets: [
                {
                    label: 'Quantidade de Vendas',
                    data: [totalYesterdaySales, totalTodaySales],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataFaturamento = {
            labels: ['Ontem', 'Hoje'],
            datasets: [
                {
                    label: 'Faturamento',
                    data: [totalYesterdayRevenue, totalTodayRevenue],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataComparacao = {
            labels: ['Ontem', 'Hoje'],
            datasets: [
                {
                    label: 'Comparação de Vendas',
                    data: [totalYesterdaySales, totalTodaySales],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };
    } else if (dateRange === '7d') {
        dataVendas = {
            labels: ['7 Dias Anteriores', 'Últimos 7 Dias'],
            datasets: [
                {
                    label: 'Quantidade de Vendas',
                    data: [calculateComparison(salesData, 7).totalSales, summary7d.totalSales],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataFaturamento = {
            labels: ['7 Dias Anteriores', 'Últimos 7 Dias'],
            datasets: [
                {
                    label: 'Faturamento',
                    data: [calculateComparison(salesData, 7).totalRevenue, summary7d.totalRevenue],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataComparacao = {
            labels: ['7 Dias Anteriores', 'Últimos 7 Dias'],
            datasets: [
                {
                    label: 'Comparação de Vendas',
                    data: [calculateComparison(salesData, 7).totalSales, summary7d.totalSales],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };
    } else if (dateRange === 'currentMonth') {
        dataVendas = {
            labels: ['Mês Anterior', 'Mês Atual'],
            datasets: [
                {
                    label: 'Quantidade de Vendas',
                    data: [summaryPreviousMonth.totalSales, summaryCurrentMonth.totalSales],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataFaturamento = {
            labels: ['Mês Anterior', 'Mês Atual'],
            datasets: [
                {
                    label: 'Faturamento',
                    data: [summaryPreviousMonth.totalRevenue, summaryCurrentMonth.totalRevenue],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataComparacao = {
            labels: ['Mês Anterior', 'Mês Atual'],
            datasets: [
                {
                    label: 'Comparação de Vendas',
                    data: [summaryPreviousMonth.totalSales, summaryCurrentMonth.totalSales],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };
    } else {
        const labels = dateRange === '15d' ? ['15 Dias Anteriores', 'Últimos 15 Dias'] : ['30 Dias Anteriores', 'Últimos 30 Dias'];

        dataVendas = {
            labels: labels,
            datasets: [
                {
                    label: 'Quantidade de Vendas',
                    data: [
                        dateRange === '15d' ? calculateComparison(salesData, 15).totalSales : calculateComparison(salesData, 30).totalSales,
                        dateRange === '15d' ? summary15d.totalSales : summary30d.totalSales,
                    ],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataFaturamento = {
            labels: labels,
            datasets: [
                {
                    label: 'Faturamento',
                    data: [
                        dateRange === '15d' ? calculateComparison(salesData, 15).totalRevenue : calculateComparison(salesData, 30).totalRevenue,
                        dateRange === '15d' ? summary15d.totalRevenue : summary30d.totalRevenue,
                    ],
                    backgroundColor: ['rgba(255, 205, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };

        dataComparacao = {
            labels: labels,
            datasets: [
                {
                    label: 'Comparação de Vendas',
                    data: [
                        dateRange === '15d' ? calculateComparison(salesData, 15).totalSales : calculateComparison(salesData, 30).totalSales,
                        dateRange === '15d' ? summary15d.totalSales : summary30d.totalSales,
                    ],
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                    borderWidth: 1,
                    barThickness: 'flex',
                    maxBarThickness: 30,
                },
            ],
        };
    }

    return { dataVendas, dataFaturamento, dataComparacao };
};
