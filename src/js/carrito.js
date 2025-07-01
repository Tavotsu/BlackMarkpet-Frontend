let carritoVisible = false; // Estado para controlar si el carrito está visible

// Función para abrir o cerrar la barra lateral del carrito
function toggleCarrito(mostrar) {
    const carritoSidebar = document.getElementById('carrito-sidebar'); // Panel lateral del carrito
    const carritoOverlay = document.getElementById('carrito-overlay'); // Fondo oscuro al abrir carrito
    if (!carritoSidebar || !carritoOverlay) return; // Si no existen elementos, no hace nada

    carritoVisible = mostrar; // Actualiza el estado de visibilidad
    if (mostrar) {
        carritoSidebar.classList.remove('translate-x-full'); // Muestra el carrito
        carritoOverlay.classList.remove('hidden'); // Muestra el fondo oscuro
    } else {
        carritoSidebar.classList.add('translate-x-full'); // Oculta el carrito
        carritoOverlay.classList.add('hidden'); // Oculta el fondo oscuro
    }
}

// Función para formatear números como peso chileno (CLP)
const formatCLP = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

// Solicita los productos del carrito al backend y los muestra en el HTML
async function renderizarCarrito() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado')); // Usuario logueado
    const carritoItemsContainer = document.getElementById('carrito-items-container'); // Contenedor de productos en carrito
    const carritoTotalEl = document.getElementById('carrito-total'); // Elemento que muestra el total del carrito

    if (!carritoItemsContainer || !carritoTotalEl) return; // Si no existen elementos, no hace nada

    if (!usuario) {
        // Mensaje si no hay usuario logueado
        carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Inicia sesión para ver tu carrito.</p>';
        carritoTotalEl.textContent = formatCLP(0); // Total en cero
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/carrito/${usuario.id}`); // Petición para obtener productos del carrito
        const items = await response.json();

        carritoItemsContainer.innerHTML = ''; // Limpia productos previos
        let total = 0;

        if (items.length === 0) {
            // Mensaje si carrito está vacío
            carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Tu carrito está vacío.</p>';
        } else {
            // Genera HTML para cada producto en el carrito
            items.forEach(item => {
                const itemHTML = `
                    <div class="flex items-center justify-between py-2 border-b border-gray-700">
                        <img src="${item.producto.imageUrl}" alt="${item.producto.nombre}" class="w-16 h-16 object-cover rounded mr-4">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${item.producto.nombre}</h4>
                            <p class="text-sm text-gray-400">${formatCLP(item.producto.precio)} x ${item.cantidad}</p>
                        </div>
                        <button class="text-red-500 hover:text-red-400 eliminar-item-btn" data-item-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                `;
                carritoItemsContainer.innerHTML += itemHTML;
                total += item.producto.precio * item.cantidad; // Suma al total
            });
        }
        carritoTotalEl.textContent = formatCLP(total); // Muestra el total formateado
    } catch (error) {
        console.error("Error al renderizar el carrito:", error);
        carritoItemsContainer.innerHTML = '<p class="text-center text-red-500">Error al cargar el carrito.</p>'; // Mensaje de error
    }
}

// Eventos para controlar la interacción con el carrito
document.addEventListener('DOMContentLoaded', () => {
    
    document.body.addEventListener('click', async (e) => {
        // Abrir carrito al hacer clic en el ícono del navbar
        if (e.target.closest('#ver-carrito-btn')) {
            e.preventDefault();
            await renderizarCarrito(); // Carga productos del carrito
            toggleCarrito(true);       // Muestra el carrito
        }

        // Cerrar carrito con el botón 'X'
        if (e.target.closest('#cerrar-carrito-btn')) {
            toggleCarrito(false);
        }

        // Cerrar carrito al hacer clic fuera (en el overlay)
        if (e.target.id === 'carrito-overlay') {
            toggleCarrito(false);
        }

        // Eliminar un producto del carrito al hacer clic en el botón eliminar
        const botonEliminar = e.target.closest('.eliminar-item-btn');
        if (botonEliminar) {
            const itemId = botonEliminar.dataset.itemId;
            const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
            if (usuario) {
                await fetch(`http://localhost:8080/api/carrito/eliminar/${itemId}?usuarioId=${usuario.id}`, { method: 'DELETE' });
                await renderizarCarrito(); // Actualiza el carrito tras eliminar
            }
        }
    });
});
