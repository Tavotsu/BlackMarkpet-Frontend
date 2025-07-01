document.addEventListener('DOMContentLoaded', () => {
    fetchAllProductos(); // Carga todos los productos al iniciar la página
});

// Solicita la lista completa de productos al backend
const fetchAllProductos = async () => {
    const container = document.querySelector('#producto-detalles'); // Contenedor donde se mostrarán los productos
    if (!container) return; // Si no existe el contenedor, termina la función

    try {
        const response = await fetch('http://localhost:8080/api/productos'); // Petición para obtener productos
        const productos = await response.json(); // Convierte respuesta a JSON
        mostrarTodosLosProductos(productos); // Muestra los productos en el HTML
    } catch (error) {
        console.error("Error al obtener productos:", error);
        // Mensaje de error visible para el usuario
        container.innerHTML = '<p class="text-center text-red-500 col-span-full">No se pudieron cargar los productos.</p>';
    }
};

// Renderiza tarjetas con la información de cada producto
const mostrarTodosLosProductos = (productos) => {
    const container = document.querySelector('#producto-detalles');
    container.innerHTML = ''; // Limpia contenido previo

    if (!productos || productos.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600">No hay productos disponibles.</p>'; // Mensaje si no hay productos
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
                    <p class="text-3xl font-semibold mb-4">${formatCLP(producto.precio)}</p> <!-- Formatea precio a CLP -->
                    <div class="flex items-center text-gray-400 mb-4">
                        <span class="font-medium mr-2">Stock:</span>
                        <span class="font-bold">${producto.stock}</span> <!-- Muestra stock disponible -->
                    </div>
                    <button class="w-full bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-lg transition-colors agregar-carrito-btn">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        // Añade evento para agregar producto al carrito al hacer clic
        card.querySelector('.agregar-carrito-btn').addEventListener('click', () => {
            agregarProductoAlCarritoAPI(producto.id);
        });
        
        container.appendChild(card); // Añade la tarjeta al contenedor
    });
};

// Envía petición al backend para agregar un producto al carrito del usuario
async function agregarProductoAlCarritoAPI(productoId) {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado')); // Obtiene usuario logueado del almacenamiento local

    // Si no hay usuario logueado, solicita iniciar sesión
    if (!usuario) {
        swal("¡Atención!", "Debes iniciar sesión para agregar productos.", "warning", {
            buttons: { cancel: "Más tarde", login: { text: "Iniciar Sesión", value: "login" } },
        }).then((value) => {
            if (value === "login") window.location.href = 'login.html'; // Redirige a login si elige iniciar sesión
        });
        return;
    }

    // Si hay sesión activa, envía el producto al carrito en el backend
    try {
        await fetch('http://localhost:8080/api/carrito/agregar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.id, productoId: productoId, cantidad: 1 })
        });

        swal("¡Añadido!", "Producto añadido al carrito.", "success", { buttons: false, timer: 1200 }); // Mensaje de éxito
        
        await renderizarCarrito(); // Actualiza la vista del carrito
        toggleCarrito(true); // Muestra el carrito al usuario

    } catch (error) {
        console.error("Error al añadir al carrito:", error);
        swal("Error", "No se pudo añadir el producto.", "error"); // Mensaje de error si falla la petición
    }
}
