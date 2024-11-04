import { startOfToday, endOfYesterday } from 'date-fns';

// Resumo de vendas e faturamento para um intervalo de dias
export const calculateSummary = (salesData, days) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - days);

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= startDate && dateCreated <= today) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Resumo do mês atual
export const calculateCurrentMonthSummary = (salesData) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Primeiro dia do mês atual

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= startDate && dateCreated <= today) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Resumo do mês anterior
export const calculatePreviousMonthSummary = (salesData) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Primeiro dia do mês anterior
  const endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Último dia do mês anterior

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= startDate && dateCreated <= endDate) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Total de vendas e faturamento de hoje
export const calculateTodaySummary = (salesData) => {
  const today = startOfToday(); // 00:00:00 de hoje
  const todayEnd = new Date(today.getTime() + (24 * 60 * 60 * 1000)); // 00:00:00 de amanhã

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= today && dateCreated < todayEnd) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Total de vendas e faturamento de ontem
export const calculateYesterdaySummary = (salesData) => {
  const yesterday = endOfYesterday(); // 23:59:59 do dia anterior

  const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  const yesterdayEnd = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1); // 00:00:00 do dia atual

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= yesterdayStart && dateCreated < yesterdayEnd) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Retorna todos os resumos, incluindo hoje e ontem
export const calculateAllSummaries = (salesData) => {
  const todaySummary = calculateTodaySummary(salesData);
  const yesterdaySummary = calculateYesterdaySummary(salesData);
  const currentMonthSummary = calculateCurrentMonthSummary(salesData);
  const previousMonthSummary = calculatePreviousMonthSummary(salesData);

  return {
    todaySummary,
    yesterdaySummary,
    currentMonthSummary,
    previousMonthSummary,
  };
};

// Função para calcular comparação
export const calculateComparison = (salesData, days) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - (days + 7)); // Para os dias anteriores

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= startDate && dateCreated < today) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};
