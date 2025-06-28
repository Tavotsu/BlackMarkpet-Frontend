// Función para obtener datos de los endpoints existentes
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

// Función para renderizar todos los gráficos
async function renderCharts() {
    // Obtener datos de los endpoints EXISTENTES en tu backend
    const ventas = await fetchData('/api/ventas-dia');
    const inventario = await fetchData('/api/inventario-categorias');
    const top = await fetchData('/api/top-productos');
    const stock = await fetchData('/api/stock-productos');

    // 1. Gráfico de Ventas por Hora
    new Chart(document.getElementById('ventasDia'), {
        type: 'bar',
        data: {
            labels: ventas.labels.map(h => formatHour(h)),
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

    // 2. Gráfico de Inventario por Categoría
    new Chart(document.getElementById('inventarioCategoria'), {
        type: 'doughnut',
        data: {
            labels: inventario.labels,
            datasets: [{
                label: 'Productos por Categoría',
                data: inventario.data,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });

    // 3. Gráfico de Top Productos
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

    // 4. Gráfico de Stock de Productos
    new Chart(document.getElementById('stockProductos'), {
        type: 'line',
        data: {
            labels: stock.labels,
            datasets: [{
                label: 'Stock Disponible',
                data: stock.data,
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: '#FF9800',
                borderWidth: 2,
                pointBackgroundColor: '#FF9800',
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
}

// cierre de sesion mmmmm :c



// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar gráficos
    renderCharts();
    
    // Asignar evento al botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', cerrarSesion);
});