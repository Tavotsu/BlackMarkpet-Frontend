document.addEventListener('DOMContentLoaded', () => {
    fetchAllProductos();
});

// Pide todos los productos al backend
const fetchAllProductos = async () => {
    const container = document.querySelector('#producto-detalles');
    if (!container) return;

    try {
        const response = await fetch('https://blackmarkpet-backend-production.up.railway.app/api/productos');
        const productos = await response.json();
        mostrarTodosLosProductos(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        container.innerHTML = '<p class="text-center text-red-500 col-span-full">No se pudieron cargar los productos.</p>';
    }
};

// Pinta las tarjetas de cada producto en el HTML
const mostrarTodosLosProductos = (productos) => {
    const container = document.querySelector('#producto-detalles');
    container.innerHTML = '';

    if (!productos || productos.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600">No hay productos disponibles.</p>';
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'bg-neutral-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col';
        card.innerHTML = `
            <img src="${producto.imageUrl}" alt="${producto.nombre}" class="w-full h-56 object-cover">
            <div class="p-6 flex-grow flex flex-col">
                <h2 class="text-2xl font-bold mb-2">${producto.nombre}</h2>
                <p class="text-gray-400 mb-4 flex-grow">${producto.descripcion}</p>
                <div class="mt-auto">
                    <p class="text-3xl font-semibold mb-4">${formatCLP(producto.precio)}</p>
                    <div class="flex items-center text-gray-400 mb-4">
                        <span class="font-medium mr-2">Stock:</span>
                        <span class="font-bold">${producto.stock}</span>
                    </div>
                    <button class="w-full bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg transition-colors agregar-carrito-btn">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        // Logica botón de "Agregar al Carrito"
        card.querySelector('.agregar-carrito-btn').addEventListener('click', () => {
            agregarProductoAlCarritoAPI(producto.id);
        });
        
        container.appendChild(card);
    });
};

// Llama a la API para meter un producto al carrito del usuario
async function agregarProductoAlCarritoAPI(productoId) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Si nadie ha iniciado sesión, pide que lo hagan
    if (!usuario) {
        swal("¡Atención!", "Debes iniciar sesión para agregar productos.", "warning", {
            buttons: { cancel: "Más tarde", login: { text: "Iniciar Sesión", value: "login" } },
        }).then((value) => {
            if (value === "login") window.location.href = 'login.html';
        });
        return;
    }

    // Si hay sesión, manda el producto al backend
    try {
        await fetch('https://blackmarkpet-backend-production.up.railway.app/api/carrito/agregar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.id, productoId: productoId, cantidad: 1 })
        });

        swal("¡Añadido!", "Producto añadido al carrito.", "success", { buttons: false, timer: 1200 });
        
        // Actualiza y muestra el carrito para que se vea el nuevo producto
        await renderizarCarrito();
        toggleCarrito(true);

    } catch (error) {
        console.error("Error al añadir al carrito:", error);
        swal("Error", "No se pudo añadir el producto.", "error");
    }
}