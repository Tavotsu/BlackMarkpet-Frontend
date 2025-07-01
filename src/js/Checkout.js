document.addEventListener('DOMContentLoaded', () => {
  // TODO: Obtén dinámicamente el usuario actual (por ejemplo, desde sesión o localStorage)
  const usuarioId = 1;

  const productosContainer = document.getElementById('productos-checkout');
  const subtotalElement = document.getElementById('subtotal');
  const totalElement = document.getElementById('total');
  const form = document.querySelector('form');

  // Función para cargar productos del carrito y actualizar totales
  function cargarProductos() {
    fetch(`http://localhost:8080/api/carrito/${usuarioId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(items => {
        productosContainer.innerHTML = ''; // Limpiar productos previos

        if (items.length === 0) {
          productosContainer.innerHTML = '<p class="text-gray-600 italic">No tienes productos en el carrito.</p>';
          subtotalElement.textContent = '$0';
          totalElement.textContent = '$0';
          return;
        }

        let subtotal = 0;

        items.forEach(item => {
          const producto = item.producto;
          const cantidad = item.cantidad;
          const precioTotal = producto.precio * cantidad;
          subtotal += precioTotal;

          // Crear contenedor del producto
          const productoDiv = document.createElement('div');
          productoDiv.className = 'producto-item flex items-center gap-4';

          productoDiv.innerHTML = `
            <img src="${producto.imageUrl}" alt="${producto.nombre}" class="w-20 h-20 object-cover rounded-md">
            <div class="flex-1">
              <h3 class="font-semibold text-lg">${producto.nombre}</h3>
              <p class="text-gray-600">Cantidad: ${cantidad}</p>
            </div>
            <div class="font-semibold text-orange-500">${precioTotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</div>
          `;

          productosContainer.appendChild(productoDiv);
        });

        // Actualizar subtotal y total (despacho gratis)
        subtotalElement.textContent = subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
        totalElement.textContent = subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
      })
      .catch(error => {
        console.error('Error cargando productos del carrito:', error);
        productosContainer.innerHTML = '<p class="text-red-500">No se pudieron cargar los productos.</p>';
        subtotalElement.textContent = '$0';
        totalElement.textContent = '$0';
      });
  }

  // Cargar productos al iniciar la página
  cargarProductos();

  // Manejar el envío del formulario para mostrar mensaje de éxito
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar envío real

    // Aquí podrías agregar lógica para enviar datos al backend

    // Mostrar alerta de éxito
    alert('Pago realizado con éxito. ¡Ya puedes retirar en nuestra tienda!');

    // Opcional: limpiar formulario o redirigir
    // form.reset();
    // window.location.href = '/gracias.html';
  });
});
