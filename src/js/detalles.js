
document.addEventListener('DOMContentLoaded', () => {
    // Array de objetos. Ahora cada objeto representa un producto de la tienda.
    const productosBlackMarkpet = [
        {
            id: 'prod-001',
            nombre: 'Alimento Premium para Perro Adulto',
            descripcion: 'Croquetas balanceadas con 30% de proteína y vitaminas esenciales para una vida saludable.',
            imagenUrl: 'https://cdnx.jumpseller.com/tu-mascota-y-algo-mas/image/43530555/premium_vitalcan-cordero-600x896-1__2_.jpg?1720122934', 
            precio: 29990, 
            categoria: 'Alimentos'
        },
        {
            id: 'prod-002',
            nombre: 'Juguete Interactivo para Gatos',
            descripcion: 'Juguete dispensador de premios que estimula la mente y el instinto de caza de tu felino.',
            imagenUrl: 'https://m.media-amazon.com/images/I/81JiN5D-XZL._AC_UF1000,1000_QL80_.jpg', 
            precio: 12500,
            categoria: 'Juguetes'
        },
        {
            id: 'prod-003',
            nombre: 'Cama Acolchada Antiestrés',
            descripcion: 'Cama extra suave y cómoda, diseñada para reducir la ansiedad y mejorar el descanso de tu mascota.',
            imagenUrl: 'https://arenaparamascotas.cl/wp-content/uploads/2023/12/cama-antiestres-para-gato.jpeg', 
            precio: 19990,
            categoria: 'Accesorios'
        },
        {
            id: 'prod-004',
            nombre: 'Arena Sanitaria Aglomerante',
            descripcion: 'Arena de alta calidad con control de olores y gran poder de absorción. Fácil de limpiar.',
            imagenUrl: 'https://www.worldpet.cl/wp-content/uploads/2020/12/Arena-FIT-baby-10k.png', 
            precio: 8990,
            categoria: 'Higiene'
        }
    ];

    // 
    renderizarProductos(productosBlackMarkpet);
});


//Función para dar formato de moneda Chilena (CLP) a un número.
function formatCurrency(numero) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(numero);
}


function renderizarProductos(productos) {
    //Nuevo ID de nuestro contenedor de productos
    const contenedorProductos = document.getElementById('productos-grid');

    if (!contenedorProductos) return; 
    contenedorProductos.innerHTML = ''; 

    // Crear tarjetas para cada producto
    productos.forEach(producto => {
        // FormatCurrency para mostrar el precio
        const precioFormateado = formatCurrency(producto.precio);

        const tarjetaHtml = `
            <div class="bg-zinc-100 dark:bg-zinc-600 rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img class="w-full h-56 object-cover" src="${producto.imagenUrl}" alt="Imagen de ${producto.nombre}">
                
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-blue-deep dark:text-white mb-2">${producto.nombre}</h3>
                    <p class="text-zinc-600 dark:text-zinc-300 mb-4 flex-grow">${producto.descripcion}</p>
                    
                    <div class="mt-auto">
                        <p class="text-2xl font-semibold text-white text-center mb-4">${precioFormateado}</p>
                        <button 
                            onclick="alert('Agregado al carrito: ${producto.nombre}')" 
                            class="w-full text-white bg-blue-deep hover:bg-zinc-800 dark:bg-orange-standard dark:hover:bg-orange-dark font-bold py-2 px-4 rounded transition-colors duration-300">
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        contenedorProductos.innerHTML += tarjetaHtml;
    });
}