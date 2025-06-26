// src/js/catalogo.js

document.addEventListener('DOMContentLoaded', () => {
    const catalogoContainer = document.getElementById('catalogo-productos');

    // Datos de ejemplo. Más adelante, esto vendrá de tu API de Spring Boot.
    const productosDeEjemplo = [
        {
            id: 1,
            nombre: 'Alimento Premium para Perros Adultos',
            precio: 25990,
            descripcion: 'Croquetas balanceadas con pollo y arroz para una nutrición completa.',
            imagen: 'assets/img/productos/dog-food-1.png' // Asegúrate de tener esta imagen o un placeholder
        },
        {
            id: 2,
            nombre: 'Arena Sanitaria para Gatos',
            precio: 12500,
            descripcion: 'Arena aglomerante de alta absorción con control de olores.',
            imagen: 'assets/img/productos/cat-litter-1.png'
        },
        {
            id: 3,
            nombre: 'Juguete Interactivo para Perros',
            precio: 8990,
            descripcion: 'Dispensador de premios que estimula la mente de tu mascota.',
            imagen: 'assets/img/productos/dog-toy-1.png'
        },
        {
            id: 4,
            nombre: 'Rascador para Gatos con Plataforma',
            precio: 19990,
            descripcion: 'Poste de sisal resistente para el cuidado de las uñas de tu gato.',
            imagen: 'assets/img/productos/cat-scratcher-1.png'
        },
        {
            id: 5,
            nombre: 'Snacks Dentales para Perro',
            precio: 6500,
            descripcion: 'Deliciosos snacks que ayudan a mantener la higiene bucal.',
            imagen: 'assets/img/productos/dog-treats-1.png'
        },
        {
            id: 6,
            nombre: 'Comida Húmeda para Gatos (Salmón)',
            precio: 1500,
            descripcion: 'Paté suave y delicioso, ideal como complemento a la dieta.',
            imagen: 'assets/img/productos/cat-wet-food-1.png'
        },
        {
            id: 7,
            nombre: 'Collar Reflectante para Perros',
            precio: 7990,
            descripcion: 'Collar de nylon ajustable con bandas reflectantes para paseos nocturnos.',
            imagen: 'assets/img/productos/dog-collar-1.png'
        },
        {
            id: 8,
            nombre: 'Cama Acolchada para Mascotas',
            precio: 15990,
            descripcion: 'Cama suave y confortable para un descanso óptimo. Lavable a máquina.',
            imagen: 'assets/img/productos/pet-bed-1.png'
        }
    ];

    // Función para renderizar los productos
    function renderizarProductos(productos) {
        // Limpiamos el contenedor por si acaso
        catalogoContainer.innerHTML = '';

        if (productos.length === 0) {
            catalogoContainer.innerHTML = '<p class="text-white col-span-full text-center">No se encontraron productos.</p>';
            return;
        }

        productos.forEach(producto => {
            const cardProducto = document.createElement('div');
            cardProducto.className = 'bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
            
            // Formatear el precio a moneda chilena
            const precioFormateado = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP'
            }).format(producto.precio);

            cardProducto.innerHTML = `
                <img class="w-full h-48 object-cover" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="p-4">
                    <h3 class="text-xl font-bold text-white mb-2 truncate">${producto.nombre}</h3>
                    <p class="text-gray-400 text-sm mb-4 h-10 overflow-hidden">${producto.descripcion}</p>
                    <div class="flex items-center justify-between">
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

    // Llamamos a la función para que se ejecute al cargar la página
    if (catalogoContainer) {
       renderizarProductos(productosDeEjemplo);
    }
});