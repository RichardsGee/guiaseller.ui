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

// Função para calcular o total de vendas e faturamento de hoje
export const calculateTodaySummary = (salesData) => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Para garantir que pega até o fim do dia

  let totalSales = 0;
  let totalRevenue = 0;

  salesData.forEach(sale => {
    const dateCreated = new Date(sale.date_created);
    if (dateCreated >= todayStart && dateCreated < todayEnd) {
      totalSales += 1;
      totalRevenue += sale.total_amount || 0;
    }
  });

  return { totalSales, totalRevenue };
};

// Função para calcular o total de vendas e faturamento de ontem
export const calculateYesterdaySummary = (salesData) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  const yesterdayEnd = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1);

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

// Função que retorna todos os resumos, incluindo hoje e ontem
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
