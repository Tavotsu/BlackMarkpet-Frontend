document.addEventListener('DOMContentLoaded', () => {
    
    const navLinksContainer = document.getElementById('nav-links');
    const mobileMenuContainer = document.getElementById('mobileMenu');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Menus de navegacion
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

    const menuPrivado = (nombreUsuario) => `
        <ul class="hidden md:flex items-center space-x-10 text-white font-bold text-sm">
            <li><a href="index.html" class="hover:text-orange-500">Inicio</a></li>
            <li><a href="detalles.html" class="hover:text-orange-500">Catálogo</a></li>
            <li><a href="index.html#dato-curioso-section" class="hover:text-orange-500">Datos Curiosos</a></li>
            <li><a href="formulario.html" class="hover:text-orange-500">Contacto</a></li>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
            <span class="text-white font-bold">Hola, ${nombreUsuario}</span>
            <button id="abrir-carrito-btn" class="relative text-white hover:text-orange-500 p-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span id="carrito-contador" class="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <button id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
    `;

    const menuMovilPublico = `
        <a href="index.html" class="block text-white hover:text-gray-400">Inicio</a>
        <a href="detalles.html" class="block text-white hover:text-gray-400">Catálogo</a>
        <a href="index.html#dato-curioso-section" class="block text-white hover:text-gray-400">Datos Curiosos</a>
        <a href="formulario.html" class="block text-white hover:text-gray-400">Contacto</a>
        <hr class="border-neutral-700 my-2">
        <a href="login.html" class="block text-white hover:text-gray-400 mt-2">Iniciar Sesión</a>
        <a href="registro.html" class="block text-white hover:text-gray-400">Registrarse</a>
    `;

    const menuMovilPrivado = (nombreUsuario) => `
        <span class="block text-orange-500 font-bold">Hola, ${nombreUsuario}</span>
        <hr class="border-neutral-700 my-2">
        <a href="index.html" class="block text-white hover:text-gray-400">Inicio</a>
        <a href="detalles.html" class="block text-white hover:text-gray-400">Catálogo</a>
        <a href="index.html#dato-curioso-section" class="block text-white hover:text-gray-400">Datos Curiosos</a>
        <a href="formulario.html" class="block text-white hover:text-gray-400">Contacto</a>
        <hr class="border-neutral-700 my-2">
        <button id="abrir-carrito-btn-mobile" class="relative flex items-center w-full text-left text-white hover:text-gray-400 p-1">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Mi Carrito
            <span id="carrito-contador-mobile" class="absolute top-0 left-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
        </button>
        <button id="logout-btn-mobile" class="block text-red-500 hover:text-red-400 mt-2">Cerrar Sesión</button>
    `;


    document.getElementById('abrir-carrito-btn')?.addEventListener('click', () => toggleCarrito(true));

    window.toggleCarrito = function(mostrar) { 
        const carritoSidebar = document.getElementById('carrito-sidebar');
        const carritoOverlay = document.getElementById('carrito-overlay');
        if (!carritoSidebar || !carritoOverlay) return;

        if (mostrar) {
            carritoSidebar.classList.remove('translate-x-full');
            carritoOverlay.classList.remove('hidden');
        } else {
            carritoSidebar.classList.add('translate-x-full');
            carritoOverlay.classList.add('hidden');
        }
    }

    window.actualizarContadorCarrito = function(cantidad) {
        const contador = document.getElementById('carrito-contador');
        const contadorMobile = document.getElementById('carrito-contador-mobile');
        if (contador) contador.textContent = cantidad;
        if (contadorMobile) contadorMobile.textContent = cantidad;
    }

    // Lógica para mostrar el menú correspondiente
     if (usuario) {
        navLinksContainer.innerHTML = menuPrivado(usuario.nombre);
        mobileMenuContainer.innerHTML = menuMovilPrivado(usuario.nombre);
    } else {
        navLinksContainer.innerHTML = menuPublico;
        mobileMenuContainer.innerHTML = menuMovilPublico;
    }
    
    // Logout
    const logout = () => {
        localStorage.removeItem('usuarioLogueado');
        window.location.href = 'index.html';
    };
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('logout-btn-mobile')?.addEventListener('click', logout);

    // Abrir carrito (escritorio y móvil)
    document.getElementById('abrir-carrito-btn')?.addEventListener('click', () => window.toggleCarrito(true));
    document.getElementById('abrir-carrito-btn-mobile')?.addEventListener('click', () => window.toggleCarrito(true));

    // Formulario de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const usuarioLogueado = await response.json();
                    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
                    swal("¡Bienvenido!", `Hola de nuevo, ${usuarioLogueado.nombre}`, "success")
                        .then(() => window.location.href = 'index.html');
                } else {
                    swal("Error", "Email o contraseña incorrectos.", "error");
                }
            } catch (error) {
                swal("Error de Conexión", "No se pudo conectar con el servidor.", "error");
            }
        });
    }

    // Formulario de Registro
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/usuarios/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, password })
                });

                if (response.status === 201) {
                    swal("¡Éxito!", "Usuario registrado. Ahora puedes iniciar sesión.", "success")
                        .then(() => window.location.href = 'login.html');
                } else if (response.status === 409) {
                    swal("Error", "El correo electrónico ya está registrado.", "error");
                } else {
                    swal("Error", "Ocurrió un problema al registrar el usuario.", "error");
                }
            } catch (error) {
                swal("Error de Conexión", "No se pudo conectar con el servidor.", "error");
            }
        });
    }
});