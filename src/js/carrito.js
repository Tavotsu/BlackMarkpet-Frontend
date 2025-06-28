document.addEventListener('DOMContentLoaded', () => {

    const carritoSidebar = document.getElementById('carrito-sidebar');
    const carritoOverlay = document.getElementById('carrito-overlay');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito-btn');
    const carritoItemsContainer = document.getElementById('carrito-items-container');
    const carritoTotalEl = document.getElementById('carrito-total');

    // Función para mostrar/ocultar el carrito
    function toggleCarrito(mostrar) {
        if (mostrar) {
            carritoSidebar.classList.remove('translate-x-full');
            carritoOverlay.classList.remove('hidden');
        } else {
            carritoSidebar.classList.add('translate-x-full');
            carritoOverlay.classList.add('hidden');
        }
    }

    // Función para formatear precio a CLP
    const formatCLP = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

    // Función para renderizar los items en el carrito
    async function renderizarCarrito() {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuario) {
            carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Inicia sesión para ver tu carrito.</p>';
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/carrito/${usuario.id}`);
            const items = await response.json();

            carritoItemsContainer.innerHTML = ''; // Limpiar
            let total = 0;

            if (items.length === 0) {
                carritoItemsContainer.innerHTML = '<p class="text-center text-gray-400">Tu carrito está vacío.</p>';
            } else {
                items.forEach(item => {
                    const itemHTML = `
                        <div class="flex items-center justify-between mb-4 p-2 bg-neutral-800 rounded-lg">
                            <img src="${item.imagenProducto || 'assets/img/placeholder.png'}" alt="${item.nombreProducto}" class="w-16 h-16 rounded object-cover">
                            <div class="flex-grow mx-3">
                                <p class="text-white font-bold truncate">${item.nombreProducto}</p>
                                <p class="text-gray-400 text-sm">${formatCLP(item.precioProducto)} x ${item.cantidad}</p>
                            </div>
                            <button class="text-red-500 hover:text-red-400 eliminar-item-btn" data-item-id="${item.itemId}">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    `;
                    carritoItemsContainer.innerHTML += itemHTML;
                    total += item.precioProducto * item.cantidad;
                });
            }

            carritoTotalEl.textContent = formatCLP(total);
            actualizarContadorCarrito(items.length);

        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            carritoItemsContainer.innerHTML = '<p class="text-center text-red-500">Error al cargar el carrito.</p>';
        }
    }

    // Función para añadir al carrito
    window.agregarAlCarrito = async function(productoId) {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuario) {
            swal("Inicia Sesión", "Debes iniciar sesión para añadir productos al carrito.", "warning")
                .then(() => window.location.href = 'login.html');
            return;
        }

        try {
            await fetch('http://localhost:8080/api/carrito/agregar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuarioId: usuario.id, productoId: productoId })
            });
            swal("¡Añadido!", "Producto añadido al carrito.", "success", { buttons: false, timer: 1000 });
            renderizarCarrito();
            toggleCarrito(true); // Mostrar el carrito al añadir
        } catch (error) {
            console.error("Error al añadir al carrito:", error);
            swal("Error", "No se pudo añadir el producto.", "error");
        }
    }

    // Función para eliminar del carrito
    async function eliminarDelCarrito(itemId) {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        try {
            await fetch(`http://localhost:8080/api/carrito/eliminar/${itemId}?usuarioId=${usuario.id}`, {
                method: 'DELETE'
            });
            renderizarCarrito(); 
        } catch(error) {
            console.error("Error al eliminar del carrito:", error);
        }
    }

    // Event Listeners
    cerrarCarritoBtn.addEventListener('click', () => toggleCarrito(false));
    carritoOverlay.addEventListener('click', () => toggleCarrito(false));

    // Listener para botones de eliminar
    carritoItemsContainer.addEventListener('click', (e) => {
        const boton = e.target.closest('.eliminar-item-btn');
        if(boton) {
            const itemId = boton.dataset.itemId;
            eliminarDelCarrito(itemId);
        }
    });

    // Cargar el carrito cuando la página se carga
    renderizarCarrito();
});