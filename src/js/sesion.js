document.addEventListener('DOMContentLoaded', () => {
    
    const navLinksContainer = document.getElementById('nav-links');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Menú para visitantes
    const menuPublico = `
        <ul class="hidden md:flex items-center space-x-10 text-white font-bold text-sm">
            <li><a href="index.html" class="hover:text-orange-500">Inicio</a></li>
            <li><a href="detalles.html" class="hover:text-orange-500">Catálogo</a></li>
            <li><a href="index.html#dato-curioso-section" class="hover:text-orange-500">Datos Curiosos</a></li>
            <li><a href="formulario.html" class="hover:text-orange-500">Contacto</a></li>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
            <a href="login.html" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Iniciar Sesión</a>
            <a href="registro.html" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Registrarse</a>
        </div>
    `;

    // Menú para usuarios que ya ingresaron
    const menuPrivado = (nombreUsuario) => `
        <ul class="hidden md:flex items-center space-x-6 text-white font-bold text-sm">
            <li><a href="index.html" class="hover:text-orange-500">Inicio</a></li>
            <li><a href="detalles.html" class="hover:text-orange-500">Catálogo</a></li>
            ${usuario.rol === 'ADMIN' ? '<li><a href="admin.html" class="hover:text-orange-500">Admin</a></li>' : ''}
            <li><a href="formulario.html" class="hover:text-orange-500">Contacto</a></li>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
            <span class="text-white">Hola, ${nombreUsuario}</span>
            
            <a href="#" id="ver-carrito-btn" class="relative text-white hover:text-orange-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </a>

            <button id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
    `;

    // Revisa si hay una sesión activa y muestra el menú correcto
    function verificarSesion() {
        if (usuario) {
            navLinksContainer.innerHTML = menuPrivado(usuario.nombre);
            // Configura el botón para cerrar sesión
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('usuarioLogueado');
                window.location.href = 'index.html';
            });
        } else {
            navLinksContainer.innerHTML = menuPublico;
        }
    }

    verificarSesion();
});