const SUPABASE_URL = 'https://jscpecyyajfcqsmmovku.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzY3BlY3l5YWpmY3FzbW1vdmt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDgxNjUsImV4cCI6MjA2NjIyNDE2NX0.iMK7-TRZmQCokoLUtz-eQwFzVFVOSzqP5TA_sfsQNzQ';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function renderizarDetalleProducto(producto) {
    // Elementos del DOM
    const nombreEl = document.getElementById('detalle-nombre');
    const descripcionEl = document.getElementById('detalle-descripcion');
    const precioEl = document.getElementById('detalle-precio');
    const imagenEl = document.getElementById('detalle-imagen');
    const imagenContainerEl = document.getElementById('detalle-imagen-container');
    const botonComprar = document.querySelector('#detalle-producto-container button');
    
    // Actualizar el contenido
    nombreEl.textContent = producto.nombre;
    descripcionEl.textContent = producto.descripcion;
    
    // Dar formato al precio
    precioEl.textContent = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(producto.precio);

    // Actualizar imagen y quitar efecto de carga
    imagenEl.src = producto.imagen || 'assets/img/placeholder.png';
    imagenEl.alt = `Imagen de ${producto.nombre}`;
    imagenEl.classList.remove('hidden');
    imagenContainerEl.classList.remove('animate-pulse', 'bg-neutral-700');

    // Boton Añadir al Carrito
    botonComprar.disabled = false;
    botonComprar.textContent = "Añadir al Carrito";
    
    // Actualizar el titulo de la página
    document.title = `${producto.nombre} - BlackMarkpet`;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');

    if (!productoId) {
        // Si no hay ID, mostrar error
        swal("Error", "No se ha especificado un producto.", "error")
            .then(() => {
                window.location.href = 'index.html';
            });
        return;
    }

    // Buscar el producto por ID    
    // se usa .single() para asegurarnos que devuelva un solo objeto y no un array
    const { data: producto, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id', productoId)
        .single();

    if (error || !producto) {
        console.error('Error al cargar el producto:', error);
        swal("Producto no encontrado", "El producto que buscas no existe o fue eliminado.", "error")
            .then(() => {
                window.location.href = 'index.html';
            });
        return;
    }

    // Si todo sale bien, llamar a la función para mostrar los datos
    renderizarDetalleProducto(producto);
});