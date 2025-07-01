let carritoVisible = false;

// Abre o cierra la barra lateral del carrito
function toggleCarrito(mostrar) {
    const carritoSidebar = document.getElementById('carrito-sidebar');
    const carritoOverlay = document.getElementById('carrito-overlay');
    if (!carritoSidebar || !carritoOverlay) return; // Si no existe el HTML, no hace nada

    carritoVisible = mostrar;
    if (mostrar) {
        carritoSidebar.classList.remove('translate-x-full');
        carritoOverlay.classList.remove('hidden');
    } else {
        carritoSidebar.classList.add('translate-x-full');
        carritoOverlay.classList.add('hidden');
    }
}

// Da formato de peso chileno a los números
const formatCLP = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

// Pide los productos del carrito al backend y los muestra
async function renderizarCarrito() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const carritoItemsContainer = document.getElementById('carrito-items-container');
    const carritoTotalEl = document.getElementById('carrito-total');

    if (!carritoItemsContainer || !carritoTotalEl) return;

    if (!usuario) {
        carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Inicia sesión para ver tu carrito.</p>';
        carritoTotalEl.textContent = formatCLP(0);
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/carrito/${usuario.id}`);
        const items = await response.json();
        
        carritoItemsContainer.innerHTML = '';
        let total = 0;

        if (items.length === 0) {
            carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Tu carrito está vacío.</p>';
        } else {
            items.forEach(item => {
                const itemHTML = `
                    <div class="flex items-center justify-between py-2 border-b border-gray-700">
                        <img src="${item.producto.imageUrl}" alt="${item.producto.nombre}" class="w-16 h-16 object-cover rounded mr-4">
                        <div class="flex-grow">
                            <h4 class="font-bold text-white">${item.producto.nombre}</h4>
                            <p class="text-sm text-gray-400">${formatCLP(item.producto.precio)} x ${item.cantidad}</p>
                        </div>
                        <button class="text-red-500 hover:text-red-400 eliminar-item-btn" data-item-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                `;
                carritoItemsContainer.innerHTML += itemHTML;
                total += item.producto.precio * item.cantidad;
            });
        }
        carritoTotalEl.textContent = formatCLP(total);
    } catch (error) {
        console.error("Error al renderizar el carrito:", error);
        carritoItemsContainer.innerHTML = '<p class="text-center text-red-500">Error al cargar el carrito.</p>';
    }
}

// Eventos para controlar el carrito
document.addEventListener('DOMContentLoaded', () => {
    
    document.body.addEventListener('click', async (e) => {
        // Abrir el carrito con el ícono del navbar
        if (e.target.closest('#ver-carrito-btn')) {
            e.preventDefault();
            await renderizarCarrito(); // Carga los productos
            toggleCarrito(true);       // Muestra el carrito
        }

        // Cerrar con el botón 'X'
        if (e.target.closest('#cerrar-carrito-btn')) {
            toggleCarrito(false);
        }

        // Cerrar al hacer clic fuera del carrito (en el fondo oscuro)
        if (e.target.id === 'carrito-overlay') {
            toggleCarrito(false);
        }

        // Eliminar un producto del carrito
        const botonEliminar = e.target.closest('.eliminar-item-btn');
        if (botonEliminar) {
            const itemId = botonEliminar.dataset.itemId;
            const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
            if (usuario) {
                await fetch(`http://localhost:8080/api/carrito/eliminar/${itemId}?usuarioId=${usuario.id}`, { method: 'DELETE' });
                await renderizarCarrito(); // Vuelve a dibujar el carrito para que se vea el cambio
            }
        }
    });
});