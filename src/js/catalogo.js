const SUPABASE_URL = 'https://jscpecyyajfcqsmmovku.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzY3BlY3l5YWpmY3FzbW1vdmt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDgxNjUsImV4cCI6MjA2NjIyNDE2NX0.iMK7-TRZmQCokoLUtz-eQwFzVFVOSzqP5TA_sfsQNzQ';

// 2. Crea el cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('catalogo-productos');

    // Función para renderizar los productos en el HTML
    function renderizarProductos(productos) {
        catalogoContainer.innerHTML = ''; // Limpia el contenedor de productos

        if (!productos || productos.length === 0) {
            catalogoContainer.innerHTML = '<p class="text-white col-span-full text-center text-xl">No se encontraron productos en la base de datos.</p>';
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

    // Función para obtener los productos desde Supabase
    async function cargarProductos() {
        // Muestra un indicador de carga
        catalogoContainer.innerHTML = '<p class="text-white col-span-full text-center text-2xl animate-pulse">Cargando productos...</p>';

        const { data, error } = await supabase
            .from('productos') 
            .select('*');

        if (error) {
            console.error('Error al cargar productos:', error);
            catalogoContainer.innerHTML = `<p class="text-red-500 col-span-full text-center">Error al cargar productos. Revisa la consola para más detalles.</p>`;
            return;
        }

        // Llama a la función para pintar los productos en la página
        renderizarProductos(data);
    }

    // Llama a la función principal al cargar la página
    if (catalogoContainer) {
       cargarProductos();
    }
});