const urlBase = 'http://localhost:8080'; // URL base para las peticiones API

// Función para obtener datos de un endpoint específico
async function fetchData(endpoint) {
    try {
        // Construye la URL completa y realiza la petición
        const response = await fetch(`${urlBase}${endpoint}`); 
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return await response.json(); // Retorna datos en formato JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        return { labels: [], data: [] }; // Retorna datos vacíos en caso de error
    }
}

// Formatea una hora en formato AM/PM (ej. 8:00 AM)
function formatHour(hour) {
    return hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
}

// Convierte número de mes a su abreviatura en español (ej. 1 → Ene)
function formatMonth(month) {
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return meses[month - 1] || month;
}

// Función principal que obtiene datos y renderiza todos los gráficos
async function renderCharts() {
    // Obtiene datos de diferentes endpoints
    const ventas = await fetchData('/api/ventas-dia');
    const ganancias = await fetchData('/api/ganancias-mensuales');
    const top = await fetchData('/api/top-productos');
    const stockCritico = await fetchData('/api/productos-stock-critico');

    // Gráfico 1: Ventas por hora (barras verticales)
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
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        }
    });

    // Gráfico 2: Ganancias mensuales (línea)
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
            scales: { y: { beginAtZero: true } }
        }
    });

    // Gráfico 3: Top productos (barras horizontales)
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
            indexAxis: 'y', // Eje horizontal para barras
            scales: { x: { beginAtZero: true } }
        }
    });

    // Gráfico 4: Stock crítico (barras verticales)
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
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Ejecuta renderCharts cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', renderCharts);
