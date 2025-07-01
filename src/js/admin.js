// Función para obtener datos de los endpoints
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { labels: [], data: [] };
    }
}

// Función para formatear horas (8:00 AM, 9:00 AM, etc.)
function formatHour(hour) {
    return hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
}

// Función para formatear meses (1 → "Ene", 2 → "Feb", etc.)
function formatMonth(month) {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return meses[month - 1] || month;
}

// Función para renderizar todos los gráficos
async function renderCharts() {
    // Obtener datos de los endpoints
    const ventas = await fetchData('/api/ventas-dia');
    const ganancias = await fetchData('/api/ganancias-mensuales');
    const top = await fetchData('/api/top-productos');
    const stockCritico = await fetchData('/api/productos-stock-critico');

    // 1. Gráfico de Ventas por Hora (BARRA VERTICAL)
    new Chart(document.getElementById('ventasDia'), {
        type: 'bar',
        data: {
            labels: ventas.labels.map(formatHour),
            datasets: [{
                label: 'Ventas por Hora',
                data: ventas.data,
                backgroundColor: '#4CAF50',
                borderColor: '#388E3C',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } }
            }
        }
    });

    // 2. Gráfico de Ganancias Mensuales (LÍNEA)
    new Chart(document.getElementById('gananciasMensuales'), {
        type: 'line',
        data: {
            labels: ganancias.labels.map(formatMonth),
            datasets: [{
                label: 'Ganancias ($)',
                data: ganancias.data,
                backgroundColor: 'rgba(156, 39, 176, 0.2)',
                borderColor: '#9C27B0',
                borderWidth: 2,
                pointBackgroundColor: '#9C27B0',
                pointRadius: 4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 3. Gráfico de Top Productos (BARRAS HORIZONTAL)
    new Chart(document.getElementById('topProductos'), {
        type: 'bar',
        data: {
            labels: top.labels,
            datasets: [{
                label: 'Unidades Vendidas',
                data: top.data,
                backgroundColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true }
            }
        }
    });

    // 4. Gráfico de Stock Crítico (BARRAS VERTICAL)
    new Chart(document.getElementById('stockCritico'), {
        type: 'bar',
        data: {
            labels: stockCritico.labels,
            datasets: [{
                label: 'Stock Actual',
                data: stockCritico.data,
                backgroundColor: '#FF9800'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
