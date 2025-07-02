document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('catalogo-productos');

    // La URL de tu API de Spring Boot donde se obtienen los productos
    const API_URL = 'https://blackmarkpet-backend-production.up.railway.app/api/productos';

    // Función para renderizar los productos
    function renderizarProductos(productos) {
        catalogoContainer.innerHTML = ''; // Limpia el div

        if (!productos || productos.length === 0) {
            catalogoContainer.innerHTML = '<p class="text-white col-span-full text-center text-xl">No se encontraron productos.</p>';
            return;
        }

        productos.forEach(producto => {
            const cardProducto = document.createElement('div');
            cardProducto.className = 'bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col';
            
            const precioFormateado = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP'
            }).format(producto.precio);

            cardProducto.innerHTML = `
                <img class="w-full h-48 object-cover" src="${producto.imagen || 'assets/img/placeholder.png'}" alt="Imagen de ${producto.nombre}">
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-white mb-2 truncate">${producto.nombre}</h3>
                    <p class="text-gray-400 text-sm mb-4 flex-grow">${producto.descripcion}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-2xl font-bold text-orange-500">${precioFormateado}</span>
                        <a href="detalles.html?id=${producto.id}" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors">
                            Ver más
                        </a>
                    </div>
                </div>
            `;
            catalogoContainer.appendChild(cardProducto);
        });
    }

    // Función para obtener los productos desde TU BACKEND de Spring Boot
    async function cargarProductos() {
        catalogoContainer.innerHTML = '<p class="text-white col-span-full text-center text-2xl animate-pulse">Cargando productos...</p>';

        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                // Si la respuesta no es 200 OK, lanza un error
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const productos = await response.json();
            
            // Llama a la función para pintar los productos en la página
            renderizarProductos(productos);

        } catch (error) {
            console.error('Error al cargar productos:', error);
            // Muestra un mensaje de error más útil para el usuario
            catalogoContainer.innerHTML = `<p class="text-red-500 col-span-full text-center">No se pudo conectar con el servidor para cargar los productos. ¿Está el backend funcionando?</p>`;
        }
    }

    // Llama a la función principal al cargar la página
    if (catalogoContainer) {
       cargarProductos();
    }
});