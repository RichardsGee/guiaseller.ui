// ChartFunctions.jsx

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
  