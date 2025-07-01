document.addEventListener('DOMContentLoaded', () => {
    // 1. Llamar a la API para obtener TODOS los productos
    fetchAllProductos();
});

// Función para obtener todos los productos desde el backend
const fetchAllProductos = async () => {
    try {
        // 2. URL para obtener la lista completa de productos
        const url = `http://localhost:8080/api/productos`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener los productos. Estado: ${response.status}`);
        }

        // La respuesta ahora es un array de productos
        const productos = await response.json(); 
        
        // 3. Mostrar todos los productos en la página
        mostrarTodosLosProductos(productos);

    } catch (error) {
        console.error(error);
        const container = document.querySelector('#producto-detalles');
        container.innerHTML = '<p>Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
    }
};

// Función para renderizar todos los productos en el HTML
const mostrarTodosLosProductos = (productos) => {
    const container = document.querySelector('#producto-detalles');

    // Limpiar el contenido anterior (el mensaje de "cargando...")
    container.innerHTML = '';

    if (productos.length === 0) {
        container.innerHTML = '<p>No hay productos para mostrar.</p>';
        return;
    }

    // 4. Crear una tarjeta para cada producto usando un bucle
    productos.forEach(producto => {
        const card = document.createElement('div');
        // Agregamos un margen inferior para separar las tarjetas
        card.className = 'bg-white rounded-lg shadow-md p-6 mb-6'; 

        card.innerHTML = `
            <img src="${producto.imageUrl}" alt="Imagen de ${producto.nombre}" class="w-full h-64 object-cover rounded-md mb-4" style="background-position: top;">
            <h2 class="text-3xl font-bold mb-2">${producto.nombre}</h2>
            <p class="text-gray-700 mb-4">${producto.descripcion}</p>
            <p class="text-2xl font-semibold text-gray-900 mb-4">$${producto.precio.toLocaleString('es-CL')}</p>
            <div class="flex items-center mb-4">
                <span class="text-gray-600 mr-2">Stock disponible:</span>
                <span class="text-gray-800 font-bold">${producto.stock}</span>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Agregar al Carrito
            </button>
        `;

        container.appendChild(card);
    });
};